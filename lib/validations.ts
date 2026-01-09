import { z } from "zod";
import {
  TreatmentType,
  ConditionType,
  MembershipTier,
  LeadSource,
  LeadStatus,
  EventType,
  EventFormat,
  ArticleCategory,
  ArticleStatus,
  ConsultationStatus,
  UserRole,
  SubscriberRole,
} from "@prisma/client";

// Practitioners API validations
export const practitionersQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  city: z.string().optional(),
  state: z.string().optional(),
  treatment: z.nativeEnum(TreatmentType).optional(),
  condition: z.nativeEnum(ConditionType).optional(),
  tier: z.nativeEnum(MembershipTier).optional(),
  verified: z.coerce.boolean().optional(),
  search: z.string().optional(),
});

export type PractitionersQuery = z.infer<typeof practitionersQuerySchema>;

// Practitioner update validation
export const practitionerUpdateSchema = z.object({
  title: z.string().max(20).optional(),
  firstName: z.string().min(1).max(100).optional(),
  lastName: z.string().min(1).max(100).optional(),
  credentials: z.string().max(100).optional(),
  specialty: z.string().max(200).optional(),
  bio: z.string().max(5000).optional(),
  profileImage: z.string().url().optional(),
  practiceName: z.string().max(200).optional(),
  address: z.string().max(500).optional(),
  city: z.string().max(100).optional(),
  state: z.string().max(2).optional(),
  zipCode: z.string().max(10).optional(),
  phone: z.string().max(20).optional(),
  website: z.string().url().optional().or(z.literal("")),
  licenseNumber: z.string().max(50).optional(),
  licenseState: z.string().max(2).optional(),
  npiNumber: z.string().max(10).optional(),
  treatments: z.array(z.nativeEnum(TreatmentType)).optional(),
  conditions: z.array(z.nativeEnum(ConditionType)).optional(),
  insurances: z.array(z.string().max(100)).optional(),
});

export type PractitionerUpdate = z.infer<typeof practitionerUpdateSchema>;

// Lead creation validation
export const createLeadSchema = z.object({
  practitionerId: z.string().cuid(),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email(),
  phone: z.string().max(20).optional(),
  message: z.string().max(2000).optional(),
  source: z.nativeEnum(LeadSource).default("DIRECTORY"),
  condition: z.nativeEnum(ConditionType).optional(),
});

export type CreateLead = z.infer<typeof createLeadSchema>;

// Lead status update validation
export const updateLeadStatusSchema = z.object({
  status: z.nativeEnum(LeadStatus),
});

export type UpdateLeadStatus = z.infer<typeof updateLeadStatusSchema>;

// Leads query validation
export const leadsQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  status: z.nativeEnum(LeadStatus).optional(),
  source: z.nativeEnum(LeadSource).optional(),
});

export type LeadsQuery = z.infer<typeof leadsQuerySchema>;

// Reviews query validation
export const reviewsQuerySchema = z.object({
  practitionerId: z.string().cuid(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(50).default(10),
});

export type ReviewsQuery = z.infer<typeof reviewsQuerySchema>;

// Create review validation
export const createReviewSchema = z.object({
  practitionerId: z.string().cuid(),
  rating: z.number().int().min(1).max(5),
  title: z.string().max(200).optional(),
  content: z.string().max(5000).optional(),
});

export type CreateReview = z.infer<typeof createReviewSchema>;

// Checkout session validation
export const createCheckoutSchema = z.object({
  tier: z.enum(["PROFESSIONAL", "PREMIUM", "ELITE"]),
  billingPeriod: z.enum(["monthly", "annual"]),
  successUrl: z.string().url().optional(),
  cancelUrl: z.string().url().optional(),
});

export type CreateCheckout = z.infer<typeof createCheckoutSchema>;

// Events API validations
export const eventsQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(50).default(20),
  type: z.nativeEnum(EventType).optional(),
  format: z.nativeEnum(EventFormat).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
});

