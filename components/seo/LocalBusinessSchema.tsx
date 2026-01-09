/**
 * LocalBusinessSchema Component
 * Generates JSON-LD structured data for provider profiles
 * Optimized for medical business/physician local SEO
 */

import type {
  LocalBusinessSchema as LocalBusinessSchemaType,
  AggregateRatingSchema,
  ReviewSchema,
  MedicalProcedureSchema,
  CredentialSchema,
} from '@/types/seo';

interface ProviderData {
  id: string;
  slug: string;
  firstName: string;
  lastName: string;
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
  email?: string;
  latitude?: number;
  longitude?: number;
  rating?: number;
  reviewCount?: number;
  treatments?: string[];
  conditions?: string[];
  certifications?: Array<{
    type: string;
    issuedAt: string;
    expiresAt?: string;
  }>;
  reviews?: Array<{
    rating: number;
    title?: string;
    content?: string;
    createdAt: string;
    isVerified?: boolean;
  }>;
  openingHours?: Array<{
    dayOfWeek: string | string[];
    opens: string;
    closes: string;
  }>;
  acceptsNewPatients?: boolean;
  insurances?: string[];
}

interface LocalBusinessSchemaProps {
  provider: ProviderData;
}

const SITE_URL = 'https://ketamineassociation.org';

// Treatment type to procedure mapping
const TREATMENT_PROCEDURES: Record<string, MedicalProcedureSchema> = {
  IV_INFUSION: {
    '@type': 'TherapeuticProcedure',
    name: 'IV Ketamine Infusion',
    description: 'Intravenous ketamine administration for treatment-resistant depression and mood disorders',
    procedureType: 'Therapeutic',
  },
  IM_INJECTION: {
    '@type': 'TherapeuticProcedure',
    name: 'Intramuscular Ketamine Injection',
    description: 'Intramuscular ketamine administration for mental health treatment',
    procedureType: 'Therapeutic',
  },
  NASAL_SPRAY: {
    '@type': 'TherapeuticProcedure',
    name: 'Spravato (Esketamine) Nasal Spray',
    description: 'FDA-approved esketamine nasal spray for treatment-resistant depression',
    procedureType: 'Therapeutic',
  },
  ORAL_SUBLINGUAL: {
    '@type': 'TherapeuticProcedure',
    name: 'Oral/Sublingual Ketamine',
    description: 'Oral or sublingual ketamine administration for at-home or in-office treatment',
    procedureType: 'Therapeutic',
  },
  KETAMINE_ASSISTED_PSYCHOTHERAPY: {
    '@type': 'TherapeuticProcedure',
    name: 'Ketamine-Assisted Psychotherapy (KAP)',
    description: 'Integrated approach combining ketamine treatment with psychotherapy',
    procedureType: 'Therapeutic',
  },
};

// Certification type to credential mapping
const CERTIFICATION_CREDENTIALS: Record<string, Omit<CredentialSchema, '@type'>> = {
  FOUNDATIONAL: {
    name: 'Ketamine Association Foundational Certification',
    credentialCategory: 'Certificate',
  },
  ADVANCED: {
    name: 'Ketamine Association Advanced Certification',
    credentialCategory: 'Certificate',
  },
  KAP_SPECIALTY: {
    name: 'Ketamine-Assisted Psychotherapy Specialty Certification',
    credentialCategory: 'Certificate',
  },
  PRACTICE_LEADERSHIP: {
    name: 'Ketamine Practice Leadership Certification',
    credentialCategory: 'Certificate',
  },
  MASTER_PRACTITIONER: {
    name: 'Ketamine Master Practitioner Certification',
    credentialCategory: 'Certificate',
  },
};

