import { Suspense } from "react";
import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import {
  ProviderCard,
  ProviderCardSkeleton,
} from "@/components/sections/ProviderCard";
import { DirectoryFilters } from "@/components/sections/DirectoryFilters";

// Type definitions matching Prisma schema
type TreatmentType =
  | "IV_INFUSION"
  | "IM_INJECTION"
  | "NASAL_SPRAY"
  | "ORAL_SUBLINGUAL"
  | "KETAMINE_ASSISTED_PSYCHOTHERAPY";

type ConditionType =
  | "TREATMENT_RESISTANT_DEPRESSION"
  | "CHRONIC_PAIN"
  | "PTSD"
  | "ANXIETY"
  | "OCD"
  | "BIPOLAR_DEPRESSION"
  | "FIBROMYALGIA"
  | "CRPS"
  | "SUICIDAL_IDEATION";

type MembershipTier = "FREE" | "PROFESSIONAL" | "PREMIUM" | "ELITE" | "ENTERPRISE";

interface PractitionerWhereInput {
  membershipStatus?: string;
  isVerified?: boolean;
  OR?: Array<Record<string, unknown>>;
  treatments?: { some: { treatmentType: { in: TreatmentType[] } } };
  conditions?: { some: { condition: { in: ConditionType[] } } };
  membershipTier?: { in: MembershipTier[] };
  insurances?: { some: Record<string, never> };
}

interface PractitionerTreatment {
  id: string;
  treatmentType: string;
}

interface PractitionerResult {
  id: string;
  slug: string;
  firstName: string;
  lastName: string;
  title: string | null;
  credentials: string | null;
  practiceName: string | null;
  profileImage: string | null;
  city: string | null;
  state: string | null;
  rating: number;
  reviewCount: number;
  membershipTier: MembershipTier;
  isVerified: boolean;
  treatments: PractitionerTreatment[];
}

export const metadata: Metadata = {
  title: "Find a Provider | Ketamine Association",
  description:
    "Search our directory of verified ketamine therapy providers. Find qualified practitioners near you offering IV infusions, IM injections, Spravato, and ketamine-assisted psychotherapy.",
};

const ITEMS_PER_PAGE = 12;

interface SearchParams {
  page?: string;
  location?: string;
  treatments?: string;
  conditions?: string;
  distance?: string;
  tier?: string;
  insurance?: string;
  search?: string;
}

async function getPractitioners(searchParams: SearchParams) {
  const page = parseInt(searchParams.page || "1", 10);
  const skip = (page - 1) * ITEMS_PER_PAGE;

  // Build where clause - using Record<string, unknown> to avoid Prisma type conflicts
  const where: Record<string, unknown> = {
    membershipStatus: "ACTIVE",
    isVerified: true,
  };

  // Search by name or practice
  if (searchParams.search) {
    const searchTerm = searchParams.search;
    where.OR = [
      { firstName: { contains: searchTerm, mode: "insensitive" } },
      { lastName: { contains: searchTerm, mode: "insensitive" } },
      { practiceName: { contains: searchTerm, mode: "insensitive" } },
    ];
  }

  // Location filter
  if (searchParams.location) {
    const locationTerm = searchParams.location;
    const existingOR = Array.isArray(where.OR) ? where.OR : [];
    where.OR = [
      ...existingOR,
      { city: { contains: locationTerm, mode: "insensitive" } },
      { state: { contains: locationTerm, mode: "insensitive" } },
      { zipCode: { contains: locationTerm, mode: "insensitive" } },
    ];
  }

  // Treatment types filter
  if (searchParams.treatments) {
    const treatmentValues = searchParams.treatments.split(",") as TreatmentType[];
    where.treatments = {
      some: {
        treatmentType: { in: treatmentValues },
      },
    };
  }

  // Conditions filter
  if (searchParams.conditions) {
    const conditionValues = searchParams.conditions.split(",") as ConditionType[];
    where.conditions = {
      some: {
        condition: { in: conditionValues },
      },
    };
  }

  // Membership tier filter
  if (searchParams.tier) {
    const tierValues = searchParams.tier.split(",") as MembershipTier[];
    where.membershipTier = { in: tierValues };
  }

  // Insurance filter
  if (searchParams.insurance === "true") {
    where.insurances = {
      some: {},
    };
  }

  // Get total count for pagination
  const totalCount = await prisma.practitioner.count({ where });

  // Get practitioners with ordering: Premium/Elite first, then by rating
  const practitioners = await prisma.practitioner.findMany({
    where,
    include: {
      treatments: true,
      conditions: true,
      insurances: true,
    },
    orderBy: [
      {
        membershipTier: "desc", // ELITE > PREMIUM > PROFESSIONAL > FREE
      },
      {
        rating: "desc",
      },
      {
        reviewCount: "desc",
      },
    ],
    skip,
    take: ITEMS_PER_PAGE,
  });

  return {
    practitioners,
    totalCount,
    totalPages: Math.ceil(totalCount / ITEMS_PER_PAGE),
    currentPage: page,
  };
}

