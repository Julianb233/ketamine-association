/**
 * ProductSchema Component
 * Generates JSON-LD structured data for store products
 * Optimized for e-commerce SEO and rich product results
 */

import type { ProductSchema as ProductSchemaType, AggregateRatingSchema, ReviewSchema } from '@/types/seo';

interface ProductData {
  name: string;
  description: string;
  slug: string;
  image?: string | string[];
  price: number;
  compareAtPrice?: number;
  currency?: string;
  sku?: string;
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder' | 'BackOrder';
  category?: string;
  brand?: string;
  rating?: number;
  reviewCount?: number;
  reviews?: Array<{
    author: string;
    rating: number;
    content?: string;
    date?: string;
  }>;
  gtin?: string;
  mpn?: string;
  condition?: 'NewCondition' | 'UsedCondition' | 'RefurbishedCondition';
  weight?: {
    value: number;
    unit: string;
  };
  dimensions?: {
    height?: string;
    width?: string;
    depth?: string;
  };
}

interface ProductSchemaProps {
  product: ProductData;
}

const SITE_URL = 'https://ketamineassociation.org';
const SITE_NAME = 'Ketamine Association';

export function ProductSchema({ product }: ProductSchemaProps) {
  const productUrl = `${SITE_URL}/store/${product.slug}`;

  // Process images
  const images = Array.isArray(product.image)
    ? product.image.map((img) => (img.startsWith('http') ? img : `${SITE_URL}${img}`))
    : product.image
      ? [product.image.startsWith('http') ? product.image : `${SITE_URL}${product.image}`]
      : [`${SITE_URL}/images/product-placeholder.jpg`];

  // Build aggregate rating if available
  const aggregateRating: AggregateRatingSchema | undefined =
    product.rating && product.reviewCount
      ? {
          '@type': 'AggregateRating',
          ratingValue: product.rating,
          reviewCount: product.reviewCount,
          bestRating: 5,
          worstRating: 1,
        }
      : undefined;

  // Build reviews if available
  const reviews: ReviewSchema[] | undefined = product.reviews?.map((review) => ({
    '@type': 'Review',
    author: {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: review.author,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1,
    },
    ...(review.content && { reviewBody: review.content }),
    ...(review.date && { datePublished: review.date }),
  }));

  const schema: ProductSchemaType = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: images,
    ...(product.sku && { sku: product.sku }),
    ...(product.gtin && { gtin: product.gtin }),
    ...(product.mpn && { mpn: product.mpn }),
    brand: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: product.brand || SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/images/logo.png`,
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency || 'USD',
      availability: product.availability
        ? `https://schema.org/${product.availability}`
        : 'https://schema.org/InStock',
      url: productUrl,
      seller: {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/images/logo.png`,
      },
      ...(product.compareAtPrice && {
        priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      }),
      ...(product.condition && {
        itemCondition: `https://schema.org/${product.condition}`,
      }),
    },
    ...(aggregateRating && { aggregateRating }),
    ...(reviews && reviews.length > 0 && { review: reviews }),
  };

  // Add additional structured data
  const extendedSchema = {
    ...schema,
    url: productUrl,
    ...(product.category && { category: product.category }),
    ...(product.weight && {
      weight: {
        '@type': 'QuantitativeValue',
        value: product.weight.value,
        unitCode: product.weight.unit,
      },
    }),
    ...(product.dimensions && {
      depth: product.dimensions.depth,
      height: product.dimensions.height,
      width: product.dimensions.width,
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(extendedSchema) }}
    />
  );
}

// Component for product listing pages
interface ProductListSchemaProps {
  products: Array<{
    name: string;
    slug: string;
    description: string;
    price: number;
    image?: string;
    rating?: number;
    reviewCount?: number;
  }>;
  category?: string;
}

export function ProductListSchema({ products, category }: ProductListSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: category ? `${category} - Ketamine Association Store` : 'Ketamine Association Store',
    description: category
      ? `Shop ${category.toLowerCase()} products from the Ketamine Association.`
      : 'Educational materials, merchandise, and resources for ketamine therapy professionals and patients.',
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: product.name,
        url: `${SITE_URL}/store/${product.slug}`,
        description: product.description,
        ...(product.image && {
          image: product.image.startsWith('http') ? product.image : `${SITE_URL}${product.image}`,
        }),
        offers: {
          '@type': 'Offer',
          price: product.price,
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
        ...(product.rating &&
          product.reviewCount && {
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: product.rating,
              reviewCount: product.reviewCount,
            },
          }),
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default ProductSchema;
