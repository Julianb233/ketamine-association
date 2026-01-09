import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { EventCard, type Event } from '@/components/events/EventCard';
import { EventRegistrationForm } from '@/components/events/EventRegistrationForm';
import {
  Calendar,
  Clock,
  MapPin,
  Video,
  Award,
  Users,
  Globe,
  ArrowLeft,
  Share2,
  CheckCircle2,
} from 'lucide-react';

interface Speaker {
  name: string;
  title: string;
  bio: string;
  avatar?: string;
}

interface AgendaItem {
  time: string;
  title: string;
  description?: string;
  speaker?: string;
}

interface EventDetail extends Event {
  fullDescription: string;
  agenda: AgendaItem[];
  speakers: Speaker[];
  whatYouWillLearn: string[];
  whoShouldAttend: string[];
  cmeCredits?: number;
}

// Placeholder event data - in production, fetch from database
const getEvent = async (slug: string): Promise<EventDetail | null> => {
  const events: Record<string, EventDetail> = {
    'annual-ketamine-summit-2024': {
      slug: 'annual-ketamine-summit-2024',
      title: '2024 Annual Ketamine Therapy Summit',
      description:
        'The premier gathering of ketamine therapy professionals. Three days of cutting-edge research, hands-on workshops, and networking opportunities.',
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
      fullDescription: `
        Join us for the 2024 Annual Ketamine Therapy Summit, the premier event for ketamine therapy professionals
        in North America. This three-day conference brings together leading researchers, clinicians, and industry
        experts to share the latest advancements in ketamine-assisted therapy.

        Whether you're an experienced practitioner or new to the field, this summit offers invaluable opportunities
        to expand your knowledge, refine your skills, and connect with peers who share your passion for innovative
        mental health treatment.

        The conference features keynote presentations, breakout sessions, hands-on workshops, poster presentations,
        and extensive networking opportunities. CME credits are available for qualified attendees.
      `,
      cmeCredits: 24,
      agenda: [
        {
          time: '8:00 AM - 9:00 AM',
          title: 'Registration & Welcome Breakfast',
          description:
            'Check in, collect your conference materials, and enjoy breakfast while networking with fellow attendees.',
        },
        {
          time: '9:00 AM - 9:30 AM',
          title: 'Opening Keynote: The Future of Ketamine Therapy',
          speaker: 'Dr. Sarah Mitchell',
          description:
            'An inspiring look at where ketamine therapy is headed and what it means for practitioners.',
        },
        {
          time: '9:45 AM - 11:00 AM',
          title: 'Research Updates: Multi-Center Trial Results',
          speaker: 'Dr. James Patterson',
          description:
            'Presentation of the latest findings from the RECOVER-3 multi-center trial.',
        },
        {
          time: '11:15 AM - 12:30 PM',
          title: 'Breakout Sessions (Choose One)',
          description:
            'Track A: IV Protocols | Track B: Integration Therapy | Track C: Practice Management',
        },
        {
          time: '12:30 PM - 2:00 PM',
          title: 'Networking Lunch',
          description: 'Themed table discussions and structured networking activities.',
        },
        {
          time: '2:00 PM - 3:30 PM',
          title: 'Panel Discussion: Navigating Regulatory Challenges',
          description:
            'Expert panel addressing DEA regulations, state licensing, and compliance best practices.',
        },
        {
          time: '3:45 PM - 5:00 PM',
          title: 'Hands-On Workshop: Advanced Monitoring Techniques',
          speaker: 'Dr. Emily Rodriguez',
          description: 'Interactive session on patient safety and monitoring protocols.',
        },
        {
          time: '6:00 PM - 9:00 PM',
          title: 'Welcome Reception',
          description:
            'Evening reception with appetizers, drinks, and entertainment at the Marriott Marquis.',
        },
      ],
      speakers: [
        {
          name: 'Dr. Sarah Mitchell',
          title: 'Chief Research Officer, Ketamine Research Institute',
          bio: 'Dr. Mitchell has led groundbreaking research in ketamine therapy for over 15 years, publishing more than 50 peer-reviewed papers.',
          avatar: '/images/avatars/sarah-mitchell.jpg',
        },
        {
          name: 'Dr. James Patterson',
          title: 'Director of Clinical Trials, Johns Hopkins University',
          bio: 'Dr. Patterson oversees multiple NIH-funded studies on novel treatments for mood disorders.',
          avatar: '/images/avatars/james-patterson.jpg',
        },
        {
          name: 'Dr. Emily Rodriguez',
          title: 'Medical Director, Pacific Ketamine Institute',
          bio: 'A pioneer in developing safety protocols for ketamine clinics, Dr. Rodriguez has trained over 500 practitioners.',
          avatar: '/images/avatars/emily-rodriguez.jpg',
        },
        {
          name: 'Michael Chen',
          title: 'Healthcare Operations Consultant',
          bio: 'Michael has helped dozens of ketamine clinics optimize their operations and scale successfully.',
          avatar: '/images/avatars/michael-chen.jpg',
        },
      ],
      whatYouWillLearn: [
        'Latest research findings and clinical trial results',
        'Advanced IV infusion techniques and safety protocols',
        'Integration therapy best practices for optimal outcomes',
        'Regulatory compliance and DEA requirements',
        'Practice management strategies for growth',
        'Patient selection and screening criteria',
        'Insurance billing and reimbursement strategies',
        'Emerging applications for PTSD, OCD, and chronic pain',
      ],
      whoShouldAttend: [
        'Psychiatrists and psychologists',
        'Anesthesiologists and CRNAs',
        'Nurse practitioners and physician assistants',
        'Mental health counselors and therapists',
        'Clinic owners and administrators',
        'Researchers in psychedelic medicine',
        'Healthcare policy professionals',
      ],
    },
    'iv-infusion-masterclass': {
      slug: 'iv-infusion-masterclass',
      title: 'IV Infusion Technique Masterclass',
      description:
        'An intensive hands-on workshop covering advanced IV ketamine infusion techniques, safety protocols, and patient monitoring best practices.',
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
      fullDescription: `
        This intensive one-day workshop provides hands-on training in advanced IV ketamine infusion techniques.
        Participants will gain practical experience with dosing protocols, patient monitoring, and emergency
        response procedures.

        Limited to 30 participants to ensure personalized attention and maximum learning opportunities.
        All participants will receive a certificate of completion.
      `,
      cmeCredits: 6,
      agenda: [
        {
          time: '10:00 AM - 11:30 AM',
          title: 'Pharmacology Review & Dosing Protocols',
          description: 'Comprehensive review of ketamine pharmacology and evidence-based dosing.',
        },
        {
          time: '11:30 AM - 12:30 PM',
          title: 'Patient Screening & Selection',
          description: 'Best practices for patient assessment and contraindications.',
        },
        {
          time: '12:30 PM - 1:30 PM',
          title: 'Lunch Break',
        },
        {
          time: '1:30 PM - 3:00 PM',
          title: 'Hands-On Practice Session',
          description: 'Supervised practice with simulation equipment.',
        },
        {
          time: '3:00 PM - 4:00 PM',
          title: 'Emergency Response & Q&A',
          description: 'Emergency protocols and open discussion.',
        },
      ],
      speakers: [
        {
          name: 'Dr. Emily Rodriguez',
          title: 'Medical Director, Pacific Ketamine Institute',
          bio: 'A pioneer in developing safety protocols for ketamine clinics.',
          avatar: '/images/avatars/emily-rodriguez.jpg',
        },
      ],
      whatYouWillLearn: [
        'Advanced IV infusion techniques',
        'Evidence-based dosing protocols',
        'Patient monitoring best practices',
        'Emergency response procedures',
        'Documentation requirements',
      ],
      whoShouldAttend: [
        'Physicians',
        'Nurse practitioners',
        'Physician assistants',
        'Registered nurses',
        'Anesthesiologists',
      ],
    },
    'mental-health-integration-webinar': {
      slug: 'mental-health-integration-webinar',
      title: 'Mental Health Integration Strategies',
      description:
        'Learn evidence-based approaches to integrating mental health support with ketamine therapy for optimal patient outcomes.',
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
      fullDescription: `
        This free webinar for members explores the critical role of mental health integration in ketamine therapy.
        Learn how to create comprehensive treatment plans that maximize therapeutic outcomes.

        The session includes practical strategies for collaboration between medical providers and mental health
        professionals, as well as case studies demonstrating successful integration approaches.
      `,
      cmeCredits: 1.5,
      agenda: [
        {
          time: '2:00 PM - 2:15 PM',
          title: 'Introduction & Overview',
        },
        {
          time: '2:15 PM - 2:45 PM',
          title: 'Integration Models & Best Practices',
        },
        {
          time: '2:45 PM - 3:15 PM',
          title: 'Case Studies & Discussion',
        },
        {
          time: '3:15 PM - 3:30 PM',
          title: 'Q&A Session',
        },
      ],
      speakers: [
        {
          name: 'Dr. Amanda Foster',
          title: 'Clinical Psychologist, Integration Therapy Center',
          bio: 'Specializes in psychedelic-assisted therapy integration protocols.',
          avatar: '/images/avatars/amanda-foster.jpg',
        },
      ],
      whatYouWillLearn: [
        'Evidence-based integration strategies',
        'Collaboration models for care teams',
        'Assessment tools for treatment planning',
        'Documentation best practices',
      ],
      whoShouldAttend: [
        'Mental health professionals',
        'Ketamine providers',
        'Therapists and counselors',
        'Care coordinators',
      ],
    },
  };

  return events[slug] || null;
};

