import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certification Programs | KTA Academy",
  description:
    "Five levels of professional certification in ketamine-assisted therapy. From foundational training to master practitioner status.",
};

const certifications = [
  {
    level: 1,
    name: "Foundational Certification",
    tagline: "Essential Knowledge for Ketamine Therapy",
    description:
      "Build a solid foundation in ketamine pharmacology, patient assessment, and basic treatment protocols. Ideal for healthcare providers beginning their journey in ketamine-assisted therapy.",
    hours: 40,
    duration: "4-6 weeks",
    price: 1495,
    requirements: [
      "Active medical, nursing, or mental health license",
      "Completion of all foundational coursework",
      "Passing score on competency examination (80%+)",
      "Case study submission",
    ],
    benefits: [
      "KTA Foundational Certification credential",
      "Digital badge for professional profiles",
      "Listing in KTA Provider Directory",
      "Access to member community forums",
      "40 CE credits upon completion",
    ],
    curriculum: [
      "Ketamine Pharmacology & Mechanisms",
      "Patient Screening & Assessment",
      "Basic Dosing Protocols",
      "Safety Monitoring & Emergency Response",
      "Legal & Regulatory Compliance",
      "Documentation Best Practices",
    ],
    color: "teal",
  },
  {
    level: 2,
    name: "Advanced Certification",
    tagline: "Elevated Clinical Competencies",
    description:
      "Develop advanced clinical skills including complex dosing protocols, management of challenging cases, and optimization of treatment outcomes. For practitioners with foundational experience.",
    hours: 80,
    duration: "8-12 weeks",
    price: 2995,
    requirements: [
      "Foundational Certification or equivalent",
      "Minimum 20 supervised ketamine sessions",
      "Completion of all advanced coursework",
      "Clinical case presentation",
      "Oral examination",
    ],
    benefits: [
      "KTA Advanced Certification credential",
      "Priority listing in Provider Directory",
      "Access to advanced case consultation",
      "Invitation to advanced practitioner network",
      "80 CE credits upon completion",
    ],
    curriculum: [
      "Advanced Dosing Strategies",
      "Complex Patient Management",
      "Treatment Optimization Techniques",
      "Adverse Event Prevention & Management",
      "Multi-Session Treatment Planning",
      "Outcome Measurement & Tracking",
    ],
    color: "emerald",
  },
  {
    level: 3,
    name: "KAP Specialty Certification",
    tagline: "Psychotherapy Integration Expertise",
    description:
      "Master the art of ketamine-assisted psychotherapy integration. Learn evidence-based therapeutic frameworks, integration techniques, and how to maximize psychological healing.",
    hours: 120,
    duration: "12-16 weeks",
    price: 4495,
    requirements: [
      "Advanced Certification",
      "Licensed mental health professional",
      "Minimum 50 KAP sessions completed",
      "Supervised case series (5 patients)",
      "Written thesis on integration methodology",
    ],
    benefits: [
      "KTA KAP Specialist credential",
      "Featured listing in Provider Directory",
      "Access to KAP supervision network",
      "Ability to supervise foundational trainees",
      "120 CE credits upon completion",
    ],
    curriculum: [
      "Therapeutic Frameworks for KAP",
      "Preparation Session Best Practices",
      "In-Session Support Techniques",
      "Integration Session Methodology",
      "Trauma-Informed Approaches",
      "Group KAP Facilitation",
    ],
    color: "teal",
  },
  {
    level: 4,
    name: "Practice Leadership Certification",
    tagline: "Lead and Supervise KAT Programs",
    description:
      "Prepare to lead ketamine therapy programs, supervise other practitioners, and build successful clinical operations. Perfect for those ready to expand their impact.",
    hours: 160,
    duration: "16-20 weeks",
    price: 5995,
    requirements: [
      "KAP Specialty or Advanced Certification",
      "Minimum 2 years ketamine therapy experience",
      "100+ supervised sessions completed",
      "Practice operations assessment",
      "Leadership case study presentation",
    ],
    benefits: [
      "KTA Practice Leader credential",
      "Ability to supervise all certification levels",
      "Practice consultation services access",
      "Speaking opportunities at KTA events",
      "160 CE credits upon completion",
    ],
    curriculum: [
      "Clinical Program Development",
      "Staff Training & Supervision",
      "Quality Assurance Systems",
      "Business Operations for KAT",
      "Regulatory Compliance Management",
      "Risk Management & Insurance",
    ],
    color: "amber",
  },
  {
    level: 5,
    name: "Master Practitioner Certification",
    tagline: "Expert-Level Mastery and Teaching",
    description:
      "The pinnacle of ketamine therapy expertise. Master Practitioners are recognized leaders who contribute to advancing the field through teaching, research, and clinical excellence.",
    hours: 200,
    duration: "20-24 weeks",
    price: 7995,
    requirements: [
      "Practice Leadership Certification",
      "Minimum 5 years ketamine therapy experience",
      "Publication or research contribution",
      "Peer review and recommendation",
      "Comprehensive oral and written examination",
      "Teaching demonstration",
    ],
    benefits: [
      "KTA Master Practitioner credential",
      "Faculty status in KTA Academy",
      "Research collaboration opportunities",
      "Invitation to annual Master Summit",
      "200 CE credits upon completion",
      "Lifetime member recognition",
    ],
    curriculum: [
      "Advanced Research Methodology",
      "Curriculum Development & Teaching",
      "Novel Protocols & Innovation",
      "Expert Consultation Techniques",
      "Publication & Knowledge Dissemination",
      "Leadership in the Field",
    ],
    color: "slate",
  },
];

