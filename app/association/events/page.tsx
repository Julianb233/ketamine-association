'use client';

import { useState, useMemo } from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { EventCard, type Event } from '@/components/events/EventCard';
import { Calendar, List, Filter, X, MapPin, Monitor, Users } from 'lucide-react';

// Event type and format filters
const eventTypes = ['All', 'Conference', 'Workshop', 'Webinar', 'Course', 'Meetup'] as const;
const eventFormats = ['All Formats', 'In-Person', 'Virtual', 'Hybrid'] as const;

type EventTypeFilter = typeof eventTypes[number];
type EventFormatFilter = typeof eventFormats[number];

// Placeholder events data - in production, fetch from database
const upcomingEvents: Event[] = [
  {
    slug: 'annual-ketamine-summit-2024',
    title: '2024 Annual Ketamine Therapy Summit',
    description: 'The premier gathering of ketamine therapy professionals. Three days of cutting-edge research, hands-on workshops, and networking opportunities.',
    eventType: 'Conference',
    format: 'In-Person',
    image: '/images/events/summit-2024.jpg',
    date: '2024-03-15',
    time: '9:00 AM - 5:00 PM EST',
    timezone: 'America/New_York',
    location: 'San Diego Convention Center, CA',
    price: {
      member: 495,
      nonMember: 695,
    },
    capacity: 500,
    spotsLeft: 45,
    isFeatured: true,
  },
  {
    slug: 'iv-infusion-masterclass',
    title: 'IV Infusion Technique Masterclass',
    description: 'An intensive hands-on workshop covering advanced IV ketamine infusion techniques, safety protocols, and patient monitoring best practices.',
    eventType: 'Workshop',
    format: 'In-Person',
    image: '/images/events/iv-workshop.jpg',
    date: '2024-02-22',
    time: '10:00 AM - 4:00 PM EST',
    timezone: 'America/New_York',
    location: 'Boston Medical Training Center, MA',
    price: {
      member: 295,
      nonMember: 395,
    },
    capacity: 30,
    spotsLeft: 12,
  },
  {
    slug: 'mental-health-integration-webinar',
    title: 'Mental Health Integration Strategies',
    description: 'Learn evidence-based approaches to integrating mental health support with ketamine therapy for optimal patient outcomes.',
    eventType: 'Webinar',
    format: 'Virtual',
    image: '/images/events/webinar-mental-health.jpg',
    date: '2024-02-08',
    time: '2:00 PM - 3:30 PM EST',
    timezone: 'America/New_York',
    virtualUrl: 'https://zoom.us/j/example',
    price: {
      member: 0,
      nonMember: 49,
    },
  },
  {
    slug: 'practitioner-networking-miami',
    title: 'Practitioner Networking Event - Miami',
    description: 'Connect with fellow ketamine therapy practitioners in the Southeast region. Casual networking with light refreshments.',
    eventType: 'Meetup',
    format: 'In-Person',
    image: '/images/events/networking-miami.jpg',
    date: '2024-02-15',
    time: '6:00 PM - 9:00 PM EST',
    timezone: 'America/New_York',
    location: 'The Biltmore Hotel, Miami, FL',
    price: {
      member: 0,
      nonMember: 25,
    },
  },
  {
    slug: 'pediatric-ketamine-workshop',
    title: 'Pediatric Applications of Ketamine',
    description: 'Specialized workshop focusing on the unique considerations for ketamine therapy in adolescent populations.',
    eventType: 'Workshop',
    format: 'Hybrid',
    image: '/images/events/pediatric-workshop.jpg',
    date: '2024-03-01',
    time: '9:00 AM - 1:00 PM EST',
    timezone: 'America/New_York',
    location: "Children's Hospital of Philadelphia, PA",
    virtualUrl: 'https://zoom.us/j/example',
    price: {
      member: 195,
      nonMember: 295,
    },
    capacity: 50,
    spotsLeft: 8,
  },
  {
    slug: 'research-roundtable-q1-2024',
    title: 'Research Roundtable: Q1 2024 Updates',
    description: 'Monthly virtual discussion of the latest ketamine research publications with leading researchers in the field.',
    eventType: 'Webinar',
    format: 'Virtual',
    image: '/images/events/research-roundtable.jpg',
    date: '2024-01-25',
    time: '12:00 PM - 1:00 PM EST',
    timezone: 'America/New_York',
    virtualUrl: 'https://zoom.us/j/example',
    price: {
      member: 0,
      nonMember: 29,
    },
  },
  {
    slug: 'ketamine-certification-course',
    title: 'Ketamine Therapy Certification Course',
    description: 'Comprehensive 8-week online certification program covering all aspects of ketamine-assisted therapy.',
    eventType: 'Course',
    format: 'Virtual',
    image: '/images/events/certification-course.jpg',
    date: '2024-04-01',
    time: 'Self-Paced (8 weeks)',
    timezone: 'America/New_York',
    virtualUrl: 'https://learn.ketamineassociation.org',
    price: {
      member: 1495,
      nonMember: 1995,
    },
    capacity: 100,
    spotsLeft: 67,
  },
];

