'use client';

import { Card, CardHeader, CardTitle, CardContent, CardFooter, Badge, Button } from '@/components/ui';

// Placeholder data
const currentMembership = {
  tier: 'Professional',
  price: 199,
  billingCycle: 'month',
  nextBillingDate: 'Feb 8, 2026',
  memberSince: 'Jan 15, 2024',
};

const usage = {
  leads: { used: 18, limit: 25, label: 'Leads This Month' },
  articles: { used: 2, limit: 5, label: 'Articles Published' },
  events: { used: 1, limit: 3, label: 'Events Created' },
};

const tiers = [
  {
    name: 'Essential',
    price: 99,
    description: 'For new practitioners getting started',
    features: [
      '10 leads per month',
      'Basic directory listing',
      '1 article per month',
      'Email support',
    ],
    current: false,
  },
  {
    name: 'Professional',
    price: 199,
    description: 'For growing practices',
    features: [
      '25 leads per month',
      'Featured directory listing',
      '5 articles per month',
      '3 events per month',
      'Priority support',
      'Analytics dashboard',
    ],
    current: true,
    popular: true,
  },
  {
    name: 'Elite',
    price: 399,
    description: 'For established practices',
    features: [
      'Unlimited leads',
      'Premium directory placement',
      'Unlimited articles',
      'Unlimited events',
      'Dedicated account manager',
      'Advanced analytics',
      'Custom branding',
      'API access',
    ],
    current: false,
  },
];

const billingHistory = [
  { id: 1, date: 'Jan 8, 2026', amount: 199, status: 'Paid', invoice: 'INV-2026-001' },
  { id: 2, date: 'Dec 8, 2025', amount: 199, status: 'Paid', invoice: 'INV-2025-012' },
  { id: 3, date: 'Nov 8, 2025', amount: 199, status: 'Paid', invoice: 'INV-2025-011' },
  { id: 4, date: 'Oct 8, 2025', amount: 199, status: 'Paid', invoice: 'INV-2025-010' },
];

export default function MembershipPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Membership</h1>
        <p className="mt-2 text-slate-600">Manage your subscription and billing.</p>
      </div>

      {/* Current Plan Card */}
      <Card className="bg-gradient-to-r from-teal-50 to-emerald-50 border-teal-200">
        <CardContent>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-xl font-bold text-slate-900">{currentMembership.tier}</h2>
                <Badge variant="primary">Current Plan</Badge>
              </div>
              <p className="text-slate-600">
                <span className="text-3xl font-bold text-slate-900">${currentMembership.price}</span>
                <span className="text-slate-500">/{currentMembership.billingCycle}</span>
              </p>
              <p className="text-sm text-slate-500 mt-2">
                Member since {currentMembership.memberSince} | Next billing: {currentMembership.nextBillingDate}
              </p>
            </div>
            <Button variant="outline">
              Manage Billing
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Usage Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {Object.values(usage).map((stat) => (
          <Card key={stat.label}>
            <CardContent>
              <p className="text-sm font-medium text-slate-600">{stat.label}</p>
              <div className="mt-2 flex items-end gap-2">
                <span className="text-3xl font-bold text-slate-900">{stat.used}</span>
                <span className="text-sm text-slate-500 mb-1">/ {stat.limit}</span>
              </div>
              <div className="mt-3 w-full bg-slate-100 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    stat.used / stat.limit > 0.8 ? 'bg-amber-500' : 'bg-teal-600'
                  }`}
                  style={{ width: `${Math.min((stat.used / stat.limit) * 100, 100)}%` }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upgrade Section */}
      <Card>
        <CardHeader>
          <CardTitle>Available Plans</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-xl border p-6 ${
                  tier.current
                    ? 'border-teal-500 bg-teal-50'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="accent">Most Popular</Badge>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-lg font-bold text-slate-900">{tier.name}</h3>
                  <p className="text-sm text-slate-600 mt-1">{tier.description}</p>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-slate-900">${tier.price}</span>
                    <span className="text-slate-500">/month</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-slate-600">
                      <svg className="w-5 h-5 text-teal-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                {tier.current ? (
                  <Button variant="secondary" fullWidth disabled>
                    Current Plan
                  </Button>
                ) : tier.price > currentMembership.price ? (
                  <Button fullWidth>
                    Upgrade
                  </Button>
                ) : (
                  <Button variant="outline" fullWidth>
                    Downgrade
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Billing History</CardTitle>
          <Button variant="ghost" size="sm">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download All
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="text-left py-4 px-6 text-xs font-semibold text-slate-600 uppercase tracking-wider">Date</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-slate-600 uppercase tracking-wider">Invoice</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-slate-600 uppercase tracking-wider">Amount</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-slate-600 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {billingHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="py-4 px-6 text-sm text-slate-900">{item.date}</td>
                    <td className="py-4 px-6 text-sm text-slate-600">{item.invoice}</td>
                    <td className="py-4 px-6 text-sm font-medium text-slate-900">${item.amount}</td>
                    <td className="py-4 px-6">
                      <Badge variant="success" size="sm">{item.status}</Badge>
                    </td>
                    <td className="py-4 px-6">
                      <button className="text-sm text-teal-600 hover:text-teal-700 font-medium">
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Billing Portal Link */}
      <Card>
        <CardContent>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="font-semibold text-slate-900">Need to update payment info?</h3>
              <p className="text-sm text-slate-600 mt-1">
                Manage your payment methods, billing address, and more in the billing portal.
              </p>
            </div>
            <Button variant="outline">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Open Billing Portal
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
