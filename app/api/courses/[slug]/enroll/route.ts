import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";

interface RouteContext {
  params: Promise<{
    slug: string;
  }>;
}

// Get authenticated user from Supabase
async function getAuthenticatedUser(): Promise<{ id: string; email: string } | null> {
  try {
    const supabase = await createClient();
    const { data: { user: authUser } } = await supabase.auth.getUser();

    if (!authUser) {
      return null;
    }

    // Return user info from Supabase auth
    return {
      id: authUser.id,
      email: authUser.email || "",
    };
  } catch {
    return null;
  }
}

// Check if user is a member (for member pricing)
async function checkMemberStatus(userId: string): Promise<boolean> {
  const practitioner = await prisma.practitioner.findUnique({
    where: { userId },
    select: {
      membershipStatus: true,
      membershipTier: true,
    },
  });

  if (practitioner) {
    return (
      practitioner.membershipStatus === "ACTIVE" &&
      practitioner.membershipTier !== "FREE"
    );
  }

  const patient = await prisma.patient.findUnique({
    where: { userId },
    select: { isPremium: true },
  });

  return patient?.isPremium || false;
}

export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const { slug } = await context.params;
    const user = await getAuthenticatedUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "Authentication required",
          message: "Please sign in to enroll in this course",
        },
        { status: 401 }
      );
    }

    // Get the course
    const course = await prisma.course.findUnique({
      where: { slug, isPublished: true },
    });

    if (!course) {
      return NextResponse.json(
        {
          success: false,
          error: "Course not found",
        },
        { status: 404 }
      );
    }

    // Check if already enrolled
    const existingEnrollment = await prisma.courseEnrollment.findFirst({
      where: {
        courseId: course.id,
        OR: [
          { userId: user.id },
          { email: user.email },
        ],
      },
    });

    if (existingEnrollment) {
      return NextResponse.json({
        success: true,
        message: "Already enrolled",
        data: {
          enrollmentId: existingEnrollment.id,
          redirectUrl: `/academy/courses/${slug}/learn`,
        },
      });
    }

    // Check member status for pricing
    const isMember = await checkMemberStatus(user.id);
    const price = isMember && course.memberPrice ? course.memberPrice : course.price;

    // Free course - enroll directly
    if (price === 0) {
      const enrollment = await prisma.courseEnrollment.create({
        data: {
          courseId: course.id,
          userId: user.id,
          email: user.email,
          progress: 0,
        },
      });

      return NextResponse.json({
        success: true,
        message: "Successfully enrolled",
        data: {
          enrollmentId: enrollment.id,
          redirectUrl: `/academy/courses/${slug}/learn`,
        },
      });
    }

    // Paid course - create Stripe checkout session
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://ketamineassociation.org";
    const successUrl = `${baseUrl}/academy/courses/${slug}/learn?enrolled=true`;
    const cancelUrl = `${baseUrl}/academy/courses/${slug}?canceled=true`;

    // Get or create Stripe customer
    let stripeCustomerId: string | undefined;

    const practitioner = await prisma.practitioner.findUnique({
      where: { userId: user.id },
      select: { stripeCustomerId: true },
    });

    if (practitioner?.stripeCustomerId) {
      stripeCustomerId = practitioner.stripeCustomerId;
    } else {
      const patient = await prisma.patient.findUnique({
        where: { userId: user.id },
        select: { stripeCustomerId: true },
      });
      stripeCustomerId = patient?.stripeCustomerId || undefined;
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: course.title,
              description: course.description || undefined,
            },
            unit_amount: Math.round(price * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      customer: stripeCustomerId,
      customer_email: stripeCustomerId ? undefined : user.email,
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        type: "course_enrollment",
        courseId: course.id,
        courseSlug: course.slug,
        userId: user.id,
        userEmail: user.email,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        checkoutUrl: session.url,
        sessionId: session.id,
      },
    });
  } catch (error) {
    console.error("Enrollment error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process enrollment",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// Handle webhook for successful payments - this should be called from the Stripe webhook handler
export async function handleSuccessfulEnrollment(
  courseId: string,
  userId: string,
  email: string,
  stripePaymentId: string
) {
  // Check if enrollment already exists
  const existing = await prisma.courseEnrollment.findFirst({
    where: {
      courseId,
      OR: [{ userId }, { email }],
    },
  });

  if (existing) {
    return existing;
  }

  return prisma.courseEnrollment.create({
    data: {
      courseId,
      userId,
      email,
      progress: 0,
      stripePaymentId,
    },
  });
}
