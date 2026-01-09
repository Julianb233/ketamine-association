"use client";

import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

// Treatment type display labels
const TREATMENT_LABELS: Record<string, string> = {
  IV_INFUSION: "IV Infusion",
  IM_INJECTION: "IM Injection",
  NASAL_SPRAY: "Nasal Spray",
  ORAL_SUBLINGUAL: "Oral/Sublingual",
  KETAMINE_ASSISTED_PSYCHOTHERAPY: "KAP",
};

export interface ProviderCardProps {
  id: string;
  slug: string;
  firstName: string;
  lastName: string;
  title?: string | null;
  credentials?: string | null;
  practiceName?: string | null;
  profileImage?: string | null;
  city?: string | null;
  state?: string | null;
  rating: number;
  reviewCount: number;
  membershipTier: "FREE" | "PROFESSIONAL" | "PREMIUM" | "ELITE" | "ENTERPRISE";
  isVerified: boolean;
  treatments: string[];
  className?: string;
}

function StarRating({ rating, count }: { rating: number; count: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={cn(
              "w-4 h-4",
              i < fullStars
                ? "text-amber-400 fill-amber-400"
                : i === fullStars && hasHalfStar
                ? "text-amber-400 fill-amber-400/50"
                : "text-slate-300 fill-slate-300"
            )}
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="text-sm text-slate-600">
        {rating.toFixed(1)} ({count} review{count !== 1 ? "s" : ""})
      </span>
    </div>
  );
}

export function ProviderCard({
  slug,
  firstName,
  lastName,
  title,
  credentials,
  practiceName,
  profileImage,
  city,
  state,
  rating,
  reviewCount,
  membershipTier,
  isVerified,
  treatments,
  className,
}: ProviderCardProps) {
  const fullName = `${title ? title + " " : ""}${firstName} ${lastName}${
    credentials ? ", " + credentials : ""
  }`;
  const location = city && state ? `${city}, ${state}` : city || state || "";
  const isFeatured =
    membershipTier === "PREMIUM" ||
    membershipTier === "ELITE" ||
    membershipTier === "ENTERPRISE";

  return (
    <Card
      hover
      className={cn(
        "relative overflow-hidden transition-all duration-300",
        isFeatured && "ring-2 ring-teal-500 ring-offset-2",
        className
      )}
    >
      {/* Featured Badge */}
      {isFeatured && (
        <div className="absolute top-0 right-0">
          <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg shadow-sm">
            Featured
          </div>
        </div>
      )}

      <div className="flex flex-col items-center text-center">
        {/* Avatar */}
        <div className="relative mb-4">
          <Avatar
            src={profileImage}
            name={`${firstName} ${lastName}`}
            size="xl"
            className="ring-4 ring-teal-50"
          />
          {isVerified && (
            <div
              className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-1 shadow-md"
              title="Verified Provider"
            >
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Name and Credentials */}
        <h3 className="text-lg font-bold text-slate-900 mb-1">{fullName}</h3>

        {/* Practice Name */}
        {practiceName && (
          <p className="text-sm text-slate-600 mb-2">{practiceName}</p>
        )}

        {/* Location */}
        {location && (
          <div className="flex items-center gap-1.5 text-sm text-slate-500 mb-3">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>{location}</span>
          </div>
        )}

        {/* Rating */}
        <div className="mb-4">
          <StarRating rating={rating} count={reviewCount} />
        </div>

        {/* Treatment Badges */}
        {treatments.length > 0 && (
          <div className="flex flex-wrap justify-center gap-1.5 mb-4">
            {treatments.slice(0, 3).map((treatment) => (
              <Badge key={treatment} variant="primary" size="sm">
                {TREATMENT_LABELS[treatment] || treatment}
              </Badge>
            ))}
            {treatments.length > 3 && (
              <Badge variant="outline" size="sm">
                +{treatments.length - 3} more
              </Badge>
            )}
          </div>
        )}

        {/* View Profile Button */}
        <Button
          href={`/association/${slug}`}
          variant="secondary"
          size="sm"
          className="mt-auto"
        >
          View Profile
        </Button>
      </div>
    </Card>
  );
}

export function ProviderCardSkeleton() {
  return (
    <Card className="animate-pulse">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 bg-slate-200 rounded-full mb-4" />
        <div className="h-5 bg-slate-200 rounded w-32 mb-2" />
        <div className="h-4 bg-slate-200 rounded w-24 mb-2" />
        <div className="h-4 bg-slate-200 rounded w-20 mb-3" />
        <div className="flex gap-1.5 mb-4">
          <div className="h-4 bg-slate-200 rounded w-24" />
        </div>
        <div className="flex gap-1.5 mb-4">
          <div className="h-6 bg-slate-200 rounded-full w-16" />
          <div className="h-6 bg-slate-200 rounded-full w-20" />
        </div>
        <div className="h-9 bg-slate-200 rounded-lg w-28" />
      </div>
    </Card>
  );
}
