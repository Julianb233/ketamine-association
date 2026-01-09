'use client';

import { cn } from '@/lib/utils';

type BillingCycle = 'monthly' | 'annual';

interface PricingToggleProps {
  value: BillingCycle;
  onChange: (value: BillingCycle) => void;
  savingsPercent?: number;
  className?: string;
}

export function PricingToggle({
  value,
  onChange,
  savingsPercent = 20,
  className,
}: PricingToggleProps) {
  return (
    <div className={cn('flex items-center justify-center gap-3', className)}>
      <span
        className={cn(
          'text-sm font-medium transition-colors',
          value === 'monthly' ? 'text-slate-900' : 'text-slate-500'
        )}
      >
        Monthly
      </span>

      {/* Toggle switch */}
      <button
        type="button"
        role="switch"
        aria-checked={value === 'annual'}
        onClick={() => onChange(value === 'monthly' ? 'annual' : 'monthly')}
        className={cn(
          'relative inline-flex h-8 w-14 items-center rounded-full transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2',
          value === 'annual' ? 'bg-teal-600' : 'bg-slate-300'
        )}
      >
        <span
          className={cn(
            'inline-block h-6 w-6 transform rounded-full bg-white shadow-md transition-transform',
            value === 'annual' ? 'translate-x-7' : 'translate-x-1'
          )}
        />
      </button>

      <div className="flex items-center gap-2">
        <span
          className={cn(
            'text-sm font-medium transition-colors',
            value === 'annual' ? 'text-slate-900' : 'text-slate-500'
          )}
        >
          Annual
        </span>

        {/* Savings badge */}
        <span className="inline-flex items-center bg-emerald-100 text-emerald-700 text-xs font-semibold px-2 py-0.5 rounded-full">
          Save {savingsPercent}%
        </span>
      </div>
    </div>
  );
}
