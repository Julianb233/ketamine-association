'use client';

import { useState } from 'react';
import Link from 'next/link';

// Placeholder data
const initialSavedProviders = [
  {
    id: '1',
    name: 'Dr. Emily Chen',
    specialty: 'Psychiatrist',
    location: 'Los Angeles, CA',
    rating: 4.9,
    reviews: 156,
    treatments: ['IV Infusion', 'Nasal Spray', 'Oral'],
    savedDate: '2024-01-15',
  },
  {
    id: '2',
    name: 'Dr. Michael Roberts',
    specialty: 'Anesthesiologist',
    location: 'San Diego, CA',
    rating: 4.8,
    reviews: 98,
    treatments: ['IV Infusion', 'IM Injection'],
    savedDate: '2024-01-10',
  },
  {
    id: '3',
    name: 'Pacific Ketamine Center',
    specialty: 'Clinic',
    location: 'San Francisco, CA',
    rating: 4.7,
    reviews: 312,
    treatments: ['IV Infusion', 'Nasal Spray'],
    savedDate: '2024-01-05',
  },
  {
    id: '4',
    name: 'Dr. Sarah Thompson',
    specialty: 'Psychiatrist',
    location: 'Seattle, WA',
    rating: 4.9,
    reviews: 127,
    treatments: ['IV Infusion', 'Oral'],
    savedDate: '2023-12-20',
  },
  {
    id: '5',
    name: 'Wellness Ketamine Clinic',
    specialty: 'Clinic',
    location: 'Portland, OR',
    rating: 4.6,
    reviews: 89,
    treatments: ['IV Infusion', 'IM Injection', 'Nasal Spray'],
    savedDate: '2023-12-15',
  },
];

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function HeartIcon({ className, filled }: { className?: string; filled?: boolean }) {
  if (filled) {
    return (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    );
  }
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </svg>
  );
}

export default function SavedProvidersPage() {
  const [savedProviders, setSavedProviders] = useState(initialSavedProviders);

  const handleRemove = (id: string) => {
    setSavedProviders(savedProviders.filter((p) => p.id !== id));
  };

  if (savedProviders.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Saved Providers</h1>
          <p className="mt-1 text-gray-600">
            Providers you've saved for quick access
          </p>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-white py-16 px-6 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <HeartIcon className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-gray-900">No saved providers</h3>
          <p className="mt-2 text-sm text-gray-500 max-w-sm">
            You haven't saved any providers yet. Browse our directory to find and save providers that interest you.
          </p>
          <Link
            href="/directory"
            className="mt-6 inline-flex items-center rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-teal-700 transition-colors"
          >
            Browse Provider Directory
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Saved Providers</h1>
          <p className="mt-1 text-gray-600">
            {savedProviders.length} provider{savedProviders.length !== 1 ? 's' : ''} saved
          </p>
        </div>
        <Link
          href="/directory"
          className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Find More Providers
        </Link>
      </div>

      {/* Provider Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {savedProviders.map((provider) => (
          <div
            key={provider.id}
            className="relative rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md"
          >
            {/* Remove button */}
            <button
              type="button"
              onClick={() => handleRemove(provider.id)}
              className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-gray-100 transition-colors group"
              title="Remove from saved"
            >
              <HeartIcon className="h-5 w-5 text-red-500 group-hover:text-red-600" filled />
            </button>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-700 font-semibold">
                {provider.name.split(' ').slice(-1)[0][0]}
                {provider.name.split(' ')[0][0]}
              </div>
              <div className="flex-1 min-w-0 pr-6">
                <h3 className="font-medium text-gray-900 truncate">{provider.name}</h3>
                <p className="text-sm text-gray-500">{provider.specialty}</p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-1 text-sm">
              <StarIcon className="h-4 w-4 text-yellow-400" />
              <span className="font-medium text-gray-900">{provider.rating}</span>
              <span className="text-gray-400">({provider.reviews} reviews)</span>
            </div>

            <div className="mt-2 flex items-center gap-1 text-sm text-gray-500">
              <MapPinIcon className="h-4 w-4 text-gray-400" />
              {provider.location}
            </div>

            <div className="mt-3 flex flex-wrap gap-1">
              {provider.treatments.map((treatment) => (
                <span
                  key={treatment}
                  className="inline-flex items-center rounded-full bg-teal-50 px-2 py-0.5 text-xs font-medium text-teal-700"
                >
                  {treatment}
                </span>
              ))}
            </div>

            <div className="mt-4 flex gap-2">
              <Link
                href={`/directory/${provider.id}`}
                className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                View Profile
              </Link>
              <button
                type="button"
                className="flex-1 rounded-lg border border-transparent bg-teal-600 px-3 py-2 text-sm font-medium text-white hover:bg-teal-700 transition-colors"
              >
                Contact
              </button>
            </div>

            <p className="mt-3 text-xs text-gray-400">
              Saved on {new Date(provider.savedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
