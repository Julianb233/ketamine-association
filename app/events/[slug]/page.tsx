'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Video,
  ArrowLeft,
  Share2,
  CheckCircle,
  Ticket,
  Mail,
  Phone
} from 'lucide-react';

// Placeholder event data - in production this would come from an API/database
const eventData: Record<string, {
  slug: string;
  title: string;
  description: string;
  fullDescription: string;
  eventType: string;
  format: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  timezone: string;
  location?: string;
  address?: string;
  virtualUrl?: string;
  price: number;
  memberPrice: number;
  earlyBirdPrice?: number;
  earlyBirdDeadline?: string;
  capacity: number;
  registeredCount: number;
  speakers: Array<{
    name: string;
    role: string;
    bio: string;
    avatar: string;
  }>;
  agenda: Array<{
    time: string;
    title: string;
    description?: string;
    speaker?: string;
  }>;
  includes: string[];
  requirements?: string[];
  cmeCredits?: number;
}> = {
  'ketamine-summit-2026': {
    slug: 'ketamine-summit-2026',
    title: 'Ketamine Therapy Summit 2026',
    description: 'The premier annual gathering for ketamine therapy professionals.',
    fullDescription: `
Join us for the largest gathering of ketamine therapy professionals in North America. The Ketamine Therapy Summit 2026 brings together clinicians, researchers, and industry leaders for three days of cutting-edge presentations, hands-on workshops, and unparalleled networking opportunities.

This year's summit features over 30 sessions covering the latest research findings, clinical best practices, regulatory updates, and business strategies for ketamine therapy practices. Whether you're just starting your ketamine therapy journey or looking to expand your expertise, you'll find valuable insights and connections at this event.

**Why Attend?**

The Summit is designed to help you stay at the forefront of ketamine therapy while building meaningful professional relationships. You'll leave with actionable strategies, new clinical skills, and a network of peers who share your commitment to advancing ketamine therapy.
    `,
    eventType: 'CONFERENCE',
    format: 'HYBRID',
    startDate: '2026-03-15',
    endDate: '2026-03-17',
    startTime: '8:00 AM',
    endTime: '6:00 PM',
    timezone: 'CST',
    location: 'Austin Convention Center',
    address: '500 E Cesar Chavez St, Austin, TX 78701',
    virtualUrl: 'https://events.ketamine.org/summit-2026',
    price: 79900,
    memberPrice: 59900,
    earlyBirdPrice: 49900,
    earlyBirdDeadline: '2026-02-01',
    capacity: 500,
    registeredCount: 347,
    speakers: [
      {
        name: 'Dr. Sarah Mitchell',
        role: 'Chief Medical Editor, Ketamine Association',
        bio: 'Board-certified psychiatrist with over 15 years of experience in mood disorders and psychedelic medicine.',
        avatar: '/speakers/sarah-mitchell.jpg',
      },
      {
        name: 'Dr. James Chen',
        role: 'Director of Clinical Research, Stanford University',
        bio: 'Leading researcher in ketamine mechanisms of action and novel delivery methods.',
        avatar: '/speakers/james-chen.jpg',
      },
      {
        name: 'Dr. Emily Watson',
        role: 'Pain Medicine Specialist, Seattle Pain Center',
        bio: 'Pioneer in ketamine protocols for chronic pain conditions including CRPS and fibromyalgia.',
        avatar: '/speakers/emily-watson.jpg',
      },
      {
        name: 'Dr. Michael Torres',
        role: 'Medical Director, Denver Ketamine Institute',
        bio: 'Anesthesiologist specializing in ketamine infusion therapy with over 5,000 treatments administered.',
        avatar: '/speakers/michael-torres.jpg',
      },
    ],
    agenda: [
      { time: '8:00 AM', title: 'Registration & Breakfast', description: 'Check in, grab breakfast, and network with fellow attendees.' },
      { time: '9:00 AM', title: 'Opening Keynote: The Future of Ketamine Therapy', speaker: 'Dr. Sarah Mitchell', description: 'An overview of where ketamine therapy stands today and where it\'s headed.' },
      { time: '10:30 AM', title: 'Clinical Track: IV Ketamine Protocols', speaker: 'Dr. Michael Torres', description: 'Evidence-based protocols for IV ketamine administration.' },
      { time: '12:00 PM', title: 'Networking Lunch', description: 'Enjoy lunch while connecting with speakers and attendees.' },
      { time: '1:30 PM', title: 'Research Track: Latest Clinical Trial Results', speaker: 'Dr. James Chen', description: 'Review of the most significant recent research findings.' },
      { time: '3:00 PM', title: 'Workshop: Integration Therapy Techniques', speaker: 'Dr. Emily Watson', description: 'Hands-on session on supporting patients through integration.' },
      { time: '5:00 PM', title: 'Evening Reception', description: 'Cocktails and networking at the rooftop venue.' },
    ],
    includes: [
      'All keynote and breakout sessions',
      'Hands-on workshop participation',
      'Breakfast and lunch for all three days',
      'Welcome reception and networking events',
      'Digital access to all presentation materials',
      'CME credit documentation',
      'Certificate of completion',
      'Virtual attendee platform access',
    ],
    requirements: [
      'MD, DO, NP, PA, or equivalent medical credential',
      'Active medical license in good standing',
      'Current DEA registration (for in-person clinical workshops)',
    ],
    cmeCredits: 24,
  },
};

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