function Pagination({
  currentPage,
  totalPages,
  searchParams,
}: {
  currentPage: number;
  totalPages: number;
  searchParams: SearchParams;
}) {
  if (totalPages <= 1) return null;

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value && key !== "page") params.set(key, value);
    });
    params.set("page", page.toString());
    return `/association/directory?${params.toString()}`;
  };

  const pages = [];
  const showEllipsisStart = currentPage > 3;
  const showEllipsisEnd = currentPage < totalPages - 2;

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);
    if (showEllipsisStart) pages.push(-1); // -1 represents ellipsis
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      if (!pages.includes(i)) pages.push(i);
    }
    if (showEllipsisEnd) pages.push(-2); // -2 represents ellipsis
    if (!pages.includes(totalPages)) pages.push(totalPages);
  }

  return (
    <nav className="flex items-center justify-center gap-2 mt-8" aria-label="Pagination">
      <Link
        href={createPageUrl(currentPage - 1)}
        className={`px-3 py-2 rounded-lg border border-slate-300 text-sm font-medium transition-colors ${
          currentPage === 1
            ? "pointer-events-none opacity-50"
            : "hover:bg-slate-50 hover:border-slate-400"
        }`}
        aria-disabled={currentPage === 1}
      >
        Previous
      </Link>

      {pages.map((page, idx) =>
        page < 0 ? (
          <span key={`ellipsis-${idx}`} className="px-2 text-slate-400">
            ...
          </span>
        ) : (
          <Link
            key={page}
            href={createPageUrl(page)}
            className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
              page === currentPage
                ? "bg-teal-600 text-white"
                : "border border-slate-300 hover:bg-slate-50 hover:border-slate-400"
            }`}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </Link>
        )
      )}

      <Link
        href={createPageUrl(currentPage + 1)}
        className={`px-3 py-2 rounded-lg border border-slate-300 text-sm font-medium transition-colors ${
          currentPage === totalPages
            ? "pointer-events-none opacity-50"
            : "hover:bg-slate-50 hover:border-slate-400"
        }`}
        aria-disabled={currentPage === totalPages}
      >
        Next
      </Link>
    </nav>
  );
}

function SearchBar({ defaultValue }: { defaultValue?: string }) {
  return (
    <form action="/association/directory" method="GET" className="flex gap-3">
      <div className="flex-1 relative">
        <input
          type="text"
          name="search"
          placeholder="Search by provider name or practice..."
          defaultValue={defaultValue}
          className="w-full px-4 py-3 pl-12 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder:text-slate-400"
        />
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <Button type="submit">Search</Button>
    </form>
  );
}

function ProviderGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <ProviderCardSkeleton key={i} />
      ))}
    </div>
  );
}

async function ProviderGrid({ searchParams }: { searchParams: SearchParams }) {
  const { practitioners, totalCount, totalPages, currentPage } =
    await getPractitioners(searchParams);

  if (practitioners.length === 0) {
    return (
      <div className="text-center py-16 bg-slate-50 rounded-2xl">
        <svg
          className="w-16 h-16 mx-auto text-slate-300 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">
          No providers found
        </h3>
        <p className="text-slate-600 mb-6 max-w-md mx-auto">
          We could not find any providers matching your search criteria. Try
          adjusting your filters or search terms.
        </p>
        <Button href="/association/directory" variant="secondary">
          Clear Filters
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* Results Count */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-slate-600">
          Showing{" "}
          <span className="font-semibold text-slate-900">
            {(currentPage - 1) * ITEMS_PER_PAGE + 1}
          </span>{" "}
          -{" "}
          <span className="font-semibold text-slate-900">
            {Math.min(currentPage * ITEMS_PER_PAGE, totalCount)}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-slate-900">{totalCount}</span>{" "}
          providers
        </p>
      </div>

      {/* Provider Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {practitioners.map((practitioner: PractitionerResult) => (
          <ProviderCard
            key={practitioner.id}
            id={practitioner.id}
            slug={practitioner.slug}
            firstName={practitioner.firstName}
            lastName={practitioner.lastName}
            title={practitioner.title}
            credentials={practitioner.credentials}
            practiceName={practitioner.practiceName}
            profileImage={practitioner.profileImage}
            city={practitioner.city}
            state={practitioner.state}
            rating={practitioner.rating}
            reviewCount={practitioner.reviewCount}
            membershipTier={practitioner.membershipTier}
            isVerified={practitioner.isVerified}
            treatments={practitioner.treatments.map((t: { treatmentType: string }) => t.treatmentType)}
          />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        searchParams={searchParams}
      />
    </>
  );
}

export default async function DirectoryPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-700 via-teal-600 to-teal-800 text-white py-16">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find a Ketamine Provider
            </h1>
            <p className="text-xl text-teal-100 mb-8">
              Search our directory of verified ketamine therapy practitioners to
              find qualified providers in your area.
            </p>
            <div className="max-w-2xl mx-auto">
              <SearchBar defaultValue={params.search} />
            </div>
          </div>
        </Container>
      </section>

      {/* Directory Content */}
      <section className="py-12">
        <Container>
          <div className="lg:grid lg:grid-cols-4 lg:gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1 mb-8 lg:mb-0">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sticky top-6">
                <h2 className="text-lg font-bold text-slate-900 mb-6">
                  Filter Results
                </h2>
                <Suspense fallback={<div className="animate-pulse h-96 bg-slate-100 rounded-lg" />}>
                  <DirectoryFilters />
                </Suspense>
              </div>
            </div>

            {/* Results Grid */}
            <div className="lg:col-span-3">
              <Suspense fallback={<ProviderGridSkeleton />}>
                <ProviderGrid searchParams={params} />
              </Suspense>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white border-t border-slate-200">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Are you a ketamine provider?
            </h2>
            <p className="text-slate-600 mb-6">
              Join our professional network to connect with patients seeking
              ketamine therapy and grow your practice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/association/membership" size="lg">
                Join the Association
              </Button>
              <Button href="/association/membership" variant="secondary" size="lg">
                Learn About Membership
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
