'use client';

import * as React from 'react';
import {
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  Ban,
  Shield,
  Star,
  Eye,
  EyeOff,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export type StatusVariant =
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'pending'
  | 'neutral'
  | 'premium';

export interface StatusBadgeProps {
  status: string;
  variant?: StatusVariant;
  icon?: LucideIcon | 'auto';
  size?: 'sm' | 'md';
  className?: string;
}

// Predefined status configurations
const statusConfig: Record<string, { variant: StatusVariant; icon: LucideIcon }> = {
  // General status
  active: { variant: 'success', icon: CheckCircle2 },
  inactive: { variant: 'neutral', icon: EyeOff },
  suspended: { variant: 'error', icon: Ban },
  pending: { variant: 'pending', icon: Clock },
  approved: { variant: 'success', icon: CheckCircle2 },
  rejected: { variant: 'error', icon: XCircle },
  flagged: { variant: 'warning', icon: AlertTriangle },

  // Verification status
  verified: { variant: 'success', icon: Shield },
  unverified: { variant: 'neutral', icon: Eye },

  // Content status
  draft: { variant: 'neutral', icon: Clock },
  pending_review: { variant: 'pending', icon: Clock },
  revision_needed: { variant: 'warning', icon: AlertTriangle },
  published: { variant: 'success', icon: CheckCircle2 },
  archived: { variant: 'neutral', icon: EyeOff },

  // Feature status
  featured: { variant: 'premium', icon: Star },
};

const variantStyles: Record<StatusVariant, string> = {
  success: 'bg-emerald-500/10 text-emerald-400',
  warning: 'bg-amber-500/10 text-amber-400',
  error: 'bg-red-500/10 text-red-400',
  info: 'bg-blue-500/10 text-blue-400',
  pending: 'bg-amber-500/10 text-amber-400',
  neutral: 'bg-slate-500/10 text-slate-400',
  premium: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
};

const sizeStyles = {
  sm: 'px-2 py-0.5 text-xs gap-1',
  md: 'px-2.5 py-1 text-xs gap-1.5',
};

const iconSizes = {
  sm: 'w-3 h-3',
  md: 'w-3.5 h-3.5',
};

export function StatusBadge({
  status,
  variant,
  icon = 'auto',
  size = 'md',
  className,
}: StatusBadgeProps) {
  // Normalize status for lookup
  const normalizedStatus = status.toLowerCase().replace(/\s+/g, '_');

  // Get configuration
  const config = statusConfig[normalizedStatus];
  const resolvedVariant = variant || config?.variant || 'neutral';
  const ResolvedIcon = icon === 'auto'
    ? config?.icon || Clock
    : icon || config?.icon;

  // Format display text
  const displayText = status
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-lg font-medium',
        variantStyles[resolvedVariant],
        sizeStyles[size],
        className
      )}
    >
      {ResolvedIcon && <ResolvedIcon className={iconSizes[size]} />}
      {displayText}
    </span>
  );
}

// Role badge component
export interface RoleBadgeProps {
  role: string;
  size?: 'sm' | 'md';
  className?: string;
}

const roleStyles: Record<string, string> = {
  PATIENT: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  PRACTITIONER: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  ADMIN: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  MODERATOR: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
};

export function RoleBadge({ role, size = 'md', className }: RoleBadgeProps) {
  const roleStyle = roleStyles[role.toUpperCase()] || roleStyles.PATIENT;

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-lg font-medium border',
        roleStyle,
        sizeStyles[size],
        className
      )}
    >
      {role.charAt(0) + role.slice(1).toLowerCase()}
    </span>
  );
}

// Tier badge component
export interface TierBadgeProps {
  tier: string;
  size?: 'sm' | 'md';
  className?: string;
}

const tierStyles: Record<string, string> = {
  FREE: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
  PROFESSIONAL: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
  PREMIUM: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  ELITE: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  ENTERPRISE: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
};

export function TierBadge({ tier, size = 'md', className }: TierBadgeProps) {
  const tierStyle = tierStyles[tier.toUpperCase()] || tierStyles.FREE;

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-lg font-medium border',
        tierStyle,
        sizeStyles[size],
        className
      )}
    >
      {tier.charAt(0) + tier.slice(1).toLowerCase()}
    </span>
  );
}
