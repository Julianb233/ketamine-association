'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useCart } from '@/lib/cart-context';
import { CheckoutProgress } from '@/components/checkout/CheckoutProgress';
import { SuggestedProducts } from '@/components/checkout/SuggestedProducts';
import { Product } from '@/components/store/ProductCard';

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, itemCount, clearCart, addItem } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  const handleApplyPromo = () => {
    // Demo promo code logic
    if (promoCode.toUpperCase() === 'HEALING10') {
      setPromoApplied(true);
      setPromoError('');
    } else if (promoCode) {
      setPromoError('Invalid promo code');
      setPromoApplied(false);
    }
  };

  const discount = promoApplied ? subtotal * 0.1 : 0;
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal - discount + shipping;

  const isEmpty = items.length === 0;

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.title,
      price: product.price,
      image: product.image,
      category: product.category,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Container className="py-8 md:py-12">
        {/* Progress Indicator */}
        <CheckoutProgress currentStep="cart" />

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            Your Cart
          </h1>
          <p className="text-slate-600">
            {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        {isEmpty ? (
          /* Empty Cart State */
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-slate-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">
              Looks like you have not added any products to your cart yet. Explore our store to find resources for your healing journey.
            </p>
            <Button variant="primary" size="lg" href="/store">
              Continue Shopping
            </Button>

            {/* Suggested Products for Empty Cart */}
            <SuggestedProducts
              onAddToCart={handleAddToCart}
              title="Popular Products"
            />
          </div>
        ) : (
          <>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                  <div className="divide-y divide-slate-200">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4 py-6 first:pt-0 last:pb-0">
                        {/* Product Image */}
                        <Link href={`/store/${item.slug}`} className="flex-shrink-0">
                          <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-slate-100">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </Link>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <Link href={`/store/${item.slug}`}>
                            <h3 className="text-lg font-semibold text-slate-900 hover:text-teal-700 transition-colors truncate">
                              {item.name}
                            </h3>
                          </Link>
                          {item.category && (
                            <p className="text-sm text-slate-500 mt-0.5">{item.category}</p>
                          )}
                          <p className="text-lg font-bold text-slate-900 mt-1">
                            ${item.price.toFixed(2)}
                          </p>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-4 mt-3">
                            <div className="flex items-center border border-slate-300 rounded-lg">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-l-lg"
                                aria-label="Decrease quantity"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                </svg>
                              </button>
                              <span className="w-10 text-center font-medium text-slate-900">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors rounded-r-lg"
                                aria-label="Increase quantity"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                              </button>
                            </div>

                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        </div>

                        {/* Line Total */}
                        <div className="text-right">
                          <p className="text-lg font-bold text-slate-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cart Actions */}
                <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <Link
                    href="/store"
                    className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Continue Shopping
                  </Link>
                  <button
                    onClick={clearCart}
                    className="text-sm text-slate-500 hover:text-slate-700 font-medium transition-colors"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl border border-slate-200 p-6 sticky top-6">
                  <h2 className="text-xl font-bold text-slate-900 mb-6">
                    Order Summary
                  </h2>

                  {/* Promo Code */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Promo Code
                    </label>
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        placeholder="Enter code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        error={promoError}
                        className="flex-1"
                      />
                      <Button
                        variant="secondary"
                        size="md"
                        onClick={handleApplyPromo}
                      >
                        Apply
                      </Button>
                    </div>
                    {promoApplied && (
                      <p className="mt-2 text-sm text-emerald-600 font-medium">
                        Promo code applied! 10% off your order.
                      </p>
                    )}
                    <p className="mt-2 text-xs text-slate-500">
                      Try &quot;HEALING10&quot; for 10% off
                    </p>
                  </div>

                  {/* Summary Lines */}
                  <div className="space-y-4 py-4 border-t border-slate-200">
                    <div className="flex justify-between text-slate-600">
                      <span>Subtotal ({itemCount} items)</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-emerald-600">
                        <span>Discount (10%)</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-slate-600">
                      <span>Shipping</span>
                      <span>
                        {shipping === 0 ? (
                          <span className="text-emerald-600 font-medium">FREE</span>
                        ) : (
                          `$${shipping.toFixed(2)}`
                        )}
                      </span>
                    </div>
                    {shipping > 0 && (
                      <p className="text-xs text-slate-500">
                        Free shipping on orders over $50
                      </p>
                    )}
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
                    href="/store/checkout"
                    className="mt-4"
                  >
                    Proceed to Checkout
                  </Button>

                  {/* Security Notice */}
                  <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Secure checkout powered by Stripe
                  </div>

                  {/* Accepted Payment Methods */}
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <p className="text-xs text-slate-500 text-center mb-3">Accepted payment methods</p>
                    <div className="flex justify-center gap-2">
                      <div className="w-10 h-6 bg-slate-100 rounded flex items-center justify-center text-xs font-medium text-slate-500">
                        Visa
                      </div>
                      <div className="w-10 h-6 bg-slate-100 rounded flex items-center justify-center text-xs font-medium text-slate-500">
                        MC
                      </div>
                      <div className="w-12 h-6 bg-slate-100 rounded flex items-center justify-center text-xs font-medium text-slate-500">
                        Amex
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Suggested Products */}
            <SuggestedProducts
              currentProductIds={items.map((item) => item.id)}
              onAddToCart={handleAddToCart}
              title="You Might Also Like"
            />
          </>
        )}
      </Container>
    </div>
  );
}
