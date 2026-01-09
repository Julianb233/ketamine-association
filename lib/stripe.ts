import Stripe from "stripe";

// Initialize Stripe with the secret key
// Note: STRIPE_SECRET_KEY should be set in .env.local with your actual test/live key
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
  typescript: true,
});

// Type definitions for checkout session metadata
export type CheckoutType = "subscription" | "event_registration" | "course_enrollment" | "store_purchase";

export interface CheckoutMetadata {
  type: CheckoutType;
  [key: string]: string;
}

export const MEMBERSHIP_TIERS = {
  FREE: {
    name: "Free",
    description: "Basic directory listing",
    monthlyPrice: 0,
    annualPrice: 0,
    features: [
      "Basic directory listing",
      "Profile page",
      "Community access",
    ],
    limits: {
      leads: 0,
      articles: 0,
      events: 0,
    },
  },
  PROFESSIONAL: {
    name: "Professional",
    description: "For growing practices",
    monthlyPrice: 99,
    annualPrice: 948,
    priceIds: {
      monthly: process.env.STRIPE_PROFESSIONAL_MONTHLY_PRICE_ID,
      annual: process.env.STRIPE_PROFESSIONAL_ANNUAL_PRICE_ID,
    },
    features: [
      "Enhanced profile",
      "5 leads/month",
      "Priority listing",
      "Badge display",
      "Basic analytics",
    ],
    limits: {
      leads: 5,
      articles: 2,
      events: 1,
    },
  },
  PREMIUM: {
    name: "Premium",
    description: "For established practices",
    monthlyPrice: 249,
    annualPrice: 2388,
    priceIds: {
      monthly: process.env.STRIPE_PREMIUM_MONTHLY_PRICE_ID,
      annual: process.env.STRIPE_PREMIUM_ANNUAL_PRICE_ID,
    },
    features: [
      "Everything in Professional",
      "20 leads/month",
      "Featured placement",
      "Advanced analytics",
      "CE credit discounts",
      "Event discounts",
    ],
    limits: {
      leads: 20,
      articles: 5,
      events: 3,
    },
  },
  ELITE: {
    name: "Elite",
    description: "For industry leaders",
    monthlyPrice: 449,
    annualPrice: 4308,
    priceIds: {
      monthly: process.env.STRIPE_ELITE_MONTHLY_PRICE_ID,
      annual: process.env.STRIPE_ELITE_ANNUAL_PRICE_ID,
    },
    features: [
      "Everything in Premium",
      "Unlimited leads",
      "Top placement",
      "Dedicated support",
      "Speaking opportunities",
      "Research collaboration",
      "Co-marketing",
    ],
    limits: {
      leads: Infinity,
      articles: Infinity,
      events: Infinity,
    },
  },
} as const;

export type MembershipTier = keyof typeof MEMBERSHIP_TIERS;

export async function createCheckoutSession({
  customerId,
  priceId,
  successUrl,
  cancelUrl,
  metadata,
}: {
  customerId?: string;
  priceId: string;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
}) {
  return stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    customer: customerId,
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata,
  });
}

export async function createCustomerPortalSession(customerId: string, returnUrl: string) {
  return stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });
}

export async function getSubscription(subscriptionId: string) {
  return stripe.subscriptions.retrieve(subscriptionId);
}

export async function cancelSubscription(subscriptionId: string) {
  return stripe.subscriptions.cancel(subscriptionId);
}

