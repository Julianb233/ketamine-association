import Link from "next/link";
export const dynamic = 'force-dynamic';
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { CourseCard, CourseCardData } from "@/components/academy/CourseCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { BookOpen, Award, Users, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Courses | KTA Academy",
  description:
    "Explore our comprehensive ketamine therapy courses for practitioners and patients. Earn CE credits with accredited continuing education programs.",
};

interface CoursesPageProps {
  searchParams: Promise<{
    category?: string;
    level?: string;
  }>;
}

interface CourseWithRelations {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  price: number;
  memberPrice: number | null;
  ceCredits: number | null;
  ceProvider: string | null;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
  modules: { id: string; duration: number | null }[];
  enrollments: { id: string }[];
}

async function getCourses(category?: string, level?: string) {
  const courses = await prisma.course.findMany({
    where: {
      isPublished: true,
    },
    include: {
      modules: {
        select: {
          id: true,
          duration: true,
        },
        orderBy: { order: "asc" },
      },
      enrollments: {
        select: { id: true },
      },
    },
    orderBy: { createdAt: "desc" },
  }) as CourseWithRelations[];

  return courses.map((course: CourseWithRelations) => ({
    id: course.id,
    slug: course.slug,
    title: course.title,
    description: course.description,
    price: Math.round(course.price * 100), // Convert to cents for consistency
    memberPrice: course.memberPrice ? Math.round(course.memberPrice * 100) : null,
    ceCredits: course.ceCredits,
    ceProvider: course.ceProvider,
    moduleCount: course.modules.length,
    duration: course.modules.reduce((acc: number, m: { duration: number | null }) => acc + (m.duration || 0), 0),
    enrollmentCount: course.enrollments.length,
    // These could be added to the schema later
    category: "practitioner" as const,
    level: "Intermediate" as const,
    instructor: "KTA Faculty",
  }));
}

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
  const params = await searchParams;
  const category = params.category;
  const level = params.level;
  const courses = await getCourses(category, level);

  const categories = [
    { value: "", label: "All Courses" },
    { value: "practitioner", label: "For Practitioners" },
    { value: "patient", label: "For Patients" },
  ];

  const levels = [
    { value: "", label: "All Levels" },
    { value: "Foundational", label: "Foundational" },
    { value: "Intermediate", label: "Intermediate" },
    { value: "Advanced", label: "Advanced" },
    { value: "Master", label: "Master" },
  ];

  // Filter courses based on params
  const filteredCourses = courses.filter((course) => {
    if (category && course.category !== category) return false;
    if (level && course.level !== level) return false;
    return true;
  });

  // Stats
  const totalCourses = courses.length;
  const totalCECredits = courses.reduce((acc: number, c: CourseCardData) => acc + (c.ceCredits || 0), 0);
  const totalEnrollments = courses.reduce((acc: number, c: CourseCardData) => acc + (c.enrollmentCount || 0), 0);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-700 via-teal-600 to-emerald-600">
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-teal-200">
              <li>
                <Link href="/academy" className="hover:text-white transition-colors">
                  Academy
                </Link>
              </li>
              <li>/</li>
              <li className="text-white font-medium">Courses</li>
            </ol>
          </nav>
          <div className="lg:flex lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Course Catalog
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-teal-100">
                Comprehensive training programs for healthcare practitioners and educational
                resources for patients. Advance your knowledge with accredited CE courses.
              </p>
            </div>
            <div className="mt-8 lg:mt-0 flex gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center min-w-[100px]">
                <div className="text-3xl font-bold text-white">{totalCourses}</div>
                <div className="text-sm text-teal-200">Courses</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center min-w-[100px]">
                <div className="text-3xl font-bold text-white">{totalCECredits}+</div>
                <div className="text-sm text-teal-200">CE Credits</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center min-w-[100px]">
                <div className="text-3xl font-bold text-white">{totalEnrollments.toLocaleString()}</div>
                <div className="text-sm text-teal-200">Enrolled</div>
              </div>
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

      {/* Filters */}
      <section className="border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-slate-700">Category:</span>
              {categories.map((cat) => (
                <Link
                  key={cat.value}
                  href={`/academy/courses${cat.value ? `?category=${cat.value}` : ""}${level ? `${cat.value ? "&" : "?"}level=${level}` : ""}`}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    category === cat.value || (!category && !cat.value)
                      ? "bg-teal-100 text-teal-800"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-slate-700">Level:</span>
              {levels.map((lvl) => (
                <Link
                  key={lvl.value}
                  href={`/academy/courses${category ? `?category=${category}` : ""}${lvl.value ? `${category ? "&" : "?"}level=${lvl.value}` : ""}`}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    level === lvl.value || (!level && !lvl.value)
                      ? "bg-teal-100 text-teal-800"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {lvl.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Course Grid */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filteredCourses.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="mx-auto h-12 w-12 text-slate-400" />
              <h3 className="mt-4 text-lg font-semibold text-slate-900">No courses found</h3>
              <p className="mt-2 text-slate-600">
                Try adjusting your filters or check back later for new courses.
              </p>
              <Button href="/academy/courses" variant="primary" className="mt-6">
                View All Courses
              </Button>
            </div>
          ) : (
            <>
              {/* Featured Course */}
              {filteredCourses.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-xl font-bold text-slate-900 mb-6">Featured Course</h2>
                  <CourseCard course={filteredCourses[0]} variant="featured" />
                </div>
              )}

              {/* Course Grid */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-slate-900">
                    {filteredCourses.length > 1 ? "All Courses" : ""}
                  </h2>
                  <p className="text-sm text-slate-500">
                    {filteredCourses.length} course{filteredCourses.length !== 1 ? "s" : ""} available
                  </p>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredCourses.slice(1).map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Member Benefits */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-teal-600 to-teal-700 lg:grid lg:grid-cols-2 lg:gap-4">
            <div className="px-8 py-12 sm:px-12 lg:py-16">
              <div className="lg:max-w-lg">
                <Badge variant="default" className="bg-teal-500/30 text-white mb-4">
                  Member Benefits
                </Badge>
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Save on Every Course
                </h2>
                <p className="mt-4 text-lg text-teal-100">
                  KTA members enjoy exclusive discounts on all courses and CE programs.
                  Plus, get priority access to new courses and early-bird pricing.
                </p>
                <ul className="mt-8 space-y-4">
                  {[
                    "Up to 30% off all courses",
                    "Free foundational courses",
                    "Priority enrollment for popular courses",
                    "Exclusive member-only workshops",
                  ].map((benefit, index) => (
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
                      {benefit}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Button
                    href="/membership"
                    variant="secondary"
                    className="bg-white text-teal-700 hover:bg-teal-50"
                  >
                    Become a Member
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex items-center justify-center p-8">
              <div className="relative">
                <div className="absolute inset-0 bg-white/5 rounded-2xl blur-3xl" />
                <div className="relative grid grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                    <Award className="h-10 w-10 text-white mx-auto mb-3" />
                    <div className="text-2xl font-bold text-white">500+</div>
                    <div className="text-sm text-teal-200">CE Credits</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                    <Users className="h-10 w-10 text-white mx-auto mb-3" />
                    <div className="text-2xl font-bold text-white">5,000+</div>
                    <div className="text-sm text-teal-200">Practitioners</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center col-span-2">
                    <BookOpen className="h-10 w-10 text-white mx-auto mb-3" />
                    <div className="text-2xl font-bold text-white">50+ Courses</div>
                    <div className="text-sm text-teal-200">And growing</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Need Help Choosing a Course?
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Our education advisors can help you find the right learning path based on your
            experience and goals.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/contact" variant="primary" size="lg">
              Talk to an Advisor
            </Button>
            <Button href="/academy/practitioners/certification" variant="outline" size="lg">
              View Certification Paths
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
