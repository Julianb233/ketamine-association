import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

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

// Helper to categorize errors for better error messages
function categorizeError(error: unknown): { message: string; status: number } {
  // Check for connection errors first (in error message or name)
  if (error instanceof Error) {
    const errorMessage = error.message.toLowerCase();
    const errorName = error.name || "";

    if (
      errorMessage.includes("can't reach database") ||
      errorMessage.includes("connection refused") ||
      errorMessage.includes("econnrefused") ||
      errorMessage.includes("timeout") ||
      errorMessage.includes("connection timed out") ||
      errorName.includes("PrismaClientInitializationError")
    ) {
      return {
        message: "Database temporarily unavailable. Please try again later.",
        status: 503,
      };
    }
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // Handle known Prisma errors
    switch (error.code) {
      case "P2002":
        return { message: "A unique constraint was violated", status: 400 };
      case "P2025":
        return { message: "Record not found", status: 404 };
      default:
        return { message: `Database error: ${error.code}`, status: 500 };
    }
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    return {
      message: "Unable to connect to database. Please try again later.",
      status: 503,
    };
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return { message: "Invalid query parameters", status: 400 };
  }

  return {
    message: error instanceof Error ? error.message : "An unexpected error occurred",
    status: 500,
  };
}

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

    // Build where clause with proper Prisma typing
    const where: Prisma.PractitionerWhereInput = {
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

    // Execute queries in parallel with timeout
    const timeoutMs = 10000; // 10 second timeout
    const queryPromise = Promise.all([
      prisma.practitioner.findMany({
        where,
        include: {
          treatments: {
            select: {
              treatmentType: true,
            },
          },
          conditions: {
            select: {
              condition: true,
            },
          },
          certifications: {
            select: {
              certificationType: true,
              issuedAt: true,
              expiresAt: true,
            },
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

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Query timeout")), timeoutMs)
    );

    const [providers, total] = await Promise.race([queryPromise, timeoutPromise]);

    // Handle empty database gracefully
    if (providers.length === 0 && total === 0) {
      return NextResponse.json({
        success: true,
        data: {
          providers: [],
          pagination: {
            page,
            limit,
            total: 0,
            totalPages: 0,
            hasNextPage: false,
            hasPreviousPage: false,
          },
        },
        message: "No providers found matching your criteria",
      });
    }

    // Calculate pagination metadata
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    // Transform providers for response
    const transformedProviders = providers.map((provider) => ({
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
      treatments: provider.treatments.map((t) => t.treatmentType),
      conditions: provider.conditions.map((c) => c.condition),
      certifications: provider.certifications.map((cert) => ({
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

    const { message, status } = categorizeError(error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to search providers",
        message,
        ...(process.env.NODE_ENV === "development" && {
          debug: error instanceof Error ? error.stack : String(error),
        }),
      },
      { status }
    );
  }
}
