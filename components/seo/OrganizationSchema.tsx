/**
 * OrganizationSchema Component
 * Generates JSON-LD structured data for the organization
 * Should be included in the root layout for sitewide recognition
 */

import type { OrganizationSchema as OrganizationSchemaType, WebSiteSchema } from '@/types/seo';

interface OrganizationSchemaProps {
  includeWebsite?: boolean;
}

const SITE_URL = 'https://ketamineassociation.org';
const SITE_NAME = 'Ketamine Association';
const SITE_DESCRIPTION = "The nation's leading association for ketamine therapy practitioners. Access education, certification, and patient connections.";
const LOGO_URL = '/images/logo.png';

export function OrganizationSchema({ includeWebsite = true }: OrganizationSchemaProps) {
  const organizationSchema: OrganizationSchemaType = {
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
    description: SITE_DESCRIPTION,
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
      {
        '@type': 'ContactPoint',
        contactType: 'membership inquiries',
        email: 'membership@ketamineassociation.org',
        availableLanguage: 'English',
      },
    ],
    sameAs: [
      'https://twitter.com/ketamineassoc',
      'https://www.linkedin.com/company/ketamine-association',
      'https://www.facebook.com/ketamineassociation',
      'https://www.instagram.com/ketamineassociation',
      'https://www.youtube.com/@ketamineassociation',
    ],
    areaServed: 'US',
  };

  const websiteSchema: WebSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}${LOGO_URL}`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  // Combine schemas in a graph
  const combinedSchema = includeWebsite
    ? {
        '@context': 'https://schema.org',
        '@graph': [organizationSchema, websiteSchema],
      }
    : organizationSchema;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
    />
  );
}

// Standalone WebsiteSchema for specific use cases
export function WebsiteSchema() {
  const schema: WebSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default OrganizationSchema;
