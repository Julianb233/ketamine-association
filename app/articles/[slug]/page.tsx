'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Clock,
  Calendar,
  ArrowLeft,
  ArrowRight,
  Share2,
  Twitter,
  Facebook,
  Linkedin,
  Link2,
  BookOpen,
  Eye
} from 'lucide-react';

// Placeholder article data - in production this would come from an API/database
const articleData: Record<string, {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: {
    name: string;
    role: string;
    bio: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: string;
  views: number;
  tags: string[];
  image: string;
}> = {
  'breakthrough-ketamine-depression-study-2025': {
    slug: 'breakthrough-ketamine-depression-study-2025',
    title: 'Breakthrough Study: Ketamine Shows 70% Response Rate in Treatment-Resistant Depression',
    excerpt: 'A landmark multi-center study published in JAMA Psychiatry demonstrates unprecedented efficacy of IV ketamine therapy.',
    content: `
## Key Findings

A groundbreaking multi-center study published this month in JAMA Psychiatry has demonstrated that intravenous ketamine therapy achieves a remarkable 70% response rate in patients with treatment-resistant depression (TRD). This landmark research, conducted across 15 clinical sites with over 500 participants, provides the strongest evidence yet for ketamine as a viable treatment option for those who have not responded to traditional antidepressants.

### Study Design and Methodology

The randomized, double-blind, placebo-controlled trial enrolled 512 adults aged 18-65 who had failed to respond to at least two adequate trials of antidepressant medications. Participants received either:

- **Active treatment group**: Six IV ketamine infusions (0.5 mg/kg over 40 minutes) over two weeks
- **Control group**: Saline placebo infusions with identical administration protocols

Primary outcomes were measured using the Montgomery-Asberg Depression Rating Scale (MADRS) at two weeks, with secondary endpoints including remission rates, sustained response at 12 weeks, and safety assessments.

## Results That Change Everything

The findings exceeded expectations across all measured parameters:

### Primary Outcomes
- **70% response rate** in the ketamine group vs. 23% in placebo
- **45% remission rate** achieved with ketamine treatment
- **Rapid onset**: Mean time to initial response was 4.2 days

### Secondary Outcomes
- Sustained response maintained in 58% of responders at 12-week follow-up
- Significant improvements in anxiety symptoms (p < 0.001)
- Quality of life measures improved by 40% on average

> "These results represent a paradigm shift in how we approach treatment-resistant depression. For patients who have struggled for years without relief, ketamine offers genuine hope."
>
> — Dr. Maria Santos, Lead Investigator, Stanford University

## Safety Profile

The study confirmed ketamine's favorable safety profile when administered in clinical settings:

- **Dissociative symptoms**: Mild and transient, resolving within 2 hours
- **Blood pressure elevations**: Modest increases returned to baseline within 1 hour
- **No serious adverse events** attributable to treatment
- **Cognitive assessments**: No impairment at 24 hours post-infusion

### Most Common Side Effects
1. Dizziness (38%)
2. Nausea (27%)
3. Headache (21%)
4. Perceptual disturbances (19%)

## Implications for Clinical Practice

These findings have immediate implications for ketamine therapy providers:

### Treatment Protocols
The study validated the commonly used six-infusion induction protocol, providing evidence-based support for current clinical practices. Key protocol elements included:

- 0.5 mg/kg IV ketamine administered over 40 minutes
- Three sessions per week for two weeks
- Monitoring for at least 2 hours post-infusion
- Blood pressure checks every 15 minutes during infusion

### Patient Selection
The research identified factors associated with better outcomes:

- Shorter duration of current depressive episode
- Absence of personality disorders
- No active substance use disorder
- Adequate social support systems

## What This Means for the Field

This study represents the largest and most rigorous trial of ketamine for depression to date. Its findings support ketamine's position as a legitimate treatment option for TRD and may influence:

1. **Insurance coverage decisions** as evidence mounts for efficacy
2. **Clinical guidelines** from major psychiatric organizations
3. **FDA considerations** for expanded indications
4. **Provider training requirements** and certification standards

## Next Steps

The research team has announced plans for follow-up studies examining:

- Longer-term maintenance protocols
- Combination treatments with psychotherapy
- Biomarkers predicting treatment response
- Optimal dosing strategies for different patient populations

For ketamine therapy providers, this study reinforces the importance of adherence to evidence-based protocols while highlighting the tremendous potential of this treatment modality.

---

*The full study, "Efficacy and Safety of Intravenous Ketamine for Treatment-Resistant Depression: A Randomized Clinical Trial," is available in the January 2026 issue of JAMA Psychiatry.*
    `,
    category: 'CLINICAL_RESEARCH',
    author: {
      name: 'Dr. Sarah Mitchell',
      role: 'Chief Medical Editor',
      bio: 'Dr. Sarah Mitchell is a board-certified psychiatrist with over 15 years of experience in mood disorders and psychedelic medicine. She serves as the Chief Medical Editor for the Ketamine Association and has published extensively on ketamine-assisted therapies.',
      avatar: '/authors/sarah-mitchell.jpg',
    },
    publishedAt: '2025-12-28',
    readTime: '12 min read',
    views: 15847,
    tags: ['Depression', 'Clinical Research', 'Treatment-Resistant', 'IV Ketamine', 'JAMA'],
    image: '/articles/featured-depression-study.jpg',
  },
};

// Related articles
const relatedArticles = [
  {
    slug: 'integration-therapy-best-practices',
    title: 'Optimizing Patient Outcomes: Integration Therapy Best Practices',
    excerpt: 'Research shows that integration sessions significantly improve long-term outcomes.',
    category: 'PRACTICE_MANAGEMENT',
    readTime: '8 min read',
    publishedAt: '2026-01-03',
  },
  {
    slug: 'ketamine-chronic-pain-meta-analysis',
    title: 'Meta-Analysis: Ketamine Infusions Show Promise for Chronic Pain Conditions',
    excerpt: 'A comprehensive review of 47 studies reveals significant pain reduction.',
    category: 'CLINICAL_RESEARCH',
    readTime: '14 min read',
    publishedAt: '2025-12-27',
  },
  {
    slug: 'at-home-ketamine-safety-protocols',
    title: 'At-Home Ketamine Therapy: Establishing Safety Protocols for Telehealth Programs',
    excerpt: 'As telehealth ketamine programs expand, providers must implement robust safety protocols.',
    category: 'PRACTICE_MANAGEMENT',
    readTime: '15 min read',
    publishedAt: '2025-12-30',
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

export default function ArticleDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [copied, setCopied] = useState(false);

  // Get article data (fallback for demo)
  const article = articleData[slug] || articleData['breakthrough-ketamine-depression-study-2025'];

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = article.title;

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-700 via-teal-600 to-emerald-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <Container className="relative py-12 lg:py-20">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-teal-200">
              <li>
                <Link href="/articles" className="hover:text-white transition-colors flex items-center gap-1">
                  <ArrowLeft className="w-4 h-4" />
                  Articles
                </Link>
              </li>
              <li>/</li>
              <li className="text-white">{categoryLabels[article.category]}</li>
            </ol>
          </nav>

          <div className="max-w-4xl">
            <Badge variant={categoryColors[article.category]} size="lg" className="mb-6">
              {categoryLabels[article.category]}
            </Badge>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {article.title}
            </h1>

            <p className="text-xl text-teal-100 mb-8 max-w-3xl">
              {article.excerpt}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-teal-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {article.author.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="text-white font-medium">{article.author.name}</p>
                  <p className="text-teal-200 text-sm">{article.author.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(article.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{article.readTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>{article.views.toLocaleString()} views</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Article Content */}
      <section className="py-12 lg:py-16">
        <Container size="md">
          <div className="grid lg:grid-cols-[1fr_280px] gap-12">
            {/* Main Content */}
            <article className="prose prose-lg prose-slate max-w-none prose-headings:text-slate-900 prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-slate-600 prose-p:leading-relaxed prose-li:text-slate-600 prose-blockquote:border-l-teal-500 prose-blockquote:bg-teal-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-a:text-teal-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-900">
              <div dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br/>').replace(/<br\/><br\/>/g, '</p><p>').replace(/## /g, '</p><h2>').replace(/### /g, '</p><h3>').replace(/> /g, '</p><blockquote>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>').replace(/^- /gm, '<li>').replace(/<\/li>\n<li>/g, '</li><li>').replace(/<li>/g, '<ul><li>').replace(/<\/li>(?!<li>)/g, '</li></ul>').replace(/<ul><li>(\d+)\./g, '<ol><li>').replace(/<\/li><\/ul>(?=<ol>)/g, '</li>').replace(/<\/ul>(?=.*<\/ol>)/g, '</ol>') }} />
            </article>

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* Share Buttons */}
              <div className="sticky top-24">
                <Card className="p-6">
                  <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <Share2 className="w-5 h-5" />
                    Share this article
                  </h3>
                  <div className="space-y-3">
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 w-full p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
                    >
                      <Twitter className="w-5 h-5 text-[#1DA1F2]" />
                      <span className="text-slate-700">Share on Twitter</span>
                    </a>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 w-full p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
                    >
                      <Facebook className="w-5 h-5 text-[#4267B2]" />
                      <span className="text-slate-700">Share on Facebook</span>
                    </a>
                    <a
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 w-full p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
                    >
                      <Linkedin className="w-5 h-5 text-[#0A66C2]" />
                      <span className="text-slate-700">Share on LinkedIn</span>
                    </a>
                    <button
                      onClick={handleCopyLink}
                      className="flex items-center gap-3 w-full p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
                    >
                      <Link2 className="w-5 h-5 text-slate-600" />
                      <span className="text-slate-700">
                        {copied ? 'Link copied!' : 'Copy link'}
                      </span>
                    </button>
                  </div>
                </Card>

                {/* Tags */}
                <div className="mt-6">
                  <h3 className="font-semibold text-slate-900 mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/articles?tag=${encodeURIComponent(tag)}`}
                        className="px-3 py-1 bg-slate-100 text-slate-600 text-sm rounded-full hover:bg-slate-200 transition-colors"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* Author Bio */}
      <section className="py-12 bg-slate-50">
        <Container size="md">
          <Card className="p-8">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-2xl">
                  {article.author.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <p className="text-sm text-teal-600 font-medium mb-1">About the Author</p>
                <h3 className="text-xl font-bold text-slate-900 mb-1">{article.author.name}</h3>
                <p className="text-slate-600 mb-4">{article.author.role}</p>
                <p className="text-slate-600">{article.author.bio}</p>
                <div className="mt-4 flex gap-3">
                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                  <Button variant="ghost" size="sm">
                    Follow
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </Container>
      </section>

      {/* Related Articles */}
      <section className="py-16 bg-white">
        <Container>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900">Related Articles</h2>
            <Button variant="outline" href="/articles">
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {relatedArticles.map((relatedArticle) => (
              <Link key={relatedArticle.slug} href={`/articles/${relatedArticle.slug}`}>
                <Card hover className="h-full overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 relative -mx-6 -mt-6 mb-4">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-teal-600" />
                      </div>
                    </div>
                    <div className="absolute top-3 left-3">
                      <Badge variant={categoryColors[relatedArticle.category]} size="sm">
                        {categoryLabels[relatedArticle.category]}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="pt-0">
                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-2">
                      <span>{formatDate(relatedArticle.publishedAt)}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {relatedArticle.readTime}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2 line-clamp-2">
                      {relatedArticle.title}
                    </h3>
                    <p className="text-slate-600 text-sm line-clamp-2">
                      {relatedArticle.excerpt}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-50">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Stay Updated with the Latest Research
            </h2>
            <p className="text-slate-600 mb-6">
              Join our newsletter to receive weekly insights on ketamine therapy research,
              clinical best practices, and industry developments.
            </p>
            <Button variant="primary" size="lg" href="/articles">
              Subscribe to Newsletter
            </Button>
          </div>
        </Container>
      </section>
    </main>
  );
}
