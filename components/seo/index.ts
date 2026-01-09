/**
 * SEO Components Index
 * Central export for all SEO-related components
 */

// Article Schema
export { ArticleSchema, ArticleListSchema, default as ArticleSchemaDefault } from './ArticleSchema';

// Organization Schema
export { OrganizationSchema, WebsiteSchema, default as OrganizationSchemaDefault } from './OrganizationSchema';

// Breadcrumb Schema
export {
  BreadcrumbSchema,
  generateBreadcrumbs,
  BlogBreadcrumbs,
  ProviderBreadcrumbs,
  CourseBreadcrumbs,
  EventBreadcrumbs,
  default as BreadcrumbSchemaDefault,
} from './BreadcrumbSchema';

// FAQ Schema
export {
  FAQSchema,
  CombinedFAQSchema,
  KETAMINE_GENERAL_FAQS,
  PROVIDER_FAQS,
  MEMBERSHIP_FAQS,
  default as FAQSchemaDefault,
} from './FAQSchema';

// Local Business Schema (Provider Profiles)
export {
  LocalBusinessSchema,
  ProviderListSchema,
  default as LocalBusinessSchemaDefault,
} from './LocalBusinessSchema';

// Medical Web Page Schema
export {
  MedicalWebPageSchema,
  KetamineTherapySchema,
  DepressionTreatmentSchema,
  PTSDTreatmentSchema,
  ChronicPainSchema,
  PractitionerEducationSchema,
  default as MedicalWebPageSchemaDefault,
} from './MedicalWebPageSchema';

// Event Schema
export { EventSchema, EventListSchema, default as EventSchemaDefault } from './EventSchema';

// Course Schema
export { CourseSchema, CourseListSchema, default as CourseSchemaDefault } from './CourseSchema';

// Product Schema
export { ProductSchema, ProductListSchema, default as ProductSchemaDefault } from './ProductSchema';
