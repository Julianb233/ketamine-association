import Link from 'next/link';
export const dynamic = 'force-dynamic';
import { redirect } from 'next/navigation';
import {
  Eye,
  Users,
  Star,
  MessageSquare,
  ArrowUpRight,
  ChevronRight,
  Pencil,
  ExternalLink,
  Crown,
  TrendingUp
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { cn, formatDate } from '@/lib/utils';
import { prisma } from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';
import { MEMBERSHIP_TIERS } from '@/lib/stripe';

const statusColors: Record<string, string> = {
  NEW: 'bg-blue-100 text-blue-700',
  CONTACTED: 'bg-yellow-100 text-yellow-700',
  SCHEDULED: 'bg-purple-100 text-purple-700',
  CONVERTED: 'bg-green-100 text-green-700',
  CLOSED: 'bg-slate-100 text-slate-700',
};

const conditionLabels: Record<string, string> = {
  TREATMENT_RESISTANT_DEPRESSION: 'Treatment-Resistant Depression',
  CHRONIC_PAIN: 'Chronic Pain',
  PTSD: 'PTSD',
  ANXIETY: 'Anxiety',
  OCD: 'OCD',
  BIPOLAR_DEPRESSION: 'Bipolar Depression',
  FIBROMYALGIA: 'Fibromyalgia',
  CRPS: 'CRPS',
  SUICIDAL_IDEATION: 'Suicidal Ideation',
};

function StatCard({
  title,
  value,
  icon: Icon,
  iconColor = 'text-teal-600 bg-teal-100'
}: {
  title: string;
  value: string | number;
  icon: React.ElementType;
  iconColor?: string;
}) {
  return (
    <Card hover>
      <CardContent>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">{title}</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">{value}</p>
          </div>
          <div className={cn('p-3 rounded-xl', iconColor)}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/sign-in');
  }

  // Fetch practitioner with related data
  const practitioner = await prisma.practitioner.findFirst({
    where: { userId: user.id },
    include: {
      leads: {
        orderBy: { createdAt: 'desc' },
        take: 4,
      },
      reviews: {
        where: { isPublished: true },
      },
    },
  });

  if (!practitioner) {
    redirect('/onboarding');
  }

  // Calculate stats from real data
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const newLeadsThisMonth = practitioner.leads.filter(
    lead => new Date(lead.createdAt) >= startOfMonth
  ).length;

  const totalLeads = practitioner.leads.length;
  const recentLeads = practitioner.leads.slice(0, 4);

  // Calculate average rating
  const publishedReviews = practitioner.reviews;
  const averageRating = publishedReviews.length > 0
    ? publishedReviews.reduce((sum, r) => sum + r.rating, 0) / publishedReviews.length
    : 0;

  // Get membership info
  const tierKey = practitioner.membershipTier as keyof typeof MEMBERSHIP_TIERS;
  const tierInfo = MEMBERSHIP_TIERS[tierKey] || MEMBERSHIP_TIERS.FREE;
  const leadsLimit = tierInfo.limits.leads === Infinity ? 'Unlimited' : tierInfo.limits.leads;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
            Welcome back, {practitioner.title || ''} {practitioner.firstName}
          </h1>
          <p className="text-slate-500 mt-1">
            Here&apos;s what&apos;s happening with your practice today.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" size="sm" href="/dashboard/profile">
            <Pencil className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
          <Button variant="primary" size="sm" href={`/practitioners/${practitioner.slug}`}>
            <ExternalLink className="h-4 w-4 mr-2" />
            View Public Profile
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard
          title="Profile Views"
          value={practitioner.profileViews.toLocaleString()}
          icon={Eye}
          iconColor="text-teal-600 bg-teal-100"
        />
        <StatCard
          title="New Leads This Month"
          value={newLeadsThisMonth}
          icon={Users}
          iconColor="text-blue-600 bg-blue-100"
        />
        <StatCard
          title="Rating"
          value={averageRating > 0 ? averageRating.toFixed(1) : 'N/A'}
          icon={Star}
          iconColor="text-amber-600 bg-amber-100"
        />
        <StatCard
          title="Total Reviews"
          value={publishedReviews.length}
          icon={MessageSquare}
          iconColor="text-purple-600 bg-purple-100"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Leads */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Recent Leads</CardTitle>
              <Link
                href="/dashboard/leads"
                className="text-sm text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1"
              >
                View all
                <ChevronRight className="h-4 w-4" />
              </Link>
            </CardHeader>
            <CardContent>
              {recentLeads.length === 0 ? (
                <div className="py-12 text-center">
                  <Users className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500">No leads yet</p>
                  <p className="text-sm text-slate-400 mt-1">
                    Leads will appear here when patients contact you
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-100">
                        <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 px-4">
                          Name
                        </th>
                        <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 px-4 hidden sm:table-cell">
                          Condition
                        </th>
                        <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 px-4">
                          Status
                        </th>
                        <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 px-4 hidden md:table-cell">
                          Date
                        </th>
                        <th className="py-3 px-4"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentLeads.map((lead) => (
                        <tr
                          key={lead.id}
                          className="border-b border-slate-50 hover:bg-slate-50 transition-colors"
                        >
                          <td className="py-4 px-4">
                            <div>
                              <p className="font-medium text-slate-900">
                                {lead.firstName} {lead.lastName}
                              </p>
                              <p className="text-sm text-slate-500">{lead.email}</p>
                            </div>
                          </td>
                          <td className="py-4 px-4 hidden sm:table-cell">
                            <span className="text-sm text-slate-600">
                              {lead.condition ? (conditionLabels[lead.condition] || lead.condition) : 'Not specified'}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span className={cn(
                              'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium',
                              statusColors[lead.status]
                            )}>
                              {lead.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 hidden md:table-cell">
                            <span className="text-sm text-slate-500">
                              {formatDate(lead.createdAt)}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <Link
                              href={`/dashboard/leads?id=${lead.id}`}
                              className="p-2 hover:bg-slate-100 rounded-lg inline-flex"
                            >
                              <ArrowUpRight className="h-4 w-4 text-slate-400" />
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Membership Status */}
        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-teal-600 to-teal-700 border-0 text-white">
            <CardContent>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Crown className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-teal-100 text-sm">Current Plan</p>
                  <p className="text-xl font-bold">{tierInfo.name}</p>
                </div>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-teal-100">Status</span>
                  <span className="font-medium">{practitioner.membershipStatus}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-teal-100">Leads This Month</span>
                  <span className="font-medium">{newLeadsThisMonth} / {leadsLimit}</span>
                </div>
                {practitioner.membershipExpiresAt && (
                  <div className="flex justify-between text-sm">
                    <span className="text-teal-100">Renewal Date</span>
                    <span className="font-medium">
                      {formatDate(practitioner.membershipExpiresAt)}
                    </span>
                  </div>
                )}
              </div>
              <Link
                href="/dashboard/settings"
                className="block w-full py-2.5 px-4 bg-white text-teal-700 rounded-lg font-semibold text-center text-sm hover:bg-teal-50 transition-colors"
              >
                Manage Membership
              </Link>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link
                href="/dashboard/profile"
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-teal-100 rounded-lg text-teal-600">
                    <Pencil className="h-4 w-4" />
                  </div>
                  <span className="font-medium text-slate-700">Update Profile</span>
                </div>
                <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-teal-600 transition-colors" />
              </Link>
              <Link
                href="/dashboard/leads"
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                    <Users className="h-4 w-4" />
                  </div>
                  <span className="font-medium text-slate-700">View All Leads</span>
                </div>
                <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-teal-600 transition-colors" />
              </Link>
              <Link
                href="/dashboard/analytics"
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                  <span className="font-medium text-slate-700">View Analytics</span>
                </div>
                <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-teal-600 transition-colors" />
              </Link>
            </CardContent>
          </Card>

          {/* Upgrade CTA (for non-Elite users) */}
          {practitioner.membershipTier !== 'ELITE' && (
            <Card className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-white">
              <CardContent>
                <div className="flex items-center gap-2 mb-3">
                  <Crown className="h-5 w-5 text-amber-600" />
                  <span className="font-semibold text-amber-900">Upgrade to Elite</span>
                </div>
                <p className="text-sm text-slate-600 mb-4">
                  Get unlimited leads, top placement, and dedicated support.
                </p>
                <Button variant="amber" size="sm" fullWidth href="/dashboard/settings">
                  Upgrade Now
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
