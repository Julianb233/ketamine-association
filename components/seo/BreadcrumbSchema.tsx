/**
 * BreadcrumbSchema Component
 * Generates JSON-LD structured data for breadcrumb navigation
 * Helps search engines understand site hierarchy and navigation
 */

import type { BreadcrumbListSchema, BreadcrumbItem } from '@/types/seo';

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

const SITE_URL = 'https://ketamineassociation.org';

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  // Always include Home as the first item
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    ...items,
  ];

  const schema: BreadcrumbListSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href && {
        item: item.href.startsWith('http') ? item.href : `${SITE_URL}${item.href}`,
      }),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Helper function to generate common breadcrumb paths
export function generateBreadcrumbs(
  path: string,
  customLabels?: Record<string, string>
): BreadcrumbItem[] {
  const segments = path.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [];

  // Default label mappings
  const defaultLabels: Record<string, string> = {
    blog: 'Blog',
    articles: 'Articles',
    providers: 'Provider Directory',
    academy: 'Academy',
    courses: 'Courses',
    events: 'Events',
    store: 'Store',
    about: 'About Us',
    contact: 'Contact',
    association: 'Association',
    membership: 'Membership',
    pricing: 'Pricing',
    directory: 'Directory',
    practitioners: 'For Practitioners',
    patients: 'For Patients',
    certification: 'Certification',
    education: 'Education',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    ...customLabels,
  };

  let currentPath = '';
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === segments.length - 1;

    // Try to get a label from mappings, or format the segment
    const label =
      defaultLabels[segment] ||
      segment
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    breadcrumbs.push({
      label,
      // Don't include href for the last item (current page)
      href: isLast ? undefined : currentPath,
    });
  });

  return breadcrumbs;
}

// Specific breadcrumb generators for common page types
export function BlogBreadcrumbs(articleTitle: string, category?: string): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [{ label: 'Blog', href: '/blog' }];

  if (category) {
    items.push({
      label: category,
      href: `/blog?category=${encodeURIComponent(category)}`,
    });
  }

  items.push({ label: articleTitle });

  return items;
}

export function ProviderBreadcrumbs(providerName: string, location?: string): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [{ label: 'Provider Directory', href: '/providers' }];

  if (location) {
    items.push({
      label: location,
      href: `/providers?location=${encodeURIComponent(location)}`,
    });
  }

  items.push({ label: providerName });

  return items;
}

export function CourseBreadcrumbs(courseTitle: string, category?: string): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [
    { label: 'Academy', href: '/academy' },
    { label: 'Courses', href: '/academy/courses' },
  ];

  if (category) {
    items.push({
      label: category,
      href: `/academy/courses?category=${encodeURIComponent(category)}`,
    });
  }

  items.push({ label: courseTitle });

  return items;
}

export function EventBreadcrumbs(eventTitle: string): BreadcrumbItem[] {
  return [
    { label: 'Events', href: '/events' },
    { label: eventTitle },
  ];
}

export default BreadcrumbSchema;
