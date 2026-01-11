import { redirect } from 'next/navigation';
export const dynamic = 'force-dynamic';
import {
  Eye,
  Users,
  Target,
  Clock,
  BarChart3,
  PieChart,
  ArrowUpRight,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import { prisma } from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';

function StatCard({
  title,
  value,
  icon: Icon,
  iconColor = 'text-teal-600 bg-teal-100',
  suffix = '',
  description,
}: {
  title: string;
  value: string | number;
  icon: React.ElementType;
  iconColor?: string;
  suffix?: string;
  description?: string;
}) {
  return (
    <Card hover>
      <CardContent>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">{title}</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">
              {value}{suffix}
            </p>
            {description && (
              <p className="text-sm text-slate-500 mt-1">{description}</p>
            )}
          </div>
          <div className={cn('p-3 rounded-xl', iconColor)}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function EmptyChart({ title, description }: { title: string; description: string }) {
  return (
    <div className="py-12 text-center">
      <BarChart3 className="h-12 w-12 text-slate-300 mx-auto mb-4" />
      <p className="text-slate-500 font-medium">{title}</p>
      <p className="text-sm text-slate-400 mt-1">{description}</p>
    </div>
  );
}

export default async function AnalyticsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/sign-in');
  }

  // Fetch practitioner with leads
  const practitioner = await prisma.practitioner.findFirst({
    where: { userId: user.id },
    include: {
      leads: {
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!practitioner) {
    redirect('/onboarding');
  }

  // Calculate real stats
  const profileViews = practitioner.profileViews;
  const totalLeads = practitioner.leads.length;

  // Calculate conversion rate (leads / profile views)
  const conversionRate = profileViews > 0
    ? ((totalLeads / profileViews) * 100).toFixed(1)
    : '0.0';

  // Group leads by source
  const leadsBySource = practitioner.leads.reduce((acc, lead) => {
    const source = lead.source;
    acc[source] = (acc[source] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const sourceLabels: Record<string, string> = {
    DIRECTORY: 'Directory Search',
    ARTICLE: 'Article Referral',
    REFERRAL: 'Referral',
    EVENT: 'Event',
    ADVERTISING: 'Advertising',
  };

  const sourceColors: Record<string, string> = {
    DIRECTORY: 'bg-teal-500',
    ARTICLE: 'bg-purple-500',
    REFERRAL: 'bg-blue-500',
    EVENT: 'bg-amber-500',
    ADVERTISING: 'bg-pink-500',
  };

  const leadSources = Object.entries(leadsBySource)
    .map(([source, count]) => ({
      source: sourceLabels[source] || source,
      count,
      percentage: totalLeads > 0 ? Math.round((count / totalLeads) * 100) : 0,
      color: sourceColors[source] || 'bg-slate-400',
    }))
    .sort((a, b) => b.count - a.count);

  // Group leads by condition
  const leadsByCondition = practitioner.leads.reduce((acc, lead) => {
    const condition = lead.condition || 'OTHER';
    acc[condition] = (acc[condition] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

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
    OTHER: 'Other',
  };

  const topConditions = Object.entries(leadsByCondition)
    .map(([condition, count]) => ({
      condition: conditionLabels[condition] || condition,
      percentage: totalLeads > 0 ? Math.round((count / totalLeads) * 100) : 0,
    }))
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Analytics</h1>
          <p className="text-slate-500 mt-1">
            Track your profile performance and lead generation
          </p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard
          title="Profile Views"
          value={profileViews.toLocaleString()}
          icon={Eye}
          iconColor="text-teal-600 bg-teal-100"
          description="All time"
        />
        <StatCard
          title="Total Leads"
          value={totalLeads}
          icon={Users}
          iconColor="text-blue-600 bg-blue-100"
          description="All time"
        />
        <StatCard
          title="Conversion Rate"
          value={conversionRate}
          icon={Target}
          iconColor="text-purple-600 bg-purple-100"
          suffix="%"
          description="Leads / Views"
        />
        <StatCard
          title="Avg. Time on Profile"
          value="--"
          icon={Clock}
          iconColor="text-amber-600 bg-amber-100"
          description="Coming soon"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Views Over Time */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-teal-600" />
                  Profile Views Over Time
                </CardTitle>
                <CardDescription>Daily view trends</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <EmptyChart
              title="No view data available yet"
              description="Detailed view analytics will be available soon"
            />
          </CardContent>
        </Card>

        {/* Lead Sources */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-teal-600" />
              Lead Sources
            </CardTitle>
            <CardDescription>Where your leads are coming from</CardDescription>
          </CardHeader>
          <CardContent>
            {leadSources.length > 0 ? (
              <div className="space-y-4">
                {leadSources.map((source) => (
                  <div key={source.source}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-slate-700">
                        {source.source}
                      </span>
                      <span className="text-sm text-slate-500">
                        {source.count} ({source.percentage}%)
                      </span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={cn('h-full rounded-full transition-all duration-300', source.color)}
                        style={{ width: `${source.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyChart
                title="No lead data yet"
                description="Source breakdown will appear when you receive leads"
              />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Conditions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-teal-600" />
              Top Conditions Sought
            </CardTitle>
            <CardDescription>What patients are looking for</CardDescription>
          </CardHeader>
          <CardContent>
            {topConditions.length > 0 ? (
              <div className="space-y-4">
                {topConditions.map((item, index) => (
                  <div key={item.condition} className="flex items-center gap-4">
                    <span className={cn(
                      'flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold',
                      index === 0 ? 'bg-amber-100 text-amber-700' :
                      index === 1 ? 'bg-slate-200 text-slate-700' :
                      index === 2 ? 'bg-amber-50 text-amber-600' :
                      'bg-slate-100 text-slate-500'
                    )}>
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-slate-700">
                          {item.condition}
                        </span>
                        <span className="text-sm text-slate-500">{item.percentage}%</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-teal-500 rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyChart
                title="No condition data yet"
                description="Condition breakdown will appear when you receive leads"
              />
            )}
          </CardContent>
        </Card>

        {/* Top Locations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-teal-600" />
              Top Visitor Locations
            </CardTitle>
            <CardDescription>Where your visitors are located</CardDescription>
          </CardHeader>
          <CardContent>
            <EmptyChart
              title="No location data available yet"
              description="Location analytics will be available soon"
            />
          </CardContent>
        </Card>
      </div>

      {/* Info Banner */}
      <Card className="bg-slate-50 border-slate-200">
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-slate-200 rounded-xl">
                <AlertCircle className="h-6 w-6 text-slate-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Analytics Are Growing</h3>
                <p className="text-slate-600 text-sm">
                  As you receive more profile views and leads, your analytics will become more comprehensive.
                  Keep your profile updated and active to maximize visibility.
                </p>
              </div>
            </div>
            <a
              href="/dashboard/profile"
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors whitespace-nowrap"
            >
              Update Profile
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Premium Feature Upsell */}
      <Card className="border-2 border-dashed border-amber-300 bg-amber-50">
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="accent">Elite Feature</Badge>
              </div>
              <h3 className="font-bold text-slate-900 mb-1">
                Unlock Advanced Analytics
              </h3>
              <p className="text-sm text-slate-600">
                Get detailed competitor analysis, keyword tracking, and predictive lead scoring
                with an Elite membership.
              </p>
            </div>
            <a
              href="/dashboard/settings"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-white rounded-lg font-semibold hover:bg-amber-600 transition-colors whitespace-nowrap"
            >
              Upgrade to Elite
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
