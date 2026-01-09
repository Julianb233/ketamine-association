'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'text-amber-400' : 'text-slate-200'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="text-sm text-slate-500">({count})</span>
    </div>
  );
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPercentage = hasDiscount
    ? Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100)
    : 0;

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-slate-300 hover:-translate-y-1">
      {/* Image Container */}
      <Link href={`/store/${product.slug}`} className="block relative aspect-square overflow-hidden bg-slate-100">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {hasDiscount && (
          <Badge variant="accent" size="sm" className="absolute top-3 left-3">
            {discountPercentage}% OFF
          </Badge>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-slate-900/50 flex items-center justify-center">
            <Badge variant="default" size="lg">Out of Stock</Badge>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-4">
        <Link href={`/store/${product.slug}`}>
          <p className="text-xs font-medium text-teal-600 uppercase tracking-wide mb-1">
            {product.category}
          </p>
          <h3 className="text-lg font-semibold text-slate-900 mb-2 line-clamp-2 group-hover:text-teal-700 transition-colors">
            {product.title}
          </h3>
        </Link>

        <StarRating rating={product.rating} count={product.reviewCount} />

        {/* Price */}
        <div className="mt-3 flex items-center gap-2">
          <span className="text-xl font-bold text-slate-900">
            ${product.price.toFixed(2)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-slate-400 line-through">
              ${product.compareAtPrice!.toFixed(2)}
            </span>
          )}
        </div>

        {/* Add to Cart */}
        <Button
          variant="primary"
          size="sm"
          fullWidth
          className="mt-4"
          disabled={!product.inStock}
          onClick={() => onAddToCart?.(product)}
        >
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </div>
    </div>
  );
}
