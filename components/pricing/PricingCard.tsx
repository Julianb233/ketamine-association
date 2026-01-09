"use client";

import * as React from "react";
import { Check, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export interface PricingCardProps {
  tierName: string;
  monthlyPrice: number;
  annualPrice: number;
  description: string;
  features: string[];
  isPopular?: boolean;
  isCurrentPlan?: boolean;
  isAnnual: boolean;
  onSelect?: () => void;
}

export function PricingCard({
  tierName,
  monthlyPrice,
  annualPrice,
  description,
  features,
  isPopular = false,
  isCurrentPlan = false,
  isAnnual,
  onSelect,
}: PricingCardProps) {
  const displayPrice = isAnnual ? Math.round(annualPrice / 12) : monthlyPrice;
  const isFree = monthlyPrice === 0;

  return (
    <Card
      variant={isPopular ? "elevated" : "bordered"}
      className={cn(
        "relative flex flex-col",
        isPopular && "ring-2 ring-teal-500 scale-[1.02]"
      )}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge variant="premium" icon={Star}>
            Most Popular
          </Badge>
        </div>
      )}

      <CardHeader className={cn(isPopular && "pt-8")}>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-slate-900">{tierName}</h3>
          {isCurrentPlan && (
            <Badge variant="success" size="sm">
              Current Plan
            </Badge>
          )}
        </div>
        <p className="text-sm text-slate-500">{description}</p>
      </CardHeader>

      <CardContent className="flex-1">
        <div className="mb-6">
          <div className="flex items-baseline">
            <span className="text-4xl font-bold text-slate-900">
              {isFree ? "Free" : `$${displayPrice}`}
            </span>
            {!isFree && (
              <span className="ml-2 text-slate-500">/month</span>
            )}
          </div>
          {!isFree && isAnnual && (
            <p className="mt-1 text-sm text-teal-600 font-medium">
              ${annualPrice}/year (Save 20%)
            </p>
          )}
          {!isFree && !isAnnual && (
            <p className="mt-1 text-sm text-slate-400">
              Billed monthly
            </p>
          )}
        </div>

        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check
                className="h-5 w-5 flex-shrink-0 text-teal-500 mt-0.5"
                strokeWidth={2.5}
              />
              <span className="text-sm text-slate-600">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="border-t-0 pt-0">
        <Button
          variant={isPopular ? "primary" : isCurrentPlan ? "outline" : "secondary"}
          size="lg"
          className="w-full"
          onClick={onSelect}
          disabled={isCurrentPlan}
        >
          {isCurrentPlan ? "Current Plan" : isFree ? "Get Started" : "Upgrade"}
        </Button>
      </CardFooter>
    </Card>
  );
}
