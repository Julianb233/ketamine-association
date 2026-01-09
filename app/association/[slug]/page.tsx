import { Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { formatDate } from "@/lib/utils";
import { ContactForm } from "./ContactForm";

// Treatment type display labels
const TREATMENT_LABELS: Record<string, string> = {
  IV_INFUSION: "IV Infusion",
  IM_INJECTION: "IM Injection",
  NASAL_SPRAY: "Nasal Spray (Spravato)",
  ORAL_SUBLINGUAL: "Oral/Sublingual",
  KETAMINE_ASSISTED_PSYCHOTHERAPY: "Ketamine-Assisted Psychotherapy (KAP)",
};

// Condition type display labels
const CONDITION_LABELS: Record<string, string> = {
  TREATMENT_RESISTANT_DEPRESSION: "Treatment-Resistant Depression",
  CHRONIC_PAIN: "Chronic Pain",
  PTSD: "PTSD",
  ANXIETY: "Anxiety Disorders",
  OCD: "Obsessive-Compulsive Disorder",
  BIPOLAR_DEPRESSION: "Bipolar Depression",
  FIBROMYALGIA: "Fibromyalgia",
  CRPS: "Complex Regional Pain Syndrome",
  SUICIDAL_IDEATION: "Acute Suicidal Ideation",
};

// Certification type display labels
const CERTIFICATION_LABELS: Record<string, string> = {
  FOUNDATIONAL: "Foundational Certification",
  ADVANCED: "Advanced Certification",
  KAP_SPECIALTY: "KAP Specialty Certification",
  PRACTICE_LEADERSHIP: "Practice Leadership Certification",
  MASTER_PRACTITIONER: "Master Practitioner Certification",
};

interface PageParams {
  slug: string;
}

// Type definitions for Prisma relations
interface Treatment {
  id: string;
  treatmentType: string;
}

interface Condition {
  id: string;
  condition: string;
}

interface Insurance {
  id: string;
  insuranceName: string;
}

interface Certification {
  id: string;
  certificationType: string;
  issuedAt: Date;
  expiresAt: Date | null;
}

interface ReviewPatient {
  firstName: string | null;
  lastName: string | null;
}

interface Review {
  id: string;
  rating: number;
  title: string | null;
  content: string | null;
  createdAt: Date;
  isVerified: boolean;
  patient: ReviewPatient | null;
}

async function getPractitioner(slug: string) {
  const practitioner = await prisma.practitioner.findUnique({
    where: { slug },
    include: {
      treatments: true,
      conditions: true,
      insurances: true,
      certifications: {
        orderBy: { issuedAt: "desc" },
      },
      reviews: {
        where: { isPublished: true },
        orderBy: { createdAt: "desc" },
        take: 10,
        include: {
          patient: {
            select: { firstName: true, lastName: true },
          },
        },
      },
    },
  });

  return practitioner;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const practitioner = await getPractitioner(slug);

  if (!practitioner) {
    return {
      title: "Provider Not Found | Ketamine Association",
    };
  }

  const fullName = `${practitioner.title ? practitioner.title + " " : ""}${
    practitioner.firstName
  } ${practitioner.lastName}${
    practitioner.credentials ? ", " + practitioner.credentials : ""
  }`;

  return {
    title: `${fullName} | Ketamine Association`,
    description:
      practitioner.bio?.slice(0, 160) ||
      `${fullName} is a verified ketamine therapy provider${
        practitioner.city && practitioner.state
          ? ` in ${practitioner.city}, ${practitioner.state}`
          : ""
      }. View their profile, treatments offered, and patient reviews.`,
  };
}

function StarRating({
  rating,
  size = "md",
}: {
  rating: number;
  size?: "sm" | "md" | "lg";
}) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const sizeClasses = { sm: "w-4 h-4", md: "w-5 h-5", lg: "w-6 h-6" };

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`${sizeClasses[size]} ${
            i < fullStars
              ? "text-amber-400 fill-amber-400"
              : i === fullStars && hasHalfStar
              ? "text-amber-400 fill-amber-400/50"
              : "text-slate-300 fill-slate-300"
          }`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({
  review,
}: {
  review: {
    id: string;
    rating: number;
    title: string | null;
    content: string | null;
    createdAt: Date;
    isVerified: boolean;
    patient: { firstName: string | null; lastName: string | null } | null;
  };
}) {
  const reviewerName = review.patient
    ? `${review.patient.firstName || ""} ${
        review.patient.lastName?.charAt(0) || ""
      }.`.trim()
    : "Anonymous";

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <StarRating rating={review.rating} size="sm" />
            {review.isVerified && (
              <Badge variant="success" size="sm">
                Verified Patient
              </Badge>
            )}
          </div>
          {review.title && (
            <h4 className="font-semibold text-slate-900">{review.title}</h4>
          )}
        </div>
        <span className="text-sm text-slate-500">
          {formatDate(review.createdAt)}
        </span>
      </div>
      {review.content && (
        <p className="text-slate-600 leading-relaxed">{review.content}</p>
      )}
      <p className="text-sm text-slate-500 mt-3">- {reviewerName}</p>
    </Card>
  );
}

