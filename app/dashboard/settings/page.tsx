'use client';

import { useState } from 'react';
import {
  Settings,
  Crown,
  CreditCard,
  Bell,
  Mail,
  Smartphone,
  Shield,
  ExternalLink,
  Check,
  ChevronRight,
  Zap,
  Users,
  BarChart3,
  Star
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import { MEMBERSHIP_TIERS } from '@/lib/stripe';

// Mock membership data - tier can be FREE, PROFESSIONAL, PREMIUM, or ELITE
const mockMembership: {
  tier: 'FREE' | 'PROFESSIONAL' | 'PREMIUM' | 'ELITE';
  status: string;
  startedAt: Date;
  expiresAt: Date;
  leadsUsed: number;
  leadsLimit: number;
  stripeCustomerId: string;
} = {
  tier: 'PREMIUM',
  status: 'ACTIVE',
  startedAt: new Date('2023-06-15'),
  expiresAt: new Date('2024-02-15'),
  leadsUsed: 17,
  leadsLimit: 20,
  stripeCustomerId: 'cus_xxxxx',
};

const mockNotificationSettings = {
  emailNewLead: true,
  emailWeeklyDigest: true,
  emailReviewPosted: true,
  smsNewLead: false,
  smsUrgentOnly: true,
};

const tierFeatures = {
  FREE: [
    'Basic directory listing',
    'Profile page',
    'Community access',
  ],
  PROFESSIONAL: [
    'Enhanced profile',
    '5 leads/month',
    'Priority listing',
    'Badge display',
    'Basic analytics',
  ],
  PREMIUM: [
    'Everything in Professional',
    '20 leads/month',
    'Featured placement',
    'Advanced analytics',
    'CE credit discounts',
    'Event discounts',
    'Export leads',
  ],
  ELITE: [
    'Everything in Premium',
    'Unlimited leads',
    'Top placement',
    'Dedicated support',
    'Speaking opportunities',
    'Research collaboration',
    'Co-marketing',
  ],
};

const tierColors: Record<string, { bg: string; text: string; border: string }> = {
  FREE: { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-200' },
  PROFESSIONAL: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' },
  PREMIUM: { bg: 'bg-teal-100', text: 'text-teal-700', border: 'border-teal-200' },
  ELITE: { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200' },
};

function NotificationToggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="font-medium text-slate-900">{label}</p>
        {description && (
          <p className="text-sm text-slate-500">{description}</p>
        )}
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={cn(
          'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
          checked ? 'bg-teal-600' : 'bg-slate-200'
        )}
      >
        <span
          className={cn(
            'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
            checked ? 'translate-x-6' : 'translate-x-1'
          )}
        />
      </button>
    </div>
  );
}

function MembershipCard({
  tier,
  price,
  isCurrentPlan,
  isPopular,
  onSelect,
}: {
  tier: string;
  price: number;
  isCurrentPlan: boolean;
  isPopular?: boolean;
  onSelect: () => void;
}) {
  const colors = tierColors[tier];
  const features = tierFeatures[tier as keyof typeof tierFeatures] || [];

  return (
    <Card className={cn(
      'relative',
      isCurrentPlan && 'ring-2 ring-teal-500',
      isPopular && !isCurrentPlan && 'ring-2 ring-amber-400'
    )}>
      {isPopular && !isCurrentPlan && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge variant="accent" size="sm">Most Popular</Badge>
        </div>
      )}
      {isCurrentPlan && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge variant="primary" size="sm">Current Plan</Badge>
        </div>
      )}
      <CardContent className="pt-6">
        <div className="text-center mb-6">
          <span className={cn(
            'inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold mb-4',
            colors.bg,
            colors.text
          )}>
            {tier}
          </span>
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-4xl font-bold text-slate-900">
              ${price}
            </span>
            <span className="text-slate-500">/month</span>
          </div>
        </div>
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" />
              <span className="text-sm text-slate-600">{feature}</span>
            </li>
          ))}
        </ul>
        <Button
          variant={isCurrentPlan ? 'outline' : 'primary'}
          fullWidth
          onClick={onSelect}
          disabled={isCurrentPlan}
        >
          {isCurrentPlan ? 'Current Plan' : 'Upgrade'}
        </Button>
      </CardContent>
    </Card>
  );
}

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(mockNotificationSettings);
  const [showAllPlans, setShowAllPlans] = useState(false);

  const handleNotificationChange = (key: keyof typeof notifications, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }));
  };

  const handleManageBilling = () => {
    // In production, redirect to Stripe Customer Portal
    console.log('Opening Stripe Customer Portal...');
    alert('This would redirect to Stripe Customer Portal');
  };

  const handleUpgrade = (tier: string) => {
    // In production, create checkout session
    console.log('Upgrading to:', tier);
    alert(`This would start checkout for ${tier} plan`);
  };

  const daysUntilRenewal = Math.ceil(
    (mockMembership.expiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500 mt-1">
          Manage your account and membership preferences
        </p>
      </div>

      {/* Current Membership Status */}
      <Card className="bg-gradient-to-br from-teal-600 to-teal-700 border-0 text-white overflow-hidden">
        <CardContent className="relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-white/20 rounded-xl">
                <Crown className="h-8 w-8" />
              </div>
              <div>
                <p className="text-teal-100 text-sm">Current Membership</p>
                <p className="text-2xl font-bold">{MEMBERSHIP_TIERS[mockMembership.tier].name}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white/10 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="h-4 w-4 text-teal-200" />
                  <span className="text-teal-100 text-sm">Leads Used</span>
                </div>
                <p className="text-xl font-bold">
                  {mockMembership.leadsUsed} / {mockMembership.leadsLimit}
                </p>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Shield className="h-4 w-4 text-teal-200" />
                  <span className="text-teal-100 text-sm">Status</span>
                </div>
                <p className="text-xl font-bold">{mockMembership.status}</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="h-4 w-4 text-teal-200" />
                  <span className="text-teal-100 text-sm">Next Billing</span>
                </div>
                <p className="text-xl font-bold">{daysUntilRenewal} days</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <CreditCard className="h-4 w-4 text-teal-200" />
                  <span className="text-teal-100 text-sm">Monthly Cost</span>
                </div>
                <p className="text-xl font-bold">${MEMBERSHIP_TIERS[mockMembership.tier].monthlyPrice}</p>
              </div>
            </div>

            {/* Progress bar for leads */}
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-teal-100">Leads this month</span>
                <span className="font-medium">
                  {mockMembership.leadsUsed} / {mockMembership.leadsLimit}
                </span>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all duration-300"
                  style={{ width: `${(mockMembership.leadsUsed / mockMembership.leadsLimit) * 100}%` }}
                />
              </div>
            </div>

            <Button
              variant="secondary"
              onClick={handleManageBilling}
              className="bg-white text-teal-700 hover:bg-teal-50 border-0"
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Manage Billing
              <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Upgrade Section */}
      {mockMembership.tier !== 'ELITE' && (
        <Card className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-white">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-amber-600" />
              <CardTitle>Upgrade Your Membership</CardTitle>
            </div>
            <CardDescription>
              Get more leads, better placement, and premium features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className={cn(
              'grid gap-6',
              showAllPlans ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1 md:grid-cols-2'
            )}>
              {showAllPlans ? (
                Object.entries(MEMBERSHIP_TIERS).map(([tier, info]) => (
                  <MembershipCard
                    key={tier}
                    tier={tier}
                    price={info.monthlyPrice}
                    isCurrentPlan={tier === mockMembership.tier}
                    isPopular={tier === 'PREMIUM'}
                    onSelect={() => handleUpgrade(tier)}
                  />
                ))
              ) : (
                <>
                  {mockMembership.tier === 'PROFESSIONAL' && (
                    <MembershipCard
                      tier="PREMIUM"
                      price={MEMBERSHIP_TIERS.PREMIUM.monthlyPrice}
                      isCurrentPlan={false}
                      isPopular
                      onSelect={() => handleUpgrade('PREMIUM')}
                    />
                  )}
                  <MembershipCard
                    tier="ELITE"
                    price={MEMBERSHIP_TIERS.ELITE.monthlyPrice}
                    isCurrentPlan={false}
                    onSelect={() => handleUpgrade('ELITE')}
                  />
                </>
              )}
            </div>
            <button
              onClick={() => setShowAllPlans(!showAllPlans)}
              className="mt-6 text-sm text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1 mx-auto"
            >
              {showAllPlans ? 'Show less' : 'Compare all plans'}
              <ChevronRight className={cn(
                'h-4 w-4 transition-transform',
                showAllPlans && 'rotate-90'
              )} />
            </button>
          </CardContent>
        </Card>
      )}

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-teal-600" />
            Notification Preferences
          </CardTitle>
          <CardDescription>
            Choose how you want to be notified about leads and updates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h4 className="flex items-center gap-2 font-semibold text-slate-900 mb-3">
                <Mail className="h-4 w-4 text-slate-400" />
                Email Notifications
              </h4>
              <div className="divide-y divide-slate-100">
                <NotificationToggle
                  label="New Lead Alerts"
                  description="Get notified immediately when you receive a new lead"
                  checked={notifications.emailNewLead}
                  onChange={(v) => handleNotificationChange('emailNewLead', v)}
                />
                <NotificationToggle
                  label="Weekly Digest"
                  description="Summary of your leads and profile performance"
                  checked={notifications.emailWeeklyDigest}
                  onChange={(v) => handleNotificationChange('emailWeeklyDigest', v)}
                />
                <NotificationToggle
                  label="New Review Posted"
                  description="Get notified when a patient leaves a review"
                  checked={notifications.emailReviewPosted}
                  onChange={(v) => handleNotificationChange('emailReviewPosted', v)}
                />
              </div>
            </div>

            <div>
              <h4 className="flex items-center gap-2 font-semibold text-slate-900 mb-3">
                <Smartphone className="h-4 w-4 text-slate-400" />
                SMS Notifications
              </h4>
              <div className="divide-y divide-slate-100">
                <NotificationToggle
                  label="New Lead SMS"
                  description="Receive a text message for new leads"
                  checked={notifications.smsNewLead}
                  onChange={(v) => handleNotificationChange('smsNewLead', v)}
                />
                <NotificationToggle
                  label="Urgent Only"
                  description="Only send SMS for high-priority notifications"
                  checked={notifications.smsUrgentOnly}
                  onChange={(v) => handleNotificationChange('smsUrgentOnly', v)}
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="primary">
            Save Preferences
          </Button>
        </CardFooter>
      </Card>

      {/* Account Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-teal-600" />
            Account Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-colors border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 rounded-lg">
                  <Mail className="h-5 w-5 text-slate-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-slate-900">Email Address</p>
                  <p className="text-sm text-slate-500">dr.sarah@mindfulketamine.com</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-slate-400" />
            </button>

            <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-colors border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 rounded-lg">
                  <Shield className="h-5 w-5 text-slate-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-slate-900">Password & Security</p>
                  <p className="text-sm text-slate-500">Update your password and security settings</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-slate-400" />
            </button>

            <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-colors border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 rounded-lg">
                  <CreditCard className="h-5 w-5 text-slate-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-slate-900">Billing History</p>
                  <p className="text-sm text-slate-500">View invoices and payment history</p>
                </div>
              </div>
              <ExternalLink className="h-5 w-5 text-slate-400" />
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600">Danger Zone</CardTitle>
          <CardDescription>
            Irreversible actions that affect your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl">
            <div>
              <p className="font-medium text-slate-900">Cancel Membership</p>
              <p className="text-sm text-slate-500">
                Your profile will be removed from the directory
              </p>
            </div>
            <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
