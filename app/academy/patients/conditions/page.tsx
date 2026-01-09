import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions Treated | KTA Patient Education",
  description:
    "Learn how ketamine therapy treats depression, chronic pain, PTSD, anxiety, OCD, and other conditions. Evidence-based information and success rates.",
};

const conditions = [
  {
    name: "Treatment-Resistant Depression",
    slug: "depression",
    description:
      "Major depressive disorder that hasn't responded to traditional antidepressants. Ketamine offers rapid relief when other treatments have failed.",
    howItHelps:
      "Ketamine works differently than traditional antidepressants by targeting the glutamate system and promoting neural plasticity. Many patients experience significant improvement within hours to days, compared to weeks with conventional medications.",
    successRate: "70-75%",
    responseTime: "24-72 hours",
    icon: (
      <svg
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    color: "blue",
    researchLinks: [
      "NIH Study on Ketamine for Depression",
      "JAMA Psychiatry Meta-Analysis",
    ],
  },
  {
    name: "Chronic Pain Syndromes",
    slug: "chronic-pain",
    description:
      "Complex regional pain syndrome (CRPS), fibromyalgia, neuropathic pain, and other chronic pain conditions that resist conventional treatment.",
    howItHelps:
      "Ketamine blocks NMDA receptors involved in pain signaling and can 'reset' sensitized pain pathways. It reduces central sensitization and provides relief when other pain management approaches have failed.",
    successRate: "60-70%",
    responseTime: "During infusion",
    icon: (
      <svg
        className="h-8 w-8"
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
    color: "orange",
    researchLinks: [
      "Pain Medicine Journal Study",
      "Anesthesiology Clinical Trials",
    ],
  },
  {
    name: "Post-Traumatic Stress Disorder (PTSD)",
    slug: "ptsd",
    description:
      "A condition triggered by experiencing or witnessing traumatic events, characterized by flashbacks, nightmares, and severe anxiety.",
    howItHelps:
      "Ketamine helps process traumatic memories by temporarily reducing emotional reactivity while enhancing neuroplasticity. Combined with psychotherapy, it can accelerate trauma processing and reduce symptom severity.",
    successRate: "65-80%",
    responseTime: "1-2 weeks",
    icon: (
      <svg
        className="h-8 w-8"
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
    color: "purple",
    researchLinks: [
      "VA Research on Ketamine for PTSD",
      "American Journal of Psychiatry",
    ],
  },
  {
    name: "Anxiety Disorders",
    slug: "anxiety",
    description:
      "Generalized anxiety disorder, social anxiety, and other anxiety conditions that significantly impact daily life and haven't responded to standard treatments.",
    howItHelps:
      "Ketamine rapidly reduces anxiety symptoms by modulating glutamate transmission and promoting the growth of new neural connections. Many patients report a 'lifting' of persistent anxiety within the first few sessions.",
    successRate: "60-70%",
    responseTime: "24-48 hours",
    icon: (
      <svg
        className="h-8 w-8"
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
    color: "teal",
    researchLinks: [
      "Journal of Clinical Psychiatry",
      "Biological Psychiatry Research",
    ],
  },
  {
    name: "Obsessive-Compulsive Disorder (OCD)",
    slug: "ocd",
    description:
      "A condition characterized by intrusive thoughts (obsessions) and repetitive behaviors (compulsions) that interfere with daily functioning.",
    howItHelps:
      "Ketamine's glutamate-modulating effects can rapidly reduce OCD symptoms by disrupting rigid thought patterns and compulsive behaviors. It may enhance the effectiveness of exposure-response prevention therapy.",
    successRate: "50-60%",
    responseTime: "1-4 days",
    icon: (
      <svg
        className="h-8 w-8"
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
    color: "indigo",
    researchLinks: [
      "Columbia University OCD Study",
      "International OCD Foundation",
    ],
  },
  {
    name: "Bipolar Depression",
    slug: "bipolar",
    description:
      "The depressive phase of bipolar disorder, which can be particularly difficult to treat without triggering manic episodes.",
    howItHelps:
      "Ketamine provides rapid antidepressant effects without the risk of inducing mania that comes with traditional antidepressants. Careful monitoring ensures safe treatment for bipolar patients.",
    successRate: "55-65%",
    responseTime: "24-72 hours",
    icon: (
      <svg
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
        />
      </svg>
    ),
    color: "pink",
    researchLinks: [
      "Bipolar Disorders Journal",
      "Stanford Bipolar Research",
    ],
  },
  {
    name: "Suicidal Ideation",
    slug: "suicidal-ideation",
    description:
      "Active suicidal thoughts that require urgent intervention. Ketamine's rapid action can be life-saving when immediate relief is needed.",
    howItHelps:
      "Ketamine can reduce suicidal thoughts within hours, providing a critical bridge while other treatments take effect. Its rapid action makes it valuable in acute psychiatric settings.",
    successRate: "75-80%",
    responseTime: "4-24 hours",
    icon: (
      <svg
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    color: "red",
    researchLinks: [
      "American Journal of Emergency Medicine",
      "Lancet Psychiatry",
    ],
  },
  {
    name: "Substance Use Disorders",
    slug: "addiction",
    description:
      "Alcohol and opioid use disorders, particularly when co-occurring with depression or anxiety.",
    howItHelps:
      "Ketamine may help reduce cravings and break addictive patterns by promoting neuroplasticity. Combined with psychotherapy, it can support recovery by addressing underlying trauma and depression.",
    successRate: "45-55%",
    responseTime: "Varies",
    icon: (
      <svg
        className="h-8 w-8"
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
    ),
    color: "amber",
    researchLinks: [
      "Addiction Medicine Journal",
      "Yale Addiction Studies",
    ],
  },
];

const colorClasses: Record<string, { bg: string; text: string; border: string }> = {
  blue: {
    bg: "bg-blue-100",
    text: "text-blue-600",
    border: "border-blue-200",
  },
  orange: {
    bg: "bg-orange-100",
    text: "text-orange-600",
    border: "border-orange-200",
  },
  purple: {
    bg: "bg-purple-100",
    text: "text-purple-600",
    border: "border-purple-200",
  },
  teal: {
    bg: "bg-teal-100",
    text: "text-teal-600",
    border: "border-teal-200",
  },
  indigo: {
    bg: "bg-indigo-100",
    text: "text-indigo-600",
    border: "border-indigo-200",
  },
  pink: {
    bg: "bg-pink-100",
    text: "text-pink-600",
    border: "border-pink-200",
  },
  red: {
    bg: "bg-red-100",
    text: "text-red-600",
    border: "border-red-200",
  },
  amber: {
    bg: "bg-amber-100",
    text: "text-amber-600",
    border: "border-amber-200",
  },
};

export default function ConditionsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-500">
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
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
              <li>
                <Link
                  href="/academy/patients"
                  className="text-emerald-100 hover:text-white"
                >
                  Patients
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
              <li className="text-white font-medium">Conditions</li>
            </ol>
          </nav>

          <div className="mt-8 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Conditions Treated with
              <br />
              <span className="text-emerald-200">Ketamine Therapy</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-emerald-100">
              Evidence-based information on how ketamine therapy can help
              various mental health conditions and chronic pain syndromes.
            </p>
          </div>
        </div>
      </section>

      {/* Conditions Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {conditions.map((condition) => (
              <div
                key={condition.slug}
                className={`rounded-2xl border ${colorClasses[condition.color]?.border || "border-slate-200"} bg-white p-8 shadow-sm transition-all hover:shadow-lg`}
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`inline-flex h-14 w-14 items-center justify-center rounded-xl ${colorClasses[condition.color]?.bg || "bg-slate-100"} ${colorClasses[condition.color]?.text || "text-slate-600"}`}
                  >
                    {condition.icon}
                  </div>
                  <div className="flex gap-4 text-center">
                    <div>
                      <div
                        className={`text-xl font-bold ${colorClasses[condition.color]?.text || "text-slate-600"}`}
                      >
                        {condition.successRate}
                      </div>
                      <div className="text-xs text-slate-500">Response Rate</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-slate-700">
                        {condition.responseTime}
                      </div>
                      <div className="text-xs text-slate-500">Response Time</div>
                    </div>
                  </div>
                </div>

                <h2 className="mt-6 text-2xl font-bold text-slate-900">
                  {condition.name}
                </h2>
                <p className="mt-3 text-slate-600">{condition.description}</p>

                <div className="mt-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                    How Ketamine Helps
                  </h3>
                  <p className="mt-2 text-slate-700">{condition.howItHelps}</p>
                </div>

                <div className="mt-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                    Research & Evidence
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {condition.researchLinks.map((link, index) => (
                      <a
                        key={index}
                        href="#"
                        className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 hover:bg-slate-200"
                      >
                        <svg
                          className="mr-1 h-3 w-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                          />
                        </svg>
                        {link}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="mt-6 border-t border-slate-100 pt-6">
                  <Link
                    href={`/academy/patients/conditions/${condition.slug}`}
                    className={`inline-flex items-center text-sm font-semibold ${colorClasses[condition.color]?.text || "text-slate-600"} hover:underline`}
                  >
                    Learn more about {condition.name.toLowerCase()}
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
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="bg-amber-50 py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <svg
                className="h-6 w-6 text-amber-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-amber-800">
                Important Information
              </h3>
              <p className="mt-2 text-amber-700">
                The information provided here is for educational purposes only
                and is not intended to replace professional medical advice.
                Ketamine therapy is not appropriate for everyone, and a
                thorough evaluation by a qualified healthcare provider is
                essential before beginning treatment. Success rates vary by
                individual and condition, and results cannot be guaranteed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              The Evidence for Ketamine Therapy
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              Decades of research support the use of ketamine for mental health
              and pain conditions
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 p-6 text-center text-white">
              <div className="text-4xl font-bold">50+</div>
              <div className="mt-2 text-emerald-100">Years of Research</div>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 p-6 text-center text-white">
              <div className="text-4xl font-bold">1,000+</div>
              <div className="mt-2 text-teal-100">Published Studies</div>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-emerald-600 to-teal-500 p-6 text-center text-white">
              <div className="text-4xl font-bold">70%</div>
              <div className="mt-2 text-emerald-100">Average Response Rate</div>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-teal-600 to-emerald-500 p-6 text-center text-white">
              <div className="text-4xl font-bold">FDA</div>
              <div className="mt-2 text-teal-100">Approved (Spravato)</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-emerald-600 to-teal-600 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Learn More?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-emerald-100">
              Connect with a certified ketamine therapy provider to discuss
              whether treatment might be right for you.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="#"
                className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-base font-semibold text-emerald-700 shadow-lg transition-all hover:bg-emerald-50"
              >
                Find a Provider
              </Link>
              <Link
                href="/academy/patients"
                className="inline-flex items-center justify-center rounded-lg border-2 border-white/30 bg-transparent px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white/10"
              >
                Back to Patient Education
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
