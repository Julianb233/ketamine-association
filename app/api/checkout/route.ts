import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { stripe, MEMBERSHIP_TIERS, createCheckoutSession } from "@/lib/stripe";
import { createCheckoutSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const supabase = await createClient();
    const { data: { user: authUser } } = await supabase.auth.getUser();
    const userId = authUser?.id;
    if (!userId) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Get practitioner for this user
    const practitioner = await prisma.practitioner.findFirst({
      where: {
        user: { id: userId },
      },
      include: {
        user: {
          select: { email: true, name: true },
        },
      },
    });

    if (!practitioner) {
      return NextResponse.json(
        { error: "Practitioner profile not found. Please complete your profile first." },
        { status: 404 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validationResult = createCheckoutSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid data", details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const { tier, billingPeriod, successUrl, cancelUrl } = validationResult.data;

    // Get tier configuration
    const tierConfig = MEMBERSHIP_TIERS[tier];
    if (!tierConfig || !("priceIds" in tierConfig)) {
      return NextResponse.json(
        { error: "Invalid membership tier" },
        { status: 400 }
      );
    }

    const priceId = tierConfig.priceIds[billingPeriod];
    if (!priceId) {
      return NextResponse.json(
        { error: "Price configuration not found" },
        { status: 400 }
      );
    }

    // Create or get Stripe customer
    let customerId = practitioner.stripeCustomerId;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: practitioner.user.email,
        name: `${practitioner.firstName} ${practitioner.lastName}`,
        metadata: {
          practitionerId: practitioner.id,
          userId: userId,
        },
      });
      customerId = customer.id;

      // Save customer ID
      await prisma.practitioner.update({
        where: { id: practitioner.id },
        data: { stripeCustomerId: customerId },
      });
    }

    // Check if upgrading from existing subscription
    if (practitioner.stripeSubscriptionId) {
      // Cancel existing subscription at period end and create new one
      await stripe.subscriptions.update(practitioner.stripeSubscriptionId, {
        cancel_at_period_end: true,
      });
    }

    // Create checkout session
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const session = await createCheckoutSession({
      customerId,
      priceId,
      successUrl: successUrl || `${appUrl}/dashboard/practitioner?upgraded=true`,
      cancelUrl: cancelUrl || `${appUrl}/pricing?cancelled=true`,
      metadata: {
        practitionerId: practitioner.id,
        tier,
        billingPeriod,
      },
    });

    return NextResponse.json({
      checkoutUrl: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}

// Get current subscription status
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const supabase = await createClient();
    const { data: { user: authUser } } = await supabase.auth.getUser();
    const userId = authUser?.id;
    if (!userId) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Get practitioner for this user
    const practitioner = await prisma.practitioner.findFirst({
      where: {
        user: { id: userId },
      },
      select: {
        membershipTier: true,
        membershipStatus: true,
        membershipStartedAt: true,
        membershipExpiresAt: true,
        stripeSubscriptionId: true,
        stripeCustomerId: true,
      },
    });

    if (!practitioner) {
      return NextResponse.json(
        { error: "Practitioner profile not found" },
        { status: 404 }
      );
    }

    let subscriptionDetails = null;

    if (practitioner.stripeSubscriptionId) {
      try {
        const subscription = await stripe.subscriptions.retrieve(
          practitioner.stripeSubscriptionId
        ) as unknown as {
          status: string;
          current_period_end: number;
          cancel_at_period_end: boolean;
          items: { data: Array<{ price: { id: string } }> };
        };

        subscriptionDetails = {
          status: subscription.status,
          currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          cancelAtPeriodEnd: subscription.cancel_at_period_end,
          priceId: subscription.items.data[0]?.price.id,
        };
      } catch {
        // Subscription might not exist anymore
      }
    }

    return NextResponse.json({
      membership: {
        tier: practitioner.membershipTier,
        status: practitioner.membershipStatus,
        startedAt: practitioner.membershipStartedAt,
        expiresAt: practitioner.membershipExpiresAt,
      },
      subscription: subscriptionDetails,
      tierDetails: MEMBERSHIP_TIERS[practitioner.membershipTier as keyof typeof MEMBERSHIP_TIERS],
    });
  } catch (error) {
    console.error("Error fetching subscription:", error);
    return NextResponse.json(
      { error: "Failed to fetch subscription details" },
      { status: 500 }
    );
  }
}
