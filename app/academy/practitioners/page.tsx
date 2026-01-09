import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Practitioner Education | KTA Academy",
  description:
    "Comprehensive certification programs, CE credits, and specialized training for healthcare providers in ketamine-assisted therapy.",
};

const courseCategories = [
  {
    title: "Foundational Training",
    description:
      "Core competencies for practitioners new to ketamine therapy",
    courses: 12,
    hours: "80+",
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
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
    color: "teal",
  },
  {
    title: "Advanced Protocols",
    description:
      "Specialized dosing, monitoring, and treatment optimization",
    courses: 8,
    hours: "60+",
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
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
    color: "emerald",
  },
  {
    title: "Psychotherapy Integration",
    description:
      "KAP techniques, integration sessions, and therapeutic frameworks",
    courses: 10,
    hours: "70+",
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
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
    ),
    color: "teal",
  },
  {
    title: "Safety & Risk Management",
    description:
      "Patient screening, adverse event management, and compliance",
    courses: 6,
    hours: "40+",
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
    color: "amber",
  },
  {
    title: "Practice Management",
    description:
      "Building and running a successful ketamine therapy practice",
    courses: 8,
    hours: "50+",
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
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
    ),
    color: "emerald",
  },
  {
    title: "Research & Evidence",
    description:
      "Latest clinical research, emerging applications, and evidence review",
    courses: 5,
    hours: "30+",
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
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
    color: "teal",
  },
];

const upcomingWorkshops = [
  {
    title: "Ketamine Infusion Therapy Intensive",
    date: "February 15-17, 2026",
    location: "San Francisco, CA",
    format: "In-Person",
    credits: "24 CE",
    spotsLeft: 8,
  },
  {
    title: "Advanced KAP Techniques",
    date: "February 22, 2026",
    location: "Online",
    format: "Virtual",
    credits: "8 CE",
    spotsLeft: 25,
  },
  {
    title: "Ketamine for Chronic Pain Management",
    date: "March 1-2, 2026",
    location: "New York, NY",
    format: "In-Person",
    credits: "16 CE",
    spotsLeft: 12,
  },
  {
    title: "Integration Therapist Training",
    date: "March 8-10, 2026",
    location: "Denver, CO",
    format: "Hybrid",
    credits: "20 CE",
    spotsLeft: 15,
  },
];

const certificationLevels = [
  {
    level: 1,
    name: "Foundational",
    hours: 40,
    description: "Essential knowledge for ketamine therapy",
  },
  {
    level: 2,
    name: "Advanced",
    hours: 80,
    description: "Advanced clinical competencies",
  },
  {
    level: 3,
    name: "KAP Specialty",
    hours: 120,
    description: "Psychotherapy integration expertise",
  },
  {
    level: 4,
    name: "Practice Leadership",
    hours: 160,
    description: "Lead and supervise KAT programs",
  },
  {
    level: 5,
    name: "Master Practitioner",
    hours: 200,
    description: "Expert-level mastery and teaching",
  },
];

