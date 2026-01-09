import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';

interface CartItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CheckoutRequestBody {
  items: CartItem[];
  email?: string;
  shippingAddress?: {
    firstName: string;
    lastName: string;
    address: string;
    apartment?: string;
    city: string;
    state: string;
    zipCode: string;
    phone?: string;
  };
  promoCode?: string;
}

// POST /api/store/checkout - Create a Stripe checkout session
export async function POST(request: NextRequest) {
  try {
    const body: CheckoutRequestBody = await request.json();
    const { items, email, promoCode } = body;

    // Validate cart items
    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      );
    }

    // Verify products exist and get current prices from database
    const productIds = items.map((item) => item.id);
    const products = await prisma.product.findMany({
      where: {
        id: { in: productIds },
        isPublished: true,
      },
      select: {
        id: true,
        slug: true,
        name: true,
        price: true,
        images: true,
        inventory: true,
        isDigital: true,
        stripeProductId: true,
        stripePriceId: true,
      },
    });

    // Define the product type
    type ProductResult = typeof products[number];

    // Check all products were found
    if (products.length !== items.length) {
      const foundIds = products.map((p: ProductResult) => p.id);
      const missingIds = productIds.filter((id) => !foundIds.includes(id));
      return NextResponse.json(
        { error: `Products not found: ${missingIds.join(', ')}` },
        { status: 400 }
      );
    }

    // Check inventory for physical products
    const outOfStock: string[] = [];
    for (const item of items) {
      const product = products.find((p: ProductResult) => p.id === item.id);
      if (product && !product.isDigital && product.inventory < item.quantity) {
        outOfStock.push(product.name);
      }
    }

    if (outOfStock.length > 0) {
      return NextResponse.json(
        { error: `Out of stock: ${outOfStock.join(', ')}` },
        { status: 400 }
      );
    }

    // Determine if order has physical items (needs shipping)
    const hasPhysicalItems = items.some((item) => {
      const product = products.find((p: ProductResult) => p.id === item.id);
      return product && !product.isDigital;
    });

    // Get base URL for redirects
    const origin = request.headers.get('origin') || 'https://ketamineassociation.org';

    // Build line items for Stripe
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((item) => {
      const product = products.find((p: ProductResult) => p.id === item.id)!;
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            images: product.images.length > 0
              ? product.images.map((img: string) => img.startsWith('http') ? img : `${origin}${img}`)
              : undefined,
            metadata: {
              productId: product.id,
              slug: product.slug,
            },
          },
          unit_amount: Math.round(product.price * 100), // Convert to cents
        },
        quantity: item.quantity,
      };
    });

    // Build checkout session options
    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: lineItems,
      success_url: `${origin}/store/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/store/cart`,
      metadata: {
        items: JSON.stringify(items.map((i) => ({ id: i.id, quantity: i.quantity }))),
        hasPhysicalItems: hasPhysicalItems.toString(),
      },
    };

    // Add customer email if provided
    if (email) {
      sessionParams.customer_email = email;
    }

    // Add shipping address collection for physical items
    if (hasPhysicalItems) {
      sessionParams.shipping_address_collection = {
        allowed_countries: ['US'],
      };

      // Add shipping options
      sessionParams.shipping_options = [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 0,
              currency: 'usd',
            },
            display_name: 'Free Shipping',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 5,
              },
              maximum: {
                unit: 'business_day',
                value: 7,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 999,
              currency: 'usd',
            },
            display_name: 'Express Shipping',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 2,
              },
              maximum: {
                unit: 'business_day',
                value: 3,
              },
            },
          },
        },
      ];
    }

    // Apply discount if promo code provided
    if (promoCode) {
      // Look up promo code in Stripe
      try {
        const promoCodes = await stripe.promotionCodes.list({
          code: promoCode,
          active: true,
          limit: 1,
        });

        if (promoCodes.data.length > 0) {
          sessionParams.discounts = [
            {
              promotion_code: promoCodes.data[0].id,
            },
          ];
        }
      } catch (promoError) {
        console.warn('Promo code lookup failed:', promoError);
        // Continue without promo code
      }
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create(sessionParams);

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error('Checkout error:', error);

    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
