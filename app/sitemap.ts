import { MetadataRoute } from 'next';

const BASE_URL = 'https://ketamineassociation.org';

// Article slugs from the articles data
const articleSlugs = [
  'breakthrough-ketamine-depression-study-2025',
  'fda-guidance-ketamine-compounding-2026',
  'integration-therapy-best-practices',
  'patient-story-ptsd-recovery',
  'at-home-ketamine-safety-protocols',
  'ketamine-chronic-pain-meta-analysis',
  'spravato-insurance-coverage-guide',
  'ketamine-therapy-market-report-2025',
  'new-ketamine-delivery-methods',
  'sarah-chronic-depression-recovery',
];

// Blog post slugs (comprehensive list)
const blogSlugs = [
  'breakthrough-ketamine-research-2024',
  'optimizing-clinic-operations',
  'patient-story-recovery-journey',
  'fda-updates-ketamine-regulations',
  'integration-therapy-protocols',
  'insurance-coverage-update',
  'dosing-protocols-comparison',
  'staff-training-essentials',
  '72-hour-breakthrough-rapid-effect',
  'after-infusion-navigating-recovery',
  'at-home-vs-clinic-delivery',
  'building-ketamine-practice-guide',
  'chronic-pain-ketamine-applications',
  'chronic-pain-life-reclaimed',
  'clinical-documentation-standards',
  'combining-ketamine-psychotherapy',
  'comorbidity-management-anxiety-ocd',
  'depression-recovery-journey',
  'dosing-protocols-evidence-review',
  'first-ketamine-infusion-what-to-expect',
  'future-proofing-practice-psychedelics',
  'future-psychedelic-medicine',
  'informed-consent-best-practices',
  'insurance-coverage-fight',
  'integration-therapy-maximizing-benefits',
  'is-ketamine-right-for-you',
  'ketamine-assisted-psychotherapy',
  'ketamine-bipolar-disorder',
  'ketamine-vs-antidepressants-decade-research',
  'legal-landscape-state-regulations',
  'long-term-maintenance-therapy',
  'managing-dissociative-experiences',
  'marketing-ketamine-practice-ethically',
  'microdosing-ketamine-protocols',
  'outcome-tracking-quality-improvement',
  'patient-safety-protocols-comprehensive',
  'patient-screening-assessment',
  'personalized-treatment-approach',
  'ptsd-ketamine-trauma-research',
  'referral-network-building',
  'science-of-hope-ketamine-brain',
  'set-and-setting-preparation',
  'special-populations-elderly-adolescent',
  'staff-training-certification',
  'telemedicine-ketamine-protocols',
  'treatment-failure-optimization',
  'treatment-resistant-depression-protocols',
  'veteran-ptsd-healing',
];

// Event slugs
const eventSlugs = [
  'annual-ketamine-summit-2024',
  'iv-infusion-masterclass',
  'mental-health-integration-webinar',
  'practitioner-networking-miami',
  'pediatric-ketamine-workshop',
  'research-roundtable-q1-2024',
  'ketamine-certification-course',
];

// Store product slugs
const productSlugs = [
  'ketamine-journey-journal',
  'integration-workbook',
  'magnesium-glycinate-supplement',
  'weighted-blanket',
  'ketamine-therapy-guide-book',
  'healing-starter-bundle',
  'eye-mask-meditation',
  'vitamin-b-complex',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    // Homepage
    {
      url: BASE_URL,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    // Core pages
    {
      url: `${BASE_URL}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/disclaimer`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },

    // Academy pages
    {
      url: `${BASE_URL}/academy`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/academy/courses`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/academy/practitioners`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/academy/practitioners/certification`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/academy/practitioners/ce-credits`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/academy/patients`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/academy/patients/conditions`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },

    // Education
    {
      url: `${BASE_URL}/education`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },

    // Association pages
    {
      url: `${BASE_URL}/association/membership`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/association/pricing`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/association/directory`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/association/events`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/association/sponsorship`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/association/sponsorship/apply`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/association/community`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },

    // Events
    {
      url: `${BASE_URL}/events`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },

    // Providers
    {
      url: `${BASE_URL}/providers`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },

    // Articles & Blog
    {
      url: `${BASE_URL}/articles`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },

    // Store
    {
      url: `${BASE_URL}/store`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },

    // Auth pages (lower priority)
    {
      url: `${BASE_URL}/sign-in`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/sign-up`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
  ];

  // Dynamic article pages
  const articlePages: MetadataRoute.Sitemap = articleSlugs.map((slug) => ({
    url: `${BASE_URL}/articles/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Dynamic blog pages
  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Dynamic event pages
  const eventPages: MetadataRoute.Sitemap = eventSlugs.map((slug) => ({
    url: `${BASE_URL}/association/events/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Dynamic product pages
  const productPages: MetadataRoute.Sitemap = productSlugs.map((slug) => ({
    url: `${BASE_URL}/store/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...articlePages,
    ...blogPages,
    ...eventPages,
    ...productPages,
  ];
}
