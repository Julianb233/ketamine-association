import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { moderateReviewSchema } from "@/lib/validations";

interface PendingReview {
  id: string;
  rating: number;
  title: string | null;
  content: string | null;
  isVerified: boolean;
  createdAt: Date;
  practitioner: {
    id: string;
    firstName: string;
    lastName: string;
    slug: string;
  };
  patient: {
    firstName: string | null;
    lastName: string | null;
  } | null;
}

// POST: Approve or reject review
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: reviewId } = await params;

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

    // Verify admin role
    const adminUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (!adminUser || (adminUser.role !== "ADMIN" && adminUser.role !== "MODERATOR")) {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validationResult = moderateReviewSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid data", details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const { action, reason } = validationResult.data;

    // Find the review
    const review = await prisma.review.findUnique({
      where: { id: reviewId },
      include: {
        practitioner: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            rating: true,
            reviewCount: true,
          },
        },
      },
    });

    if (!review) {
      return NextResponse.json(
        { error: "Review not found" },
        { status: 404 }
      );
    }

    if (action === "approve") {
      // Publish the review
      await prisma.review.update({
        where: { id: reviewId },
        data: { isPublished: true },
      });

      // Recalculate practitioner rating
      const publishedReviews = await prisma.review.findMany({
        where: {
          practitionerId: review.practitionerId,
          isPublished: true,
        },
        select: { rating: true },
      });

      const totalRating = publishedReviews.reduce((sum: number, r: { rating: number }) => sum + r.rating, 0);
      const averageRating = publishedReviews.length > 0
        ? totalRating / publishedReviews.length
        : 0;

      await prisma.practitioner.update({
        where: { id: review.practitionerId },
        data: {
          rating: Math.round(averageRating * 10) / 10, // Round to 1 decimal place
          reviewCount: publishedReviews.length,
        },
      });

      return NextResponse.json({
        message: "Review approved and published",
        review: {
          id: review.id,
          isPublished: true,
        },
      });
    } else {
      // Reject and delete the review
      await prisma.review.delete({
        where: { id: reviewId },
      });

      // Log the rejection
      console.log(
        `Review ${reviewId} rejected by admin ${userId}${reason ? `. Reason: ${reason}` : ""}`
      );

      return NextResponse.json({
        message: "Review rejected and removed",
        review: {
          id: review.id,
          rejected: true,
          reason,
        },
      });
    }
  } catch (error) {
    console.error("Error moderating review:", error);
    return NextResponse.json(
      { error: "Failed to moderate review" },
      { status: 500 }
    );
  }
}

// GET: Get pending reviews for moderation
export async function GET(request: NextRequest) {
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

    // Verify admin role
    const adminUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (!adminUser || (adminUser.role !== "ADMIN" && adminUser.role !== "MODERATOR")) {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    // Get pending reviews
    const pendingReviews = await prisma.review.findMany({
      where: { isPublished: false },
      select: {
        id: true,
        rating: true,
        title: true,
        content: true,
        isVerified: true,
        createdAt: true,
        practitioner: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            slug: true,
          },
        },
        patient: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: { createdAt: "asc" },
    });

    const formattedReviews = pendingReviews.map((review: PendingReview) => ({
      id: review.id,
      rating: review.rating,
      title: review.title,
      content: review.content,
      isVerified: review.isVerified,
      createdAt: review.createdAt,
      practitioner: {
        id: review.practitioner.id,
        name: `${review.practitioner.firstName} ${review.practitioner.lastName}`,
        slug: review.practitioner.slug,
      },
      reviewer: review.patient
        ? `${review.patient.firstName || ""} ${review.patient.lastName || ""}`.trim() || "Anonymous"
        : "Anonymous",
    }));

    return NextResponse.json({
      pendingCount: pendingReviews.length,
      reviews: formattedReviews,
    });
  } catch (error) {
    console.error("Error fetching pending reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch pending reviews" },
      { status: 500 }
    );
  }
}
