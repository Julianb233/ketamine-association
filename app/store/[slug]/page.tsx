'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProductCard, Product } from '@/components/store/ProductCard';
import { useCart } from '@/lib/cart-context';

// Extended product type for detail page
interface ProductDetail extends Product {
  images: string[];
  longDescription: string;
  details: { label: string; value: string }[];
  reviews: { id: string; author: string; rating: number; date: string; content: string }[];
}

// Placeholder product data - in production this would come from an API
const productData: Record<string, ProductDetail> = {
  'ketamine-journey-journal': {
    id: '1',
    slug: 'ketamine-journey-journal',
    title: 'Ketamine Journey Journal',
    description: 'Document your healing journey with guided prompts and reflection exercises.',
    longDescription: `
      The Ketamine Journey Journal is specifically designed to support your ketamine therapy experience from preparation through integration.

      Each section includes carefully crafted prompts that help you explore your intentions, document your experiences, and integrate insights into lasting change.

      Features include:
      - Pre-session intention setting exercises
      - During-session observation pages (for trusted companions)
      - Post-session reflection prompts
      - Integration tracking tools
      - Weekly progress reviews
      - 180 pages of premium paper
      - Lay-flat binding for easy writing
    `,
    price: 29.99,
    compareAtPrice: 39.99,
    images: [
      '/images/placeholder-product.svg',
      '/images/placeholder-product-2.svg',
      '/images/placeholder-product-3.svg',
    ],
    image: '/images/placeholder-product.svg',
    category: 'Journals',
    rating: 5,
    reviewCount: 124,
    inStock: true,
    details: [
      { label: 'Pages', value: '180' },
      { label: 'Size', value: '6" x 9"' },
      { label: 'Binding', value: 'Lay-flat' },
      { label: 'Paper', value: '100gsm premium' },
      { label: 'Cover', value: 'Hardcover with ribbon bookmark' },
    ],
    reviews: [
      {
        id: '1',
        author: 'Sarah M.',
        rating: 5,
        date: '2024-01-15',
        content: 'This journal has been invaluable for my ketamine therapy journey. The prompts are thoughtful and help me process each session deeply.',
      },
      {
        id: '2',
        author: 'Michael R.',
        rating: 5,
        date: '2024-01-10',
        content: 'Beautiful quality and incredibly helpful structure. I feel more connected to my healing process since using this journal.',
      },
      {
        id: '3',
        author: 'Jennifer L.',
        rating: 4,
        date: '2024-01-05',
        content: 'Great journal with excellent prompts. Would love even more pages for the integration section.',
      },
    ],
  },
  'integration-workbook': {
    id: '2',
    slug: 'integration-workbook',
    title: 'Integration Workbook',
    description: 'Structured exercises to help you integrate insights from your ketamine sessions.',
    longDescription: `
      The Integration Workbook provides a structured approach to processing and implementing the insights gained from your ketamine therapy sessions.

      This workbook includes:
      - Cognitive reframing exercises
      - Emotional processing worksheets
      - Behavioral change tracking
      - Goal setting frameworks
      - Mindfulness practices
      - 120 pages of guided exercises
    `,
    price: 24.99,
    images: ['/images/placeholder-product.svg'],
    image: '/images/placeholder-product.svg',
    category: 'Workbooks',
    rating: 4,
    reviewCount: 89,
    inStock: true,
    details: [
      { label: 'Pages', value: '120' },
      { label: 'Size', value: '8.5" x 11"' },
      { label: 'Binding', value: 'Spiral bound' },
      { label: 'Paper', value: '80gsm' },
    ],
    reviews: [
      {
        id: '1',
        author: 'David K.',
        rating: 5,
        date: '2024-01-12',
        content: 'Excellent workbook for integration. The exercises are practical and meaningful.',
      },
    ],
  },
};

// Related products placeholder
const relatedProducts: Product[] = [
  {
    id: '2',
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
    id: '6',
    slug: 'healing-starter-bundle',
    title: 'Healing Starter Bundle',
    description: 'Everything you need to begin your ketamine therapy journey.',
    price: 59.99,
    compareAtPrice: 74.97,
    image: '/images/placeholder-product.svg',
    category: 'Bundles',
    rating: 5,
    reviewCount: 67,
    inStock: true,
  },
  {
    id: '5',
    slug: 'ketamine-therapy-guide-book',
    title: 'The Complete Guide to Ketamine Therapy',
    description: 'Comprehensive book covering the science, practice, and integration.',
    price: 19.99,
    image: '/images/placeholder-product.svg',
    category: 'Books',
    rating: 4,
    reviewCount: 312,
    inStock: true,
  },
];

