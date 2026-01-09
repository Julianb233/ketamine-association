'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Search,
  MapPin,
  Filter,
  X,
  Star,
  ChevronLeft,
  ChevronRight,
  Shield,
  Users,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { cn } from '@/lib/utils';

// Treatment type display labels
const TREATMENT_LABELS: Record<string, string> = {
  IV_INFUSION: 'IV Infusion',
  IM_INJECTION: 'IM Injection',
  NASAL_SPRAY: 'Nasal Spray (Spravato)',
  ORAL_SUBLINGUAL: 'Oral/Sublingual',
  KETAMINE_ASSISTED_PSYCHOTHERAPY: 'Ketamine-Assisted Psychotherapy (KAP)',
};

// Filter options
const TREATMENT_OPTIONS = [
  { value: 'IV_INFUSION', label: 'IV Infusion' },
  { value: 'IM_INJECTION', label: 'IM Injection' },
  { value: 'NASAL_SPRAY', label: 'Nasal Spray (Spravato)' },
  { value: 'ORAL_SUBLINGUAL', label: 'Oral/Sublingual' },
  { value: 'KETAMINE_ASSISTED_PSYCHOTHERAPY', label: 'Ketamine-Assisted Psychotherapy' },
];

const CONDITION_OPTIONS = [
  { value: 'TREATMENT_RESISTANT_DEPRESSION', label: 'Treatment-Resistant Depression' },
  { value: 'CHRONIC_PAIN', label: 'Chronic Pain' },
  { value: 'PTSD', label: 'PTSD' },
  { value: 'ANXIETY', label: 'Anxiety' },
  { value: 'OCD', label: 'OCD' },
  { value: 'BIPOLAR_DEPRESSION', label: 'Bipolar Depression' },
  { value: 'FIBROMYALGIA', label: 'Fibromyalgia' },
  { value: 'CRPS', label: 'CRPS' },
  { value: 'SUICIDAL_IDEATION', label: 'Suicidal Ideation' },
];

interface Provider {
  id: string;
  slug: string;
  title: string | null;
  firstName: string;
  lastName: string;
  credentials: string | null;
  specialty: string | null;
  bio: string | null;
  profileImage: string | null;
  practiceName: string | null;
  city: string | null;
  state: string | null;
  rating: number;
  reviewCount: number;
  membershipTier: 'FREE' | 'PROFESSIONAL' | 'PREMIUM' | 'ELITE' | 'ENTERPRISE';
  isVerified: boolean;
  treatments: string[];
  conditions: string[];
}

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

function StarRating({ rating, count }: { rating: number; count: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={cn(
              'w-4 h-4',
              i < fullStars
                ? 'text-amber-400 fill-amber-400'
                : i === fullStars && hasHalfStar
                ? 'text-amber-400 fill-amber-400/50'
                : 'text-slate-300 fill-slate-300'
            )}
          />
        ))}
      </div>
      <span className="text-sm text-slate-600">
        {rating.toFixed(1)} ({count} review{count !== 1 ? 's' : ''})
      </span>
    </div>
  );
}

