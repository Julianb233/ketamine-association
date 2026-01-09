import { Container } from '@/components/ui/Container';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const articles = [
  {
    id: 1,
    title: 'New FDA Guidance on Ketamine Compounding: What Providers Need to Know',
    excerpt: 'The FDA has released updated guidance on compounding practices for ketamine. Here\'s what this means for your practice.',
    category: 'Regulatory',
    readTime: '5 min read',
    date: 'Jan 5, 2026',
    image: '/blog/article-1.jpg',
  },
  {
    id: 2,
    title: 'Optimizing Patient Outcomes: Integration Therapy Best Practices',
    excerpt: 'Research shows that integration sessions significantly improve long-term outcomes. Learn evidence-based integration techniques.',
    category: 'Clinical',
    readTime: '8 min read',
    date: 'Jan 3, 2026',
    image: '/blog/article-2.jpg',
  },
  {
    id: 3,
    title: '2025 Ketamine Therapy Market Report: Growth, Trends, and Opportunities',
    excerpt: 'Our annual market analysis reveals significant growth in ketamine therapy adoption. Key insights for practice development.',
    category: 'Industry',
    readTime: '12 min read',
    date: 'Dec 28, 2025',
    image: '/blog/article-3.jpg',
  },
];

const categoryColors: Record<string, 'warning' | 'success' | 'default'> = {
  Regulatory: 'warning',
  Clinical: 'success',
  Industry: 'default',
};

export function LatestArticles() {
  return (
    <section className="py-20 bg-white">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Latest from the Blog
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl">
              Stay informed with the latest research, guidelines, and industry insights.
            </p>
          </div>
          <Button variant="outline" href="/blog" className="mt-6 md:mt-0">
            View All Articles
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Card key={article.id} variant="bordered" className="overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 relative -mx-6 -mt-6 mb-4">
                {/* Placeholder for article image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center">
                    <span className="text-2xl font-bold text-teal-600">{article.id}</span>
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <Badge variant={categoryColors[article.category] || 'default'}>
                    {article.category}
                  </Badge>
                </div>
              </div>
              <CardContent className="pt-0">
                <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                  <span>{article.date}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {article.readTime}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-slate-900 mb-2 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                  {article.excerpt}
                </p>

                <Link
                  href={`/blog/${article.id}`}
                  className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium text-sm group"
                >
                  Read More
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
