"use client";

import * as React from "react";
import { Container } from "@/components/ui/Container";
import { PricingCard } from "@/components/pricing/PricingCard";
import { PricingTable } from "@/components/pricing/PricingTable";
import { PricingFAQ } from "@/components/pricing/PricingFAQ";
import { MEMBERSHIP_TIERS } from "@/lib/stripe";
import { cn } from "@/lib/utils";

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = React.useState(false);

  const tiers = [
    { key: "FREE" as const, isPopular: false },
    { key: "PROFESSIONAL" as const, isPopular: false },
    { key: "PREMIUM" as const, isPopular: true },
    { key: "ELITE" as const, isPopular: false },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <Container size="lg">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
              Membership Plans for Practitioners
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Choose the plan that best fits your practice. Get more leads,
              enhance your visibility, and grow your ketamine therapy practice.
            </p>

            {/* Billing Toggle */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <span
                className={cn(
                  "text-sm font-medium transition-colors",
                  !isAnnual ? "text-slate-900" : "text-slate-500"
                )}
              >
                Monthly
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={cn(
                  "relative inline-flex h-7 w-14 items-center rounded-full transition-colors",
                  isAnnual ? "bg-teal-500" : "bg-slate-300"
                )}
                role="switch"
                aria-checked={isAnnual}
                aria-label="Toggle annual billing"
              >
                <span
                  className={cn(
                    "inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform",
                    isAnnual ? "translate-x-8" : "translate-x-1"
                  )}
                />
              </button>
              <span
                className={cn(
                  "text-sm font-medium transition-colors",
                  isAnnual ? "text-slate-900" : "text-slate-500"
                )}
              >
                Annual
              </span>
              <span className="ml-2 inline-flex items-center rounded-full bg-teal-100 px-3 py-1 text-xs font-medium text-teal-700">
                Save 20%
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Pricing Cards */}
      <section className="pb-16 md:pb-24">
        <Container size="xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
            {tiers.map(({ key, isPopular }) => {
              const tier = MEMBERSHIP_TIERS[key];
              return (
                <PricingCard
                  key={key}
                  tierName={tier.name}
                  monthlyPrice={tier.monthlyPrice}
                  annualPrice={tier.annualPrice}
                  description={tier.description}
                  features={[...tier.features]}
                  isPopular={isPopular}
                  isAnnual={isAnnual}
                  onSelect={() => {
                    // Handle plan selection - integrate with Stripe checkout
                    console.log(`Selected ${tier.name} plan`);
                  }}
                />
              );
            })}
          </div>
        </Container>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-16 md:py-24 bg-white">
        <Container size="xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">
              Compare All Features
            </h2>
            <p className="mt-3 text-lg text-slate-600">
              See what each plan includes to find the perfect fit for your practice
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
            <PricingTable />
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-slate-50">
        <Container size="md">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-lg text-slate-600">
              Have questions? We have answers.
            </p>
          </div>
          <PricingFAQ />
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-teal-600 to-teal-500">
        <Container size="md">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">
              Ready to grow your practice?
            </h2>
            <p className="mt-4 text-lg text-teal-100">
              Join hundreds of ketamine therapy practitioners who trust the
              Ketamine Association to connect them with patients.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center h-12 px-8 rounded-lg bg-white text-teal-700 font-medium shadow-lg hover:bg-teal-50 transition-colors">
                Get Started Free
              </button>
              <button className="inline-flex items-center justify-center h-12 px-8 rounded-lg bg-teal-700/30 text-white font-medium border border-teal-400/50 hover:bg-teal-700/50 transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
