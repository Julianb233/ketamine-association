import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
  typescript: true,
});

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
