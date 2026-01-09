'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Star,
  ArrowRight,
  CheckCircle,
  Quote,
  Shield,
  TrendingUp,
  Users,
  Eye,
  Mail,
  Calendar,
  BookOpen,
  Globe,
  Crown,
  Sparkles,
  BarChart3,
  Megaphone,
  Video,
  FileText,
  ChevronDown,
  Award,
  Search,
  MessageSquare,
  Zap,
  HeadphonesIcon,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

const listingTiers = [
  {
    name: 'Standard',
    price: 99,
    description: 'Get started with a basic directory presence',
    icon: Search,
    color: 'slate',
    features: [
      'Directory listing',
      'Basic provider profile',
      'Contact form integration',
      'Standard search placement',
    ],
  },
  {
    name: 'Featured',
    price: 299,
    description: 'Stand out with enhanced visibility',
    icon: Star,
    color: 'teal',
    popular: true,
    features: [
      'Homepage spotlight rotation',
      'Priority search placement',
      'Verified provider badge',
      'Analytics dashboard',
      'Enhanced profile customization',
      'Social proof widgets',
    ],
  },
  {
    name: 'Premium',
    price: 599,
    description: 'Maximum exposure for your practice',
    icon: Crown,
    color: 'amber',
    features: [
      'Top placement in all searches',
      'Featured articles section',
      'Social media promotion',
      'Dedicated account support',
      'Custom profile branding',
      'Priority lead notifications',
      'Monthly performance reports',
    ],
  },
  {
    name: 'Platinum',
    price: 999,
    description: 'The ultimate practice growth package',
    icon: Sparkles,
    color: 'purple',
    features: [
      'All Premium features included',
      'Newsletter feature spotlight',
      'Quarterly webinar speaking spots',
      'Custom landing page',
      'White-glove onboarding',
      'VIP event access',
      'Co-marketing opportunities',
      'Executive strategy sessions',
    ],
  },
];

const sponsorshipPackages = [
  {
    name: 'Newsletter Sponsor',
    price: 500,
    unit: 'issue',
    icon: Mail,
    description: 'Reach 25,000+ practitioners directly in their inbox',
    benefits: [
      'Header banner placement',
      'Sponsored content section',
      'Direct CTA link',
      'Performance metrics',
    ],
  },
  {
    name: 'Event Sponsor',
    price: 2500,
    unit: 'event',
    icon: Calendar,
    description: 'Brand exposure at our industry-leading conferences',
    benefits: [
      'Logo on all event materials',
      'Booth space at venue',
      'Speaking opportunity',
      '10 VIP event tickets',
      'Post-event lead list',
    ],
  },
  {
    name: 'Academy Sponsor',
    price: 5000,
    unit: 'mo',
    icon: BookOpen,
    description: 'Associate your brand with continuing education',
    benefits: [
      'Logo on course materials',
      'Pre-roll video placement',
      'Course completion ads',
      'Certification co-branding',
      'Instructor meet & greets',
    ],
  },
  {
    name: 'Platform Sponsor',
    price: 10000,
    unit: 'mo',
    icon: Globe,
    description: 'Exclusive platform-wide visibility partnership',
    benefits: [
      'Homepage hero rotation',
      'All page footer presence',
      'Exclusive category sponsor',
      'Quarterly strategy reviews',
      'Custom integration options',
      'Executive networking access',
    ],
  },
];

const stats = [
  { value: '3x', label: 'More patient inquiries', sublabel: 'for featured providers' },
  { value: '25K+', label: 'Monthly visitors', sublabel: 'actively seeking providers' },
  { value: '500+', label: 'Provider network', sublabel: 'across the country' },
  { value: '92%', label: 'Patient trust rate', sublabel: 'for verified providers' },
];

const testimonials = [
  {
    quote: 'Since upgrading to the Featured tier, my patient inquiries have tripled. The verified badge alone has made a huge difference in building trust with potential patients.',
    author: 'Dr. Amanda Foster',
    role: 'Psychiatrist, Miami FL',
    tier: 'Featured Provider',
    initials: 'AF',
  },
  {
    quote: 'The Premium listing has been a game-changer for our clinic. The dedicated support team helped us optimize our profile and the results have exceeded our expectations.',
    author: 'Dr. Michael Chen',
    role: 'Pain Medicine, Los Angeles CA',
    tier: 'Premium Provider',
    initials: 'MC',
  },
  {
    quote: 'As a Platinum member, the webinar speaking opportunities have established me as a thought leader in the field. The ROI has been incredible.',
    author: 'Dr. Sarah Thompson',
    role: 'Anesthesiologist, New York NY',
    tier: 'Platinum Provider',
    initials: 'ST',
  },
];

