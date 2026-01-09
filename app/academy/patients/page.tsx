import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Patient Education | KTA Academy",
  description:
    "Understanding ketamine therapy. Educational resources, guides, and support for patients considering or undergoing ketamine treatment.",
};

const contentCategories = [
  {
    title: "Getting Started",
    description: "Essential information for those new to ketamine therapy",
    articles: 12,
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
  {
    title: "Treatment Process",
    description: "What to expect before, during, and after treatment",
    articles: 18,
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
        />
      </svg>
    ),
  },
  {
    title: "Conditions Treated",
    description: "Learn how ketamine helps various mental health conditions",
    articles: 15,
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
  },
  {
    title: "Safety & Side Effects",
    description: "Understanding risks, benefits, and what to monitor",
    articles: 10,
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
  {
    title: "Integration & Aftercare",
    description: "Maximizing treatment benefits through integration",
    articles: 14,
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    ),
  },
  {
    title: "Finding a Provider",
    description: "How to choose a qualified ketamine therapy provider",
    articles: 8,
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
];

const popularArticles = [
  {
    title: "What is Ketamine Therapy? A Complete Guide for Patients",
    category: "Getting Started",
    readTime: "8 min read",
    views: "15.2K",
  },
  {
    title: "Your First Ketamine Session: What to Expect",
    category: "Treatment Process",
    readTime: "6 min read",
    views: "12.8K",
  },
  {
    title: "How Ketamine Helps Treatment-Resistant Depression",
    category: "Conditions Treated",
    readTime: "10 min read",
    views: "11.5K",
  },
  {
    title: "Preparing for Ketamine Therapy: A Patient Checklist",
    category: "Getting Started",
    readTime: "5 min read",
    views: "9.7K",
  },
  {
    title: "Understanding the Different Forms of Ketamine Treatment",
    category: "Treatment Process",
    readTime: "7 min read",
    views: "8.9K",
  },
  {
    title: "Integration: Making the Most of Your Ketamine Experience",
    category: "Integration & Aftercare",
    readTime: "9 min read",
    views: "7.4K",
  },
];

const videoResources = [
  {
    title: "Introduction to Ketamine Therapy",
    duration: "12:34",
    description:
      "A comprehensive overview of ketamine therapy for mental health conditions.",
    thumbnail: "/videos/intro-thumb.jpg",
  },
  {
    title: "Patient Journey: From Consultation to Recovery",
    duration: "18:45",
    description:
      "Follow a patient through their complete ketamine treatment journey.",
    thumbnail: "/videos/journey-thumb.jpg",
  },
  {
    title: "The Science Behind Ketamine's Effects",
    duration: "15:20",
    description:
      "Understanding how ketamine works in the brain to relieve symptoms.",
    thumbnail: "/videos/science-thumb.jpg",
  },
  {
    title: "Integration Techniques for Lasting Change",
    duration: "22:10",
    description:
      "Learn strategies to integrate insights from your ketamine sessions.",
    thumbnail: "/videos/integration-thumb.jpg",
  },
];

const supportResources = [
  {
    title: "Patient Support Community",
    description:
      "Connect with others on similar healing journeys in our moderated online community.",
    cta: "Join Community",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
  {
    title: "Provider Directory",
    description:
      "Find certified ketamine therapy providers in your area using our searchable directory.",
    cta: "Find a Provider",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    ),
  },
  {
    title: "Patient Helpline",
    description:
      "Have questions? Our patient advocates are available to help guide you through the process.",
    cta: "Contact Us",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      </svg>
    ),
  },
  {
    title: "Insurance & Cost Guide",
    description:
      "Understanding costs, insurance coverage, and financial assistance options.",
    cta: "Learn More",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
];

export default function PatientEducationPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-500">
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <Link
                  href="/academy"
                  className="text-emerald-100 hover:text-white"
                >
                  Academy
                </Link>
              </li>
              <li>
                <svg
                  className="h-4 w-4 text-emerald-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </li>
              <li className="text-white font-medium">Patients</li>
            </ol>
          </nav>

          <div className="mt-8 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Understanding
              <br />
              <span className="text-emerald-200">Ketamine Therapy</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-emerald-100">
              Your comprehensive resource for learning about ketamine therapy.
              Access educational content, treatment guides, and support
              resources to empower your healing journey.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="#getting-started"
                className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-base font-semibold text-emerald-700 shadow-lg transition-all hover:bg-emerald-50"
              >
                Start Learning
                <svg
                  className="ml-2 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </Link>
              <Link
                href="/academy/patients/conditions"
                className="inline-flex items-center justify-center rounded-lg border-2 border-white/30 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
              >
                Conditions We Treat
              </Link>
            </div>
          </div>
        </div>
        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Content Categories */}
      <section id="getting-started" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Educational Content
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              Explore our comprehensive library of patient education resources
              organized by topic.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {contentCategories.map((category) => (
              <Link
                key={category.title}
                href="#"
                className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 transition-all hover:border-emerald-200 hover:shadow-lg"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                  {category.icon}
                </div>
                <h3 className="mt-4 text-xl font-semibold text-slate-900">
                  {category.title}
                </h3>
                <p className="mt-2 text-slate-600">{category.description}</p>
                <p className="mt-4 text-sm font-medium text-emerald-600">
                  {category.articles} articles
                </p>
                <svg
                  className="absolute bottom-6 right-6 h-5 w-5 text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-emerald-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                Popular Articles
              </h2>
              <p className="mt-2 text-lg text-slate-600">
                Our most-read patient education resources
              </p>
            </div>
            <Link
              href="#"
              className="hidden text-base font-semibold text-emerald-600 hover:text-emerald-700 sm:block"
            >
              View all articles
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {popularArticles.map((article, index) => (
              <Link
                key={index}
                href="#"
                className="group rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-md"
              >
                <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                  {article.category}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-slate-900 group-hover:text-emerald-600">
                  {article.title}
                </h3>
                <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                  <span>{article.readTime}</span>
                  <span className="flex items-center">
                    <svg
                      className="mr-1 h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    {article.views}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              href="#"
              className="text-base font-semibold text-emerald-600 hover:text-emerald-700"
            >
              View all articles
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Video Resources */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Video Resources
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              Watch educational videos to learn more about ketamine therapy
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {videoResources.map((video, index) => (
              <div
                key={index}
                className="group cursor-pointer overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-xl"
              >
                <div className="relative aspect-video bg-gradient-to-br from-emerald-400 to-teal-500">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform group-hover:scale-110">
                      <svg
                        className="h-8 w-8 text-emerald-600"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-1 text-xs text-white">
                    {video.duration}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 group-hover:text-emerald-600">
                    {video.title}
                  </h3>
                  <p className="mt-2 text-slate-600">{video.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="#"
              className="inline-flex items-center text-base font-semibold text-emerald-600 hover:text-emerald-700"
            >
              Browse all videos
              <svg
                className="ml-2 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Support Resources */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Support Resources
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
              We are here to support you throughout your healing journey
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {supportResources.map((resource, index) => (
              <div
                key={index}
                className="rounded-xl bg-white/5 p-6 backdrop-blur-sm transition-all hover:bg-white/10"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-600/20 text-emerald-400">
                  {resource.icon}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">
                  {resource.title}
                </h3>
                <p className="mt-2 text-sm text-slate-400">
                  {resource.description}
                </p>
                <button className="mt-4 text-sm font-semibold text-emerald-400 hover:text-emerald-300">
                  {resource.cta}
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conditions CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600">
            <div className="px-8 py-12 sm:px-12 lg:flex lg:items-center lg:justify-between lg:py-16">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Explore Conditions Treated
                </h2>
                <p className="mt-4 max-w-xl text-lg text-emerald-100">
                  Learn how ketamine therapy can help with depression, anxiety,
                  PTSD, chronic pain, and more.
                </p>
              </div>
              <div className="mt-8 lg:mt-0 lg:ml-8 lg:flex-shrink-0">
                <Link
                  href="/academy/patients/conditions"
                  className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-base font-semibold text-emerald-700 shadow-lg transition-all hover:bg-emerald-50"
                >
                  View All Conditions
                  <svg
                    className="ml-2 h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Stay Informed
            </h2>
            <p className="mt-2 text-slate-600">
              Subscribe to receive the latest research updates and patient
              resources.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full max-w-sm rounded-lg border border-slate-300 px-4 py-3 text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 sm:w-auto"
              />
              <button className="w-full rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white transition-all hover:bg-emerald-500 sm:w-auto">
                Subscribe
              </button>
            </div>
            <p className="mt-4 text-xs text-slate-500">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
