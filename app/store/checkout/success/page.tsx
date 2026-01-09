'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { useCart, CartItem } from '@/lib/cart-context';
import { CheckoutProgress } from '@/components/checkout/CheckoutProgress';

interface OrderDetails {
  orderNumber: string;
  email: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  hasPhysicalItems: boolean;
  hasDigitalItems: boolean;
}

function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `KA-${timestamp}-${random}`;
}

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { items, clearCart, subtotal } = useCart();
  const [hasCleared, setHasCleared] = useState(false);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  // Store order details and clear cart on successful checkout
  useEffect(() => {
    if (sessionId && !hasCleared && items.length > 0) {
      // Store order details before clearing cart
      const shipping = subtotal > 50 ? 0 : 5.99;
      const tax = subtotal * 0.08;

      setOrderDetails({
        orderNumber: generateOrderNumber(),
        email: '', // Would be fetched from Stripe session in production
        items: [...items],
        subtotal,
        shipping,
        tax,
        total: subtotal + shipping + tax,
        hasPhysicalItems: true, // Would be determined from items in production
        hasDigitalItems: false,
      });

      clearCart();
      setHasCleared(true);
    }
  }, [sessionId, clearCart, hasCleared, items, subtotal]);

  // If we have no session ID, show a generic success message
  const displayOrderNumber = orderDetails?.orderNumber || generateOrderNumber();
  const displayItems = orderDetails?.items || [];
  const displaySubtotal = orderDetails?.subtotal || 0;
  const displayShipping = orderDetails?.shipping || 0;
  const displayTax = orderDetails?.tax || 0;
  const displayTotal = orderDetails?.total || 0;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Success Icon */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 mx-auto mb-6 bg-emerald-100 rounded-full flex items-center justify-center">
          <svg
            className="w-10 h-10 text-emerald-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Success Message */}
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Thank You for Your Order!
        </h1>
        <p className="text-lg text-slate-600 mb-2">
          Your payment was successful and your order has been placed.
        </p>
        <p className="text-slate-500">
          A confirmation email has been sent to your email address.
        </p>
      </div>

      {/* Order Number */}
      <div className="bg-teal-50 rounded-xl p-4 mb-8 text-center">
        <p className="text-sm text-teal-700 mb-1">Order Number</p>
        <p className="text-xl font-bold text-teal-900">{displayOrderNumber}</p>
      </div>

      {/* Order Summary */}
      {displayItems.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Order Summary
          </h2>

          {/* Order Items */}
          <div className="space-y-4 mb-6">
            {displayItems.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">
                    {item.name}
                  </p>
                  <p className="text-sm text-slate-500">
                    Qty: {item.quantity}
                  </p>
                </div>
                <p className="text-sm font-medium text-slate-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          {/* Summary Lines */}
          <div className="space-y-2 py-4 border-t border-slate-200">
            <div className="flex justify-between text-sm text-slate-600">
              <span>Subtotal</span>
              <span>${displaySubtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-slate-600">
              <span>Shipping</span>
              {displayShipping === 0 ? (
                <span className="text-emerald-600">FREE</span>
              ) : (
                <span>${displayShipping.toFixed(2)}</span>
              )}
            </div>
            <div className="flex justify-between text-sm text-slate-600">
              <span>Tax</span>
              <span>${displayTax.toFixed(2)}</span>
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between pt-4 border-t border-slate-200">
            <span className="text-lg font-bold text-slate-900">Total</span>
            <span className="text-lg font-bold text-slate-900">${displayTotal.toFixed(2)}</span>
          </div>
        </div>
      )}

      {/* What Happens Next */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          What happens next?
        </h2>
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-teal-600 text-sm font-semibold">1</span>
            </div>
            <div>
              <p className="font-medium text-slate-900">Order Confirmation</p>
              <p className="text-sm text-slate-600">
                You will receive an email confirmation with your order details shortly.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-teal-600 text-sm font-semibold">2</span>
            </div>
            <div>
              <p className="font-medium text-slate-900">Processing</p>
              <p className="text-sm text-slate-600">
                We will prepare your order for shipment within 1-2 business days.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-teal-600 text-sm font-semibold">3</span>
            </div>
            <div>
              <p className="font-medium text-slate-900">Shipping</p>
              <p className="text-sm text-slate-600">
                You will receive tracking information once your order ships (5-7 business days for standard shipping).
              </p>
            </div>
          </li>
        </ul>
      </div>

      {/* Digital Products Note */}
      <div className="bg-teal-50 rounded-xl p-4 mb-8">
        <div className="flex items-center gap-3">
          <svg
            className="w-5 h-5 text-teal-600 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          <p className="text-sm text-teal-800">
            If your order includes digital products, download links will be included in your confirmation email.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
        <Button variant="primary" size="lg" href="/store">
          Continue Shopping
        </Button>
        <Button variant="outline" size="lg" href="/dashboard/patient">
          View My Orders
        </Button>
      </div>

      {/* Support Link */}
      <p className="text-center text-sm text-slate-500">
        Have questions about your order?{' '}
        <Link href="/contact" className="text-teal-600 hover:underline">
          Contact our support team
        </Link>
      </p>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="max-w-xl mx-auto text-center">
      <div className="w-20 h-20 mx-auto mb-8 bg-slate-100 rounded-full flex items-center justify-center animate-pulse" />
      <div className="h-8 bg-slate-100 rounded mb-4 animate-pulse" />
      <div className="h-6 bg-slate-100 rounded mb-8 animate-pulse" />
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Container className="py-8 md:py-12">
        {/* Progress Indicator */}
        <CheckoutProgress currentStep="success" />

        <Suspense fallback={<LoadingFallback />}>
          <CheckoutSuccessContent />
        </Suspense>
      </Container>
    </div>
  );
}
