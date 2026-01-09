'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Menu,
  X,
  ChevronDown,
  GraduationCap,
  Users,
  MapPin,
  FileText,
  BookOpen,
  Award,
  Calendar,
  Heart,
  Shield,
  HelpCircle,
  ShoppingBag,
  UserCircle,
  LogIn,
} from 'lucide-react';

interface NavSubItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  description: string;
}

interface NavItem {
  label: string;
  href?: string;
  items?: NavSubItem[];
}

const navItems: NavItem[] = [
  {
    label: 'Academy',
    items: [
      {
        label: 'Practitioner Education',
        href: '/academy/practitioner-education',
        icon: <GraduationCap className="h-5 w-5" />,
        description: 'Comprehensive training for medical professionals',
      },
      {
        label: 'Patient Education',
        href: '/academy/patient-education',
        icon: <Heart className="h-5 w-5" />,
        description: 'Learn about ketamine therapy',
      },
      {
        label: 'Certifications',
        href: '/academy/certifications',
        icon: <Award className="h-5 w-5" />,
        description: 'Professional certification programs',
      },
      {
        label: 'CE Credits',
        href: '/academy/ce-credits',
        icon: <BookOpen className="h-5 w-5" />,
        description: 'Continuing education credits',
      },
    ],
  },
  {
    label: 'Association',
    items: [
      {
        label: 'About Us',
        href: '/association/about',
        icon: <Users className="h-5 w-5" />,
        description: 'Our mission and leadership',
      },
      {
        label: 'Membership',
        href: '/association/membership',
        icon: <Shield className="h-5 w-5" />,
        description: 'Join our professional community',
      },
      {
        label: 'Sponsorship',
        href: '/association/sponsorship',
        icon: <Award className="h-5 w-5" />,
        description: 'Get featured & sponsor opportunities',
      },
      {
        label: 'Events',
        href: '/association/events',
        icon: <Calendar className="h-5 w-5" />,
        description: 'Conferences and networking',
      },
      {
        label: 'Community',
        href: '/association/community',
        icon: <Users className="h-5 w-5" />,
        description: 'Connect with peers',
      },
    ],
  },
  {
    label: 'Find a Provider',
    href: '/find-provider',
  },
  {
    label: 'Publish',
    items: [
      {
        label: 'Submit Article',
        href: '/publish/submit',
        icon: <FileText className="h-5 w-5" />,
        description: 'Share your research',
      },
      {
        label: 'Guidelines',
        href: '/publish/guidelines',
        icon: <BookOpen className="h-5 w-5" />,
        description: 'Submission requirements',
      },
      {
        label: 'Authors',
        href: '/publish/authors',
        icon: <UserCircle className="h-5 w-5" />,
        description: 'Featured contributors',
      },
    ],
  },
  {
    label: 'Resources',
    items: [
      {
        label: 'Research Library',
        href: '/resources/research',
        icon: <BookOpen className="h-5 w-5" />,
        description: 'Scientific publications',
      },
      {
        label: 'Blog',
        href: '/resources/blog',
        icon: <FileText className="h-5 w-5" />,
        description: 'Latest news and insights',
      },
      {
        label: 'FAQ',
        href: '/resources/faq',
        icon: <HelpCircle className="h-5 w-5" />,
        description: 'Common questions answered',
      },
      {
        label: 'Store',
        href: '/resources/store',
        icon: <ShoppingBag className="h-5 w-5" />,
        description: 'Educational materials',
      },
    ],
  },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-white'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo-icon.svg"
                alt="Ketamine Association"
                className="h-10 w-10"
              />
            </motion.div>
            <span className="hidden sm:block text-lg font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
              Ketamine Association
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-1">
            {navItems.map((item) => (
              <div key={item.label} className="relative group">
                {item.items ? (
                  <motion.button
                    whileHover={{ y: -1 }}
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors rounded-lg hover:bg-teal-50"
                    onMouseEnter={() => setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        openDropdown === item.label ? 'rotate-180' : ''
                      }`}
                    />
                  </motion.button>
                ) : (
                  <Link
                    href={item.href || '#'}
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors rounded-lg hover:bg-teal-50"
                  >
                    <MapPin className="h-4 w-4" />
                    {item.label}
                  </Link>
                )}

                {/* Dropdown Menu */}
                {item.items && (
                  <AnimatePresence>
                    {openDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="absolute left-0 top-full pt-2"
                        onMouseEnter={() => setOpenDropdown(item.label)}
                        onMouseLeave={() => setOpenDropdown(null)}
                      >
                        <div className="w-72 rounded-2xl bg-white shadow-xl ring-1 ring-gray-100 overflow-hidden">
                          <div className="p-2">
                            {item.items.map((subItem, index) => (
                              <motion.div
                                key={subItem.label}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                              >
                                <Link
                                  href={subItem.href}
                                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-teal-50 transition-all duration-200 group/item"
                                >
                                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600 group-hover/item:bg-teal-100 group-hover/item:scale-110 transition-all duration-200">
                                    {subItem.icon}
                                  </div>
                                  <div>
                                    <div className="font-medium text-gray-900 text-sm group-hover/item:text-teal-600 transition-colors">
                                      {subItem.label}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-0.5">
                                      {subItem.description}
                                    </div>
                                  </div>
                                </Link>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex lg:items-center lg:gap-3">
            <Link
              href="/login"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors"
            >
              <LogIn className="h-4 w-4" />
              Login
            </Link>
            <motion.div
              whileHover={{
                scale: 1.03,
                boxShadow: '0 10px 30px -10px rgba(20, 184, 166, 0.4)',
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/join"
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 rounded-xl shadow-lg shadow-teal-500/25 transition-all"
              >
                Join Now
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-teal-600 transition-colors rounded-lg hover:bg-teal-50"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden"
          >
            <div className="bg-white border-t border-gray-100 px-4 py-4 space-y-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {item.items ? (
                    <div>
                      <button
                        onClick={() => toggleDropdown(item.label)}
                        className="flex w-full items-center justify-between px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition-colors"
                      >
                        {item.label}
                        <motion.div
                          animate={{ rotate: openDropdown === item.label ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="h-4 w-4" />
                        </motion.div>
                      </button>
                      <AnimatePresence>
                        {openDropdown === item.label && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-4 py-2 space-y-1">
                              {item.items.map((subItem) => (
                                <Link
                                  key={subItem.label}
                                  href={subItem.href}
                                  className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition-colors"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  <span className="text-teal-500">{subItem.icon}</span>
                                  {subItem.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.href || '#'}
                      className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <MapPin className="h-4 w-4 text-teal-500" />
                      {item.label}
                    </Link>
                  )}
                </motion.div>
              ))}

              {/* Mobile CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="pt-4 border-t border-gray-100 space-y-2"
              >
                <Link
                  href="/login"
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-medium text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <LogIn className="h-4 w-4" />
                  Login
                </Link>
                <Link
                  href="/join"
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl hover:from-teal-600 hover:to-teal-700 transition-all shadow-lg shadow-teal-500/25"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Join Now
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Navigation;
