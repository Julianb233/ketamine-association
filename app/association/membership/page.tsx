'use client';

import {
  Search,
  Users,
  Award,
  BookOpen,
  Briefcase,
  TrendingUp,
  Shield,
  Star,
  ArrowRight,
  CheckCircle,
  X,
  Quote,
  Zap,
  Target,
  MessageSquare,
  FileText,
  Globe
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

const benefits = [
  {
    title: 'Enhanced Visibility',
    description: 'Get featured in our searchable directory, reaching thousands of patients actively seeking ketamine therapy.',
    icon: Search,
    stats: '3x more patient inquiries',
    color: 'teal',
  },
  {
    title: 'Qualified Patient Leads',
    description: 'Receive direct referrals from patients who have been pre-screened and are ready for treatment.',
    icon: Target,
    stats: 'Average 15+ leads/month',
    color: 'emerald',
  },
  {
    title: 'Continuing Education',
    description: 'Access exclusive training programs, webinars, and certification courses to advance your expertise.',
    icon: BookOpen,
    stats: '50+ CE credits available',
    color: 'amber',
  },
  {
    title: 'Professional Network',
    description: 'Connect with peers, mentors, and industry leaders through our members-only community and events.',
    icon: Users,
    stats: '500+ provider network',
    color: 'teal',
  },
  {
    title: 'Practice Resources',
    description: 'Gain access to protocols, consent forms, treatment guidelines, and marketing materials.',
    icon: FileText,
    stats: '100+ templates included',
    color: 'emerald',
  },
  {
    title: 'Industry Recognition',
    description: 'Display our verified provider badge and certification credentials to build patient trust.',
    icon: Award,
    stats: '92% trust increase',
    color: 'amber',
  },
];

const testimonials = [
  {
    quote: 'Joining the Ketamine Association transformed my practice. Within three months, my patient volume doubled and I finally felt connected to a community of like-minded providers.',
    author: 'Dr. Jennifer Mitchell',
    role: 'Psychiatrist, Austin TX',
    memberSince: 'Member since 2021',
    initials: 'JM',
  },
  {
    quote: 'The certification program gave me the confidence and credentials to expand my services. The ongoing education keeps me at the forefront of ketamine therapy best practices.',
    author: 'Dr. Robert Chen',
    role: 'Pain Medicine, Seattle WA',
    memberSince: 'Member since 2020',
    initials: 'RC',
  },
  {
    quote: 'The business resources alone are worth the membership fee. From patient intake forms to treatment protocols, everything I need is at my fingertips.',
    author: 'Dr. Sarah Williams',
    role: 'Anesthesiologist, Denver CO',
    memberSince: 'Member since 2022',
    initials: 'SW',
  },
];

const certificationSteps = [
  {
    step: '01',
    title: 'Application',
    description: 'Submit credentials and complete background verification',
  },
  {
    step: '02',
    title: 'Foundation Training',
    description: 'Complete our comprehensive ketamine therapy coursework',
  },
  {
    step: '03',
    title: 'Practical Assessment',
    description: 'Demonstrate clinical competency through case studies',
  },
  {
    step: '04',
    title: 'Certification',
    description: 'Receive your official certification and directory listing',
  },
];

const comparisonFeatures = [
  { feature: 'Provider Directory Listing', member: true, nonMember: false },
  { feature: 'Patient Lead Referrals', member: true, nonMember: false },
  { feature: 'Verified Provider Badge', member: true, nonMember: false },
  { feature: 'Practice Resource Library', member: true, nonMember: false },
  { feature: 'Continuing Education Access', member: true, nonMember: false },
  { feature: 'Member Networking Events', member: true, nonMember: false },
  { feature: 'Protocol & Template Library', member: true, nonMember: false },
  { feature: 'Priority Support', member: true, nonMember: false },
  { feature: 'Marketing Materials', member: true, nonMember: false },
  { feature: 'Conference Discounts', member: true, nonMember: false },
  { feature: 'Public Information Access', member: true, nonMember: true },
  { feature: 'Newsletter Subscription', member: true, nonMember: true },
];

export default function MembershipPage() {
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
              For Practitioners
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Why Join The Ketamine Association
            </h1>

            <p className="text-xl text-teal-100 mb-10 max-w-2xl mx-auto">
              Elevate your practice with the industry&apos;s leading professional network.
              Get more patients, advance your skills, and join a community of excellence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                href="/association/pricing"
                size="lg"
                className="bg-white text-teal-700 hover:bg-teal-50"
              >
                View Membership Plans
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button
                href="#benefits"
                size="lg"
                className="bg-teal-500/30 text-white border border-teal-400/50 hover:bg-teal-500/50"
              >
                Learn More
              </Button>
            </div>
          </div>
        </Container>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-16 sm:h-24">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <Badge variant="primary" className="mb-4">Member Benefits</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Everything You Need to Grow Your Practice
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Our comprehensive membership provides the tools, resources, and network
              you need to succeed in ketamine therapy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit) => {
              const colorClasses = {
                teal: { bg: 'bg-teal-100', text: 'text-teal-600', badge: 'bg-teal-50 text-teal-700' },
                emerald: { bg: 'bg-emerald-100', text: 'text-emerald-600', badge: 'bg-emerald-50 text-emerald-700' },
                amber: { bg: 'bg-amber-100', text: 'text-amber-600', badge: 'bg-amber-50 text-amber-700' },
              };
              const colors = colorClasses[benefit.color as keyof typeof colorClasses];

              return (
                <Card key={benefit.title} className="p-8" hover>
                  <div className={`w-14 h-14 rounded-xl ${colors.bg} ${colors.text} flex items-center justify-center mb-6`}>
                    <benefit.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
                  <p className="text-slate-600 mb-4">{benefit.description}</p>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${colors.badge}`}>
                    <Zap className="w-4 h-4 mr-1" />
                    {benefit.stats}
                  </span>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-slate-50">
        <Container>
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Success Stories</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Trusted by Leading Practitioners
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Hear from members who have transformed their practices with our support.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8 relative">
                <Quote className="w-10 h-10 text-teal-100 absolute top-6 right-6" />
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center text-white font-bold">
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{testimonial.author}</p>
                    <p className="text-slate-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <blockquote className="text-slate-700 mb-4 italic">
                  &quot;{testimonial.quote}&quot;
                </blockquote>
                <Badge variant="outline" size="sm">{testimonial.memberSince}</Badge>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Certification Pathway */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge variant="primary" className="mb-4">Certification Pathway</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
                Your Path to Certification
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Our streamlined certification process ensures you meet the highest
                standards while providing the education and support you need to excel.
              </p>
              <Button variant="primary" href="/education">
                Explore Certification Programs
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>

            <div className="space-y-6">
              {certificationSteps.map((step, index) => (
                <div key={step.step} className="flex gap-4 items-start">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center text-white font-bold">
                      {step.step}
                    </div>
                    {index < certificationSteps.length - 1 && (
                      <div className="absolute top-12 left-1/2 w-0.5 h-8 bg-teal-200 -translate-x-1/2" />
                    )}
                  </div>
                  <div className="pt-1">
                    <h3 className="font-semibold text-slate-900 mb-1">{step.title}</h3>
                    <p className="text-slate-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Member vs Non-Member Comparison */}
      <section className="py-20 bg-slate-50">
        <Container size="md">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Comparison</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Member vs. Non-Member
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              See the full range of benefits available exclusively to our members.
            </p>
          </div>

          <Card className="overflow-hidden" padding="none">
            <div className="grid grid-cols-3 bg-slate-100 border-b border-slate-200">
              <div className="p-4 font-semibold text-slate-900">Feature</div>
              <div className="p-4 font-semibold text-slate-900 text-center bg-teal-50">Member</div>
              <div className="p-4 font-semibold text-slate-500 text-center">Non-Member</div>
            </div>
            <div className="divide-y divide-slate-100">
              {comparisonFeatures.map((item) => (
                <div key={item.feature} className="grid grid-cols-3">
                  <div className="p-4 text-slate-700">{item.feature}</div>
                  <div className="p-4 flex justify-center bg-teal-50/50">
                    {item.member ? (
                      <CheckCircle className="w-5 h-5 text-teal-600" />
                    ) : (
                      <X className="w-5 h-5 text-slate-300" />
                    )}
                  </div>
                  <div className="p-4 flex justify-center">
                    {item.nonMember ? (
                      <CheckCircle className="w-5 h-5 text-slate-400" />
                    ) : (
                      <X className="w-5 h-5 text-slate-300" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
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
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Elevate Your Practice?
            </h2>
            <p className="text-xl text-teal-100 mb-10 max-w-2xl mx-auto">
              Join hundreds of leading ketamine therapy providers who trust
              the Ketamine Association to grow their practices.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                href="/association/pricing"
                size="lg"
                className="bg-white text-teal-700 hover:bg-teal-50 flex items-center justify-center gap-2"
              >
                <Award className="w-5 h-5" />
                View Pricing Plans
              </Button>
              <Button
                href="/contact"
                size="lg"
                className="bg-teal-500/30 text-white border border-teal-400/50 hover:bg-teal-500/50 flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-5 h-5" />
                Contact Sales
              </Button>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-teal-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>30-day money back guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Free trial available</span>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
