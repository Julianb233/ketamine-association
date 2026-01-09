import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { practitionerUpdateSchema } from "@/lib/validations";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    // Find by ID or slug
    const practitioner = await prisma.practitioner.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
      include: {
        user: {
          select: {
            email: true,
            name: true,
          },
        },
        treatments: {
          select: { treatmentType: true },
        },
        conditions: {
          select: { condition: true },
        },
        insurances: {
          select: { insuranceName: true },
        },
        certifications: {
          select: {
            certificationType: true,
            issuedAt: true,
            expiresAt: true,
          },
          orderBy: { issuedAt: "desc" },
        },
        reviews: {
          where: { isPublished: true },
          select: {
            id: true,
            rating: true,
            title: true,
            content: true,
            isVerified: true,
            createdAt: true,
          },
          orderBy: { createdAt: "desc" },
          take: 5,
        },
      },
    });

    if (!practitioner) {
      return NextResponse.json(
        { error: "Practitioner not found" },
        { status: 404 }
      );
    }

    // Increment profile views (fire and forget)
    prisma.practitioner
      .update({
        where: { id: practitioner.id },
        data: { profileViews: { increment: 1 } },
      })
      .catch(() => {});

    // Format response
    const response = {
      id: practitioner.id,
      slug: practitioner.slug,
      name: `${practitioner.title ? practitioner.title + " " : ""}${practitioner.firstName} ${practitioner.lastName}${practitioner.credentials ? ", " + practitioner.credentials : ""}`,
      title: practitioner.title,
      firstName: practitioner.firstName,
      lastName: practitioner.lastName,
      credentials: practitioner.credentials,
      specialty: practitioner.specialty,
      bio: practitioner.bio,
      profileImage: practitioner.profileImage,
      practice: {
        name: practitioner.practiceName,
        address: practitioner.address,
        city: practitioner.city,
        state: practitioner.state,
        zipCode: practitioner.zipCode,
        phone: practitioner.phone,
        website: practitioner.website,
      },
      location: {
        latitude: practitioner.latitude,
        longitude: practitioner.longitude,
      },
      membership: {
        tier: practitioner.membershipTier,
        status: practitioner.membershipStatus,
      },
      verification: {
        isVerified: practitioner.isVerified,
        verifiedAt: practitioner.verifiedAt,
        licenseNumber: practitioner.licenseNumber,
        licenseState: practitioner.licenseState,
        npiNumber: practitioner.npiNumber,
      },
      stats: {
        rating: practitioner.rating,
        reviewCount: practitioner.reviewCount,
        profileViews: practitioner.profileViews,
      },
      treatments: practitioner.treatments.map((t) => t.treatmentType),
      conditions: practitioner.conditions.map((c) => c.condition),
      insurances: practitioner.insurances.map((i) => i.insuranceName),
      certifications: practitioner.certifications.map((c) => ({
        type: c.certificationType,
        issuedAt: c.issuedAt,
        expiresAt: c.expiresAt,
      })),
      recentReviews: practitioner.reviews,
      createdAt: practitioner.createdAt,
      updatedAt: practitioner.updatedAt,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching practitioner:", error);
    return NextResponse.json(
      { error: "Failed to fetch practitioner" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    // Check authentication
    const supabase = await createClient();
    const { data: { user: authUser } } = await supabase.auth.getUser();
    const userId = authUser?.id;
    if (!userId) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Find practitioner and verify ownership
    const practitioner = await prisma.practitioner.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
      include: {
        user: true,
      },
    });

    if (!practitioner) {
      return NextResponse.json(
        { error: "Practitioner not found" },
        { status: 404 }
      );
    }

    // Get user from our database using Clerk userId
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user || practitioner.userId !== user.id) {
      return NextResponse.json(
        { error: "Not authorized to update this profile" },
        { status: 403 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validationResult = practitionerUpdateSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid data", details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const { treatments, conditions, insurances, ...updateData } =
      validationResult.data;

    // Start transaction for updates
    const updatedPractitioner = await prisma.$transaction(async (tx) => {
      // Update basic practitioner data
      const updated = await tx.practitioner.update({
        where: { id: practitioner.id },
        data: updateData,
      });

      // Update treatments if provided
      if (treatments !== undefined) {
        await tx.practitionerTreatment.deleteMany({
          where: { practitionerId: practitioner.id },
        });
        if (treatments.length > 0) {
          await tx.practitionerTreatment.createMany({
            data: treatments.map((t) => ({
              practitionerId: practitioner.id,
              treatmentType: t,
            })),
          });
        }
      }

      // Update conditions if provided
      if (conditions !== undefined) {
        await tx.practitionerCondition.deleteMany({
          where: { practitionerId: practitioner.id },
        });
        if (conditions.length > 0) {
          await tx.practitionerCondition.createMany({
            data: conditions.map((c) => ({
              practitionerId: practitioner.id,
              condition: c,
            })),
          });
        }
      }

      // Update insurances if provided
      if (insurances !== undefined) {
        await tx.practitionerInsurance.deleteMany({
          where: { practitionerId: practitioner.id },
        });
        if (insurances.length > 0) {
          await tx.practitionerInsurance.createMany({
            data: insurances.map((i) => ({
              practitionerId: practitioner.id,
              insuranceName: i,
            })),
          });
        }
      }

      return updated;
    });

    return NextResponse.json({
      message: "Profile updated successfully",
      practitioner: {
        id: updatedPractitioner.id,
        slug: updatedPractitioner.slug,
      },
    });
  } catch (error) {
    console.error("Error updating practitioner:", error);
    return NextResponse.json(
      { error: "Failed to update practitioner" },
      { status: 500 }
    );
  }
}
