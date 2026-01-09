'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Stethoscope,
  Heart,
  CheckCircle,
  Shield,
  Users,
  Award,
} from 'lucide-react';

interface HeroProps {
  headline?: string;
  subheadline?: string;
  practitionerCta?: {
    label: string;
    href: string;
  };
  patientCta?: {
    label: string;
    href: string;
  };
  showImage?: boolean;
  imageUrl?: string;
}

const trustIndicators = [
  { text: 'Evidence-based protocols', icon: CheckCircle },
  { text: 'Board-certified providers', icon: Award },
  { text: 'HIPAA compliant', icon: Shield },
];

export function Hero({
  headline = 'Advancing Ketamine Therapy Through Excellence',
  subheadline = 'The leading professional association dedicated to education, research, and standards in ketamine-assisted therapy. Join our community of certified practitioners transforming mental health care.',
  practitionerCta = {
    label: 'For Practitioners',
    href: '/practitioners',
  },
  patientCta = {
    label: 'Find a Provider',
    href: '/find-provider',
  },
  showImage = true,
  imageUrl,
}: HeroProps) {
  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-white via-slate-50 to-white">
      {/* Subtle Dot Pattern Background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(20 184 166) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-teal-200 rounded-full opacity-20 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-300 rounded-full opacity-20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-center lg:text-left space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-100 text-teal-700 text-sm font-medium"
            >
              <CheckCircle className="h-4 w-4" />
              Trusted by 500+ Healthcare Providers
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 leading-tight tracking-tight"
            >
              {headline.split(' ').map((word, i) => (
                <span key={i}>
                  {word.toLowerCase() === 'ketamine' ||
                  word.toLowerCase() === 'excellence' ? (
                    <span className="text-teal-600 relative inline-block">
                      {word}
                      {word.toLowerCase() === 'ketamine' && (
                        <motion.div
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
                          className="absolute bottom-0 left-0 right-0 h-1 bg-teal-500/30 origin-left"
                        />
                      )}
                    </span>
                  ) : (
                    word
                  )}{' '}
                </span>
              ))}
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
              className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              {subheadline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              {/* Primary CTA */}
              <Link href={practitionerCta.href}>
                <motion.div
                  whileHover={{
                    scale: 1.03,
                    boxShadow: '0 20px 40px -12px rgba(20, 184, 166, 0.4)',
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-teal-600 rounded-xl shadow-lg hover:bg-teal-700 transition-all duration-300"
                >
                  <Stethoscope className="h-5 w-5" />
                  {practitionerCta.label}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </motion.div>
              </Link>

              {/* Secondary CTA */}
              <Link href={patientCta.href}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-teal-700 bg-white border-2 border-teal-200 rounded-xl hover:border-teal-300 hover:bg-teal-50 transition-all duration-300"
                >
                  <Heart className="h-5 w-5" />
                  {patientCta.label}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </motion.div>
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-slate-500 pt-4"
            >
              {trustIndicators.map((item, index) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <item.icon className="w-5 h-5 text-teal-600" />
                  <span className="font-medium">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Visual Column */}
          {showImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              className="relative hidden lg:block"
            >
              <div className="relative aspect-square max-w-xl mx-auto">
                {/* Background Gradient Circle */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
                  className="absolute inset-0 bg-gradient-to-br from-teal-100 via-teal-50 to-sky-100 rounded-full blur-3xl opacity-60"
                />

                {/* Main Image/Card Container */}
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Center Card - Provider Profile */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.6, ease: 'easeOut' }}
                    whileHover={{
                      y: -8,
                      boxShadow: '0 25px 50px -12px rgba(20, 184, 166, 0.25)',
                    }}
                    className="relative z-30 bg-white rounded-2xl shadow-2xl p-8 border border-slate-200 w-80"
                  >
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt="Ketamine therapy professional"
                        fill
                        className="object-cover rounded-xl"
                        priority
                      />
                    ) : (
                      <>
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                            <Stethoscope className="w-6 h-6 text-teal-600" />
                          </div>
                          <span className="text-xs font-semibold text-teal-600 bg-teal-50 px-3 py-1 rounded-full">
                            CERTIFIED
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">
                          Ketamine Provider
                        </h3>
                        <p className="text-sm text-slate-600 mb-4">
                          Board-certified and KA-approved practitioners
                        </p>
                        <div className="space-y-2 text-xs text-slate-600">
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-teal-500 rounded-full" />
                            <span>Evidence-based treatment protocols</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-teal-500 rounded-full" />
                            <span>Verified credentials & licensing</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-teal-500 rounded-full" />
                            <span>Patient safety focus</span>
                          </div>
                        </div>
                      </>
                    )}
                  </motion.div>

                  {/* Top Left - Stats Card */}
                  <motion.div
                    initial={{ opacity: 0, x: -20, y: 20 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.7, ease: 'easeOut' }}
                    className="absolute top-8 -left-8 z-20 bg-white rounded-xl shadow-lg p-4 border border-slate-100"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-teal-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-slate-900">98%</div>
                        <div className="text-xs text-slate-500">Satisfaction Rate</div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Bottom Right - Providers Card */}
                  <motion.div
                    initial={{ opacity: 0, x: 20, y: -20 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.8, ease: 'easeOut' }}
                    className="absolute bottom-8 -right-8 z-20 bg-white rounded-xl shadow-lg p-4 border border-slate-100"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-2">
                        <div className="w-8 h-8 rounded-full bg-teal-200 border-2 border-white" />
                        <div className="w-8 h-8 rounded-full bg-teal-300 border-2 border-white" />
                        <div className="w-8 h-8 rounded-full bg-teal-400 border-2 border-white" />
                      </div>
                      <div>
                        <div className="text-xl font-bold text-slate-900">500+</div>
                        <div className="text-xs text-slate-500">Certified Providers</div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Decorative Floating Elements */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute top-20 right-0 w-16 h-16 bg-teal-200 rounded-full opacity-20 blur-xl"
                />
                <motion.div
                  animate={{
                    y: [0, 10, 0],
                    rotate: [0, -5, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.5,
                  }}
                  className="absolute bottom-20 left-0 w-20 h-20 bg-sky-200 rounded-full opacity-20 blur-xl"
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Bottom Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none">
        <svg
          className="w-full h-full text-white"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,0 C300,80 900,80 1200,0 L1200,120 L0,120 Z"
            fill="currentColor"
            opacity="0.1"
          />
        </svg>
      </div>
    </section>
  );
}
