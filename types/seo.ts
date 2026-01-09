/**
 * SEO Type Definitions for Ketamine Association
 * Comprehensive types for Schema.org structured data and metadata
 */

// Base Schema.org types
export interface SchemaBase {
  '@context': 'https://schema.org';
  '@type': string;
}

// Person/Author Schema
export interface PersonSchema extends SchemaBase {
  '@type': 'Person';
  name: string;
  url?: string;
  image?: string;
  jobTitle?: string;
  description?: string;
  sameAs?: string[];
}

// Organization Schema
export interface OrganizationSchema extends SchemaBase {
  '@type': 'Organization' | 'MedicalOrganization';
  name: string;
  url: string;
  logo: string | ImageObjectSchema;
  description?: string;
  foundingDate?: string;
  founders?: PersonSchema[];
  address?: PostalAddressSchema;
  contactPoint?: ContactPointSchema[];
  sameAs?: string[];
  areaServed?: string | string[];
  email?: string;
  telephone?: string;
}

// Image Object Schema
export interface ImageObjectSchema {
  '@type': 'ImageObject';
  url: string;
  width?: number;
  height?: number;
  caption?: string;
}

// Postal Address Schema
export interface PostalAddressSchema {
  '@type': 'PostalAddress';
  streetAddress?: string;
  addressLocality?: string;
  addressRegion?: string;
  postalCode?: string;
  addressCountry?: string;
}

// Contact Point Schema
export interface ContactPointSchema {
  '@type': 'ContactPoint';
  telephone?: string;
  contactType: string;
  email?: string;
  areaServed?: string | string[];
  availableLanguage?: string | string[];
}

// Article Schema
export interface ArticleSchema extends SchemaBase {
  '@type': 'Article' | 'MedicalWebPage' | 'NewsArticle' | 'BlogPosting';
  headline: string;
  description: string;
  image: string | string[] | ImageObjectSchema;
  author: PersonSchema | PersonSchema[];
  publisher: OrganizationSchema;
  datePublished: string;
  dateModified?: string;
  mainEntityOfPage?: {
    '@type': 'WebPage';
    '@id': string;
  };
  articleBody?: string;
  wordCount?: number;
  keywords?: string[];
  articleSection?: string;
  inLanguage?: string;
}

// Medical Web Page Schema
export interface MedicalWebPageSchema extends SchemaBase {
  '@type': 'MedicalWebPage';
  name: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  author?: PersonSchema | OrganizationSchema;
  publisher?: OrganizationSchema;
  mainEntity?: MedicalConditionSchema | DrugSchema;
  specialty?: MedicalSpecialtySchema;
  about?: MedicalConditionSchema | DrugSchema | TherapySchema;
  audience?: MedicalAudienceSchema;
  lastReviewed?: string;
  reviewedBy?: PersonSchema | OrganizationSchema;
}

// Medical Condition Schema
export interface MedicalConditionSchema extends SchemaBase {
  '@type': 'MedicalCondition';
  name: string;
  description?: string;
  alternateName?: string[];
  associatedAnatomy?: string;
  cause?: string;
  riskFactor?: string[];
  signOrSymptom?: string[];
  possibleTreatment?: TherapySchema[];
}

// Drug Schema
export interface DrugSchema extends SchemaBase {
  '@type': 'Drug';
  name: string;
  description?: string;
  activeIngredient?: string;
  administrationRoute?: string;
  prescriptionStatus?: string;
  legalStatus?: string;
  manufacturer?: OrganizationSchema;
  mechanismOfAction?: string;
  warning?: string;
}

// Therapy Schema
export interface TherapySchema extends SchemaBase {
  '@type': 'MedicalTherapy' | 'PsychologicalTreatment';
  name: string;
  description?: string;
  adverseOutcome?: string;
  contraindication?: MedicalConditionSchema;
  seriousAdverseOutcome?: string;
}

// Medical Specialty Schema
export interface MedicalSpecialtySchema {
  '@type': 'MedicalSpecialty';
  name: string;
}

// Medical Audience Schema
export interface MedicalAudienceSchema {
  '@type': 'MedicalAudience' | 'Patient' | 'Clinician';
  audienceType?: string;
  healthCondition?: MedicalConditionSchema;
}

// Breadcrumb Schema
export interface BreadcrumbListSchema extends SchemaBase {
  '@type': 'BreadcrumbList';
  itemListElement: BreadcrumbItemSchema[];
}

export interface BreadcrumbItemSchema {
  '@type': 'ListItem';
  position: number;
  name: string;
  item?: string;
}

// FAQ Schema
export interface FAQPageSchema extends SchemaBase {
  '@type': 'FAQPage';
  mainEntity: QuestionSchema[];
}

export interface QuestionSchema {
  '@type': 'Question';
  name: string;
  acceptedAnswer: AnswerSchema;
}

export interface AnswerSchema {
  '@type': 'Answer';
  text: string;
}

// Local Business Schema (for Providers)
export interface LocalBusinessSchema extends SchemaBase {
  '@type': 'MedicalBusiness' | 'Physician' | 'MedicalClinic';
  name: string;
  description?: string;
  image?: string | string[];
  url?: string;
  telephone?: string;
  email?: string;
  address: PostalAddressSchema;
  geo?: GeoCoordinatesSchema;
  openingHoursSpecification?: OpeningHoursSchema[];
  aggregateRating?: AggregateRatingSchema;
  review?: ReviewSchema[];
  priceRange?: string;
  medicalSpecialty?: string[];
  availableService?: MedicalProcedureSchema[];
  hasCredential?: CredentialSchema[];
  isAcceptingNewPatients?: boolean;
  healthPlanNetworkId?: string[];
}

