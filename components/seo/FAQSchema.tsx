/**
 * FAQSchema Component
 * Generates JSON-LD structured data for FAQ pages
 * Enables rich results in search with expandable Q&A format
 */

import type { FAQPageSchema, FAQItem } from '@/types/seo';

interface FAQSchemaProps {
  faqs: FAQItem[];
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
  const schema: FAQPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Pre-built FAQ collections for common pages
export const KETAMINE_GENERAL_FAQS: FAQItem[] = [
  {
    question: 'What is ketamine therapy?',
    answer:
      'Ketamine therapy is a medical treatment that uses low doses of ketamine, an FDA-approved anesthetic, to treat various mental health conditions including treatment-resistant depression, anxiety, PTSD, and chronic pain. The therapy is administered under medical supervision through various methods including IV infusion, intramuscular injection, or sublingual tablets.',
  },
  {
    question: 'Is ketamine therapy FDA approved?',
    answer:
      'Ketamine itself is FDA-approved as an anesthetic. For mental health treatment, it is used "off-label" by licensed medical providers. Spravato (esketamine nasal spray) is the only FDA-approved ketamine-based treatment specifically for treatment-resistant depression.',
  },
  {
    question: 'How does ketamine therapy work for depression?',
    answer:
      'Ketamine works differently from traditional antidepressants. It affects the glutamate system and promotes the formation of new neural connections (neuroplasticity). This can lead to rapid improvement in mood and depression symptoms, often within hours to days rather than weeks.',
  },
  {
    question: 'What conditions can ketamine therapy treat?',
    answer:
      'Ketamine therapy has shown effectiveness for treatment-resistant depression, major depressive disorder, anxiety disorders, PTSD, OCD, chronic pain conditions including fibromyalgia and CRPS, and suicidal ideation. Effectiveness varies by individual and condition.',
  },
  {
    question: 'How long does a ketamine treatment session last?',
    answer:
      'A typical IV ketamine infusion lasts about 40 minutes, with a total appointment time of 2-3 hours to allow for preparation and recovery. Intramuscular injections are shorter, while at-home sublingual treatments vary based on the protocol prescribed by your provider.',
  },
  {
    question: 'What are the side effects of ketamine therapy?',
    answer:
      'Common side effects during treatment include dissociation, dizziness, nausea, elevated blood pressure, and blurred vision. These effects are typically mild and resolve within 1-2 hours after treatment. Long-term side effects are rare when ketamine is administered appropriately by trained medical professionals.',
  },
  {
    question: 'How many ketamine treatments will I need?',
    answer:
      'Most treatment protocols involve an initial series of 6 infusions over 2-3 weeks for depression. After the initial series, maintenance treatments may be recommended every few weeks to months, depending on individual response and the condition being treated.',
  },
  {
    question: 'Is ketamine therapy covered by insurance?',
    answer:
      'Most private insurance does not cover ketamine infusions for mental health conditions as it is considered off-label use. However, Spravato (esketamine) may be covered by some insurance plans for treatment-resistant depression. Some providers offer financing options to help with costs.',
  },
];

export const PROVIDER_FAQS: FAQItem[] = [
  {
    question: 'How do I find a qualified ketamine therapy provider?',
    answer:
      "The Ketamine Association maintains a directory of certified ketamine therapy providers. Look for providers who are board-certified physicians, have specific training in ketamine therapy, and follow established safety protocols. Our directory allows you to search by location and filter by certifications.",
  },
  {
    question: 'What certifications should a ketamine provider have?',
    answer:
      'Qualified providers should be licensed medical professionals (MD, DO, NP, PA) with additional training in ketamine therapy. The Ketamine Association offers certification programs including Foundational, Advanced, and Master Practitioner certifications that indicate specific competencies in ketamine treatment.',
  },
  {
    question: 'What questions should I ask a potential ketamine provider?',
    answer:
      'Important questions include: What is your training and experience with ketamine therapy? What safety protocols do you follow? What is your treatment protocol? How do you handle emergencies? What integration support do you offer? What are the total costs including follow-up care?',
  },
];

export const MEMBERSHIP_FAQS: FAQItem[] = [
  {
    question: 'What are the benefits of Ketamine Association membership?',
    answer:
      'Membership benefits include listing in our provider directory, access to continuing education credits, discounts on certification programs, networking opportunities, practice resources, and marketing support. Premium tiers include enhanced directory placement and additional practice tools.',
  },
  {
    question: 'Who can become a member of the Ketamine Association?',
    answer:
      'Membership is open to licensed healthcare providers including physicians (MD/DO), nurse practitioners, physician assistants, psychiatrists, anesthesiologists, and other qualified medical professionals involved in ketamine therapy. We also offer patient and public memberships for education access.',
  },
  {
    question: 'How do I get listed in the provider directory?',
    answer:
      'Provider directory listings are included with Professional, Premium, and Elite membership tiers. After joining, complete your provider profile with your credentials, services offered, and practice information. Verified members receive a verification badge on their listing.',
  },
];

// Component that combines multiple FAQ sets
interface CombinedFAQSchemaProps {
  sections: {
    title?: string;
    faqs: FAQItem[];
  }[];
}

export function CombinedFAQSchema({ sections }: CombinedFAQSchemaProps) {
  const allFaqs = sections.flatMap((section) => section.faqs);
  return <FAQSchema faqs={allFaqs} />;
}

export default FAQSchema;
