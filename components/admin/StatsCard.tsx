'use client';

import * as React from 'react';
import { TrendingUp, TrendingDown, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: LucideIcon;
  color?: 'teal' | 'emerald' | 'amber' | 'purple' | 'blue' | 'red' | 'slate';
  onClick?: () => void;
  isActive?: boolean;
  className?: string;
}

const colorClasses = {
  teal: {
    bg: 'bg-teal-500/10',
    text: 'text-teal-400',
    border: 'border-teal-500/50',
  },
  emerald: {
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
    border: 'border-emerald-500/50',
  },
  amber: {
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    border: 'border-amber-500/50',
  },
  purple: {
    bg: 'bg-purple-500/10',
    text: 'text-purple-400',
    border: 'border-purple-500/50',
  },
  blue: {
    bg: 'bg-blue-500/10',
    text: 'text-blue-400',
    border: 'border-blue-500/50',
  },
  red: {
    bg: 'bg-red-500/10',
    text: 'text-red-400',
    border: 'border-red-500/50',
  },
  slate: {
    bg: 'bg-slate-500/10',
    text: 'text-slate-400',
    border: 'border-slate-500/50',
  },
};

export function StatsCard({
  title,
  value,
  change,
  trend = 'neutral',
  icon: Icon,
  color = 'teal',
  onClick,
  isActive,
  className,
}: StatsCardProps) {
  const colors = colorClasses[color];
  const isClickable = !!onClick;

  const content = (
    <>
      <div className="flex items-center justify-between">
        <div className={cn('p-2 rounded-lg', colors.bg)}>
          <Icon className={cn('w-5 h-5', colors.text)} />
        </div>
        {change && (
          <div
            className={cn(
              'flex items-center gap-1 text-sm font-medium',
              trend === 'up' && 'text-emerald-400',
              trend === 'down' && 'text-red-400',
              trend === 'neutral' && 'text-slate-400'
            )}
          >
            {trend === 'up' && <TrendingUp className="w-4 h-4" />}
            {trend === 'down' && <TrendingDown className="w-4 h-4" />}
            {change}
          </div>
        )}
      </div>
      <div className="mt-4">
        <p className="text-2xl font-bold text-white">{value}</p>
        <p className="text-sm text-slate-400">{title}</p>
      </div>
    </>
  );

  if (isClickable) {
    return (
      <button
        onClick={onClick}
        className={cn(
          'bg-slate-900 rounded-xl border p-6 text-left transition-colors w-full',
          isActive ? colors.border : 'border-slate-800',
          `hover:${colors.border}`,
          className
        )}
      >
        {content}
      </button>
    );
  }

  return (
    <div
      className={cn(
        'bg-slate-900 rounded-xl border border-slate-800 p-6',
        className
      )}
    >
      {content}
    </div>
  );
}

// Compact variant for smaller stat displays
export interface CompactStatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: 'teal' | 'emerald' | 'amber' | 'purple' | 'blue' | 'red' | 'slate';
  className?: string;
}

export function CompactStatsCard({
  title,
  value,
  icon: Icon,
  color = 'teal',
  className,
}: CompactStatsCardProps) {
  const colors = colorClasses[color];

  return (
    <div
      className={cn(
        'bg-slate-900 rounded-xl border border-slate-800 p-4',
        className
      )}
    >
      <div className="flex items-center gap-3">
        <div className={cn('p-2 rounded-lg', colors.bg)}>
          <Icon className={cn('w-5 h-5', colors.text)} />
        </div>
        <div>
          <p className="text-2xl font-bold text-white">{value}</p>
          <p className="text-sm text-slate-400">{title}</p>
        </div>
      </div>
    </div>
  );
}
