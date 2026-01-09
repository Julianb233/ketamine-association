/**
 * SEO Metadata Generation Utilities
 * Comprehensive helpers for generating Next.js Metadata objects
 */

import type { Metadata, ResolvingMetadata } from 'next';
import type {
  ArticleMetadataInput,
  ProviderMetadataInput,
  PageMetadataInput,
  EventMetadataInput,
  CourseMetadataInput,
} from '@/types/seo';

// Site constants
const SITE_URL = 'https://ketamineassociation.org';
const SITE_NAME = 'Ketamine Association';
const SITE_DESCRIPTION = "The nation's leading association for ketamine therapy practitioners. Access education, certification, and patient connections.";
const DEFAULT_OG_IMAGE = '/images/og-image.jpg';
const TWITTER_HANDLE = '@ketamineassoc';

// Default keywords for the site
const DEFAULT_KEYWORDS = [
  'ketamine therapy',
  'ketamine association',
  'ketamine certification',
  'ketamine providers',
  'treatment-resistant depression',
  'ketamine training',
  'ketamine doctors',
  'ketamine infusion',
  'mental health treatment',
];

/**
 * Generate metadata for article/blog pages
 */
export function generateArticleMetadata(article: ArticleMetadataInput): Metadata {
  const canonicalUrl = `${SITE_URL}/blog/${article.slug}`;
  const imageUrl = article.image?.startsWith('http')
    ? article.image
    : `${SITE_URL}${article.image || DEFAULT_OG_IMAGE}`;

  const keywords = [
    ...(article.tags || []),
    ...(article.category ? [article.category] : []),
    'ketamine therapy',
    'ketamine treatment',
  ];

  return {
    title: article.title,
    description: article.description,
    keywords: keywords,
    authors: [{ name: article.author.name, url: article.author.url }],
    openGraph: {
      type: 'article',
      locale: 'en_US',
      url: canonicalUrl,
      siteName: SITE_NAME,
      title: article.title,
      description: article.description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      publishedTime: article.publishedAt,
      modifiedTime: article.modifiedAt || article.publishedAt,
      authors: [article.author.name],
      section: article.section || article.category,
      tags: article.tags,
    },
    twitter: {
      card: 'summary_large_image',
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title: article.title,
      description: article.description,
      images: [imageUrl],
    },
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  };
}

/**
 * Generate metadata for provider profile pages
 */
export function generateProviderMetadata(provider: ProviderMetadataInput): Metadata {
  const canonicalUrl = `${SITE_URL}/providers/${provider.slug}`;
  const imageUrl = provider.image?.startsWith('http')
    ? provider.image
    : provider.image
      ? `${SITE_URL}${provider.image}`
      : `${SITE_URL}${DEFAULT_OG_IMAGE}`;

  const fullName = `${provider.name}${provider.credentials ? `, ${provider.credentials}` : ''}`;
  const location = provider.city && provider.state ? `${provider.city}, ${provider.state}` : '';

  const title = provider.practiceName
    ? `${fullName} at ${provider.practiceName}${location ? ` | ${location}` : ''}`
    : `${fullName}${location ? ` | ${location}` : ''}`;

  const description =
    provider.description ||
    `${fullName} is a ${provider.specialty || 'ketamine therapy'} provider${location ? ` in ${location}` : ''}. ${
      provider.rating && provider.reviewCount
        ? `Rated ${provider.rating.toFixed(1)}/5 from ${provider.reviewCount} reviews.`
        : ''
    } Find qualified ketamine therapy providers at the Ketamine Association.`;

  const keywords = [
    'ketamine provider',
    'ketamine doctor',
    provider.specialty,
    ...(provider.city ? [`ketamine ${provider.city}`, `ketamine therapy ${provider.city}`] : []),
    ...(provider.state ? [`ketamine ${provider.state}`, `ketamine providers ${provider.state}`] : []),
  ].filter(Boolean) as string[];

  return {
    title,
    description,
    keywords,
    openGraph: {
      type: 'profile',
      locale: 'en_US',
      url: canonicalUrl,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 400,
          height: 400,
          alt: fullName,
        },
      ],
    },
    twitter: {
      card: 'summary',
      site: TWITTER_HANDLE,
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

/**
 * Generate metadata for generic pages
 */
export function generatePageMetadata(page: PageMetadataInput): Metadata {
  const canonicalUrl = `${SITE_URL}${page.path}`;
  const imageUrl = page.image?.startsWith('http')
    ? page.image
    : `${SITE_URL}${page.image || DEFAULT_OG_IMAGE}`;

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords || DEFAULT_KEYWORDS,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: canonicalUrl,
      siteName: SITE_NAME,
      title: page.title,
      description: page.description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: TWITTER_HANDLE,
      title: page.title,
      description: page.description,
      images: [imageUrl],
    },
    alternates: {
      canonical: canonicalUrl,
    },
    robots: page.noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
        },
  };
}

/**
 * Generate metadata for event pages
 */
