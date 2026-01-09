import type { Metadata } from 'next';

// Base URL for the site
export const BASE_URL = 'https://ketamineassociation.org';

// Default SEO values
const defaultSEO = {
  siteName: 'Ketamine Association',
  title: 'Ketamine Association | Education, Certification, Connection',
  description:
    "The nation's leading association for ketamine therapy practitioners. Access education, certification, and patient connections.",
  keywords: [
    'ketamine therapy',
    'ketamine association',
    'ketamine certification',
    'ketamine providers',
    'treatment-resistant depression',
    'ketamine training',
    'ketamine doctors',
    'ketamine infusion',
    'mental health treatment',
    'ketamine-assisted therapy',
    'KAP therapy',
    'psychedelic therapy',
  ],
  image: '/images/og-image.jpg',
  twitterHandle: '@KetamineAssoc',
};

// Interface for page-specific SEO
interface PageSEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile' | 'product';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  noIndex?: boolean;
}

/**
 * Generate metadata for a page
 */
export function generateMetadata(props: PageSEOProps = {}): Metadata {
  const {
    title,
    description = defaultSEO.description,
    keywords = defaultSEO.keywords,
    image = defaultSEO.image,
    url = BASE_URL,
    type = 'website',
    publishedTime,
    modifiedTime,
    author,
    noIndex = false,
  } = props;

  const fullTitle = title
    ? `${title} | ${defaultSEO.siteName}`
    : defaultSEO.title;

  const imageUrl = image.startsWith('http') ? image : `${BASE_URL}${image}`;

  const metadata: Metadata = {
    metadataBase: new URL(BASE_URL),
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    authors: author ? [{ name: author }] : [{ name: defaultSEO.siteName }],
    creator: defaultSEO.siteName,
    publisher: defaultSEO.siteName,
    openGraph: {
      type: type as 'website' | 'article',
      locale: 'en_US',
      url,
      siteName: defaultSEO.siteName,
      title: fullTitle,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title || defaultSEO.siteName,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
      creator: defaultSEO.twitterHandle,
      site: defaultSEO.twitterHandle,
    },
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
  };

  // Add article-specific metadata
  if (type === 'article' && metadata.openGraph) {
    (metadata.openGraph as Record<string, unknown>).type = 'article';
    if (publishedTime) {
      (metadata.openGraph as Record<string, unknown>).publishedTime = publishedTime;
    }
    if (modifiedTime) {
      (metadata.openGraph as Record<string, unknown>).modifiedTime = modifiedTime;
    }
    if (author) {
      (metadata.openGraph as Record<string, unknown>).authors = [author];
    }
  }

  return metadata;
}

// Schema.org Types

