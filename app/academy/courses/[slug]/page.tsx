import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import {
  Clock,
  BookOpen,
  Award,
  Users,
  PlayCircle,
  CheckCircle,
  ChevronDown,
  Star,
  Shield,
} from "lucide-react";

interface CoursePageProps {
  params: Promise<{
    slug: string;
  }>;
}

interface CourseModule {
  id: string;
  title: string;
  description: string | null;
  duration: number | null;
  order: number;
  videoUrl: string | null;
}

async function getCourse(slug: string) {
  const course = await prisma.course.findUnique({
    where: { slug, isPublished: true },
    include: {
      modules: {
        orderBy: { order: "asc" },
      },
      enrollments: {
        select: { id: true },
      },
    },
  });

  return course;
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourse(slug);

  if (!course) {
    return {
      title: "Course Not Found | KTA Academy",
    };
  }

  return {
    title: `${course.title} | KTA Academy`,
    description: course.description || `Learn ${course.title} with the Ketamine Therapy Association`,
  };
}

function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) return `${hours} hour${hours > 1 ? "s" : ""}`;
  return `${hours} hr ${remainingMinutes} min`;
}

function formatPrice(amount: number): string {
  if (amount === 0) return "Free";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

// Sample data - in production, these would come from the database
const courseDetails = {
  instructor: {
    name: "Dr. Sarah Mitchell, MD, PhD",
    title: "Director of Clinical Education",
    bio: "Dr. Mitchell is a board-certified psychiatrist with over 15 years of experience in ketamine-assisted therapy. She has trained over 500 practitioners worldwide.",
    image: "/instructors/mitchell.jpg",
  },
  learningOutcomes: [
    "Understand the pharmacology and mechanisms of ketamine",
    "Master patient screening and safety protocols",
    "Learn proper dosing guidelines for different treatment modalities",
    "Develop skills for patient monitoring and emergency management",
    "Implement integration techniques for lasting therapeutic outcomes",
    "Navigate legal and regulatory considerations",
  ],
  requirements: [
    "Valid medical license (MD, DO, NP, PA)",
    "Basic understanding of psychiatric conditions",
    "Access to a computer with reliable internet",
  ],
  testimonials: [
    {
      name: "Dr. Amanda Foster",
      role: "Psychiatrist, Portland OR",
      rating: 5,
      comment:
        "This course transformed my practice. The depth of training and ongoing support is unmatched in the field.",
    },
    {
      name: "Dr. Robert Kim",
      role: "Anesthesiologist, Seattle WA",
      rating: 5,
      comment:
        "The CE credits are accepted everywhere, and the course quality exceeds any other continuing education I have completed.",
    },
    {
      name: "Dr. Jennifer Lee",
      role: "Psychiatric NP, Austin TX",
      rating: 5,
      comment:
        "Comprehensive, practical, and evidence-based. Exactly what I needed to confidently offer ketamine therapy.",
    },
  ],
};

export default async function CourseDetailPage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = await getCourse(slug);

  if (!course) {
    notFound();
  }

  const totalDuration = course.modules.reduce((acc: number, m: { duration: number | null }) => acc + (m.duration || 0), 0);
  const enrollmentCount = course.enrollments.length;
  const hasDiscount = course.memberPrice !== null && course.memberPrice < course.price;

  // TODO: Check if current user is enrolled
  const isEnrolled = false;
  const progress = 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-700 via-teal-600 to-emerald-600">
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10" />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-teal-200">
              <li>
                <Link href="/academy" className="hover:text-white transition-colors">
                  Academy
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/academy/courses" className="hover:text-white transition-colors">
                  Courses
                </Link>
              </li>
              <li>/</li>
              <li className="text-white font-medium truncate max-w-[200px]">{course.title}</li>
            </ol>
          </nav>

          <div className="lg:grid lg:grid-cols-3 lg:gap-12">
            <div className="lg:col-span-2">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge variant="default" className="bg-white/20 text-white backdrop-blur-sm">
                  Practitioner
                </Badge>
                <Badge variant="default" className="bg-white/20 text-white backdrop-blur-sm">
                  Intermediate
                </Badge>
                {course.ceCredits && (
                  <Badge variant="accent" icon={Award}>
                    {course.ceCredits} CE Credits
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {course.title}
              </h1>

              {course.description && (
                <p className="mt-4 text-lg text-teal-100">{course.description}</p>
              )}

              <div className="mt-6 flex flex-wrap items-center gap-6 text-teal-100">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{formatDuration(totalDuration)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  <span>{course.modules.length} modules</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span>{enrollmentCount.toLocaleString()} enrolled</span>
                </div>
              </div>

              {/* Instructor */}
              <div className="mt-8 flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-teal-300 to-teal-500 flex items-center justify-center">
                  <span className="text-xl font-bold text-white">SM</span>
                </div>
                <div>
                  <p className="font-semibold text-white">{courseDetails.instructor.name}</p>
                  <p className="text-sm text-teal-200">{courseDetails.instructor.title}</p>
                </div>
              </div>
            </div>

            {/* Enrollment Card - Desktop */}
            <div className="hidden lg:block">
              <Card className="sticky top-24 shadow-2xl">
                <div className="aspect-video bg-gradient-to-br from-teal-400 to-teal-600 rounded-t-lg flex items-center justify-center -m-6 mb-6">
                  <PlayCircle className="h-16 w-16 text-white opacity-80" />
                </div>
                <div className="space-y-4">
                  <div>
                    {hasDiscount ? (
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-slate-900">
                          {formatPrice(course.memberPrice!)}
                        </span>
                        <span className="text-lg text-slate-500 line-through">
                          {formatPrice(course.price)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-3xl font-bold text-slate-900">
                        {formatPrice(course.price)}
                      </span>
                    )}
                    {hasDiscount && (
                      <Badge variant="success" size="sm" className="mt-2">
                        Member Discount Applied
                      </Badge>
                    )}
                  </div>

                  {isEnrolled ? (
                    <>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Your Progress</span>
                          <span className="font-medium text-teal-600">{progress}%</span>
                        </div>
                        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-teal-500 transition-all"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                      <Button
                        href={`/academy/courses/${slug}/learn`}
                        variant="primary"
                        size="lg"
                        fullWidth
                      >
                        Continue Learning
                      </Button>
                    </>
                  ) : (
                    <Button
                      href={`/academy/courses/${slug}/learn`}
                      variant="primary"
                      size="lg"
                      fullWidth
                    >
                      Enroll Now
                    </Button>
                  )}

                  <div className="pt-4 border-t border-slate-200 space-y-3">
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <CheckCircle className="h-5 w-5 text-teal-500 flex-shrink-0" />
                      <span>Full lifetime access</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <CheckCircle className="h-5 w-5 text-teal-500 flex-shrink-0" />
                      <span>Certificate of completion</span>
                    </div>
                    {course.ceCredits && (
                      <div className="flex items-center gap-3 text-sm text-slate-600">
                        <Award className="h-5 w-5 text-teal-500 flex-shrink-0" />
                        <span>{course.ceCredits} CE credits upon completion</span>
                      </div>
                    )}
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <Shield className="h-5 w-5 text-teal-500 flex-shrink-0" />
                      <span>30-day money-back guarantee</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Enrollment Bar */}
      <div className="lg:hidden sticky top-0 z-10 bg-white border-b border-slate-200 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 flex items-center justify-between">
          <div>
            {hasDiscount ? (
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-slate-900">
                  {formatPrice(course.memberPrice!)}
                </span>
                <span className="text-sm text-slate-500 line-through">
                  {formatPrice(course.price)}
                </span>
              </div>
            ) : (
              <span className="text-xl font-bold text-slate-900">
                {formatPrice(course.price)}
              </span>
            )}
          </div>
          <Button
            href={isEnrolled ? `/academy/courses/${slug}/learn` : `/academy/courses/${slug}/learn`}
            variant="primary"
            size="md"
          >
            {isEnrolled ? "Continue" : "Enroll Now"}
          </Button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-12">
          <div className="lg:col-span-2 space-y-12">
            {/* What You'll Learn */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">What You will Learn</h2>
              <Card padding="lg" className="bg-teal-50 border border-teal-100">
                <div className="grid sm:grid-cols-2 gap-4">
                  {courseDetails.learningOutcomes.map((outcome, index) => (
                    <div key={index} className="flex gap-3">
                      <CheckCircle className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{outcome}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </section>

            {/* Course Curriculum */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Course Curriculum</h2>
                <p className="text-sm text-slate-500">
                  {course.modules.length} modules - {formatDuration(totalDuration)}
                </p>
              </div>
              <div className="space-y-3">
                {course.modules.map((module: CourseModule, index: number) => (
                  <details
                    key={module.id}
                    className="group bg-white border border-slate-200 rounded-lg overflow-hidden"
                  >
                    <summary className="flex items-center justify-between cursor-pointer p-4 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-semibold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900">{module.title}</h3>
                          {module.duration && (
                            <p className="text-sm text-slate-500 mt-0.5">
                              {formatDuration(module.duration)}
                            </p>
                          )}
                        </div>
                      </div>
                      <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
                    </summary>
                    <div className="px-4 pb-4 pt-0">
                      <div className="ml-12 pt-3 border-t border-slate-100">
                        {module.description ? (
                          <p className="text-slate-600">{module.description}</p>
                        ) : (
                          <p className="text-slate-500 italic">
                            Module content will be revealed upon enrollment.
                          </p>
                        )}
                        {module.videoUrl && (
                          <div className="mt-3 flex items-center gap-2 text-sm text-teal-600">
                            <PlayCircle className="h-4 w-4" />
                            <span>Video lesson included</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            </section>

            {/* Instructor */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Your Instructor</h2>
              <Card padding="lg" className="flex flex-col sm:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="h-24 w-24 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                    <span className="text-3xl font-bold text-white">SM</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {courseDetails.instructor.name}
                  </h3>
                  <p className="text-teal-600 font-medium">{courseDetails.instructor.title}</p>
                  <p className="mt-3 text-slate-600">{courseDetails.instructor.bio}</p>
                </div>
              </Card>
            </section>

            {/* Requirements */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Requirements</h2>
              <ul className="space-y-3">
                {courseDetails.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-medium text-slate-600">{index + 1}</span>
                    </div>
                    <span className="text-slate-700">{req}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Reviews */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Student Reviews</h2>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="h-5 w-5 text-amber-400 fill-current"
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-slate-900">5.0</span>
                  <span className="text-slate-500">({courseDetails.testimonials.length} reviews)</span>
                </div>
              </div>
              <div className="space-y-4">
                {courseDetails.testimonials.map((testimonial, index) => (
                  <Card key={index} padding="lg">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-lg font-bold text-white">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-slate-900">{testimonial.name}</p>
                            <p className="text-sm text-slate-500">{testimonial.role}</p>
                          </div>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= testimonial.rating
                                    ? "text-amber-400 fill-current"
                                    : "text-slate-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="mt-3 text-slate-600">{testimonial.comment}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* CE Credits Info */}
            {course.ceCredits && (
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">CE Credit Information</h2>
                <Card padding="lg" className="bg-gradient-to-r from-slate-900 to-slate-800">
                  <div className="flex items-start gap-6">
                    <div className="p-3 bg-teal-500/20 rounded-lg">
                      <Award className="h-8 w-8 text-teal-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {course.ceCredits} Continuing Education Credits
                      </h3>
                      {course.ceProvider && (
                        <p className="mt-1 text-slate-300">Accredited by {course.ceProvider}</p>
                      )}
                      <p className="mt-3 text-slate-400">
                        Upon successful completion of this course and all assessments, you will
                        receive a certificate with {course.ceCredits} CE credits that are accepted
                        by major medical boards and professional organizations.
                      </p>
                      <Link
                        href="/academy/practitioners/ce-credits"
                        className="mt-4 inline-flex items-center text-teal-400 hover:text-teal-300 font-medium"
                      >
                        Learn more about our CE accreditation
                        <svg
                          className="ml-2 h-4 w-4"
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
                </Card>
              </section>
            )}
          </div>

          {/* Sidebar - Empty space for desktop enrollment card positioning */}
          <div className="hidden lg:block" />
        </div>
      </div>

      {/* Bottom CTA */}
      <section className="bg-teal-700 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Ready to advance your practice?
              </h2>
              <p className="mt-2 text-teal-100">
                Join {enrollmentCount.toLocaleString()} practitioners who have taken this course.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                href={`/academy/courses/${slug}/learn`}
                variant="secondary"
                size="lg"
                className="bg-white text-teal-700 hover:bg-teal-50"
              >
                {isEnrolled ? "Continue Learning" : "Enroll Now"}
              </Button>
              <Button
                href="/academy/courses"
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10"
              >
                Browse All Courses
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