// Geo Coordinates Schema
export interface GeoCoordinatesSchema {
  '@type': 'GeoCoordinates';
  latitude: number;
  longitude: number;
}

// Opening Hours Schema
export interface OpeningHoursSchema {
  '@type': 'OpeningHoursSpecification';
  dayOfWeek: string | string[];
  opens: string;
  closes: string;
}

// Aggregate Rating Schema
export interface AggregateRatingSchema {
  '@type': 'AggregateRating';
  ratingValue: number;
  reviewCount: number;
  bestRating?: number;
  worstRating?: number;
}

// Review Schema
export interface ReviewSchema {
  '@type': 'Review';
  author?: PersonSchema | string;
  datePublished?: string;
  reviewBody?: string;
  reviewRating?: RatingSchema;
}

// Rating Schema
export interface RatingSchema {
  '@type': 'Rating';
  ratingValue: number;
  bestRating?: number;
  worstRating?: number;
}

// Medical Procedure Schema
export interface MedicalProcedureSchema {
  '@type': 'MedicalProcedure' | 'TherapeuticProcedure';
  name: string;
  description?: string;
  procedureType?: string;
  bodyLocation?: string;
}

// Credential Schema
export interface CredentialSchema {
  '@type': 'EducationalOccupationalCredential';
  name: string;
  credentialCategory?: string;
  recognizedBy?: OrganizationSchema;
  validFrom?: string;
  validUntil?: string;
}

// Event Schema
export interface EventSchema extends SchemaBase {
  '@type': 'Event' | 'MedicalEvent' | 'EducationEvent';
  name: string;
  description?: string;
  startDate: string;
  endDate?: string;
  location?: PlaceSchema | VirtualLocationSchema;
  organizer?: OrganizationSchema | PersonSchema;
  performer?: PersonSchema[];
  eventStatus?: string;
  eventAttendanceMode?: string;
  offers?: OfferSchema[];
  image?: string | ImageObjectSchema;
}

// Place Schema
export interface PlaceSchema {
  '@type': 'Place';
  name?: string;
  address: PostalAddressSchema;
  geo?: GeoCoordinatesSchema;
}

// Virtual Location Schema
export interface VirtualLocationSchema {
  '@type': 'VirtualLocation';
  url: string;
}

// Offer Schema
export interface OfferSchema {
  '@type': 'Offer';
  price: number | string;
  priceCurrency: string;
  availability?: string;
  validFrom?: string;
  validThrough?: string;
  url?: string;
  seller?: OrganizationSchema;
  itemCondition?: string;
}

// Course Schema
export interface CourseSchema extends SchemaBase {
  '@type': 'Course';
  name: string;
  description: string;
  provider: OrganizationSchema;
  courseCode?: string;
  educationalCredentialAwarded?: string;
  hasCourseInstance?: CourseInstanceSchema[];
  offers?: OfferSchema;
  aggregateRating?: AggregateRatingSchema;
  numberOfCredits?: number;
  occupationalCredentialAwarded?: CredentialSchema;
}

// Course Instance Schema
export interface CourseInstanceSchema {
  '@type': 'CourseInstance';
  courseMode: string;
  duration?: string;
  instructor?: PersonSchema[];
  courseSchedule?: string;
}

// Website Schema
export interface WebSiteSchema extends SchemaBase {
  '@type': 'WebSite';
  name: string;
  url: string;
  description?: string;
  publisher?: OrganizationSchema;
  potentialAction?: SearchActionSchema;
}

// Search Action Schema
export interface SearchActionSchema {
  '@type': 'SearchAction';
  target: {
    '@type': 'EntryPoint';
    urlTemplate: string;
  };
  'query-input': string;
}

// Product Schema (for Store)
export interface ProductSchema extends SchemaBase {
  '@type': 'Product';
  name: string;
  description: string;
  image: string | string[];
  sku?: string;
  brand?: OrganizationSchema;
  offers: OfferSchema;
  aggregateRating?: AggregateRatingSchema;
  review?: ReviewSchema[];
}

// Metadata Input Types for Generator Functions
export interface ArticleMetadataInput {
  title: string;
  description: string;
  slug: string;
  image?: string;
  publishedAt: string;
  modifiedAt?: string;
  author: {
    name: string;
    url?: string;
  };
  category?: string;
  tags?: string[];
  section?: string;
}

export interface ProviderMetadataInput {
  name: string;
  credentials?: string;
  practiceName?: string;
  specialty?: string;
  city?: string;
  state?: string;
  slug: string;
  description?: string;
  image?: string;
  rating?: number;
  reviewCount?: number;
}

export interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
  keywords?: string[];
}

export interface EventMetadataInput {
  title: string;
  description: string;
  slug: string;
  startDate: string;
  endDate?: string;
  location?: string;
  image?: string;
  organizer?: string;
}

export interface CourseMetadataInput {
  title: string;
  description: string;
  slug: string;
  instructor?: string;
  duration?: string;
  price?: number;
  image?: string;
  category?: string;
}

// Breadcrumb types
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

// FAQ types
export interface FAQItem {
  question: string;
  answer: string;
}
