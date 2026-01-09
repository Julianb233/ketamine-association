import Link from 'next/link';

// Placeholder data
const recentActivity = [
  {
    id: '1',
    type: 'consultation_requested',
    provider: 'Dr. Emily Chen',
    date: '2 days ago',
    description: 'Consultation request sent',
  },
  {
    id: '2',
    type: 'course_progress',
    course: 'Understanding Ketamine Therapy',
    date: '3 days ago',
    description: 'Completed Module 3: Treatment Expectations',
  },
  {
    id: '3',
    type: 'provider_saved',
    provider: 'Dr. Michael Roberts',
    date: '1 week ago',
    description: 'Added to saved providers',
  },
];

const recommendedProviders = [
  {
    id: '1',
    name: 'Dr. Sarah Thompson',
    specialty: 'Psychiatrist',
    location: 'Los Angeles, CA',
    rating: 4.9,
    reviews: 127,
    treatments: ['IV Infusion', 'Nasal Spray'],
    image: null,
  },
  {
    id: '2',
    name: 'Dr. James Wilson',
    specialty: 'Anesthesiologist',
    location: 'San Francisco, CA',
    rating: 4.8,
    reviews: 89,
    treatments: ['IV Infusion', 'IM Injection'],
    image: null,
  },
  {
    id: '3',
    name: 'Ketamine Wellness Center',
    specialty: 'Clinic',
    location: 'San Diego, CA',
    rating: 4.7,
    reviews: 234,
    treatments: ['IV Infusion', 'Oral', 'Nasal Spray'],
    image: null,
  },
];

const quickActions = [
  {
    title: 'Find a Provider',
    description: 'Search our directory of verified ketamine providers',
    href: '/directory',
    icon: SearchIcon,
    color: 'bg-teal-500',
  },
  {
    title: 'View Saved',
    description: 'Access your saved providers list',
    href: '/dashboard/patient/saved',
    icon: HeartIcon,
    color: 'bg-pink-500',
  },
  {
    title: 'Browse Courses',
    description: 'Learn about ketamine therapy',
    href: '/courses',
    icon: BookIcon,
    color: 'bg-purple-500',
  },
];

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
  );
}

function BookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
  );
}

export default function PatientDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Welcome back, Sarah
        </h1>
        <p className="mt-2 text-gray-600">
          Continue your journey to better mental health with ketamine therapy.
        </p>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {quickActions.map((action) => (
            <Link
              key={action.title}
              href={action.href}
              className="group relative flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-teal-200"
            >
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${action.color}`}>
                <action.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-gray-900 group-hover:text-teal-600">
                {action.title}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {action.description}
              </p>
              <ArrowRightIcon className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-300 transition-transform group-hover:translate-x-1 group-hover:text-teal-500" />
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Recent Activity */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <ul className="divide-y divide-gray-100">
              {recentActivity.map((activity) => (
                <li key={activity.id} className="flex gap-4 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-100">
                    {activity.type === 'consultation_requested' && (
                      <svg className="h-5 w-5 text-teal-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                      </svg>
                    )}
                    {activity.type === 'course_progress' && (
                      <svg className="h-5 w-5 text-teal-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                      </svg>
                    )}
                    {activity.type === 'provider_saved' && (
                      <svg className="h-5 w-5 text-teal-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.description}
                    </p>
                    <p className="text-sm text-gray-500">
                      {activity.provider || activity.course}
                    </p>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap">
                    {activity.date}
                  </span>
                </li>
              ))}
            </ul>
            <div className="border-t border-gray-100 p-4">
              <Link
                href="/dashboard/patient/consultations"
                className="text-sm font-medium text-teal-600 hover:text-teal-700"
              >
                View all activity
              </Link>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Progress</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <p className="text-sm text-gray-500">Saved Providers</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">5</p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <p className="text-sm text-gray-500">Consultations</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">2</p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <p className="text-sm text-gray-500">Courses Enrolled</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">3</p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <p className="text-sm text-gray-500">Courses Completed</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">1</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Providers */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recommended Providers</h2>
          <Link
            href="/directory"
            className="text-sm font-medium text-teal-600 hover:text-teal-700"
          >
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recommendedProviders.map((provider) => (
            <div
              key={provider.id}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-teal-200"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-700 font-semibold">
                  {provider.name.split(' ').slice(-1)[0][0]}
                  {provider.name.split(' ')[0][0]}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">{provider.name}</h3>
                  <p className="text-sm text-gray-500">{provider.specialty}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1 text-sm">
                <StarIcon className="h-4 w-4 text-yellow-400" />
                <span className="font-medium text-gray-900">{provider.rating}</span>
                <span className="text-gray-400">({provider.reviews} reviews)</span>
              </div>
              <p className="mt-2 text-sm text-gray-500">{provider.location}</p>
              <div className="mt-3 flex flex-wrap gap-1">
                {provider.treatments.slice(0, 2).map((treatment) => (
                  <span
                    key={treatment}
                    className="inline-flex items-center rounded-full bg-teal-50 px-2 py-0.5 text-xs font-medium text-teal-700"
                  >
                    {treatment}
                  </span>
                ))}
                {provider.treatments.length > 2 && (
                  <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                    +{provider.treatments.length - 2}
                  </span>
                )}
              </div>
              <div className="mt-4 flex gap-2">
                <Link
                  href={`/directory/${provider.id}`}
                  className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  View Profile
                </Link>
                <button
                  type="button"
                  className="rounded-lg border border-transparent bg-teal-600 px-3 py-2 text-sm font-medium text-white hover:bg-teal-700"
                >
                  Contact
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
