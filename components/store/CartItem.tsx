'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export interface CartItemType {
  id: string;
  slug: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const handleDecrement = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleIncrement = () => {
    onUpdateQuantity(item.id, item.quantity + 1);
  };

  return (
    <div className="flex gap-4 py-6 border-b border-slate-200 last:border-b-0">
      {/* Product Image */}
      <Link href={`/store/${item.slug}`} className="flex-shrink-0">
        <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-slate-100">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
          />
        </div>
      </Link>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <Link href={`/store/${item.slug}`}>
          <h3 className="text-lg font-semibold text-slate-900 hover:text-teal-700 transition-colors truncate">
            {item.title}
          </h3>
        </Link>
        <p className="text-lg font-bold text-slate-900 mt-1">
          ${item.price.toFixed(2)}
        </p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-4 mt-3">
          <div className="flex items-center border border-slate-300 rounded-lg">
            <button
              onClick={handleDecrement}
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
              onClick={handleIncrement}
              className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors rounded-r-lg"
              aria-label="Increase quantity"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          <button
            onClick={() => onRemove(item.id)}
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
  );
}