export function generateEventMetadata(event: EventMetadataInput): Metadata {
  const canonicalUrl = `${SITE_URL}/events/${event.slug}`;
  const imageUrl = event.image?.startsWith('http')
    ? event.image
    : `${SITE_URL}${event.image || DEFAULT_OG_IMAGE}`;

  const eventDate = new Date(event.startDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const title = `${event.title} | ${eventDate}`;
  const description = event.location
    ? `${event.description} Join us ${event.location} on ${eventDate}.`
    : event.description;

  return {
    title,
    description,
    keywords: [
      'ketamine event',
      'ketamine conference',
      'ketamine training event',
      'medical education event',
      event.organizer,
    ].filter(Boolean) as string[],
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: canonicalUrl,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: event.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: TWITTER_HANDLE,
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

/**
 * Generate metadata for course pages
 */
export function generateCourseMetadata(course: CourseMetadataInput): Metadata {
  const canonicalUrl = `${SITE_URL}/academy/courses/${course.slug}`;
  const imageUrl = course.image?.startsWith('http')
    ? course.image
    : `${SITE_URL}${course.image || DEFAULT_OG_IMAGE}`;

  const priceInfo = course.price !== undefined ? ` - $${course.price}` : '';
  const durationInfo = course.duration ? ` (${course.duration})` : '';
  const title = `${course.title}${durationInfo}${priceInfo}`;

  return {
    title,
    description: course.description,
    keywords: [
      'ketamine course',
      'ketamine certification',
      'ketamine training',
      'continuing education',
      'CE credits',
      course.category,
      course.instructor,
    ].filter(Boolean) as string[],
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: canonicalUrl,
      siteName: SITE_NAME,
      title,
      description: course.description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: course.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: TWITTER_HANDLE,
      title,
      description: course.description,
      images: [imageUrl],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

/**
 * Generate metadata for provider directory listing pages
 */
export function generateDirectoryMetadata(options?: {
  location?: string;
  specialty?: string;
  page?: number;
}): Metadata {
  const { location, specialty, page } = options || {};

  let title = 'Find Ketamine Therapy Providers';
  let description = 'Browse our directory of certified ketamine therapy providers.';
  let path = '/providers';

  if (location) {
    title = `Ketamine Providers in ${location}`;
    description = `Find certified ketamine therapy providers in ${location}. Browse ratings, reviews, and credentials.`;
    path += `?location=${encodeURIComponent(location)}`;
  }

  if (specialty) {
    title = specialty + (location ? ` Providers in ${location}` : ' Providers');
    description = `Find ${specialty.toLowerCase()} providers${location ? ` in ${location}` : ''}. Browse our directory of qualified specialists.`;
    if (path.includes('?')) {
      path += `&specialty=${encodeURIComponent(specialty)}`;
    } else {
      path += `?specialty=${encodeURIComponent(specialty)}`;
    }
  }

  if (page && page > 1) {
    title += ` - Page ${page}`;
    if (path.includes('?')) {
      path += `&page=${page}`;
    } else {
      path += `?page=${page}`;
    }
  }

  return generatePageMetadata({
    title,
    description,
    path,
    keywords: [
      'ketamine providers',
      'ketamine directory',
      'find ketamine doctor',
      ...(location ? [`ketamine ${location}`, `ketamine therapy ${location}`] : []),
      ...(specialty ? [specialty.toLowerCase()] : []),
    ],
  });
}

/**
 * Generate metadata for blog listing pages
 */
export function generateBlogListingMetadata(options?: {
  category?: string;
  tag?: string;
  page?: number;
}): Metadata {
  const { category, tag, page } = options || {};

  let title = 'Ketamine Therapy Blog & News';
  let description =
    'Stay informed with the latest research, clinical insights, and news about ketamine therapy from industry experts.';
  let path = '/blog';

  if (category) {
    title = `${category} Articles`;
    description = `Read the latest ${category.toLowerCase()} articles about ketamine therapy, research, and clinical practice.`;
    path += `?category=${encodeURIComponent(category)}`;
  }

  if (tag) {
    title = `Articles Tagged "${tag}"`;
    description = `Explore articles about ${tag.toLowerCase()} in ketamine therapy.`;
    if (path.includes('?')) {
      path += `&tag=${encodeURIComponent(tag)}`;
    } else {
      path += `?tag=${encodeURIComponent(tag)}`;
    }
  }

  if (page && page > 1) {
    title += ` - Page ${page}`;
    if (path.includes('?')) {
      path += `&page=${page}`;
    } else {
      path += `?page=${page}`;
    }
  }

  return generatePageMetadata({
    title,
    description,
    path,
    keywords: [
      'ketamine blog',
      'ketamine news',
      'ketamine research',
      ...(category ? [category.toLowerCase()] : []),
      ...(tag ? [tag.toLowerCase()] : []),
    ],
  });
}

/**
 * Generate base metadata for the root layout
 */
export function generateRootMetadata(): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${SITE_NAME} | Education - Certification - Connection`,
      template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    keywords: DEFAULT_KEYWORDS,
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: SITE_URL,
      siteName: SITE_NAME,
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
      images: [
        {
          url: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
      images: [`${SITE_URL}${DEFAULT_OG_IMAGE}`],
    },
    robots: {
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
    verification: {
      // Add verification tokens as needed
      // google: 'your-google-verification-code',
      // yandex: 'your-yandex-verification-code',
      // yahoo: 'your-yahoo-verification-code',
    },
    category: 'health',
  };
}

/**
 * Merge metadata with parent metadata (for use in generateMetadata functions)
 */
export async function mergeWithParentMetadata(
  metadata: Metadata,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const previousImages = (await parent).openGraph?.images || [];
  const previousKeywords = (await parent).keywords || [];

  return {
    ...metadata,
    keywords: [
      ...(Array.isArray(previousKeywords) ? previousKeywords : [previousKeywords]),
      ...((metadata.keywords as string[]) || []),
    ].filter((v, i, a) => a.indexOf(v) === i), // Remove duplicates
    openGraph: {
      ...metadata.openGraph,
      images: metadata.openGraph?.images || previousImages,
    },
  };
}
