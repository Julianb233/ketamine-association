'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Video,
  Building2,
  ArrowRight,
  Filter,
  ChevronDown,
  ChevronUp,
  Globe,
  Ticket
} from 'lucide-react';

// Event types and formats matching Prisma model
const eventTypes = [
  { id: 'all', label: 'All Types' },
  { id: 'CONFERENCE', label: 'Conference' },
  { id: 'WORKSHOP', label: 'Workshop' },
  { id: 'WEBINAR', label: 'Webinar' },
  { id: 'MEETUP', label: 'Meetup' },
  { id: 'COURSE', label: 'Course' },
];

const eventFormats = [
  { id: 'all', label: 'All Formats' },
  { id: 'IN_PERSON', label: 'In-Person' },
  { id: 'VIRTUAL', label: 'Virtual' },
  { id: 'HYBRID', label: 'Hybrid' },
];

// Placeholder event data
const upcomingEvents = [
  {
    slug: 'ketamine-summit-2026',
    title: 'Ketamine Therapy Summit 2026',
    description: 'The premier annual gathering for ketamine therapy professionals. Three days of cutting-edge research presentations, hands-on workshops, and networking opportunities with industry leaders.',
    eventType: 'CONFERENCE',
    format: 'HYBRID',
    startDate: '2026-03-15',
    endDate: '2026-03-17',
    location: 'Austin Convention Center, Austin, TX',
    virtualUrl: 'https://events.ketamine.org/summit-2026',
    price: 79900,
    memberPrice: 59900,
    capacity: 500,
    registeredCount: 347,
    speakers: ['Dr. Sarah Mitchell', 'Dr. James Chen', 'Dr. Emily Watson'],
    featured: true,
  },
  {
    slug: 'iv-ketamine-certification-feb-2026',
    title: 'IV Ketamine Infusion Certification Course',
    description: 'Comprehensive 2-day certification program covering IV ketamine protocols, patient monitoring, and safety procedures. Includes hands-on training and certification exam.',
    eventType: 'COURSE',
    format: 'IN_PERSON',
    startDate: '2026-02-08',
    endDate: '2026-02-09',
    location: 'Ketamine Training Institute, Denver, CO',
    price: 149900,
    memberPrice: 119900,
    capacity: 30,
    registeredCount: 22,
    speakers: ['Dr. Michael Torres'],
    featured: false,
  },
  {
    slug: 'integration-therapy-workshop-jan-2026',
    title: 'Advanced Integration Therapy Workshop',
    description: 'Master the art of ketamine integration therapy with evidence-based techniques. Learn to guide patients through the integration process for optimal outcomes.',
    eventType: 'WORKSHOP',
    format: 'VIRTUAL',
    startDate: '2026-01-25',
    endDate: '2026-01-25',
    virtualUrl: 'https://events.ketamine.org/integration-workshop',
    price: 24900,
    memberPrice: 19900,
    capacity: 100,
    registeredCount: 67,
    speakers: ['Dr. Lisa Anderson', 'Jennifer Martinez, LMFT'],
    featured: false,
  },
  {
    slug: 'regulatory-compliance-webinar-jan-2026',
    title: 'Navigating FDA Regulations: 2026 Compliance Update',
    description: 'Free webinar covering the latest FDA guidance on ketamine compounding, prescribing requirements, and REMS compliance for esketamine.',
    eventType: 'WEBINAR',
    format: 'VIRTUAL',
    startDate: '2026-01-18',
    endDate: '2026-01-18',
    virtualUrl: 'https://events.ketamine.org/compliance-2026',
    price: 0,
    memberPrice: 0,
    capacity: 500,
    registeredCount: 412,
    speakers: ['David Thompson, JD', 'Dr. Robert Kim'],
    featured: false,
  },
  {
    slug: 'ketamine-providers-meetup-nyc-feb-2026',
    title: 'Ketamine Providers Networking Meetup - NYC',
    description: 'Connect with fellow ketamine therapy providers in the New York area. Casual evening event with discussions on practice challenges and peer support.',
    eventType: 'MEETUP',
    format: 'IN_PERSON',
    startDate: '2026-02-20',
    endDate: '2026-02-20',
    location: 'The Roosevelt Hotel, New York, NY',
    price: 2500,
    memberPrice: 0,
    capacity: 75,
    registeredCount: 48,
    speakers: [],
    featured: false,
  },
  {
    slug: 'ketamine-pain-management-course-mar-2026',
    title: 'Ketamine for Chronic Pain: Clinical Certification',
    description: 'Specialized certification course focusing on ketamine protocols for chronic pain conditions including CRPS, fibromyalgia, and neuropathic pain.',
    eventType: 'COURSE',
    format: 'HYBRID',
    startDate: '2026-03-01',
    endDate: '2026-03-02',
    location: 'UCLA Medical Center, Los Angeles, CA',
    virtualUrl: 'https://events.ketamine.org/pain-cert-2026',
    price: 129900,
    memberPrice: 99900,
    capacity: 40,
    registeredCount: 31,
    speakers: ['Dr. Emily Watson', 'Dr. Sarah Mitchell'],
    featured: false,
  },
];