export default function PractitionersPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-t from-teal-600/20 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            <div>
              <nav className="flex" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2 text-sm">
                  <li>
                    <Link href="/academy" className="text-slate-400 hover:text-white">
                      Academy
                    </Link>
                  </li>
                  <li>
                    <svg
                      className="h-4 w-4 text-slate-600"
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
                  <li className="text-teal-400">Practitioners</li>
                </ol>
              </nav>
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Practitioner
                <br />
                <span className="text-teal-400">Education Hub</span>
              </h1>
              <p className="mt-6 text-lg text-slate-300">
                Comprehensive training and certification programs designed for
                healthcare professionals. Advance your expertise in
                ketamine-assisted therapy with accredited continuing education.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/academy/practitioners/certification"
                  className="inline-flex items-center justify-center rounded-lg bg-teal-600 px-6 py-3 text-base font-semibold text-white shadow-lg transition-all hover:bg-teal-500"
                >
                  View Certifications
                </Link>
                <Link
                  href="/academy/practitioners/ce-credits"
                  className="inline-flex items-center justify-center rounded-lg border border-slate-600 bg-transparent px-6 py-3 text-base font-semibold text-white transition-all hover:bg-slate-800"
                >
                  Browse CE Courses
                </Link>
              </div>
            </div>
            <div className="mt-12 lg:mt-0">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-white/5 p-6 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-white">50+</div>
                  <div className="mt-1 text-sm text-slate-400">
                    CE Credit Courses
                  </div>
                </div>
                <div className="rounded-xl bg-white/5 p-6 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-white">5</div>
                  <div className="mt-1 text-sm text-slate-400">
                    Certification Levels
                  </div>
                </div>
                <div className="rounded-xl bg-white/5 p-6 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-white">12</div>
                  <div className="mt-1 text-sm text-slate-400">
                    Accrediting Bodies
                  </div>
                </div>
                <div className="rounded-xl bg-white/5 p-6 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-white">5,000+</div>
                  <div className="mt-1 text-sm text-slate-400">
                    Certified Practitioners
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certification Overview */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Certification Program Overview
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              Progress through five levels of certification to demonstrate your
              expertise in ketamine-assisted therapy.
            </p>
          </div>

          <div className="mt-16">
            <div className="relative">
              {/* Connection Line */}
              <div className="absolute left-0 right-0 top-1/2 hidden h-1 -translate-y-1/2 bg-gradient-to-r from-teal-200 via-teal-400 to-teal-600 lg:block" />

              <div className="grid gap-6 lg:grid-cols-5">
                {certificationLevels.map((cert) => (
                  <div
                    key={cert.level}
                    className="relative rounded-xl bg-white p-6 shadow-lg ring-1 ring-slate-200"
                  >
                    <div className="absolute -top-4 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-teal-600 text-sm font-bold text-white">
                      {cert.level}
                    </div>
                    <div className="pt-4 text-center">
                      <h3 className="text-lg font-semibold text-slate-900">
                        {cert.name}
                      </h3>
                      <p className="mt-1 text-sm text-teal-600">
                        {cert.hours} Hours
                      </p>
                      <p className="mt-2 text-sm text-slate-600">
                        {cert.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/academy/practitioners/certification"
                className="inline-flex items-center text-base font-semibold text-teal-600 hover:text-teal-700"
              >
                Learn more about certification requirements
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
      </section>

      {/* Course Categories */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Course Categories
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              Explore our comprehensive curriculum designed for every stage of
              your professional development.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courseCategories.map((category) => (
              <div
                key={category.title}
                className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-md transition-all hover:shadow-xl"
              >
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${
                    category.color === "teal"
                      ? "bg-teal-100 text-teal-600"
                      : category.color === "emerald"
                      ? "bg-emerald-100 text-emerald-600"
                      : "bg-amber-100 text-amber-600"
                  }`}
                >
                  {category.icon}
                </div>
                <h3 className="mt-4 text-xl font-semibold text-slate-900">
                  {category.title}
                </h3>
                <p className="mt-2 text-slate-600">{category.description}</p>
                <div className="mt-4 flex items-center gap-4 text-sm">
                  <span className="text-slate-500">
                    {category.courses} Courses
                  </span>
                  <span className="text-slate-300">|</span>
                  <span className="text-slate-500">{category.hours} Hours</span>
                </div>
                <Link
                  href="#"
                  className="mt-4 inline-flex items-center text-sm font-semibold text-teal-600 hover:text-teal-700"
                >
                  Browse courses
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Workshops */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                Upcoming Workshops
              </h2>
              <p className="mt-2 text-lg text-slate-600">
                Live training events with hands-on learning opportunities
              </p>
            </div>
            <Link
              href="#"
              className="hidden text-base font-semibold text-teal-600 hover:text-teal-700 sm:block"
            >
              View all events
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {upcomingWorkshops.map((workshop, index) => (
              <div
                key={index}
                className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md sm:flex-row sm:items-center"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        workshop.format === "In-Person"
                          ? "bg-emerald-100 text-emerald-700"
                          : workshop.format === "Virtual"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {workshop.format}
                    </span>
                    <span className="text-sm font-medium text-teal-600">
                      {workshop.credits}
                    </span>
                  </div>
                  <h3 className="mt-2 text-lg font-semibold text-slate-900">
                    {workshop.title}
                  </h3>
                  <div className="mt-2 flex items-center gap-4 text-sm text-slate-500">
                    <span className="flex items-center">
                      <svg
                        className="mr-1.5 h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {workshop.date}
                    </span>
                    <span className="flex items-center">
                      <svg
                        className="mr-1.5 h-4 w-4"
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
                      {workshop.location}
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-4 sm:mt-0 sm:flex-col sm:items-end">
                  <span className="text-sm text-amber-600">
                    {workshop.spotsLeft} spots left
                  </span>
                  <button className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-teal-500">
                    Register
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              href="#"
              className="text-base font-semibold text-teal-600 hover:text-teal-700"
            >
              View all events
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CE Credit Tracking */}
      <section className="bg-gradient-to-br from-teal-600 to-teal-700 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Track Your CE Credits
              </h2>
              <p className="mt-4 text-lg text-teal-100">
                Our learning management system makes it easy to track your
                continuing education progress, download certificates, and
                maintain compliance with licensing requirements.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  "Automatic credit tracking and reporting",
                  "Digital certificates available instantly",
                  "Accreditation for multiple licensing boards",
                  "Progress dashboards and reminders",
                  "Integration with state reporting systems",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center text-white">
                    <svg
                      className="mr-3 h-5 w-5 text-teal-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link
                  href="/academy/practitioners/ce-credits"
                  className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-base font-semibold text-teal-700 shadow-lg transition-all hover:bg-teal-50"
                >
                  Learn About CE Credits
                </Link>
              </div>
            </div>
            <div className="mt-12 lg:mt-0">
              <div className="rounded-2xl bg-white/10 p-8 backdrop-blur-sm">
                <div className="space-y-4">
                  <div className="rounded-lg bg-white/10 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-teal-100">
                        Credits Earned This Year
                      </span>
                      <span className="text-2xl font-bold text-white">48</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-white/20">
                      <div
                        className="h-2 rounded-full bg-white"
                        style={{ width: "80%" }}
                      />
                    </div>
                    <p className="mt-1 text-xs text-teal-200">
                      12 credits remaining for renewal
                    </p>
                  </div>
                  <div className="rounded-lg bg-white/10 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-teal-100">
                        Courses Completed
                      </span>
                      <span className="text-2xl font-bold text-white">12</span>
                    </div>
                  </div>
                  <div className="rounded-lg bg-white/10 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-teal-100">
                        Certification Level
                      </span>
                      <span className="text-lg font-semibold text-white">
                        Advanced
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Ready to Advance Your Practice?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              Join thousands of healthcare professionals who have elevated their
              ketamine therapy expertise through KTA Academy.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/academy/practitioners/certification"
                className="inline-flex items-center justify-center rounded-lg bg-teal-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-teal-500"
              >
                Start Your Certification
              </Link>
              <Link
                href="#"
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-8 py-4 text-base font-semibold text-slate-700 transition-all hover:bg-slate-50"
              >
                Schedule a Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
