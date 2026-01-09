import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { stripe, CheckoutType } from "@/lib/stripe";
import { sendEmail, emailTemplates } from "@/lib/email";

// Types from Prisma schema
type MembershipTier = "FREE" | "PROFESSIONAL" | "PREMIUM" | "ELITE" | "ENTERPRISE";
type MembershipStatus = "ACTIVE" | "INACTIVE" | "PAST_DUE" | "CANCELLED" | "TRIAL";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// Determine checkout type from session metadata
function getCheckoutType(metadata: Stripe.Metadata | null): CheckoutType | null {
  if (!metadata?.type) {
    // Legacy membership checkouts may not have type field
    if (metadata?.practitionerId && metadata?.tier) {
      return "subscription";
    }
    // Check for other indicators
    if (metadata?.eventId) return "event_registration";
    if (metadata?.courseId) return "course_enrollment";
    if (metadata?.items) return "store_purchase";
    return null;
  }
  return metadata.type as CheckoutType;
}

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
        const checkoutType = getCheckoutType(session.metadata);

        switch (checkoutType) {
          case "subscription":
            await handleMembershipCheckoutCompleted(session);
            break;
          case "event_registration":
            await handleEventRegistrationCompleted(session);
            break;
          case "course_enrollment":
            await handleCourseEnrollmentCompleted(session);
            break;
          case "store_purchase":
            await handleStorePurchaseCompleted(session);
            break;
          default:
            // Fallback to membership handler for legacy sessions
            if (session.mode === "subscription") {
              await handleMembershipCheckoutCompleted(session);
            } else if (session.mode === "payment") {
              console.log("Unknown payment checkout type:", session.metadata);
            }
        }
        break;
      }

      case "customer.subscription.created": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdated(subscription);
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

      case "invoice.paid": {
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoicePaymentSucceeded(invoice);
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

      case "payment_intent.succeeded": {
        // Log successful payment intents (useful for debugging)
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`Payment intent succeeded: ${paymentIntent.id}`);
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.error(`Payment intent failed: ${paymentIntent.id}`, paymentIntent.last_payment_error);
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

// Handle membership subscription checkout completed
async function handleMembershipCheckoutCompleted(session: Stripe.Checkout.Session) {
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

// Handle event registration checkout completed
async function handleEventRegistrationCompleted(session: Stripe.Checkout.Session) {
  const eventId = session.metadata?.eventId;
  const email = session.metadata?.email;
  const firstName = session.metadata?.firstName || "";
  const lastName = session.metadata?.lastName || "";
  const practitionerId = session.metadata?.practitionerId || null;

  if (!eventId || !email) {
    console.error("Missing event registration metadata:", session.metadata);
    return;
  }

  // Get the payment amount
  const amountPaid = (session.amount_total || 0) / 100; // Convert from cents

  // Check if registration already exists
  const existingRegistration = await prisma.eventRegistration.findUnique({
    where: {
      eventId_email: {
        eventId,
        email: email.toLowerCase(),
      },
    },
  });

  if (existingRegistration) {
    // Update existing registration with payment info
    await prisma.eventRegistration.update({
      where: { id: existingRegistration.id },
      data: {
        status: "REGISTERED",
        amountPaid,
        stripePaymentId: session.payment_intent as string,
      },
    });
    console.log(`Updated existing event registration ${existingRegistration.id}`);
    return;
  }

  // Create new registration
  const registration = await prisma.eventRegistration.create({
    data: {
      eventId,
      practitionerId: practitionerId || null,
      email: email.toLowerCase(),
      firstName,
      lastName,
      amountPaid,
      status: "REGISTERED",
      stripePaymentId: session.payment_intent as string,
    },
  });

  // Get event details for confirmation email
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    select: {
      title: true,
      startDate: true,
      location: true,
      virtualUrl: true,
      format: true,
    },
  });

  // Send confirmation email
  if (event) {
    try {
      const confirmationEmail = emailTemplates.eventRegistrationConfirmation({
        name: firstName,
        eventTitle: event.title,
        eventDate: event.startDate.toLocaleString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
          timeZoneName: "short",
        }),
        eventLocation: event.location || undefined,
        virtualUrl: event.virtualUrl || undefined,
        isVirtual: event.format === "VIRTUAL" || event.format === "HYBRID",
      });

      await sendEmail({
        to: email,
        subject: confirmationEmail.subject,
        html: confirmationEmail.html,
      });
    } catch (emailError) {
      console.error("Failed to send event registration confirmation:", emailError);
    }
  }

  console.log(`Event registration created for ${email}: ${registration.id}`);
}