export default async function PractitionerProfilePage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { slug } = await params;
  const practitioner = await getPractitioner(slug);

  if (!practitioner) {
    notFound();
  }

  // Increment profile views (fire and forget)
  prisma.practitioner
    .update({
      where: { id: practitioner.id },
      data: { profileViews: { increment: 1 } },
    })
    .catch(() => {});

  const fullName = `${practitioner.title ? practitioner.title + " " : ""}${
    practitioner.firstName
  } ${practitioner.lastName}${
    practitioner.credentials ? ", " + practitioner.credentials : ""
  }`;
  const location =
    practitioner.city && practitioner.state
      ? `${practitioner.city}, ${practitioner.state}`
      : practitioner.city || practitioner.state || "";

  const isFeatured =
    practitioner.membershipTier === "PREMIUM" ||
    practitioner.membershipTier === "ELITE" ||
    practitioner.membershipTier === "ENTERPRISE";

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-700 via-teal-600 to-teal-800 text-white py-12">
        <Container>
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
            {/* Profile Image */}
            <div className="relative flex-shrink-0">
              <Avatar
                src={practitioner.profileImage}
                name={`${practitioner.firstName} ${practitioner.lastName}`}
                size="xl"
                className="w-32 h-32 lg:w-40 lg:h-40 ring-4 ring-white/20 text-2xl"
              />
              {practitioner.isVerified && (
                <div
                  className="absolute -bottom-2 -right-2 bg-emerald-500 rounded-full p-2 shadow-lg"
                  title="Verified Provider"
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              )}
            </div>

            {/* Profile Info */}
            <div className="text-center lg:text-left flex-1">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-2">
                {isFeatured && (
                  <Badge variant="accent" size="md">
                    Featured Provider
                  </Badge>
                )}
                {practitioner.isVerified && (
                  <Badge variant="success" size="md">
                    Verified
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold mb-2">{fullName}</h1>

              {practitioner.practiceName && (
                <p className="text-xl text-teal-100 mb-2">
                  {practitioner.practiceName}
                </p>
              )}

              {location && (
                <div className="flex items-center justify-center lg:justify-start gap-2 text-teal-100 mb-4">
                  <svg
                    className="w-5 h-5"
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
                  <span>{location}</span>
                </div>
              )}

              {/* Rating */}
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <StarRating rating={practitioner.rating} size="lg" />
                <span className="text-teal-100">
                  {practitioner.rating.toFixed(1)} ({practitioner.reviewCount}{" "}
                  review{practitioner.reviewCount !== 1 ? "s" : ""})
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col gap-3">
              {practitioner.phone && (
                <Button
                  href={`tel:${practitioner.phone}`}
                  variant="secondary"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                >
                  <svg
                    className="w-5 h-5 mr-2"
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
                  Call Now
                </Button>
              )}
              {practitioner.website && (
                <Button
                  href={practitioner.website}
                  variant="secondary"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                  Visit Website
                </Button>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <Container>
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About Section */}
              {practitioner.bio && (
                <Card className="p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    About
                  </h2>
                  <div className="prose prose-slate max-w-none">
                    <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                      {practitioner.bio}
                    </p>
                  </div>
                </Card>
              )}

              {/* Treatments Offered */}
              {practitioner.treatments.length > 0 && (
                <Card className="p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    Treatments Offered
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {practitioner.treatments.map((treatment: Treatment) => (
                      <div
                        key={treatment.id}
                        className="flex items-center gap-3 p-3 bg-teal-50 rounded-lg"
                      >
                        <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-5 h-5 text-teal-600"
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
                        </div>
                        <span className="font-medium text-slate-900">
                          {TREATMENT_LABELS[treatment.treatmentType] ||
                            treatment.treatmentType}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Conditions Treated */}
              {practitioner.conditions.length > 0 && (
                <Card className="p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    Conditions Treated
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {practitioner.conditions.map((condition: Condition) => (
                      <Badge key={condition.id} variant="primary" size="lg">
                        {CONDITION_LABELS[condition.condition] ||
                          condition.condition}
                      </Badge>
                    ))}
                  </div>
                </Card>
              )}

              {/* Insurance Accepted */}
              {practitioner.insurances.length > 0 && (
                <Card className="p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    Insurance Accepted
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {practitioner.insurances.map((insurance: Insurance) => (
                      <Badge key={insurance.id} variant="outline" size="lg">
                        {insurance.insuranceName}
                      </Badge>
                    ))}
                  </div>
                </Card>
              )}

              {/* Certifications */}
              {practitioner.certifications.length > 0 && (
                <Card className="p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    Certifications
                  </h2>
                  <div className="space-y-4">
                    {practitioner.certifications.map((cert: Certification) => (
                      <div
                        key={cert.id}
                        className="flex items-start gap-4 p-4 bg-amber-50 rounded-lg border border-amber-100"
                      >
                        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-6 h-6 text-amber-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900">
                            {CERTIFICATION_LABELS[cert.certificationType] ||
                              cert.certificationType}
                          </h4>
                          <p className="text-sm text-slate-600">
                            Issued: {formatDate(cert.issuedAt)}
                            {cert.expiresAt &&
                              ` | Expires: ${formatDate(cert.expiresAt)}`}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Reviews Section */}
              {practitioner.reviews.length > 0 && (
                <Card className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-slate-900">
                      Patient Reviews
                    </h2>
                    <div className="flex items-center gap-2">
                      <StarRating rating={practitioner.rating} size="md" />
                      <span className="text-slate-600">
                        {practitioner.rating.toFixed(1)} (
                        {practitioner.reviewCount} reviews)
                      </span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {practitioner.reviews.map((review: Review) => (
                      <ReviewCard key={review.id} review={review} />
                    ))}
                  </div>
                </Card>
              )}
            </div>

            {/* Right Column - Contact & Location */}
            <div className="lg:col-span-1 mt-8 lg:mt-0 space-y-6">
              {/* Contact Form */}
              <Card className="p-6 sticky top-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  Contact This Provider
                </h3>
                <Suspense fallback={<div className="animate-pulse h-64 bg-slate-100 rounded-lg" />}>
                  <ContactForm practitionerId={practitioner.id} />
                </Suspense>
              </Card>

              {/* Location Card */}
              {(practitioner.address || location) && (
                <Card className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    Location
                  </h3>
                  <div className="space-y-3">
                    {practitioner.address && (
                      <p className="text-slate-600">{practitioner.address}</p>
                    )}
                    {location && (
                      <p className="text-slate-600">
                        {location}
                        {practitioner.zipCode && ` ${practitioner.zipCode}`}
                      </p>
                    )}

                    {/* Map Placeholder */}
                    <div className="aspect-video bg-slate-100 rounded-lg flex items-center justify-center border border-slate-200 mt-4">
                      <div className="text-center text-slate-400">
                        <svg
                          className="w-12 h-12 mx-auto mb-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <p className="text-sm">Map coming soon</p>
                      </div>
                    </div>

                    {/* Get Directions Button */}
                    {practitioner.address && (
                      <Button
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          `${practitioner.address}, ${location} ${practitioner.zipCode || ""}`
                        )}`}
                        variant="secondary"
                        fullWidth
                        className="mt-4"
                      >
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                          />
                        </svg>
                        Get Directions
                      </Button>
                    )}
                  </div>
                </Card>
              )}

              {/* Professional Info */}
              <Card className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  Professional Information
                </h3>
                <dl className="space-y-3">
                  {practitioner.specialty && (
                    <div>
                      <dt className="text-sm font-medium text-slate-500">
                        Specialty
                      </dt>
                      <dd className="text-slate-900">
                        {practitioner.specialty}
                      </dd>
                    </div>
                  )}
                  {practitioner.licenseNumber && (
                    <div>
                      <dt className="text-sm font-medium text-slate-500">
                        License Number
                      </dt>
                      <dd className="text-slate-900">
                        {practitioner.licenseNumber}
                        {practitioner.licenseState &&
                          ` (${practitioner.licenseState})`}
                      </dd>
                    </div>
                  )}
                  {practitioner.npiNumber && (
                    <div>
                      <dt className="text-sm font-medium text-slate-500">
                        NPI Number
                      </dt>
                      <dd className="text-slate-900">
                        {practitioner.npiNumber}
                      </dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-sm font-medium text-slate-500">
                      Member Since
                    </dt>
                    <dd className="text-slate-900">
                      {formatDate(practitioner.createdAt)}
                    </dd>
                  </div>
                </dl>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* Back to Directory */}
      <section className="py-8 border-t border-slate-200 bg-white">
        <Container>
          <div className="text-center">
            <Link
              href="/association/directory"
              className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Provider Directory
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