function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(dateString));
}

function formatDateRange(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (startDate === endDate) {
    return formatDate(startDate);
  }

  return `${new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric' }).format(start)} - ${new Intl.DateTimeFormat('en-US', { day: 'numeric', year: 'numeric' }).format(end)}`;
}

function formatPrice(cents: number): string {
  if (cents === 0) return 'Free';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(cents / 100);
}

export default function EventDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [registrationType, setRegistrationType] = useState<'member' | 'non-member'>('member');

  // Get event data (fallback for demo)
  const event = eventData[slug] || eventData['ketamine-summit-2026'];

  const spotsRemaining = event.capacity - event.registeredCount;
  const isAlmostFull = spotsRemaining < 50;
  const isSoldOut = spotsRemaining <= 0;

  const now = new Date();
  const earlyBirdActive = event.earlyBirdDeadline && new Date(event.earlyBirdDeadline) > now;

  const currentPrice = registrationType === 'member'
    ? (earlyBirdActive && event.earlyBirdPrice ? event.earlyBirdPrice : event.memberPrice)
    : event.price;

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-700 via-teal-600 to-emerald-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <Container className="relative py-12 lg:py-20">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <Link href="/events" className="text-teal-200 hover:text-white transition-colors flex items-center gap-1 text-sm">
              <ArrowLeft className="w-4 h-4" />
              Back to Events
            </Link>
          </nav>

          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge variant="default" className="bg-white/20 text-white border-0">
                {eventTypeLabels[event.eventType]}
              </Badge>
              <Badge variant={formatBadgeVariants[event.format]}>
                {eventFormatLabels[event.format]}
              </Badge>
              {event.cmeCredits && (
                <Badge variant="accent">
                  {event.cmeCredits} CME Credits
                </Badge>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {event.title}
            </h1>

            <p className="text-xl text-teal-100 mb-8">
              {event.description}
            </p>

            {/* Quick Info */}
            <div className="flex flex-wrap gap-6 text-teal-200">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{formatDateRange(event.startDate, event.endDate)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{event.startTime} - {event.endTime} {event.timezone}</span>
              </div>
              {event.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{event.location}</span>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <Container>
          <div className="grid lg:grid-cols-[1fr_380px] gap-12">
            {/* Left Column - Details */}
            <div className="space-y-12">
              {/* Description */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">About This Event</h2>
                <div className="prose prose-slate max-w-none prose-p:text-slate-600 prose-strong:text-slate-900">
                  {event.fullDescription.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* What's Included */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">What&apos;s Included</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {event.includes.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg border border-slate-200">
                      <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Agenda */}
              {event.agenda.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Agenda</h2>
                  <div className="space-y-4">
                    {event.agenda.map((item, index) => (
                      <Card key={index} className="p-6" variant="bordered">
                        <div className="flex gap-4">
                          <div className="w-24 flex-shrink-0">
                            <span className="text-sm font-semibold text-teal-600">{item.time}</span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                            {item.speaker && (
                              <p className="text-sm text-teal-600 mb-2">{item.speaker}</p>
                            )}
                            {item.description && (
                              <p className="text-slate-600 text-sm">{item.description}</p>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Speakers */}
              {event.speakers.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Speakers</h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {event.speakers.map((speaker, index) => (
                      <Card key={index} className="p-6">
                        <div className="flex gap-4">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold text-lg">
                              {speaker.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-900">{speaker.name}</h3>
                            <p className="text-sm text-teal-600 mb-2">{speaker.role}</p>
                            <p className="text-sm text-slate-600 line-clamp-3">{speaker.bio}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Requirements */}
              {event.requirements && event.requirements.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Requirements</h2>
                  <Card className="p-6" variant="bordered">
                    <ul className="space-y-3">
                      {event.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>
              )}
            </div>

            {/* Right Column - Registration Sidebar */}
            <div>
              <div className="sticky top-24 space-y-6">
                {/* Registration Card */}
                <Card className="p-6 shadow-xl">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Register Now</h3>

                  {/* Capacity Warning */}
                  {isAlmostFull && !isSoldOut && (
                    <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <p className="text-amber-800 text-sm font-medium flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Only {spotsRemaining} spots remaining!
                      </p>
                    </div>
                  )}

                  {isSoldOut && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-800 text-sm font-medium">
                        This event is sold out. Join the waitlist below.
                      </p>
                    </div>
                  )}

                  {/* Early Bird Badge */}
                  {earlyBirdActive && (
                    <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                      <p className="text-emerald-800 text-sm font-medium">
                        Early bird pricing ends {formatDate(event.earlyBirdDeadline!)}
                      </p>
                    </div>
                  )}

                  {/* Registration Type Toggle */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Registration Type
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setRegistrationType('member')}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          registrationType === 'member'
                            ? 'border-teal-500 bg-teal-50 text-teal-700'
                            : 'border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        <div className="font-semibold">Member</div>
                        <div className="text-sm">{formatPrice(earlyBirdActive && event.earlyBirdPrice ? event.earlyBirdPrice : event.memberPrice)}</div>
                      </button>
                      <button
                        onClick={() => setRegistrationType('non-member')}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          registrationType === 'non-member'
                            ? 'border-teal-500 bg-teal-50 text-teal-700'
                            : 'border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        <div className="font-semibold">Non-Member</div>
                        <div className="text-sm">{formatPrice(event.price)}</div>
                      </button>
                    </div>
                  </div>

                  {/* Price Display */}
                  <div className="mb-6 p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-600">Registration</span>
                      <span className="font-semibold text-slate-900">{formatPrice(currentPrice)}</span>
                    </div>
                    {registrationType === 'non-member' && (
                      <p className="text-sm text-teal-600">
                        Save {formatPrice(event.price - event.memberPrice)} by becoming a member!
                      </p>
                    )}
                  </div>

                  {/* Register Button */}
                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    disabled={isSoldOut}
                  >
                    {isSoldOut ? 'Join Waitlist' : 'Register Now'}
                  </Button>

                  {!isSoldOut && (
                    <p className="text-center text-sm text-slate-500 mt-3">
                      {spotsRemaining} of {event.capacity} spots available
                    </p>
                  )}
                </Card>

                {/* Event Details Card */}
                <Card className="p-6">
                  <h3 className="font-semibold text-slate-900 mb-4">Event Details</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-slate-900">Date</p>
                        <p className="text-slate-600 text-sm">{formatDateRange(event.startDate, event.endDate)}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-slate-900">Time</p>
                        <p className="text-slate-600 text-sm">{event.startTime} - {event.endTime} {event.timezone}</p>
                      </div>
                    </div>
                    {event.location && (
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-slate-900">Location</p>
                          <p className="text-slate-600 text-sm">{event.location}</p>
                          {event.address && (
                            <p className="text-slate-500 text-sm">{event.address}</p>
                          )}
                        </div>
                      </div>
                    )}
                    {event.virtualUrl && (
                      <div className="flex items-start gap-3">
                        <Video className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-slate-900">Virtual Access</p>
                          <p className="text-slate-600 text-sm">Link provided upon registration</p>
                        </div>
                      </div>
                    )}
                    {event.cmeCredits && (
                      <div className="flex items-start gap-3">
                        <Ticket className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-slate-900">CME Credits</p>
                          <p className="text-slate-600 text-sm">{event.cmeCredits} credits available</p>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>

                {/* Share/Contact */}
                <Card className="p-6">
                  <h3 className="font-semibold text-slate-900 mb-4">Questions?</h3>
                  <div className="space-y-3">
                    <a
                      href="mailto:events@ketamine.org"
                      className="flex items-center gap-3 text-slate-600 hover:text-teal-600 transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                      <span>events@ketamine.org</span>
                    </a>
                    <a
                      href="tel:+18005551234"
                      className="flex items-center gap-3 text-slate-600 hover:text-teal-600 transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                      <span>(800) 555-1234</span>
                    </a>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <Button variant="outline" size="sm" fullWidth>
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Event
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Related Events CTA */}
      <section className="py-16 bg-white">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Explore More Events
            </h2>
            <p className="text-slate-600 mb-6">
              Discover workshops, webinars, and networking opportunities designed for
              ketamine therapy professionals at every stage of their career.
            </p>
            <Button variant="primary" size="lg" href="/events">
              View All Events
            </Button>
          </div>
        </Container>
      </section>
    </main>
  );
}