// Create a one-time payment checkout session (for events, courses, store)
export async function createOneTimeCheckoutSession({
  customerId,
  customerEmail,
  lineItems,
  successUrl,
  cancelUrl,
  metadata,
  shippingAddressCollection,
  shippingOptions,
  discounts,
}: {
  customerId?: string;
  customerEmail?: string;
  lineItems: Stripe.Checkout.SessionCreateParams.LineItem[];
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
  shippingAddressCollection?: Stripe.Checkout.SessionCreateParams.ShippingAddressCollection;
  shippingOptions?: Stripe.Checkout.SessionCreateParams.ShippingOption[];
  discounts?: Stripe.Checkout.SessionCreateParams.Discount[];
}) {
  const sessionParams: Stripe.Checkout.SessionCreateParams = {
    mode: "payment",
    payment_method_types: ["card"],
    line_items: lineItems,
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata,
  };

  // Add customer if provided
  if (customerId) {
    sessionParams.customer = customerId;
  } else if (customerEmail) {
    sessionParams.customer_email = customerEmail;
  }

  // Add shipping if needed
  if (shippingAddressCollection) {
    sessionParams.shipping_address_collection = shippingAddressCollection;
  }
  if (shippingOptions) {
    sessionParams.shipping_options = shippingOptions;
  }

  // Add discounts if provided
  if (discounts) {
    sessionParams.discounts = discounts;
  }

  return stripe.checkout.sessions.create(sessionParams);
}

// Create event registration checkout session
export async function createEventCheckoutSession({
  eventId,
  eventTitle,
  eventSlug,
  price,
  customerEmail,
  firstName,
  lastName,
  practitionerId,
  successUrl,
  cancelUrl,
}: {
  eventId: string;
  eventTitle: string;
  eventSlug: string;
  price: number;
  customerEmail: string;
  firstName: string;
  lastName: string;
  practitionerId?: string;
  successUrl: string;
  cancelUrl: string;
}) {
  return stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: eventTitle,
            description: `Registration for ${eventTitle}`,
          },
          unit_amount: Math.round(price * 100), // Convert to cents
        },
        quantity: 1,
      },
    ],
    customer_email: customerEmail,
    metadata: {
      type: "event_registration",
      eventId,
      eventSlug,
      email: customerEmail,
      firstName,
      lastName,
      practitionerId: practitionerId || "",
    },
    success_url: successUrl,
    cancel_url: cancelUrl,
  });
}

// Create course enrollment checkout session
export async function createCourseCheckoutSession({
  courseId,
  courseSlug,
  courseTitle,
  courseDescription,
  price,
  customerId,
  customerEmail,
  userId,
  successUrl,
  cancelUrl,
}: {
  courseId: string;
  courseSlug: string;
  courseTitle: string;
  courseDescription?: string;
  price: number;
  customerId?: string;
  customerEmail: string;
  userId: string;
  successUrl: string;
  cancelUrl: string;
}) {
  return stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: courseTitle,
            description: courseDescription || undefined,
          },
          unit_amount: Math.round(price * 100), // Convert to cents
        },
        quantity: 1,
      },
    ],
    customer: customerId,
    customer_email: customerId ? undefined : customerEmail,
    metadata: {
      type: "course_enrollment",
      courseId,
      courseSlug,
      userId,
      userEmail: customerEmail,
    },
    success_url: successUrl,
    cancel_url: cancelUrl,
  });
}

// Verify a webhook signature
export function verifyWebhookSignature(
  payload: string | Buffer,
  signature: string,
  webhookSecret: string
): Stripe.Event {
  return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
}

// Get a checkout session by ID
export async function getCheckoutSession(sessionId: string) {
  return stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "customer"],
  });
}

// Get invoice by ID
export async function getInvoice(invoiceId: string) {
  return stripe.invoices.retrieve(invoiceId);
}

// Create or get a Stripe customer
export async function getOrCreateCustomer({
  email,
  name,
  metadata,
}: {
  email: string;
  name?: string;
  metadata?: Record<string, string>;
}) {
  // First, try to find existing customer by email
  const existingCustomers = await stripe.customers.list({
    email,
    limit: 1,
  });

  if (existingCustomers.data.length > 0) {
    return existingCustomers.data[0];
  }

  // Create new customer
  return stripe.customers.create({
    email,
    name,
    metadata,
  });
}
