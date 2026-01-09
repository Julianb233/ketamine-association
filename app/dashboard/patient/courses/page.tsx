'use client';

import Link from 'next/link';

// Placeholder data
const enrolledCourses = [
  {
    id: '1',
    title: 'Understanding Ketamine Therapy',
    description: 'A comprehensive introduction to ketamine-assisted therapy and what to expect.',
    progress: 65,
    totalModules: 8,
    completedModules: 5,
    lastAccessed: '2024-01-22',
    thumbnail: null,
    duration: '2 hours',
    instructor: 'Dr. Amanda Foster',
  },
  {
    id: '2',
    title: 'Preparing for Your First Treatment',
    description: 'Essential steps to prepare mentally and physically for ketamine therapy.',
    progress: 30,
    totalModules: 5,
    completedModules: 1,
    lastAccessed: '2024-01-20',
    thumbnail: null,
    duration: '1.5 hours',
    instructor: 'Dr. James Lee',
  },
  {
    id: '3',
    title: 'Integration Practices',
    description: 'Learn how to integrate insights from ketamine sessions into daily life.',
    progress: 10,
    totalModules: 6,
    completedModules: 0,
    lastAccessed: '2024-01-15',
    thumbnail: null,
    duration: '2.5 hours',
    instructor: 'Dr. Sarah Mitchell',
  },
];

const completedCourses = [
  {
    id: '4',
    title: 'Mental Health Basics',
    description: 'Foundational knowledge about mental health conditions and treatment approaches.',
    completedDate: '2024-01-10',
    thumbnail: null,
    duration: '1 hour',
    instructor: 'Dr. Robert Chen',
    certificateAvailable: true,
  },
];

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
  );
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
}

function BookOpenIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
    </svg>
  );
}

function AcademicCapIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
    </svg>
  );
}

export default function CoursesPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>
          <p className="mt-1 text-gray-600">
            Continue learning about ketamine therapy
          </p>
        </div>
        <Link
          href="/courses"
          className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Browse All Courses
        </Link>
      </div>

      {/* In Progress Courses */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          In Progress ({enrolledCourses.length})
        </h2>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {enrolledCourses.map((course) => (
            <div
              key={course.id}
              className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Course thumbnail placeholder */}
              <div className="relative h-36 bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center">
                <BookOpenIcon className="h-16 w-16 text-white/30" />
                <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-xs text-white">
                  <ClockIcon className="h-3.5 w-3.5" />
                  {course.duration}
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-semibold text-gray-900">{course.title}</h3>
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                  {course.description}
                </p>

                <div className="mt-3 text-xs text-gray-500">
                  Instructor: {course.instructor}
                </div>

                {/* Progress bar */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      {course.completedModules} of {course.totalModules} modules
                    </span>
                    <span className="font-medium text-teal-600">{course.progress}%</span>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-teal-500 transition-all"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    Last accessed {new Date(course.lastAccessed).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                  <Link
                    href={`/courses/${course.id}`}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700 transition-colors"
                  >
                    <PlayIcon className="h-4 w-4" />
                    Continue
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Completed Courses */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Completed ({completedCourses.length})
        </h2>
        {completedCourses.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
            <AcademicCapIcon className="mx-auto h-12 w-12 text-gray-300" />
            <p className="mt-3 text-gray-500">No completed courses yet</p>
            <p className="mt-1 text-sm text-gray-400">
              Keep learning to earn certificates
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {completedCourses.map((course) => (
              <div
                key={course.id}
                className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm"
              >
                {/* Course thumbnail placeholder */}
                <div className="relative h-28 bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center">
                  <CheckIcon className="h-12 w-12 text-white" />
                  <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-xs font-medium text-green-700">
                    <CheckIcon className="h-3.5 w-3.5" />
                    Completed
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-semibold text-gray-900">{course.title}</h3>
                  <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                    {course.description}
                  </p>

                  <div className="mt-3 text-xs text-gray-500">
                    Instructor: {course.instructor}
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      Completed on{' '}
                      {new Date(course.completedDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    {course.certificateAvailable && (
                      <button
                        type="button"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <DownloadIcon className="h-4 w-4" />
                        Certificate
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recommended Section */}
      <div className="rounded-xl border border-teal-200 bg-teal-50 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="font-semibold text-teal-900">Ready to learn more?</h3>
            <p className="mt-1 text-sm text-teal-700">
              Explore our full course catalog to deepen your understanding of ketamine therapy.
            </p>
          </div>
          <Link
            href="/courses"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-teal-700 transition-colors"
          >
            Browse All Courses
          </Link>
        </div>
      </div>
    </div>
  );
}
