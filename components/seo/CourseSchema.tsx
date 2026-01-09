/**
 * CourseSchema Component
 * Generates JSON-LD structured data for educational courses
 * Optimized for continuing education and certification programs
 */

import type { CourseSchema as CourseSchemaType, AggregateRatingSchema } from '@/types/seo';

interface CourseData {
  name: string;
  description: string;
  slug: string;
  image?: string;
  instructor?: {
    name: string;
    credentials?: string;
    url?: string;
  };
  instructors?: Array<{
    name: string;
    credentials?: string;
    url?: string;
  }>;
  courseCode?: string;
  duration?: string;
  mode?: 'online' | 'onsite' | 'blended';
  price?: number;
  priceCurrency?: string;
  credentialAwarded?: string;
  ceCredits?: number;
  rating?: number;
  reviewCount?: number;
  category?: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  prerequisites?: string[];
  syllabus?: string[];
}

interface CourseSchemaProps {
  course: CourseData;
}

const SITE_URL = 'https://ketamineassociation.org';
const SITE_NAME = 'Ketamine Association';

export function CourseSchema({ course }: CourseSchemaProps) {
  const courseUrl = `${SITE_URL}/academy/courses/${course.slug}`;

  // Build instructors array
  const instructors = course.instructors || (course.instructor ? [course.instructor] : []);

  // Build aggregate rating if available
  const aggregateRating: AggregateRatingSchema | undefined =
    course.rating && course.reviewCount
      ? {
          '@type': 'AggregateRating',
          ratingValue: course.rating,
          reviewCount: course.reviewCount,
          bestRating: 5,
          worstRating: 1,
        }
      : undefined;

  const schema: CourseSchemaType = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.name,
    description: course.description,
    provider: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/images/logo.png`,
    },
    ...(course.courseCode && { courseCode: course.courseCode }),
    ...(course.credentialAwarded && {
      educationalCredentialAwarded: course.credentialAwarded,
    }),
    ...(course.ceCredits && {
      numberOfCredits: course.ceCredits,
      occupationalCredentialAwarded: {
        '@type': 'EducationalOccupationalCredential',
        name: `${course.ceCredits} CE Credits`,
        credentialCategory: 'Continuing Education',
        recognizedBy: {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: SITE_NAME,
          url: SITE_URL,
          logo: `${SITE_URL}/images/logo.png`,
        },
      },
    }),
    hasCourseInstance: [
      {
        '@type': 'CourseInstance',
        courseMode: course.mode === 'onsite' ? 'Onsite' : course.mode === 'blended' ? 'Blended' : 'Online',
        ...(course.duration && { duration: course.duration }),
        ...(instructors.length > 0 && {
          instructor: instructors.map((instructor) => ({
            '@context': 'https://schema.org' as const,
            '@type': 'Person' as const,
            name: instructor.name,
            ...(instructor.credentials && { jobTitle: instructor.credentials }),
            ...(instructor.url && { url: instructor.url }),
          })),
        }),
      },
    ],
    ...(typeof course.price !== 'undefined' && {
      offers: {
        '@type': 'Offer',
        price: course.price,
        priceCurrency: course.priceCurrency || 'USD',
        availability: 'https://schema.org/InStock',
        url: courseUrl,
      },
    }),
    ...(aggregateRating && { aggregateRating }),
  };

  // Add additional properties via extension
  const extendedSchema = {
    ...schema,
    url: courseUrl,
    ...(course.image && {
      image: course.image.startsWith('http') ? course.image : `${SITE_URL}${course.image}`,
    }),
    ...(course.category && { courseCategory: course.category }),
    ...(course.level && { educationalLevel: course.level }),
    ...(course.prerequisites &&
      course.prerequisites.length > 0 && {
        coursePrerequisites: course.prerequisites,
      }),
    ...(course.syllabus &&
      course.syllabus.length > 0 && {
        syllabusSections: course.syllabus.map((section, index) => ({
          '@type': 'Syllabus',
          position: index + 1,
          name: section,
        })),
      }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(extendedSchema) }}
    />
  );
}

// Component for course listing pages
interface CourseListSchemaProps {
  courses: Array<{
    name: string;
    slug: string;
    description: string;
    price?: number;
    ceCredits?: number;
    rating?: number;
    reviewCount?: number;
  }>;
  category?: string;
}

export function CourseListSchema({ courses, category }: CourseListSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: category
      ? `${category} Courses - Ketamine Association Academy`
      : 'Ketamine Association Academy Courses',
    description: category
      ? `Explore ${category.toLowerCase()} courses and certifications for ketamine therapy professionals.`
      : 'Professional development courses, certifications, and continuing education for ketamine therapy providers.',
    itemListElement: courses.map((course, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Course',
        name: course.name,
        url: `${SITE_URL}/academy/courses/${course.slug}`,
        description: course.description,
        provider: {
          '@type': 'Organization',
          name: SITE_NAME,
          url: SITE_URL,
        },
        ...(typeof course.price !== 'undefined' && {
          offers: {
            '@type': 'Offer',
            price: course.price,
            priceCurrency: 'USD',
          },
        }),
        ...(course.ceCredits && { numberOfCredits: course.ceCredits }),
        ...(course.rating &&
          course.reviewCount && {
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: course.rating,
              reviewCount: course.reviewCount,
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

export default CourseSchema;
