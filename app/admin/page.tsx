'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  Stethoscope,
  MessageSquare,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  FileText,
  Calendar,
  Eye,
  CheckCircle2,
  Clock,
  AlertCircle,
  UserPlus,
  ShieldCheck,
  Star,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Stats data
const stats = [
  {
    name: 'Total Users',
    value: '2,847',
    change: '+12.5%',
    trend: 'up',
    icon: Users,
    color: 'teal',
  },
  {
    name: 'Active Practitioners',
    value: '342',
    change: '+8.2%',
    trend: 'up',
    icon: Stethoscope,
    color: 'emerald',
  },
  {
    name: 'Pending Reviews',
    value: '12',
    change: '-4',
    trend: 'down',
    icon: MessageSquare,
    color: 'amber',
  },
  {
    name: 'Monthly Revenue',
    value: '$45,230',
    change: '+18.7%',
    trend: 'up',
    icon: DollarSign,
    color: 'purple',
  },
];

// Recent activity data
const recentActivity = [
  {
    id: 1,
    type: 'user_signup',
    message: 'New user registered',
    user: 'Emily Johnson',
    time: '5 minutes ago',
    icon: UserPlus,
    color: 'teal',
  },
  {
    id: 2,
    type: 'practitioner_verified',
    message: 'Practitioner verified',
    user: 'Dr. Michael Chen',
    time: '12 minutes ago',
    icon: ShieldCheck,
    color: 'emerald',
  },
  {
    id: 3,
    type: 'review_submitted',
    message: 'New review submitted',
    user: 'Sarah Williams',
    time: '23 minutes ago',
    icon: Star,
    color: 'amber',
  },
  {
    id: 4,
    type: 'article_published',
    message: 'Article published',
    user: 'Dr. Lisa Park',
    time: '1 hour ago',
    icon: FileText,
    color: 'blue',
  },
  {
    id: 5,
    type: 'event_created',
    message: 'New event created',
    user: 'Admin Team',
    time: '2 hours ago',
    icon: Calendar,
    color: 'purple',
  },
];

// Pending items data
const pendingItems = [
  {
    id: 1,
    type: 'review',
    title: 'Review for Dr. Anderson',
    status: 'pending',
    priority: 'high',
    submitted: '2 hours ago',
  },
  {
    id: 2,
    type: 'article',
    title: 'New Treatment Protocols 2024',
    status: 'pending_review',
    priority: 'medium',
    submitted: '5 hours ago',
  },
  {
    id: 3,
    type: 'practitioner',
    title: 'Dr. James Wilson - Verification',
    status: 'pending',
    priority: 'high',
    submitted: '1 day ago',
  },
  {
    id: 4,
    type: 'review',
    title: 'Review for Healing Minds Clinic',
    status: 'flagged',
    priority: 'urgent',
    submitted: '3 hours ago',
  },
];

// Quick actions
const quickActions = [
  { name: 'Add User', href: '/admin/users/new', icon: UserPlus },
  { name: 'Verify Practitioner', href: '/admin/practitioners?filter=pending', icon: ShieldCheck },
  { name: 'Review Articles', href: '/admin/articles?status=pending', icon: FileText },
  { name: 'Moderate Reviews', href: '/admin/reviews', icon: MessageSquare },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="mt-1 text-slate-400">
          Welcome back. Here&apos;s what&apos;s happening with your platform.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const colorClasses = {
            teal: 'bg-teal-500/10 text-teal-400',
            emerald: 'bg-emerald-500/10 text-emerald-400',
            amber: 'bg-amber-500/10 text-amber-400',
            purple: 'bg-purple-500/10 text-purple-400',
          };
          return (
            <div
              key={stat.name}
              className="bg-slate-900 rounded-xl border border-slate-800 p-6"
            >
              <div className="flex items-center justify-between">
                <div className={cn('p-2 rounded-lg', colorClasses[stat.color as keyof typeof colorClasses])}>
                  <Icon className="w-5 h-5" />
                </div>
                <div
                  className={cn(
                    'flex items-center gap-1 text-sm font-medium',
                    stat.trend === 'up' ? 'text-emerald-400' : 'text-red-400'
                  )}
                >
                  {stat.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  {stat.change}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-slate-400">{stat.name}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick actions */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.name}
                href={action.href}
                className="flex flex-col items-center gap-2 p-4 rounded-lg bg-slate-800/50 border border-slate-700 hover:bg-slate-800 hover:border-slate-600 transition-colors"
              >
                <div className="p-3 rounded-lg bg-teal-500/10">
                  <Icon className="w-5 h-5 text-teal-400" />
                </div>
                <span className="text-sm font-medium text-slate-300">{action.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Charts placeholder */}
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Growth Overview</h2>
            <select className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/50">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          {/* Chart placeholder */}
          <div className="h-64 flex items-center justify-center border border-dashed border-slate-700 rounded-lg">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-500 text-sm">Chart visualization placeholder</p>
              <p className="text-slate-600 text-xs mt-1">Integrate with Chart.js or Recharts</p>
            </div>
          </div>
        </div>

        {/* Pending items */}
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Pending Items</h2>
            <Link
              href="/admin/reviews"
              className="text-sm text-teal-400 hover:text-teal-300 flex items-center gap-1"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {pendingItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'w-2 h-2 rounded-full',
                      item.priority === 'urgent' && 'bg-red-500',
                      item.priority === 'high' && 'bg-amber-500',
                      item.priority === 'medium' && 'bg-blue-500'
                    )}
                  />
                  <div>
                    <p className="text-sm font-medium text-white">{item.title}</p>
                    <p className="text-xs text-slate-500">{item.submitted}</p>
                  </div>
                </div>
                <div
                  className={cn(
                    'px-2 py-1 rounded text-xs font-medium',
                    item.status === 'pending' && 'bg-amber-500/10 text-amber-400',
                    item.status === 'pending_review' && 'bg-blue-500/10 text-blue-400',
                    item.status === 'flagged' && 'bg-red-500/10 text-red-400'
                  )}
                >
                  {item.status.replace('_', ' ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
          <button className="text-sm text-teal-400 hover:text-teal-300 flex items-center gap-1">
            View all <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-4">
          {recentActivity.map((activity) => {
            const Icon = activity.icon;
            const colorClasses = {
              teal: 'bg-teal-500/10 text-teal-400',
              emerald: 'bg-emerald-500/10 text-emerald-400',
              amber: 'bg-amber-500/10 text-amber-400',
              blue: 'bg-blue-500/10 text-blue-400',
              purple: 'bg-purple-500/10 text-purple-400',
            };
            return (
              <div
                key={activity.id}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-800/50 transition-colors"
              >
                <div className={cn('p-2 rounded-lg', colorClasses[activity.color as keyof typeof colorClasses])}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white">
                    {activity.message} - <span className="text-slate-400">{activity.user}</span>
                  </p>
                  <p className="text-xs text-slate-500">{activity.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
