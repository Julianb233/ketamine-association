import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🧹 Cleaning database for production...\n");

  // Get counts before deletion
  const counts = {
    users: await prisma.user.count(),
    practitioners: await prisma.practitioner.count(),
    patients: await prisma.patient.count(),
    reviews: await prisma.review.count(),
    events: await prisma.event.count(),
    courses: await prisma.course.count(),
    products: await prisma.product.count(),
    articles: await prisma.article.count(),
    newsletter: await prisma.newsletterSubscriber.count(),
  };

  console.log("📊 Current database contents:");
  console.log(`   Users: ${counts.users}`);
  console.log(`   Practitioners: ${counts.practitioners}`);
  console.log(`   Patients: ${counts.patients}`);
  console.log(`   Reviews: ${counts.reviews}`);
  console.log(`   Events: ${counts.events}`);
  console.log(`   Courses: ${counts.courses}`);
  console.log(`   Products: ${counts.products}`);
  console.log(`   Articles: ${counts.articles}`);
  console.log(`   Newsletter Subscribers: ${counts.newsletter}`);
  console.log("");

  // Delete all data in correct order (respecting foreign keys)
  await prisma.$transaction([
    // Order-related
    prisma.orderItem.deleteMany(),
    prisma.order.deleteMany(),

    // Newsletter
    prisma.newsletterSubscriber.deleteMany(),

    // Course-related
    prisma.courseEnrollment.deleteMany(),
    prisma.courseModule.deleteMany(),
    prisma.course.deleteMany(),

    // Event-related
    prisma.eventRegistration.deleteMany(),
    prisma.event.deleteMany(),

    // Product
    prisma.product.deleteMany(),

    // Article
    prisma.article.deleteMany(),

    // Review
    prisma.review.deleteMany(),

    // Consultation & Lead
    prisma.consultation.deleteMany(),
    prisma.lead.deleteMany(),

    // Practitioner-related
    prisma.certification.deleteMany(),
    prisma.savedProvider.deleteMany(),
    prisma.practitionerInsurance.deleteMany(),
    prisma.practitionerCondition.deleteMany(),
    prisma.practitionerTreatment.deleteMany(),

    // Patient & Practitioner
    prisma.patient.deleteMany(),
    prisma.practitioner.deleteMany(),

    // User (last, as everything references it)
    prisma.user.deleteMany(),
  ]);

  console.log("✅ All seed data has been removed!");
  console.log("\n🎉 Database is now clean and production-ready!");
}

main()
  .catch((e) => {
    console.error("❌ Cleanup error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
