import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export interface Event {
  slug: string;
  title: string;
  description: string;
  eventType: 'Conference' | 'Workshop' | 'Webinar' | 'Networking' | 'Course' | 'Meetup';
  format: 'In-Person' | 'Virtual' | 'Hybrid';
  image: string;
  date: string;
  time: string;
  location?: string;
  virtualUrl?: string;
  timezone?: string;
  price: {
    member: number;
    nonMember: number;
  };
  capacity?: number;
  spotsLeft?: number;
  isFeatured?: boolean;
}

interface EventCardProps {
  event: Event;
  variant?: 'default' | 'compact';
}

const eventTypeColors: Record<string, 'primary' | 'secondary' | 'accent' | 'default'> = {
  'Conference': 'primary',
  'Workshop': 'secondary',
  'Webinar': 'accent',
  'Networking': 'default',
  'Course': 'primary',
  'Meetup': 'default',
};

const formatColors: Record<string, 'success' | 'warning' | 'default'> = {
  'In-Person': 'success',
  'Virtual': 'warning',
  'Hybrid': 'default',
};

export function EventCard({ event, variant = 'default' }: EventCardProps) {
  const eventTypeBadge = eventTypeColors[event.eventType] || 'default';
  const formatBadge = formatColors[event.format] || 'default';

  // Parse date for display
  const dateObj = new Date(event.date);
  const month = dateObj.toLocaleDateString('en-US', { month: 'short' });
  const day = dateObj.getDate();

  if (variant === 'compact') {
    return (
      <Link href={`/association/events/${event.slug}`} className="block group">
        <Card hover padding="sm" className="flex items-center gap-4">
          <div className="flex-shrink-0 w-14 h-14 bg-teal-50 rounded-lg flex flex-col items-center justify-center">
            <span className="text-xs font-medium text-teal-600 uppercase">{month}</span>
            <span className="text-xl font-bold text-teal-700">{day}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant={eventTypeBadge} size="sm">
                {event.eventType}
              </Badge>
              <Badge variant={formatBadge} size="sm">
                {event.format}
              </Badge>
            </div>
            <h4 className="font-semibold text-slate-900 truncate group-hover:text-teal-600 transition-colors">
              {event.title}
            </h4>
            <p className="text-sm text-slate-500">{event.time}</p>
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Card hover padding="none" className="overflow-hidden h-full flex flex-col">
      <div className="relative aspect-[16/9]">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover"
        />
        {event.isFeatured && (
          <div className="absolute top-3 left-3">
            <Badge variant="accent" size="sm">
              Featured
            </Badge>
          </div>
        )}
        <div className="absolute top-3 right-3 bg-white rounded-lg shadow-lg p-2 text-center min-w-[60px]">
          <span className="block text-xs font-medium text-teal-600 uppercase">{month}</span>
          <span className="block text-2xl font-bold text-slate-900">{day}</span>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant={eventTypeBadge} size="sm">
            {event.eventType}
          </Badge>
          <Badge variant={formatBadge} size="sm">
            {event.format}
          </Badge>
        </div>
        <Link href={`/association/events/${event.slug}`} className="group/title">
          <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover/title:text-teal-600 transition-colors line-clamp-2">
            {event.title}
          </h3>
        </Link>
        <p className="text-slate-600 text-sm mb-4 line-clamp-2 flex-1">
          {event.description}
        </p>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{event.time}</span>
          </div>
          {event.location && (
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="truncate">{event.location}</span>
            </div>
          )}
        </div>
        <div className="mt-4 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-sm text-slate-500">Member: </span>
              <span className="font-bold text-slate-900">
                {event.price.member === 0 ? 'Free' : `$${event.price.member}`}
              </span>
            </div>
            <div>
              <span className="text-sm text-slate-500">Non-member: </span>
              <span className="font-semibold text-slate-700">
                {event.price.nonMember === 0 ? 'Free' : `$${event.price.nonMember}`}
              </span>
            </div>
          </div>
          {event.spotsLeft !== undefined && event.spotsLeft <= 20 && (
            <p className="text-sm text-amber-600 font-medium mb-3">
              Only {event.spotsLeft} spots left!
            </p>
          )}
          <Button href={`/association/events/${event.slug}`} variant="primary" size="sm" fullWidth>
            Register Now
          </Button>
        </div>
      </div>
    </Card>
  );
}
