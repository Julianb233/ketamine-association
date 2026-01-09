import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { updateArticleSchema } from "@/lib/validations";
import {
  getArticleBySlugWithHtml,
  getRelatedArticles,
  CATEGORY_DISPLAY_NAMES,
} from "@/lib/articles";

// GET: Get article by slug, increment views
// Supports both markdown and database articles
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { searchParams } = new URL(request.url);
    const source = searchParams.get("source") || "auto"; // "markdown", "database", or "auto"

    // Try markdown first if auto or markdown
    if (source === "markdown" || source === "auto") {
      const markdownArticle = await getArticleBySlugWithHtml(slug);

      if (markdownArticle) {
        // Get related articles
        const related = await getRelatedArticles(slug, 3);

        return NextResponse.json({
          article: {
            slug: markdownArticle.slug,
            title: markdownArticle.title,
            excerpt: markdownArticle.excerpt,
            content: markdownArticle.htmlContent,
            rawContent: markdownArticle.body,
            featuredImage: markdownArticle.featuredImage || '/images/blog/placeholder.jpg',
            category: CATEGORY_DISPLAY_NAMES[markdownArticle.category] || markdownArticle.category,
            tags: markdownArticle.tags,
            publishedAt: markdownArticle.publishedAt,
            readTime: markdownArticle.readTime,
            author: {
              name: markdownArticle.author,
              title: "Ketamine Association",
              bio: "Expert content from the Ketamine Association editorial team, bringing you the latest research, clinical insights, and patient education resources.",
            },
          },
          relatedArticles: related,
          source: "markdown",
        });
      }

      // If auto and not found in markdown, try database
      if (source === "auto") {
        // Continue to database lookup below
      } else {
        // source === "markdown" but not found
        return NextResponse.json(
          { error: "Article not found" },
          { status: 404 }
        );
      }
    }

    // Database-based article fetching
    const article = await prisma.article.findUnique({
      where: { slug },
      include: {
        practitioner: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            credentials: true,
            specialty: true,
            profileImage: true,
            slug: true,
            bio: true,
          },
        },
      },
    });

    if (!article) {
      return NextResponse.json(
        { error: "Article not found" },
        { status: 404 }
      );
    }

    // Only show unpublished articles to owners or admins
    if (article.status !== "PUBLISHED") {
      const supabase = await createClient();
      const { data: { user: authUser } } = await supabase.auth.getUser();
      const userId = authUser?.id;

      if (!userId) {
        return NextResponse.json(
          { error: "Article not found" },
          { status: 404 }
        );
      }

      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { practitioner: true },
      });

      const isOwner = article.authorId === userId ||
                      (user?.practitioner && article.practitionerId === user.practitioner.id);
      const isAdmin = user?.role === "ADMIN" || user?.role === "MODERATOR";

      if (!isOwner && !isAdmin) {
        return NextResponse.json(
          { error: "Article not found" },
          { status: 404 }
        );
      }
    }

    // Increment views (only for published articles)
    if (article.status === "PUBLISHED") {
      await prisma.article.update({
        where: { id: article.id },
        data: { views: { increment: 1 } },
      });
    }

    return NextResponse.json({
      article: {
        id: article.id,
        slug: article.slug,
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        featuredImage: article.featuredImage,
        category: CATEGORY_DISPLAY_NAMES[article.category] || article.category,
        tags: article.tags,
        status: article.status,
        publishedAt: article.publishedAt,
        views: article.views + 1,
        likes: article.likes,
        createdAt: article.createdAt,
        updatedAt: article.updatedAt,
        author: article.practitioner
          ? {
              id: article.practitioner.id,
              name: `${article.practitioner.firstName} ${article.practitioner.lastName}${article.practitioner.credentials ? `, ${article.practitioner.credentials}` : ""}`,
              title: article.practitioner.specialty,
              profileImage: article.practitioner.profileImage,
              slug: article.practitioner.slug,
              bio: article.practitioner.bio,
            }
          : null,
      },
      source: "database",
    });
  } catch (error) {
    console.error("Error fetching article:", error);
    return NextResponse.json(
      { error: "Failed to fetch article" },
      { status: 500 }
    );
  }
}

// PATCH: Update article (owner or admin)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

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

    // Find the article
    const article = await prisma.article.findUnique({
      where: { slug },
    });

    if (!article) {
      return NextResponse.json(
        { error: "Article not found" },
        { status: 404 }
      );
    }

    // Check ownership or admin status
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { practitioner: true },
    });

    const isOwner = article.authorId === userId ||
                    (user?.practitioner && article.practitionerId === user.practitioner.id);
    const isAdmin = user?.role === "ADMIN" || user?.role === "MODERATOR";

    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { error: "You don't have permission to update this article" },
        { status: 403 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validationResult = updateArticleSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid data", details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const updateData = validationResult.data;

    // Non-admins can't set status to PUBLISHED directly
    if (!isAdmin && updateData.status === "PUBLISHED") {
      updateData.status = "PENDING_REVIEW";
    }

    // Update the article
    const updatedArticle = await prisma.article.update({
      where: { id: article.id },
      data: {
        ...updateData,
        // Set publishedAt when status changes to PUBLISHED
        publishedAt: updateData.status === "PUBLISHED" && !article.publishedAt
          ? new Date()
          : undefined,
      },
    });

    return NextResponse.json({
      message: "Article updated successfully",
      article: {
        id: updatedArticle.id,
        slug: updatedArticle.slug,
        title: updatedArticle.title,
        status: updatedArticle.status,
      },
    });
  } catch (error) {
    console.error("Error updating article:", error);
    return NextResponse.json(
      { error: "Failed to update article" },
      { status: 500 }
    );
  }
}

// DELETE: Delete article (owner or admin)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

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

    // Find the article
    const article = await prisma.article.findUnique({
      where: { slug },
    });

    if (!article) {
      return NextResponse.json(
        { error: "Article not found" },
        { status: 404 }
      );
    }

    // Check ownership or admin status
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { practitioner: true },
    });

    const isOwner = article.authorId === userId ||
                    (user?.practitioner && article.practitionerId === user.practitioner.id);
    const isAdmin = user?.role === "ADMIN" || user?.role === "MODERATOR";

    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { error: "You don't have permission to delete this article" },
        { status: 403 }
      );
    }

    // Delete the article
    await prisma.article.delete({
      where: { id: article.id },
    });

    return NextResponse.json({
      message: "Article deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting article:", error);
    return NextResponse.json(
      { error: "Failed to delete article" },
      { status: 500 }
    );
  }
}
