import { prisma } from "@/lib/prisma";
import ArticlesClient from "./ArticlesClient";

export const dynamic = 'force-dynamic';

// Types matching the client component
type ArticleCategory = 'CLINICAL_RESEARCH' | 'PRACTICE_MANAGEMENT' | 'PATIENT_STORIES' | 'REGULATORY_UPDATES' | 'TREATMENT_INNOVATIONS' | 'INDUSTRY_NEWS';
type ArticleStatus = 'DRAFT' | 'PENDING_REVIEW' | 'REVISION_NEEDED' | 'APPROVED' | 'PUBLISHED' | 'ARCHIVED';

interface FormattedArticle {
  id: string;
  title: string;
  slug: string;
  author: string;
  category: ArticleCategory;
  status: ArticleStatus;
  views: number;
  publishedAt: string | null;
  createdAt: string;
  excerpt: string;
}

export default async function ArticlesManagementPage() {
  let formattedArticles: FormattedArticle[] = [];

  try {
    const articles = await prisma.article.findMany({
      include: {
        practitioner: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Transform articles to match the expected format
    formattedArticles = articles.map((article) => ({
      id: article.id,
      title: article.title,
      slug: article.slug,
      author: article.practitioner
        ? `${article.practitioner.firstName} ${article.practitioner.lastName}`
        : 'Admin Team',
      category: article.category as ArticleCategory,
      status: article.status as ArticleStatus,
      views: article.views,
      publishedAt: article.publishedAt?.toISOString().split('T')[0] || null,
      createdAt: article.createdAt.toISOString().split('T')[0],
      excerpt: article.excerpt || '',
    }));
  } catch (error) {
    console.error('Database error:', error);
  }

  return <ArticlesClient articles={formattedArticles} />;
}
