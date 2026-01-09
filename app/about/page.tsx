'use client';

import {
  Heart,
  Shield,
  Users,
  Award,
  Target,
  Lightbulb,
  BookOpen,
  Handshake,
  ArrowRight,
  CheckCircle,
  Calendar
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

const stats = [
  { value: '500+', label: 'Verified Providers', icon: Users },
  { value: '50,000+', label: 'Patients Helped', icon: Heart },
  { value: '12', label: 'Years of Excellence', icon: Calendar },
  { value: '48', label: 'States Covered', icon: Shield },
];

const values = [
  {
    title: 'Patient Safety First',
    description: 'We rigorously vet every provider to ensure patients receive safe, evidence-based care from qualified professionals.',
    icon: Shield,
    color: 'teal',
  },
  {
    title: 'Scientific Excellence',
    description: 'Our standards are grounded in the latest research, ensuring treatments reflect current best practices in ketamine therapy.',
    icon: Lightbulb,
    color: 'emerald',
  },
  {
    title: 'Accessibility',
    description: 'We work to make ketamine therapy accessible to those who need it, regardless of location or background.',
    icon: Heart,
    color: 'amber',
  },
  {
    title: 'Education',
    description: 'We provide comprehensive education for both practitioners and patients to ensure informed treatment decisions.',
    icon: BookOpen,
    color: 'teal',
  },
  {
    title: 'Community',
    description: 'We foster a supportive community of practitioners dedicated to advancing the field of ketamine therapy.',
    icon: Users,
    color: 'emerald',
  },
  {
    title: 'Integrity',
    description: 'We maintain the highest ethical standards in all our operations, partnerships, and member relationships.',
    icon: Handshake,
    color: 'amber',
  },
];

const leadership = [
  {
    name: 'Dr. Rebecca Martinez, MD',
    role: 'Executive Director',
    bio: 'Board-certified psychiatrist with 20+ years in psychedelic medicine research. Former Director of Ketamine Research at Johns Hopkins.',
    initials: 'RM',
  },
  {
    name: 'Dr. James Chen, PhD',
    role: 'Chief Scientific Officer',
    bio: 'Neuroscientist specializing in NMDA receptor pharmacology. Published over 100 peer-reviewed papers on ketamine mechanisms.',
    initials: 'JC',
  },
  {
    name: 'Sarah Thompson, MBA',
    role: 'Chief Operating Officer',
    bio: 'Former healthcare executive with expertise in scaling medical professional organizations and credentialing systems.',
    initials: 'ST',
  },
  {
    name: 'Dr. Michael Roberts, MD, MPH',
    role: 'Medical Director',
    bio: 'Anesthesiologist and public health expert. Pioneer in establishing ketamine therapy safety protocols and standards.',
    initials: 'MR',
  },
  {
    name: 'Dr. Emily Watson, PsyD',
    role: 'Director of Education',
    bio: 'Clinical psychologist specializing in ketamine-assisted psychotherapy training. Developed industry-leading KAP certification programs.',
    initials: 'EW',
  },
  {
    name: 'David Park, JD',
    role: 'General Counsel',
    bio: 'Healthcare attorney with expertise in medical licensing, regulatory compliance, and psychedelic medicine policy advocacy.',
    initials: 'DP',
  },
];

const milestones = [
  { year: '2012', event: 'Founded by a group of pioneering ketamine therapy practitioners' },
  { year: '2014', event: 'Launched first ketamine therapy certification program' },
  { year: '2016', event: 'Reached 100 verified provider members' },
  { year: '2018', event: 'Established partnership with leading medical institutions' },
  { year: '2020', event: 'Expanded to cover all 48 continental states' },
  { year: '2022', event: 'Launched patient advocacy and education initiatives' },
  { year: '2024', event: 'Surpassed 500 verified providers and 50,000 patients helped' },
];

export default function AboutPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-700 via-teal-600 to-emerald-600 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <Container className="relative py-20 lg:py-28">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" size="lg" className="mb-6 bg-white/20 text-white border-0">
              About Us
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              About The Ketamine Association
            </h1>

            <p className="text-xl text-teal-100 mb-10 max-w-2xl mx-auto">
              Dedicated to advancing safe, effective, and accessible ketamine therapy
              through provider education, patient advocacy, and rigorous standards.
            </p>
          </div>
        </Container>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-16 sm:h-24">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="primary" className="mb-6">Our Mission</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8">
              Transforming Mental Health Through Ketamine Therapy
            </h2>
            <div className="prose prose-lg mx-auto text-slate-600">
              <p className="text-xl leading-relaxed">
                The Ketamine Association is the leading professional organization dedicated to
                establishing and maintaining the highest standards of care in ketamine therapy.
                We connect patients with verified, credentialed providers while advancing education,
                research, and advocacy in the rapidly evolving field of ketamine-assisted treatments.
              </p>
              <p className="text-xl leading-relaxed mt-6">
                Our mission is to ensure that everyone who could benefit from ketamine therapy
                has access to safe, effective treatment delivered by qualified professionals
                who meet our rigorous standards.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats Bar */}
      <section className="py-16 bg-slate-50">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="w-14 h-14 rounded-xl bg-teal-100 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-7 h-7 text-teal-600" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-slate-900 mb-1">{stat.value}</div>
                <div className="text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">Our Story</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
                A Decade of Innovation in Mental Health
              </h2>
              <div className="space-y-4 text-slate-600 text-lg">
                <p>
                  The Ketamine Association was founded in 2012 by a group of pioneering
                  physicians who recognized ketamine&apos;s extraordinary potential for treating
                  depression, chronic pain, and other conditions that had proven resistant
                  to conventional treatments.
                </p>
                <p>
                  What began as an informal network of like-minded practitioners has grown
                  into the nation&apos;s leading professional association for ketamine therapy
                  providers, setting industry standards, developing training programs, and
                  advocating for patients&apos; access to this transformative treatment.
                </p>
                <p>
                  Today, we represent over 500 verified providers across 48 states, and
                  our members have helped more than 50,000 patients find relief when other
                  treatments have failed.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center text-white font-bold">
                    {milestone.year}
                  </div>
                  <div className="pt-3">
                    <p className="text-slate-700">{milestone.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-slate-50">
        <Container>
          <div className="text-center mb-16">
            <Badge variant="primary" className="mb-4">Our Values</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              What We Stand For
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Our core values guide every decision we make and every standard we set.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value) => {
              const colorClasses = {
                teal: 'bg-teal-100 text-teal-600',
                emerald: 'bg-emerald-100 text-emerald-600',
                amber: 'bg-amber-100 text-amber-600',
              };
              return (
                <Card key={value.title} className="p-8">
                  <div className={`w-14 h-14 rounded-xl ${colorClasses[value.color as keyof typeof colorClasses]} flex items-center justify-center mb-6`}>
                    <value.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                  <p className="text-slate-600">{value.description}</p>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Leadership Team Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Leadership</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Meet Our Leadership Team
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Experienced professionals dedicated to advancing ketamine therapy standards.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadership.map((leader) => (
              <Card key={leader.name} hover className="overflow-hidden">
                <div className="h-40 bg-gradient-to-br from-teal-100 to-emerald-100 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-white text-2xl font-bold">
                    {leader.initials}
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{leader.name}</h3>
                  <p className="text-teal-600 font-medium mb-3">{leader.role}</p>
                  <p className="text-slate-600 text-sm">{leader.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Join Us CTA Section */}
      <section className="py-20 bg-gradient-to-br from-teal-700 via-teal-600 to-emerald-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <Container className="relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Join Us in Transforming Mental Health Care
            </h2>
            <p className="text-xl text-teal-100 mb-10 max-w-2xl mx-auto">
              Whether you&apos;re a practitioner looking to join our network or a patient
              seeking treatment, we&apos;re here to help you on your journey.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                size="lg"
                href="/association/membership"
                className="bg-white text-teal-700 hover:bg-teal-50 flex items-center justify-center gap-2"
              >
                <Award className="w-5 h-5" />
                Become a Member
              </Button>
              <Button
                size="lg"
                href="/contact"
                className="bg-teal-500/30 text-white border border-teal-400/50 hover:bg-teal-500/50 flex items-center justify-center gap-2"
              >
                Contact Us
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-teal-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Industry-leading standards</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Comprehensive education</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Supportive community</span>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
