'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ArticleCard, type Article } from '@/components/blog/ArticleCard';

const categories = [
  'All',
  'Clinical Research',
  'Practice Management',
  'Patient Stories',
  'Industry News',
  'Treatment Protocols',
  'Policy & Advocacy',
];

// Placeholder articles data
const articles: Article[] = [
  {
    slug: 'breakthrough-ketamine-research-2024',
    title: 'Breakthrough Research: Long-term Efficacy of Ketamine Therapy for Treatment-Resistant Depression',
    excerpt: 'A new multi-center study reveals promising long-term outcomes for patients undergoing ketamine therapy, with sustained improvement observed over 24 months.',
    category: 'Clinical Research',
    image: '/images/blog/research-lab.jpg',
    author: {
      name: 'Dr. Sarah Mitchell',
      avatar: '/images/avatars/sarah-mitchell.jpg',
    },
    publishedAt: 'Jan 5, 2024',
    readTime: '8 min read',
  },
  {
    slug: 'optimizing-clinic-operations',
    title: 'Optimizing Your Ketamine Clinic Operations for Growth',
    excerpt: 'Learn proven strategies for streamlining patient intake, scheduling, and follow-up care to scale your practice effectively.',
    category: 'Practice Management',
    image: '/images/blog/clinic-operations.jpg',
    author: {
      name: 'Michael Chen',
      avatar: '/images/avatars/michael-chen.jpg',
    },
    publishedAt: 'Jan 3, 2024',
    readTime: '6 min read',
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
  {
    slug: 'fda-updates-ketamine-regulations',
    title: 'FDA Updates on Ketamine Prescribing: What Practitioners Need to Know',
    excerpt: 'Understanding the latest regulatory changes and their implications for ketamine therapy providers across the United States.',
    category: 'Policy & Advocacy',
    image: '/images/blog/fda-updates.jpg',
    author: {
      name: 'Dr. Robert Hayes',
      avatar: '/images/avatars/robert-hayes.jpg',
    },
    publishedAt: 'Dec 22, 2023',
    readTime: '5 min read',
  },
  {
    slug: 'integration-therapy-protocols',
    title: 'Best Practices for Integration Therapy in Ketamine Treatment',
    excerpt: 'A comprehensive guide to developing effective integration protocols that maximize therapeutic outcomes for patients.',
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
    slug: 'insurance-coverage-update',
    title: 'Major Insurance Carriers Expand Ketamine Coverage: 2024 Update',
    excerpt: 'Breaking down the latest insurance policy changes and what they mean for patients seeking ketamine therapy coverage.',
    category: 'Industry News',
    image: '/images/blog/insurance-update.jpg',
    author: {
      name: 'David Kim',
      avatar: '/images/avatars/david-kim.jpg',
    },
    publishedAt: 'Dec 15, 2023',
    readTime: '4 min read',
  },
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
    slug: 'staff-training-essentials',
    title: 'Essential Staff Training for Ketamine Clinic Success',
    excerpt: 'Building a competent and compassionate team to deliver exceptional patient care in your ketamine practice.',
    category: 'Practice Management',
    image: '/images/blog/staff-training.jpg',
    author: {
      name: 'Lisa Thompson',
      avatar: '/images/avatars/lisa-thompson.jpg',
    },
    publishedAt: 'Dec 5, 2023',
    readTime: '7 min read',
  },
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [email, setEmail] = useState('');
  const articlesPerPage = 6;

  const filteredArticles = selectedCategory === 'All'
    ? articles
    : articles.filter(article => article.category === selectedCategory);

  const featuredArticle = filteredArticles[0];
  const remainingArticles = filteredArticles.slice(1);

  const totalPages = Math.ceil(remainingArticles.length / articlesPerPage);
  const paginatedArticles = remainingArticles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter signup:', email);
    setEmail('');
  };

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
          </div>
        </Container>
      </section>

      {/* Category Filter */}
      <section className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <Container>
          <div className="flex gap-2 py-4 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-teal-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <Container>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Featured Article */}
              {featuredArticle && (
                <div className="mb-12">
                  <h2 className="text-sm font-semibold text-teal-600 uppercase tracking-wider mb-4">
                    Featured Article
                  </h2>
                  <ArticleCard article={featuredArticle} featured />
                </div>
              )}

              {/* Article Grid */}
              <div>
                <h2 className="text-sm font-semibold text-teal-600 uppercase tracking-wider mb-6">
                  Latest Articles
                </h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {paginatedArticles.map((article) => (
                    <ArticleCard key={article.slug} article={article} />
                  ))}
                </div>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-8">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                        currentPage === page
                          ? 'bg-teal-600 text-white'
                          : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* Newsletter Signup */}
              <div className="bg-gradient-to-br from-teal-600 to-emerald-700 rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold mb-2">Stay Updated</h3>
                <p className="text-teal-100 text-sm mb-4">
                  Get the latest research and insights delivered to your inbox weekly.
                </p>
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    required
                  />
                  <Button type="submit" variant="amber" fullWidth size="sm">
                    Subscribe
                  </Button>
                </form>
                <p className="text-xs text-teal-200 mt-3">
                  No spam. Unsubscribe anytime.
                </p>
              </div>

              {/* Popular Topics */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Popular Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Depression',
                    'PTSD',
                    'Anxiety',
                    'IV Therapy',
                    'Integration',
                    'Dosing',
                    'Safety',
                    'Research',
                  ].map((topic) => (
                    <button
                      key={topic}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-full text-sm text-slate-600 transition-colors"
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>

              {/* Resources CTA */}
              <div className="bg-slate-900 rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold mb-2">Member Resources</h3>
                <p className="text-slate-300 text-sm mb-4">
                  Access exclusive research papers, clinical guidelines, and practice tools.
                </p>
                <Button href="/association/membership" variant="amber" fullWidth size="sm">
                  Become a Member
                </Button>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </main>
  );
}
