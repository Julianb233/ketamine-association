import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { Card } from '@/components/ui/Card';
import { ArticleCard, type Article } from '@/components/blog/ArticleCard';

interface ArticleDetail extends Article {
  content: string;
  authorBio: string;
  authorTitle: string;
}

// Placeholder article data - in production, this would come from a CMS or database
const getArticle = async (slug: string): Promise<ArticleDetail | null> => {
  // Simulated article data
  const articles: Record<string, ArticleDetail> = {
    'breakthrough-ketamine-research-2024': {
      slug: 'breakthrough-ketamine-research-2024',
      title: 'Breakthrough Research: Long-term Efficacy of Ketamine Therapy for Treatment-Resistant Depression',
      excerpt: 'A new multi-center study reveals promising long-term outcomes for patients undergoing ketamine therapy, with sustained improvement observed over 24 months.',
      category: 'Clinical Research',
      image: '/images/blog/research-lab.jpg',
      author: {
        name: 'Dr. Sarah Mitchell',
        avatar: '/images/avatars/sarah-mitchell.jpg',
      },
      publishedAt: 'January 5, 2024',
      readTime: '8 min read',
      authorBio: 'Dr. Sarah Mitchell is a board-certified psychiatrist and researcher specializing in novel treatments for mood disorders. She has published over 50 peer-reviewed papers on ketamine therapy.',
      authorTitle: 'Chief Research Officer, Ketamine Research Institute',
      content: `
        <p>A landmark multi-center study published this week in the Journal of Psychiatric Research has demonstrated the long-term efficacy of ketamine therapy for patients with treatment-resistant depression (TRD), with sustained improvement observed over a 24-month follow-up period.</p>

        <h2>Study Overview</h2>
        <p>The research, conducted across 15 clinical sites in the United States and Europe, followed 847 patients who received a standardized ketamine treatment protocol consisting of six initial infusions over three weeks, followed by monthly maintenance sessions.</p>

        <p>Key findings from the study include:</p>
        <ul>
          <li>71% of participants showed significant improvement in depression scores at 6 months</li>
          <li>58% maintained clinical response at 24 months with ongoing maintenance therapy</li>
          <li>Anxiety symptoms improved alongside depression in 64% of patients</li>
          <li>Quality of life measures showed substantial improvement across all time points</li>
        </ul>

        <h2>Implications for Clinical Practice</h2>
        <p>These findings have significant implications for how we approach treatment-resistant depression in clinical settings. The sustained efficacy demonstrated in this study suggests that ketamine therapy, when properly administered with appropriate follow-up care, can provide lasting relief for patients who have not responded to traditional antidepressants.</p>

        <blockquote>
          "This study represents a paradigm shift in how we think about ketamine therapy. We're not just looking at acute symptom relief anymore - we're seeing genuine, sustained recovery in patients who had lost hope." - Dr. Sarah Mitchell
        </blockquote>

        <h2>Safety Considerations</h2>
        <p>The study also provided reassuring data on the safety profile of long-term ketamine therapy. Common side effects remained consistent with previous research, including temporary dissociation, nausea, and elevated blood pressure during infusions. Importantly, no new safety signals emerged over the extended follow-up period.</p>

        <h2>Next Steps</h2>
        <p>Building on these findings, researchers are now planning a phase 4 study to investigate optimal dosing strategies and identify biomarkers that predict treatment response. This work could help clinicians personalize ketamine therapy for individual patients, potentially improving outcomes even further.</p>

        <p>For practitioners interested in implementing these findings, the research team has made their treatment protocol available through the Ketamine Research Institute website, along with training resources for clinical staff.</p>
      `,
    },
  };

  return articles[slug] || null;
};

