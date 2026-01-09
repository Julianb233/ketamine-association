'use client';

import { useState, useEffect, useCallback } from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { ProductCard, Product } from '@/components/store/ProductCard';
import { useCart } from '@/lib/cart-context';

// Categories for the store
const categories = [
  { id: 'all', name: 'All Products', icon: null },
  { id: 'journals', name: 'Journals', icon: null },
  { id: 'workbooks', name: 'Workbooks', icon: null },
  { id: 'supplements', name: 'Supplements', icon: null },
  { id: 'comfort_items', name: 'Comfort Items', icon: null },
  { id: 'books', name: 'Books', icon: null },
  { id: 'bundles', name: 'Bundles', icon: null },
];

// Sort options
const sortOptions = [
  { id: 'newest', label: 'Newest' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'name-asc', label: 'Name: A-Z' },
  { id: 'name-desc', label: 'Name: Z-A' },
];

// Placeholder products for fallback
const fallbackProducts: Product[] = [
  {
    id: '1',
    slug: 'ketamine-journey-journal',
    title: 'Ketamine Journey Journal',
    description: 'Document your healing journey with guided prompts and reflection exercises.',
    price: 29.99,
    compareAtPrice: 39.99,
    image: '/images/placeholder-product.jpg',
    category: 'Journals',
    rating: 5,
    reviewCount: 124,
    inStock: true,
  },
  {
    id: '2',
    slug: 'integration-workbook',
    title: 'Integration Workbook',
    description: 'Structured exercises to help you integrate insights from your ketamine sessions.',
    price: 24.99,
    image: '/images/placeholder-product.jpg',
    category: 'Workbooks',
    rating: 4,
    reviewCount: 89,
    inStock: true,
  },
  {
    id: '3',
    slug: 'magnesium-glycinate-supplement',
    title: 'Magnesium Glycinate',
    description: 'High-quality magnesium supplement to support relaxation and recovery.',
    price: 34.99,
    compareAtPrice: 44.99,
    image: '/images/placeholder-product.jpg',
    category: 'Supplements',
    rating: 5,
    reviewCount: 256,
    inStock: true,
  },
  {
    id: '4',
    slug: 'weighted-blanket',
    title: 'Comfort Weighted Blanket',
    description: 'Premium 15lb weighted blanket for grounding and comfort during integration.',
    price: 89.99,
    image: '/images/placeholder-product.jpg',
    category: 'Comfort Items',
    rating: 5,
    reviewCount: 178,
    inStock: true,
  },
  {
    id: '5',
    slug: 'ketamine-therapy-guide-book',
    title: 'The Complete Guide to Ketamine Therapy',
    description: 'Comprehensive book covering the science, practice, and integration of ketamine therapy.',
    price: 19.99,
    image: '/images/placeholder-product.jpg',
    category: 'Books',
    rating: 4,
    reviewCount: 312,
    inStock: true,
  },
  {
    id: '6',
    slug: 'healing-starter-bundle',
    title: 'Healing Starter Bundle',
    description: 'Everything you need to begin your ketamine therapy journey: journal, workbook, and guide.',
    price: 59.99,
    compareAtPrice: 74.97,
    image: '/images/placeholder-product.jpg',
    category: 'Bundles',
    rating: 5,
    reviewCount: 67,
    inStock: true,
  },
  {
    id: '7',
    slug: 'eye-mask-meditation',
    title: 'Premium Eye Mask',
    description: 'Soft, light-blocking eye mask designed for meditation and ketamine sessions.',
    price: 24.99,
    image: '/images/placeholder-product.jpg',
    category: 'Comfort Items',
    rating: 4,
    reviewCount: 145,
    inStock: false,
  },
  {
    id: '8',
    slug: 'vitamin-b-complex',
    title: 'Vitamin B Complex',
    description: 'Essential B vitamins to support neurological health and energy levels.',
    price: 29.99,
    image: '/images/placeholder-product.jpg',
    category: 'Supplements',
    rating: 4,
    reviewCount: 198,
    inStock: true,
  },
];

const priceRanges = [
  { id: 'all', label: 'All Prices', min: null, max: null },
  { id: 'under-25', label: 'Under $25', min: null, max: 25 },
  { id: '25-50', label: '$25 - $50', min: 25, max: 50 },
  { id: '50-100', label: '$50 - $100', min: 50, max: 100 },
  { id: 'over-100', label: 'Over $100', min: 100, max: null },
];

