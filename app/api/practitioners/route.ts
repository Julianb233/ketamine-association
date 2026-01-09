import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { practitionersQuerySchema } from "@/lib/validations";
import { Prisma } from "@prisma/client";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const queryParams = Object.fromEntries(searchParams.entries());

    // Validate query parameters
    const validationResult = practitionersQuerySchema.safeParse(queryParams);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid query parameters", details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const { page, limit, city, state, treatment, condition, tier, verified, search } =
      validationResult.data;

    // Build where clause
    const where: Prisma.PractitionerWhereInput = {
      membershipStatus: "ACTIVE",
    };

    if (city) {
      where.city = { equals: city, mode: "insensitive" };
    }

    if (state) {
      where.state = { equals: state.toUpperCase() };
    }

    if (tier) {
      where.membershipTier = tier;
    }

    if (verified !== undefined) {
      where.isVerified = verified;
    }

    if (treatment) {
      where.treatments = {
        some: { treatmentType: treatment },
      };
    }

    if (condition) {
      where.conditions = {
        some: { condition: condition },
      };
    }

    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: "insensitive" } },
        { lastName: { contains: search, mode: "insensitive" } },
        { practiceName: { contains: search, mode: "insensitive" } },
        { city: { contains: search, mode: "insensitive" } },
      ];
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Fetch practitioners with count
    const [practitioners, total] = await Promise.all([
      prisma.practitioner.findMany({
        where,
        select: {
          id: true,
          slug: true,
          title: true,
          firstName: true,
          lastName: true,
          credentials: true,
          specialty: true,
          profileImage: true,
          practiceName: true,
          city: true,
          state: true,
          membershipTier: true,
          isVerified: true,
          rating: true,
          reviewCount: true,
          treatments: {
            select: { treatmentType: true },
          },
          conditions: {
            select: { condition: true },
          },
        },
        orderBy: [
          // Premium/Elite members appear first
          { membershipTier: "desc" },
          // Then by rating
          { rating: "desc" },
          // Then by review count
          { reviewCount: "desc" },
        ],
        skip,
        take: limit,
      }),
      prisma.practitioner.count({ where }),
    ]);

    // Format response
    const formattedPractitioners = practitioners.map((p) => ({
      id: p.id,
      slug: p.slug,
      name: `${p.title ? p.title + " " : ""}${p.firstName} ${p.lastName}${p.credentials ? ", " + p.credentials : ""}`,
      specialty: p.specialty,
      profileImage: p.profileImage,
      practiceName: p.practiceName,
      location: `${p.city}, ${p.state}`,
      membershipTier: p.membershipTier,
      isVerified: p.isVerified,
      rating: p.rating,
      reviewCount: p.reviewCount,
      treatments: p.treatments.map((t) => t.treatmentType),
      conditions: p.conditions.map((c) => c.condition),
    }));

    return NextResponse.json({
      practitioners: formattedPractitioners,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: skip + practitioners.length < total,
      },
    });
  } catch (error) {
    console.error("Error fetching practitioners:", error);
    return NextResponse.json(
      { error: "Failed to fetch practitioners" },
      { status: 500 }
    );
  }
}
