import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createCheckoutSession, MEMBERSHIP_TIERS, MembershipTier } from "@/lib/stripe";
import { cookies } from "next/headers";

interface CheckoutMembershipBody {
  tier: string;
  billingCycle: "monthly" | "annual";
}

// Placeholder auth check - replace with actual auth implementation
async function getAuthenticatedUser(): Promise<{ id: string; email: string } | null> {
  // TODO: Replace with actual authentication check
  // This could use NextAuth, Clerk, custom JWT, etc.
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;

  if (!sessionToken) {
    return null;
  }

  // For now, we'll look up the user from a simple session
  // In production, verify the session token properly
  try {
    const user = await prisma.user.findFirst({
      where: {
        // This is a placeholder - implement proper session lookup
        id: sessionToken,
      },
      select: { id: true, email: true },
    });
    return user;
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const user = await getAuthenticatedUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "Authentication required",
          message: "Please sign in to upgrade your membership",
        },
        { status: 401 }
      );
    }

    const body: CheckoutMembershipBody = await request.json();

    // Validate tier
    const tier = body.tier?.toUpperCase() as MembershipTier;
    if (!tier || !MEMBERSHIP_TIERS[tier]) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid membership tier",
          message: "Please select a valid membership tier",
        },
        { status: 400 }
      );
    }

    // Free tier doesn't need checkout
    if (tier === "FREE") {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid tier for checkout",
          message: "Free tier does not require payment",
        },
        { status: 400 }
      );
    }

    // Validate billing cycle
    const billingCycle = body.billingCycle?.toLowerCase() as "monthly" | "annual";
    if (!billingCycle || !["monthly", "annual"].includes(billingCycle)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid billing cycle",
          message: "Please select monthly or annual billing",
        },
        { status: 400 }
      );
    }

    // Get the tier configuration
    const tierConfig = MEMBERSHIP_TIERS[tier];

    // Check if tier has price IDs configured
    if (!("priceIds" in tierConfig) || !tierConfig.priceIds) {
      return NextResponse.json(
        {
          success: false,
          error: "Tier not available for purchase",
          message: "This membership tier is not currently available",
        },
        { status: 400 }
      );
    }

    const priceId = tierConfig.priceIds[billingCycle];

    if (!priceId) {
      return NextResponse.json(
        {
          success: false,
          error: "Price not configured",
          message: "This billing option is not currently available",
        },
        { status: 400 }
      );
    }

    // Get or check practitioner record
    const practitioner = await prisma.practitioner.findUnique({
      where: { userId: user.id },
    });

    if (!practitioner) {
      return NextResponse.json(
        {
          success: false,
          error: "Practitioner profile required",
          message: "Please complete your practitioner profile before upgrading",
        },
        { status: 400 }
      );
    }

    // Build URLs
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://ketamineassociation.org";
    const successUrl = `${baseUrl}/dashboard/practitioner/membership?success=true&tier=${tier}`;
    const cancelUrl = `${baseUrl}/dashboard/practitioner/membership?canceled=true`;

    // Create Stripe checkout session
    const session = await createCheckoutSession({
      customerId: practitioner.stripeCustomerId || undefined,
      priceId,
      successUrl,
      cancelUrl,
      metadata: {
        userId: user.id,
        practitionerId: practitioner.id,
        tier,
        billingCycle,
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
    console.error("Checkout session error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create checkout session",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
