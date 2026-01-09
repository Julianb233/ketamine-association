import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { reviewsQuerySchema, createReviewSchema } from "@/lib/validations";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const queryParams = Object.fromEntries(searchParams.entries());
    const validationResult = reviewsQuerySchema.safeParse(queryParams);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid query parameters", details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const { practitionerId, page, limit } = validationResult.data;

    // Verify practitioner exists
    const practitioner = await prisma.practitioner.findUnique({
      where: { id: practitionerId },
      select: { id: true, rating: true, reviewCount: true },
    });

    if (!practitioner) {
      return NextResponse.json(
        { error: "Practitioner not found" },
        { status: 404 }
      );
    }

    const skip = (page - 1) * limit;

    // Fetch published reviews
    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
        where: {
          practitionerId,
          isPublished: true,
        },
        select: {
          id: true,
          rating: true,
          title: true,
          content: true,
          isVerified: true,
          createdAt: true,
          patient: {
            select: {
              firstName: true,
              lastName: true,
              city: true,
              state: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.review.count({
        where: {
          practitionerId,
          isPublished: true,
        },
      }),
    ]);

    // Format reviews (anonymize patient names)
    const formattedReviews = reviews.map((r) => ({
      id: r.id,
      rating: r.rating,
      title: r.title,
      content: r.content,
      isVerified: r.isVerified,
      createdAt: r.createdAt,
      author: r.patient
        ? {
            name: `${r.patient.firstName?.[0] || "A"}. ${r.patient.lastName?.[0] || ""}`.trim(),
            location: r.patient.city && r.patient.state
              ? `${r.patient.city}, ${r.patient.state}`
              : null,
          }
        : { name: "Anonymous", location: null },
    }));

    // Calculate rating distribution
    const ratingDistribution = await prisma.review.groupBy({
      by: ["rating"],
      where: {
        practitionerId,
        isPublished: true,
      },
      _count: { rating: true },
    });

    const distribution = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    ratingDistribution.forEach((r) => {
      distribution[r.rating as keyof typeof distribution] = r._count.rating;
    });

    return NextResponse.json({
      reviews: formattedReviews,
      summary: {
        averageRating: practitioner.rating,
        totalReviews: practitioner.reviewCount,
        distribution,
      },
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: skip + reviews.length < total,
      },
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
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

    // Get user and verify they are a patient
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { patient: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    if (user.role !== "PATIENT" || !user.patient) {
      return NextResponse.json(
        { error: "Only patients can submit reviews" },
        { status: 403 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validationResult = createReviewSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid data", details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const { practitionerId, rating, title, content } = validationResult.data;

    // Verify practitioner exists
    const practitioner = await prisma.practitioner.findUnique({
      where: { id: practitionerId },
    });

    if (!practitioner) {
      return NextResponse.json(
        { error: "Practitioner not found" },
        { status: 404 }
      );
    }

    // Check if user already reviewed this practitioner
    const existingReview = await prisma.review.findFirst({
      where: {
        practitionerId,
        patientId: user.patient.id,
      },
    });

    if (existingReview) {
      return NextResponse.json(
        { error: "You have already submitted a review for this practitioner" },
        { status: 400 }
      );
    }

    // Check if patient has had a consultation with this practitioner (for verification)
    const consultation = await prisma.consultation.findFirst({
      where: {
        patientId: user.patient.id,
        practitionerId,
        status: "COMPLETED",
      },
    });

    // Create the review
    const review = await prisma.review.create({
      data: {
        practitionerId,
        patientId: user.patient.id,
        userId: user.id,
        rating,
        title,
        content,
        isVerified: !!consultation, // Verified if they had a completed consultation
        isPublished: false, // Requires moderation before publishing
      },
    });

    return NextResponse.json(
      {
        message: "Thank you for your review! It will be published after moderation.",
        reviewId: review.id,
        isVerified: review.isVerified,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { error: "Failed to submit review" },
      { status: 500 }
    );
  }
}
