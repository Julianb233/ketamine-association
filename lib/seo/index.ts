/**
 * SEO Utilities Index
 * Central export for all SEO-related utilities
 */

// Metadata generators
export {
  generateArticleMetadata,
  generateProviderMetadata,
  generatePageMetadata,
  generateEventMetadata,
  generateCourseMetadata,
  generateDirectoryMetadata,
  generateBlogListingMetadata,
  generateRootMetadata,
  mergeWithParentMetadata,
} from './metadata';

// Schema generators
export {
  generateArticleSchema,
  generateOrganizationSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateProviderSchema,
  generateMedicalPageSchema,
  generateEventSchema,
  generateCourseSchema,
  generateProductSchema,
  serializeSchema,
  combineSchemas,
} from './schemas';

// Re-export types
export type {
  ArticleMetadataInput,
  ProviderMetadataInput,
  PageMetadataInput,
  EventMetadataInput,
  CourseMetadataInput,
  BreadcrumbItem,
  FAQItem,
} from '@/types/seo';
