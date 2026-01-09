/**
 * ArticleSchema Component
 * Generates JSON-LD structured data for articles and blog posts
 * Supports Article, BlogPosting, NewsArticle, and MedicalWebPage types
 */

import type { ArticleSchema as ArticleSchemaType } from '@/types/seo';

interface ArticleSchemaProps {
  article: {
    title: string;
    description: string;
    slug: string;
    image?: string;
    publishedAt: string;
    modifiedAt?: string;
    author: {
      name: string;
      url?: string;
      image?: string;
      jobTitle?: string;
    };
    category?: string;
    tags?: string[];
    content?: string;
    wordCount?: number;
  };
  type?: 'Article' | 'BlogPosting' | 'NewsArticle' | 'MedicalWebPage';
}

const SITE_URL = 'https://ketamineassociation.org';
const SITE_NAME = 'Ketamine Association';
const DEFAULT_IMAGE = '/images/og-image.jpg';
const LOGO_URL = '/images/logo.png';

export function ArticleSchema({ article, type = 'Article' }: ArticleSchemaProps) {
  const articleUrl = `${SITE_URL}/blog/${article.slug}`;
  const imageUrl = article.image?.startsWith('http')
    ? article.image
    : `${SITE_URL}${article.image || DEFAULT_IMAGE}`;

  const schema: ArticleSchemaType = {
    '@context': 'https://schema.org',
    '@type': type,
    headline: article.title,
    description: article.description,
    image: imageUrl,
    author: {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: article.author.name,
      url: article.author.url,
      image: article.author.image,
      jobTitle: article.author.jobTitle,
    },
    publisher: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}${LOGO_URL}`,
    },
    datePublished: article.publishedAt,
    dateModified: article.modifiedAt || article.publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    inLanguage: 'en-US',
    ...(article.wordCount && { wordCount: article.wordCount }),
    ...(article.tags && { keywords: article.tags }),
    ...(article.category && { articleSection: article.category }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Additional component for multiple articles (e.g., blog listing page)
interface ArticleListSchemaProps {
  articles: Array<{
    title: string;
    description: string;
    slug: string;
    image?: string;
    publishedAt: string;
    author: {
      name: string;
    };
  }>;
}

export function ArticleListSchema({ articles }: ArticleListSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: articles.map((article, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Article',
        headline: article.title,
        description: article.description,
        url: `${SITE_URL}/blog/${article.slug}`,
        image: article.image?.startsWith('http')
          ? article.image
          : `${SITE_URL}${article.image || DEFAULT_IMAGE}`,
        datePublished: article.publishedAt,
        author: {
          '@type': 'Person',
          name: article.author.name,
        },
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

export default ArticleSchema;
