import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { articlesQuerySchema, createArticleSchema } from "@/lib/validations";
import { MEMBERSHIP_TIERS } from "@/lib/stripe";
import {
  getPaginatedArticles,
  getAllCategories,
  getAllTags,
  searchArticles as searchMarkdownArticles,
  CATEGORY_DISPLAY_NAMES,
} from "@/lib/articles";

// Type for article where clause
interface ArticleWhereInput {
  status: string;
  category?: string;
  practitionerId?: string;
}

// Type for article with practitioner
interface ArticleWithPractitioner {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  featuredImage: string | null;
  category: string;
  tags: string[];
  publishedAt: Date | null;
  views: number;
  likes: number;
  practitioner: {
    id: string;
    firstName: string;
    lastName: string;
    credentials: string | null;
    profileImage: string | null;
    slug: string;
  } | null;
}

// GET: List published articles with category filter
// Supports both database articles and markdown articles
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const source = searchParams.get("source") || "markdown"; // "markdown" or "database"
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    // Serve markdown articles (default)
    if (source === "markdown") {
      const result = await getPaginatedArticles(
        page,
        limit,
        category || undefined,
        search || undefined
      );

      return NextResponse.json({
        articles: result.articles,
        pagination: result.pagination,
        source: "markdown",
      });
    }

    // Original database-based article fetching
    const queryParams = Object.fromEntries(searchParams.entries());

    // Validate query parameters
    const validationResult = articlesQuerySchema.safeParse(queryParams);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid query parameters", details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const { page: dbPage, limit: dbLimit, category: dbCategory, practitionerId } = validationResult.data;

    // Build where clause - using Record<string, unknown> to avoid Prisma type conflicts
    const where: Record<string, unknown> = {
      status: "PUBLISHED",
    };

    if (dbCategory) {
      where.category = dbCategory;
    }

    if (practitionerId) {
      where.practitionerId = practitionerId;
    }

    const skip = (dbPage - 1) * dbLimit;

    // Fetch articles with count
    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where,
        select: {
          id: true,
          slug: true,
          title: true,
          excerpt: true,
          featuredImage: true,
          category: true,
          tags: true,
          publishedAt: true,
          views: true,
          likes: true,
          practitioner: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              credentials: true,
              profileImage: true,
              slug: true,
            },
          },
        },
        orderBy: { publishedAt: "desc" },
        skip,
        take: dbLimit,
      }),
      prisma.article.count({ where }),
    ]);

    // Format response
    const formattedArticles = (articles as ArticleWithPractitioner[]).map((article) => ({
      id: article.id,
      slug: article.slug,
      title: article.title,
      excerpt: article.excerpt,
      featuredImage: article.featuredImage,
      category: CATEGORY_DISPLAY_NAMES[article.category] || article.category,
      tags: article.tags,
      publishedAt: article.publishedAt,
      views: article.views,
      likes: article.likes,
      author: article.practitioner
        ? {
            id: article.practitioner.id,
            name: `${article.practitioner.firstName} ${article.practitioner.lastName}${article.practitioner.credentials ? `, ${article.practitioner.credentials}` : ""}`,
            profileImage: article.practitioner.profileImage,
            slug: article.practitioner.slug,
          }
        : null,
    }));

    return NextResponse.json({
      articles: formattedArticles,
      pagination: {
        page: dbPage,
        limit: dbLimit,
        total,
        totalPages: Math.ceil(total / dbLimit),
        hasMore: skip + articles.length < total,
      },
      source: "database",
    });
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 }
    );
  }
}

// POST: Create article (practitioners with article limits)
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

    // Get user and practitioner profile
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { practitioner: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Allow admins to create articles without restrictions
    const isAdmin = user.role === "ADMIN" || user.role === "MODERATOR";

    if (!isAdmin && (!user.practitioner || user.role !== "PRACTITIONER")) {
      return NextResponse.json(
        { error: "Only practitioners can create articles" },
        { status: 403 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validationResult = createArticleSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid data", details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const articleData = validationResult.data;

    // Check article limits for practitioners (not admins)
    if (!isAdmin && user.practitioner) {
      const tierConfig = MEMBERSHIP_TIERS[user.practitioner.membershipTier as keyof typeof MEMBERSHIP_TIERS];
      const articleLimit = tierConfig?.limits?.articles ?? 0;

      if (articleLimit === 0) {
        return NextResponse.json(
          { error: "Your membership tier does not allow creating articles. Please upgrade your membership." },
          { status: 403 }
        );
      }

      if (articleLimit !== Infinity) {
        // Count current month's articles
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const currentMonthArticleCount = await prisma.article.count({
          where: {
            practitionerId: user.practitioner.id,
            createdAt: { gte: startOfMonth },
          },
        });

        if (currentMonthArticleCount >= articleLimit) {
          return NextResponse.json(
            { error: `You have reached your monthly article limit (${articleLimit}). Please upgrade your membership for more articles.` },
            { status: 403 }
          );
        }
      }
    }

    // Check for duplicate slug
    const existingArticle = await prisma.article.findUnique({
      where: { slug: articleData.slug },
    });

    if (existingArticle) {
      return NextResponse.json(
        { error: "An article with this slug already exists" },
        { status: 400 }
      );
    }

    // Create the article
    const article = await prisma.article.create({
      data: {
        slug: articleData.slug,
        title: articleData.title,
        excerpt: articleData.excerpt,
        content: articleData.content,
        featuredImage: articleData.featuredImage,
        category: articleData.category,
        tags: articleData.tags,
        status: isAdmin ? articleData.status : "PENDING_REVIEW", // Non-admins need approval
        authorId: userId,
        practitionerId: user.practitioner?.id || null,
        publishedAt: articleData.status === "PUBLISHED" && isAdmin ? new Date() : null,
      },
    });

    return NextResponse.json(
      {
        message: isAdmin
          ? "Article created successfully"
          : "Article submitted for review",
        article: {
          id: article.id,
          slug: article.slug,
          title: article.title,
          status: article.status,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating article:", error);
    return NextResponse.json(
      { error: "Failed to create article" },
      { status: 500 }
    );
  }
}
