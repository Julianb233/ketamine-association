import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { sendEmail, emailTemplates } from "@/lib/email";

// Types from Prisma schema
type MembershipTier = "FREE" | "PROFESSIONAL" | "PREMIUM" | "ELITE" | "ENTERPRISE";
type MembershipStatus = "ACTIVE" | "INACTIVE" | "PAST_DUE" | "CANCELLED" | "TRIAL";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// Map Stripe subscription status to our MembershipStatus
function mapSubscriptionStatus(stripeStatus: Stripe.Subscription.Status): MembershipStatus {
  switch (stripeStatus) {
    case "active":
    case "trialing":
      return "ACTIVE";
    case "past_due":
      return "PAST_DUE";
    case "canceled":
    case "unpaid":
      return "CANCELLED";
    case "incomplete":
    case "incomplete_expired":
    case "paused":
    default:
      return "INACTIVE";
  }
}

// Extract tier from price ID or metadata
function extractTierFromMetadata(metadata: Stripe.Metadata | null): MembershipTier | null {
  if (metadata?.tier) {
    const tier = metadata.tier.toUpperCase();
    if (["FREE", "PROFESSIONAL", "PREMIUM", "ELITE", "ENTERPRISE"].includes(tier)) {
      return tier as MembershipTier;
    }
  }
  return null;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const headersList = await headers();
    const signature = headersList.get("stripe-signature");

    if (!signature) {
      console.error("Missing Stripe signature");
      return NextResponse.json(
        { success: false, error: "Missing signature" },
        { status: 400 }
      );
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return NextResponse.json(
        { success: false, error: "Invalid signature" },
        { status: 400 }
      );
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session);
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdated(subscription);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(subscription);
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoicePaymentSucceeded(invoice);
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoicePaymentFailed(invoice);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ success: true, received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Webhook handler failed",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const practitionerId = session.metadata?.practitionerId;
  const tier = extractTierFromMetadata(session.metadata);

  if (!practitionerId) {
    console.error("No practitioner ID in checkout session metadata");
    return;
  }

  // Get the subscription details
  const subscriptionId = session.subscription as string;
  const customerId = session.customer as string;

  // Update practitioner with membership info
  const practitioner = await prisma.practitioner.update({
    where: { id: practitionerId },
    data: {
      stripeCustomerId: customerId,
      stripeSubscriptionId: subscriptionId,
      membershipTier: tier || "PROFESSIONAL",
      membershipStatus: "ACTIVE",
      membershipStartedAt: new Date(),
      membershipExpiresAt: null, // Will be set from subscription
    },
    include: {
      user: { select: { email: true } },
    },
  });

  // Send welcome email
  try {
    const practitionerName = `${practitioner.title || ""} ${practitioner.firstName} ${practitioner.lastName}`.trim();
    const welcomeEmail = emailTemplates.welcomePractitioner({
      name: practitionerName,
      tier: tier || "Professional",
    });

    await sendEmail({
      to: practitioner.user.email,
      subject: welcomeEmail.subject,
      html: welcomeEmail.html,
    });
  } catch (emailError) {
    console.error("Failed to send welcome email:", emailError);
  }

  console.log(`Membership activated for practitioner ${practitionerId}: ${tier}`);
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;

  // Find practitioner by Stripe customer ID
  const practitioner = await prisma.practitioner.findFirst({
    where: { stripeCustomerId: customerId },
  });

  if (!practitioner) {
    console.error(`No practitioner found for customer ${customerId}`);
    return;
  }

  const status = mapSubscriptionStatus(subscription.status);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const currentPeriodEnd = new Date((subscription as any).current_period_end * 1000);

  // Extract tier from subscription metadata if available
  const tier = extractTierFromMetadata(subscription.metadata);

  await prisma.practitioner.update({
    where: { id: practitioner.id },
    data: {
      membershipStatus: status,
      membershipExpiresAt: currentPeriodEnd,
      ...(tier && { membershipTier: tier }),
    },
  });

  console.log(`Subscription updated for practitioner ${practitioner.id}: ${status}`);
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;

  // Find practitioner by Stripe customer ID
  const practitioner = await prisma.practitioner.findFirst({
    where: { stripeCustomerId: customerId },
  });

  if (!practitioner) {
    console.error(`No practitioner found for customer ${customerId}`);
    return;
  }

  // Downgrade to free tier
  await prisma.practitioner.update({
    where: { id: practitioner.id },
    data: {
      membershipTier: "FREE",
      membershipStatus: "CANCELLED",
      stripeSubscriptionId: null,
    },
  });

  console.log(`Subscription cancelled for practitioner ${practitioner.id}`);
}

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string;

  // Find practitioner by Stripe customer ID
  const practitioner = await prisma.practitioner.findFirst({
    where: { stripeCustomerId: customerId },
  });

  if (!practitioner) {
    console.error(`No practitioner found for customer ${customerId}`);
    return;
  }

  // Ensure membership is active
  if (practitioner.membershipStatus !== "ACTIVE") {
    await prisma.practitioner.update({
      where: { id: practitioner.id },
      data: { membershipStatus: "ACTIVE" },
    });
  }

  console.log(`Invoice payment succeeded for practitioner ${practitioner.id}`);
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string;

  // Find practitioner by Stripe customer ID
  const practitioner = await prisma.practitioner.findFirst({
    where: { stripeCustomerId: customerId },
  });

  if (!practitioner) {
    console.error(`No practitioner found for customer ${customerId}`);
    return;
  }

  // Mark as past due
  await prisma.practitioner.update({
    where: { id: practitioner.id },
    data: { membershipStatus: "PAST_DUE" },
  });

  console.log(`Invoice payment failed for practitioner ${practitioner.id}`);
}
