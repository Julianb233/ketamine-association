'use client';

import { ProductCard, Product } from '@/components/store/ProductCard';

// Suggested products - in a real app, these would come from an API
const suggestedProducts: Product[] = [
  {
    id: 'suggested-1',
    slug: 'ketamine-journey-journal',
    title: 'Ketamine Journey Journal',
    description: 'Document your healing journey with guided prompts and reflection exercises.',
    price: 29.99,
    compareAtPrice: 39.99,
    image: '/images/placeholder-product.svg',
    category: 'Journals',
    rating: 5,
    reviewCount: 124,
    inStock: true,
  },
  {
    id: 'suggested-2',
    slug: 'integration-workbook',
    title: 'Integration Workbook',
    description: 'Structured exercises to help you integrate insights from your ketamine sessions.',
    price: 24.99,
    image: '/images/placeholder-product.svg',
    category: 'Workbooks',
    rating: 4,
    reviewCount: 89,
    inStock: true,
  },
  {
    id: 'suggested-3',
    slug: 'magnesium-glycinate-supplement',
    title: 'Magnesium Glycinate',
    description: 'High-quality magnesium supplement to support relaxation and recovery.',
    price: 34.99,
    compareAtPrice: 44.99,
    image: '/images/placeholder-product.svg',
    category: 'Supplements',
    rating: 5,
    reviewCount: 256,
    inStock: true,
  },
];

interface SuggestedProductsProps {
  currentProductIds?: string[];
  onAddToCart?: (product: Product) => void;
  title?: string;
  maxProducts?: number;
}

export function SuggestedProducts({
  currentProductIds = [],
  onAddToCart,
  title = 'You Might Also Like',
  maxProducts = 3,
}: SuggestedProductsProps) {
  // Filter out products already in cart
  const filteredProducts = suggestedProducts
    .filter((product) => !currentProductIds.includes(product.id))
    .slice(0, maxProducts);

  if (filteredProducts.length === 0) {
    return null;
  }

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">{title}</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
}
