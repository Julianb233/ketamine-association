/**
 * Schema.org JSON-LD Generator Utilities
 * Server-side functions for generating structured data
 */

import type {
  ArticleSchema,
  OrganizationSchema,
  BreadcrumbListSchema,
  FAQPageSchema,
  LocalBusinessSchema,
  MedicalWebPageSchema,
  EventSchema,
  CourseSchema,
  ProductSchema,
  BreadcrumbItem,
  FAQItem,
  PersonSchema,
} from '@/types/seo';

// Site constants
const SITE_URL = 'https://ketamineassociation.org';
const SITE_NAME = 'Ketamine Association';
const LOGO_URL = '/images/logo.png';

/**
 * Generate Article JSON-LD schema
 */
export function generateArticleSchema(article: {
  title: string;
  description: string;
  slug: string;
  image?: string;
  publishedAt: string;
  modifiedAt?: string;
  author: {
    name: string;
    url?: string;
    jobTitle?: string;
  };
  category?: string;
  tags?: string[];
  wordCount?: number;
  type?: 'Article' | 'BlogPosting' | 'NewsArticle' | 'MedicalWebPage';
}): ArticleSchema {
  const articleUrl = `${SITE_URL}/blog/${article.slug}`;
  const imageUrl = article.image?.startsWith('http')
    ? article.image
    : `${SITE_URL}${article.image || '/images/og-image.jpg'}`;

  return {
    '@context': 'https://schema.org',
    '@type': article.type || 'Article',
    headline: article.title,
    description: article.description,
    image: {
      '@type': 'ImageObject',
      url: imageUrl,
      width: 1200,
      height: 630,
    },
    author: {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: article.author.name,
      url: article.author.url,
      jobTitle: article.author.jobTitle,
    },
    publisher: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}${LOGO_URL}`,
        width: 200,
        height: 60,
      },
    },
    datePublished: article.publishedAt,
    dateModified: article.modifiedAt || article.publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    ...(article.wordCount && { wordCount: article.wordCount }),
    ...(article.tags && { keywords: article.tags }),
    ...(article.category && { articleSection: article.category }),
    inLanguage: 'en-US',
  };
}

/**
 * Generate Organization JSON-LD schema
 */
export function generateOrganizationSchema(): OrganizationSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalOrganization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}${LOGO_URL}`,
      width: 200,
      height: 60,
    },
    description: "The nation's leading association for ketamine therapy practitioners.",
    foundingDate: '2020',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: 'support@ketamineassociation.org',
        availableLanguage: 'English',
      },
    ],
    sameAs: [
      'https://twitter.com/ketamineassoc',
      'https://www.linkedin.com/company/ketamine-association',
      'https://www.facebook.com/ketamineassociation',
    ],
  };
}

/**
 * Generate Breadcrumb JSON-LD schema
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]): BreadcrumbListSchema {
  const allItems: BreadcrumbItem[] = [{ label: 'Home', href: '/' }, ...items];

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href && {
        item: item.href.startsWith('http') ? item.href : `${SITE_URL}${item.href}`,
      }),
    })),
  };
}

/**
 * Generate FAQ JSON-LD schema
 */
