'use client';

import {
  BookOpen,
  Award,
  Clock,
  Users,
  Star,
  ArrowRight,
  CheckCircle,
  Play,
  FileText,
  Brain,
  Stethoscope,
  HeartPulse,
  GraduationCap,
  Shield,
  Zap,
  Calendar
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

const courseCategories = [
  {
    id: 'foundational',
    name: 'Foundational',
    description: 'Essential knowledge for practitioners new to ketamine therapy',
    icon: BookOpen,
    color: 'teal',
  },
  {
    id: 'advanced',
    name: 'Advanced Clinical',
    description: 'Deep-dive protocols for experienced practitioners',
    icon: Stethoscope,
    color: 'emerald',
  },
  {
    id: 'kap',
    name: 'KAP Specialty',
    description: 'Ketamine-Assisted Psychotherapy training and certification',
    icon: Brain,
    color: 'amber',
  },
];

const courses = [
  // Foundational
  {
    id: 'intro-ketamine',
    title: 'Introduction to Ketamine Therapy',
    description: 'Comprehensive overview of ketamine mechanisms, patient selection, and treatment fundamentals.',
    category: 'foundational',
    ceCredits: 12,
    price: 49900,
    duration: '8 hours',
    level: 'Beginner',
    modules: 6,
    popular: true,
  },
  {
    id: 'patient-screening',
    title: 'Patient Screening & Assessment',
    description: 'Learn evidence-based protocols for evaluating patient candidacy and managing contraindications.',
    category: 'foundational',
    ceCredits: 8,
    price: 34900,
    duration: '5 hours',
    level: 'Beginner',
    modules: 4,
    popular: false,
  },
  {
    id: 'legal-regulatory',
    title: 'Legal & Regulatory Framework',
    description: 'Navigate federal and state regulations, informed consent, and compliance requirements.',
    category: 'foundational',
    ceCredits: 6,
    price: 24900,
    duration: '4 hours',
    level: 'Beginner',
    modules: 3,
    popular: false,
  },
  // Advanced
  {
    id: 'iv-infusion',
    title: 'Advanced IV Infusion Protocols',
    description: 'Master dosing strategies, infusion techniques, and management of adverse reactions.',
    category: 'advanced',
    ceCredits: 16,
    price: 79900,
    duration: '12 hours',
    level: 'Intermediate',
    modules: 8,
    popular: true,
  },
  {
    id: 'pain-management',
    title: 'Ketamine for Chronic Pain',
    description: 'Specialized protocols for treating chronic pain conditions with ketamine therapy.',
    category: 'advanced',
    ceCredits: 12,
    price: 59900,
    duration: '8 hours',
    level: 'Intermediate',
    modules: 6,
    popular: false,
  },
  {
    id: 'treatment-resistant',
    title: 'Treatment-Resistant Depression Protocols',
    description: 'Evidence-based approaches for TRD, including combination therapies and maintenance strategies.',
    category: 'advanced',
    ceCredits: 14,
    price: 69900,
    duration: '10 hours',
    level: 'Intermediate',
    modules: 7,
    popular: false,
  },
  // KAP
  {
    id: 'kap-fundamentals',
    title: 'KAP Fundamentals',
    description: 'Foundation training in ketamine-assisted psychotherapy theory and practice.',
    category: 'kap',
    ceCredits: 20,
    price: 99900,
    duration: '16 hours',
    level: 'Intermediate',
    modules: 10,
    popular: true,
  },
  {
    id: 'kap-integration',
    title: 'KAP Integration Techniques',
    description: 'Advanced methods for supporting patients through the integration process.',
    category: 'kap',
    ceCredits: 12,
    price: 59900,
    duration: '8 hours',
    level: 'Advanced',
    modules: 6,
    popular: false,
  },
  {
    id: 'kap-certification',
    title: 'KAP Certification Program',
    description: 'Comprehensive certification including didactic, experiential, and supervised practice components.',
    category: 'kap',
    ceCredits: 40,
    price: 249900,
    duration: '40 hours',
    level: 'Advanced',
    modules: 15,
    popular: false,
  },
];

const certificationTrack = [
  {
    level: 1,
    title: 'Certified Ketamine Provider',
    description: 'Foundational certification for practitioners administering ketamine therapy.',
    requirements: ['Complete Intro to Ketamine Therapy', 'Pass comprehensive exam', 'Credential verification'],
    badge: 'CKP',
    color: 'teal',
  },
  {
    level: 2,
    title: 'Advanced Ketamine Specialist',
    description: 'Recognition of expertise in advanced protocols and complex cases.',
    requirements: ['CKP Certification', 'Complete 2 advanced courses', '50 documented treatments'],
    badge: 'AKS',
    color: 'emerald',
  },
  {
    level: 3,
    title: 'KAP Certified Therapist',
    description: 'The highest level of certification for ketamine-assisted psychotherapy.',
    requirements: ['AKS Certification', 'Complete KAP Certification Program', 'Supervised clinical hours'],
    badge: 'KAPT',
    color: 'amber',
  },
];

const certificationBenefits = [
  {
    title: 'Enhanced Credibility',
    description: 'Stand out with industry-recognized certifications that demonstrate your expertise.',
    icon: Shield,
  },
  {
    title: 'Patient Trust',
    description: 'Certified providers see 92% higher patient confidence in treatment decisions.',
    icon: Users,
  },
  {
    title: 'Practice Growth',
    description: 'Certified members report 3x more patient inquiries through our directory.',
    icon: Zap,
  },
  {
    title: 'Continuing Education',
    description: 'Earn CE credits while maintaining your certification through ongoing learning.',
    icon: GraduationCap,
  },
];

function formatPrice(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100);
}

