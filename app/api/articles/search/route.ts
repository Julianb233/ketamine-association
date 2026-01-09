import { NextRequest, NextResponse } from "next/server";
import { searchArticles, getAllTags, getAllCategories } from "@/lib/articles";

// GET: Search articles by query, with optional filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || searchParams.get("query") || "";
    const limit = parseInt(searchParams.get("limit") || "20", 10);

    if (!query.trim()) {
      // Return empty results for empty query, but include available filters
      const [tags, categories] = await Promise.all([
        getAllTags(),
        getAllCategories(),
      ]);

      return NextResponse.json({
        articles: [],
        total: 0,
        query: "",
        filters: {
          tags,
          categories,
        },
      });
    }

    const articles = await searchArticles(query);
    const limitedArticles = articles.slice(0, limit);

    // Get available filters
    const [tags, categories] = await Promise.all([
      getAllTags(),
      getAllCategories(),
    ]);

    return NextResponse.json({
      articles: limitedArticles,
      total: articles.length,
      query,
      filters: {
        tags,
        categories,
      },
    });
  } catch (error) {
    console.error("Error searching articles:", error);
    return NextResponse.json(
      { error: "Failed to search articles" },
      { status: 500 }
    );
  }
}
