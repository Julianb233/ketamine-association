'use client';

import { useState } from 'react';
import {
  Microscope,
  Search,
  Filter,
  ExternalLink,
  Calendar,
  Users,
  BookOpen,
  Download,
  ArrowRight,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

const categories = [
  'All',
  'Clinical Trials',
  'Safety Data',
  'Efficacy Studies',
  'Mechanism of Action',
  'Treatment Protocols',
  'Mental Health',
  'Chronic Pain',
];

const researchPapers = [
  {
    title: 'Rapid Antidepressant Effects of Ketamine: A Meta-Analysis',
    authors: 'Smith J, Chen L, Williams R',
    journal: 'Journal of Clinical Psychiatry',
    year: 2024,
    category: 'Efficacy Studies',
    abstract: 'A comprehensive meta-analysis of 47 randomized controlled trials examining the antidepressant effects of ketamine, demonstrating significant efficacy within 24 hours of administration.',
    citations: 156,
    doi: '10.1001/jcp.2024.12345',
  },
  {
    title: 'Long-term Safety of Repeated Ketamine Infusions in Treatment-Resistant Depression',
    authors: 'Martinez R, Johnson K, Park S',
    journal: 'American Journal of Psychiatry',
    year: 2024,
    category: 'Safety Data',
    abstract: 'A 5-year longitudinal study of 500 patients receiving maintenance ketamine therapy, assessing cognitive function, cardiovascular health, and urological outcomes.',
    citations: 89,
    doi: '10.1176/ajp.2024.54321',
  },
  {
    title: 'NMDA Receptor Modulation: Understanding Ketamine&apos;s Mechanism of Action',
    authors: 'Lee M, Garcia A, Thompson B',
    journal: 'Neuropsychopharmacology',
    year: 2023,
    category: 'Mechanism of Action',
    abstract: 'An exploration of ketamine&apos;s effects on glutamate signaling, synaptic plasticity, and the role of BDNF in rapid antidepressant response.',
    citations: 234,
    doi: '10.1038/npp.2023.67890',
  },
  {
    title: 'Ketamine for Chronic Pain: A Systematic Review',
    authors: 'Wilson D, Brown T, Davis M',
    journal: 'Pain Medicine',
    year: 2024,
    category: 'Chronic Pain',
    abstract: 'Systematic review of ketamine therapy for chronic pain conditions including CRPS, fibromyalgia, and neuropathic pain syndromes.',
    citations: 67,
    doi: '10.1093/pm.2024.11111',
  },
  {
    title: 'Optimal Dosing Protocols for Ketamine-Assisted Psychotherapy',
    authors: 'Anderson P, White S, Taylor N',
    journal: 'Psychopharmacology',
    year: 2024,
    category: 'Treatment Protocols',
    abstract: 'Comparative analysis of low-dose vs. dissociative-dose protocols in ketamine-assisted psychotherapy for PTSD and treatment-resistant depression.',
    citations: 112,
    doi: '10.1007/psy.2024.22222',
  },
  {
    title: 'Phase 3 Trial: Intranasal Ketamine for Major Depressive Disorder',
    authors: 'Roberts J, Miller K, Harris L',
    journal: 'JAMA Psychiatry',
    year: 2023,
    category: 'Clinical Trials',
    abstract: 'Multicenter randomized controlled trial demonstrating significant improvement in depression scores with intranasal ketamine compared to placebo.',
    citations: 298,
    doi: '10.1001/jamap.2023.33333',
  },
  {
    title: 'Ketamine in Acute Suicidal Ideation: Emergency Department Protocols',
    authors: 'Chen Y, Patel R, Singh A',
    journal: 'Annals of Emergency Medicine',
    year: 2024,
    category: 'Mental Health',
    abstract: 'Development and validation of emergency department protocols for administering ketamine to patients presenting with acute suicidal ideation.',
    citations: 45,
    doi: '10.1016/aem.2024.44444',
  },
  {
    title: 'Ketamine vs. ECT for Treatment-Resistant Depression: A Head-to-Head Comparison',
    authors: 'Moore E, Jackson F, Green W',
    journal: 'Lancet Psychiatry',
    year: 2024,
    category: 'Clinical Trials',
    abstract: 'First randomized controlled trial directly comparing ketamine infusions to electroconvulsive therapy for treatment-resistant major depression.',
    citations: 187,
    doi: '10.1016/lp.2024.55555',
  },
];

export default function ResearchLibraryPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPapers = researchPapers.filter((paper) => {
    const matchesCategory = selectedCategory === 'All' || paper.category === selectedCategory;
    const matchesSearch = paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.abstract.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
              <Microscope className="w-4 h-4 mr-2" />
              Research Library
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Scientific Research
            </h1>

            <p className="text-xl text-teal-100 mb-10 max-w-2xl mx-auto">
              Explore peer-reviewed studies, clinical trials, and the latest research
              on ketamine therapy from leading medical journals.
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search papers by title, author, or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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

      {/* Filters */}
      <section className="py-8 bg-white border-b border-slate-100 sticky top-20 z-40">
        <Container>
          <div className="flex items-center gap-4 overflow-x-auto pb-2">
            <Filter className="w-5 h-5 text-slate-400 flex-shrink-0" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
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

      {/* Research Papers */}
      <section className="py-12 bg-slate-50">
        <Container>
          <div className="mb-8 flex items-center justify-between">
            <p className="text-slate-600">
              Showing <span className="font-semibold text-slate-900">{filteredPapers.length}</span> papers
            </p>
          </div>

          <div className="space-y-6">
            {filteredPapers.map((paper) => (
              <Card key={paper.doi} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <Badge variant="secondary" size="sm" className="mb-3">
                        {paper.category}
                      </Badge>
                      <h3 className="text-xl font-bold text-slate-900 mb-2 hover:text-teal-600 cursor-pointer">
                        {paper.title}
                      </h3>
                      <p className="text-slate-600 mb-3">{paper.authors}</p>
                      <p className="text-slate-500 text-sm mb-4">{paper.abstract}</p>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          {paper.journal}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {paper.year}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {paper.citations} citations
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button variant="secondary" size="sm" className="flex items-center gap-2">
                        <ExternalLink className="w-4 h-4" />
                        View
                      </Button>
                      <Button variant="ghost" size="sm" className="flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        PDF
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPapers.length === 0 && (
            <div className="text-center py-12">
              <Microscope className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No papers found</h3>
              <p className="text-slate-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}

          {filteredPapers.length > 0 && (
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Papers
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          )}
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Contribute to Our Research Library
            </h2>
            <p className="text-xl text-slate-600 mb-8">
              Are you a researcher? Submit your ketamine therapy research for inclusion in our library.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/publish/submit" variant="primary" size="lg">
                Submit Research
              </Button>
              <Button href="/publish/guidelines" variant="secondary" size="lg">
                Submission Guidelines
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
