'use client';

import { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Search, MapPin, Shield, Award, Users, Clock, Star, ArrowRight, CheckCircle, Heart, Brain, Sparkles } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

const stats = [
  { value: '500+', label: 'Verified Providers', icon: Users },
  { value: '50,000+', label: 'Patients Helped', icon: Heart },
  { value: '98%', label: 'Satisfaction Rate', icon: Star },
  { value: '24/7', label: 'Support Available', icon: Clock },
];

const howItWorks = [
  {
    step: '01',
    title: 'Search Your Location',
    description: 'Enter your city or zip code to find verified ketamine therapy providers in your area.',
    icon: Search,
  },
  {
    step: '02',
    title: 'Compare Providers',
    description: 'Review credentials, specialties, patient reviews, and treatment approaches.',
    icon: Shield,
  },
  {
    step: '03',
    title: 'Book Your Consultation',
    description: 'Schedule a consultation to discuss your needs and begin your healing journey.',
    icon: Award,
  },
];

const patientBenefits = [
  { title: 'Verified Credentials', description: 'All providers are thoroughly vetted and credentialed', icon: Shield },
  { title: 'Real Patient Reviews', description: 'Read authentic experiences from real patients', icon: Star },
  { title: 'Treatment Guides', description: 'Comprehensive resources to help you prepare', icon: Brain },
  { title: 'Insurance Help', description: 'Navigate coverage and financing options', icon: Heart },
];

const practitionerBenefits = [
  { title: 'Increased Visibility', description: 'Get found by patients actively seeking treatment', icon: Search },
  { title: 'Professional Network', description: 'Connect with peers and industry leaders', icon: Users },
  { title: 'Continuing Education', description: 'Access exclusive training and certifications', icon: Award },
  { title: 'Practice Resources', description: 'Tools and templates to grow your practice', icon: Sparkles },
];

const featuredProviders = [
  {
    name: 'Dr. Sarah Chen',
    specialty: 'Psychiatry',
    location: 'Austin, TX',
    rating: 4.9,
    reviews: 127,
    image: '/images/provider-1.jpg',
    certifications: ['Board Certified', 'KAP Certified'],
  },
  {
    name: 'Dr. Michael Torres',
    specialty: 'Anesthesiology',
    location: 'Denver, CO',
    rating: 4.8,
    reviews: 89,
    image: '/images/provider-2.jpg',
    certifications: ['Board Certified', 'KRIYA Trained'],
  },
  {
    name: 'Dr. Emily Watson',
    specialty: 'Pain Medicine',
    location: 'Seattle, WA',
    rating: 4.9,
    reviews: 156,
    image: '/images/provider-3.jpg',
    certifications: ['Board Certified', 'Ketamine Specialist'],
  },
];

