'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Clock,
  ArrowRight,
  Search,
  Mail,
  BookOpen,
  TrendingUp,
  Users,
  FileText,
  Microscope,
  Building2
} from 'lucide-react';

// Article categories matching Prisma model
const categories = [
  { id: 'all', label: 'All Articles', icon: BookOpen },
  { id: 'CLINICAL_RESEARCH', label: 'Clinical Research', icon: Microscope },
  { id: 'PRACTICE_MANAGEMENT', label: 'Practice Management', icon: Building2 },
  { id: 'PATIENT_STORIES', label: 'Patient Stories', icon: Users },
  { id: 'REGULATORY_UPDATES', label: 'Regulatory Updates', icon: FileText },
  { id: 'TREATMENT_INNOVATIONS', label: 'Treatment Innovations', icon: TrendingUp },
  { id: 'INDUSTRY_NEWS', label: 'Industry News', icon: BookOpen },
];

// Placeholder article data
const featuredArticle = {
  slug: 'breakthrough-ketamine-depression-study-2025',
  title: 'Breakthrough Study: Ketamine Shows 70% Response Rate in Treatment-Resistant Depression',
  excerpt: 'A landmark multi-center study published in JAMA Psychiatry demonstrates unprecedented efficacy of IV ketamine therapy for patients who have not responded to traditional antidepressants. The research, conducted across 15 clinical sites with over 500 participants, provides the strongest evidence yet for ketamine as a first-line treatment option.',
  category: 'CLINICAL_RESEARCH',
  author: {
    name: 'Dr. Sarah Mitchell',
    role: 'Chief Medical Editor',
    avatar: '/authors/sarah-mitchell.jpg',
  },
  publishedAt: '2025-12-28',
  readTime: '12 min read',
  image: '/articles/featured-depression-study.jpg',
};