// Handle course enrollment checkout completed
async function handleCourseEnrollmentCompleted(session: Stripe.Checkout.Session) {
  const courseId = session.metadata?.courseId;
  const userId = session.metadata?.userId;
  const userEmail = session.metadata?.userEmail;

  if (!courseId || !userId || !userEmail) {
    console.error("Missing course enrollment metadata:", session.metadata);
    return;
  }

  // Check if enrollment already exists
  const existingEnrollment = await prisma.courseEnrollment.findFirst({
    where: {
      courseId,
      OR: [{ userId }, { email: userEmail }],
    },
  });

  if (existingEnrollment) {
    // Update existing enrollment with payment info
    await prisma.courseEnrollment.update({
      where: { id: existingEnrollment.id },
      data: {
        stripePaymentId: session.payment_intent as string,
      },
    });
    console.log(`Updated existing course enrollment ${existingEnrollment.id}`);
    return;
  }

  // Create new enrollment
  const enrollment = await prisma.courseEnrollment.create({
    data: {
      courseId,
      userId,
      email: userEmail,
      progress: 0,
      stripePaymentId: session.payment_intent as string,
    },
  });

  console.log(`Course enrollment created for ${userEmail}: ${enrollment.id}`);
}

// Handle store purchase checkout completed
async function handleStorePurchaseCompleted(session: Stripe.Checkout.Session) {
  const itemsJson = session.metadata?.items;
  const hasPhysicalItems = session.metadata?.hasPhysicalItems === "true";

  if (!itemsJson) {
    console.error("Missing store purchase items in metadata");
    return;
  }

  try {
    const items = JSON.parse(itemsJson) as Array<{ id: string; quantity: number }>;
    const customerEmail = session.customer_details?.email || session.customer_email;
    // Get shipping details from the expanded session (if available)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const shippingDetails = (session as any).shipping_details as {
      name?: string;
      address?: {
        line1?: string;
        city?: string;
        state?: string;
        postal_code?: string;
      };
    } | null;

    // Get product prices for order items
    const productIds = items.map((item) => item.id);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true, price: true, isDigital: true, inventory: true },
    });

    const productMap = new Map(products.map((p) => [p.id, p]));

    // Create order record
    const order = await prisma.order.create({
      data: {
        stripeSessionId: session.id,
        stripePaymentId: session.payment_intent as string,
        email: customerEmail || "",
        total: (session.amount_total || 0) / 100,
        subtotal: (session.amount_subtotal || 0) / 100,
        shipping: hasPhysicalItems ? (session.total_details?.amount_shipping || 0) / 100 : 0,
        status: "PAID",
        shippingName: shippingDetails?.name || null,
        shippingAddress: shippingDetails?.address?.line1 || null,
        shippingCity: shippingDetails?.address?.city || null,
        shippingState: shippingDetails?.address?.state || null,
        shippingZip: shippingDetails?.address?.postal_code || null,
        items: {
          create: items.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            price: productMap.get(item.id)?.price || 0,
          })),
        },
      },
    });

    // Update product inventory for physical items
    for (const item of items) {
      const product = productMap.get(item.id);

      if (product && !product.isDigital) {
        await prisma.product.update({
          where: { id: item.id },
          data: {
            inventory: { decrement: item.quantity },
          },
        });
      }
    }

    console.log(`Store order created: ${order.id} for ${customerEmail}`);
  } catch (parseError) {
    console.error("Failed to parse store order items:", parseError);
  }
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
