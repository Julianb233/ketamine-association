'use client';

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, Badge } from '@/components/ui';

// Placeholder data
const stats = [
  { name: 'Profile Views', value: '1,247', change: '+12%', changeType: 'positive' },
  { name: 'New Leads', value: '23', change: '+4', changeType: 'positive' },
  { name: 'Response Rate', value: '94%', change: '+2%', changeType: 'positive' },
  { name: 'Rating', value: '4.9', change: '0', changeType: 'neutral' },
];

const recentLeads = [
  { id: 1, name: 'John D.', email: 'john.d***@email.com', date: 'Jan 8, 2026', status: 'new', interest: 'IV Infusion' },
  { id: 2, name: 'Sarah M.', email: 'sarah.m***@email.com', date: 'Jan 7, 2026', status: 'contacted', interest: 'Consultation' },
  { id: 3, name: 'Michael R.', email: 'michael.r***@email.com', date: 'Jan 6, 2026', status: 'scheduled', interest: 'At-Home Treatment' },
  { id: 4, name: 'Emily W.', email: 'emily.w***@email.com', date: 'Jan 5, 2026', status: 'new', interest: 'IV Infusion' },
];

const upcomingEvents = [
  { id: 1, title: 'Ketamine Best Practices Webinar', date: 'Jan 15, 2026', time: '2:00 PM EST', type: 'Webinar' },
  { id: 2, title: 'Annual Conference Registration Opens', date: 'Jan 20, 2026', time: '9:00 AM EST', type: 'Conference' },
  { id: 3, title: 'New Protocol Training', date: 'Jan 25, 2026', time: '1:00 PM EST', type: 'Training' },
];

const profileCompletion = 75;

const statusColors = {
  new: 'primary',
  contacted: 'secondary',
  scheduled: 'accent',
  converted: 'success',
} as const;

export default function PractitionerDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Welcome back, Dr. Mitchell</h1>
        <p className="mt-2 text-slate-600">Here&apos;s what&apos;s happening with your practice today.</p>
      </div>

      {/* Profile Completion Alert */}
      {profileCompletion < 100 && (
        <Card className="bg-gradient-to-r from-teal-50 to-emerald-50 border-teal-200">
          <CardContent>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900">Complete your profile</h3>
                <p className="text-sm text-slate-600 mt-1">
                  A complete profile gets 3x more leads. You&apos;re {profileCompletion}% there!
                </p>
                <div className="mt-3 w-full bg-white/50 rounded-full h-2.5">
                  <div
                    className="bg-teal-600 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${profileCompletion}%` }}
                  />
                </div>
              </div>
              <Link
                href="/dashboard/practitioner/profile"
                className="inline-flex items-center justify-center px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors"
              >
                Complete Profile
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name} hover>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-600">{stat.name}</p>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    stat.changeType === 'positive'
                      ? 'bg-green-100 text-green-700'
                      : stat.changeType === 'negative'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {stat.change}
                </span>
              </div>
              <p className="mt-2 text-3xl font-bold text-slate-900">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Recent Leads */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Leads</CardTitle>
              <Link
                href="/dashboard/practitioner/leads"
                className="text-sm text-teal-600 hover:text-teal-700 font-medium"
              >
                View all
              </Link>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Name</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider hidden sm:table-cell">Interest</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider hidden md:table-cell">Date</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {recentLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-50">
                        <td className="py-3 px-4">
                          <p className="font-medium text-slate-900">{lead.name}</p>
                          <p className="text-sm text-slate-500">{lead.email}</p>
                        </td>
                        <td className="py-3 px-4 hidden sm:table-cell">
                          <span className="text-sm text-slate-600">{lead.interest}</span>
                        </td>
                        <td className="py-3 px-4 hidden md:table-cell">
                          <span className="text-sm text-slate-500">{lead.date}</span>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant={statusColors[lead.status as keyof typeof statusColors]} size="sm">
                            {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Events */}
        <div>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Upcoming Events</CardTitle>
              <Link
                href="/dashboard/practitioner/events"
                className="text-sm text-teal-600 hover:text-teal-700 font-medium"
              >
                View all
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center">
                        <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-slate-900 truncate">{event.title}</p>
                        <p className="text-sm text-slate-500">{event.date}</p>
                        <p className="text-xs text-slate-400">{event.time}</p>
                      </div>
                    </div>
                    <Badge variant="outline" size="sm" className="mt-3">
                      {event.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