export function generateFAQSchema(faqs: FAQItem[]): FAQPageSchema {
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
 * Generate Local Business (Provider) JSON-LD schema
 */
export function generateProviderSchema(provider: {
  firstName: string;
  lastName: string;
  slug: string;
  title?: string;
  credentials?: string;
  specialty?: string;
  bio?: string;
  profileImage?: string;
  practiceName?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  phone?: string;
  website?: string;
  latitude?: number;
  longitude?: number;
  rating?: number;
  reviewCount?: number;
  treatments?: string[];
}): LocalBusinessSchema {
  const fullName = `${provider.title ? provider.title + ' ' : ''}${provider.firstName} ${provider.lastName}${
    provider.credentials ? ', ' + provider.credentials : ''
  }`;
  const businessName = provider.practiceName || fullName;
  const providerUrl = `${SITE_URL}/providers/${provider.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: businessName,
    description:
      provider.bio ||
      `${fullName} is a ketamine therapy provider${provider.city && provider.state ? ` in ${provider.city}, ${provider.state}` : ''}.`,
    url: providerUrl,
    ...(provider.profileImage && {
      image: provider.profileImage.startsWith('http')
        ? [provider.profileImage]
        : [`${SITE_URL}${provider.profileImage}`],
    }),
    ...(provider.phone && { telephone: provider.phone }),
    address: {
      '@type': 'PostalAddress',
      ...(provider.address && { streetAddress: provider.address }),
      ...(provider.city && { addressLocality: provider.city }),
      ...(provider.state && { addressRegion: provider.state }),
      ...(provider.zipCode && { postalCode: provider.zipCode }),
      addressCountry: 'US',
    },
    ...(provider.latitude &&
      provider.longitude && {
        geo: {
          '@type': 'GeoCoordinates',
          latitude: provider.latitude,
          longitude: provider.longitude,
        },
      }),
    ...(provider.rating &&
      provider.reviewCount && {
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: provider.rating,
          reviewCount: provider.reviewCount,
          bestRating: 5,
          worstRating: 1,
        },
      }),
    ...(provider.specialty && { medicalSpecialty: [provider.specialty] }),
  };
}

/**
 * Generate Medical Web Page JSON-LD schema
 */
export function generateMedicalPageSchema(page: {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  author?: {
    name: string;
    credentials?: string;
  };
  specialty?: string;
  audience?: 'Patient' | 'Clinician';
}): MedicalWebPageSchema {
  const pageUrl = page.url.startsWith('http') ? page.url : `${SITE_URL}${page.url}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: page.title,
    description: page.description,
    url: pageUrl,
    ...(page.datePublished && { datePublished: page.datePublished }),
    ...(page.dateModified && { dateModified: page.dateModified }),
    ...(page.author && {
      author: {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: page.author.name,
        ...(page.author.credentials && { jobTitle: page.author.credentials }),
      },
    }),
    publisher: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}${LOGO_URL}`,
    },
    ...(page.specialty && {
      specialty: {
        '@type': 'MedicalSpecialty',
        name: page.specialty,
      },
    }),
    ...(page.audience && {
      audience: {
        '@type': page.audience,
        audienceType: page.audience === 'Patient' ? 'Patient' : 'Healthcare Professional',
      },
    }),
  };
}

/**
 * Generate Event JSON-LD schema
 */
export function generateEventSchema(event: {
  name: string;
  description: string;
  slug: string;
  startDate: string;
  endDate?: string;
  location?: {
    type: 'physical' | 'virtual' | 'hybrid';
    name?: string;
    address?: string;
    city?: string;
    state?: string;
    url?: string;
  };
  price?: number;
  image?: string;
}): EventSchema {
  const eventUrl = `${SITE_URL}/events/${event.slug}`;

  const getLocation = () => {
    if (!event.location) return undefined;

    if (event.location.type === 'virtual') {
      return {
        '@type': 'VirtualLocation' as const,
        url: event.location.url || eventUrl,
      };
    }

    return {
      '@type': 'Place' as const,
      name: event.location.name,
      address: {
        '@type': 'PostalAddress' as const,
        streetAddress: event.location.address,
        addressLocality: event.location.city,
        addressRegion: event.location.state,
        addressCountry: 'US',
      },
    };
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'EducationEvent',
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    ...(event.endDate && { endDate: event.endDate }),
    location: getLocation(),
    organizer: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}${LOGO_URL}`,
    },
    ...(event.image && {
      image: event.image.startsWith('http') ? event.image : `${SITE_URL}${event.image}`,
    }),
    ...(typeof event.price !== 'undefined' && {
      offers: [
        {
          '@type': 'Offer',
          price: event.price,
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url: eventUrl,
        },
      ],
    }),
  };
}

/**
 * Generate Course JSON-LD schema
 */
export function generateCourseSchema(course: {
  name: string;
  description: string;
  slug: string;
  instructor?: {
    name: string;
    credentials?: string;
  };
  duration?: string;
  price?: number;
  ceCredits?: number;
  rating?: number;
  reviewCount?: number;
}): CourseSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.name,
    description: course.description,
    provider: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}${LOGO_URL}`,
    },
    ...(course.ceCredits && { numberOfCredits: course.ceCredits }),
    hasCourseInstance: [
      {
        '@type': 'CourseInstance',
        courseMode: 'Online',
        ...(course.duration && { duration: course.duration }),
        ...(course.instructor && {
          instructor: [
            {
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: course.instructor.name,
              ...(course.instructor.credentials && { jobTitle: course.instructor.credentials }),
            },
          ],
        }),
      },
    ],
    ...(typeof course.price !== 'undefined' && {
      offers: {
        '@type': 'Offer',
        price: course.price,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: `${SITE_URL}/academy/courses/${course.slug}`,
      },
    }),
    ...(course.rating &&
      course.reviewCount && {
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: course.rating,
          reviewCount: course.reviewCount,
          bestRating: 5,
          worstRating: 1,
        },
      }),
  };
}

/**
 * Generate Product JSON-LD schema
 */
export function generateProductSchema(product: {
  name: string;
  description: string;
  slug: string;
  price: number;
  image?: string;
  sku?: string;
  rating?: number;
  reviewCount?: number;
}): ProductSchema {
  const productUrl = `${SITE_URL}/store/${product.slug}`;
  const imageUrl = product.image?.startsWith('http')
    ? product.image
    : `${SITE_URL}${product.image || '/images/product-placeholder.jpg'}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: [imageUrl],
    ...(product.sku && { sku: product.sku }),
    brand: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}${LOGO_URL}`,
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: productUrl,
    },
    ...(product.rating &&
      product.reviewCount && {
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: product.rating,
          reviewCount: product.reviewCount,
          bestRating: 5,
          worstRating: 1,
        },
      }),
  };
}

/**
 * Serialize schema to JSON-LD script tag content
 */
export function serializeSchema(schema: object): string {
  return JSON.stringify(schema);
}

/**
 * Combine multiple schemas into a graph
 */
export function combineSchemas(...schemas: object[]): object {
  return {
    '@context': 'https://schema.org',
    '@graph': schemas.map((schema) => {
      // Remove @context from individual schemas when combining
      const { '@context': _context, ...rest } = schema as { '@context'?: string };
      return rest;
    }),
  };
}