const faqs = [
  {
    question: "How long does it take to complete a certification?",
    answer:
      "Completion time varies by level. Foundational takes 4-6 weeks of dedicated study, while Master Practitioner can take 20-24 weeks. All programs are self-paced within these windows, allowing you to balance learning with your practice.",
  },
  {
    question: "Are the certifications recognized by licensing boards?",
    answer:
      "Yes, KTA Academy is an accredited CE provider recognized by major medical, nursing, and mental health licensing boards including AMA, AAPA, ANCC, and APA. CE credits earned through our certifications count toward license renewal requirements.",
  },
  {
    question: "Can I start at an advanced level if I have prior experience?",
    answer:
      "Practitioners with substantial prior training and experience may apply for accelerated placement. This requires documentation of prior education, supervised clinical hours, and passing our competency assessment.",
  },
  {
    question: "What is the format of the coursework?",
    answer:
      "Our programs combine online self-paced modules, live virtual workshops, case discussions, and practical assessments. Higher levels include in-person intensives and supervised clinical components.",
  },
  {
    question: "How long is the certification valid?",
    answer:
      "Certifications are valid for 3 years. Renewal requires completion of continuing education credits, ongoing clinical practice documentation, and adherence to KTA professional standards.",
  },
  {
    question: "Is financial assistance available?",
    answer:
      "Yes, we offer payment plans for all certification levels. Scholarships are available for practitioners in underserved areas and those from underrepresented backgrounds. Contact our admissions team for details.",
  },
];