export type EventsQuery = z.infer<typeof eventsQuerySchema>;

export const createEventSchema = z.object({
  title: z.string().min(1).max(200),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9-]+$/),
  description: z.string().max(5000).optional(),
  eventType: z.nativeEnum(EventType),
  format: z.nativeEnum(EventFormat),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  timezone: z.string().default("America/New_York"),
  location: z.string().max(500).optional(),
  virtualUrl: z.string().url().optional(),
  price: z.number().min(0).default(0),
  memberPrice: z.number().min(0).optional(),
  capacity: z.number().int().positive().optional(),
  isPublished: z.boolean().default(false),
});

export type CreateEvent = z.infer<typeof createEventSchema>;

export const eventRegistrationSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
});

export type EventRegistration = z.infer<typeof eventRegistrationSchema>;

// Articles API validations
export const articlesQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(50).default(20),
  category: z.nativeEnum(ArticleCategory).optional(),
  practitionerId: z.string().cuid().optional(),
});

export type ArticlesQuery = z.infer<typeof articlesQuerySchema>;

export const createArticleSchema = z.object({
  title: z.string().min(1).max(200),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9-]+$/),
  excerpt: z.string().max(500).optional(),
  content: z.string().min(1).max(50000),
  featuredImage: z.string().url().optional(),
  category: z.nativeEnum(ArticleCategory),
  tags: z.array(z.string().max(50)).max(10).default([]),
  status: z.nativeEnum(ArticleStatus).default("DRAFT"),
});

export type CreateArticle = z.infer<typeof createArticleSchema>;

export const updateArticleSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  excerpt: z.string().max(500).optional(),
  content: z.string().min(1).max(50000).optional(),
  featuredImage: z.string().url().optional(),
  category: z.nativeEnum(ArticleCategory).optional(),
  tags: z.array(z.string().max(50)).max(10).optional(),
  status: z.nativeEnum(ArticleStatus).optional(),
});

export type UpdateArticle = z.infer<typeof updateArticleSchema>;

// Consultations API validations
export const consultationsQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(50).default(20),
  status: z.nativeEnum(ConsultationStatus).optional(),
});

export type ConsultationsQuery = z.infer<typeof consultationsQuerySchema>;

export const createConsultationSchema = z.object({
  practitionerId: z.string().cuid(),
  notes: z.string().max(2000).optional(),
});

export type CreateConsultation = z.infer<typeof createConsultationSchema>;

export const updateConsultationSchema = z.object({
  status: z.nativeEnum(ConsultationStatus),
  scheduledAt: z.string().datetime().optional(),
  notes: z.string().max(2000).optional(),
});

export type UpdateConsultation = z.infer<typeof updateConsultationSchema>;

// Admin API validations
export const adminUsersQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  role: z.nativeEnum(UserRole).optional(),
  search: z.string().optional(),
});

export type AdminUsersQuery = z.infer<typeof adminUsersQuerySchema>;

export const updateUserRoleSchema = z.object({
  role: z.nativeEnum(UserRole),
});

export type UpdateUserRole = z.infer<typeof updateUserRoleSchema>;

export const verifyPractitionerSchema = z.object({
  verified: z.boolean(),
  notes: z.string().max(1000).optional(),
});

export type VerifyPractitioner = z.infer<typeof verifyPractitionerSchema>;

export const moderateReviewSchema = z.object({
  action: z.enum(["approve", "reject"]),
  reason: z.string().max(500).optional(),
});

export type ModerateReview = z.infer<typeof moderateReviewSchema>;

// Newsletter validation
export const newsletterSubscribeSchema = z.object({
  email: z.string().email(),
  firstName: z.string().max(100).optional(),
  role: z.nativeEnum(SubscriberRole).optional(),
});

export type NewsletterSubscribe = z.infer<typeof newsletterSubscribeSchema>;
