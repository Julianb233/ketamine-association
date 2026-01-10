'use client';

import {
  Brain,
  Pill,
  Shield,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Heart,
  Zap,
  Stethoscope,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

const treatmentTypes = [
  {
    name: 'IV Infusion',
    description: 'Ketamine delivered directly into the bloodstream through an IV, providing precise dosing and rapid onset.',
    duration: '40-60 minutes',
    onset: 'Within minutes',
    icon: Zap,
  },
  {
    name: 'IM Injection',
    description: 'Intramuscular injection offering a middle ground between IV infusions and other methods.',
    duration: '45-60 minutes',
    onset: '5-10 minutes',
    icon: Pill,
  },
  {
    name: 'Nasal Spray',
    description: 'Self-administered under supervision, often using esketamine (Spravato) for depression.',
    duration: '2 hours (observation)',
    onset: '15-20 minutes',
    icon: Shield,
  },
  {
    name: 'Oral/Sublingual',
    description: 'Tablets or troches that dissolve under the tongue, often used for at-home maintenance.',
    duration: '2-3 hours',
    onset: '20-30 minutes',
    icon: Heart,
  },
  {
    name: 'Ketamine-Assisted Psychotherapy (KAP)',
    description: 'Combines ketamine with psychotherapy for deeper therapeutic work during the altered state.',
    duration: '2-3 hours',
    onset: 'Varies by method',
    icon: Brain,
  },
];

const conditions = [
  { name: 'Treatment-Resistant Depression', description: 'Depression that hasn&apos;t responded to two or more antidepressants' },
  { name: 'PTSD', description: 'Post-traumatic stress disorder and trauma-related conditions' },
  { name: 'Anxiety Disorders', description: 'Generalized anxiety, social anxiety, and panic disorder' },
  { name: 'OCD', description: 'Obsessive-compulsive disorder and related conditions' },
  { name: 'Bipolar Depression', description: 'Depressive episodes in bipolar disorder' },
  { name: 'Chronic Pain', description: 'Fibromyalgia, CRPS, neuropathic pain syndromes' },
  { name: 'Suicidal Ideation', description: 'Rapid relief from acute suicidal thoughts' },
];

const sideEffects = [
  { effect: 'Dissociation', description: 'Feeling detached from surroundings, typically resolves within 2 hours', common: true },
  { effect: 'Dizziness', description: 'Light-headedness during and shortly after treatment', common: true },
  { effect: 'Nausea', description: 'Can be managed with anti-nausea medication if needed', common: true },
  { effect: 'Elevated Blood Pressure', description: 'Temporary increase, monitored throughout session', common: true },
  { effect: 'Blurred Vision', description: 'Temporary visual changes during treatment', common: false },
  { effect: 'Fatigue', description: 'Feeling tired after the session, usually resolves within a day', common: false },
];

export default function LearnPage() {
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
              <Brain className="w-4 h-4 mr-2" />
              Patient Education
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              What is Ketamine Therapy?
            </h1>

            <p className="text-xl text-teal-100 mb-10 max-w-2xl mx-auto">
              Learn about this innovative treatment that&apos;s helping thousands of people
              find relief from depression, anxiety, chronic pain, and more.
            </p>

            <Button href="/providers" variant="secondary" size="lg" className="bg-white text-teal-700 hover:bg-teal-50">
              Find a Provider
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </Container>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-16 sm:h-24">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <Badge variant="primary" className="mb-4">Overview</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
              Understanding Ketamine Therapy
            </h2>
            <div className="prose prose-lg text-slate-600 space-y-6">
              <p>
                Ketamine was first developed in the 1960s as an anesthetic and has been safely used
                in medical settings for decades. In recent years, researchers discovered that ketamine
                has remarkable effects on mood disorders, particularly for patients who haven&apos;t
                responded to traditional treatments.
              </p>
              <p>
                Unlike conventional antidepressants that can take weeks to work, ketamine often provides
                relief within hours to days. This rapid action makes it especially valuable for people
                in crisis or those who have struggled with treatment-resistant conditions.
              </p>
              <p>
                Ketamine works by blocking NMDA receptors and promoting the release of glutamate,
                leading to the formation of new neural connections. This process, called neuroplasticity,
                helps &quot;rewire&quot; brain pathways associated with depression and other conditions.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-slate-50">
        <Container>
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Mechanism</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              How Ketamine Works
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Ketamine&apos;s unique mechanism sets it apart from traditional treatments.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center p-8">
              <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-teal-600">1</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Blocks NMDA Receptors</h3>
              <p className="text-slate-600">
                Ketamine temporarily blocks NMDA receptors, triggering a cascade of brain chemistry changes.
              </p>
            </Card>
            <Card className="text-center p-8">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-emerald-600">2</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Increases Glutamate</h3>
              <p className="text-slate-600">
                This leads to increased glutamate release, promoting communication between neurons.
              </p>
            </Card>
            <Card className="text-center p-8">
              <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-amber-600">3</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Promotes Neuroplasticity</h3>
              <p className="text-slate-600">
                New neural connections form, helping &quot;rewire&quot; mood-related brain pathways.
              </p>
            </Card>
          </div>
        </Container>
      </section>

      {/* Treatment Types */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <Badge variant="primary" className="mb-4">Treatment Options</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Types of Ketamine Treatment
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Different delivery methods suit different needs and preferences.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {treatmentTypes.map((type) => (
              <Card key={type.name} className="p-6">
                <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center mb-4">
                  <type.icon className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{type.name}</h3>
                <p className="text-slate-600 text-sm mb-4">{type.description}</p>
                <div className="flex gap-4 text-sm">
                  <div>
                    <span className="text-slate-400">Duration:</span>
                    <span className="text-slate-700 ml-1">{type.duration}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Onset:</span>
                    <span className="text-slate-700 ml-1">{type.onset}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Conditions Treated */}
      <section className="py-20 bg-slate-50">
        <Container>
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Applications</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Conditions Treated
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Ketamine therapy has shown effectiveness for multiple conditions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {conditions.map((condition) => (
              <div
                key={condition.name}
                className="bg-white rounded-xl p-5 flex items-start gap-4 border border-slate-100"
              >
                <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-slate-900">{condition.name}</h3>
                  <p className="text-sm text-slate-500">{condition.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Safety & Side Effects */}
      <section className="py-20 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="primary" className="mb-4">Safety</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                Safety & Side Effects
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                When administered by qualified providers, ketamine therapy is generally safe.
                Most side effects are temporary and resolve shortly after treatment.
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-amber-800 mb-2">Important Note</h3>
                  <p className="text-amber-700">
                    Ketamine therapy is not appropriate for everyone. Your provider will conduct
                    a thorough evaluation to determine if you&apos;re a good candidate. People with
                    certain conditions like uncontrolled hypertension, active psychosis, or substance
                    use disorders may not be suitable candidates.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {sideEffects.map((item) => (
                <div
                  key={item.effect}
                  className="bg-slate-50 rounded-xl p-5 border border-slate-100"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-slate-900">{item.effect}</h3>
                    <Badge variant={item.common ? 'primary' : 'secondary'} size="sm">
                      {item.common ? 'Common' : 'Less Common'}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600">{item.description}</p>
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
              Ready to Take the Next Step?
            </h2>
            <p className="text-xl text-teal-100 mb-10 max-w-2xl mx-auto">
              Find a verified ketamine therapy provider near you and schedule a consultation
              to see if this treatment is right for you.
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
                href="/academy/patients/prepare"
                className="bg-teal-500/30 text-white border border-teal-400/50 hover:bg-teal-500/50 flex items-center justify-center gap-2"
              >
                Prepare for Treatment
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
