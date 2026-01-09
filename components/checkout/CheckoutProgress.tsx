'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

interface Step {
  id: string;
  name: string;
  href: string;
}

const steps: Step[] = [
  { id: 'cart', name: 'Cart', href: '/store/cart' },
  { id: 'checkout', name: 'Checkout', href: '/store/checkout' },
  { id: 'success', name: 'Confirmation', href: '/store/checkout/success' },
];

interface CheckoutProgressProps {
  currentStep: 'cart' | 'checkout' | 'success';
}

export function CheckoutProgress({ currentStep }: CheckoutProgressProps) {
  const currentIndex = steps.findIndex((step) => step.id === currentStep);

  return (
    <nav aria-label="Checkout progress" className="mb-8">
      <ol className="flex items-center justify-center">
        {steps.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = step.id === currentStep;
          const isClickable = isCompleted;

          return (
            <li key={step.id} className="flex items-center">
              {isClickable ? (
                <Link
                  href={step.href}
                  className="flex items-center group"
                >
                  <span
                    className={cn(
                      'flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors',
                      'bg-teal-600 text-white group-hover:bg-teal-700'
                    )}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="ml-2 text-sm font-medium text-teal-600 group-hover:text-teal-700 hidden sm:block">
                    {step.name}
                  </span>
                </Link>
              ) : (
                <div className="flex items-center">
                  <span
                    className={cn(
                      'flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium',
                      isCurrent
                        ? 'bg-teal-600 text-white'
                        : 'bg-slate-200 text-slate-500'
                    )}
                  >
                    {index + 1}
                  </span>
                  <span
                    className={cn(
                      'ml-2 text-sm font-medium hidden sm:block',
                      isCurrent ? 'text-teal-600' : 'text-slate-500'
                    )}
                  >
                    {step.name}
                  </span>
                </div>
              )}

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'w-12 sm:w-24 h-0.5 mx-4',
                    index < currentIndex ? 'bg-teal-600' : 'bg-slate-200'
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
