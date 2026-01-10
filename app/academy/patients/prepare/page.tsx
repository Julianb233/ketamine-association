'use client';

import {
  ClipboardCheck,
  Clock,
  UtensilsCrossed,
  Users,
  Car,
  Moon,
  MessageSquare,
  CheckCircle,
  ArrowRight,
  AlertCircle,
  Heart,
  Stethoscope,
  Coffee,
  Pill,
  Home,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

const beforeChecklist = [
  { item: 'Fast for 4-6 hours before your appointment (water is OK)', icon: UtensilsCrossed },
  { item: 'Arrange for someone to drive you home afterward', icon: Car },
  { item: 'Get a good night&apos;s sleep the night before', icon: Moon },
  { item: 'Wear comfortable, loose-fitting clothing', icon: Heart },
  { item: 'Avoid alcohol for 24 hours before treatment', icon: Coffee },
  { item: 'Take your regular medications unless directed otherwise', icon: Pill },
  { item: 'Bring a list of questions for your provider', icon: MessageSquare },
  { item: 'Clear your schedule for the rest of the day', icon: Clock },
];

const duringTreatment = [
  {
    title: 'Check-In & Vitals',
    description: 'Your provider will review your current state, check vital signs, and answer any last-minute questions.',
    duration: '10-15 min',
  },
  {
    title: 'Treatment Administration',
    description: 'Depending on your treatment type, ketamine will be administered. You&apos;ll relax in a comfortable setting.',
    duration: '40-60 min',
  },
  {
    title: 'Altered State',
    description: 'You may experience dreamlike states, altered perceptions, or deep relaxation. Staff will monitor you throughout.',
    duration: 'During treatment',
  },
  {
    title: 'Recovery & Integration',
    description: 'Effects gradually subside. Your provider may discuss your experience or provide integration resources.',
    duration: '30-60 min',
  },
];

const questionsToAsk = [
  'What type of ketamine treatment do you recommend for my condition?',
  'How many sessions will I likely need?',
  'What should I expect during and after treatment?',
  'What are the potential side effects and risks?',
  'How long before I might notice improvement?',
  'Do you offer ketamine-assisted psychotherapy?',
  'What is the cost per session and do you offer packages?',
  'What happens if the treatment doesn&apos;t work for me?',
  'Are there any medications I should avoid?',
  'How do I reach you between appointments if I have concerns?',
];

const afterCare = [
  {
    title: 'Rest at Home',
    description: 'Plan to rest for the remainder of the day. Avoid operating heavy machinery or making important decisions.',
    icon: Home,
  },
  {
    title: 'Stay Hydrated',
    description: 'Drink plenty of water and have light, easy-to-digest foods available.',
    icon: Coffee,
  },
  {
    title: 'Reflect & Journal',
    description: 'Many patients find it helpful to journal about their experience and any insights gained.',
    icon: MessageSquare,
  },
  {
    title: 'Follow-Up Care',
    description: 'Attend all follow-up appointments and communicate any concerns to your provider.',
    icon: Users,
  },
];

export default function PreparePage() {
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
              <ClipboardCheck className="w-4 h-4 mr-2" />
              Treatment Preparation
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Preparing for Your Treatment
            </h1>

            <p className="text-xl text-teal-100 mb-10 max-w-2xl mx-auto">
              Everything you need to know to get ready for your ketamine therapy session
              and make the most of your treatment experience.
            </p>
          </div>
        </Container>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-16 sm:h-24">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Before Your Appointment */}
      <section className="py-20 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="primary" className="mb-4">Before Treatment</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                Pre-Treatment Checklist
              </h2>
              <p className="text-xl text-slate-600">
                Complete these steps before your appointment for the best experience.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {beforeChecklist.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 bg-slate-50 rounded-xl p-5 border border-slate-100"
                >
                  <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-teal-600" />
                  </div>
                  <span className="text-slate-700">{item.item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-amber-800 mb-2">Important Reminder</h3>
                  <p className="text-amber-700">
                    Discuss all medications and supplements with your provider before treatment.
                    Some medications, particularly MAOIs and certain antidepressants, may need
                    to be adjusted. Never stop any medication without consulting your prescriber.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* What to Expect During Treatment */}
      <section className="py-20 bg-slate-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">During Treatment</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                What to Expect
              </h2>
              <p className="text-xl text-slate-600">
                Here&apos;s what a typical ketamine therapy session looks like.
              </p>
            </div>

            <div className="space-y-6">
              {duringTreatment.map((step, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 border border-slate-100 flex items-start gap-6"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
                      <Badge variant="secondary" size="sm">{step.duration}</Badge>
                    </div>
                    <p className="text-slate-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Questions to Ask */}
      <section className="py-20 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="primary" className="mb-4">Be Prepared</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                Questions to Ask Your Provider
              </h2>
              <p className="text-xl text-slate-600">
                Don&apos;t hesitate to ask these questions during your consultation.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {questionsToAsk.map((question, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 bg-slate-50 rounded-xl p-4 border border-slate-100"
                >
                  <MessageSquare className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">{question}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* After Treatment Care */}
      <section className="py-20 bg-slate-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">After Treatment</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                Post-Treatment Care
              </h2>
              <p className="text-xl text-slate-600">
                How to take care of yourself after your ketamine session.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {afterCare.map((item) => (
                <Card key={item.title} className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600">{item.description}</p>
                </Card>
              ))}
            </div>

            <div className="mt-12 bg-teal-50 border border-teal-200 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-teal-800 mb-2">Integration is Key</h3>
                  <p className="text-teal-700">
                    Many patients find that the insights gained during ketamine therapy are most
                    beneficial when combined with ongoing therapy or counseling. Ask your provider
                    about integration services or therapists experienced with ketamine therapy.
                  </p>
                </div>
              </div>
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
              Ready to Find a Provider?
            </h2>
            <p className="text-xl text-teal-100 mb-10 max-w-2xl mx-auto">
              Connect with a verified ketamine therapy provider in our directory
              and take the first step toward feeling better.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                size="lg"
                href="/providers"
                className="bg-white text-teal-700 hover:bg-teal-50 flex items-center justify-center gap-2"
              >
                <Stethoscope className="w-5 h-5" />
                Find a Provider
              </Button>
              <Button
                size="lg"
                href="/academy/patients/learn"
                className="bg-teal-500/30 text-white border border-teal-400/50 hover:bg-teal-500/50 flex items-center justify-center gap-2"
              >
                Learn More About Ketamine
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