/**
 * Generate Organization schema
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Ketamine Association',
    alternateName: 'KTA',
    url: BASE_URL,
    logo: `${BASE_URL}/images/logo.png`,
    description: defaultSEO.description,
    foundingDate: '2020',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
    },
    sameAs: [
      'https://twitter.com/KetamineAssoc',
      'https://www.linkedin.com/company/ketamine-association',
      'https://www.facebook.com/KetamineAssociation',
      'https://www.instagram.com/ketamineassociation',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'support@ketamineassociation.org',
      url: `${BASE_URL}/contact`,
    },
  };
}

/**
 * Generate Website schema
 */
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: defaultSEO.siteName,
    url: BASE_URL,
    description: defaultSEO.description,
    publisher: {
      '@type': 'Organization',
      name: defaultSEO.siteName,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/providers?location={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generate Article schema
 */
export function generateArticleSchema(article: {
  title: string;
  description: string;
  image?: string;
  url: string;
  publishedAt: string;
  modifiedAt?: string;
  author: {
    name: string;
    url?: string;
  };
  category?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image ? `${BASE_URL}${article.image}` : `${BASE_URL}/images/og-image.jpg`,
    url: article.url,
    datePublished: article.publishedAt,
    dateModified: article.modifiedAt || article.publishedAt,
    author: {
      '@type': 'Person',
      name: article.author.name,
      url: article.author.url,
    },
    publisher: {
      '@type': 'Organization',
      name: defaultSEO.siteName,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url,
    },
    articleSection: article.category,
  };
}

/**
 * Generate Course schema
 */
export function generateCourseSchema(course: {
  name: string;
  description: string;
  url: string;
  provider?: string;
  price: number;
  currency?: string;
  duration?: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.name,
    description: course.description,
    url: course.url,
    provider: {
      '@type': 'Organization',
      name: course.provider || defaultSEO.siteName,
      sameAs: BASE_URL,
    },
    offers: {
      '@type': 'Offer',
      price: course.price,
      priceCurrency: course.currency || 'USD',
      availability: 'https://schema.org/InStock',
      url: course.url,
    },
    hasCourseInstance: course.duration
      ? {
          '@type': 'CourseInstance',
          courseMode: 'online',
          duration: course.duration,
        }
      : undefined,
    image: course.image ? `${BASE_URL}${course.image}` : undefined,
  };
}

/**
 * Generate Event schema
 */
export function generateEventSchema(event: {
  name: string;
  description: string;
  url: string;
  startDate: string;
  endDate?: string;
  location?: string;
  isOnline?: boolean;
  price?: number;
  currency?: string;
  image?: string;
}) {
  const locationSchema = event.isOnline
    ? {
        '@type': 'VirtualLocation',
        url: event.url,
      }
    : event.location
    ? {
        '@type': 'Place',
        name: event.location,
      }
    : undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.name,
    description: event.description,
    url: event.url,
    startDate: event.startDate,
    endDate: event.endDate || event.startDate,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: event.isOnline
      ? 'https://schema.org/OnlineEventAttendanceMode'
      : 'https://schema.org/OfflineEventAttendanceMode',
    location: locationSchema,
    organizer: {
      '@type': 'Organization',
      name: defaultSEO.siteName,
      url: BASE_URL,
    },
    offers: event.price !== undefined
      ? {
          '@type': 'Offer',
          price: event.price,
          priceCurrency: event.currency || 'USD',
          availability: 'https://schema.org/InStock',
          url: event.url,
        }
      : undefined,
    image: event.image ? `${BASE_URL}${event.image}` : `${BASE_URL}/images/og-image.jpg`,
  };
}

/**
 * Generate Product schema
 */
export function generateProductSchema(product: {
  name: string;
  description: string;
  url: string;
  price: number;
  currency?: string;
  image?: string;
  sku?: string;
  brand?: string;
  rating?: number;
  reviewCount?: number;
  inStock?: boolean;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    url: product.url,
    image: product.image ? `${BASE_URL}${product.image}` : undefined,
    sku: product.sku,
    brand: {
      '@type': 'Brand',
      name: product.brand || defaultSEO.siteName,
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency || 'USD',
      availability: product.inStock !== false
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: product.url,
      seller: {
        '@type': 'Organization',
        name: defaultSEO.siteName,
      },
    },
    aggregateRating: product.rating && product.reviewCount
      ? {
          '@type': 'AggregateRating',
          ratingValue: product.rating,
          reviewCount: product.reviewCount,
          bestRating: 5,
          worstRating: 1,
        }
      : undefined,
  };
}

/**
 * Generate LocalBusiness schema for providers
 */
export function generateProviderSchema(provider: {
  name: string;
  description?: string;
  url: string;
  image?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
  };
  phone?: string;
  email?: string;
  rating?: number;
  reviewCount?: number;
  priceRange?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: provider.name,
    description: provider.description,
    url: provider.url,
    image: provider.image ? `${BASE_URL}${provider.image}` : undefined,
    address: provider.address
      ? {
          '@type': 'PostalAddress',
          streetAddress: provider.address.street,
          addressLocality: provider.address.city,
          addressRegion: provider.address.state,
          postalCode: provider.address.zip,
          addressCountry: 'US',
        }
      : undefined,
    telephone: provider.phone,
    email: provider.email,
    aggregateRating: provider.rating && provider.reviewCount
      ? {
          '@type': 'AggregateRating',
          ratingValue: provider.rating,
          reviewCount: provider.reviewCount,
          bestRating: 5,
          worstRating: 1,
        }
      : undefined,
    priceRange: provider.priceRange || '$$$',
    medicalSpecialty: 'Psychiatry',
  };
}

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbSchema(
  breadcrumbs: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url.startsWith('http') ? crumb.url : `${BASE_URL}${crumb.url}`,
    })),
  };
}

/**
 * Generate FAQ schema
 */
export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Convert schema object to JSON-LD script string
 */
export function toJsonLd(schema: Record<string, unknown> | Array<Record<string, unknown>>): string {
  return JSON.stringify(schema);
}
