import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Academy | Ketamine Therapy Association",
  description:
    "Education for Excellence in Ketamine Therapy. Explore practitioner certification programs and patient education resources.",
};

const featuredCourses = [
  {
    id: 1,
    title: "Foundations of Ketamine-Assisted Psychotherapy",
    instructor: "Dr. Sarah Mitchell, MD, PhD",
    duration: "40 hours",
    credits: "40 CE Credits",
    level: "Foundational",
    image: "/courses/foundations.jpg",
  },
  {
    id: 2,
    title: "Advanced Dosing Protocols & Patient Safety",
    instructor: "Dr. Michael Chen, MD",
    duration: "24 hours",
    credits: "24 CE Credits",
    level: "Advanced",
    image: "/courses/dosing.jpg",
  },
  {
    id: 3,
    title: "Integration Techniques for Lasting Results",
    instructor: "Dr. Emily Rodriguez, PsyD",
    duration: "16 hours",
    credits: "16 CE Credits",
    level: "Intermediate",
    image: "/courses/integration.jpg",
  },
  {
    id: 4,
    title: "Ketamine for Treatment-Resistant Depression",
    instructor: "Dr. James Wilson, MD",
    duration: "20 hours",
    credits: "20 CE Credits",
    level: "Advanced",
    image: "/courses/depression.jpg",
  },
];

const testimonials = [
  {
    quote:
      "The KTA certification program transformed my practice. The depth of training and ongoing support is unmatched in the field.",
    author: "Dr. Amanda Foster",
    role: "Psychiatrist, Portland OR",
    image: "/testimonials/foster.jpg",
  },
  {
    quote:
      "As a patient, the education resources helped me understand my treatment and feel empowered throughout my healing journey.",
    author: "Michael T.",
    role: "Patient Advocate",
    image: "/testimonials/michael.jpg",
  },
  {
    quote:
      "The CE credits are accepted everywhere, and the course quality exceeds any other continuing education I've completed.",
    author: "Dr. Robert Kim",
    role: "Anesthesiologist, Seattle WA",
    image: "/testimonials/kim.jpg",
  },
];

