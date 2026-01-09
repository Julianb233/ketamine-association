"use client";

import { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

// Enums from Prisma schema
const TREATMENT_TYPES = [
  { value: "IV_INFUSION", label: "IV Infusion" },
  { value: "IM_INJECTION", label: "IM Injection" },
  { value: "NASAL_SPRAY", label: "Nasal Spray (Spravato)" },
  { value: "ORAL_SUBLINGUAL", label: "Oral/Sublingual" },
  { value: "KETAMINE_ASSISTED_PSYCHOTHERAPY", label: "Ketamine-Assisted Psychotherapy" },
] as const;

const CONDITION_TYPES = [
  { value: "TREATMENT_RESISTANT_DEPRESSION", label: "Treatment-Resistant Depression" },
  { value: "CHRONIC_PAIN", label: "Chronic Pain" },
  { value: "PTSD", label: "PTSD" },
  { value: "ANXIETY", label: "Anxiety" },
  { value: "OCD", label: "OCD" },
  { value: "BIPOLAR_DEPRESSION", label: "Bipolar Depression" },
  { value: "FIBROMYALGIA", label: "Fibromyalgia" },
  { value: "CRPS", label: "CRPS" },
  { value: "SUICIDAL_IDEATION", label: "Suicidal Ideation" },
] as const;

const MEMBERSHIP_TIERS = [
  { value: "FREE", label: "Free" },
  { value: "PROFESSIONAL", label: "Professional" },
  { value: "PREMIUM", label: "Premium" },
  { value: "ELITE", label: "Elite" },
  { value: "ENTERPRISE", label: "Enterprise" },
] as const;

const DISTANCE_OPTIONS = [
  { value: "10", label: "10 miles" },
  { value: "25", label: "25 miles" },
  { value: "50", label: "50 miles" },
  { value: "100", label: "100 miles" },
  { value: "any", label: "Any distance" },
] as const;

interface DirectoryFiltersProps {
  className?: string;
}

interface MultiSelectProps {
  label: string;
  options: readonly { value: string; label: string }[];
  selected: string[];
  onChange: (values: string[]) => void;
}

function MultiSelect({ label, options, selected, onChange }: MultiSelectProps) {
  const toggleOption = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="space-y-3">
      <h4 className="font-medium text-slate-900">{label}</h4>
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div
              className={cn(
                "w-5 h-5 rounded border-2 flex items-center justify-center transition-colors",
                selected.includes(option.value)
                  ? "bg-teal-600 border-teal-600"
                  : "border-slate-300 group-hover:border-teal-400"
              )}
            >
              {selected.includes(option.value) && (
                <svg
                  className="w-3 h-3 text-white"
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
              )}
            </div>
            <span
              className={cn(
                "text-sm transition-colors",
                selected.includes(option.value)
                  ? "text-slate-900 font-medium"
                  : "text-slate-600"
              )}
            >
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

export function DirectoryFilters({ className }: DirectoryFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize state from URL params
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [treatments, setTreatments] = useState<string[]>(
    searchParams.get("treatments")?.split(",").filter(Boolean) || []
  );
  const [conditions, setConditions] = useState<string[]>(
    searchParams.get("conditions")?.split(",").filter(Boolean) || []
  );
  const [distance, setDistance] = useState(
    searchParams.get("distance") || "any"
  );
  const [membershipTier, setMembershipTier] = useState<string[]>(
    searchParams.get("tier")?.split(",").filter(Boolean) || []
  );
  const [acceptsInsurance, setAcceptsInsurance] = useState(
    searchParams.get("insurance") === "true"
  );

  const applyFilters = useCallback(() => {
    const params = new URLSearchParams();

    if (location) params.set("location", location);
    if (treatments.length > 0) params.set("treatments", treatments.join(","));
    if (conditions.length > 0) params.set("conditions", conditions.join(","));
    if (distance !== "any") params.set("distance", distance);
    if (membershipTier.length > 0) params.set("tier", membershipTier.join(","));
    if (acceptsInsurance) params.set("insurance", "true");

    // Reset to page 1 when filters change
    params.set("page", "1");

    router.push(`/association/directory?${params.toString()}`);
  }, [location, treatments, conditions, distance, membershipTier, acceptsInsurance, router]);

  const clearFilters = useCallback(() => {
    setLocation("");
    setTreatments([]);
    setConditions([]);
    setDistance("any");
    setMembershipTier([]);
    setAcceptsInsurance(false);
    router.push("/association/directory");
  }, [router]);

  const hasActiveFilters =
    location ||
    treatments.length > 0 ||
    conditions.length > 0 ||
    distance !== "any" ||
    membershipTier.length > 0 ||
    acceptsInsurance;

  return (
    <aside className={cn("space-y-6", className)}>
      {/* Location Search */}
      <div className="space-y-3">
        <h4 className="font-medium text-slate-900">Location</h4>
        <div className="relative">
          <Input
            type="text"
            placeholder="City, State or ZIP"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pr-10"
          />
          <svg
            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
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
        </div>
      </div>

      {/* Distance */}
      <div className="space-y-3">
        <h4 className="font-medium text-slate-900">Distance</h4>
        <select
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        >
          {DISTANCE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Treatment Types */}
      <MultiSelect
        label="Treatment Types"
        options={TREATMENT_TYPES}
        selected={treatments}
        onChange={setTreatments}
      />

      {/* Conditions Treated */}
      <MultiSelect
        label="Conditions Treated"
        options={CONDITION_TYPES}
        selected={conditions}
        onChange={setConditions}
      />

      {/* Membership Tier */}
      <MultiSelect
        label="Membership Tier"
        options={MEMBERSHIP_TIERS}
        selected={membershipTier}
        onChange={setMembershipTier}
      />

      {/* Insurance */}
      <div className="space-y-3">
        <h4 className="font-medium text-slate-900">Insurance</h4>
        <label className="flex items-center gap-3 cursor-pointer group">
          <div
            className={cn(
              "w-5 h-5 rounded border-2 flex items-center justify-center transition-colors",
              acceptsInsurance
                ? "bg-teal-600 border-teal-600"
                : "border-slate-300 group-hover:border-teal-400"
            )}
          >
            {acceptsInsurance && (
              <svg
                className="w-3 h-3 text-white"
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
            )}
          </div>
          <span className="text-sm text-slate-600">Accepts Insurance</span>
        </label>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pt-4 border-t border-slate-200">
        <Button onClick={applyFilters} fullWidth>
          Apply Filters
        </Button>
        {hasActiveFilters && (
          <Button onClick={clearFilters} variant="ghost" fullWidth>
            Clear All Filters
          </Button>
        )}
      </div>
    </aside>
  );
}

export { TREATMENT_TYPES, CONDITION_TYPES, MEMBERSHIP_TIERS, DISTANCE_OPTIONS };