const pastEvents: Event[] = [
  {
    slug: 'fall-conference-2023',
    title: '2023 Fall Clinical Conference',
    description: 'Our fall conference focused on emerging treatment protocols and regulatory updates.',
    eventType: 'Conference',
    format: 'In-Person',
    image: '/images/events/fall-conference-2023.jpg',
    date: '2023-10-20',
    time: '9:00 AM - 5:00 PM EST',
    location: 'Chicago Convention Center, IL',
    price: {
      member: 395,
      nonMember: 595,
    },
  },
  {
    slug: 'safety-protocols-webinar',
    title: 'Advanced Safety Protocols Webinar',
    description: 'Deep dive into safety protocols and emergency response procedures for ketamine therapy.',
    eventType: 'Webinar',
    format: 'Virtual',
    image: '/images/events/safety-webinar.jpg',
    date: '2023-11-15',
    time: '2:00 PM - 4:00 PM EST',
    price: {
      member: 0,
      nonMember: 49,
    },
  },
];

export default function EventsPage() {
  const [selectedType, setSelectedType] = useState<EventTypeFilter>('All');
  const [selectedFormat, setSelectedFormat] = useState<EventFormatFilter>('All Formats');
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [showFilters, setShowFilters] = useState(false);

  // Filter events based on selections
  const filteredEvents = useMemo(() => {
    return upcomingEvents.filter((event) => {
      const matchesType = selectedType === 'All' || event.eventType === selectedType;
      const matchesFormat =
        selectedFormat === 'All Formats' || event.format === selectedFormat;
      return matchesType && matchesFormat;
    });
  }, [selectedType, selectedFormat]);

  // Get featured event
  const featuredEvent = upcomingEvents.find((e) => e.isFeatured);

  // Group events by month for calendar view
  const groupEventsByMonth = (events: Event[]) => {
    const grouped: Record<string, Event[]> = {};
    events.forEach((event) => {
      const date = new Date(event.date);
      const monthYear = date.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      });
      if (!grouped[monthYear]) {
        grouped[monthYear] = [];
      }
      grouped[monthYear].push(event);
    });
    return grouped;
  };

  const groupedEvents = groupEventsByMonth(filteredEvents);

  // Count events by format for filter badges
  const formatCounts = useMemo(() => {
    return {
      'In-Person': upcomingEvents.filter((e) => e.format === 'In-Person').length,
      'Virtual': upcomingEvents.filter((e) => e.format === 'Virtual').length,
      'Hybrid': upcomingEvents.filter((e) => e.format === 'Hybrid').length,
    };
  }, []);

  const hasActiveFilters = selectedType !== 'All' || selectedFormat !== 'All Formats';

  const clearFilters = () => {
    setSelectedType('All');
    setSelectedFormat('All Formats');
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-600 via-teal-700 to-emerald-800 text-white py-16 md:py-24">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Upcoming Events
            </h1>
            <p className="text-xl text-teal-100 leading-relaxed">
              Connect with fellow practitioners, learn from industry experts, and stay at the
              forefront of ketamine therapy through our conferences, workshops, and webinars.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <div className="flex items-center gap-2 text-teal-200">
                <MapPin className="w-5 h-5" />
                <span>{formatCounts['In-Person']} In-Person</span>
              </div>
              <div className="flex items-center gap-2 text-teal-200">
                <Monitor className="w-5 h-5" />
                <span>{formatCounts['Virtual']} Virtual</span>
              </div>
              <div className="flex items-center gap-2 text-teal-200">
                <Users className="w-5 h-5" />
                <span>{formatCounts['Hybrid']} Hybrid</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <Container>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 py-4">
            {/* Event Type Tabs - Desktop */}
            <div className="hidden lg:flex gap-2 overflow-x-auto scrollbar-hide">
              {eventTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    selectedType === type
                      ? 'bg-teal-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {type === 'All' ? 'All Events' : type}
                </button>
              ))}
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 rounded-lg text-slate-700 font-medium"
            >
              <Filter className="w-4 h-4" />
              Filters
              {hasActiveFilters && (
                <Badge variant="primary" size="sm">
                  Active
                </Badge>
              )}
            </button>

            {/* Right Controls */}
            <div className="flex items-center gap-3">
              {/* Format Filter - Desktop */}
              <div className="hidden lg:flex items-center gap-2">
                {eventFormats.map((format) => {
                  const isActive = selectedFormat === format;
                  return (
                    <button
                      key={format}
                      onClick={() => setSelectedFormat(format)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-teal-100 text-teal-800'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {format === 'In-Person' && <MapPin className="w-3.5 h-3.5" />}
                      {format === 'Virtual' && <Monitor className="w-3.5 h-3.5" />}
                      {format === 'Hybrid' && <Users className="w-3.5 h-3.5" />}
                      {format}
                    </button>
                  );
                })}
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                    viewMode === 'list'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <List className="w-4 h-4" />
                  <span className="hidden sm:inline">Grid</span>
                </button>
                <button
                  onClick={() => setViewMode('calendar')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                    viewMode === 'calendar'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span className="hidden sm:inline">Calendar</span>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Filters Panel */}
          {showFilters && (
            <div className="lg:hidden pb-4 border-t border-slate-100 pt-4 space-y-4">
              <div>
                <p className="text-sm font-medium text-slate-700 mb-2">Event Type</p>
                <div className="flex flex-wrap gap-2">
                  {eventTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                        selectedType === type
                          ? 'bg-teal-600 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {type === 'All' ? 'All Events' : type}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700 mb-2">Format</p>
                <div className="flex flex-wrap gap-2">
                  {eventFormats.map((format) => (
                    <button
                      key={format}
                      onClick={() => setSelectedFormat(format)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                        selectedFormat === format
                          ? 'bg-teal-100 text-teal-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {format === 'In-Person' && <MapPin className="w-3.5 h-3.5" />}
                      {format === 'Virtual' && <Monitor className="w-3.5 h-3.5" />}
                      {format === 'Hybrid' && <Users className="w-3.5 h-3.5" />}
                      {format}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2 pb-4">
              <span className="text-sm text-slate-500">Active filters:</span>
              {selectedType !== 'All' && (
                <Badge variant="primary" size="sm" className="flex items-center gap-1">
                  {selectedType}
                  <button
                    onClick={() => setSelectedType('All')}
                    className="ml-1 hover:bg-teal-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {selectedFormat !== 'All Formats' && (
                <Badge variant="secondary" size="sm" className="flex items-center gap-1">
                  {selectedFormat}
                  <button
                    onClick={() => setSelectedFormat('All Formats')}
                    className="ml-1 hover:bg-emerald-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              <button
                onClick={clearFilters}
                className="text-sm text-teal-600 hover:text-teal-700 font-medium"
              >
                Clear all
              </button>
            </div>
          )}
        </Container>
      </section>

      {/* Featured Event Banner */}
      {featuredEvent && !hasActiveFilters && (
        <section className="py-8 bg-gradient-to-r from-amber-50 to-amber-100 border-b border-amber-200">
          <Container>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="accent" size="sm">
                    Featured Event
                  </Badge>
                  <Badge
                    variant={featuredEvent.format === 'Virtual' ? 'warning' : 'success'}
                    size="sm"
                  >
                    {featuredEvent.format}
                  </Badge>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-900">
                  {featuredEvent.title}
                </h2>
                <p className="text-slate-600 mt-1">
                  {featuredEvent.location || 'Online Event'} &middot;{' '}
                  {new Date(featuredEvent.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>
              <Button
                href={`/association/events/${featuredEvent.slug}`}
                variant="amber"
                size="lg"
              >
                Register Now
              </Button>
            </div>
          </Container>
        </section>
      )}

      {/* Events Content */}
      <section className="py-12 md:py-16">
        <Container>
          {viewMode === 'list' ? (
            // Grid View
            <div className="space-y-12">
              {/* Upcoming Events */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-slate-900">
                    {hasActiveFilters ? 'Filtered Events' : 'Upcoming Events'}
                  </h2>
                  <span className="text-sm text-slate-500">
                    {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''}
                  </span>
                </div>

                {filteredEvents.length > 0 ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEvents.map((event) => (
                      <EventCard key={event.slug} event={event} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
                    <div className="text-slate-400 mb-4">
                      <Calendar className="w-12 h-12 mx-auto" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      No Events Found
                    </h3>
                    <p className="text-slate-600 mb-4">
                      No events match your current filters. Try adjusting your selection.
                    </p>
                    <Button onClick={clearFilters} variant="outline" size="sm">
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            // Calendar View
            <div className="space-y-12">
              {Object.keys(groupedEvents).length > 0 ? (
                Object.entries(groupedEvents).map(([monthYear, events]) => (
                  <div key={monthYear}>
                    <h2 className="text-xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-200">
                      {monthYear}
                    </h2>
                    <div className="space-y-3">
                      {events.map((event) => (
                        <EventCard key={event.slug} event={event} variant="compact" />
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
                  <div className="text-slate-400 mb-4">
                    <Calendar className="w-12 h-12 mx-auto" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    No Events Found
                  </h3>
                  <p className="text-slate-600 mb-4">
                    No events match your current filters.
                  </p>
                  <Button onClick={clearFilters} variant="outline" size="sm">
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          )}
        </Container>
      </section>

      {/* Past Events */}
      <section className="py-12 md:py-16 bg-white border-t border-slate-200">
        <Container>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Past Events</h2>
              <p className="text-slate-600 mt-1">
                Missed an event? Access recordings and materials from past sessions.
              </p>
            </div>
            <Button href="/association/events/archive" variant="outline" size="sm">
              View All Past Events
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((event) => (
              <div key={event.slug} className="relative">
                <div className="absolute inset-0 bg-slate-900/5 rounded-2xl z-10 pointer-events-none" />
                <EventCard event={event} />
                <div className="absolute top-4 left-4 z-20">
                  <Badge variant="default" size="sm" className="bg-slate-900 text-white">
                    Past Event
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">Host an Event with Us</h2>
            <p className="text-slate-300 mb-8">
              Interested in hosting a regional workshop or presenting at our conferences? We
              are always looking for expert speakers and collaborative partners.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button href="/contact?subject=speaker" variant="primary" size="lg">
                Become a Speaker
              </Button>
              <Button href="/contact?subject=host" variant="secondary" size="lg">
                Host a Workshop
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
