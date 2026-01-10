'use client';

import {
  FileText,
  CheckCircle,
  Clock,
  Send,
  Edit3,
  Eye,
  ArrowRight,
  BookOpen,
  Target,
  AlertCircle,
  Mail,
  Shield,
  Award,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

const categories = [
  { name: 'Clinical Research', description: 'Original research, case studies, and clinical outcomes' },
  { name: 'Practice Management', description: 'Business operations, compliance, and clinic optimization' },
  { name: 'Patient Stories', description: 'Treatment journeys, testimonials, and recovery narratives' },
  { name: 'Regulatory Updates', description: 'Legal changes, policy developments, and compliance guidance' },
  { name: 'Treatment Innovations', description: 'New protocols, techniques, and therapeutic approaches' },
  { name: 'Industry News', description: 'Market trends, conferences, and community updates' },
];

const reviewProcess = [
  {
    step: 1,
    title: 'Submission',
    description: 'Submit your article through our online portal with all required information.',
    icon: Send,
  },
  {
    step: 2,
    title: 'Initial Review',
    description: 'Our editorial team reviews for fit, quality, and adherence to guidelines.',
    icon: Eye,
    duration: '3-5 business days',
  },
  {
    step: 3,
    title: 'Revision (if needed)',
    description: 'Work with our editors to refine your article based on feedback.',
    icon: Edit3,
  },
  {
    step: 4,
    title: 'Final Approval',
    description: 'Article is approved, scheduled, and prepared for publication.',
    icon: CheckCircle,
  },
];

const requirements = [
  'Word count: 1,000 - 3,000 words',
  'Original, unpublished content only',
  'Proper citations for any research referenced',
  'Author bio and headshot required',
  'High-quality images (min 1200px width) if applicable',
  'Must be relevant to ketamine therapy field',
];

export default function GuidelinesPage() {
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
              <FileText className="w-4 h-4 mr-2" />
              Submission Guidelines
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Article Submission Guidelines
            </h1>

            <p className="text-xl text-teal-100 mb-10 max-w-2xl mx-auto">
              Learn how to submit your articles to the Ketamine Association blog
              and share your expertise with our community.
            </p>

            <Button href="/publish/submit" variant="secondary" size="lg" className="bg-white text-teal-700 hover:bg-teal-50">
              Submit an Article
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </Container>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-16 sm:h-24">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <Badge variant="primary" className="mb-4">Topics</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Article Categories
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              We accept submissions in the following categories.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {categories.map((category) => (
              <Card key={category.name} className="p-6">
                <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center mb-4">
                  <Target className="w-5 h-5 text-teal-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{category.name}</h3>
                <p className="text-slate-600 text-sm">{category.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Requirements */}
      <section className="py-20 bg-slate-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">Requirements</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                Submission Requirements
              </h2>
              <p className="text-xl text-slate-600">
                Please ensure your submission meets these requirements.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {requirements.map((req, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-white rounded-xl p-4 border border-slate-100"
                >
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span className="text-slate-700">{req}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-amber-800 mb-2">Editorial Standards</h3>
                  <p className="text-amber-700">
                    All submissions must be factually accurate, properly sourced, and free of
                    promotional content. We reserve the right to edit for clarity, grammar, and style.
                    Articles making medical claims must include appropriate citations from peer-reviewed sources.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Review Process */}
      <section className="py-20 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="primary" className="mb-4">Process</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                Review Process
              </h2>
              <p className="text-xl text-slate-600">
                Here&apos;s what happens after you submit your article.
              </p>
            </div>

            <div className="space-y-6">
              {reviewProcess.map((step) => (
                <div
                  key={step.step}
                  className="bg-slate-50 rounded-2xl p-6 flex items-start gap-6"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
                      {step.duration && (
                        <Badge variant="secondary" size="sm" className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {step.duration}
                        </Badge>
                      )}
                    </div>
                    <p className="text-slate-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Formatting Guidelines */}
      <section className="py-20 bg-slate-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">Formatting</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                Formatting Guidelines
              </h2>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 p-8">
              <div className="prose prose-slate max-w-none">
                <h3>Structure</h3>
                <ul>
                  <li>Use clear headings and subheadings (H2, H3)</li>
                  <li>Keep paragraphs concise (3-4 sentences)</li>
                  <li>Include an engaging introduction that hooks the reader</li>
                  <li>End with a clear conclusion or call-to-action</li>
                </ul>

                <h3>Style</h3>
                <ul>
                  <li>Write in active voice</li>
                  <li>Use accessible language (avoid excessive jargon)</li>
                  <li>Define technical terms when first used</li>
                  <li>Maintain professional but approachable tone</li>
                </ul>

                <h3>Citations</h3>
                <ul>
                  <li>Use APA format for citations</li>
                  <li>Include DOI links when available</li>
                  <li>Link to original sources where possible</li>
                  <li>All statistics must be properly sourced</li>
                </ul>

                <h3>Images</h3>
                <ul>
                  <li>Minimum resolution: 1200px width</li>
                  <li>Accepted formats: JPG, PNG, WebP</li>
                  <li>Include alt text descriptions</li>
                  <li>Must have rights to use all images</li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Copyright Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6">
                <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Copyright</h3>
                <p className="text-slate-600">
                  Authors retain copyright of their work. By submitting, you grant the
                  Ketamine Association a non-exclusive license to publish and distribute
                  your article. You may republish elsewhere after 30 days with attribution.
                </p>
              </Card>
              <Card className="p-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Benefits</h3>
                <p className="text-slate-600">
                  Published authors receive enhanced visibility in our provider directory,
                  are featured in our newsletter, and may be eligible for speaking
                  opportunities at our events.
                </p>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* Contact */}
      <section className="py-20 bg-slate-50">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <Mail className="w-12 h-12 text-teal-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Questions About Submissions?
            </h2>
            <p className="text-xl text-slate-600 mb-8">
              Contact our editorial team at{' '}
              <a href="mailto:editorial@ketamineassociation.org" className="text-teal-600 hover:underline">
                editorial@ketamineassociation.org
              </a>
            </p>
            <Button href="/publish/submit" variant="primary" size="lg">
              Submit Your Article
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </Container>
      </section>
    </main>
  );
}