const pastEvents = [
  {
    slug: 'ketamine-research-symposium-2025',
    title: 'Annual Ketamine Research Symposium 2025',
    eventType: 'CONFERENCE',
    format: 'HYBRID',
    startDate: '2025-11-15',
    endDate: '2025-11-16',
    location: 'San Francisco, CA',
  },
  {
    slug: 'telehealth-ketamine-workshop-2025',
    title: 'Telehealth Ketamine Programs: Implementation Workshop',
    eventType: 'WORKSHOP',
    format: 'VIRTUAL',
    startDate: '2025-10-22',
    endDate: '2025-10-22',
  },
  {
    slug: 'spravato-certification-oct-2025',
    title: 'Spravato REMS Certification Training',
    eventType: 'COURSE',
    format: 'IN_PERSON',
    startDate: '2025-10-05',
    endDate: '2025-10-05',
    location: 'Chicago, IL',
  },
];

const eventTypeLabels: Record<string, string> = {
  CONFERENCE: 'Conference',
  WORKSHOP: 'Workshop',
  WEBINAR: 'Webinar',
  MEETUP: 'Meetup',
  COURSE: 'Course',
};

const eventFormatLabels: Record<string, string> = {
  IN_PERSON: 'In-Person',
  VIRTUAL: 'Virtual',
  HYBRID: 'Hybrid',
};

const formatBadgeVariants: Record<string, 'primary' | 'secondary' | 'accent'> = {
  IN_PERSON: 'primary',
  VIRTUAL: 'secondary',
  HYBRID: 'accent',
};

const formatIcons: Record<string, typeof MapPin> = {
  IN_PERSON: Building2,
  VIRTUAL: Video,
  HYBRID: Globe,
};

function formatDateRange(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (startDate === endDate) {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(start);
  }

  const startMonth = start.getMonth();
  const endMonth = end.getMonth();

  if (startMonth === endMonth) {
    return `${new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric' }).format(start)} - ${new Intl.DateTimeFormat('en-US', { day: 'numeric', year: 'numeric' }).format(end)}`;
  }

  return `${new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(start)} - ${new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(end)}`;
}

function formatPrice(cents: number): string {
  if (cents === 0) return 'Free';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(cents / 100);
}

