import { Suspense } from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { ArticleCard, type Article } from '@/components/blog/ArticleCard';
import { getAllArticles, getAllCategories, type ArticleCard as ArticleCardType } from '@/lib/articles';
import { BlogContent } from '@/components/blog/BlogContent';

// Force dynamic rendering to ensure fresh articles
export const dynamic = 'force-dynamic';

const categories = [
  'All',
  'Clinical Research',
  'Practice Management',
  'Patient Stories',
  'Patient Education',
  'Treatment Protocols',
  'Policy & Advocacy',
];

// Convert ArticleCardType to the Article type expected by ArticleCard component
function convertToArticle(card: ArticleCardType): Article {
  return {
    slug: card.slug,
    title: card.title,
    excerpt: card.excerpt,
    category: card.category,
    image: card.image,
    author: {
      name: card.author.name,
      avatar: card.author.avatar,
    },
    publishedAt: card.publishedAt,
    readTime: card.readTime,
  };
}

export default async function BlogPage() {
  // Fetch articles server-side
  const articleCards = await getAllArticles();
  const articles: Article[] = articleCards.map(convertToArticle);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-600 via-teal-700 to-emerald-800 text-white py-16 md:py-24">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Insights & Research
            </h1>
            <p className="text-xl text-teal-100 leading-relaxed">
              Stay informed with the latest research, clinical insights, practice management tips,
              and inspiring patient stories from the ketamine therapy community.
            </p>
            <p className="text-lg text-teal-200 mt-4">
              {articles.length} articles available
            </p>
          </div>
        </Container>
      </section>

      {/* Blog Content with Client-Side Interactivity */}
      <Suspense fallback={
        <section className="py-12 md:py-16">
          <Container>
            <div className="animate-pulse">
              <div className="h-12 bg-slate-200 rounded mb-8 w-1/3"></div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white rounded-xl h-96"></div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      }>
        <BlogContent articles={articles} categories={categories} />
      </Suspense>
    </main>
  );
}
