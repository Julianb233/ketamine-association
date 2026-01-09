/**
 * EventSchema Component
 * Generates JSON-LD structured data for events
 * Supports in-person, virtual, and hybrid events
 */

import type { EventSchema as EventSchemaType, OfferSchema } from '@/types/seo';

interface EventData {
  name: string;
  description: string;
  slug: string;
  startDate: string;
  endDate?: string;
  location?: {
    type: 'physical' | 'virtual' | 'hybrid';
    name?: string;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    url?: string;
  };
  organizer?: {
    name: string;
    url?: string;
  };
  speakers?: Array<{
    name: string;
    jobTitle?: string;
    url?: string;
  }>;
  image?: string;
  price?: number;
  priceCurrency?: string;
  availability?: 'InStock' | 'SoldOut' | 'PreOrder';
  registrationUrl?: string;
  eventStatus?: 'EventScheduled' | 'EventCancelled' | 'EventPostponed' | 'EventRescheduled';
}

interface EventSchemaProps {
  event: EventData;
}

const SITE_URL = 'https://ketamineassociation.org';
const SITE_NAME = 'Ketamine Association';

export function EventSchema({ event }: EventSchemaProps) {
  const eventUrl = `${SITE_URL}/events/${event.slug}`;

  // Determine attendance mode
  const getAttendanceMode = () => {
    switch (event.location?.type) {
      case 'physical':
        return 'https://schema.org/OfflineEventAttendanceMode';
      case 'virtual':
        return 'https://schema.org/OnlineEventAttendanceMode';
      case 'hybrid':
        return 'https://schema.org/MixedEventAttendanceMode';
      default:
        return 'https://schema.org/OnlineEventAttendanceMode';
    }
  };

  // Build location schema
  const getLocation = (): { '@type': 'Place'; name?: string; address: { '@type': 'PostalAddress'; streetAddress?: string; addressLocality?: string; addressRegion?: string; postalCode?: string; addressCountry?: string; }; } | { '@type': 'VirtualLocation'; url: string; } | undefined => {
    if (!event.location) return undefined;

    if (event.location.type === 'virtual') {
      return {
        '@type': 'VirtualLocation' as const,
        url: event.location.url || eventUrl,
      };
    }

    if (event.location.type === 'physical' || event.location.type === 'hybrid') {
      // For hybrid events, return the physical location (virtual URL is in eventAttendanceMode)
      return {
        '@type': 'Place' as const,
        name: event.location.name,
        address: {
          '@type': 'PostalAddress' as const,
          streetAddress: event.location.address,
          addressLocality: event.location.city,
          addressRegion: event.location.state,
          postalCode: event.location.zipCode,
          addressCountry: 'US',
        },
      };
    }

    return undefined;
  };

  // Build offers schema
  const offers: OfferSchema | undefined =
    typeof event.price !== 'undefined'
      ? {
          '@type': 'Offer',
          price: event.price,
          priceCurrency: event.priceCurrency || 'USD',
          availability: event.availability
            ? `https://schema.org/${event.availability}`
            : 'https://schema.org/InStock',
          url: event.registrationUrl || eventUrl,
          validFrom: new Date().toISOString(),
        }
      : undefined;

  const schema: EventSchemaType = {
    '@context': 'https://schema.org',
    '@type': 'EducationEvent',
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    ...(event.endDate && { endDate: event.endDate }),
    eventStatus: event.eventStatus
      ? `https://schema.org/${event.eventStatus}`
      : 'https://schema.org/EventScheduled',
    eventAttendanceMode: getAttendanceMode(),
    location: getLocation(),
    organizer: event.organizer
      ? {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: event.organizer.name,
          url: event.organizer.url || SITE_URL,
          logo: `${SITE_URL}/images/logo.png`,
        }
      : {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: SITE_NAME,
          url: SITE_URL,
          logo: `${SITE_URL}/images/logo.png`,
        },
    ...(event.speakers &&
      event.speakers.length > 0 && {
        performer: event.speakers.map((speaker) => ({
          '@context': 'https://schema.org' as const,
          '@type': 'Person' as const,
          name: speaker.name,
          ...(speaker.jobTitle && { jobTitle: speaker.jobTitle }),
          ...(speaker.url && { url: speaker.url }),
        })),
      }),
    ...(event.image && {
      image: event.image.startsWith('http') ? event.image : `${SITE_URL}${event.image}`,
    }),
    ...(offers && { offers: [offers] }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Component for event listing pages
interface EventListSchemaProps {
  events: Array<{
    name: string;
    slug: string;
    startDate: string;
    endDate?: string;
    location?: {
      type: 'physical' | 'virtual' | 'hybrid';
      city?: string;
      state?: string;
    };
  }>;
}

export function EventListSchema({ events }: EventListSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Ketamine Association Events',
    description:
      'Upcoming events, conferences, and educational workshops from the Ketamine Association.',
    itemListElement: events.map((event, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Event',
        name: event.name,
        url: `${SITE_URL}/events/${event.slug}`,
        startDate: event.startDate,
        ...(event.endDate && { endDate: event.endDate }),
        ...(event.location?.city &&
          event.location?.state && {
            location: {
              '@type': 'Place',
              address: {
                '@type': 'PostalAddress',
                addressLocality: event.location.city,
                addressRegion: event.location.state,
              },
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

export default EventSchema;
