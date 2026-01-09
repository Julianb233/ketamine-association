import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Clean existing data
  await prisma.$transaction([
    prisma.newsletterSubscriber.deleteMany(),
    prisma.courseEnrollment.deleteMany(),
    prisma.courseModule.deleteMany(),
    prisma.course.deleteMany(),
    prisma.eventRegistration.deleteMany(),
    prisma.event.deleteMany(),
    prisma.product.deleteMany(),
    prisma.article.deleteMany(),
    prisma.review.deleteMany(),
    prisma.consultation.deleteMany(),
    prisma.lead.deleteMany(),
    prisma.certification.deleteMany(),
    prisma.savedProvider.deleteMany(),
    prisma.practitionerInsurance.deleteMany(),
    prisma.practitionerCondition.deleteMany(),
    prisma.practitionerTreatment.deleteMany(),
    prisma.patient.deleteMany(),
    prisma.practitioner.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  console.log("✅ Cleaned existing data");

  // Create users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: "dr.smith@example.com",
        name: "Dr. Sarah Smith",
        role: "PRACTITIONER",
      },
    }),
    prisma.user.create({
      data: {
        email: "dr.johnson@example.com",
        name: "Dr. Michael Johnson",
        role: "PRACTITIONER",
      },
    }),
    prisma.user.create({
      data: {
        email: "dr.williams@example.com",
        name: "Dr. Emily Williams",
        role: "PRACTITIONER",
      },
    }),
    prisma.user.create({
      data: {
        email: "dr.chen@example.com",
        name: "Dr. David Chen",
        role: "PRACTITIONER",
      },
    }),
    prisma.user.create({
      data: {
        email: "dr.martinez@example.com",
        name: "Dr. Maria Martinez",
        role: "PRACTITIONER",
      },
    }),
    prisma.user.create({
      data: {
        email: "patient1@example.com",
        name: "John Patient",
        role: "PATIENT",
      },
    }),
    prisma.user.create({
      data: {
        email: "admin@ketamineassociation.org",
        name: "Admin User",
        role: "ADMIN",
      },
    }),
  ]);

  console.log(`✅ Created ${users.length} users`);

  // Create practitioners
  const practitioners = await Promise.all([
    prisma.practitioner.create({
      data: {
        userId: users[0].id,
        slug: "dr-sarah-smith",
        title: "Dr.",
        firstName: "Sarah",
        lastName: "Smith",
        credentials: "MD, PhD",
        specialty: "Psychiatry",
        bio: "Dr. Sarah Smith is a board-certified psychiatrist with over 15 years of experience in treating depression and anxiety. She pioneered ketamine therapy protocols at her clinic and has helped over 2,000 patients find relief.",
        profileImage: "/images/practitioners/sarah-smith.jpg",
        practiceName: "Smith Ketamine Clinic",
        address: "123 Medical Center Dr, Suite 400",
        city: "Los Angeles",
        state: "CA",
        zipCode: "90210",
        phone: "(310) 555-0100",
        website: "https://smithketamine.com",
        latitude: 34.0522,
        longitude: -118.2437,
        membershipTier: "ELITE",
        membershipStatus: "ACTIVE",
        isVerified: true,
        verifiedAt: new Date(),
        licenseNumber: "A123456",
        licenseState: "CA",
        npiNumber: "1234567890",
        rating: 4.9,
        reviewCount: 127,
        profileViews: 5420,
      },
    }),
    prisma.practitioner.create({
      data: {
        userId: users[1].id,
        slug: "dr-michael-johnson",
        title: "Dr.",
        firstName: "Michael",
        lastName: "Johnson",
        credentials: "MD",
        specialty: "Pain Management",
        bio: "Dr. Johnson specializes in chronic pain management using innovative ketamine infusion therapy. He has been at the forefront of research into ketamine's analgesic properties.",
        profileImage: "/images/practitioners/michael-johnson.jpg",
        practiceName: "Johnson Pain Relief Center",
        address: "456 Wellness Blvd",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        phone: "(212) 555-0200",
        website: "https://johnsonpain.com",
        latitude: 40.7128,
        longitude: -74.006,
        membershipTier: "PREMIUM",
        membershipStatus: "ACTIVE",
        isVerified: true,
        verifiedAt: new Date(),
        licenseNumber: "B789012",
        licenseState: "NY",
        npiNumber: "0987654321",
        rating: 4.7,
        reviewCount: 89,
        profileViews: 3210,
      },
    }),
    prisma.practitioner.create({
      data: {
        userId: users[2].id,
        slug: "dr-emily-williams",
        title: "Dr.",
        firstName: "Emily",
        lastName: "Williams",
        credentials: "DO, MS",
        specialty: "Integrative Psychiatry",
        bio: "Dr. Williams combines traditional psychiatry with integrative approaches, offering ketamine-assisted psychotherapy for treatment-resistant conditions.",
        profileImage: "/images/practitioners/emily-williams.jpg",
        practiceName: "Integrative Mind Center",
        address: "789 Healing Way",
        city: "Austin",
        state: "TX",
        zipCode: "78701",
        phone: "(512) 555-0300",
        website: "https://integrativemind.com",
        latitude: 30.2672,
        longitude: -97.7431,
        membershipTier: "PREMIUM",
        membershipStatus: "ACTIVE",
        isVerified: true,
        verifiedAt: new Date(),
        licenseNumber: "C345678",
        licenseState: "TX",
        npiNumber: "1122334455",
        rating: 4.8,
        reviewCount: 64,
        profileViews: 2890,
      },
    }),
    prisma.practitioner.create({
      data: {
        userId: users[3].id,
        slug: "dr-david-chen",
        title: "Dr.",
        firstName: "David",
        lastName: "Chen",
        credentials: "MD, MPH",
        specialty: "Addiction Medicine",
        bio: "Dr. Chen focuses on using ketamine therapy as part of a comprehensive approach to addiction treatment and mental health recovery.",
        profileImage: "/images/practitioners/david-chen.jpg",
        practiceName: "Chen Recovery Institute",
        address: "321 Recovery Rd",
        city: "Seattle",
        state: "WA",
        zipCode: "98101",
        phone: "(206) 555-0400",
        latitude: 47.6062,
        longitude: -122.3321,
        membershipTier: "PROFESSIONAL",
        membershipStatus: "ACTIVE",
        isVerified: true,
        verifiedAt: new Date(),
        licenseNumber: "D901234",
        licenseState: "WA",
        rating: 4.6,
        reviewCount: 42,
        profileViews: 1560,
      },
    }),
    prisma.practitioner.create({
      data: {
        userId: users[4].id,
        slug: "dr-maria-martinez",
        title: "Dr.",
        firstName: "Maria",
        lastName: "Martinez",
        credentials: "MD",
        specialty: "Emergency Medicine",
        bio: "Dr. Martinez brings her emergency medicine expertise to ketamine therapy, ensuring the highest standards of patient safety and care.",
        practiceName: "Martinez Ketamine Center",
        address: "567 Care St",
        city: "Miami",
        state: "FL",
        zipCode: "33101",
        phone: "(305) 555-0500",
        latitude: 25.7617,
        longitude: -80.1918,
        membershipTier: "FREE",
        membershipStatus: "ACTIVE",
        isVerified: false,
        rating: 4.5,
        reviewCount: 18,
        profileViews: 890,
      },
    }),
  ]);

  console.log(`✅ Created ${practitioners.length} practitioners`);

  // Add treatments to practitioners
  const treatments = [
    { practitionerId: practitioners[0].id, treatmentType: "IV_INFUSION" as const },
    { practitionerId: practitioners[0].id, treatmentType: "KETAMINE_ASSISTED_PSYCHOTHERAPY" as const },
    { practitionerId: practitioners[1].id, treatmentType: "IV_INFUSION" as const },
    { practitionerId: practitioners[1].id, treatmentType: "IM_INJECTION" as const },
    { practitionerId: practitioners[2].id, treatmentType: "KETAMINE_ASSISTED_PSYCHOTHERAPY" as const },
    { practitionerId: practitioners[2].id, treatmentType: "ORAL_SUBLINGUAL" as const },
    { practitionerId: practitioners[3].id, treatmentType: "IV_INFUSION" as const },
    { practitionerId: practitioners[4].id, treatmentType: "IV_INFUSION" as const },
    { practitionerId: practitioners[4].id, treatmentType: "NASAL_SPRAY" as const },
  ];

  await prisma.practitionerTreatment.createMany({ data: treatments });
  console.log(`✅ Added ${treatments.length} treatment types`);

  // Add conditions to practitioners
  const conditions = [
    { practitionerId: practitioners[0].id, condition: "TREATMENT_RESISTANT_DEPRESSION" as const },
    { practitionerId: practitioners[0].id, condition: "ANXIETY" as const },
    { practitionerId: practitioners[0].id, condition: "PTSD" as const },
    { practitionerId: practitioners[1].id, condition: "CHRONIC_PAIN" as const },
    { practitionerId: practitioners[1].id, condition: "FIBROMYALGIA" as const },
    { practitionerId: practitioners[1].id, condition: "CRPS" as const },
    { practitionerId: practitioners[2].id, condition: "TREATMENT_RESISTANT_DEPRESSION" as const },
    { practitionerId: practitioners[2].id, condition: "ANXIETY" as const },
    { practitionerId: practitioners[2].id, condition: "OCD" as const },
    { practitionerId: practitioners[3].id, condition: "TREATMENT_RESISTANT_DEPRESSION" as const },
    { practitionerId: practitioners[3].id, condition: "SUICIDAL_IDEATION" as const },
    { practitionerId: practitioners[4].id, condition: "CHRONIC_PAIN" as const },
    { practitionerId: practitioners[4].id, condition: "BIPOLAR_DEPRESSION" as const },
  ];

  await prisma.practitionerCondition.createMany({ data: conditions });
  console.log(`✅ Added ${conditions.length} conditions`);

  // Add certifications
  const certifications = [
    {
      practitionerId: practitioners[0].id,
      certificationType: "MASTER_PRACTITIONER" as const,
      issuedAt: new Date("2022-01-15"),
      expiresAt: new Date("2025-01-15"),
    },
    {
      practitionerId: practitioners[0].id,
      certificationType: "KAP_SPECIALTY" as const,
      issuedAt: new Date("2021-06-20"),
      expiresAt: new Date("2024-06-20"),
    },
    {
      practitionerId: practitioners[1].id,
      certificationType: "ADVANCED" as const,
      issuedAt: new Date("2023-03-10"),
      expiresAt: new Date("2026-03-10"),
    },
    {
      practitionerId: practitioners[2].id,
      certificationType: "KAP_SPECIALTY" as const,
      issuedAt: new Date("2023-08-05"),
      expiresAt: new Date("2026-08-05"),
    },
    {
      practitionerId: practitioners[3].id,
      certificationType: "FOUNDATIONAL" as const,
      issuedAt: new Date("2024-01-20"),
      expiresAt: new Date("2027-01-20"),
    },
  ];

  await prisma.certification.createMany({ data: certifications });
  console.log(`✅ Added ${certifications.length} certifications`);

  // Create patient
  const patient = await prisma.patient.create({
    data: {
      userId: users[5].id,
      firstName: "John",
      lastName: "Patient",
      city: "Los Angeles",
      state: "CA",
      isPremium: true,
    },
  });

  console.log(`✅ Created patient`);

  // Create reviews
  const reviews = [
    {
      practitionerId: practitioners[0].id,
      patientId: patient.id,
      userId: users[5].id,
      rating: 5,
      title: "Life-changing experience",
      content: "Dr. Smith and her team provided exceptional care. After years of struggling with treatment-resistant depression, ketamine therapy has given me my life back.",
      isVerified: true,
      isPublished: true,
    },
    {
      practitionerId: practitioners[1].id,
      rating: 5,
      title: "Finally pain relief",
      content: "Dr. Johnson's ketamine infusions have significantly reduced my chronic pain. His expertise and the clinic's professionalism are outstanding.",
      isVerified: true,
      isPublished: true,
    },
    {
      practitionerId: practitioners[2].id,
      rating: 4,
      title: "Great integrated approach",
      content: "The combination of ketamine and psychotherapy has been very effective. Dr. Williams really takes time to understand each patient.",
      isVerified: true,
      isPublished: true,
    },
  ];

  await prisma.review.createMany({ data: reviews });
  console.log(`✅ Added ${reviews.length} reviews`);

  // Create events
  const events = await Promise.all([
    prisma.event.create({
      data: {
        slug: "ketamine-conference-2024",
        title: "Annual Ketamine Therapy Conference 2024",
        description: "Join leading practitioners and researchers for the premier ketamine therapy conference. Three days of workshops, presentations, and networking.",
        eventType: "CONFERENCE",
        format: "HYBRID",
        startDate: new Date("2024-09-15"),
        endDate: new Date("2024-09-17"),
        location: "San Diego Convention Center",
        virtualUrl: "https://conference.ketamineassociation.org",
        price: 599,
        memberPrice: 449,
        capacity: 500,
        isPublished: true,
      },
    }),
    prisma.event.create({
      data: {
        slug: "kap-intensive-workshop",
        title: "KAP Intensive Workshop",
        description: "A comprehensive 2-day workshop on Ketamine-Assisted Psychotherapy protocols and best practices.",
        eventType: "WORKSHOP",
        format: "IN_PERSON",
        startDate: new Date("2024-06-22"),
        endDate: new Date("2024-06-23"),
        location: "New York Medical Center",
        price: 899,
        memberPrice: 699,
        capacity: 30,
        isPublished: true,
      },
    }),
    prisma.event.create({
      data: {
        slug: "monthly-practitioner-webinar",
        title: "Monthly Practitioner Webinar: New Research Updates",
        description: "Stay current with the latest research findings in ketamine therapy. Open Q&A with expert panel.",
        eventType: "WEBINAR",
        format: "VIRTUAL",
        startDate: new Date("2024-04-10"),
        virtualUrl: "https://webinar.ketamineassociation.org",
        price: 0,
        capacity: 200,
        isPublished: true,
      },
    }),
  ]);

  console.log(`✅ Created ${events.length} events`);

  // Create courses
  const courses = await Promise.all([
    prisma.course.create({
      data: {
        slug: "foundational-ketamine-certification",
        title: "Foundational Ketamine Certification",
        description: "The essential course for healthcare providers looking to add ketamine therapy to their practice. Covers pharmacology, protocols, safety, and patient selection.",
        price: 1499,
        memberPrice: 1199,
        ceCredits: 24,
        ceProvider: "ACCME",
        isPublished: true,
        modules: {
          create: [
            { title: "Introduction to Ketamine Therapy", description: "History and current applications", order: 1, duration: 60 },
            { title: "Pharmacology & Mechanisms", description: "How ketamine works in the brain", order: 2, duration: 90 },
            { title: "Patient Selection & Screening", description: "Identifying suitable candidates", order: 3, duration: 75 },
            { title: "Treatment Protocols", description: "IV, IM, and oral administration", order: 4, duration: 120 },
            { title: "Safety & Monitoring", description: "Managing risks and side effects", order: 5, duration: 90 },
            { title: "Practice Implementation", description: "Setting up your ketamine program", order: 6, duration: 60 },
          ],
        },
      },
    }),
    prisma.course.create({
      data: {
        slug: "advanced-kap-training",
        title: "Advanced KAP Training",
        description: "Deep dive into Ketamine-Assisted Psychotherapy for mental health professionals. Integrating psychotherapeutic approaches with ketamine treatment.",
        price: 2499,
        memberPrice: 1999,
        ceCredits: 40,
        ceProvider: "APA",
        isPublished: true,
        modules: {
          create: [
            { title: "Foundations of KAP", description: "Theoretical framework", order: 1, duration: 90 },
            { title: "Preparation Sessions", description: "Setting intentions and building rapport", order: 2, duration: 120 },
            { title: "The Ketamine Experience", description: "Guiding patients through treatment", order: 3, duration: 150 },
            { title: "Integration Work", description: "Processing and applying insights", order: 4, duration: 120 },
            { title: "Case Studies", description: "Real-world examples and discussion", order: 5, duration: 90 },
          ],
        },
      },
    }),
  ]);

  console.log(`✅ Created ${courses.length} courses`);

  // Create products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        slug: "ketamine-therapy-journal",
        name: "Ketamine Therapy Journal",
        description: "A guided journal for patients to document their ketamine therapy journey, including preparation, experience, and integration sections.",
        price: 29.99,
        category: "JOURNALS",
        images: ["/images/products/therapy-journal.jpg"],
        inventory: 500,
        isPublished: true,
      },
    }),
    prisma.product.create({
      data: {
        slug: "integration-workbook",
        name: "Integration Workbook",
        description: "Comprehensive workbook with exercises and prompts to help patients integrate insights from their ketamine sessions.",
        price: 24.99,
        category: "WORKBOOKS",
        images: ["/images/products/integration-workbook.jpg"],
        inventory: 350,
        isPublished: true,
      },
    }),
    prisma.product.create({
      data: {
        slug: "practitioners-guide-ebook",
        name: "The Practitioner's Guide to Ketamine Therapy (eBook)",
        description: "Digital comprehensive guide covering all aspects of starting and running a ketamine therapy practice.",
        price: 79.99,
        compareAtPrice: 129.99,
        category: "BOOKS",
        images: ["/images/products/practitioners-guide.jpg"],
        isDigital: true,
        digitalFileUrl: "/downloads/practitioners-guide.pdf",
        isPublished: true,
      },
    }),
    prisma.product.create({
      data: {
        slug: "comfort-bundle",
        name: "Treatment Comfort Bundle",
        description: "Everything patients need for a comfortable ketamine session: weighted blanket, eye mask, and calming essential oils.",
        price: 149.99,
        compareAtPrice: 189.99,
        category: "BUNDLES",
        images: ["/images/products/comfort-bundle.jpg"],
        inventory: 100,
        isPublished: true,
      },
    }),
  ]);

  console.log(`✅ Created ${products.length} products`);

  // Create articles
  const articles = await Promise.all([
    prisma.article.create({
      data: {
        slug: "understanding-ketamine-depression",
        title: "Understanding How Ketamine Treats Depression: A Deep Dive",
        excerpt: "Explore the neuroscience behind ketamine's rapid antidepressant effects and why it's revolutionizing mental health treatment.",
        content: "Full article content would go here...",
        category: "CLINICAL_RESEARCH",
        tags: ["depression", "neuroscience", "treatment"],
        status: "PUBLISHED",
        publishedAt: new Date("2024-01-15"),
        views: 12500,
        likes: 342,
        practitionerId: practitioners[0].id,
      },
    }),
    prisma.article.create({
      data: {
        slug: "building-ketamine-practice",
        title: "Building a Successful Ketamine Therapy Practice: A Complete Guide",
        excerpt: "From regulatory requirements to patient acquisition, learn the essential steps to launching your ketamine clinic.",
        content: "Full article content would go here...",
        category: "PRACTICE_MANAGEMENT",
        tags: ["practice management", "business", "startup"],
        status: "PUBLISHED",
        publishedAt: new Date("2024-02-01"),
        views: 8900,
        likes: 215,
        practitionerId: practitioners[1].id,
      },
    }),
    prisma.article.create({
      data: {
        slug: "patient-story-recovery",
        title: "My Journey to Recovery: A Patient's Ketamine Story",
        excerpt: "After 20 years of treatment-resistant depression, one patient shares how ketamine therapy changed everything.",
        content: "Full article content would go here...",
        category: "PATIENT_STORIES",
        tags: ["patient story", "recovery", "inspiration"],
        status: "PUBLISHED",
        publishedAt: new Date("2024-02-15"),
        views: 15600,
        likes: 789,
      },
    }),
  ]);

  console.log(`✅ Created ${articles.length} articles`);

  // Create newsletter subscribers
  const subscribers = await prisma.newsletterSubscriber.createMany({
    data: [
      { email: "subscriber1@example.com", firstName: "Alice", role: "PATIENT" },
      { email: "subscriber2@example.com", firstName: "Bob", role: "PRACTITIONER" },
      { email: "subscriber3@example.com", firstName: "Carol", role: "GENERAL" },
      { email: "subscriber4@example.com", firstName: "Dan", role: "PRACTITIONER" },
      { email: "subscriber5@example.com", firstName: "Eve", role: "PATIENT" },
    ],
  });

  console.log(`✅ Created ${subscribers.count} newsletter subscribers`);

  console.log("\n🎉 Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