const articles = [
  {
    slug: 'fda-guidance-ketamine-compounding-2026',
    title: 'New FDA Guidance on Ketamine Compounding: What Providers Need to Know',
    excerpt: 'The FDA has released updated guidance on compounding practices for ketamine. Here\'s what this means for your practice and patient safety protocols.',
    category: 'REGULATORY_UPDATES',
    author: { name: 'Dr. James Chen', role: 'Regulatory Affairs' },
    publishedAt: '2026-01-05',
    readTime: '5 min read',
    views: 2847,
  },
  {
    slug: 'integration-therapy-best-practices',
    title: 'Optimizing Patient Outcomes: Integration Therapy Best Practices',
    excerpt: 'Research shows that integration sessions significantly improve long-term outcomes. Learn evidence-based integration techniques from leading practitioners.',
    category: 'PRACTICE_MANAGEMENT',
    author: { name: 'Dr. Emily Watson', role: 'Clinical Director' },
    publishedAt: '2026-01-03',
    readTime: '8 min read',
    views: 1923,
  },
  {
    slug: 'patient-story-ptsd-recovery',
    title: 'From Darkness to Light: Michael\'s Journey with Ketamine-Assisted Therapy for PTSD',
    excerpt: 'After 15 years of struggling with combat-related PTSD, Michael found hope through ketamine therapy. His story of resilience and recovery inspires others seeking help.',
    category: 'PATIENT_STORIES',
    author: { name: 'Amanda Richards', role: 'Patient Advocate' },
    publishedAt: '2026-01-01',
    readTime: '10 min read',
    views: 5621,
  },
  {
    slug: 'at-home-ketamine-safety-protocols',
    title: 'At-Home Ketamine Therapy: Establishing Safety Protocols for Telehealth Programs',
    excerpt: 'As telehealth ketamine programs expand, providers must implement robust safety protocols. This guide covers essential monitoring, dosing, and emergency procedures.',
    category: 'PRACTICE_MANAGEMENT',
    author: { name: 'Dr. Robert Kim', role: 'Telehealth Specialist' },
    publishedAt: '2025-12-30',
    readTime: '15 min read',
    views: 3412,
  },
  {
    slug: 'ketamine-chronic-pain-meta-analysis',
    title: 'Meta-Analysis: Ketamine Infusions Show Promise for Chronic Pain Conditions',
    excerpt: 'A comprehensive review of 47 studies reveals significant pain reduction in patients with CRPS, fibromyalgia, and neuropathic pain following ketamine treatment.',
    category: 'CLINICAL_RESEARCH',
    author: { name: 'Dr. Lisa Anderson', role: 'Pain Medicine Researcher' },
    publishedAt: '2025-12-27',
    readTime: '14 min read',
    views: 2156,
  },
  {
    slug: 'spravato-insurance-coverage-guide',
    title: 'Navigating Insurance Coverage for Spravato: A Complete Provider Guide',
    excerpt: 'Understanding insurance requirements for esketamine (Spravato) can be complex. This guide walks through prior authorization, documentation, and appeals processes.',
    category: 'PRACTICE_MANAGEMENT',
    author: { name: 'Jennifer Martinez', role: 'Practice Manager' },
    publishedAt: '2025-12-24',
    readTime: '9 min read',
    views: 4287,
  },
  {
    slug: 'ketamine-therapy-market-report-2025',
    title: '2025 Ketamine Therapy Market Report: Growth, Trends, and Opportunities',
    excerpt: 'Our annual market analysis reveals significant growth in ketamine therapy adoption. Key insights for practice development and strategic planning.',
    category: 'INDUSTRY_NEWS',
    author: { name: 'David Thompson', role: 'Market Analyst' },
    publishedAt: '2025-12-20',
    readTime: '18 min read',
    views: 3891,
  },
  {
    slug: 'new-ketamine-delivery-methods',
    title: 'Beyond IV: Exploring Novel Ketamine Delivery Methods and Their Efficacy',
    excerpt: 'From sublingual tablets to nasal sprays and intramuscular injections, researchers are developing new ways to administer ketamine. Here\'s what the science shows.',
    category: 'TREATMENT_INNOVATIONS',
    author: { name: 'Dr. Michael Torres', role: 'Research Director' },
    publishedAt: '2025-12-18',
    readTime: '11 min read',
    views: 2743,
  },
  {
    slug: 'sarah-chronic-depression-recovery',
    title: 'Finding Hope After 20 Years: Sarah\'s Story of Overcoming Treatment-Resistant Depression',
    excerpt: 'After two decades of trying every available treatment, Sarah discovered ketamine therapy. Her journey shows the importance of never giving up on finding the right treatment.',
    category: 'PATIENT_STORIES',
    author: { name: 'Sarah Coleman', role: 'Guest Writer' },
    publishedAt: '2025-12-15',
    readTime: '7 min read',
    views: 6234,
  },
];

const categoryLabels: Record<string, string> = {
  CLINICAL_RESEARCH: 'Clinical Research',
  PRACTICE_MANAGEMENT: 'Practice Management',
  PATIENT_STORIES: 'Patient Stories',
  REGULATORY_UPDATES: 'Regulatory Updates',
  TREATMENT_INNOVATIONS: 'Treatment Innovations',
  INDUSTRY_NEWS: 'Industry News',
};

const categoryColors: Record<string, 'primary' | 'secondary' | 'accent' | 'warning' | 'success' | 'default'> = {
  CLINICAL_RESEARCH: 'primary',
  PRACTICE_MANAGEMENT: 'secondary',
  PATIENT_STORIES: 'accent',
  REGULATORY_UPDATES: 'warning',
  TREATMENT_INNOVATIONS: 'success',
  INDUSTRY_NEWS: 'default',
};

function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateString));
}

