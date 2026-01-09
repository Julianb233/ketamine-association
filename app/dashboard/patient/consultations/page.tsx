import Link from 'next/link';

// Placeholder data
const consultations = [
  {
    id: '1',
    provider: {
      name: 'Dr. Emily Chen',
      specialty: 'Psychiatrist',
      location: 'Los Angeles, CA',
    },
    status: 'scheduled',
    requestedDate: '2024-01-20',
    scheduledDate: '2024-02-01',
    scheduledTime: '10:00 AM',
    notes: 'Initial consultation to discuss treatment options and medical history.',
  },
  {
    id: '2',
    provider: {
      name: 'Dr. Michael Roberts',
      specialty: 'Anesthesiologist',
      location: 'San Diego, CA',
    },
    status: 'requested',
    requestedDate: '2024-01-22',
    scheduledDate: null,
    scheduledTime: null,
    notes: 'Interested in IV infusion therapy. Have tried other treatments without success.',
  },
  {
    id: '3',
    provider: {
      name: 'Pacific Ketamine Center',
      specialty: 'Clinic',
      location: 'San Francisco, CA',
    },
    status: 'completed',
    requestedDate: '2024-01-05',
    scheduledDate: '2024-01-12',
    scheduledTime: '2:00 PM',
    completedDate: '2024-01-12',
    notes: 'Discussed treatment plan and scheduled first session.',
    outcome: 'Treatment plan created. Starting IV infusion therapy next week.',
  },
  {
    id: '4',
    provider: {
      name: 'Dr. Sarah Thompson',
      specialty: 'Psychiatrist',
      location: 'Seattle, WA',
    },
    status: 'completed',
    requestedDate: '2023-12-10',
    scheduledDate: '2023-12-18',
    scheduledTime: '11:00 AM',
    completedDate: '2023-12-18',
    notes: 'Follow-up consultation after initial assessment.',
    outcome: 'Determined ketamine therapy is appropriate. Referred to local provider.',
  },
];

const statusConfig = {
  requested: {
    label: 'Requested',
    className: 'bg-yellow-100 text-yellow-800',
    icon: ClockIcon,
  },
  scheduled: {
    label: 'Scheduled',
    className: 'bg-blue-100 text-blue-800',
    icon: CalendarIcon,
  },
  completed: {
    label: 'Completed',
    className: 'bg-green-100 text-green-800',
    icon: CheckIcon,
  },
};

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
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

export default function ConsultationsPage() {
  const upcomingConsultations = consultations.filter(
    (c) => c.status === 'scheduled' || c.status === 'requested'
  );
  const pastConsultations = consultations.filter((c) => c.status === 'completed');

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Consultations</h1>
          <p className="mt-1 text-gray-600">
            Manage your consultation requests and history
          </p>
        </div>
        <Link
          href="/directory"
          className="inline-flex items-center justify-center rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-teal-700 transition-colors"
        >
          Request New Consultation
        </Link>
      </div>

      {/* Upcoming Consultations */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Upcoming & Pending ({upcomingConsultations.length})
        </h2>
        {upcomingConsultations.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
            <p className="text-gray-500">No upcoming consultations</p>
          </div>
        ) : (
          <div className="space-y-4">
            {upcomingConsultations.map((consultation) => {
              const status = statusConfig[consultation.status as keyof typeof statusConfig];
              return (
                <div
                  key={consultation.id}
                  className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-700 font-semibold">
                        {consultation.provider.name.split(' ').slice(-1)[0][0]}
                        {consultation.provider.name.split(' ')[0][0]}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {consultation.provider.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {consultation.provider.specialty}
                        </p>
                        <div className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                          <MapPinIcon className="h-4 w-4 text-gray-400" />
                          {consultation.provider.location}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${status.className}`}
                      >
                        <status.icon className="h-3.5 w-3.5" />
                        {status.label}
                      </span>
                    </div>
                  </div>

                  {consultation.scheduledDate && (
                    <div className="mt-4 flex items-center gap-2 rounded-lg bg-blue-50 p-3 text-sm">
                      <CalendarIcon className="h-5 w-5 text-blue-600" />
                      <span className="font-medium text-blue-900">
                        Scheduled for{' '}
                        {new Date(consultation.scheduledDate).toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}{' '}
                        at {consultation.scheduledTime}
                      </span>
                    </div>
                  )}

                  {consultation.notes && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Notes:</span> {consultation.notes}
                      </p>
                    </div>
                  )}

                  <div className="mt-4 flex gap-2">
                    {consultation.status === 'scheduled' && (
                      <>
                        <button
                          type="button"
                          className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          Reschedule
                        </button>
                        <button
                          type="button"
                          className="rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {consultation.status === 'requested' && (
                      <button
                        type="button"
                        className="rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                      >
                        Cancel Request
                      </button>
                    )}
                  </div>

                  <p className="mt-3 text-xs text-gray-400">
                    Requested on{' '}
                    {new Date(consultation.requestedDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Past Consultations */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Past Consultations ({pastConsultations.length})
        </h2>
        {pastConsultations.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
            <p className="text-gray-500">No past consultations</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pastConsultations.map((consultation) => {
              const status = statusConfig[consultation.status as keyof typeof statusConfig];
              return (
                <div
                  key={consultation.id}
                  className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600 font-semibold">
                        {consultation.provider.name.split(' ').slice(-1)[0][0]}
                        {consultation.provider.name.split(' ')[0][0]}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {consultation.provider.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {consultation.provider.specialty}
                        </p>
                        <div className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                          <MapPinIcon className="h-4 w-4 text-gray-400" />
                          {consultation.provider.location}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${status.className}`}
                      >
                        <status.icon className="h-3.5 w-3.5" />
                        {status.label}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 text-sm text-gray-500">
                    Completed on{' '}
                    {new Date(consultation.completedDate!).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>

                  {consultation.outcome && (
                    <div className="mt-3 rounded-lg bg-green-50 p-3">
                      <p className="text-sm text-green-800">
                        <span className="font-medium">Outcome:</span> {consultation.outcome}
                      </p>
                    </div>
                  )}

                  <div className="mt-4 flex gap-2">
                    <button
                      type="button"
                      className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      View Details
                    </button>
                    <button
                      type="button"
                      className="rounded-lg border border-transparent bg-teal-600 px-3 py-2 text-sm font-medium text-white hover:bg-teal-700 transition-colors"
                    >
                      Book Follow-up
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
