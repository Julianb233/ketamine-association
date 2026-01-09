'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, ChevronDown, Users, CreditCard, LayoutDashboard, ShoppingCart, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { cn } from '@/lib/utils';
import { useCart } from '@/lib/cart-context';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

interface NavLink {
  name: string;
  href: string;
}

interface DropdownItem {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  description?: string;
  requiresAuth?: boolean;
}

const mainNavLinks: NavLink[] = [
  { name: 'Find Providers', href: '/providers' },
  { name: 'Education', href: '/education' },
  { name: 'Articles', href: '/articles' },
  { name: 'Events', href: '/events' },
  { name: 'Store', href: '/store' },
];

const practitionerDropdown: DropdownItem[] = [
  {
    name: 'Why Join',
    href: '/association/membership',
    icon: Users,
    description: 'Discover the benefits of membership',
  },
  {
    name: 'Pricing',
    href: '/association/pricing',
    icon: CreditCard,
    description: 'View membership tiers and pricing',
  },
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    description: 'Access your practice dashboard',
    requiresAuth: true,
  },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { itemCount, isInitialized } = useCart();
  const supabase = createClient();

  // Get user on mount and listen for auth changes
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
    setUserMenuOpen(false);
  }, [pathname]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  const isSignedIn = !!user;
  const userInitial = user?.email?.charAt(0).toUpperCase() || 'U';
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm'
          : 'bg-white border-b border-slate-200'
      )}
    >
      <Container>
        <nav className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center shadow-md shadow-teal-500/20">
              <span className="text-white font-bold text-xl">K</span>
            </div>
            <div className="hidden sm:flex flex-col sm:flex-row sm:items-baseline">
              <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent">
                Ketamine
              </span>
              <span className="text-xl font-bold text-slate-800 sm:ml-1.5">
                Association
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {mainNavLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  'px-4 py-2 text-sm font-medium transition-colors rounded-lg',
                  pathname === link.href
                    ? 'text-teal-600 bg-teal-50'
                    : 'text-slate-600 hover:text-teal-600 hover:bg-slate-50'
                )}
              >
                {link.name}
              </Link>
            ))}

            {/* For Practitioners Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onMouseEnter={() => setDropdownOpen(true)}
                className={cn(
                  'flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors rounded-lg',
                  dropdownOpen || pathname.startsWith('/association') || pathname === '/dashboard'
                    ? 'text-teal-600 bg-teal-50'
                    : 'text-slate-600 hover:text-teal-600 hover:bg-slate-50'
                )}
              >
                For Practitioners
                <ChevronDown
                  className={cn(
                    'w-4 h-4 transition-transform duration-200',
                    dropdownOpen ? 'rotate-180' : ''
                  )}
                />
              </button>

              {/* Dropdown Menu */}
              <div
                onMouseLeave={() => setDropdownOpen(false)}
                className={cn(
                  'absolute left-0 top-full mt-2 w-72 rounded-xl bg-white shadow-lg shadow-slate-200/50 border border-slate-200 overflow-hidden transition-all duration-200 origin-top-left',
                  dropdownOpen
                    ? 'opacity-100 scale-100 visible'
                    : 'opacity-0 scale-95 invisible'
                )}
              >
                <div className="p-2">
                  {practitionerDropdown.map((item) => {
                    if (item.requiresAuth && !isSignedIn) return null;
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          'flex items-start gap-3 p-3 rounded-lg transition-colors group',
                          pathname === item.href
                            ? 'bg-teal-50 text-teal-700'
                            : 'hover:bg-slate-50'
                        )}
                      >
                        {Icon && (
                          <div className={cn(
                            'mt-0.5 p-2 rounded-lg transition-colors',
                            pathname === item.href
                              ? 'bg-teal-100 text-teal-600'
                              : 'bg-slate-100 text-slate-500 group-hover:bg-teal-100 group-hover:text-teal-600'
                          )}>
                            <Icon className="w-4 h-4" />
                          </div>
                        )}
                        <div>
                          <div className={cn(
                            'font-medium text-sm',
                            pathname === item.href ? 'text-teal-700' : 'text-slate-700'
                          )}>
                            {item.name}
                          </div>
                          {item.description && (
                            <div className="text-xs text-slate-500 mt-0.5">
                              {item.description}
                            </div>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Cart Icon & Desktop Auth */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Cart Icon */}
            <Link
              href="/store/cart"
              className={cn(
                'relative p-2 rounded-lg transition-colors',
                pathname === '/store/cart'
                  ? 'text-teal-600 bg-teal-50'
                  : 'text-slate-600 hover:text-teal-600 hover:bg-slate-50'
              )}
              aria-label="View cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {isInitialized && itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-teal-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </Link>

            {!loading && !isSignedIn && (
              <>
                <Link href="/sign-in">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button variant="primary" size="sm">
                    Join Now
                  </Button>
                </Link>
              </>
            )}

            {!loading && isSignedIn && (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm">
                    Dashboard
                  </Button>
                </Link>

                {/* User Menu */}
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="w-9 h-9 rounded-full bg-teal-600 text-white font-semibold flex items-center justify-center ring-2 ring-slate-100 hover:ring-teal-200 transition-all"
                  >
                    {userInitial}
                  </button>

                  <div
                    className={cn(
                      'absolute right-0 top-full mt-2 w-56 rounded-xl bg-white shadow-lg shadow-slate-200/50 border border-slate-200 overflow-hidden transition-all duration-200 origin-top-right',
                      userMenuOpen
                        ? 'opacity-100 scale-100 visible'
                        : 'opacity-0 scale-95 invisible'
                    )}
                  >
                    <div className="p-3 border-b border-slate-100">
                      <div className="font-medium text-slate-900 truncate">{userName}</div>
                      <div className="text-xs text-slate-500 truncate">{user?.email}</div>
                    </div>
                    <div className="p-2">
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Mobile Cart & Menu */}
          <div className="lg:hidden flex items-center gap-2">
            {/* Mobile Cart Icon */}
            <Link
              href="/store/cart"
              className={cn(
                'relative p-2 rounded-lg transition-colors',
                pathname === '/store/cart'
                  ? 'text-teal-600 bg-teal-50'
                  : 'text-slate-600 hover:text-teal-600 hover:bg-slate-50'
              )}
              aria-label="View cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {isInitialized && itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-teal-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-slate-700" />
              ) : (
                <Menu className="w-6 h-6 text-slate-700" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div
          className={cn(
            'lg:hidden overflow-hidden transition-all duration-300 ease-in-out',
            mobileMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <div className="py-4 border-t border-slate-200">
            <div className="space-y-1">
              {mainNavLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    'block px-4 py-3 rounded-lg font-medium transition-colors',
                    pathname === link.href
                      ? 'text-teal-600 bg-teal-50'
                      : 'text-slate-600 hover:text-teal-600 hover:bg-slate-50'
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              {/* For Practitioners Section in Mobile */}
              <div className="pt-2">
                <div className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  For Practitioners
                </div>
                {practitionerDropdown.map((item) => {
                  if (item.requiresAuth && !isSignedIn) return null;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors',
                        pathname === item.href
                          ? 'text-teal-600 bg-teal-50'
                          : 'text-slate-600 hover:text-teal-600 hover:bg-slate-50'
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {Icon && <Icon className="w-5 h-5" />}
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Mobile Auth Section */}
            <div className="mt-6 pt-6 border-t border-slate-200 space-y-3 px-4">
              {!loading && !isSignedIn && (
                <>
                  <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" fullWidth>
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/sign-up" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="primary" fullWidth>
                      Join Now
                    </Button>
                  </Link>
                </>
              )}

              {!loading && isSignedIn && (
                <>
                  <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" fullWidth className="mb-3">
                      Go to Dashboard
                    </Button>
                  </Link>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-teal-600 text-white font-semibold flex items-center justify-center">
                        {userInitial}
                      </div>
                      <div className="text-sm">
                        <div className="font-medium text-slate-700">{userName}</div>
                        <div className="text-slate-500 text-xs truncate max-w-[150px]">{user?.email}</div>
                      </div>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      aria-label="Sign out"
                    >
                      <LogOut className="w-5 h-5" />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}

export default Header;