function StarRating({ rating, count, size = 'md' }: { rating: number; count?: number; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`${sizeClasses[size]} ${
              star <= rating ? 'text-amber-400' : 'text-slate-200'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      {count !== undefined && (
        <span className="text-sm text-slate-500">({count} reviews)</span>
      )}
    </div>
  );
}

type TabId = 'description' | 'details' | 'reviews';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { addItem, isInCart, getItemQuantity } = useCart();

  // Get product data (fallback to first product for demo)
  const product = productData[slug] || productData['ketamine-journey-journal'];

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<TabId>('description');
  const [addedToCart, setAddedToCart] = useState(false);

  // Check if already in cart
  const inCart = isInCart(product.id);
  const cartQuantity = getItemQuantity(product.id);

  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPercentage = hasDiscount
    ? Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100)
    : 0;

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.title,
      price: product.price,
      image: product.image,
      category: product.category,
    }, quantity);

    setAddedToCart(true);

    // Reset added state after animation
    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  const handleAddRelatedToCart = (relatedProduct: Product) => {
    addItem({
      id: relatedProduct.id,
      slug: relatedProduct.slug,
      name: relatedProduct.title,
      price: relatedProduct.price,
      image: relatedProduct.image,
      category: relatedProduct.category,
    });
  };

  const tabs: { id: TabId; label: string }[] = [
    { id: 'description', label: 'Description' },
    { id: 'details', label: 'Details' },
    { id: 'reviews', label: `Reviews (${product.reviewCount})` },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Container className="py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link href="/store" className="text-slate-500 hover:text-teal-600 transition-colors">
                Store
              </Link>
            </li>
            <li className="text-slate-400">/</li>
            <li>
              <Link href={`/store?category=${product.category.toLowerCase().replace(' ', '_')}`} className="text-slate-500 hover:text-teal-600 transition-colors">
                {product.category}
              </Link>
            </li>
            <li className="text-slate-400">/</li>
            <li className="text-slate-900 font-medium">{product.title}</li>
          </ol>
        </nav>

        {/* Product Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-slate-200">
              <Image
                src={product.images[selectedImage]}
                alt={product.title}
                fill
                className="object-cover"
              />
              {hasDiscount && (
                <Badge variant="accent" size="lg" className="absolute top-4 left-4">
                  {discountPercentage}% OFF
                </Badge>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-teal-600' : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.title} thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <Badge variant="primary" size="sm" className="mb-4">
              {product.category}
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {product.title}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <StarRating rating={product.rating} count={product.reviewCount} size="lg" />
            </div>

            <p className="text-lg text-slate-600 mb-6">
              {product.description}
            </p>

            {/* Price */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-3xl font-bold text-slate-900">
                ${product.price.toFixed(2)}
              </span>
              {hasDiscount && (
                <>
                  <span className="text-xl text-slate-400 line-through">
                    ${product.compareAtPrice!.toFixed(2)}
                  </span>
                  <Badge variant="accent" size="sm">
                    Save ${(product.compareAtPrice! - product.price).toFixed(2)}
                  </Badge>
                </>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-slate-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-l-lg"
                    aria-label="Decrease quantity"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="w-12 text-center font-medium text-slate-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors rounded-r-lg"
                    aria-label="Increase quantity"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
                {inCart && (
                  <span className="text-sm text-teal-600 font-medium">
                    {cartQuantity} already in cart
                  </span>
                )}
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                variant={addedToCart ? 'secondary' : 'primary'}
                size="lg"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1"
              >
                {addedToCart ? (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Added to Cart
                  </>
                ) : product.inStock ? (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Add to Cart
                  </>
                ) : (
                  'Out of Stock'
                )}
              </Button>
              {inCart && (
                <Button variant="secondary" size="lg" href="/store/cart">
                  View Cart
                </Button>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2 text-sm">
              {product.inStock ? (
                <>
                  <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                  <span className="text-emerald-600 font-medium">In Stock</span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 bg-red-500 rounded-full" />
                  <span className="text-red-600 font-medium">Out of Stock</span>
                </>
              )}
            </div>

            {/* Trust Badges */}
            <div className="mt-8 pt-8 border-t border-slate-200">
              <div className="flex flex-wrap gap-6 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Free shipping over $50</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>30-day returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-16">
          <div className="border-b border-slate-200 mb-8">
            <nav className="flex gap-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-teal-600 text-teal-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8">
            {activeTab === 'description' && (
              <div className="prose prose-slate max-w-none">
                <p className="whitespace-pre-line text-slate-600">
                  {product.longDescription}
                </p>
              </div>
            )}

            {activeTab === 'details' && (
              <div className="grid sm:grid-cols-2 gap-6">
                {product.details.map((detail, index) => (
                  <div key={index} className="flex justify-between py-3 border-b border-slate-100 last:border-0">
                    <span className="text-slate-500">{detail.label}</span>
                    <span className="font-medium text-slate-900">{detail.value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-8">
                {product.reviews.map((review) => (
                  <div key={review.id} className="border-b border-slate-100 pb-8 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                          <span className="text-teal-700 font-semibold">
                            {review.author.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{review.author}</p>
                          <p className="text-sm text-slate-500">
                            {new Date(review.date).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </p>
                        </div>
                      </div>
                      <StarRating rating={review.rating} size="sm" />
                    </div>
                    <p className="text-slate-600">{review.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-8">
            You May Also Like
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts
              .filter((p) => p.slug !== product.slug)
              .slice(0, 3)
              .map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  onAddToCart={() => handleAddRelatedToCart(relatedProduct)}
                />
              ))}
          </div>
        </section>
      </Container>
    </div>
  );
}
