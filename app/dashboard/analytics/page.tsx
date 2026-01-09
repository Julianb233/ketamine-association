'use client';

import { useState } from 'react';
import {
  Eye,
  Users,
  TrendingUp,
  TrendingDown,
  Calendar,
  ArrowUpRight,
  BarChart3,
  PieChart,
  MapPin,
  Clock,
  Target,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

// Mock analytics data
const mockAnalytics = {
  profileViews: {
    current: 1247,
    previous: 1108,
    change: 12.5,
  },
  leads: {
    current: 23,
    previous: 21,
    change: 9.5,
  },
  conversionRate: {
    current: 8.4,
    previous: 7.2,
    change: 16.7,
  },
  avgTimeOnProfile: {
    current: '2:34',
    previous: '2:12',
    change: 16.7,
  },
};

const mockViewsByDay = [
  { day: 'Mon', views: 45 },
  { day: 'Tue', views: 52 },
  { day: 'Wed', views: 38 },
  { day: 'Thu', views: 65 },
  { day: 'Fri', views: 48 },
  { day: 'Sat', views: 72 },
  { day: 'Sun', views: 55 },
];

const mockLeadSources = [
  { source: 'Directory Search', count: 45, percentage: 42, color: 'bg-teal-500' },
  { source: 'Direct Link', count: 28, percentage: 26, color: 'bg-blue-500' },
  { source: 'Article Referral', count: 18, percentage: 17, color: 'bg-purple-500' },
  { source: 'Event', count: 10, percentage: 9, color: 'bg-amber-500' },
  { source: 'Other', count: 6, percentage: 6, color: 'bg-slate-400' },
];

const mockTopConditions = [
  { condition: 'Treatment-Resistant Depression', percentage: 38 },
  { condition: 'Anxiety', percentage: 24 },
  { condition: 'PTSD', percentage: 18 },
  { condition: 'Chronic Pain', percentage: 12 },
  { condition: 'Other', percentage: 8 },
];

const mockTopLocations = [
  { location: 'San Francisco, CA', views: 324 },
  { location: 'Oakland, CA', views: 186 },
  { location: 'San Jose, CA', views: 142 },
  { location: 'Berkeley, CA', views: 98 },
  { location: 'Palo Alto, CA', views: 76 },
];

const timeRanges = [
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
  { value: '90d', label: 'Last 90 days' },
  { value: '12m', label: 'Last 12 months' },
];

function StatCard({
  title,
  value,
  change,
  icon: Icon,
  iconColor = 'text-teal-600 bg-teal-100',
  suffix = '',
}: {
  title: string;
  value: string | number;
  change: number;
  icon: React.ElementType;
  iconColor?: string;
  suffix?: string;
}) {
  const isPositive = change >= 0;

  return (
    <Card hover>
      <CardContent>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">{title}</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">
              {value}{suffix}
            </p>
            <div className="flex items-center gap-1 mt-2">
              {isPositive ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
              <span className={cn(
                'text-sm font-medium',
                isPositive ? 'text-green-600' : 'text-red-600'
              )}>
                {isPositive ? '+' : ''}{change}%
              </span>
              <span className="text-sm text-slate-500">vs last period</span>
            </div>
          </div>
          <div className={cn('p-3 rounded-xl', iconColor)}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function SimpleBarChart({ data }: { data: { day: string; views: number }[] }) {
  const maxViews = Math.max(...data.map((d) => d.views));

  return (
    <div className="flex items-end justify-between h-40 gap-2">
      {data.map((item) => (
        <div key={item.day} className="flex-1 flex flex-col items-center gap-2">
          <div className="relative w-full flex justify-center">
            <div
              className="w-full max-w-8 bg-teal-500 rounded-t-md transition-all duration-300 hover:bg-teal-600"
              style={{ height: `${(item.views / maxViews) * 120}px` }}
            />
          </div>
          <span className="text-xs text-slate-500">{item.day}</span>
        </div>
      ))}
    </div>
  );
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30d');

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
        <div className="flex gap-2">
          {timeRanges.map((range) => (
            <button
              key={range.value}
              onClick={() => setTimeRange(range.value)}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                timeRange === range.value
                  ? 'bg-teal-100 text-teal-700'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              )}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard
          title="Profile Views"
          value={mockAnalytics.profileViews.current.toLocaleString()}
          change={mockAnalytics.profileViews.change}
          icon={Eye}
          iconColor="text-teal-600 bg-teal-100"
        />
        <StatCard
          title="Total Leads"
          value={mockAnalytics.leads.current}
          change={mockAnalytics.leads.change}
          icon={Users}
          iconColor="text-blue-600 bg-blue-100"
        />
        <StatCard
          title="Conversion Rate"
          value={mockAnalytics.conversionRate.current}
          change={mockAnalytics.conversionRate.change}
          icon={Target}
          iconColor="text-purple-600 bg-purple-100"
          suffix="%"
        />
        <StatCard
          title="Avg. Time on Profile"
          value={mockAnalytics.avgTimeOnProfile.current}
          change={mockAnalytics.avgTimeOnProfile.change}
          icon={Clock}
          iconColor="text-amber-600 bg-amber-100"
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
                  Profile Views
                </CardTitle>
                <CardDescription>Daily views this week</CardDescription>
              </div>
              <Badge variant="primary">
                {mockViewsByDay.reduce((sum: number, d: { day: string; views: number }) => sum + d.views, 0)} total
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <SimpleBarChart data={mockViewsByDay} />
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
            <div className="space-y-4">
              {mockLeadSources.map((source) => (
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
          </CardContent>
        </Card>
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Conditions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-teal-600" />
              Top Conditions Searched
            </CardTitle>
            <CardDescription>What patients are looking for</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockTopConditions.map((item, index) => (
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
          </CardContent>
        </Card>

        {/* Top Locations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-teal-600" />
              Top Visitor Locations
            </CardTitle>
            <CardDescription>Where your visitors are located</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockTopLocations.map((location, index) => (
                <div
                  key={location.location}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      'flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold',
                      index === 0 ? 'bg-teal-100 text-teal-700' : 'bg-white text-slate-500'
                    )}>
                      {index + 1}
                    </span>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-slate-400" />
                      <span className="font-medium text-slate-700">{location.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-slate-400" />
                    <span className="font-semibold text-slate-900">{location.views}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Insights Banner */}
      <Card className="bg-gradient-to-br from-teal-600 to-teal-700 border-0 text-white">
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/20 rounded-xl">
                <TrendingUp className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Your Profile is Performing Well!</h3>
                <p className="text-teal-100">
                  Your profile views are up {mockAnalytics.profileViews.change}% compared to last month.
                  Keep your profile updated to maintain this momentum.
                </p>
              </div>
            </div>
            <a
              href="/dashboard/profile"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-teal-700 rounded-lg font-semibold hover:bg-teal-50 transition-colors whitespace-nowrap"
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
