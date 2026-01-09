/**
 * MedicalWebPageSchema Component
 * Generates JSON-LD structured data for medical/health content
 * Follows Google's health content guidelines for enhanced trust signals
 */

import type {
  MedicalWebPageSchema as MedicalWebPageSchemaType,
  MedicalConditionSchema,
  DrugSchema,
  TherapySchema,
  PersonSchema,
} from '@/types/seo';

interface MedicalWebPageSchemaProps {
  page: {
    title: string;
    description: string;
    url: string;
    datePublished?: string;
    dateModified?: string;
    lastReviewed?: string;
    author?: {
      name: string;
      credentials?: string;
      url?: string;
    };
    reviewer?: {
      name: string;
      credentials?: string;
      url?: string;
    };
    audience?: 'Patient' | 'Clinician' | 'MedicalAudience';
    specialty?: string;
  };
  about?: {
    type: 'condition' | 'drug' | 'therapy';
    name: string;
    description?: string;
    alternateName?: string[];
  };
}

const SITE_URL = 'https://ketamineassociation.org';
const SITE_NAME = 'Ketamine Association';

export function MedicalWebPageSchema({ page, about }: MedicalWebPageSchemaProps) {
  const pageUrl = page.url.startsWith('http') ? page.url : `${SITE_URL}${page.url}`;

  // Build author schema
  const authorSchema: PersonSchema | undefined = page.author
    ? {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: page.author.name,
        ...(page.author.credentials && { jobTitle: page.author.credentials }),
        ...(page.author.url && { url: page.author.url }),
      }
    : undefined;

  // Build reviewer schema
  const reviewerSchema: PersonSchema | undefined = page.reviewer
    ? {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: page.reviewer.name,
        ...(page.reviewer.credentials && { jobTitle: page.reviewer.credentials }),
        ...(page.reviewer.url && { url: page.reviewer.url }),
      }
    : undefined;

  // Build about entity based on type
  let aboutEntity: MedicalConditionSchema | DrugSchema | TherapySchema | undefined;

  if (about) {
    switch (about.type) {
      case 'condition':
        aboutEntity = {
          '@context': 'https://schema.org',
          '@type': 'MedicalCondition',
          name: about.name,
          description: about.description,
          alternateName: about.alternateName,
        };
        break;
      case 'drug':
        aboutEntity = {
          '@context': 'https://schema.org',
          '@type': 'Drug',
          name: about.name,
          description: about.description,
        };
        break;
      case 'therapy':
        aboutEntity = {
          '@context': 'https://schema.org',
          '@type': 'MedicalTherapy',
          name: about.name,
          description: about.description,
        };
        break;
    }
  }

  const schema: MedicalWebPageSchemaType = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: page.title,
    description: page.description,
    url: pageUrl,
    ...(page.datePublished && { datePublished: page.datePublished }),
    ...(page.dateModified && { dateModified: page.dateModified }),
    ...(page.lastReviewed && { lastReviewed: page.lastReviewed }),
    ...(authorSchema && { author: authorSchema }),
    ...(reviewerSchema && { reviewedBy: reviewerSchema }),
    publisher: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/images/logo.png`,
    },
    ...(page.audience && {
      audience: {
        '@type': page.audience,
        audienceType: page.audience === 'Patient' ? 'Patient' : 'Healthcare Professional',
      },
    }),
    ...(page.specialty && {
      specialty: {
        '@type': 'MedicalSpecialty',
        name: page.specialty,
      },
    }),
    ...(aboutEntity && { about: aboutEntity }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Pre-configured medical pages for common topics
export function KetamineTherapySchema() {
  return (
    <MedicalWebPageSchema
      page={{
        title: 'Ketamine Therapy: A Comprehensive Guide',
        description:
          'Learn about ketamine therapy for depression, anxiety, and chronic pain. Understand how it works, what to expect, and find qualified providers.',
        url: '/education/ketamine-therapy',
        specialty: 'Psychiatry',
        audience: 'Patient',
      }}
      about={{
        type: 'therapy',
        name: 'Ketamine Therapy',
        description:
          'A medical treatment using low-dose ketamine for treatment-resistant depression, anxiety disorders, PTSD, and chronic pain conditions.',
      }}
    />
  );
}

export function DepressionTreatmentSchema() {
  return (
    <MedicalWebPageSchema
      page={{
        title: 'Ketamine for Treatment-Resistant Depression',
        description:
          'Explore how ketamine therapy helps patients with treatment-resistant depression. Learn about efficacy, protocols, and finding treatment.',
        url: '/education/depression-treatment',
        specialty: 'Psychiatry',
        audience: 'Patient',
      }}
      about={{
        type: 'condition',
        name: 'Treatment-Resistant Depression',
        description:
          'A form of major depressive disorder that does not respond adequately to at least two different antidepressant medications.',
        alternateName: ['TRD', 'Refractory Depression'],
      }}
    />
  );
}

export function PTSDTreatmentSchema() {
  return (
    <MedicalWebPageSchema
      page={{
        title: 'Ketamine Therapy for PTSD',
        description:
          'Learn about ketamine-assisted therapy for post-traumatic stress disorder. Understand the research, treatment protocols, and outcomes.',
        url: '/education/ptsd-treatment',
        specialty: 'Psychiatry',
        audience: 'Patient',
      }}
      about={{
        type: 'condition',
        name: 'Post-Traumatic Stress Disorder',
        description:
          'A mental health condition triggered by experiencing or witnessing a traumatic event, characterized by flashbacks, nightmares, and severe anxiety.',
        alternateName: ['PTSD', 'Post-Traumatic Stress'],
      }}
    />
  );
}

export function ChronicPainSchema() {
  return (
    <MedicalWebPageSchema
      page={{
        title: 'Ketamine Infusions for Chronic Pain',
        description:
          'Discover how ketamine infusion therapy helps manage chronic pain conditions including fibromyalgia, CRPS, and neuropathic pain.',
        url: '/education/chronic-pain',
        specialty: 'Pain Medicine',
        audience: 'Patient',
      }}
      about={{
        type: 'condition',
        name: 'Chronic Pain',
        description:
          'Persistent pain lasting longer than three months that may continue after the initial injury or condition has healed.',
        alternateName: ['Persistent Pain', 'Long-term Pain'],
      }}
    />
  );
}

// For practitioner education pages
export function PractitionerEducationSchema({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}) {
  return (
    <MedicalWebPageSchema
      page={{
        title,
        description,
        url,
        specialty: 'Psychiatry',
        audience: 'Clinician',
      }}
    />
  );
}

export default MedicalWebPageSchema;
