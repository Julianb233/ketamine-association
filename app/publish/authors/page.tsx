'use client';

import {
  Users,
  Award,
  Eye,
  TrendingUp,
  BookOpen,
  Mic,
  Mail,
  ArrowRight,
  Star,
  FileText,
  Globe,
  CheckCircle,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

const featuredAuthors = [
  {
    name: 'Dr. Sarah Chen, MD',
    title: 'Psychiatrist & Researcher',
    bio: 'Leading researcher in ketamine therapy for treatment-resistant depression. Published over 30 articles on ketamine mechanisms and clinical outcomes.',
    articles: 12,
    initials: 'SC',
  },
  {
    name: 'Dr. Michael Torres, DO',
    title: 'Pain Management Specialist',
    bio: 'Pioneer in ketamine infusion therapy for chronic pain conditions. Developer of the Torres Protocol for CRPS treatment.',
    articles: 8,
    initials: 'MT',
  },
  {
    name: 'Jennifer Williams, PsyD',
    title: 'Clinical Psychologist',
    bio: 'Specialist in ketamine-assisted psychotherapy. Author of "Integration Matters: A Guide to KAP Best Practices."',
    articles: 15,
    initials: 'JW',
  },
  {
    name: 'Dr. Robert Kim, MD, PhD',
    title: 'Neuroscientist',
    bio: 'Researcher exploring the neural mechanisms of ketamine&apos;s antidepressant effects. Previously at NIH.',
    articles: 6,
    initials: 'RK',
  },
  {
    name: 'Dr. Amanda Foster, NP',
    title: 'Nurse Practitioner',
    bio: 'Clinic founder and educator specializing in accessible ketamine therapy. Advocate for expanded patient access.',
    articles: 9,
    initials: 'AF',
  },
  {
    name: 'David Park, MD',
    title: 'Anesthesiologist',
    bio: 'Expert in ketamine safety protocols and dosing optimization. Medical advisor to multiple ketamine clinics.',
    articles: 7,
    initials: 'DP',
  },
];

const contributorBenefits = [
  {
    title: 'Enhanced Directory Visibility',
    description: 'Published authors receive priority placement and a "Featured Author" badge in our provider directory.',
    icon: Eye,
  },
  {
    title: 'Thought Leadership',
    description: 'Establish yourself as an expert in the ketamine therapy field and build your professional reputation.',
    icon: Award,
  },
  {
    title: 'Newsletter Features',
    description: 'Your articles are promoted to our 50,000+ newsletter subscribers.',
    icon: Mail,
  },
  {
    title: 'SEO Benefits',
    description: 'Backlinks to your practice website and improved search visibility.',
    icon: Globe,
  },
  {
    title: 'Speaking Opportunities',
    description: 'Top contributors are invited to speak at our conferences and webinars.',
    icon: Mic,
  },
  {
    title: 'CE Credit Potential',
    description: 'Qualifying educational content may be converted to CE credit courses.',
    icon: BookOpen,
  },
];

const authorSpotlight = {
  name: 'Dr. Sarah Chen, MD',
  title: 'Psychiatrist & Researcher',
  quote: 'Contributing to the Ketamine Association blog has allowed me to share research findings with a broader audience and connect with practitioners who are implementing these insights in their clinics. The exposure has been invaluable for my practice.',
  articles: 12,
  views: '45,000+',
  initials: 'SC',
};

export default function AuthorsPage() {
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
              <Users className="w-4 h-4 mr-2" />
              Contributors
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Our Authors & Contributors
            </h1>

            <p className="text-xl text-teal-100 mb-10 max-w-2xl mx-auto">
              Meet the experts who share their knowledge and insights with our community.
              Join them in advancing the field of ketamine therapy.
            </p>

            <Button href="/publish/submit" variant="secondary" size="lg" className="bg-white text-teal-700 hover:bg-teal-50">
              Become a Contributor
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

      {/* Author Spotlight */}
      <section className="py-20 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="primary" className="mb-4">Spotlight</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Author Spotlight
              </h2>
            </div>

            <Card className="overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 bg-gradient-to-br from-teal-100 to-emerald-100 p-8 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-white text-4xl font-bold">
                    {authorSpotlight.initials}
                  </div>
                </div>
                <CardContent className="md:w-2/3 p-8">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                    <Badge variant="secondary" size="sm">Featured Author</Badge>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-1">{authorSpotlight.name}</h3>
                  <p className="text-teal-600 mb-4">{authorSpotlight.title}</p>
                  <blockquote className="text-slate-600 italic border-l-4 border-teal-500 pl-4 mb-6">
                    &quot;{authorSpotlight.quote}&quot;
                  </blockquote>
                  <div className="flex gap-6 text-sm">
                    <div>
                      <span className="text-slate-400">Articles:</span>
                      <span className="font-semibold text-slate-900 ml-2">{authorSpotlight.articles}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Total Views:</span>
                      <span className="font-semibold text-slate-900 ml-2">{authorSpotlight.views}</span>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* Featured Authors */}
      <section className="py-20 bg-slate-50">
        <Container>
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Our Experts</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Featured Contributors
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Practitioners, researchers, and thought leaders sharing their expertise.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredAuthors.map((author) => (
              <Card key={author.name} hover className="overflow-hidden">
                <div className="h-24 bg-gradient-to-br from-teal-100 to-emerald-100 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-white text-xl font-bold">
                    {author.initials}
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{author.name}</h3>
                  <p className="text-teal-600 text-sm mb-3">{author.title}</p>
                  <p className="text-slate-600 text-sm mb-4">{author.bio}</p>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <FileText className="w-4 h-4" />
                    <span>{author.articles} articles published</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Benefits of Contributing */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <Badge variant="primary" className="mb-4">Why Contribute?</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Benefits of Being a Contributor
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Share your expertise and gain valuable benefits for your practice.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {contributorBenefits.map((benefit) => (
              <Card key={benefit.title} className="p-6">
                <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{benefit.title}</h3>
                <p className="text-slate-600 text-sm">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* How to Become a Contributor */}
      <section className="py-20 bg-slate-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">Get Started</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                Become a Contributor
              </h2>
              <p className="text-xl text-slate-600">
                It&apos;s easy to share your expertise with our community.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-teal-600">1</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Review Guidelines</h3>
                <p className="text-slate-600 text-sm">
                  Read our submission guidelines to understand our requirements and standards.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-emerald-600">2</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Write Your Article</h3>
                <p className="text-slate-600 text-sm">
                  Create original content that provides value to our practitioner and patient community.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-amber-600">3</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Submit & Publish</h3>
                <p className="text-slate-600 text-sm">
                  Submit through our portal and work with our editorial team to publish.
                </p>
              </div>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/publish/guidelines" variant="secondary" size="lg">
                View Guidelines
              </Button>
              <Button href="/publish/submit" variant="primary" size="lg">
                Submit an Article
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-teal-700 via-teal-600 to-emerald-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <Container className="relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Share Your Expertise Today
            </h2>
            <p className="text-xl text-teal-100 mb-10 max-w-2xl mx-auto">
              Join our community of thought leaders and help advance the field of ketamine therapy.
              Your insights can make a difference.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                size="lg"
                href="/publish/submit"
                className="bg-white text-teal-700 hover:bg-teal-50"
              >
                Start Writing
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                href="/contact"
                className="bg-teal-500/30 text-white border border-teal-400/50 hover:bg-teal-500/50"
              >
                Contact Editorial Team
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