export default function CertificationPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-b from-teal-600/10 to-transparent" />
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
              <li className="text-teal-400">Certification</li>
            </ol>
          </nav>

          <div className="mt-8 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Professional
              <br />
              <span className="text-teal-400">Certification Programs</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
              Five progressive levels of certification designed to validate and
              advance your expertise in ketamine-assisted therapy. Join the
              gold standard in practitioner credentialing.
            </p>
          </div>
        </div>
      </section>

      {/* Certification Pathway Diagram */}
      <section className="relative -mt-8 z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-white p-8 shadow-xl ring-1 ring-slate-100">
            <h2 className="text-center text-xl font-semibold text-slate-900">
              Certification Pathway
            </h2>
            <div className="mt-8 flex flex-col items-center justify-between gap-4 lg:flex-row">
              {certifications.map((cert, index) => (
                <div key={cert.level} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-full ${
                        cert.color === "teal"
                          ? "bg-teal-600"
                          : cert.color === "emerald"
                          ? "bg-emerald-600"
                          : cert.color === "amber"
                          ? "bg-amber-600"
                          : "bg-slate-800"
                      } text-xl font-bold text-white shadow-lg`}
                    >
                      L{cert.level}
                    </div>
                    <span className="mt-2 text-sm font-medium text-slate-700">
                      {cert.name.split(" ")[0]}
                    </span>
                    <span className="text-xs text-slate-500">
                      {cert.hours} hrs
                    </span>
                  </div>
                  {index < certifications.length - 1 && (
                    <div className="mx-4 hidden h-0.5 w-12 bg-gradient-to-r from-slate-300 to-slate-200 lg:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certification Details */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {certifications.map((cert, index) => (
              <div
                key={cert.level}
                id={`level-${cert.level}`}
                className={`${index % 2 === 0 ? "" : "lg:flex-row-reverse"} flex flex-col gap-12 lg:flex-row lg:items-start`}
              >
                <div className="lg:w-1/2">
                  <div
                    className={`inline-flex items-center rounded-full ${
                      cert.color === "teal"
                        ? "bg-teal-100 text-teal-700"
                        : cert.color === "emerald"
                        ? "bg-emerald-100 text-emerald-700"
                        : cert.color === "amber"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-slate-100 text-slate-700"
                    } px-4 py-1.5 text-sm font-medium`}
                  >
                    Level {cert.level}
                  </div>
                  <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
                    {cert.name}
                  </h2>
                  <p className="mt-2 text-lg font-medium text-slate-600">
                    {cert.tagline}
                  </p>
                  <p className="mt-4 text-slate-600">{cert.description}</p>

                  <div className="mt-6 grid grid-cols-3 gap-4">
                    <div className="rounded-lg bg-slate-50 p-4 text-center">
                      <div className="text-2xl font-bold text-slate-900">
                        {cert.hours}
                      </div>
                      <div className="text-sm text-slate-500">Hours</div>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-4 text-center">
                      <div className="text-2xl font-bold text-slate-900">
                        {cert.duration}
                      </div>
                      <div className="text-sm text-slate-500">Duration</div>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-4 text-center">
                      <div className="text-2xl font-bold text-slate-900">
                        ${cert.price.toLocaleString()}
                      </div>
                      <div className="text-sm text-slate-500">Investment</div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <button
                      className={`inline-flex items-center justify-center rounded-lg ${
                        cert.color === "teal"
                          ? "bg-teal-600 hover:bg-teal-500"
                          : cert.color === "emerald"
                          ? "bg-emerald-600 hover:bg-emerald-500"
                          : cert.color === "amber"
                          ? "bg-amber-600 hover:bg-amber-500"
                          : "bg-slate-800 hover:bg-slate-700"
                      } px-6 py-3 text-base font-semibold text-white shadow-lg transition-all`}
                    >
                      Apply for {cert.name.split(" ")[0]} Certification
                    </button>
                  </div>
                </div>

                <div className="lg:w-1/2">
                  <div className="space-y-6">
                    <div className="rounded-xl border border-slate-200 bg-white p-6">
                      <h3 className="flex items-center text-lg font-semibold text-slate-900">
                        <svg
                          className="mr-2 h-5 w-5 text-slate-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Requirements
                      </h3>
                      <ul className="mt-4 space-y-2">
                        {cert.requirements.map((req, i) => (
                          <li
                            key={i}
                            className="flex items-start text-sm text-slate-600"
                          >
                            <svg
                              className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-teal-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-6">
                      <h3 className="flex items-center text-lg font-semibold text-slate-900">
                        <svg
                          className="mr-2 h-5 w-5 text-slate-400"
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
                        Curriculum
                      </h3>
                      <ul className="mt-4 space-y-2">
                        {cert.curriculum.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start text-sm text-slate-600"
                          >
                            <span className="mr-2 text-slate-400">{i + 1}.</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-6">
                      <h3 className="flex items-center text-lg font-semibold text-slate-900">
                        <svg
                          className="mr-2 h-5 w-5 text-slate-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                          />
                        </svg>
                        Benefits
                      </h3>
                      <ul className="mt-4 space-y-2">
                        {cert.benefits.map((benefit, i) => (
                          <li
                            key={i}
                            className="flex items-start text-sm text-slate-600"
                          >
                            <svg
                              className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-amber-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Everything you need to know about our certification programs
            </p>
          </div>

          <div className="mt-12 space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-xl border border-slate-200 bg-white p-6"
              >
                <h3 className="text-lg font-semibold text-slate-900">
                  {faq.question}
                </h3>
                <p className="mt-2 text-slate-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-teal-600 to-teal-700 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Begin Your Certification Journey?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-teal-100">
              Join the community of certified ketamine therapy professionals.
              Our admissions team is here to help you find the right path.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-base font-semibold text-teal-700 shadow-lg transition-all hover:bg-teal-50">
                Apply Now
              </button>
              <button className="inline-flex items-center justify-center rounded-lg border-2 border-white/30 bg-transparent px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white/10">
                Schedule a Consultation
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
