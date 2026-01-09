'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';

// Placeholder data
const profileViewsData = {
  total: 1247,
  change: '+12%',
  period: 'vs last month',
  chartData: [120, 145, 132, 178, 165, 189, 201, 187, 210, 198, 225, 247],
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
};

const leadFunnel = [
  { stage: 'Profile Views', count: 1247, percentage: 100 },
  { stage: 'Lead Inquiries', count: 156, percentage: 12.5 },
  { stage: 'Contacted', count: 89, percentage: 57 },
  { stage: 'Scheduled', count: 52, percentage: 58 },
  { stage: 'Converted', count: 38, percentage: 73 },
];

const referralSources = [
  { source: 'Directory Listing', count: 456, percentage: 36.5 },
  { source: 'Google Search', count: 312, percentage: 25 },
  { source: 'Referrals', count: 198, percentage: 15.9 },
  { source: 'Social Media', count: 156, percentage: 12.5 },
  { source: 'Direct', count: 125, percentage: 10.1 },
];

const ratingHistory = [
  { month: 'Jul', rating: 4.7, reviews: 12 },
  { month: 'Aug', rating: 4.8, reviews: 15 },
  { month: 'Sep', rating: 4.8, reviews: 18 },
  { month: 'Oct', rating: 4.9, reviews: 14 },
  { month: 'Nov', rating: 4.9, reviews: 16 },
  { month: 'Dec', rating: 4.9, reviews: 20 },
];

const quickStats = [
  { label: 'Avg. Response Time', value: '2.3 hrs', change: '-15%', positive: true },
  { label: 'Lead-to-Booking Rate', value: '24%', change: '+3%', positive: true },
  { label: 'Avg. Booking Value', value: '$450', change: '+8%', positive: true },
  { label: 'Patient Satisfaction', value: '98%', change: '0%', positive: true },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Analytics</h1>
          <p className="mt-2 text-slate-600">Track your practice performance and growth.</p>
        </div>
        <div className="flex items-center gap-2">
          <select className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>Last 12 months</option>
            <option>All time</option>
          </select>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {quickStats.map((stat) => (
          <Card key={stat.label}>
            <CardContent>
              <p className="text-sm font-medium text-slate-600">{stat.label}</p>
              <div className="mt-2 flex items-end justify-between">
                <span className="text-2xl font-bold text-slate-900">{stat.value}</span>
                <span className={`text-sm font-medium ${stat.positive ? 'text-emerald-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Profile Views Chart */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Profile Views</CardTitle>
              <div className="text-right">
                <p className="text-2xl font-bold text-slate-900">{profileViewsData.total.toLocaleString()}</p>
                <p className="text-sm text-emerald-600">{profileViewsData.change} {profileViewsData.period}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Chart Placeholder */}
            <div className="h-64 flex items-end gap-2 pt-4">
              {profileViewsData.chartData.map((value, index) => {
                const maxValue = Math.max(...profileViewsData.chartData);
                const height = (value / maxValue) * 100;
                return (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="w-full bg-teal-500 rounded-t-sm hover:bg-teal-600 transition-colors cursor-pointer"
                      style={{ height: `${height}%` }}
                      title={`${profileViewsData.labels[index]}: ${value} views`}
                    />
                    <span className="text-xs text-slate-500">{profileViewsData.labels[index].slice(0, 1)}</span>
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-slate-500 text-center mt-4">Monthly profile views over the past year</p>
          </CardContent>
        </Card>

        {/* Lead Conversion Funnel */}
        <Card>
          <CardHeader>
            <CardTitle>Lead Conversion Funnel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leadFunnel.map((stage, index) => (
                <div key={stage.stage}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-slate-700">{stage.stage}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-slate-900">{stage.count}</span>
                      {index > 0 && (
                        <span className="text-xs text-slate-500">({stage.percentage}%)</span>
                      )}
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-teal-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(stage.count / leadFunnel[0].count) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-emerald-50 rounded-lg">
              <p className="text-sm text-emerald-800">
                <span className="font-semibold">Overall conversion rate:</span> 3.0% from views to patients
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Top Referral Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Top Referral Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {referralSources.map((source, index) => (
                <div key={source.source} className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-sm font-semibold text-slate-600">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-slate-700">{source.source}</span>
                      <span className="text-sm text-slate-600">{source.count} visits</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div
                        className="bg-teal-500 h-2 rounded-full"
                        style={{ width: `${source.percentage}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm text-slate-500 w-12 text-right">{source.percentage}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Rating Trend */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Rating Trend</CardTitle>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-5 h-5 ${star <= 4.9 ? 'text-amber-400' : 'text-slate-200'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-lg font-bold text-slate-900">4.9</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ratingHistory.map((item) => (
                <div key={item.month} className="flex items-center gap-4">
                  <span className="text-sm font-medium text-slate-600 w-12">{item.month}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-100 rounded-full h-2">
                        <div
                          className="bg-amber-400 h-2 rounded-full"
                          style={{ width: `${(item.rating / 5) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-slate-900 w-8">{item.rating}</span>
                    </div>
                  </div>
                  <span className="text-xs text-slate-500 w-16 text-right">{item.reviews} reviews</span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Total Reviews</span>
                <span className="font-semibold text-slate-900">95</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Insights Section */}
      <Card>
        <CardHeader>
          <CardTitle>Insights & Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-emerald-900">Great Response Time</h4>
                  <p className="text-sm text-emerald-700 mt-1">
                    Your 2.3hr average response time is 40% faster than similar practices.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-amber-900">Optimize Your Profile</h4>
                  <p className="text-sm text-amber-700 mt-1">
                    Adding more treatment photos could increase profile views by 25%.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-teal-900">Publish Content</h4>
                  <p className="text-sm text-teal-700 mt-1">
                    Practitioners who publish articles get 2x more profile views on average.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
