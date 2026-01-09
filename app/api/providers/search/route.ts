import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const DEFAULT_PAGE_SIZE = 10;
const MAX_PAGE_SIZE = 50;

// Treatment types from Prisma schema
const TREATMENT_TYPES = [
  "IV_INFUSION",
  "IM_INJECTION",
  "NASAL_SPRAY",
  "ORAL_SUBLINGUAL",
  "KETAMINE_ASSISTED_PSYCHOTHERAPY",
] as const;

// Condition types from Prisma schema
const CONDITION_TYPES = [
  "TREATMENT_RESISTANT_DEPRESSION",
  "CHRONIC_PAIN",
  "PTSD",
  "ANXIETY",
  "OCD",
  "BIPOLAR_DEPRESSION",
  "FIBROMYALGIA",
  "CRPS",
  "SUICIDAL_IDEATION",
] as const;

type TreatmentType = (typeof TREATMENT_TYPES)[number];
type ConditionType = (typeof CONDITION_TYPES)[number];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // Parse query parameters
    const location = searchParams.get("location");
    const specialty = searchParams.get("specialty");
    const treatment = searchParams.get("treatment");
    const condition = searchParams.get("condition");
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(
      MAX_PAGE_SIZE,
      Math.max(1, parseInt(searchParams.get("limit") || String(DEFAULT_PAGE_SIZE), 10))
    );

    // Build where clause
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: Record<string, any> = {
      isVerified: true,
      membershipStatus: "ACTIVE",
    };

    // Location filter (city or state)
    if (location) {
      where.OR = [
        { city: { contains: location, mode: "insensitive" } },
        { state: { contains: location, mode: "insensitive" } },
        { zipCode: { startsWith: location } },
      ];
    }

    // Specialty filter
    if (specialty) {
      where.specialty = { contains: specialty, mode: "insensitive" };
    }

    // Treatment type filter
    if (treatment) {
      const treatmentUpper = treatment.toUpperCase().replace(/-/g, "_") as TreatmentType;
      if (TREATMENT_TYPES.includes(treatmentUpper)) {
        where.treatments = {
          some: {
            treatmentType: treatmentUpper,
          },
        };
      }
    }

    // Condition filter
    if (condition) {
      const conditionUpper = condition.toUpperCase().replace(/-/g, "_") as ConditionType;
      if (CONDITION_TYPES.includes(conditionUpper)) {
        where.conditions = {
          some: {
            condition: conditionUpper,
          },
        };
      }
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Execute queries in parallel
    const [providers, total] = await Promise.all([
      prisma.practitioner.findMany({
        where,
        include: {
          treatments: true,
          conditions: true,
          certifications: {
            orderBy: { issuedAt: "desc" },
          },
        },
        orderBy: [
          // Elite members first, then Premium, Professional, Free
          { membershipTier: "desc" },
          // Higher rated providers next
          { rating: "desc" },
          // Then by review count
          { reviewCount: "desc" },
        ],
        skip,
        take: limit,
      }),
      prisma.practitioner.count({ where }),
    ]);

    // Calculate pagination metadata
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    // Transform providers for response
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const transformedProviders = providers.map((provider: any) => ({
      id: provider.id,
      slug: provider.slug,
      title: provider.title,
      firstName: provider.firstName,
      lastName: provider.lastName,
      credentials: provider.credentials,
      specialty: provider.specialty,
      bio: provider.bio,
      profileImage: provider.profileImage,
      practiceName: provider.practiceName,
      city: provider.city,
      state: provider.state,
      rating: provider.rating,
      reviewCount: provider.reviewCount,
      membershipTier: provider.membershipTier,
      isVerified: provider.isVerified,
      treatments: provider.treatments.map((t: { treatmentType: string }) => t.treatmentType),
      conditions: provider.conditions.map((c: { condition: string }) => c.condition),
      certifications: provider.certifications.map((cert: { certificationType: string; issuedAt: Date; expiresAt: Date | null }) => ({
        type: cert.certificationType,
        issuedAt: cert.issuedAt,
        expiresAt: cert.expiresAt,
      })),
    }));

    return NextResponse.json({
      success: true,
      data: {
        providers: transformedProviders,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNextPage,
          hasPreviousPage,
        },
      },
    });
  } catch (error) {
    console.error("Provider search error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to search providers",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
