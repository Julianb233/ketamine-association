import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

// Types for grouped results
interface MembershipGroupResult {
  membershipTier: string;
  _count: { id: number };
}

interface ConsultationGroupResult {
  status: string;
  _count: { id: number };
}

// GET: Admin dashboard statistics
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

    // Get date ranges
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    // Fetch all statistics in parallel
    const [
      totalUsers,
      totalPractitioners,
      totalPatients,
      verifiedPractitioners,
      activeMemberships,
      pendingReviews,
      totalArticles,
      publishedArticles,
      totalEvents,
      upcomingEvents,
      totalConsultations,
      newUsersThisMonth,
      newUsersLastMonth,
      totalNewsletterSubscribers,
      activeNewsletterSubscribers,
      membershipsByTier,
      consultationsByStatus,
      recentLeads,
    ] = await Promise.all([
      // User counts
      prisma.user.count(),
      prisma.practitioner.count(),
      prisma.patient.count(),
      prisma.practitioner.count({ where: { isVerified: true } }),

      // Active memberships
      prisma.practitioner.count({
        where: { membershipStatus: "ACTIVE" },
      }),

      // Pending reviews
      prisma.review.count({ where: { isPublished: false } }),

      // Articles
      prisma.article.count(),
      prisma.article.count({ where: { status: "PUBLISHED" } }),

      // Events
      prisma.event.count(),
      prisma.event.count({
        where: {
          startDate: { gte: now },
          isPublished: true,
        },
      }),

      // Consultations
      prisma.consultation.count(),

      // New users this month
      prisma.user.count({
        where: { createdAt: { gte: startOfMonth } },
      }),

      // New users last month
      prisma.user.count({
        where: {
          createdAt: {
            gte: startOfLastMonth,
            lte: endOfLastMonth,
          },
        },
      }),

      // Newsletter subscribers
      prisma.newsletterSubscriber.count(),
      prisma.newsletterSubscriber.count({ where: { isActive: true } }),

      // Memberships by tier
      prisma.practitioner.groupBy({
        by: ["membershipTier"],
        _count: { id: true },
        where: { membershipStatus: "ACTIVE" },
      }),

      // Consultations by status
      prisma.consultation.groupBy({
        by: ["status"],
        _count: { id: true },
      }),

      // Recent leads count (last 30 days)
      prisma.lead.count({
        where: {
          createdAt: {
            gte: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
          },
        },
      }),
    ]);

    // Calculate growth percentage
    const userGrowth = newUsersLastMonth > 0
      ? Math.round(((newUsersThisMonth - newUsersLastMonth) / newUsersLastMonth) * 100)
      : newUsersThisMonth > 0 ? 100 : 0;

    // Format memberships by tier
    const membershipTierCounts: Record<string, number> = {
      FREE: 0,
      PROFESSIONAL: 0,
      PREMIUM: 0,
      ELITE: 0,
      ENTERPRISE: 0,
    };

    (membershipsByTier as MembershipGroupResult[]).forEach((tier) => {
      membershipTierCounts[tier.membershipTier] = tier._count.id;
    });

    // Format consultations by status
    const consultationStatusCounts: Record<string, number> = {
      REQUESTED: 0,
      SCHEDULED: 0,
      COMPLETED: 0,
      CANCELLED: 0,
      NO_SHOW: 0,
    };

    (consultationsByStatus as ConsultationGroupResult[]).forEach((status) => {
      consultationStatusCounts[status.status] = status._count.id;
    });

    // Calculate revenue metrics (simplified - would need actual Stripe data in production)
    const paidMemberships = Object.entries(membershipTierCounts)
      .filter(([tier]) => tier !== "FREE")
      .reduce((sum: number, [, count]: [string, number]) => sum + count, 0);

    return NextResponse.json({
      overview: {
        totalUsers,
        totalPractitioners,
        totalPatients,
        verifiedPractitioners,
        activeMemberships,
        paidMemberships,
      },
      growth: {
        newUsersThisMonth,
        newUsersLastMonth,
        growthPercentage: userGrowth,
      },
      content: {
        totalArticles,
        publishedArticles,
        pendingArticles: totalArticles - publishedArticles,
        pendingReviews,
      },
      events: {
        totalEvents,
        upcomingEvents,
      },
      consultations: {
        total: totalConsultations,
        byStatus: consultationStatusCounts,
      },
      newsletter: {
        totalSubscribers: totalNewsletterSubscribers,
        activeSubscribers: activeNewsletterSubscribers,
        unsubscribedCount: totalNewsletterSubscribers - activeNewsletterSubscribers,
      },
      memberships: {
        byTier: membershipTierCounts,
        activeCount: activeMemberships,
      },
      leads: {
        last30Days: recentLeads,
      },
      generatedAt: now.toISOString(),
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch statistics" },
      { status: 500 }
    );
  }
}
