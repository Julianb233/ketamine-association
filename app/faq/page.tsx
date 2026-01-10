'use client';

import { useState } from 'react';
import {
  ChevronDown,
  Users,
  Stethoscope,
  Building2,
  HelpCircle,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSection {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  items: FAQItem[];
}

const faqSections: FAQSection[] = [
  {
    title: 'For Patients',
    icon: Users,
    color: 'teal',
    items: [
      {
        question: 'What is ketamine therapy?',
        answer: 'Ketamine therapy is a treatment that uses ketamine, originally developed as an anesthetic, to treat various mental health conditions including treatment-resistant depression, PTSD, anxiety, and chronic pain. It works differently than traditional antidepressants, often providing relief within hours to days rather than weeks.',
      },
      {
        question: 'Is ketamine therapy safe?',
        answer: 'When administered by qualified providers in a clinical setting, ketamine therapy is generally safe. All providers in our directory are verified and credentialed. Common side effects during treatment may include dissociation, dizziness, and nausea, which typically resolve shortly after the session.',
      },
      {
        question: 'How much does ketamine therapy cost?',
        answer: 'Costs vary by provider, location, and treatment type. IV infusions typically range from $400-800 per session, while other methods like nasal spray or oral tablets may cost less. Some providers offer package pricing. Most insurance does not cover ketamine therapy, though some providers offer financing options.',
      },
      {
        question: 'How many treatments will I need?',
        answer: 'Treatment protocols vary by condition and individual response. For depression, many providers recommend an initial series of 6 infusions over 2-3 weeks, followed by maintenance treatments as needed. Your provider will create a personalized treatment plan based on your specific needs.',
      },
      {
        question: 'What conditions can ketamine therapy treat?',
        answer: 'Ketamine therapy has shown effectiveness for treatment-resistant depression, PTSD, anxiety disorders, OCD, bipolar depression, chronic pain conditions like fibromyalgia and CRPS, and suicidal ideation. Research is ongoing for additional applications.',
      },
      {
        question: 'What should I expect during treatment?',
        answer: 'During a ketamine session, you&apos;ll be in a comfortable clinical setting monitored by medical staff. Sessions typically last 40-60 minutes for IV infusions. You may experience altered perceptions, relaxation, or mild dissociation. You&apos;ll need someone to drive you home afterward.',
      },
    ],
  },
  {
    title: 'For Practitioners',
    icon: Stethoscope,
    color: 'emerald',
    items: [
      {
        question: 'How do I become a verified provider?',
        answer: 'To become a verified provider, you&apos;ll need to submit your medical credentials, licensing information, and proof of ketamine therapy training. Our verification team reviews all applications within 5-7 business days. Membership is available at various tiers depending on your practice needs.',
      },
      {
        question: 'What certification programs do you offer?',
        answer: 'We offer several certification levels: Foundational (basic ketamine administration), Advanced (complex cases and protocols), KAP Specialty (ketamine-assisted psychotherapy), Practice Leadership, and Master Practitioner. Each program includes didactic learning, practical training, and examination.',
      },
      {
        question: 'How does lead generation work?',
        answer: 'Verified providers receive patient inquiries through our directory. Lead volume depends on your membership tier: Professional members receive up to 5 leads/month, Premium members up to 20 leads/month, and Elite members receive unlimited leads. Higher tiers also get priority placement in search results.',
      },
      {
        question: 'What are the membership benefits?',
        answer: 'Membership benefits include directory listing, patient leads, access to educational resources and CE credits, invitations to exclusive events, networking opportunities, practice management tools, marketing support, and legal/regulatory updates specific to ketamine therapy.',
      },
      {
        question: 'Do you offer continuing education credits?',
        answer: 'Yes, we partner with accredited CE providers to offer continuing education credits. Members get discounted access to our CE library, webinars, and annual conference. Premium and Elite members receive complimentary CE credits as part of their membership.',
      },
      {
        question: 'Can I contribute articles to the blog?',
        answer: 'Absolutely! We encourage member practitioners to share their expertise. Articles go through our editorial review process and, once published, can help establish you as a thought leader in the field. Published authors also receive enhanced visibility in our directory.',
      },
    ],
  },
  {
    title: 'About the Association',
    icon: Building2,
    color: 'amber',
    items: [
      {
        question: 'What is the Ketamine Association?',
        answer: 'The Ketamine Association is the nation&apos;s leading professional organization for ketamine therapy practitioners. We establish industry standards, provide education and certification, connect patients with verified providers, and advocate for safe, accessible ketamine therapy.',
      },
      {
        question: 'How are providers verified?',
        answer: 'Our verification process includes credential verification (medical license, DEA registration, malpractice insurance), training verification (ketamine-specific training documentation), background checks, and ongoing compliance monitoring. This ensures patients connect with qualified professionals.',
      },
      {
        question: 'What membership tiers are available?',
        answer: 'We offer Free (basic listing), Professional ($99/month), Premium ($249/month), and Elite ($499/month) tiers. Each tier includes progressively more features including leads, directory placement, CE credits, marketing tools, and event access. Annual billing saves 20%.',
      },
      {
        question: 'Do you host events?',
        answer: 'Yes! We host an annual conference, regional meetups, educational webinars, and networking events throughout the year. Members receive discounted or complimentary access depending on their tier. Events feature leading researchers, practitioners, and industry experts.',
      },
      {
        question: 'How can I stay updated on ketamine therapy developments?',
        answer: 'Subscribe to our newsletter for weekly updates on research, regulatory changes, and industry news. Members also have access to our research library and exclusive content. Follow us on social media for daily insights and community discussions.',
      },
      {
        question: 'Is the Ketamine Association affiliated with any medical organizations?',
        answer: 'We partner with several medical and mental health organizations to advance ketamine therapy standards. While we are an independent professional association, we collaborate with academic institutions, research centers, and policy organizations to promote safe, evidence-based care.',
      },
    ],
  },
];

function FAQAccordion({ section }: { section: FAQSection }) {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const colorClasses = {
    teal: 'bg-teal-100 text-teal-600',
    emerald: 'bg-emerald-100 text-emerald-600',
    amber: 'bg-amber-100 text-amber-600',
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-lg overflow-hidden">
      <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl ${colorClasses[section.color as keyof typeof colorClasses]} flex items-center justify-center`}>
          <section.icon className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">{section.title}</h2>
      </div>
      <div className="divide-y divide-slate-100">
        {section.items.map((item, index) => (
          <div key={index}>
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
            >
              <span className="text-lg font-medium text-slate-900 pr-4">{item.question}</span>
              <ChevronDown
                className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${
                  openItems.includes(index) ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openItems.includes(index) && (
              <div className="px-6 pb-5 text-slate-600 leading-relaxed">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FAQPage() {
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
              <HelpCircle className="w-4 h-4 mr-2" />
              FAQ
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Frequently Asked Questions
            </h1>

            <p className="text-xl text-teal-100 mb-10 max-w-2xl mx-auto">
              Find answers to common questions about ketamine therapy, our association,
              and how we can help you on your journey.
            </p>
          </div>
        </Container>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-16 sm:h-24">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-20 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto space-y-12">
            {faqSections.map((section) => (
              <FAQAccordion key={section.title} section={section} />
            ))}
          </div>
        </Container>
      </section>

      {/* Still Have Questions CTA */}
      <section className="py-20 bg-slate-50">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Still Have Questions?
            </h2>
            <p className="text-xl text-slate-600 mb-10">
              Can&apos;t find what you&apos;re looking for? Our team is here to help.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                size="lg"
                href="/contact"
                className="flex items-center justify-center gap-2"
              >
                Contact Us
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button
                variant="secondary"
                size="lg"
                href="/providers"
                className="flex items-center justify-center gap-2"
              >
                Find a Provider
              </Button>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-teal-500" />
                <span>Response within 24 hours</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-teal-500" />
                <span>Expert support team</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-teal-500" />
                <span>Here to help</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Join CTA */}
      <section className="py-20 bg-gradient-to-br from-teal-700 via-teal-600 to-emerald-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <Container className="relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-teal-100 mb-10 max-w-2xl mx-auto">
              Join thousands of practitioners and patients who trust the Ketamine Association.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                size="lg"
                href="/association/membership"
                className="bg-white text-teal-700 hover:bg-teal-50"
              >
                Join as Practitioner
              </Button>
              <Button
                size="lg"
                href="/providers"
                className="bg-teal-500/30 text-white border border-teal-400/50 hover:bg-teal-500/50"
              >
                Find a Provider
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
