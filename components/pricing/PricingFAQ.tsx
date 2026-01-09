"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "How does the billing work?",
    answer:
      "You can choose between monthly or annual billing. Annual billing gives you a 20% discount on all paid tiers. Your subscription will automatically renew at the end of each billing period unless cancelled.",
  },
  {
    question: "Can I change my plan at any time?",
    answer:
      "Yes! You can upgrade or downgrade your plan at any time. When upgrading, you'll be charged the prorated difference for the remainder of your billing period. When downgrading, the change will take effect at the start of your next billing period.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express, Discover) through our secure payment processor, Stripe. We also support ACH bank transfers for annual plans.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "We offer a free tier that never expires, so you can explore our platform without commitment. Paid plans also include a 14-day money-back guarantee if you're not satisfied.",
  },
  {
    question: "What happens to my leads if I downgrade?",
    answer:
      "Your existing lead history and data will remain in your account. However, your monthly lead allocation will be adjusted to match your new plan level. Any unused leads from your current billing period do not roll over.",
  },
  {
    question: "Can I cancel my subscription?",
    answer:
      "You can cancel your subscription at any time from your account settings. After cancellation, you'll retain access to your paid features until the end of your current billing period, after which your account will revert to the Free tier.",
  },
  {
    question: "Do you offer discounts for non-profits or educational institutions?",
    answer:
      "Yes! We offer a 30% discount for verified non-profit organizations and educational institutions. Contact our support team with documentation to apply for this discount.",
  },
  {
    question: "What is included in 'Dedicated Support'?",
    answer:
      "Elite members receive dedicated support including a personal account manager, priority email and phone support with guaranteed response times, and quarterly strategy sessions to help grow your practice.",
  },
  {
    question: "How are 'leads' counted?",
    answer:
      "A lead is counted each time a potential patient submits an inquiry through your profile or directory listing. Each unique inquiry counts as one lead, regardless of how many messages are exchanged with that potential patient.",
  },
  {
    question: "Can I get a refund?",
    answer:
      "We offer a 14-day money-back guarantee for new subscriptions. If you're not satisfied within the first 14 days, contact our support team for a full refund. Refunds are not available after the 14-day period.",
  },
];

function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-slate-200 last:border-0">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-4 text-left transition-colors hover:text-teal-600"
        aria-expanded={isOpen}
      >
        <span className="text-base font-medium text-slate-900 pr-4">
          {item.question}
        </span>
        <ChevronDown
          className={cn(
            "h-5 w-5 flex-shrink-0 text-slate-500 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-200",
          isOpen ? "max-h-96 pb-4" : "max-h-0"
        )}
      >
        <p className="text-sm text-slate-600 leading-relaxed">{item.answer}</p>
      </div>
    </div>
  );
}

export function PricingFAQ() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <div className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white px-6">
      {faqItems.map((item, index) => (
        <AccordionItem
          key={index}
          item={item}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}
    </div>
  );
}
