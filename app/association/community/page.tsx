'use client';

import { motion } from 'framer-motion';
import {
  Users,
  MessageCircle,
  UserPlus,
  GraduationCap,
  Stethoscope,
  MapPin,
  Calendar,
  ArrowRight,
  CheckCircle,
  Quote,
  Globe,
  Award,
  TrendingUp,
  Heart,
  Sparkles,
  Clock,
  Video,
  Building,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const communityStats = [
  { value: '500+', label: 'Active Members', icon: Users },
  { value: '50', label: 'States Represented', icon: MapPin },
  { value: '25+', label: 'Regional Chapters', icon: Building },
  { value: '1,200+', label: 'Monthly Discussions', icon: MessageCircle },
];

const communityFeatures = [
  {
    title: 'Discussion Forums',
    description: 'Engage in clinical discussions, share case insights, and exchange best practices with peers in our moderated forums covering all aspects of ketamine therapy.',
    icon: MessageCircle,
    highlights: ['Clinical protocols', 'Treatment outcomes', 'Practice management', 'Regulatory updates'],
    color: 'teal',
  },
  {
    title: 'Peer Networking',
    description: 'Connect with practitioners across specialties and geographic regions. Build lasting professional relationships through our networking events and directory.',
    icon: UserPlus,
    highlights: ['Specialty matching', 'Direct messaging', 'Professional profiles', 'Referral network'],
    color: 'emerald',
  },
  {
    title: 'Mentorship Program',
    description: 'Whether you are new to ketamine therapy or a seasoned expert, our mentorship program pairs practitioners for guidance, support, and professional growth.',
    icon: GraduationCap,
    highlights: ['One-on-one pairing', 'Quarterly check-ins', 'Career guidance', 'Skill development'],
    color: 'amber',
  },
  {
    title: 'Case Consultations',
    description: 'Access peer consultations for complex cases. Our structured consultation process connects you with experienced practitioners for clinical guidance.',
    icon: Stethoscope,
    highlights: ['Expert panels', 'Anonymous submissions', 'Rapid response', 'Multidisciplinary input'],
    color: 'teal',
  },
  {
    title: 'Regional Chapters',
    description: 'Join your local chapter for in-person meetups, regional conferences, and community building with practitioners in your area.',
    icon: Globe,
    highlights: ['Local meetups', 'Regional events', 'State advocacy', 'Community service'],
    color: 'emerald',
  },
  {
    title: 'Exclusive Resources',
    description: 'Members gain access to shared protocols, research libraries, practice templates, and educational materials developed by the community.',
    icon: Sparkles,
    highlights: ['Protocol library', 'Research database', 'Templates & forms', 'CME opportunities'],
    color: 'amber',
  },
];

const upcomingEvents = [
  {
    title: 'Virtual Grand Rounds: Complex Cases in Ketamine Therapy',
    date: 'January 18, 2025',
    time: '12:00 PM EST',
    type: 'Webinar',
    attendees: 156,
    featured: true,
  },
  {
    title: 'Northeast Chapter Monthly Meetup',
    date: 'January 22, 2025',
    time: '6:30 PM EST',
    type: 'In-Person',
    location: 'Boston, MA',
    attendees: 42,
    featured: false,
  },
  {
    title: 'New Member Orientation & Welcome Session',
    date: 'January 25, 2025',
    time: '1:00 PM EST',
    type: 'Virtual',
    attendees: 28,
    featured: false,
  },
  {
    title: 'Practice Building Workshop: Marketing Your Ketamine Practice',
    date: 'February 1, 2025',
    time: '11:00 AM EST',
    type: 'Workshop',
    attendees: 89,
    featured: true,
  },
];

const memberSpotlights = [
  {
    name: 'Dr. Amanda Foster',
    role: 'Psychiatrist',
    location: 'Portland, OR',
    initials: 'AF',
    quote: 'The mentorship program connected me with an incredible mentor who helped me navigate my first year of practice. The community support has been invaluable.',
    contribution: 'Mentorship Program Lead',
    memberSince: '2021',
  },
  {
    name: 'Dr. Marcus Thompson',
    role: 'Pain Medicine Specialist',
    location: 'Chicago, IL',
    initials: 'MT',
    quote: 'Being part of the case consultation panels has been one of the most rewarding professional experiences. We are all learning and growing together.',
    contribution: 'Case Consultation Panelist',
    memberSince: '2020',
  },
  {
    name: 'Dr. Elena Rodriguez',
    role: 'Anesthesiologist',
    location: 'Miami, FL',
    initials: 'ER',
    quote: 'I started the Southeast Chapter and watching it grow from 12 members to over 80 has been amazing. This community is truly special.',
    contribution: 'Southeast Chapter Founder',
    memberSince: '2019',
  },
];

export default function CommunityPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-700 via-teal-600 to-emerald-600 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <Container className="relative py-20 lg:py-28">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <Badge
                variant="secondary"
                size="lg"
                className="mb-6 bg-white/20 text-white border-0"
              >
                Practitioner Community
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Join Our Thriving Community
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-teal-100 mb-10 max-w-2xl mx-auto"
            >
              Connect with over 500 ketamine therapy practitioners across the nation.
              Share knowledge, seek guidance, and grow together in a supportive professional network.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                href="/association/pricing"
                size="lg"
                className="bg-white text-teal-700 hover:bg-teal-50"
              >
                Join the Community
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button
                href="#features"
                size="lg"
                className="bg-teal-500/30 text-white border border-teal-400/50 hover:bg-teal-500/50"
              >
                Explore Features
              </Button>
            </motion.div>
          </motion.div>
        </Container>

        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="w-full h-16 sm:h-24"
          >
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Community Stats Section */}
      <section className="py-16 bg-white">
        <Container>
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {communityStats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-slate-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Community Features Section */}
      <section id="features" className="py-20 bg-slate-50">
        <Container>
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Badge variant="primary" className="mb-4">
              Community Features
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Everything You Need to Connect & Grow
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Our community platform provides comprehensive tools for networking,
              learning, and professional development.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {communityFeatures.map((feature) => {
              const colorClasses = {
                teal: {
                  bg: 'bg-teal-100',
                  text: 'text-teal-600',
                  badge: 'bg-teal-50 text-teal-700',
                },
                emerald: {
                  bg: 'bg-emerald-100',
                  text: 'text-emerald-600',
                  badge: 'bg-emerald-50 text-emerald-700',
                },
                amber: {
                  bg: 'bg-amber-100',
                  text: 'text-amber-600',
                  badge: 'bg-amber-50 text-amber-700',
                },
              };
              const colors = colorClasses[feature.color as keyof typeof colorClasses];

              return (
                <motion.div key={feature.title} variants={fadeInUp}>
                  <Card className="h-full p-8" hover>
                    <div
                      className={`w-14 h-14 rounded-xl ${colors.bg} ${colors.text} flex items-center justify-center mb-6`}
                    >
                      <feature.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 mb-6">{feature.description}</p>
                    <div className="space-y-2">
                      {feature.highlights.map((highlight) => (
                        <div
                          key={highlight}
                          className="flex items-center gap-2 text-sm text-slate-600"
                        >
                          <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-20 bg-white">
        <Container>
          <motion.div
            className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div>
              <Badge variant="secondary" className="mb-4">
                Community Events
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                Upcoming Community Events
              </h2>
              <p className="text-xl text-slate-600 max-w-xl">
                Join virtual and in-person events to connect with peers and
                continue your education.
              </p>
            </div>
            <Button href="/association/events" variant="secondary">
              View All Events
              <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {upcomingEvents.map((event, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card
                  className={`p-6 ${event.featured ? 'border-2 border-teal-200 bg-teal-50/30' : ''}`}
                  hover
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge
                          variant={event.type === 'Webinar' || event.type === 'Virtual' ? 'primary' : 'secondary'}
                          size="sm"
                        >
                          {event.type === 'Webinar' || event.type === 'Virtual' ? (
                            <Video className="w-3 h-3 mr-1" />
                          ) : (
                            <MapPin className="w-3 h-3 mr-1" />
                          )}
                          {event.type}
                        </Badge>
                        {event.featured && (
                          <Badge variant="accent" size="sm">
                            Featured
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900">
                        {event.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-teal-500" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-teal-500" />
                      <span>{event.time}</span>
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-teal-500" />
                        <span>{event.location}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-teal-500" />
                      <span>{event.attendees} registered</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Member Spotlight Section */}
      <section className="py-20 bg-slate-50">
        <Container>
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Badge variant="primary" className="mb-4">
              Member Spotlight
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Meet Our Community Leaders
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Our members are making a difference every day. Here are some of the
              outstanding practitioners shaping our community.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {memberSpotlights.map((member) => (
              <motion.div key={member.name} variants={fadeInUp}>
                <Card className="p-8 relative h-full">
                  <Quote className="w-10 h-10 text-teal-100 absolute top-6 right-6" />
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center text-white font-bold text-lg">
                      {member.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{member.name}</p>
                      <p className="text-slate-600 text-sm">{member.role}</p>
                      <p className="text-slate-500 text-sm flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {member.location}
                      </p>
                    </div>
                  </div>
                  <blockquote className="text-slate-700 mb-6 italic">
                    &quot;{member.quote}&quot;
                  </blockquote>
                  <div className="flex items-center justify-between">
                    <Badge variant="primary" size="sm" icon={Award}>
                      {member.contribution}
                    </Badge>
                  </div>
                  <p className="text-slate-500 text-xs mt-4">
                    Member since {member.memberSince}
                  </p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Why Join Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Badge variant="secondary" className="mb-4">
                Why Join
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
                Stronger Together
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Ketamine therapy is an evolving field. By joining our community,
                you gain access to collective wisdom, peer support, and resources
                that help you provide better care to your patients.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  'Learn from peers who have faced similar challenges',
                  'Stay updated on the latest research and protocols',
                  'Build referral relationships across specialties',
                  'Contribute to advancing the field of ketamine therapy',
                  'Access mentorship from experienced practitioners',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-teal-600" />
                    </div>
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
              <Button href="/association/membership" variant="primary">
                Learn About Membership
                <ArrowRight className="w-5 h-5" />
              </Button>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {[
                { icon: Heart, title: 'Supportive', desc: 'A welcoming community for all experience levels' },
                { icon: TrendingUp, title: 'Growing', desc: 'Rapidly expanding network of practitioners' },
                { icon: Award, title: 'Recognized', desc: 'Industry-leading professional standards' },
                { icon: Globe, title: 'Nationwide', desc: 'Chapters and members across all 50 states' },
              ].map((item) => (
                <motion.div key={item.title} variants={fadeInUp}>
                  <Card className="p-6 text-center" hover>
                    <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center mx-auto mb-4">
                      <item.icon className="w-6 h-6 text-teal-600" />
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-slate-600">{item.desc}</p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-teal-700 via-teal-600 to-emerald-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <Container className="relative">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
            >
              Ready to Join Our Community?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-teal-100 mb-10 max-w-2xl mx-auto"
            >
              Connect with 500+ ketamine therapy practitioners who are committed
              to advancing the field and supporting each other.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                href="/association/pricing"
                size="lg"
                className="bg-white text-teal-700 hover:bg-teal-50 flex items-center justify-center gap-2"
              >
                <Users className="w-5 h-5" />
                Become a Member
              </Button>
              <Button
                href="/contact"
                size="lg"
                className="bg-teal-500/30 text-white border border-teal-400/50 hover:bg-teal-500/50 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Have Questions?
              </Button>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="mt-12 flex flex-wrap items-center justify-center gap-8 text-teal-200"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Welcoming to all experience levels</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Active moderation & support</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Private & confidential</span>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </main>
  );
}
