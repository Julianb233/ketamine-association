'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CartItem } from '@/lib/cart-context';

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  shipping?: number;
  tax?: number;
  discount?: number;
  showImages?: boolean;
  compact?: boolean;
}

export function OrderSummary({
  items,
  subtotal,
  shipping = 0,
  tax = 0,
  discount = 0,
  showImages = true,
  compact = false,
}: OrderSummaryProps) {
  const total = subtotal - discount + shipping + tax;
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <div className="space-y-4">
      {/* Order Items */}
      <div className={cn('space-y-4', compact ? 'mb-4' : 'mb-6')}>
        {items.map((item) => (
          <div key={item.id} className="flex gap-3">
            {showImages && (
              <Link href={`/store/${item.slug}`} className="flex-shrink-0">
                <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-slate-100">
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
              </Link>
            )}
            <div className="flex-1 min-w-0">
              <p className={cn('font-medium text-slate-900 truncate', compact ? 'text-sm' : 'text-sm')}>
                {item.name}
              </p>
              {item.category && (
                <p className="text-xs text-slate-500">{item.category}</p>
              )}
              {!showImages && (
                <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
              )}
            </div>
            <p className={cn('font-medium text-slate-900', compact ? 'text-sm' : 'text-sm')}>
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      {/* Summary Lines */}
      <div className="space-y-3 py-4 border-t border-slate-200">
        <div className="flex justify-between text-sm text-slate-600">
          <span>Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-sm text-emerald-600">
            <span>Discount</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between text-sm text-slate-600">
          <span>Shipping</span>
          {shipping === 0 ? (
            <span className="text-emerald-600 font-medium">FREE</span>
          ) : (
            <span>${shipping.toFixed(2)}</span>
          )}
        </div>

        {tax > 0 && (
          <div className="flex justify-between text-sm text-slate-600">
            <span>Estimated Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
        )}
      </div>

      {/* Total */}
      <div className="flex justify-between py-4 border-t border-slate-200">
        <span className="text-lg font-bold text-slate-900">Total</span>
        <span className="text-lg font-bold text-slate-900">${total.toFixed(2)}</span>
      </div>
    </div>
  );
}

// Utility function for cn if not imported
function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ');
}