export function LocalBusinessSchema({ provider }: LocalBusinessSchemaProps) {
  const fullName = `${provider.title ? provider.title + ' ' : ''}${provider.firstName} ${provider.lastName}${
    provider.credentials ? ', ' + provider.credentials : ''
  }`;

  const businessName = provider.practiceName || fullName;
  const providerUrl = `${SITE_URL}/providers/${provider.slug}`;

  // Build aggregate rating if available
  const aggregateRating: AggregateRatingSchema | undefined =
    provider.rating && provider.reviewCount
      ? {
          '@type': 'AggregateRating',
          ratingValue: provider.rating,
          reviewCount: provider.reviewCount,
          bestRating: 5,
          worstRating: 1,
        }
      : undefined;

  // Build reviews if available
  const reviews: ReviewSchema[] | undefined = provider.reviews?.map((review) => ({
    '@type': 'Review',
    datePublished: review.createdAt,
    reviewBody: review.content || undefined,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1,
    },
  }));

  // Build available services from treatments
  const availableServices: MedicalProcedureSchema[] | undefined = provider.treatments
    ?.map((treatment) => TREATMENT_PROCEDURES[treatment])
    .filter(Boolean);

  // Build credentials from certifications
  const credentials: CredentialSchema[] | undefined = provider.certifications?.map((cert) => ({
    '@type': 'EducationalOccupationalCredential',
    ...CERTIFICATION_CREDENTIALS[cert.type],
    name: CERTIFICATION_CREDENTIALS[cert.type]?.name || cert.type,
    validFrom: cert.issuedAt,
    validUntil: cert.expiresAt,
    recognizedBy: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Ketamine Association',
      url: SITE_URL,
      logo: `${SITE_URL}/images/logo.png`,
    },
  }));

  const schema: LocalBusinessSchemaType = {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: businessName,
    description:
      provider.bio ||
      `${fullName} is a ketamine therapy provider${provider.city && provider.state ? ` in ${provider.city}, ${provider.state}` : ''}.`,
    url: providerUrl,
    ...(provider.profileImage && {
      image: provider.profileImage.startsWith('http')
        ? provider.profileImage
        : `${SITE_URL}${provider.profileImage}`,
    }),
    ...(provider.phone && { telephone: provider.phone }),
    ...(provider.email && { email: provider.email }),
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
    ...(provider.openingHours && {
      openingHoursSpecification: provider.openingHours.map((hours) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: hours.dayOfWeek,
        opens: hours.opens,
        closes: hours.closes,
      })),
    }),
    ...(aggregateRating && { aggregateRating }),
    ...(reviews && reviews.length > 0 && { review: reviews }),
    ...(provider.specialty && { medicalSpecialty: [provider.specialty] }),
    ...(availableServices && availableServices.length > 0 && { availableService: availableServices }),
    ...(credentials && credentials.length > 0 && { hasCredential: credentials }),
    ...(typeof provider.acceptsNewPatients === 'boolean' && {
      isAcceptingNewPatients: provider.acceptsNewPatients,
    }),
    ...(provider.insurances &&
      provider.insurances.length > 0 && {
        healthPlanNetworkId: provider.insurances,
      }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Additional component for provider directory listing pages
interface ProviderListSchemaProps {
  providers: Array<{
    firstName: string;
    lastName: string;
    slug: string;
    city?: string;
    state?: string;
    rating?: number;
    reviewCount?: number;
  }>;
  location?: string;
}

export function ProviderListSchema({ providers, location }: ProviderListSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: location
      ? `Ketamine Therapy Providers in ${location}`
      : 'Ketamine Therapy Provider Directory',
    description: location
      ? `Find certified ketamine therapy providers in ${location}. Browse our directory of qualified practitioners.`
      : 'Browse our directory of certified ketamine therapy providers across the United States.',
    itemListElement: providers.map((provider, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Physician',
        name: `${provider.firstName} ${provider.lastName}`,
        url: `${SITE_URL}/providers/${provider.slug}`,
        ...(provider.city &&
          provider.state && {
            address: {
              '@type': 'PostalAddress',
              addressLocality: provider.city,
              addressRegion: provider.state,
              addressCountry: 'US',
            },
          }),
        ...(provider.rating &&
          provider.reviewCount && {
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: provider.rating,
              reviewCount: provider.reviewCount,
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

export default LocalBusinessSchema;
