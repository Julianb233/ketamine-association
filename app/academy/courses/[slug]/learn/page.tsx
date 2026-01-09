"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Circle,
  PlayCircle,
  BookOpen,
  Award,
  Menu,
  X,
  Lock,
  Clock,
} from "lucide-react";

interface Module {
  id: string;
  title: string;
  description: string | null;
  content: string | null;
  videoUrl: string | null;
  duration: number | null;
  order: number;
  isCompleted?: boolean;
}

interface Course {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  ceCredits: number | null;
  modules: Module[];
}

interface Enrollment {
  id: string;
  progress: number;
  completedModules: string[];
}

interface LearnPageProps {
  params: Promise<{
    slug: string;
  }>;
}

function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) return `${hours} hr`;
  return `${hours}h ${remainingMinutes}m`;
}

export default function LearnPage({ params }: LearnPageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMarkingComplete, setIsMarkingComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCourse() {
      try {
        const response = await fetch(`/api/courses/${resolvedParams.slug}`);
        const data = await response.json();

        if (!response.ok) {
          if (response.status === 401) {
            // Not enrolled or not authenticated
            router.push(`/academy/courses/${resolvedParams.slug}?enroll=true`);
            return;
          }
          throw new Error(data.error || "Failed to load course");
        }

        setCourse(data.course);
        setEnrollment(data.enrollment);

        // Find the first incomplete module to start from
        if (data.enrollment?.completedModules) {
          const firstIncomplete = data.course.modules.findIndex(
            (m: Module) => !data.enrollment.completedModules.includes(m.id)
          );
          if (firstIncomplete !== -1) {
            setCurrentModuleIndex(firstIncomplete);
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }

    loadCourse();
  }, [resolvedParams.slug, router]);

  const currentModule = course?.modules[currentModuleIndex];
  const isModuleCompleted = enrollment?.completedModules?.includes(currentModule?.id || "");
  const progress = enrollment?.progress || 0;

  const handleMarkComplete = async () => {
    if (!currentModule || isModuleCompleted) return;

    setIsMarkingComplete(true);
    try {
      const response = await fetch(`/api/courses/${resolvedParams.slug}/progress`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ moduleId: currentModule.id }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update progress");
      }

      setEnrollment(data.enrollment);

      // Auto-advance to next module if not the last one
      if (currentModuleIndex < (course?.modules.length || 0) - 1) {
        setTimeout(() => {
          setCurrentModuleIndex(currentModuleIndex + 1);
        }, 500);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update progress");
    } finally {
      setIsMarkingComplete(false);
    }
  };

  const goToModule = (index: number) => {
    setCurrentModuleIndex(index);
    setIsSidebarOpen(false);
  };

  const goToPrevious = () => {
    if (currentModuleIndex > 0) {
      setCurrentModuleIndex(currentModuleIndex - 1);
    }
  };

  const goToNext = () => {
    if (course && currentModuleIndex < course.modules.length - 1) {
      setCurrentModuleIndex(currentModuleIndex + 1);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto" />
          <p className="mt-4 text-slate-600">Loading course...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-red-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
            <X className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-xl font-bold text-slate-900 mb-2">Unable to Load Course</h1>
          <p className="text-slate-600 mb-6">{error}</p>
          <Button href={`/academy/courses/${resolvedParams.slug}`} variant="primary">
            Go to Course Page
          </Button>
        </div>
      </div>
    );
  }

  if (!course || !currentModule) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 -ml-2 text-slate-600 hover:text-slate-900"
            >
              <Menu className="h-6 w-6" />
            </button>
            <Link
              href={`/academy/courses/${resolvedParams.slug}`}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="hidden sm:inline font-medium">Back to Course</span>
            </Link>
          </div>

          <div className="flex-1 max-w-md mx-4 hidden sm:block">
            <h1 className="font-semibold text-slate-900 truncate text-center">{course.title}</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-teal-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-sm font-medium text-slate-600">{Math.round(progress)}%</span>
            </div>
            {course.ceCredits && (
              <Badge variant="accent" size="sm" icon={Award} className="hidden md:flex">
                {course.ceCredits} CE Credits
              </Badge>
            )}
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-30 w-80 bg-white border-r border-slate-200 transform transition-transform duration-300 lg:relative lg:translate-x-0 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          style={{ top: "65px" }}
        >
          {/* Mobile close button */}
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden absolute top-4 right-4 p-2 text-slate-600 hover:text-slate-900"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="h-full overflow-y-auto pb-20">
            <div className="p-4 border-b border-slate-200">
              <h2 className="font-bold text-slate-900">Course Content</h2>
              <p className="text-sm text-slate-500 mt-1">
                {enrollment?.completedModules?.length || 0} of {course.modules.length} completed
              </p>
            </div>

            <nav className="p-2">
              {course.modules.map((module, index) => {
                const isCompleted = enrollment?.completedModules?.includes(module.id);
                const isCurrent = index === currentModuleIndex;

                return (
                  <button
                    key={module.id}
                    onClick={() => goToModule(index)}
                    className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition-colors ${
                      isCurrent
                        ? "bg-teal-50 border border-teal-200"
                        : "hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      {isCompleted ? (
                        <CheckCircle className="h-5 w-5 text-teal-600" />
                      ) : isCurrent ? (
                        <PlayCircle className="h-5 w-5 text-teal-600" />
                      ) : (
                        <Circle className="h-5 w-5 text-slate-300" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`font-medium truncate ${
                          isCurrent ? "text-teal-700" : "text-slate-900"
                        }`}
                      >
                        {index + 1}. {module.title}
                      </p>
                      {module.duration && (
                        <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                          <Clock className="h-3.5 w-3.5" />
                          {formatDuration(module.duration)}
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Sidebar overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-4 py-8 lg:px-8">
            {/* Module Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="primary" size="sm">
                  Module {currentModuleIndex + 1} of {course.modules.length}
                </Badge>
                {isModuleCompleted && (
                  <Badge variant="success" size="sm" icon={CheckCircle}>
                    Completed
                  </Badge>
                )}
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
                {currentModule.title}
              </h1>
              {currentModule.duration && (
                <p className="mt-2 text-slate-500 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {formatDuration(currentModule.duration)}
                </p>
              )}
            </div>

            {/* Video Player Placeholder */}
            {currentModule.videoUrl && (
              <div className="mb-8 aspect-video bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center">
                <div className="text-center">
                  <PlayCircle className="h-16 w-16 text-white/60 mx-auto mb-4" />
                  <p className="text-white/80 font-medium">Video Player</p>
                  <p className="text-white/50 text-sm mt-1">
                    Video content would load here
                  </p>
                </div>
              </div>
            )}

            {/* Module Content */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 lg:p-8">
              {currentModule.description && (
                <div className="mb-6 pb-6 border-b border-slate-200">
                  <h2 className="text-lg font-semibold text-slate-900 mb-2">Overview</h2>
                  <p className="text-slate-600">{currentModule.description}</p>
                </div>
              )}

              {currentModule.content ? (
                <div className="prose prose-slate max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: currentModule.content }} />
                </div>
              ) : (
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-600">
                    This module contains video content. Watch the video above to complete this
                    lesson.
                  </p>
                </div>
              )}
            </div>

            {/* Mark Complete Button */}
            {!isModuleCompleted && (
              <div className="mt-8 text-center">
                <Button
                  onClick={handleMarkComplete}
                  isLoading={isMarkingComplete}
                  variant="primary"
                  size="lg"
                  icon={CheckCircle}
                >
                  Mark as Complete
                </Button>
              </div>
            )}

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-between pt-8 border-t border-slate-200">
              <Button
                onClick={goToPrevious}
                variant="outline"
                disabled={currentModuleIndex === 0}
                icon={ChevronLeft}
              >
                Previous
              </Button>

              {currentModuleIndex === course.modules.length - 1 ? (
                <Button
                  href={`/academy/courses/${resolvedParams.slug}`}
                  variant="primary"
                  iconRight={Award}
                  disabled={progress < 100}
                >
                  {progress >= 100 ? "Get Certificate" : "Complete All Modules"}
                </Button>
              ) : (
                <Button
                  onClick={goToNext}
                  variant="primary"
                  iconRight={ChevronRight}
                >
                  Next Module
                </Button>
              )}
            </div>

            {/* Course Completion Message */}
            {progress >= 100 && (
              <div className="mt-8 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl p-6 text-center text-white">
                <Award className="h-12 w-12 mx-auto mb-4" />
                <h2 className="text-xl font-bold mb-2">Congratulations!</h2>
                <p className="text-teal-100 mb-4">
                  You have completed this course. Your certificate is ready for download.
                </p>
                <Button
                  href={`/academy/courses/${resolvedParams.slug}/certificate`}
                  variant="secondary"
                  className="bg-white text-teal-700 hover:bg-teal-50"
                >
                  Download Certificate
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
