'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Mail,
  ArrowRight,
  Shield,
  Award,
  CheckCircle,
} from 'lucide-react';

const footerLinks = {
  company: {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Mission', href: '/mission' },
      { label: 'Leadership', href: '/leadership' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  practitioners: {
    title: 'For Practitioners',
    links: [
      { label: 'Certification Programs', href: '/certifications' },
      { label: 'CE Credits', href: '/ce-credits' },
      { label: 'Practice Resources', href: '/practice-resources' },
      { label: 'Join as Provider', href: '/join-provider' },
      { label: 'Clinical Guidelines', href: '/guidelines' },
      { label: 'Research Participation', href: '/research' },
    ],
  },
  patients: {
    title: 'For Patients',
    links: [
      { label: 'Find a Provider', href: '/providers' },
      { label: 'Treatment Info', href: '/treatment-info' },
      { label: 'What to Expect', href: '/what-to-expect' },
      { label: 'Insurance & Costs', href: '/insurance' },
      { label: 'Patient Stories', href: '/patient-stories' },
      { label: 'Safety Information', href: '/safety' },
    ],
  },
  resources: {
    title: 'Resources',
    links: [
      { label: 'Research Library', href: '/research-library' },
      { label: 'Blog', href: '/blog' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Events', href: '/events' },
      { label: 'Webinars', href: '/webinars' },
      { label: 'Store', href: '/store' },
    ],
  },
};

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
];

const trustBadges = [
  { icon: Shield, label: 'HIPAA Compliant' },
  { icon: Award, label: 'Accredited Education' },
  { icon: CheckCircle, label: 'Verified Providers' },
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
  visible: { opacity: 1, y: 0 },
};

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-gray-300">
      {/* Newsletter Section */}
      <div className="border-b border-slate-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row items-center justify-between gap-8"
          >
            <div className="text-center lg:text-left">
              <h3 className="text-xl font-semibold text-white mb-2">
                Stay Updated with Ketamine Research
              </h3>
              <p className="text-gray-400">
                Get the latest news, research, and educational resources delivered to your inbox.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex w-full max-w-md gap-3">
              <motion.div
                className="relative flex-1"
                whileFocus={{ scale: 1.02 }}
              >
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  required
                />
              </motion.div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium rounded-xl hover:from-teal-600 hover:to-teal-700 transition-all shadow-lg shadow-teal-500/20 hover:shadow-xl hover:shadow-teal-500/30"
              >
                {isSubscribed ? (
                  <>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500 }}
                    >
                      <CheckCircle className="h-5 w-5" />
                    </motion.div>
                    Subscribed!
                  </>
                ) : (
                  <>
                    Subscribe
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12"
        >
          {/* Logo and Description */}
          <motion.div variants={itemVariants} className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4 group">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="relative"
              >
                <img
                  src="/images/logo-icon.svg"
                  alt="Ketamine Association"
                  className="h-10 w-10"
                />
              </motion.div>
              <span className="text-lg font-semibold text-white group-hover:text-teal-400 transition-colors">
                Ketamine Association
              </span>
            </Link>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Advancing ketamine therapy through education, research, and professional standards.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index, type: 'spring', stiffness: 300 }}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800/50 text-gray-400 hover:bg-teal-600 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Footer Link Columns */}
          {Object.values(footerLinks).map((section, sectionIndex) => (
            <motion.div key={section.title} variants={itemVariants}>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + linkIndex * 0.05 + sectionIndex * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className="group text-sm text-gray-400 hover:text-teal-400 transition-colors flex items-center gap-1"
                    >
                      <motion.span
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        initial={{ x: -5 }}
                        whileHover={{ x: 0 }}
                      >
                        &rarr;
                      </motion.span>
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 pt-8 border-t border-slate-800/50"
        >
          <div className="flex flex-wrap justify-center gap-8">
            {trustBadges.map((badge, index) => (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 text-gray-400"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <badge.icon className="h-5 w-5 text-teal-500" />
                </motion.div>
                <span className="text-sm font-medium">{badge.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-between gap-4"
          >
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Ketamine Association. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              {[
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms of Service', href: '/terms' },
                { label: 'Medical Disclaimer', href: '/disclaimer' },
                { label: 'Accessibility', href: '/accessibility' },
              ].map((link, index) => (
                <motion.div
                  key={link.label}
                  whileHover={{ y: -2 }}
                >
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-teal-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