const faqs = [
  {
    question: 'How quickly will I see results from a featured listing?',
    answer: 'Most featured providers see a noticeable increase in patient inquiries within the first 2-4 weeks. Our analytics dashboard allows you to track your visibility and engagement in real-time, so you can measure your ROI from day one.',
  },
  {
    question: 'Can I upgrade or downgrade my listing tier at any time?',
    answer: 'Yes, you can change your listing tier at any time. Upgrades take effect immediately, while downgrades will be applied at the start of your next billing cycle. We pro-rate any differences in pricing.',
  },
  {
    question: 'What is included in the verified provider badge?',
    answer: 'The verified badge indicates that you have completed our credential verification process, including license verification, malpractice insurance confirmation, and adherence to our quality standards. This badge significantly increases patient trust.',
  },
  {
    question: 'How do sponsorship packages differ from listing tiers?',
    answer: 'Listing tiers focus on your directory presence and direct patient connections. Sponsorship packages are designed for broader brand visibility across our platform, including newsletter features, event presence, and educational content integration.',
  },
  {
    question: 'Is there a minimum commitment period?',
    answer: 'Standard and Featured listings are month-to-month with no minimum commitment. Premium and Platinum tiers offer the best value with quarterly or annual commitments, though monthly options are available at a slightly higher rate.',
  },
  {
    question: 'How do I track my listing performance?',
    answer: 'Featured tier and above includes access to our analytics dashboard, where you can track profile views, search appearances, contact form submissions, and patient inquiry trends. Premium and Platinum members also receive monthly performance reports with optimization recommendations.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function SponsorshipPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; text: string; border: string; badge: string }> = {
      slate: {
        bg: 'bg-slate-100',
        text: 'text-slate-600',
        border: 'border-slate-200',
        badge: 'bg-slate-100 text-slate-700',
      },
      teal: {
        bg: 'bg-teal-100',
        text: 'text-teal-600',
        border: 'border-teal-200',
        badge: 'bg-teal-100 text-teal-700',
      },
      amber: {
        bg: 'bg-amber-100',
        text: 'text-amber-600',
        border: 'border-amber-200',
        badge: 'bg-amber-100 text-amber-700',
      },
      purple: {
        bg: 'bg-purple-100',
        text: 'text-purple-600',
        border: 'border-purple-200',
        badge: 'bg-purple-100 text-purple-700',
      },
    };
    return colorMap[color] || colorMap.slate;
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-700 via-teal-600 to-emerald-600 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <Container className="relative py-20 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Badge variant="secondary" size="lg" className="mb-6 bg-white/20 text-white border-0">
              For Practitioners & Partners
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Get Maximum Visibility for Your Practice
            </h1>

            <p className="text-xl text-teal-100 mb-10 max-w-2xl mx-auto">
              Connect with thousands of patients actively seeking ketamine therapy.
              Boost your practice with featured listings and strategic sponsorships.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                href="#listing-tiers"
                size="lg"
                className="bg-white text-teal-700 hover:bg-teal-50"
              >
                View Plans
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button
                href="/contact"
                size="lg"
                className="bg-teal-500/30 text-white border border-teal-400/50 hover:bg-teal-500/50"
              >
                Apply Now
              </Button>
            </div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-12 flex flex-wrap items-center justify-center gap-8 text-teal-200"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span>Verified Providers Only</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                <span>Proven ROI Results</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>500+ Provider Network</span>
              </div>
            </motion.div>
          </motion.div>
        </Container>

        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="w-full h-16 sm:h-24"
          >
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Featured Listing Tiers Section */}
      <section id="listing-tiers" className="py-20 bg-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge variant="primary" className="mb-4">
              Featured Listings
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Choose Your Visibility Level
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              From basic directory presence to premium placement, find the perfect tier
              to match your practice growth goals.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {listingTiers.map((tier) => {
              const colors = getColorClasses(tier.color);
              const Icon = tier.icon;

              return (
                <motion.div key={tier.name} variants={itemVariants}>
                  <Card
                    className={cn(
                      'relative h-full flex flex-col p-6',
                      tier.popular && 'ring-2 ring-teal-500 shadow-lg'
                    )}
                    hover
                  >
                    {tier.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <Badge variant="primary" size="sm">
                          Most Popular
                        </Badge>
                      </div>
                    )}

                    <div
                      className={cn(
                        'w-12 h-12 rounded-xl flex items-center justify-center mb-4',
                        colors.bg,
                        colors.text
                      )}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-2">{tier.name}</h3>
                    <p className="text-slate-600 text-sm mb-4">{tier.description}</p>

                    <div className="mb-6">
                      <span className="text-3xl font-bold text-slate-900">${tier.price}</span>
                      <span className="text-slate-600">/mo</span>
                    </div>

                    <ul className="space-y-3 mb-6 flex-1">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm text-slate-600">
                          <CheckCircle className={cn('w-4 h-4 mt-0.5 flex-shrink-0', colors.text)} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      href="/contact"
                      variant={tier.popular ? 'primary' : 'outline'}
                      fullWidth
                    >
                      Get Started
                    </Button>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </section>

      {/* Sponsorship Packages Section */}
      <section className="py-20 bg-slate-50">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge variant="secondary" className="mb-4">
              Sponsorship Packages
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Expand Your Reach with Sponsorships
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Go beyond listings with strategic sponsorship opportunities that put your brand
              in front of practitioners and patients alike.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {sponsorshipPackages.map((pkg) => {
              const Icon = pkg.icon;

              return (
                <motion.div key={pkg.name} variants={itemVariants}>
                  <Card className="h-full flex flex-col p-6" hover>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center text-white mb-4">
                      <Icon className="w-6 h-6" />
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-2">{pkg.name}</h3>
                    <p className="text-slate-600 text-sm mb-4">{pkg.description}</p>

                    <div className="mb-6">
                      <span className="text-3xl font-bold text-slate-900">
                        ${pkg.price.toLocaleString()}
                      </span>
                      <span className="text-slate-600">/{pkg.unit}</span>
                    </div>

                    <ul className="space-y-3 mb-6 flex-1">
                      {pkg.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-2 text-sm text-slate-600">
                          <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-500" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>

                    <Button href="/contact" variant="secondary" fullWidth>
                      Learn More
                    </Button>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </section>

      {/* ROI/Stats Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <Container className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge variant="primary" className="mb-4">
              Proven Results
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Featured Providers See Real Growth
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Our platform delivers measurable results for practices of all sizes.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="text-center"
              >
                <div className="text-5xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-white font-semibold mb-1">{stat.label}</div>
                <div className="text-slate-500 text-sm">{stat.sublabel}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-16 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <div className="flex items-center gap-3 text-slate-400">
              <BarChart3 className="w-5 h-5 text-teal-400" />
              <span>Real-time analytics dashboard</span>
            </div>
            <div className="flex items-center gap-3 text-slate-400">
              <Megaphone className="w-5 h-5 text-teal-400" />
              <span>Monthly performance reports</span>
            </div>
            <div className="flex items-center gap-3 text-slate-400">
              <HeadphonesIcon className="w-5 h-5 text-teal-400" />
              <span>Dedicated success support</span>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge variant="secondary" className="mb-4">
              Success Stories
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Hear From Featured Providers
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Real results from practitioners who upgraded their visibility.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="p-8 relative h-full">
                  <Quote className="w-10 h-10 text-teal-100 absolute top-6 right-6" />
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center text-white font-bold">
                      {testimonial.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{testimonial.author}</p>
                      <p className="text-slate-600 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <blockquote className="text-slate-700 mb-4 italic">
                    &quot;{testimonial.quote}&quot;
                  </blockquote>
                  <Badge variant="primary" size="sm">
                    {testimonial.tier}
                  </Badge>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-50">
        <Container size="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge variant="secondary" className="mb-4">
              FAQ
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Everything you need to know about our sponsorship and listing options.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card
                  className={cn(
                    'overflow-hidden transition-all duration-200',
                    openFaq === index && 'ring-2 ring-teal-500'
                  )}
                  padding="none"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-semibold text-slate-900">{faq.question}</span>
                    <ChevronDown
                      className={cn(
                        'w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-200',
                        openFaq === index && 'rotate-180'
                      )}
                    />
                  </button>
                  <motion.div
                    initial={false}
                    animate={{
                      height: openFaq === index ? 'auto' : 0,
                      opacity: openFaq === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-slate-600">{faq.answer}</div>
                  </motion.div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-teal-700 via-teal-600 to-emerald-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <Container className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Grow Your Practice?
            </h2>
            <p className="text-xl text-teal-100 mb-10 max-w-2xl mx-auto">
              Join hundreds of leading ketamine therapy providers who trust
              the Ketamine Association to connect them with patients.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                href="/contact"
                size="lg"
                className="bg-white text-teal-700 hover:bg-teal-50 flex items-center justify-center gap-2"
              >
                <Award className="w-5 h-5" />
                Apply for Sponsorship
              </Button>
              <Button
                href="/association/pricing"
                size="lg"
                className="bg-teal-500/30 text-white border border-teal-400/50 hover:bg-teal-500/50 flex items-center justify-center gap-2"
              >
                <Eye className="w-5 h-5" />
                View Membership Plans
              </Button>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-12 flex flex-wrap items-center justify-center gap-8 text-teal-200"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>No long-term contracts</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Dedicated account manager</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Results guaranteed</span>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </main>
  );
}