export default function StorePage() {
  const [products, setProducts] = useState<Product[]>(fallbackProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [selectedSort, setSelectedSort] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const { addItem, itemCount } = useCart();

  // Fetch products from API
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();

      if (selectedCategory !== 'all') {
        params.append('category', selectedCategory);
      }

      if (selectedSort) {
        params.append('sort', selectedSort);
      }

      const priceRange = priceRanges.find(r => r.id === selectedPriceRange);
      if (priceRange) {
        if (priceRange.min !== null) {
          params.append('minPrice', priceRange.min.toString());
        }
        if (priceRange.max !== null) {
          params.append('maxPrice', priceRange.max.toString());
        }
      }

      const response = await fetch(`/api/store/products?${params.toString()}`);

      if (response.ok) {
        const data = await response.json();
        // Transform API response to match Product interface
        const transformedProducts: Product[] = data.products.map((p: Record<string, unknown>) => ({
          id: p.id as string,
          slug: p.slug as string,
          title: p.name as string,
          description: p.description as string || '',
          price: p.price as number,
          compareAtPrice: p.compareAtPrice as number | undefined,
          image: p.image as string || '/images/placeholder-product.jpg',
          category: formatCategory(p.category as string),
          rating: 4, // Default rating since not in DB
          reviewCount: 0, // Default since not in DB
          inStock: p.inStock as boolean,
        }));

        if (transformedProducts.length > 0) {
          setProducts(transformedProducts);
        }
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      // Keep fallback products on error
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory, selectedSort, selectedPriceRange]);

  // Format category from enum to display
  function formatCategory(category: string): string {
    const categoryMap: Record<string, string> = {
      'JOURNALS': 'Journals',
      'WORKBOOKS': 'Workbooks',
      'SUPPLEMENTS': 'Supplements',
      'COMFORT_ITEMS': 'Comfort Items',
      'BOOKS': 'Books',
      'BUNDLES': 'Bundles',
    };
    return categoryMap[category] || category;
  }

  // Fetch products on mount and when filters change
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Filter products locally for fallback data
  const filteredProducts = products.filter((product) => {
    // Category filter
    if (selectedCategory !== 'all') {
      const categoryMap: Record<string, string> = {
        'journals': 'Journals',
        'workbooks': 'Workbooks',
        'supplements': 'Supplements',
        'comfort_items': 'Comfort Items',
        'books': 'Books',
        'bundles': 'Bundles',
      };
      if (product.category !== categoryMap[selectedCategory]) {
        return false;
      }
    }

    // Price filter
    const priceRange = priceRanges.find(r => r.id === selectedPriceRange);
    if (priceRange) {
      if (priceRange.min !== null && product.price < priceRange.min) {
        return false;
      }
      if (priceRange.max !== null && product.price >= priceRange.max) {
        return false;
      }
    }

    return true;
  });

  // Sort products locally
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (selectedSort) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'name-asc':
        return a.title.localeCompare(b.title);
      case 'name-desc':
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

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

  const featuredProducts = products.filter(p => p.compareAtPrice && p.inStock).slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="gradient-hero text-white py-16 md:py-24">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Resources for Your Healing Journey
            </h1>
            <p className="text-xl text-teal-100 mb-8">
              Curated products to support your ketamine therapy experience, from preparation through integration.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.slice(1).map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-white text-teal-700'
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-12">
        {/* Featured Products */}
        {featuredProducts.length > 0 && selectedCategory === 'all' && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                Featured Products
              </h2>
              <span className="text-sm text-teal-600 font-medium">
                Special Offers
              </span>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </section>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <aside className={`lg:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sticky top-6">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Filters</h3>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-slate-700 mb-3">Category</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={category.id}
                        checked={selectedCategory === category.id}
                        onChange={() => setSelectedCategory(category.id)}
                        className="w-4 h-4 text-teal-600 border-slate-300 focus:ring-teal-500"
                      />
                      <span className="text-sm text-slate-600">{category.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-slate-700 mb-3">Price Range</h4>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <label key={range.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="price"
                        value={range.id}
                        checked={selectedPriceRange === range.id}
                        onChange={() => setSelectedPriceRange(range.id)}
                        className="w-4 h-4 text-teal-600 border-slate-300 focus:ring-teal-500"
                      />
                      <span className="text-sm text-slate-600">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <Button
                variant="outline"
                size="sm"
                fullWidth
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedPriceRange('all');
                  setSelectedSort('newest');
                }}
              >
                Clear Filters
              </Button>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {/* Mobile Filter Toggle & Sort */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="lg:hidden">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    {showFilters ? 'Hide Filters' : 'Filters'}
                  </Button>
                </div>

                <p className="text-slate-600">
                  Showing <span className="font-semibold">{sortedProducts.length}</span> products
                </p>
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <label htmlFor="sort" className="text-sm text-slate-600 whitespace-nowrap">
                  Sort by:
                </label>
                <select
                  id="sort"
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  {sortOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600" />
              </div>
            )}

            {/* Products Grid */}
            {!isLoading && sortedProducts.length > 0 ? (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            ) : !isLoading ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">
                  <svg className="w-16 h-16 mx-auto text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  No products found
                </h3>
                <p className="text-slate-600 mb-6">
                  Try adjusting your filters to find what you are looking for.
                </p>
                <Button
                  variant="primary"
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedPriceRange('all');
                    setSelectedSort('newest');
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            ) : null}
          </div>
        </div>

        {/* Cart Summary Banner */}
        {itemCount > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg p-4 lg:hidden z-40">
            <Container>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <span className="font-medium text-slate-900">
                    {itemCount} {itemCount === 1 ? 'item' : 'items'} in cart
                  </span>
                </div>
                <Button variant="primary" size="sm" href="/store/cart">
                  View Cart
                </Button>
              </div>
            </Container>
          </div>
        )}
      </Container>
    </div>
  );
}
