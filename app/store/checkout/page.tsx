'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { useCart } from '@/lib/cart-context';
import { CheckoutProgress } from '@/components/checkout/CheckoutProgress';

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  sameAsBilling: boolean;
}

interface FormErrors {
  email?: string;
}

export default function CheckoutPage() {
  const { items, subtotal, itemCount } = useCart();

  const [formData, setFormData] = useState<FormData>({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    sameAsBilling: true,
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error when user starts typing
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    // Validate email on blur
    if (name === 'email') {
      if (!value) {
        setFormErrors((prev) => ({ ...prev, email: 'Email is required' }));
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        setFormErrors((prev) => ({ ...prev, email: 'Please enter a valid email address' }));
      }
    }
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleStripeCheckout = async () => {
    if (items.length === 0) {
      setError('Your cart is empty');
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      const response = await fetch('/api/store/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items.map((item) => ({
            id: item.id,
            slug: item.slug,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          email: formData.email || undefined,
          shippingAddress: formData.firstName ? {
            firstName: formData.firstName,
            lastName: formData.lastName,
            address: formData.address,
            apartment: formData.apartment,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
            phone: formData.phone,
          } : undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Checkout failed');
      }

      // Redirect to Stripe checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err instanceof Error ? err.message : 'Failed to create checkout session');
      setIsProcessing(false);
    }
  };

  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  // Show empty cart state
  if (items.length === 0 && !isProcessing) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Container className="py-8 md:py-12">
          <CheckoutProgress currentStep="checkout" />

          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-slate-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-slate-600 mb-8">
              Add some products to your cart before checking out.
            </p>
            <Button variant="primary" size="lg" href="/store">
              Continue Shopping
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Container className="py-8 md:py-12">
        {/* Progress Indicator */}
        <CheckoutProgress currentStep="checkout" />

        {/* Header */}
        <div className="mb-8">
          <Link
            href="/store/cart"
            className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium transition-colors mb-4"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Cart
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            Checkout
          </h1>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Information */}
            <Card padding="lg" className="border border-slate-200">
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                Contact Information
              </h2>
              <Input
                label="Email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleBlur}
                error={touched.email ? formErrors.email : undefined}
                helperText="Order confirmation will be sent to this email"
                required
              />
            </Card>

            {/* Shipping Address */}
            <Card padding="lg" className="border border-slate-200">
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                Shipping Address
              </h2>
              <p className="text-sm text-slate-500 mb-6">
                You can enter your shipping details here, or complete them on the Stripe checkout page.
              </p>
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    name="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                  <Input
                    label="Last Name"
                    name="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </div>
                <Input
                  label="Address"
                  name="address"
                  placeholder="123 Main Street"
                  value={formData.address}
                  onChange={handleInputChange}
                />
                <Input
                  label="Apartment, suite, etc. (optional)"
                  name="apartment"
                  placeholder="Apt 4B"
                  value={formData.apartment}
                  onChange={handleInputChange}
                />
                <div className="grid sm:grid-cols-3 gap-4">
                  <Input
                    label="City"
                    name="city"
                    placeholder="New York"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                  <Input
                    label="State"
                    name="state"
                    placeholder="NY"
                    value={formData.state}
                    onChange={handleInputChange}
                  />
                  <Input
                    label="ZIP Code"
                    name="zipCode"
                    placeholder="10001"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                  />
                </div>
                <Input
                  label="Phone (optional)"
                  name="phone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={formData.phone}
                  onChange={handleInputChange}
                  helperText="For delivery updates"
                />
              </div>
            </Card>

            {/* Payment Notice */}
            <Card padding="lg" className="border border-slate-200">
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                Payment
              </h2>

              <div className="flex items-center gap-4 p-4 bg-teal-50 rounded-xl mb-6">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-teal-900">Secure Stripe Checkout</h3>
                  <p className="text-sm text-teal-700">
                    You will be redirected to Stripe to complete your payment securely.
                  </p>
                </div>
              </div>

              {/* Security Badges */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="flex flex-col items-center text-center p-3 bg-slate-50 rounded-lg">
                  <svg className="w-6 h-6 text-slate-600 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-xs text-slate-600">SSL Secure</span>
                </div>
                <div className="flex flex-col items-center text-center p-3 bg-slate-50 rounded-lg">
                  <svg className="w-6 h-6 text-slate-600 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  <span className="text-xs text-slate-600">PCI Compliant</span>
                </div>
                <div className="flex flex-col items-center text-center p-3 bg-slate-50 rounded-lg">
                  <svg className="w-6 h-6 text-slate-600 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span className="text-xs text-slate-600">256-bit Encryption</span>
                </div>
              </div>

              {/* Accepted Payment Methods */}
              <div className="pt-4 border-t border-slate-200">
                <p className="text-sm text-slate-500 mb-3">Accepted payment methods:</p>
                <div className="flex gap-3">
                  <div className="w-12 h-8 bg-slate-100 rounded flex items-center justify-center text-xs font-medium text-slate-600">
                    Visa
                  </div>
                  <div className="w-12 h-8 bg-slate-100 rounded flex items-center justify-center text-xs font-medium text-slate-600">
                    MC
                  </div>
                  <div className="w-12 h-8 bg-slate-100 rounded flex items-center justify-center text-xs font-medium text-slate-600">
                    Amex
                  </div>
                  <div className="w-16 h-8 bg-slate-100 rounded flex items-center justify-center text-xs font-medium text-slate-600">
                    Apple Pay
                  </div>
                  <div className="w-16 h-8 bg-slate-100 rounded flex items-center justify-center text-xs font-medium text-slate-600">
                    Google Pay
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sticky top-6">
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                Order Summary
              </h2>

              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-slate-700 text-white text-xs font-medium rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
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
              <div className="space-y-3 py-4 border-t border-slate-200">
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Subtotal ({itemCount} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Shipping</span>
                  {shipping === 0 ? (
                    <span className="text-emerald-600 font-medium">FREE</span>
                  ) : (
                    <span>${shipping.toFixed(2)}</span>
                  )}
                </div>
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Estimated Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between py-4 border-t border-slate-200">
                <span className="text-lg font-bold text-slate-900">Total</span>
                <span className="text-lg font-bold text-slate-900">${total.toFixed(2)}</span>
              </div>

              {/* Checkout Button */}
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleStripeCheckout}
                isLoading={isProcessing}
                className="mt-4"
              >
                {isProcessing ? 'Redirecting...' : 'Proceed to Payment'}
              </Button>

              {/* Terms */}
              <p className="mt-4 text-xs text-slate-500 text-center">
                By proceeding, you agree to our{' '}
                <Link href="/terms" className="text-teal-600 hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-teal-600 hover:underline">
                  Privacy Policy
                </Link>
              </p>

              {/* Security */}
              <div className="mt-6 pt-6 border-t border-slate-200">
                <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Secure 256-bit SSL encryption
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