export default function EventsPage() {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedFormat, setSelectedFormat] = useState('all');
  const [showPastEvents, setShowPastEvents] = useState(false);

  const filteredEvents = upcomingEvents.filter((event) => {
    if (selectedType !== 'all' && event.eventType !== selectedType) return false;
    if (selectedFormat !== 'all' && event.format !== selectedFormat) return false;
    return true;
  });

  const featuredEvent = filteredEvents.find((e) => e.featured) || filteredEvents[0];
  const regularEvents = filteredEvents.filter((e) => e !== featuredEvent);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-700 via-teal-600 to-emerald-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <Container className="relative py-16 lg:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" size="lg" className="mb-6 bg-white/20 text-white border-0">
              Education & Networking
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Upcoming Events
            </h1>
            <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
              Join conferences, workshops, and training programs designed for ketamine therapy
              professionals. Connect with peers and advance your practice.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-8 text-white">
              <div className="text-center">
                <div className="text-3xl font-bold">{upcomingEvents.length}</div>
                <div className="text-teal-200 text-sm">Upcoming Events</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">15+</div>
                <div className="text-teal-200 text-sm">Expert Speakers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">1,200+</div>
                <div className="text-teal-200 text-sm">Attendees This Year</div>
              </div>
            </div>
          </div>
        </Container>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-12 sm:h-20">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f8fafc"/>
          </svg>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 bg-white border-b border-slate-200 sticky top-0 z-10">
        <Container>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center gap-2 text-slate-600">
              <Filter className="w-5 h-5" />
              <span className="font-medium">Filter by:</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {/* Event Type Filter */}
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
              >
                {eventTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.label}
                  </option>
                ))}
              </select>

              {/* Format Filter */}
              <select
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
              >
                {eventFormats.map((format) => (
                  <option key={format.id} value={format.id}>
                    {format.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Event */}
      {featuredEvent && (
        <section className="py-12 bg-slate-50">
          <Container>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Featured Event</h2>
            <Link href={`/events/${featuredEvent.slug}`}>
              <Card hover className="overflow-hidden">
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Image/Visual */}
                  <div className="aspect-video lg:aspect-auto lg:h-full bg-gradient-to-br from-teal-500 to-emerald-500 relative p-8 flex flex-col justify-between min-h-[300px]">
                    <div className="flex gap-2">
                      <Badge variant="default" className="bg-white/20 text-white border-0">
                        {eventTypeLabels[featuredEvent.eventType]}
                      </Badge>
                      <Badge variant={formatBadgeVariants[featuredEvent.format]}>
                        {eventFormatLabels[featuredEvent.format]}
                      </Badge>
                    </div>
                    <div>
                      <div className="text-white/80 text-lg mb-2">
                        {formatDateRange(featuredEvent.startDate, featuredEvent.endDate)}
                      </div>
                      <div className="text-white text-5xl font-bold">
                        {new Date(featuredEvent.startDate).getDate()}
                      </div>
                      <div className="text-white/80 text-xl">
                        {new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(new Date(featuredEvent.startDate))}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <CardContent className="p-8 lg:p-10 flex flex-col justify-center">
                    <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4">
                      {featuredEvent.title}
                    </h3>
                    <p className="text-slate-600 mb-6 line-clamp-3">
                      {featuredEvent.description}
                    </p>

                    <div className="space-y-3 mb-6">
                      {featuredEvent.location && (
                        <div className="flex items-center gap-2 text-slate-600">
                          <MapPin className="w-5 h-5 text-teal-600" />
                          {featuredEvent.location}
                        </div>
                      )}
                      {featuredEvent.virtualUrl && (
                        <div className="flex items-center gap-2 text-slate-600">
                          <Video className="w-5 h-5 text-teal-600" />
                          Virtual attendance available
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-slate-600">
                        <Users className="w-5 h-5 text-teal-600" />
                        {featuredEvent.registeredCount} / {featuredEvent.capacity} registered
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-slate-900">
                          {formatPrice(featuredEvent.memberPrice)}
                          <span className="text-sm font-normal text-slate-500 ml-2">members</span>
                        </div>
                        {featuredEvent.memberPrice !== featuredEvent.price && (
                          <div className="text-sm text-slate-500">
                            {formatPrice(featuredEvent.price)} non-members
                          </div>
                        )}
                      </div>
                      <Button variant="primary" size="lg">
                        Register Now
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </Link>
          </Container>
        </section>
      )}

      {/* Event Grid */}
      <section className="py-12 bg-slate-50">
        <Container>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900">All Upcoming Events</h2>
            <span className="text-slate-500">
              {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''}
            </span>
          </div>

          {filteredEvents.length === 0 ? (
            <Card className="p-12 text-center">
              <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No events found</h3>
              <p className="text-slate-600 mb-4">
                Try adjusting your filters to see more events.
              </p>
              <Button variant="outline" onClick={() => { setSelectedType('all'); setSelectedFormat('all'); }}>
                Clear Filters
              </Button>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularEvents.map((event) => {
                const FormatIcon = formatIcons[event.format];
                return (
                  <Link key={event.slug} href={`/events/${event.slug}`}>
                    <Card hover className="h-full">
                      {/* Date Badge */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-14 h-14 rounded-xl bg-teal-100 flex flex-col items-center justify-center">
                            <span className="text-xs text-teal-600 font-medium uppercase">
                              {new Intl.DateTimeFormat('en-US', { month: 'short' }).format(new Date(event.startDate))}
                            </span>
                            <span className="text-xl font-bold text-teal-700">
                              {new Date(event.startDate).getDate()}
                            </span>
                          </div>
                          <div>
                            <Badge variant="outline" size="sm">
                              {eventTypeLabels[event.eventType]}
                            </Badge>
                          </div>
                        </div>
                        <Badge variant={formatBadgeVariants[event.format]} size="sm" icon={FormatIcon}>
                          {eventFormatLabels[event.format]}
                        </Badge>
                      </div>

                      <h3 className="text-lg font-semibold text-slate-900 mb-2 line-clamp-2">
                        {event.title}
                      </h3>
                      <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                        {event.description}
                      </p>

                      <div className="space-y-2 mb-4">
                        {event.location && (
                          <div className="flex items-center gap-2 text-sm text-slate-500">
                            <MapPin className="w-4 h-4" />
                            <span className="line-clamp-1">{event.location}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <Clock className="w-4 h-4" />
                          {formatDateRange(event.startDate, event.endDate)}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <div>
                          <span className="text-lg font-bold text-slate-900">
                            {formatPrice(event.memberPrice)}
                          </span>
                          {event.memberPrice !== event.price && event.memberPrice > 0 && (
                            <span className="text-xs text-slate-500 ml-1">member</span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-slate-500">
                          <Users className="w-4 h-4" />
                          {event.capacity - event.registeredCount} spots left
                        </div>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          )}
        </Container>
      </section>

      {/* Past Events (Collapsible) */}
      <section className="py-12 bg-white">
        <Container>
          <button
            onClick={() => setShowPastEvents(!showPastEvents)}
            className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <h2 className="text-xl font-bold text-slate-900">Past Events</h2>
            <div className="flex items-center gap-2 text-slate-600">
              <span className="text-sm">{pastEvents.length} events</span>
              {showPastEvents ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </div>
          </button>

          {showPastEvents && (
            <div className="mt-6 space-y-4">
              {pastEvents.map((event) => (
                <Card key={event.slug} className="p-4" variant="bordered">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 rounded-lg bg-slate-100 flex flex-col items-center justify-center flex-shrink-0">
                        <span className="text-xs text-slate-500 font-medium uppercase">
                          {new Intl.DateTimeFormat('en-US', { month: 'short' }).format(new Date(event.startDate))}
                        </span>
                        <span className="text-lg font-bold text-slate-600">
                          {new Date(event.startDate).getDate()}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">{event.title}</h3>
                        <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                          <Badge variant="outline" size="sm">
                            {eventTypeLabels[event.eventType]}
                          </Badge>
                          <span>{eventFormatLabels[event.format]}</span>
                          {event.location && <span>{event.location}</span>}
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      View Recap
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-teal-700 via-teal-600 to-emerald-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <Container className="relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-6">
              <Ticket className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Want to Host an Event?
            </h2>
            <p className="text-xl text-teal-100 mb-8">
              Partner with the Ketamine Association to host workshops, meetups, or educational
              programs. Reach our network of 500+ ketamine therapy professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-teal-700 hover:bg-teal-50">
                Submit Event Proposal
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Become a Sponsor
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