// Related events
const relatedEvents: Event[] = [
  {
    slug: 'iv-infusion-masterclass',
    title: 'IV Infusion Technique Masterclass',
    description:
      'An intensive hands-on workshop covering advanced IV ketamine infusion techniques.',
    eventType: 'Workshop',
    format: 'In-Person',
    image: '/images/events/iv-workshop.jpg',
    date: '2024-02-22',
    time: '10:00 AM - 4:00 PM EST',
    location: 'Boston Medical Training Center, MA',
    price: {
      member: 295,
      nonMember: 395,
    },
    spotsLeft: 12,
  },
  {
    slug: 'mental-health-integration-webinar',
    title: 'Mental Health Integration Strategies',
    description:
      'Learn evidence-based approaches to integrating mental health support with ketamine therapy.',
    eventType: 'Webinar',
    format: 'Virtual',
    image: '/images/events/webinar-mental-health.jpg',
    date: '2024-02-08',
    time: '2:00 PM - 3:30 PM EST',
    price: {
      member: 0,
      nonMember: 49,
    },
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEvent(slug);

  if (!event) {
    return {
      title: 'Event Not Found',
    };
  }

  return {
    title: `${event.title} | Ketamine Association Events`,
    description: event.description,
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await getEvent(slug);

  if (!event) {
    return (
      <main className="min-h-screen bg-slate-50 py-16">
        <Container>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Event Not Found</h1>
            <p className="text-slate-600 mb-8">
              The event you are looking for does not exist.
            </p>
            <Button href="/association/events" variant="primary">
              Back to Events
            </Button>
          </div>
        </Container>
      </main>
    );
  }

  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const isVirtual = event.format === 'Virtual';
  const isHybrid = event.format === 'Hybrid';
  const isFreeForMembers = event.price.member === 0;

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent" />
        </div>

        <Container className="relative py-16 md:py-24">
          <Link
            href="/association/events"
            className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 font-medium mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Events
          </Link>

          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="primary" size="md">
              {event.eventType}
            </Badge>
            <Badge
              variant={
                isVirtual ? 'warning' : isHybrid ? 'default' : 'success'
              }
              size="md"
            >
              {event.format}
            </Badge>
            {event.cmeCredits && (
              <Badge variant="accent" size="md">
                {event.cmeCredits} CME Credits
              </Badge>
            )}
            {isFreeForMembers && (
              <Badge variant="success" size="md">
                Free for Members
              </Badge>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 max-w-4xl">
            {event.title}
          </h1>

          <p className="text-lg text-slate-300 max-w-3xl mb-8">{event.description}</p>

          <div className="flex flex-wrap gap-6 text-slate-300">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-teal-400" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-teal-400" />
              <span>{event.time}</span>
            </div>
            {event.timezone && (
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-teal-400" />
                <span>{event.timezone.replace('_', ' ')}</span>
              </div>
            )}
            {event.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-teal-400" />
                <span>{event.location}</span>
              </div>
            )}
            {(isVirtual || isHybrid) && event.virtualUrl && (
              <div className="flex items-center gap-2">
                <Video className="w-5 h-5 text-teal-400" />
                <span>Virtual Access Available</span>
              </div>
            )}
          </div>

          {event.spotsLeft !== undefined && event.spotsLeft <= 50 && (
            <div className="mt-6 inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 px-4 py-2 rounded-lg">
              <Users className="w-5 h-5" />
              <span className="font-semibold">
                Only {event.spotsLeft} spots remaining - Register soon!
              </span>
            </div>
          )}
        </Container>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <Container>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Event Details */}
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">About This Event</h2>
                <div className="prose prose-lg prose-slate max-w-none">
                  {event.fullDescription.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph.trim()}</p>
                  ))}
                </div>
              </div>

              {/* What You Will Learn */}
              {event.whatYouWillLearn.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    What You Will Learn
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {event.whatYouWillLearn.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Agenda */}
              {event.agenda.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Event Schedule</h2>
                  <div className="space-y-4">
                    {event.agenda.map((item, index) => (
                      <Card key={index} padding="md" className="border-l-4 border-l-teal-500">
                        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                          <div className="sm:w-40 flex-shrink-0">
                            <span className="text-sm font-semibold text-teal-600 whitespace-nowrap">
                              {item.time}
                            </span>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                            {item.speaker && (
                              <p className="text-sm text-teal-600 font-medium mb-2">
                                Presenter: {item.speaker}
                              </p>
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
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Featured Speakers</h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {event.speakers.map((speaker, index) => (
                      <Card key={index} padding="md">
                        <div className="flex items-start gap-4">
                          <Avatar src={speaker.avatar} name={speaker.name} size="xl" />
                          <div>
                            <h3 className="font-bold text-slate-900">{speaker.name}</h3>
                            <p className="text-sm text-teal-600 font-medium mb-2">
                              {speaker.title}
                            </p>
                            <p className="text-sm text-slate-600">{speaker.bio}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Who Should Attend */}
              {event.whoShouldAttend.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Who Should Attend</h2>
                  <div className="flex flex-wrap gap-2">
                    {event.whoShouldAttend.map((audience, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-medium"
                      >
                        {audience}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Registration Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Registration Form */}
                <EventRegistrationForm
                  eventId={event.slug}
                  eventTitle={event.title}
                  eventDate={formattedDate}
                  memberPrice={event.price.member}
                  nonMemberPrice={event.price.nonMember}
                  spotsLeft={event.spotsLeft}
                  isFreeEvent={event.price.member === 0 && event.price.nonMember === 0}
                />

                {/* Event Details Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Event Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-slate-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-slate-500">Date</p>
                        <p className="font-medium text-slate-900">{formattedDate}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-slate-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-slate-500">Time</p>
                        <p className="font-medium text-slate-900">{event.time}</p>
                      </div>
                    </div>
                    {event.location && (
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-slate-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-slate-500">Location</p>
                          <p className="font-medium text-slate-900">{event.location}</p>
                        </div>
                      </div>
                    )}
                    {(isVirtual || isHybrid) && (
                      <div className="flex items-start gap-3">
                        <Video className="w-5 h-5 text-slate-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-slate-500">Virtual Access</p>
                          <p className="font-medium text-slate-900">
                            Link provided after registration
                          </p>
                        </div>
                      </div>
                    )}
                    {event.cmeCredits && (
                      <div className="flex items-start gap-3">
                        <Award className="w-5 h-5 text-slate-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-slate-500">CME Credits</p>
                          <p className="font-medium text-slate-900">
                            {event.cmeCredits} credits available
                          </p>
                        </div>
                      </div>
                    )}
                    {event.capacity && (
                      <div className="flex items-start gap-3">
                        <Users className="w-5 h-5 text-slate-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-slate-500">Capacity</p>
                          <p className="font-medium text-slate-900">
                            {event.capacity} attendees
                            {event.spotsLeft && ` (${event.spotsLeft} spots left)`}
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Share Card */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Share2 className="w-4 h-4 text-slate-500" />
                      <p className="text-sm font-medium text-slate-700">Share this event</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm text-slate-600">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                        </svg>
                        Twitter
                      </button>
                      <button className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm text-slate-600">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                        LinkedIn
                      </button>
                      <button className="py-2 px-3 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center justify-center text-slate-600">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Related Events */}
      <section className="py-12 md:py-16 bg-white border-t border-slate-200">
        <Container>
          <h2 className="text-2xl font-bold text-slate-900 mb-8">
            You Might Also Be Interested In
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedEvents
              .filter((e) => e.slug !== event.slug)
              .map((relatedEvent) => (
                <EventCard key={relatedEvent.slug} event={relatedEvent} />
              ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