function ProviderCard({ provider }: { provider: Provider }) {
  const fullName = `${provider.title ? provider.title + ' ' : ''}${provider.firstName} ${provider.lastName}${
    provider.credentials ? ', ' + provider.credentials : ''
  }`;
  const location =
    provider.city && provider.state
      ? `${provider.city}, ${provider.state}`
      : provider.city || provider.state || '';
  const isFeatured =
    provider.membershipTier === 'PREMIUM' ||
    provider.membershipTier === 'ELITE' ||
    provider.membershipTier === 'ENTERPRISE';

  return (
    <Card
      hover
      className={cn(
        'relative overflow-hidden transition-all duration-300',
        isFeatured && 'ring-2 ring-teal-500 ring-offset-2'
      )}
    >
      {isFeatured && (
        <div className="absolute top-0 right-0">
          <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg shadow-sm">
            Featured
          </div>
        </div>
      )}

      <div className="flex flex-col items-center text-center">
        <div className="relative mb-4">
          <Avatar
            src={provider.profileImage}
            name={`${provider.firstName} ${provider.lastName}`}
            size="xl"
            className="ring-4 ring-teal-50"
          />
          {provider.isVerified && (
            <div
              className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-1 shadow-md"
              title="Verified Provider"
            >
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-1">{fullName}</h3>

        {provider.practiceName && (
          <p className="text-sm text-slate-600 mb-2">{provider.practiceName}</p>
        )}

        {location && (
          <div className="flex items-center gap-1.5 text-sm text-slate-500 mb-3">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
        )}

        <div className="mb-4">
          <StarRating rating={provider.rating} count={provider.reviewCount} />
        </div>

        {provider.treatments.length > 0 && (
          <div className="flex flex-wrap justify-center gap-1.5 mb-4">
            {provider.treatments.slice(0, 3).map((treatment) => (
              <Badge key={treatment} variant="primary" size="sm">
                {TREATMENT_LABELS[treatment] || treatment}
              </Badge>
            ))}
            {provider.treatments.length > 3 && (
              <Badge variant="outline" size="sm">
                +{provider.treatments.length - 3} more
              </Badge>
            )}
          </div>
        )}

        <Button href={`/providers/${provider.slug}`} variant="secondary" size="sm" className="mt-auto">
          View Profile
        </Button>
      </div>
    </Card>
  );
}

function ProviderCardSkeleton() {
  return (
    <Card className="animate-pulse">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 bg-slate-200 rounded-full mb-4" />
        <div className="h-5 bg-slate-200 rounded w-32 mb-2" />
        <div className="h-4 bg-slate-200 rounded w-24 mb-2" />
        <div className="h-4 bg-slate-200 rounded w-20 mb-3" />
        <div className="flex gap-1.5 mb-4">
          <div className="h-4 bg-slate-200 rounded w-24" />
        </div>
        <div className="flex gap-1.5 mb-4">
          <div className="h-6 bg-slate-200 rounded-full w-16" />
          <div className="h-6 bg-slate-200 rounded-full w-20" />
        </div>
        <div className="h-9 bg-slate-200 rounded-lg w-28" />
      </div>
    </Card>
  );
}

interface FilterCheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function FilterCheckbox({ label, checked, onChange }: FilterCheckboxProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex items-center gap-3 cursor-pointer group w-full text-left"
    >
      <div
        className={cn(
          'w-5 h-5 rounded border-2 flex items-center justify-center transition-colors',
          checked ? 'bg-teal-600 border-teal-600' : 'border-slate-300 group-hover:border-teal-400'
        )}
      >
        {checked && (
          <svg
            className="w-3 h-3 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <span className={cn('text-sm transition-colors', checked ? 'text-slate-900 font-medium' : 'text-slate-600')}>
        {label}
      </span>
    </button>
  );
}

function FilterSidebar({
  selectedTreatments,
  selectedConditions,
  minRating,
  verifiedOnly,
  onTreatmentsChange,
  onConditionsChange,
  onMinRatingChange,
  onVerifiedOnlyChange,
  onClearFilters,
}: {
  selectedTreatments: string[];
  selectedConditions: string[];
  minRating: number;
  verifiedOnly: boolean;
  onTreatmentsChange: (treatments: string[]) => void;
  onConditionsChange: (conditions: string[]) => void;
  onMinRatingChange: (rating: number) => void;
  onVerifiedOnlyChange: (verified: boolean) => void;
  onClearFilters: () => void;
}) {
  const hasActiveFilters =
    selectedTreatments.length > 0 || selectedConditions.length > 0 || minRating > 0 || verifiedOnly;

  const toggleTreatment = (value: string) => {
    if (selectedTreatments.includes(value)) {
      onTreatmentsChange(selectedTreatments.filter((t) => t !== value));
    } else {
      onTreatmentsChange([...selectedTreatments, value]);
    }
  };

  const toggleCondition = (value: string) => {
    if (selectedConditions.includes(value)) {
      onConditionsChange(selectedConditions.filter((c) => c !== value));
    } else {
      onConditionsChange([...selectedConditions, value]);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sticky top-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filters
        </h3>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
            Clear all
          </button>
        )}
      </div>

      {/* Treatment Types */}
      <div className="mb-6">
        <h4 className="font-medium text-slate-900 mb-3">Treatment Type</h4>
        <div className="space-y-2.5">
          {TREATMENT_OPTIONS.map((option) => (
            <FilterCheckbox
              key={option.value}
              label={option.label}
              checked={selectedTreatments.includes(option.value)}
              onChange={() => toggleTreatment(option.value)}
            />
          ))}
        </div>
      </div>

      {/* Conditions Treated */}
      <div className="mb-6">
        <h4 className="font-medium text-slate-900 mb-3">Conditions Treated</h4>
        <div className="space-y-2.5 max-h-48 overflow-y-auto">
          {CONDITION_OPTIONS.map((option) => (
            <FilterCheckbox
              key={option.value}
              label={option.label}
              checked={selectedConditions.includes(option.value)}
              onChange={() => toggleCondition(option.value)}
            />
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div className="mb-6">
        <h4 className="font-medium text-slate-900 mb-3">Minimum Rating</h4>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => onMinRatingChange(star === minRating ? 0 : star)}
              className="p-1 transition-transform hover:scale-110"
            >
              <Star
                className={cn(
                  'w-6 h-6',
                  star <= minRating
                    ? 'fill-amber-400 text-amber-400'
                    : 'fill-slate-200 text-slate-200 hover:fill-amber-200 hover:text-amber-200'
                )}
              />
            </button>
          ))}
          {minRating > 0 && <span className="ml-2 text-sm text-slate-500 self-center">{minRating}+ stars</span>}
        </div>
      </div>

      {/* Verified Only */}
      <div className="mb-6">
        <FilterCheckbox
          label="Verified Providers Only"
          checked={verifiedOnly}
          onChange={onVerifiedOnlyChange}
        />
      </div>

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <Button variant="outline" size="sm" fullWidth onClick={onClearFilters}>
          Clear All Filters
        </Button>
      )}
    </div>
  );
}