// Related articles
const relatedArticles: Article[] = [
  {
    slug: 'dosing-protocols-comparison',
    title: 'Comparing Dosing Protocols: IV vs. Sublingual vs. Intranasal',
    excerpt: 'An evidence-based comparison of different ketamine administration routes and their clinical outcomes.',
    category: 'Clinical Research',
    image: '/images/blog/dosing-protocols.jpg',
    author: {
      name: 'Dr. Sarah Mitchell',
      avatar: '/images/avatars/sarah-mitchell.jpg',
    },
    publishedAt: 'Dec 10, 2023',
    readTime: '15 min read',
  },
  {
    slug: 'integration-therapy-protocols',
    title: 'Best Practices for Integration Therapy in Ketamine Treatment',
    excerpt: 'A comprehensive guide to developing effective integration protocols that maximize therapeutic outcomes.',
    category: 'Treatment Protocols',
    image: '/images/blog/integration-therapy.jpg',
    author: {
      name: 'Dr. Emily Rodriguez',
      avatar: '/images/avatars/emily-rodriguez.jpg',
    },
    publishedAt: 'Dec 18, 2023',
    readTime: '12 min read',
  },
  {
    slug: 'patient-story-recovery-journey',
    title: "From Hopelessness to Hope: A Patient's Journey with Ketamine Therapy",
    excerpt: 'Mark shares his transformative experience with ketamine therapy after years of struggling with treatment-resistant depression.',
    category: 'Patient Stories',
    image: '/images/blog/patient-story.jpg',
    author: {
      name: 'Jennifer Adams',
      avatar: '/images/avatars/jennifer-adams.jpg',
    },
    publishedAt: 'Dec 28, 2023',
    readTime: '10 min read',
  },
];

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: `${article.title} | Ketamine Association Blog`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return (
      <main className="min-h-screen bg-slate-50 py-16">
        <Container>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Article Not Found</h1>
            <p className="text-slate-600 mb-8">The article you are looking for does not exist.</p>
            <Button href="/blog" variant="primary">
              Back to Blog
            </Button>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Article Header */}
      <section className="bg-white border-b border-slate-200 py-12 md:py-16">
        <Container size="md">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium mb-6 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Blog
          </Link>

          <Badge variant="primary" size="md" className="mb-4">
            {article.category}
          </Badge>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3">
              <Avatar
                src={article.author.avatar}
                name={article.author.name}
                size="lg"
              />
              <div>
                <p className="font-semibold text-slate-900">{article.author.name}</p>
                <p className="text-sm text-slate-500">{article.authorTitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {article.publishedAt}
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {article.readTime}
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Image */}
      <section className="bg-slate-100">
        <Container size="md">
          <div className="relative aspect-[21/9] -mt-1 rounded-b-2xl overflow-hidden shadow-xl">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </Container>
      </section>

      {/* Article Content */}
      <section className="py-12 md:py-16">
        <Container size="sm">
          <div className="grid lg:grid-cols-[1fr_auto] gap-12">
            {/* Main Content */}
            <article
              className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-a:text-teal-600 prose-a:no-underline hover:prose-a:underline prose-blockquote:border-teal-500 prose-blockquote:bg-teal-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Social Share Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-3">
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Share</p>
                <button className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5 text-slate-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </button>
                <button className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5 text-slate-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </button>
                <button className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5 text-slate-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </button>
                <button className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* Author Bio */}
      <section className="py-12 bg-white border-t border-b border-slate-200">
        <Container size="sm">
          <Card className="bg-gradient-to-br from-slate-50 to-white">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <Avatar
                src={article.author.avatar}
                name={article.author.name}
                size="xl"
              />
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">
                  About {article.author.name}
                </h3>
                <p className="text-sm text-teal-600 font-medium mb-3">
                  {article.authorTitle}
                </p>
                <p className="text-slate-600">
                  {article.authorBio}
                </p>
                <div className="mt-4 flex gap-3">
                  <button className="text-slate-400 hover:text-teal-600 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </button>
                  <button className="text-slate-400 hover:text-teal-600 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </Container>
      </section>

      {/* Comments Section Placeholder */}
      <section className="py-12 md:py-16">
        <Container size="sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Discussion</h2>
          <Card className="text-center py-12">
            <div className="text-slate-400 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Join the Discussion</h3>
            <p className="text-slate-600 mb-6 max-w-md mx-auto">
              Sign in to share your thoughts and engage with other healthcare professionals.
            </p>
            <div className="flex justify-center gap-3">
              <Button href="/login" variant="outline" size="sm">
                Sign In
              </Button>
              <Button href="/register" variant="primary" size="sm">
                Create Account
              </Button>
            </div>
          </Card>
        </Container>
      </section>

      {/* Related Articles */}
      <section className="py-12 md:py-16 bg-white border-t border-slate-200">
        <Container>
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Related Articles</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedArticles.map((relatedArticle) => (
              <ArticleCard key={relatedArticle.slug} article={relatedArticle} />
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
