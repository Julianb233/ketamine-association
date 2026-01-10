'use client';

import {
  BookOpen,
  FileText,
  HelpCircle,
  ShoppingBag,
  Video,
  Microscope,
  ArrowRight,
  Search,
  Download,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

const resourceCategories = [
  {
    title: 'Research Library',
    description: 'Access peer-reviewed studies, clinical trials, and the latest research on ketamine therapy.',
    icon: Microscope,
    href: '/resources/research',
    color: 'teal',
    count: '200+ papers',
  },
  {
    title: 'Blog & Articles',
    description: 'Expert insights, practitioner perspectives, and patient stories from our community.',
    icon: FileText,
    href: '/blog',
    color: 'emerald',
    count: '150+ articles',
  },
  {
    title: 'FAQ',
    description: 'Answers to common questions about ketamine therapy, membership, and our association.',
    icon: HelpCircle,
    href: '/faq',
    color: 'amber',
    count: '50+ questions',
  },
  {
    title: 'Educational Products',
    description: 'Courses, guides, and materials for practitioners and patients.',
    icon: BookOpen,
    href: '/academy',
    color: 'teal',
    count: '25+ courses',
  },
  {
    title: 'Webinars & Videos',
    description: 'On-demand educational content from industry experts and leading researchers.',
    icon: Video,
    href: '/academy/practitioners/ce-credits',
    color: 'emerald',
    count: '100+ hours',
  },
  {
    title: 'Store',
    description: 'Patient resources, journals, comfort items, and supplementary products.',
    icon: ShoppingBag,
    href: '/store',
    color: 'amber',
    count: '50+ products',
  },
];

const featuredResources = [
  {
    title: 'Ketamine Therapy Safety Guidelines 2024',
    type: 'Clinical Guide',
    description: 'Comprehensive safety protocols for ketamine administration in clinical settings.',
    downloadable: true,
  },
  {
    title: 'Patient Preparation Handbook',
    type: 'Patient Resource',
    description: 'Everything patients need to know before, during, and after ketamine treatment.',
    downloadable: true,
  },
  {
    title: 'State-by-State Regulatory Overview',
    type: 'Legal Resource',
    description: 'Current ketamine therapy regulations and requirements by state.',
    downloadable: true,
  },
];

export default function ResourcesPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-700 via-teal-600 to-emerald-600 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <Container className="relative py-20 lg:py-28">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" size="lg" className="mb-6 bg-white/20 text-white border-0">
              <BookOpen className="w-4 h-4 mr-2" />
              Resources
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Knowledge Center
            </h1>

            <p className="text-xl text-teal-100 mb-10 max-w-2xl mx-auto">
              Access comprehensive resources for practitioners and patients,
              including research, guides, educational materials, and more.
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>
            </div>
          </div>
        </Container>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-16 sm:h-24">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <Badge variant="primary" className="mb-4">Browse by Category</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Explore Our Resources
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Everything you need to learn about ketamine therapy, organized for easy access.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resourceCategories.map((category) => {
              const colorClasses = {
                teal: 'bg-teal-100 text-teal-600',
                emerald: 'bg-emerald-100 text-emerald-600',
                amber: 'bg-amber-100 text-amber-600',
              };
              return (
                <Card key={category.title} hover className="group">
                  <CardContent className="p-8">
                    <div className={`w-14 h-14 rounded-xl ${colorClasses[category.color as keyof typeof colorClasses]} flex items-center justify-center mb-6`}>
                      <category.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{category.title}</h3>
                    <p className="text-slate-600 mb-4">{category.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">{category.count}</span>
                      <Button href={category.href} variant="ghost" size="sm" className="group-hover:text-teal-600">
                        Explore
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Featured Resources */}
      <section className="py-20 bg-slate-50">
        <Container>
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Featured</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Essential Downloads
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Our most popular resources, available for immediate download.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {featuredResources.map((resource) => (
              <div
                key={resource.title}
                className="bg-white rounded-xl border border-slate-100 p-6 flex items-center justify-between hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{resource.title}</h3>
                    <p className="text-sm text-slate-500">{resource.type}</p>
                  </div>
                </div>
                <Button variant="secondary" size="sm" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download
                </Button>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button href="/resources/research" variant="primary" size="lg">
              View All Resources
              <ArrowRight className="w-5 h-5 ml-2" />
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
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Stay Updated with the Latest Research
            </h2>
            <p className="text-xl text-teal-100 mb-10 max-w-2xl mx-auto">
              Subscribe to our newsletter for weekly updates on ketamine therapy research,
              clinical insights, and industry news.
            </p>

            <div className="max-w-md mx-auto flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
              <Button variant="secondary" className="bg-white text-teal-700 hover:bg-teal-50">
                Subscribe
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
