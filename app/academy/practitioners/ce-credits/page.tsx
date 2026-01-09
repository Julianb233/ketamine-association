import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CE Credits | KTA Academy",
  description:
    "Accredited continuing education courses for ketamine therapy. Track your CE credits and maintain your professional licenses.",
};

const ceCourses = [
  {
    id: 1,
    title: "Ketamine Pharmacology and Mechanisms of Action",
    hours: 8,
    creditTypes: ["AMA PRA Category 1", "ANCC", "APA"],
    format: "Online Self-Paced",
    price: 295,
    popular: true,
  },
  {
    id: 2,
    title: "Patient Assessment and Screening Protocols",
    hours: 6,
    creditTypes: ["AMA PRA Category 1", "AAPA", "ANCC"],
    format: "Online Self-Paced",
    price: 225,
    popular: false,
  },
  {
    id: 3,
    title: "IV Ketamine Infusion Best Practices",
    hours: 12,
    creditTypes: ["AMA PRA Category 1", "ANCC"],
    format: "Hybrid (Online + Live)",
    price: 495,
    popular: true,
  },
  {
    id: 4,
    title: "Sublingual and Intranasal Ketamine Protocols",
    hours: 4,
    creditTypes: ["AMA PRA Category 1", "AAPA"],
    format: "Online Self-Paced",
    price: 150,
    popular: false,
  },
  {
    id: 5,
    title: "Ketamine-Assisted Psychotherapy Fundamentals",
    hours: 16,
    creditTypes: ["APA", "NBCC", "NASW"],
    format: "Online Self-Paced",
    price: 595,
    popular: true,
  },
  {
    id: 6,
    title: "Managing Adverse Events and Emergencies",
    hours: 8,
    creditTypes: ["AMA PRA Category 1", "ANCC", "AAPA"],
    format: "Live Virtual",
    price: 325,
    popular: false,
  },
  {
    id: 7,
    title: "Ketamine for Treatment-Resistant Depression",
    hours: 10,
    creditTypes: ["AMA PRA Category 1", "APA"],
    format: "Online Self-Paced",
    price: 395,
    popular: true,
  },
  {
    id: 8,
    title: "Chronic Pain Management with Ketamine",
    hours: 8,
    creditTypes: ["AMA PRA Category 1", "AAPA"],
    format: "Online Self-Paced",
    price: 295,
    popular: false,
  },
  {
    id: 9,
    title: "Integration Therapy Techniques",
    hours: 12,
    creditTypes: ["APA", "NBCC", "NASW"],
    format: "Hybrid (Online + Live)",
    price: 495,
    popular: false,
  },
  {
    id: 10,
    title: "Legal and Regulatory Compliance",
    hours: 4,
    creditTypes: ["AMA PRA Category 1", "AAPA", "ANCC"],
    format: "Online Self-Paced",
    price: 150,
    popular: false,
  },
];

const creditTypes = [
  {
    name: "AMA PRA Category 1",
    fullName: "American Medical Association Physician's Recognition Award",
    description:
      "Recognized by state medical boards for physician license renewal. Required for most MD and DO practitioners.",
    professions: ["Physicians (MD/DO)", "Medical Residents"],
  },
  {
    name: "ANCC",
    fullName: "American Nurses Credentialing Center",
    description:
      "Contact hours for registered nurses and advanced practice nurses. Accepted by state nursing boards nationwide.",
    professions: ["RN", "NP", "CRNA", "CNS"],
  },
  {
    name: "AAPA",
    fullName: "American Academy of Physician Assistants",
    description:
      "Category 1 CME credits for physician assistants. Recognized for PA-C certification maintenance.",
    professions: ["Physician Assistants (PA-C)"],
  },
  {
    name: "APA",
    fullName: "American Psychological Association",
    description:
      "Continuing education credits for psychologists. Approved by APA and accepted by state psychology boards.",
    professions: ["Psychologists (PhD, PsyD)"],
  },
  {
    name: "NBCC",
    fullName: "National Board for Certified Counselors",
    description:
      "NBCC-approved continuing education for licensed counselors and therapists.",
    professions: ["LPC", "LMHC", "LCPC"],
  },
  {
    name: "NASW",
    fullName: "National Association of Social Workers",
    description:
      "Continuing education units for licensed clinical social workers.",
    professions: ["LCSW", "LMSW", "LSW"],
  },
];

