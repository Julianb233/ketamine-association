'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  User,
  GraduationCap,
  Award,
  FileText,
  Calendar,
  Settings,
  Bell,
  CreditCard,
  BookOpen,
  MessageSquare,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react';

interface SidebarLink {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string | number;
}

interface SidebarSection {
  title: string;
  links: SidebarLink[];
}

const sidebarSections: SidebarSection[] = [
  {
    title: 'Overview',
    links: [
      {
        label: 'Dashboard',
        href: '/dashboard',
        icon: <LayoutDashboard className="h-5 w-5" />,
      },
      {
        label: 'Profile',
        href: '/dashboard/profile',
        icon: <User className="h-5 w-5" />,
      },
      {
        label: 'Notifications',
        href: '/dashboard/notifications',
        icon: <Bell className="h-5 w-5" />,
        badge: 3,
      },
    ],
  },
  {
    title: 'Learning',
    links: [
      {
        label: 'My Courses',
        href: '/dashboard/courses',
        icon: <GraduationCap className="h-5 w-5" />,
      },
      {
        label: 'Certifications',
        href: '/dashboard/certifications',
        icon: <Award className="h-5 w-5" />,
      },
      {
        label: 'CE Credits',
        href: '/dashboard/ce-credits',
        icon: <BookOpen className="h-5 w-5" />,
      },
      {
        label: 'Resources',
        href: '/dashboard/resources',
        icon: <FileText className="h-5 w-5" />,
      },
    ],
  },
  {
    title: 'Community',
    links: [
      {
        label: 'Events',
        href: '/dashboard/events',
        icon: <Calendar className="h-5 w-5" />,
      },
      {
        label: 'Messages',
        href: '/dashboard/messages',
        icon: <MessageSquare className="h-5 w-5" />,
        badge: 5,
      },
    ],
  },
  {
    title: 'Account',
    links: [
      {
        label: 'Billing',
        href: '/dashboard/billing',
        icon: <CreditCard className="h-5 w-5" />,
      },
      {
        label: 'Settings',
        href: '/dashboard/settings',
        icon: <Settings className="h-5 w-5" />,
      },
      {
        label: 'Help & Support',
        href: '/dashboard/support',
        icon: <HelpCircle className="h-5 w-5" />,
      },
    ],
  },
];

interface SidebarProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
    role?: string;
  };
}

export default function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const defaultUser = {
    name: 'Dr. Jane Smith',
    email: 'jane.smith@example.com',
    role: 'Certified Practitioner',
    avatar: undefined,
    ...user,
  };

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-teal-600 text-white shadow-lg hover:bg-teal-700 transition-colors"
        aria-label="Toggle sidebar"
      >
        {isMobileOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen bg-white border-r border-gray-200 transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-72'
        } ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between px-4 border-b border-gray-100">
            {!isCollapsed && (
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 text-white font-bold text-sm">
                  KA
                </div>
                <span className="font-semibold text-gray-900">Dashboard</span>
              </Link>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCollapsed ? (
                <ChevronRight className="h-5 w-5" />
              ) : (
                <ChevronLeft className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* User Profile */}
          <div className={`p-4 border-b border-gray-100 ${isCollapsed ? 'flex justify-center' : ''}`}>
            <div className={`flex items-center gap-3 ${isCollapsed ? 'flex-col' : ''}`}>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-teal-600 text-white font-semibold text-lg">
                {defaultUser.avatar ? (
                  <img
                    src={defaultUser.avatar}
                    alt={defaultUser.name}
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  defaultUser.name.charAt(0)
                )}
              </div>
              {!isCollapsed && (
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900 truncate">
                    {defaultUser.name}
                  </p>
                  <p className="text-xs text-teal-600 truncate">
                    {defaultUser.role}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <div className="space-y-6">
              {sidebarSections.map((section) => (
                <div key={section.title}>
                  {!isCollapsed && (
                    <h3 className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {section.title}
                    </h3>
                  )}
                  <ul className="space-y-1">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                            isActive(link.href)
                              ? 'bg-teal-50 text-teal-700'
                              : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                          } ${isCollapsed ? 'justify-center' : ''}`}
                          title={isCollapsed ? link.label : undefined}
                        >
                          <span
                            className={
                              isActive(link.href)
                                ? 'text-teal-600'
                                : 'text-gray-500'
                            }
                          >
                            {link.icon}
                          </span>
                          {!isCollapsed && (
                            <>
                              <span className="flex-1 text-sm font-medium">
                                {link.label}
                              </span>
                              {link.badge && (
                                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-teal-100 px-1.5 text-xs font-medium text-teal-700">
                                  {link.badge}
                                </span>
                              )}
                            </>
                          )}
                          {isCollapsed && link.badge && (
                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-teal-500 text-[10px] font-medium text-white">
                              {link.badge}
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </nav>

          {/* Footer / Logout */}
          <div className="p-3 border-t border-gray-100">
            <button
              className={`flex w-full items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors ${
                isCollapsed ? 'justify-center' : ''
              }`}
              title={isCollapsed ? 'Sign Out' : undefined}
            >
              <LogOut className="h-5 w-5" />
              {!isCollapsed && (
                <span className="text-sm font-medium">Sign Out</span>
              )}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
