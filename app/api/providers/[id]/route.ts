import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Provider ID is required",
        },
        { status: 400 }
      );
    }

    // Find provider by ID or slug
    const provider = await prisma.practitioner.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
      include: {
        user: {
          select: {
            email: true,
            createdAt: true,
          },
        },
        treatments: true,
        conditions: true,
        insurances: true,
        certifications: {
          orderBy: { issuedAt: "desc" },
        },
        reviews: {
          where: { isPublished: true },
          orderBy: { createdAt: "desc" },
          take: 10,
          select: {
            id: true,
            rating: true,
            title: true,
            content: true,
            isVerified: true,
            createdAt: true,
          },
        },
      },
    });

    if (!provider) {
      return NextResponse.json(
        {
          success: false,
          error: "Provider not found",
        },
        { status: 404 }
      );
    }

    // Increment profile views counter (fire and forget)
    prisma.practitioner
      .update({
        where: { id: provider.id },
        data: { profileViews: { increment: 1 } },
      })
      .catch((error: unknown) => {
        console.error("Failed to increment profile views:", error);
      });

    // Transform provider for response
    const transformedProvider = {
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
      address: provider.address,
      city: provider.city,
      state: provider.state,
      zipCode: provider.zipCode,
      phone: provider.phone,
      website: provider.website,
      latitude: provider.latitude,
      longitude: provider.longitude,
      membershipTier: provider.membershipTier,
      isVerified: provider.isVerified,
      verifiedAt: provider.verifiedAt,
      rating: provider.rating,
      reviewCount: provider.reviewCount,
      profileViews: provider.profileViews,
      createdAt: provider.createdAt,
      treatments: provider.treatments.map((t: { treatmentType: string }) => t.treatmentType),
      conditions: provider.conditions.map((c: { condition: string }) => c.condition),
      insurances: provider.insurances.map((i: { insuranceName: string }) => i.insuranceName),
      certifications: provider.certifications.map((cert: { id: string; certificationType: string; issuedAt: Date; expiresAt: Date | null; certificateUrl: string | null }) => ({
        id: cert.id,
        type: cert.certificationType,
        issuedAt: cert.issuedAt,
        expiresAt: cert.expiresAt,
        certificateUrl: cert.certificateUrl,
      })),
      reviews: provider.reviews,
      memberSince: provider.user.createdAt,
    };

    return NextResponse.json({
      success: true,
      data: transformedProvider,
    });
  } catch (error) {
    console.error("Provider fetch error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch provider",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
