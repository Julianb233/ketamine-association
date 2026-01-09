'use client';

import * as React from 'react';
import { MoreVertical, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ActionMenuItem {
  label: string;
  icon?: LucideIcon;
  onClick: () => void;
  variant?: 'default' | 'success' | 'warning' | 'danger';
  disabled?: boolean;
  divider?: boolean;
}

export interface ActionMenuProps {
  items: ActionMenuItem[];
  className?: string;
  align?: 'left' | 'right';
  triggerIcon?: LucideIcon;
}

const variantClasses = {
  default: 'text-slate-300 hover:bg-slate-700',
  success: 'text-emerald-400 hover:bg-slate-700',
  warning: 'text-amber-400 hover:bg-slate-700',
  danger: 'text-red-400 hover:bg-slate-700',
};

export function ActionMenu({
  items,
  className,
  align = 'right',
  triggerIcon: TriggerIcon = MoreVertical,
}: ActionMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close menu on escape key
  React.useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return (
    <div ref={menuRef} className={cn('relative inline-block', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <TriggerIcon className="w-4 h-4" />
      </button>

      {isOpen && (
        <>
          {/* Backdrop for closing */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Menu dropdown */}
          <div
            className={cn(
              'absolute mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-20 py-1',
              align === 'right' ? 'right-0' : 'left-0'
            )}
            role="menu"
          >
            {items.map((item, index) => (
              <React.Fragment key={index}>
                {item.divider && index > 0 && (
                  <div className="my-1 border-t border-slate-700" />
                )}
                <button
                  onClick={() => {
                    if (!item.disabled) {
                      item.onClick();
                      setIsOpen(false);
                    }
                  }}
                  disabled={item.disabled}
                  className={cn(
                    'w-full px-4 py-2 text-left text-sm flex items-center gap-2 transition-colors',
                    variantClasses[item.variant || 'default'],
                    item.disabled && 'opacity-50 cursor-not-allowed'
                  )}
                  role="menuitem"
                >
                  {item.icon && <item.icon className="w-4 h-4" />}
                  {item.label}
                </button>
              </React.Fragment>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// Inline action buttons for quick actions
export interface InlineActionProps {
  label: string;
  icon?: LucideIcon;
  onClick: () => void;
  variant?: 'default' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md';
}

const inlineVariantClasses = {
  default: 'text-slate-300 hover:text-white hover:bg-slate-800',
  success: 'text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10',
  warning: 'text-amber-400 hover:text-amber-300 hover:bg-amber-500/10',
  danger: 'text-red-400 hover:text-red-300 hover:bg-red-500/10',
};

export function InlineAction({
  label,
  icon: Icon,
  onClick,
  variant = 'default',
  size = 'sm',
}: InlineActionProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-lg font-medium transition-colors',
        inlineVariantClasses[variant],
        size === 'sm' && 'px-2.5 py-1.5 text-xs',
        size === 'md' && 'px-3 py-2 text-sm'
      )}
    >
      {Icon && <Icon className={size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} />}
      {label}
    </button>
  );
}