export default function ArticlesPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const filteredArticles = activeCategory === 'all'
    ? articles
    : articles.filter(article => article.category === activeCategory);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubscribing(false);
    setEmail('');
    alert('Thank you for subscribing!');
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-700 via-teal-600 to-emerald-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <Container className="relative py-16 lg:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" size="lg" className="mb-6 bg-white/20 text-white border-0">
              Knowledge Hub
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Latest Research & Insights
            </h1>
            <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
              Stay informed with the latest clinical research, regulatory updates, patient stories,
              and practice management insights from the ketamine therapy community.
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto">
              <div className="flex gap-3 p-2 bg-white rounded-xl shadow-xl">
                <div className="flex-1 flex items-center gap-3 px-4">
                  <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    className="w-full py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none"
                  />
                </div>
                <Button variant="primary" size="md">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </Container>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-12 sm:h-20">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f8fafc"/>
          </svg>
        </div>
      </section>

      {/* Category Filter Tabs */}
      <section className="bg-slate-50 pt-8 pb-4 sticky top-0 z-10 border-b border-slate-200">
        <Container>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === category.id
                    ? 'bg-teal-600 text-white shadow-lg shadow-teal-500/25'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <category.icon className="w-4 h-4" />
                {category.label}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Article */}
      {activeCategory === 'all' && (
        <section className="py-12 bg-slate-50">
          <Container>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Featured Article</h2>
            <Link href={`/articles/${featuredArticle.slug}`}>
              <Card hover className="overflow-hidden">
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Image */}
                  <div className="aspect-video lg:aspect-auto lg:h-full bg-gradient-to-br from-teal-100 to-emerald-100 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full bg-white/80 flex items-center justify-center">
                        <Microscope className="w-12 h-12 text-teal-600" />
                      </div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <Badge variant={categoryColors[featuredArticle.category]} size="md">
                        {categoryLabels[featuredArticle.category]}
                      </Badge>
                    </div>
                  </div>
                  {/* Content */}
                  <CardContent className="p-8 lg:p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                      <span>{formatDate(featuredArticle.publishedAt)}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {featuredArticle.readTime}
                      </span>
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4 leading-tight">
                      {featuredArticle.title}
                    </h3>
                    <p className="text-slate-600 mb-6 line-clamp-3">
                      {featuredArticle.excerpt}
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                        <span className="text-teal-700 font-semibold text-sm">
                          {featuredArticle.author.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 text-sm">{featuredArticle.author.name}</p>
                        <p className="text-slate-500 text-xs">{featuredArticle.author.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </Link>
          </Container>
        </section>
      )}

      {/* Article Grid */}
      <section className="py-12 bg-slate-50">
        <Container>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900">
              {activeCategory === 'all' ? 'All Articles' : categoryLabels[activeCategory]}
            </h2>
            <span className="text-slate-500">
              {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <Link key={article.slug} href={`/articles/${article.slug}`}>
                <Card hover className="h-full overflow-hidden">
                  {/* Image */}
                  <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 relative -mx-6 -mt-6 mb-4">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center">
                        <BookOpen className="w-8 h-8 text-teal-600" />
                      </div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <Badge variant={categoryColors[article.category]} size="sm">
                        {categoryLabels[article.category]}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="pt-0 flex flex-col h-full">
                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                      <span>{formatDate(article.publishedAt)}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {article.readTime}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2 flex-grow">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
                          <span className="text-teal-700 font-semibold text-xs">
                            {article.author.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span className="text-sm text-slate-600">{article.author.name}</span>
                      </div>
                      <span className="text-teal-600 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Articles
            </Button>
          </div>
        </Container>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-br from-teal-700 via-teal-600 to-emerald-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <Container className="relative">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Stay Ahead of the Curve
            </h2>
            <p className="text-xl text-teal-100 mb-8">
              Get the latest research, regulatory updates, and practice insights delivered
              to your inbox every week. Join 10,000+ ketamine therapy professionals.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-5 py-3 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <Button
                type="submit"
                isLoading={isSubscribing}
                className="bg-white text-teal-700 hover:bg-teal-50"
              >
                Subscribe
              </Button>
            </form>

            <p className="text-teal-200 text-sm mt-4">
              No spam, ever. Unsubscribe anytime.
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}