const testimonials = [
  {
    quote: 'After years of treatment-resistant depression, ketamine therapy gave me my life back. The Ketamine Association helped me find a provider I could trust.',
    author: 'Jennifer M.',
    location: 'Portland, OR',
    condition: 'Treatment-Resistant Depression',
    image: '/images/testimonials/avatar-1.jpg',
  },
  {
    quote: 'The verification process gave me confidence that I was in good hands. My provider was compassionate, knowledgeable, and the results speak for themselves.',
    author: 'Robert K.',
    location: 'Chicago, IL',
    condition: 'Chronic Pain',
    image: '/images/testimonials/avatar-2.jpg',
  },
  {
    quote: 'Finding a certified ketamine provider through this platform was seamless. The educational resources prepared me for what to expect.',
    author: 'Amanda S.',
    location: 'Miami, FL',
    condition: 'PTSD',
    image: '/images/testimonials/avatar-3.jpg',
  },
];

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function HomePage() {
  const [searchLocation, setSearchLocation] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchLocation) {
      window.location.href = `/providers?location=${encodeURIComponent(searchLocation)}`;
    }
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-700 via-teal-600 to-emerald-600 overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }} />
        </div>

        {/* Floating Decorative Elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-300 rounded-full blur-3xl"
        />

        <Container className="relative py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <Badge variant="secondary" size="lg" className="mb-6 bg-white/20 text-white border-0">
                The Trusted Network for Ketamine Therapy
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Find Expert{' '}
              <span className="relative inline-block">
                Ketamine Therapy
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
                  className="absolute bottom-0 left-0 right-0 h-1 bg-white/30 origin-left"
                />
              </span>
              {' '}Providers Near You
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
              className="text-xl text-teal-100 mb-10 max-w-2xl mx-auto"
            >
              Connect with verified, credentialed ketamine therapy specialists.
              Your journey to mental wellness starts with finding the right provider.
            </motion.p>

            {/* Search Bar */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
              onSubmit={handleSearch}
              className="max-w-2xl mx-auto mb-8"
            >
              <motion.div
                whileHover={{ scale: 1.02, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
                className="flex flex-col sm:flex-row gap-3 p-3 bg-white rounded-2xl shadow-2xl"
              >
                <div className="flex-1 flex items-center gap-3 px-4">
                  <MapPin className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Enter your city or zip code"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="w-full py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none text-lg"
                  />
                </div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button type="submit" variant="primary" size="lg" className="flex items-center gap-2">
                    <Search className="w-5 h-5" />
                    Find Providers
                  </Button>
                </motion.div>
              </motion.div>
            </motion.form>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
              className="text-teal-200 text-sm"
            >
              Popular searches: New York, Los Angeles, Chicago, Houston, Phoenix
            </motion.p>
          </div>
        </Container>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-16 sm:h-24">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <Container>
          <AnimatedSection>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={fadeInUp}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-14 h-14 rounded-xl bg-teal-100 flex items-center justify-center mx-auto mb-4"
                  >
                    <stat.icon className="w-7 h-7 text-teal-600" />
                  </motion.div>
                  <div className="text-3xl sm:text-4xl font-bold text-slate-900 mb-1">{stat.value}</div>
                  <div className="text-slate-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* Mission Statement Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(20, 184, 166, 0.3) 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }} />
        </div>

        {/* Floating Orbs */}
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-20 left-10 w-72 h-72 bg-teal-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, 40, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          className="absolute top-1/2 left-1/3 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl"
        />

        <Container className="relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Badge variant="secondary" className="mb-6 bg-teal-500/20 text-teal-300 border-teal-500/30">
                Our Mission
              </Badge>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight"
            >
              Transforming Mental Health Through{' '}
              <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                Evidence-Based Care
              </span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="space-y-6 text-lg text-slate-300"
            >
              <p className="leading-relaxed">
                The Ketamine Association is dedicated to advancing the safe, ethical, and effective use of ketamine therapy
                for mental health conditions. We believe that everyone deserves access to innovative treatments that can
                transform lives when traditional approaches have fallen short.
              </p>
              <p className="leading-relaxed">
                Through rigorous provider verification, continuous education, and unwavering commitment to patient safety,
                we&apos;re building a future where breakthrough treatments are accessible, trustworthy, and delivered by
                the most qualified professionals.
              </p>
            </motion.div>

            {/* Mission Pillars */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="grid md:grid-cols-3 gap-8 mt-16"
            >
              {[
                { icon: Shield, title: 'Safety First', description: 'Rigorous standards and verification for all providers' },
                { icon: Brain, title: 'Evidence-Based', description: 'Treatments backed by scientific research' },
                { icon: Heart, title: 'Patient-Centered', description: 'Compassionate care focused on your healing journey' },
              ].map((pillar, index) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="group"
                >
                  <motion.div
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center mx-auto mb-4"
                    >
                      <pillar.icon className="w-7 h-7 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-white mb-2">{pillar.title}</h3>
                    <p className="text-slate-400">{pillar.description}</p>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-slate-50">
        <Container>
          <AnimatedSection className="text-center mb-16">
            <motion.div variants={fadeInUp}>
              <Badge variant="primary" className="mb-4">Simple Process</Badge>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              How It Works
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-slate-600 max-w-2xl mx-auto">
              Finding the right ketamine therapy provider is easy with our streamlined process.
            </motion.p>
          </AnimatedSection>

          <AnimatedSection>
            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {howItWorks.map((item, index) => (
                <motion.div
                  key={item.step}
                  variants={scaleIn}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="relative"
                >
                  {index < howItWorks.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-teal-200" />
                  )}
                  <motion.div
                    whileHover={{ y: -8, boxShadow: '0 25px 50px -12px rgba(20, 184, 166, 0.15)' }}
                    className="relative bg-white rounded-2xl p-8 shadow-lg transition-all duration-300"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center mb-6 mx-auto"
                    >
                      <item.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <div className="text-teal-600 font-bold mb-2 text-center">Step {item.step}</div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 text-center">{item.title}</h3>
                    <p className="text-slate-600 text-center">{item.description}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Patient Benefits */}
            <AnimatedSection>
              <motion.div variants={fadeInUp}>
                <Badge variant="secondary" className="mb-4">For Patients</Badge>
              </motion.div>
              <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-slate-900 mb-6">
                Your Path to Healing Starts Here
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-lg text-slate-600 mb-8">
                We make it easy to find qualified, compassionate ketamine therapy providers
                who can help you on your journey to better mental health.
              </motion.p>
              <div className="space-y-6">
                {patientBenefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    variants={fadeInUp}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0"
                    >
                      <benefit.icon className="w-6 h-6 text-emerald-600" />
                    </motion.div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">{benefit.title}</h3>
                      <p className="text-slate-600">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <motion.div variants={fadeInUp} className="mt-8">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Button variant="primary" href="/providers">
                    Find a Provider
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </motion.div>
              </motion.div>
            </AnimatedSection>

            {/* Practitioner Benefits */}
            <AnimatedSection>
              <motion.div variants={fadeInUp}>
                <Badge variant="accent" className="mb-4">For Practitioners</Badge>
              </motion.div>
              <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-slate-900 mb-6">
                Grow Your Ketamine Practice
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-lg text-slate-600 mb-8">
                Join the leading network of ketamine therapy providers. Get found by patients,
                access exclusive resources, and elevate your practice.
              </motion.p>
              <div className="space-y-6">
                {practitionerBenefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    variants={fadeInUp}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0"
                    >
                      <benefit.icon className="w-6 h-6 text-amber-600" />
                    </motion.div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">{benefit.title}</h3>
                      <p className="text-slate-600">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <motion.div variants={fadeInUp} className="mt-8">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Button href="/association/membership" className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-amber-500/25">
                    Join as Provider
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </motion.div>
              </motion.div>
            </AnimatedSection>
          </div>
        </Container>
      </section>

      {/* Featured Providers */}
      <section className="py-20 bg-slate-50">
        <Container>
          <AnimatedSection className="text-center mb-12">
            <motion.div variants={fadeInUp}>
              <Badge variant="primary" className="mb-4">Top Rated</Badge>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Featured Providers
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-slate-600 max-w-2xl mx-auto">
              Discover highly-rated ketamine therapy specialists trusted by patients nationwide.
            </motion.p>
          </AnimatedSection>

          <AnimatedSection>
            <div className="grid md:grid-cols-3 gap-8">
              {featuredProviders.map((provider, index) => (
                <motion.div
                  key={provider.name}
                  variants={scaleIn}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <motion.div
                    whileHover={{ y: -8, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)' }}
                    className="h-full"
                  >
                    <Card hover className="overflow-hidden h-full">
                      <div className="h-48 bg-gradient-to-br from-teal-100 to-emerald-100 flex items-center justify-center relative overflow-hidden">
                        <motion.img
                          src={provider.image}
                          alt={provider.name}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold text-slate-900 mb-1">{provider.name}</h3>
                        <p className="text-teal-600 font-medium mb-2">{provider.specialty}</p>
                        <div className="flex items-center gap-2 text-slate-600 mb-4">
                          <MapPin className="w-4 h-4" />
                          {provider.location}
                        </div>
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center gap-1">
                            <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                            <span className="font-semibold text-slate-900">{provider.rating}</span>
                          </div>
                          <span className="text-slate-500">({provider.reviews} reviews)</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {provider.certifications.map((cert) => (
                            <Badge key={cert} variant="outline" size="sm">
                              {cert}
                            </Badge>
                          ))}
                        </div>
                        <Button variant="secondary" fullWidth href={`/providers/${provider.name.toLowerCase().replace(/\s+/g, '-')}`}>
                          View Profile
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-12"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Button variant="primary" size="lg" href="/providers">
                View All Providers
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <Container>
          <AnimatedSection className="text-center mb-12">
            <motion.div variants={fadeInUp}>
              <Badge variant="secondary" className="mb-4">Patient Stories</Badge>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Real Results, Real People
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-slate-600 max-w-2xl mx-auto">
              Hear from patients who found hope and healing through our network of providers.
            </motion.p>
          </AnimatedSection>

          <AnimatedSection>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <motion.div
                    whileHover={{ y: -5, boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.1)' }}
                  >
                    <Card className="p-8 h-full">
                      <div className="flex gap-1 mb-6">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                          >
                            <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                          </motion.div>
                        ))}
                      </div>
                      <blockquote className="text-slate-700 mb-6 italic">
                        &quot;{testimonial.quote}&quot;
                      </blockquote>
                      <div className="border-t border-slate-100 pt-6 flex items-start gap-4">
                        <motion.img
                          src={testimonial.image}
                          alt={testimonial.author}
                          className="w-12 h-12 rounded-full object-cover ring-2 ring-teal-100"
                          whileHover={{ scale: 1.1 }}
                        />
                        <div>
                          <p className="font-semibold text-slate-900">{testimonial.author}</p>
                          <p className="text-slate-600 text-sm">{testimonial.location}</p>
                          <Badge variant="primary" size="sm" className="mt-2">
                            {testimonial.condition}
                          </Badge>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-teal-700 via-teal-600 to-emerald-600 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }} />
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{
            y: [0, -15, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-10 left-20 w-48 h-48 bg-white rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 15, 0],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          className="absolute bottom-10 right-20 w-64 h-64 bg-emerald-300 rounded-full blur-3xl"
        />

        <Container className="relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
            >
              Ready to Start Your Healing Journey?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-teal-100 mb-10 max-w-2xl mx-auto"
            >
              Whether you&apos;re seeking treatment or looking to grow your practice,
              the Ketamine Association is here to help.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" href="/providers" className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-amber-500/25">
                  <Search className="w-5 h-5" />
                  Find a Provider
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  href="/association/membership"
                  className="bg-white text-teal-700 hover:bg-teal-50 flex items-center justify-center gap-2"
                >
                  <Shield className="w-5 h-5" />
                  Join as Provider
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12 flex flex-wrap items-center justify-center gap-8 text-teal-200"
            >
              {['Free to search', 'Verified providers', 'No commitment required'].map((text, index) => (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>{text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </main>
  );
}
