'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  User,
  Users,
  Star,
  BarChart3,
  Settings,
  Menu,
  X,
  LogOut,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar } from '@/components/ui/Avatar';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    label: 'Overview',
    href: '/dashboard',
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    label: 'Profile',
    href: '/dashboard/profile',
    icon: <User className="h-5 w-5" />,
  },
  {
    label: 'Leads',
    href: '/dashboard/leads',
    icon: <Users className="h-5 w-5" />,
  },
  {
    label: 'Reviews',
    href: '/dashboard/reviews',
    icon: <Star className="h-5 w-5" />,
  },
  {
    label: 'Analytics',
    href: '/dashboard/analytics',
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    label: 'Settings',
    href: '/dashboard/settings',
    icon: <Settings className="h-5 w-5" />,
  },
];

function SidebarContent({
  pathname,
  onNavigate
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-slate-200">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">K</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-900 text-sm">Ketamine</span>
            <span className="text-xs text-slate-500">Association</span>
          </div>
        </Link>
      </div>

      {/* User Profile Section */}
      <div className="p-4 border-b border-slate-200">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
          <Avatar name="Dr. Sarah Johnson" size="lg" />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-slate-900 text-sm truncate">Dr. Sarah Johnson</p>
            <p className="text-xs text-slate-500 truncate">Premium Member</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href ||
            (item.href !== '/dashboard' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-teal-50 text-teal-700 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              )}
            >
              <span className={cn(
                'transition-colors',
                isActive ? 'text-teal-600' : 'text-slate-400'
              )}>
                {item.icon}
              </span>
              {item.label}
              {isActive && (
                <ChevronRight className="ml-auto h-4 w-4 text-teal-500" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Quick Actions */}
      <div className="p-4 border-t border-slate-200 space-y-2">
        <Link
          href="/practitioners/dr-sarah-johnson"
          className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-600 hover:text-teal-700 hover:bg-slate-50 rounded-lg transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
          View Public Profile
        </Link>
        <button className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
        >
          <X className="h-5 w-5" />
        </button>
        <SidebarContent pathname={pathname} onNavigate={() => setSidebarOpen(false)} />
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-30 lg:block lg:w-72 lg:bg-white lg:border-r lg:border-slate-200">
        <SidebarContent pathname={pathname} />
      </aside>

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Mobile header */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 lg:hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 -ml-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">K</span>
              </div>
              <span className="font-semibold text-slate-900">Dashboard</span>
            </div>
            <Avatar name="Dr. Sarah Johnson" size="sm" />
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