export default function AcademyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-700 via-teal-600 to-emerald-600">
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="text-center">
            <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
              KTA Academy
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Education for Excellence in
              <br />
              <span className="text-teal-200">Ketamine Therapy</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-teal-100">
              Comprehensive training programs for healthcare practitioners and
              educational resources for patients. Advancing the science and
              practice of ketamine-assisted therapy.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/academy/practitioners"
                className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-base font-semibold text-teal-700 shadow-lg transition-all hover:bg-teal-50 hover:shadow-xl"
              >
                Practitioner Education
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
              <Link
                href="/academy/patients"
                className="inline-flex items-center justify-center rounded-lg border-2 border-white/30 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
              >
                Patient Education
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

      {/* Education Paths */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Choose Your Learning Path
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              Whether you are a healthcare provider seeking certification or a
              patient seeking understanding, we have resources tailored for you.
            </p>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            {/* Practitioner Education Card */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-600 to-teal-700 p-8 shadow-xl transition-all hover:shadow-2xl">
              <div className="absolute right-0 top-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-white/10" />
              <div className="relative">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-white/20">
                  <svg
                    className="h-7 w-7 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Practitioner Education
                </h3>
                <p className="mt-4 text-teal-100">
                  Comprehensive certification programs, continuing education
                  courses, and specialized training for healthcare providers in
                  ketamine-assisted therapy.
                </p>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center text-white">
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
                    5 Certification Levels
                  </li>
                  <li className="flex items-center text-white">
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
                    Accredited CE Credits
                  </li>
                  <li className="flex items-center text-white">
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
                    Live Workshops & Webinars
                  </li>
                  <li className="flex items-center text-white">
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
                    Mentorship Programs
                  </li>
                </ul>
                <Link
                  href="/academy/practitioners"
                  className="mt-8 inline-flex items-center text-lg font-semibold text-white transition-all hover:text-teal-200"
                >
                  Explore Programs
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

            {/* Patient Education Card */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 p-8 shadow-xl transition-all hover:shadow-2xl">
              <div className="absolute right-0 top-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-white/10" />
              <div className="relative">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-white/20">
                  <svg
                    className="h-7 w-7 text-white"
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
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Patient Education
                </h3>
                <p className="mt-4 text-emerald-100">
                  Accessible resources to help patients understand ketamine
                  therapy, prepare for treatment, and support their healing
                  journey.
                </p>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center text-white">
                    <svg
                      className="mr-3 h-5 w-5 text-emerald-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Treatment Guides
                  </li>
                  <li className="flex items-center text-white">
                    <svg
                      className="mr-3 h-5 w-5 text-emerald-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Condition Information
                  </li>
                  <li className="flex items-center text-white">
                    <svg
                      className="mr-3 h-5 w-5 text-emerald-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Video Resources
                  </li>
                  <li className="flex items-center text-white">
                    <svg
                      className="mr-3 h-5 w-5 text-emerald-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Support Community
                  </li>
                </ul>
                <Link
                  href="/academy/patients"
                  className="mt-8 inline-flex items-center text-lg font-semibold text-white transition-all hover:text-emerald-200"
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
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Carousel */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                Featured Courses
              </h2>
              <p className="mt-2 text-lg text-slate-600">
                Our most popular training programs for practitioners
              </p>
            </div>
            <Link
              href="/academy/practitioners"
              className="hidden text-base font-semibold text-teal-600 hover:text-teal-700 sm:block"
            >
              View all courses
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredCourses.map((course) => (
              <div
                key={course.id}
                className="group overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-xl"
              >
                <div className="aspect-video bg-gradient-to-br from-teal-400 to-teal-600 p-6">
                  <span className="inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    {course.level}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 group-hover:text-teal-600">
                    {course.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">
                    {course.instructor}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="text-slate-600">{course.duration}</span>
                    <span className="font-medium text-teal-600">
                      {course.credits}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/academy/practitioners"
              className="text-base font-semibold text-teal-600 hover:text-teal-700"
            >
              View all courses
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CE Credit Info */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 lg:grid lg:grid-cols-2 lg:gap-4">
            <div className="px-8 py-12 sm:px-12 lg:py-16">
              <div className="lg:max-w-lg">
                <span className="inline-flex items-center rounded-full bg-teal-600/20 px-4 py-1.5 text-sm font-medium text-teal-400">
                  Accredited Provider
                </span>
                <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Earn CE Credits with Confidence
                </h2>
                <p className="mt-4 text-lg text-slate-300">
                  The Ketamine Therapy Association is an accredited continuing
                  education provider. Our courses are approved for CE credits by
                  major medical boards and professional organizations.
                </p>
                <dl className="mt-8 grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-white/5 p-4">
                    <dt className="text-sm text-slate-400">Courses Available</dt>
                    <dd className="mt-1 text-3xl font-bold text-white">50+</dd>
                  </div>
                  <div className="rounded-lg bg-white/5 p-4">
                    <dt className="text-sm text-slate-400">CE Credits Offered</dt>
                    <dd className="mt-1 text-3xl font-bold text-white">500+</dd>
                  </div>
                  <div className="rounded-lg bg-white/5 p-4">
                    <dt className="text-sm text-slate-400">Accreditations</dt>
                    <dd className="mt-1 text-3xl font-bold text-white">12</dd>
                  </div>
                  <div className="rounded-lg bg-white/5 p-4">
                    <dt className="text-sm text-slate-400">
                      Practitioners Trained
                    </dt>
                    <dd className="mt-1 text-3xl font-bold text-white">5K+</dd>
                  </div>
                </dl>
                <div className="mt-8">
                  <Link
                    href="/academy/practitioners/ce-credits"
                    className="inline-flex items-center justify-center rounded-lg bg-teal-600 px-6 py-3 text-base font-semibold text-white transition-all hover:bg-teal-500"
                  >
                    Learn About CE Credits
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
            <div className="flex items-center justify-center bg-gradient-to-br from-teal-600/20 to-emerald-600/20 p-8">
              <div className="grid grid-cols-2 gap-4">
                {["AMA", "AAPA", "ANCC", "APA"].map((org) => (
                  <div
                    key={org}
                    className="flex h-24 w-24 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm"
                  >
                    <span className="text-xl font-bold text-white">{org}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              What Our Community Says
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              Hear from practitioners and patients who have benefited from our
              educational programs.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="relative rounded-2xl bg-white p-8 shadow-md"
              >
                <svg
                  className="absolute left-6 top-6 h-8 w-8 text-teal-200"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <div className="relative pt-8">
                  <p className="text-lg text-slate-700">{testimonial.quote}</p>
                  <div className="mt-6 flex items-center">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-teal-400 to-teal-600" />
                    <div className="ml-4">
                      <p className="font-semibold text-slate-900">
                        {testimonial.author}
                      </p>
                      <p className="text-sm text-slate-500">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-teal-700 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-teal-100">
              Join thousands of practitioners and patients who are advancing
              their knowledge of ketamine therapy.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/academy/practitioners/certification"
                className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-base font-semibold text-teal-700 shadow-lg transition-all hover:bg-teal-50"
              >
                Get Certified
              </Link>
              <Link
                href="/academy/patients"
                className="inline-flex items-center justify-center rounded-lg border-2 border-white/30 bg-transparent px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white/10"
              >
                Explore Patient Resources
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