export default function EducationPage() {
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
              Professional Education
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Advance Your Ketamine Therapy Expertise
            </h1>

            <p className="text-xl text-teal-100 mb-10 max-w-2xl mx-auto">
              Industry-leading courses and certifications designed by experts.
              Earn CE credits while mastering the latest protocols and techniques.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                href="#courses"
                size="lg"
                className="bg-white text-teal-700 hover:bg-teal-50"
              >
                Browse Courses
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button
                href="#certification"
                size="lg"
                className="bg-teal-500/30 text-white border border-teal-400/50 hover:bg-teal-500/50"
              >
                View Certifications
              </Button>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-teal-200">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                <span>ACCME Accredited</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>Self-Paced Learning</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                <span>150+ CE Credits Available</span>
              </div>
            </div>
          </div>
        </Container>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-16 sm:h-24">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Course Categories */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <Badge variant="primary" className="mb-4">Course Categories</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Learning Paths for Every Stage
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              From foundational training to advanced specializations, find the courses
              that match your experience level and goals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {courseCategories.map((category) => {
              const colorClasses = {
                teal: { bg: 'bg-teal-100', text: 'text-teal-600', border: 'border-teal-200' },
                emerald: { bg: 'bg-emerald-100', text: 'text-emerald-600', border: 'border-emerald-200' },
                amber: { bg: 'bg-amber-100', text: 'text-amber-600', border: 'border-amber-200' },
              };
              const colors = colorClasses[category.color as keyof typeof colorClasses];

              return (
                <Card key={category.id} hover className="p-8 border-2 border-transparent hover:border-teal-200">
                  <div className={`w-16 h-16 rounded-2xl ${colors.bg} ${colors.text} flex items-center justify-center mb-6`}>
                    <category.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">{category.name}</h3>
                  <p className="text-slate-600 mb-4">{category.description}</p>
                  <p className="text-teal-600 font-medium">
                    {courses.filter(c => c.category === category.id).length} courses available
                  </p>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Course Listings */}
      <section id="courses" className="py-20 bg-slate-50">
        <Container>
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">All Courses</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Professional Development Courses
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Comprehensive training developed by leading experts in ketamine therapy.
            </p>
          </div>

          {courseCategories.map((category) => {
            const categoryCourses = courses.filter(c => c.category === category.id);
            const colorClasses = {
              teal: 'text-teal-600',
              emerald: 'text-emerald-600',
              amber: 'text-amber-600',
            };

            return (
              <div key={category.id} className="mb-16 last:mb-0">
                <div className="flex items-center gap-3 mb-8">
                  <category.icon className={`w-6 h-6 ${colorClasses[category.color as keyof typeof colorClasses]}`} />
                  <h3 className="text-2xl font-bold text-slate-900">{category.name} Courses</h3>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryCourses.map((course) => (
                    <Card key={course.id} hover className="overflow-hidden flex flex-col" padding="none">
                      <div className="p-6 flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <Badge
                            variant={course.level === 'Beginner' ? 'primary' : course.level === 'Intermediate' ? 'secondary' : 'accent'}
                            size="sm"
                          >
                            {course.level}
                          </Badge>
                          {course.popular && (
                            <Badge variant="premium" size="sm" icon={Star}>
                              Popular
                            </Badge>
                          )}
                        </div>
                        <h4 className="text-lg font-bold text-slate-900 mb-2">{course.title}</h4>
                        <p className="text-slate-600 text-sm mb-4">{course.description}</p>

                        <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-4">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {course.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-4 h-4" />
                            {course.modules} modules
                          </span>
                          <span className="flex items-center gap-1">
                            <Award className="w-4 h-4" />
                            {course.ceCredits} CE credits
                          </span>
                        </div>
                      </div>

                      <div className="p-6 pt-0 mt-auto">
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-slate-900">
                            {formatPrice(course.price)}
                          </span>
                          <Button variant="secondary" size="sm">
                            Learn More
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </Container>
      </section>

      {/* Certification Track */}
      <section id="certification" className="py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <Badge variant="primary" className="mb-4">Certification Track</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Your Path to Certification
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Progress through our tiered certification program to demonstrate your
              expertise and stand out in the field.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {certificationTrack.map((cert) => {
              const colorClasses = {
                teal: { bg: 'bg-teal-500', text: 'text-teal-600', light: 'bg-teal-100' },
                emerald: { bg: 'bg-emerald-500', text: 'text-emerald-600', light: 'bg-emerald-100' },
                amber: { bg: 'bg-amber-500', text: 'text-amber-600', light: 'bg-amber-100' },
              };
              const colors = colorClasses[cert.color as keyof typeof colorClasses];

              return (
                <Card key={cert.level} className="p-8 text-center relative overflow-hidden">
                  <div className={`absolute top-0 left-0 right-0 h-2 ${colors.bg}`} />

                  <div className="text-sm font-medium text-slate-500 mb-2">Level {cert.level}</div>

                  <div className={`w-16 h-16 rounded-full ${colors.light} ${colors.text} flex items-center justify-center mx-auto mb-4`}>
                    <span className="text-xl font-bold">{cert.badge}</span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3">{cert.title}</h3>
                  <p className="text-slate-600 mb-6">{cert.description}</p>

                  <div className="text-left space-y-2">
                    <p className="text-sm font-medium text-slate-700">Requirements:</p>
                    {cert.requirements.map((req, index) => (
                      <div key={index} className="flex items-start gap-2 text-sm text-slate-600">
                        <CheckCircle className={`w-4 h-4 ${colors.text} flex-shrink-0 mt-0.5`} />
                        <span>{req}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Benefits of Certification */}
          <div className="bg-slate-50 rounded-2xl p-8 lg:p-12">
            <h3 className="text-2xl font-bold text-slate-900 text-center mb-8">
              Benefits of Certification
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {certificationBenefits.map((benefit) => (
                <div key={benefit.title} className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-6 h-6 text-teal-600" />
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-2">{benefit.title}</h4>
                  <p className="text-sm text-slate-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
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
              Start Your Learning Journey Today
            </h2>
            <p className="text-xl text-teal-100 mb-10 max-w-2xl mx-auto">
              Join thousands of practitioners who have advanced their careers
              through our professional education programs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                href="/association/membership"
                size="lg"
                className="bg-white text-teal-700 hover:bg-teal-50 flex items-center justify-center gap-2"
              >
                <GraduationCap className="w-5 h-5" />
                Become a Member
              </Button>
              <Button
                href="/contact"
                size="lg"
                className="bg-teal-500/30 text-white border border-teal-400/50 hover:bg-teal-500/50 flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Schedule Consultation
              </Button>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-teal-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Self-paced learning</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Expert instructors</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Member discounts available</span>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