function Pagination({
  pagination,
  onPageChange,
}: {
  pagination: PaginationInfo;
  onPageChange: (page: number) => void;
}) {
  const { page, totalPages, hasNextPage, hasPreviousPage } = pagination;

  if (totalPages <= 1) return null;

  const pages: (number | 'ellipsis')[] = [];
  const showEllipsisStart = page > 3;
  const showEllipsisEnd = page < totalPages - 2;

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);
    if (showEllipsisStart) pages.push('ellipsis');
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
      if (!pages.includes(i)) pages.push(i);
    }
    if (showEllipsisEnd) pages.push('ellipsis');
    if (!pages.includes(totalPages)) pages.push(totalPages);
  }

  return (
    <nav className="flex items-center justify-center gap-2 mt-8" aria-label="Pagination">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={!hasPreviousPage}
        className={cn(
          'flex items-center gap-1 px-3 py-2 rounded-lg border border-slate-300 text-sm font-medium transition-colors',
          hasPreviousPage ? 'hover:bg-slate-50 hover:border-slate-400' : 'opacity-50 cursor-not-allowed'
        )}
      >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </button>

      {pages.map((p, idx) =>
        p === 'ellipsis' ? (
          <span key={`ellipsis-${idx}`} className="px-2 text-slate-400">
            ...
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={cn(
              'w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors',
              p === page
                ? 'bg-teal-600 text-white'
                : 'border border-slate-300 hover:bg-slate-50 hover:border-slate-400'
            )}
            aria-current={p === page ? 'page' : undefined}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={!hasNextPage}
        className={cn(
          'flex items-center gap-1 px-3 py-2 rounded-lg border border-slate-300 text-sm font-medium transition-colors',
          hasNextPage ? 'hover:bg-slate-50 hover:border-slate-400' : 'opacity-50 cursor-not-allowed'
        )}
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
}

function NoResults({ onClearFilters }: { onClearFilters: () => void }) {
  return (
    <div className="text-center py-16 bg-slate-50 rounded-2xl">
      <Search className="w-16 h-16 mx-auto text-slate-300 mb-4" />
      <h3 className="text-lg font-semibold text-slate-900 mb-2">No providers found</h3>
      <p className="text-slate-600 mb-6 max-w-md mx-auto">
        We could not find any providers matching your search criteria. Try adjusting your filters or search terms.
      </p>
      <Button onClick={onClearFilters} variant="secondary">
        Clear Filters
      </Button>
    </div>
  );
}

function ProvidersDirectoryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State
  const [providers, setProviders] = useState<Provider[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [selectedTreatments, setSelectedTreatments] = useState<string[]>(
    searchParams.get('treatment')?.split(',').filter(Boolean) || []
  );
  const [selectedConditions, setSelectedConditions] = useState<string[]>(
    searchParams.get('condition')?.split(',').filter(Boolean) || []
  );
  const [minRating, setMinRating] = useState(parseInt(searchParams.get('rating') || '0', 10));
  const [verifiedOnly, setVerifiedOnly] = useState(searchParams.get('verified') === 'true');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Fetch providers
  const fetchProviders = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (location) params.set('location', location);
      if (selectedTreatments.length > 0) params.set('treatment', selectedTreatments[0]); // API takes single treatment
      if (selectedConditions.length > 0) params.set('condition', selectedConditions[0]); // API takes single condition
      params.set('page', searchParams.get('page') || '1');
      params.set('limit', '12');

      const response = await fetch(`/api/providers/search?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        // Apply client-side filtering for rating and verified
        let filteredProviders = data.data.providers;
        if (minRating > 0) {
          filteredProviders = filteredProviders.filter((p: Provider) => p.rating >= minRating);
        }
        if (verifiedOnly) {
          filteredProviders = filteredProviders.filter((p: Provider) => p.isVerified);
        }
        setProviders(filteredProviders);
        setPagination(data.data.pagination);
      }
    } catch (error) {
      console.error('Failed to fetch providers:', error);
    } finally {
      setIsLoading(false);
    }
  }, [location, selectedTreatments, selectedConditions, minRating, verifiedOnly, searchParams]);

  useEffect(() => {
    fetchProviders();
  }, [fetchProviders]);

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateUrlParams({ location, page: '1' });
  };

  // Update URL params
  const updateUrlParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    router.push(`/providers?${params.toString()}`);
  };

  // Clear all filters
  const clearFilters = () => {
    setLocation('');
    setSelectedTreatments([]);
    setSelectedConditions([]);
    setMinRating(0);
    setVerifiedOnly(false);
    router.push('/providers');
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    updateUrlParams({ page: page.toString() });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-700 via-teal-600 to-emerald-600 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <Container className="relative py-16 lg:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" size="lg" className="mb-6 bg-white/20 text-white border-0">
              500+ Verified Providers
            </Badge>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Find a Ketamine Therapy Provider
            </h1>

            <p className="text-xl text-teal-100 mb-8">
              Search our directory of verified ketamine therapy practitioners to find qualified providers in your area.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-3 p-3 bg-white rounded-2xl shadow-2xl">
                <div className="flex-1 flex items-center gap-3 px-4">
                  <MapPin className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Enter city, state, or zip code"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none text-lg"
                  />
                </div>
                <Button type="submit" variant="primary" size="lg" className="flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Search
                </Button>
              </div>
            </form>
          </div>
        </Container>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="w-full h-16 sm:h-24"
          >
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="#f8fafc"
            />
          </svg>
        </div>
      </section>

      {/* Directory Content */}
      <section className="py-12">
        <Container>
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-6">
            <Button
              variant="outline"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="w-full flex items-center justify-center gap-2"
            >
              <Filter className="w-5 h-5" />
              {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>
          </div>

          <div className="lg:grid lg:grid-cols-4 lg:gap-8">
            {/* Filters Sidebar */}
            <div className={cn('lg:col-span-1 mb-8 lg:mb-0', showMobileFilters ? 'block' : 'hidden lg:block')}>
              <FilterSidebar
                selectedTreatments={selectedTreatments}
                selectedConditions={selectedConditions}
                minRating={minRating}
                verifiedOnly={verifiedOnly}
                onTreatmentsChange={setSelectedTreatments}
                onConditionsChange={setSelectedConditions}
                onMinRatingChange={setMinRating}
                onVerifiedOnlyChange={setVerifiedOnly}
                onClearFilters={clearFilters}
              />
            </div>

            {/* Results Grid */}
            <div className="lg:col-span-3">
              {isLoading ? (
                <>
                  <div className="mb-6 h-6 bg-slate-200 rounded w-48 animate-pulse" />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                      <ProviderCardSkeleton key={i} />
                    ))}
                  </div>
                </>
              ) : providers.length === 0 ? (
                <NoResults onClearFilters={clearFilters} />
              ) : (
                <>
                  {/* Results Count */}
                  {pagination && (
                    <div className="mb-6 flex items-center justify-between">
                      <p className="text-slate-600">
                        Showing{' '}
                        <span className="font-semibold text-slate-900">
                          {(pagination.page - 1) * pagination.limit + 1}
                        </span>{' '}
                        -{' '}
                        <span className="font-semibold text-slate-900">
                          {Math.min(pagination.page * pagination.limit, pagination.total)}
                        </span>{' '}
                        of <span className="font-semibold text-slate-900">{pagination.total}</span> providers
                      </p>
                    </div>
                  )}

                  {/* Provider Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {providers.map((provider) => (
                      <ProviderCard key={provider.id} provider={provider} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {pagination && <Pagination pagination={pagination} onPageChange={handlePageChange} />}
                </>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white border-t border-slate-200">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Are you a ketamine provider?</h2>
            <p className="text-slate-600 mb-6">
              Join our professional network to connect with patients seeking ketamine therapy and grow your practice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/association/membership" size="lg" className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Join the Association
              </Button>
              <Button href="/association/pricing" variant="secondary" size="lg" className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                View Membership Plans
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default function ProvidersPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600" />
        </div>
      }
    >
      <ProvidersDirectoryContent />
    </Suspense>
  );
}
