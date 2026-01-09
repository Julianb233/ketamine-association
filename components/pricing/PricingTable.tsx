"use client";

import * as React from "react";
import { Check, X, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

interface FeatureRow {
  feature: string;
  free: string | boolean | number;
  professional: string | boolean | number;
  premium: string | boolean | number;
  elite: string | boolean | number;
}

const features: FeatureRow[] = [
  {
    feature: "Directory Listing",
    free: "Basic",
    professional: "Enhanced",
    premium: "Featured",
    elite: "Top Placement",
  },
  {
    feature: "Profile Page",
    free: true,
    professional: true,
    premium: true,
    elite: true,
  },
  {
    feature: "Monthly Leads",
    free: 0,
    professional: 5,
    premium: 20,
    elite: "Unlimited",
  },
  {
    feature: "Article Publishing",
    free: 0,
    professional: "2/month",
    premium: "5/month",
    elite: "Unlimited",
  },
  {
    feature: "Event Submissions",
    free: 0,
    professional: "1/month",
    premium: "3/month",
    elite: "Unlimited",
  },
  {
    feature: "Analytics Dashboard",
    free: false,
    professional: "Basic",
    premium: "Advanced",
    elite: "Advanced",
  },
  {
    feature: "Badge Display",
    free: false,
    professional: true,
    premium: true,
    elite: true,
  },
  {
    feature: "Priority Listing",
    free: false,
    professional: true,
    premium: true,
    elite: true,
  },
  {
    feature: "CE Credit Discounts",
    free: false,
    professional: false,
    premium: "10%",
    elite: "20%",
  },
  {
    feature: "Event Discounts",
    free: false,
    professional: false,
    premium: "15%",
    elite: "25%",
  },
  {
    feature: "Community Access",
    free: true,
    professional: true,
    premium: true,
    elite: true,
  },
  {
    feature: "Speaking Opportunities",
    free: false,
    professional: false,
    premium: false,
    elite: true,
  },
  {
    feature: "Research Collaboration",
    free: false,
    professional: false,
    premium: false,
    elite: true,
  },
  {
    feature: "Co-Marketing",
    free: false,
    professional: false,
    premium: false,
    elite: true,
  },
  {
    feature: "Support Level",
    free: "Community",
    professional: "Email",
    premium: "Priority",
    elite: "Dedicated",
  },
];

function renderCellValue(value: string | boolean | number) {
  if (value === true) {
    return <Check className="h-5 w-5 text-teal-500 mx-auto" strokeWidth={2.5} />;
  }
  if (value === false) {
    return <X className="h-5 w-5 text-slate-300 mx-auto" />;
  }
  if (value === 0) {
    return <Minus className="h-5 w-5 text-slate-300 mx-auto" />;
  }
  return <span className="text-slate-700 font-medium">{value}</span>;
}

export function PricingTable() {
  const tiers = [
    { key: "free" as const, name: "Free", price: "$0" },
    { key: "professional" as const, name: "Professional", price: "$99" },
    { key: "premium" as const, name: "Premium", price: "$249", isPopular: true },
    { key: "elite" as const, name: "Elite", price: "$449" },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-slate-200">
            <th className="py-4 px-4 text-left text-sm font-semibold text-slate-700 w-1/3">
              Features
            </th>
            {tiers.map((tier) => (
              <th
                key={tier.key}
                className={cn(
                  "py-4 px-4 text-center text-sm font-semibold",
                  tier.isPopular
                    ? "bg-teal-50 text-teal-700"
                    : "text-slate-700"
                )}
              >
                <div className="flex flex-col items-center gap-1">
                  <span>{tier.name}</span>
                  <span className="text-xs font-normal text-slate-500">
                    {tier.price}/mo
                  </span>
                  {tier.isPopular && (
                    <Badge variant="premium" size="sm" className="mt-1">
                      Popular
                    </Badge>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {features.map((row, index) => (
            <tr
              key={row.feature}
              className={cn(
                "border-b border-slate-100",
                index % 2 === 0 && "bg-slate-50/50"
              )}
            >
              <td className="py-3 px-4 text-sm text-slate-600">{row.feature}</td>
              {tiers.map((tier) => (
                <td
                  key={tier.key}
                  className={cn(
                    "py-3 px-4 text-center text-sm",
                    tier.isPopular && "bg-teal-50/50"
                  )}
                >
                  {renderCellValue(row[tier.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