const accreditations = [
  {
    name: "ACCME",
    description:
      "Accreditation Council for Continuing Medical Education - Joint Accreditation Provider",
  },
  {
    name: "ANCC",
    description:
      "American Nurses Credentialing Center - Approved Provider of Nursing CE",
  },
  {
    name: "APA",
    description:
      "American Psychological Association - Approved Sponsor of CE Programs",
  },
  {
    name: "NBCC",
    description: "National Board for Certified Counselors - ACEP Provider",
  },
];

export default function CECreditsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-5" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
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
              <li>
                <Link
                  href="/academy/practitioners"
                  className="text-slate-400 hover:text-white"
                >
                  Practitioners
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
              <li className="text-teal-400">CE Credits</li>
            </ol>
          </nav>

          <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Continuing Education
                <br />
                <span className="text-teal-400">Credits</span>
              </h1>
              <p className="mt-6 text-lg text-slate-300">
                Maintain your professional licenses with accredited continuing
                education in ketamine therapy. Our courses are recognized by
                major licensing boards and professional organizations.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {["AMA", "ANCC", "AAPA", "APA", "NBCC", "NASW"].map((org) => (
                  <span
                    key={org}
                    className="inline-flex items-center rounded-full bg-teal-600/20 px-3 py-1 text-sm font-medium text-teal-300"
                  >
                    {org} Approved
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-12 lg:mt-0">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-white/5 p-6 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-white">500+</div>
                  <div className="mt-1 text-sm text-slate-400">
                    CE Credits Available
                  </div>
                </div>
                <div className="rounded-xl bg-white/5 p-6 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-white">50+</div>
                  <div className="mt-1 text-sm text-slate-400">
                    Accredited Courses
                  </div>
                </div>
                <div className="rounded-xl bg-white/5 p-6 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-white">12</div>
                  <div className="mt-1 text-sm text-slate-400">
                    Accrediting Bodies
                  </div>
                </div>
                <div className="rounded-xl bg-white/5 p-6 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-white">50</div>
                  <div className="mt-1 text-sm text-slate-400">
                    States Accepted
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CE Course List */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                CE Credit Courses
              </h2>
              <p className="mt-2 text-lg text-slate-600">
                Browse our library of accredited continuing education courses
              </p>
            </div>
            <div className="flex gap-2">
              <select className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500">
                <option>All Credit Types</option>
                <option>AMA PRA Category 1</option>
                <option>ANCC</option>
                <option>AAPA</option>
                <option>APA</option>
                <option>NBCC</option>
                <option>NASW</option>
              </select>
              <select className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500">
                <option>All Formats</option>
                <option>Online Self-Paced</option>
                <option>Live Virtual</option>
                <option>Hybrid</option>
              </select>
            </div>
          </div>

          <div className="mt-10 space-y-4">
            {ceCourses.map((course) => (
              <div
                key={course.id}
                className="flex flex-col justify-between gap-4 rounded-xl border border-slate-200 bg-white p-6 transition-all hover:shadow-md sm:flex-row sm:items-center"
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    {course.popular && (
                      <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700">
                        Popular
                      </span>
                    )}
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                      {course.format}
                    </span>
                  </div>
                  <h3 className="mt-2 text-lg font-semibold text-slate-900">
                    {course.title}
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {course.creditTypes.map((type) => (
                      <span
                        key={type}
                        className="inline-flex items-center rounded bg-teal-50 px-2 py-0.5 text-xs font-medium text-teal-700"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-6 sm:flex-shrink-0">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-teal-600">
                      {course.hours}
                    </div>
                    <div className="text-xs text-slate-500">CE Hours</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-slate-900">
                      ${course.price}
                    </div>
                    <div className="text-xs text-slate-500">USD</div>
                  </div>
                  <button className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-teal-500">
                    Enroll
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button className="text-base font-semibold text-teal-600 hover:text-teal-700">
              Load more courses
              <span aria-hidden="true"> &rarr;</span>
            </button>
          </div>
        </div>
      </section>

      {/* Credit Types */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Credit Types & Requirements
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              We offer CE credits approved by multiple professional
              organizations to meet your licensing requirements.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {creditTypes.map((type) => (
              <div
                key={type.name}
                className="rounded-xl border border-slate-200 bg-white p-6"
              >
                <h3 className="text-lg font-bold text-teal-600">{type.name}</h3>
                <p className="mt-1 text-sm text-slate-500">{type.fullName}</p>
                <p className="mt-4 text-sm text-slate-600">{type.description}</p>
                <div className="mt-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    For Professions
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {type.professions.map((prof) => (
                      <span
                        key={prof}
                        className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-600"
                      >
                        {prof}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditation Info */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Our Accreditations
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                The Ketamine Therapy Association Academy is an accredited
                provider of continuing education, recognized by major medical
                and mental health professional organizations.
              </p>
              <div className="mt-8 space-y-4">
                {accreditations.map((accred) => (
                  <div
                    key={accred.name}
                    className="flex items-start rounded-lg border border-slate-200 bg-white p-4"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-teal-100">
                      <svg
                        className="h-5 w-5 text-teal-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-slate-900">
                        {accred.name}
                      </h3>
                      <p className="mt-1 text-sm text-slate-600">
                        {accred.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-12 lg:mt-0">
              <div className="rounded-2xl bg-gradient-to-br from-teal-600 to-teal-700 p-8">
                <h3 className="text-xl font-bold text-white">
                  CE Credit Tracking Dashboard
                </h3>
                <p className="mt-2 text-teal-100">
                  Track your progress, download certificates, and manage your
                  continuing education all in one place.
                </p>
                <div className="mt-6 space-y-4">
                  <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-teal-100">
                        Credits This Cycle
                      </span>
                      <span className="text-2xl font-bold text-white">
                        48 / 60
                      </span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-white/20">
                      <div
                        className="h-2 rounded-full bg-white"
                        style={{ width: "80%" }}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-white/10 p-4 text-center backdrop-blur-sm">
                      <div className="text-2xl font-bold text-white">12</div>
                      <div className="text-xs text-teal-200">
                        Courses Completed
                      </div>
                    </div>
                    <div className="rounded-lg bg-white/10 p-4 text-center backdrop-blur-sm">
                      <div className="text-2xl font-bold text-white">3</div>
                      <div className="text-xs text-teal-200">In Progress</div>
                    </div>
                  </div>
                  <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-teal-100">
                        Renewal Deadline
                      </span>
                      <span className="text-sm font-semibold text-white">
                        Dec 31, 2026
                      </span>
                    </div>
                  </div>
                </div>
                <button className="mt-6 w-full rounded-lg bg-white px-4 py-3 text-center font-semibold text-teal-700 transition-all hover:bg-teal-50">
                  Access Your Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-900 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Start Earning CE Credits Today
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
              Browse our catalog of accredited courses and maintain your
              professional credentials with the latest in ketamine therapy
              education.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button className="inline-flex items-center justify-center rounded-lg bg-teal-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-teal-500">
                Browse All Courses
              </button>
              <button className="inline-flex items-center justify-center rounded-lg border border-slate-600 bg-transparent px-8 py-4 text-base font-semibold text-white transition-all hover:bg-slate-800">
                Create Free Account
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
