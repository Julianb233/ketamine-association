'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Globe,
  Star,
  Shield,
  Award,
  CheckCircle,
  ChevronLeft,
  Heart,
  Share2,
  Navigation,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { LeadForm } from '@/components/forms/LeadForm';
import { cn, formatDate } from '@/lib/utils';

// Treatment type display labels
const TREATMENT_LABELS: Record<string, string> = {
  IV_INFUSION: 'IV Infusion',
  IM_INJECTION: 'IM Injection',
  NASAL_SPRAY: 'Nasal Spray (Spravato)',
  ORAL_SUBLINGUAL: 'Oral/Sublingual',
  KETAMINE_ASSISTED_PSYCHOTHERAPY: 'Ketamine-Assisted Psychotherapy (KAP)',
};

// Condition type display labels
const CONDITION_LABELS: Record<string, string> = {
  TREATMENT_RESISTANT_DEPRESSION: 'Treatment-Resistant Depression',
  CHRONIC_PAIN: 'Chronic Pain',
  PTSD: 'PTSD',
  ANXIETY: 'Anxiety Disorders',
  OCD: 'Obsessive-Compulsive Disorder',
  BIPOLAR_DEPRESSION: 'Bipolar Depression',
  FIBROMYALGIA: 'Fibromyalgia',
  CRPS: 'Complex Regional Pain Syndrome',
  SUICIDAL_IDEATION: 'Acute Suicidal Ideation',
};

// Certification type display labels
const CERTIFICATION_LABELS: Record<string, string> = {
  FOUNDATIONAL: 'Foundational Certification',
  ADVANCED: 'Advanced Certification',
  KAP_SPECIALTY: 'KAP Specialty Certification',
  PRACTICE_LEADERSHIP: 'Practice Leadership Certification',
  MASTER_PRACTITIONER: 'Master Practitioner Certification',
};

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
  address: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
  phone: string | null;
  website: string | null;
  latitude: number | null;
  longitude: number | null;
  rating: number;
  reviewCount: number;
  membershipTier: 'FREE' | 'PROFESSIONAL' | 'PREMIUM' | 'ELITE' | 'ENTERPRISE';
  isVerified: boolean;
  licenseNumber?: string | null;
  licenseState?: string | null;
  npiNumber?: string | null;
  createdAt: string;
  memberSince?: string;
  treatments: string[];
  conditions: string[];
  insurances: string[];
  certifications: {
    id: string;
    type: string;
    issuedAt: string;
    expiresAt: string | null;
  }[];
  reviews: {
    id: string;
    rating: number;
    title: string | null;
    content: string | null;
    createdAt: string;
    isVerified: boolean;
  }[];
}

function StarRating({ rating, size = 'md' }: { rating: number; size?: 'sm' | 'md' | 'lg' }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const sizeClasses = { sm: 'w-4 h-4', md: 'w-5 h-5', lg: 'w-6 h-6' };

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={cn(
            sizeClasses[size],
            i < fullStars
              ? 'text-amber-400 fill-amber-400'
              : i === fullStars && hasHalfStar
              ? 'text-amber-400 fill-amber-400/50'
              : 'text-slate-300 fill-slate-300'
          )}
        />
      ))}
    </div>
  );
}

function ReviewCard({
  review,
}: {
  review: {
    id: string;
    rating: number;
    title: string | null;
    content: string | null;
    createdAt: string;
    isVerified: boolean;
  };
}) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <StarRating rating={review.rating} size="sm" />
            {review.isVerified && (
              <Badge variant="success" size="sm">
                Verified Patient
              </Badge>
            )}
          </div>
          {review.title && <h4 className="font-semibold text-slate-900">{review.title}</h4>}
        </div>
        <span className="text-sm text-slate-500">{formatDate(review.createdAt)}</span>
      </div>
      {review.content && <p className="text-slate-600 leading-relaxed">{review.content}</p>}
    </Card>
  );
}

function ProviderProfileSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50 animate-pulse">
      <div className="bg-gradient-to-br from-teal-700 via-teal-600 to-teal-800 py-12">
        <Container>
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
            <div className="w-32 h-32 lg:w-40 lg:h-40 bg-white/20 rounded-full" />
            <div className="flex-1 text-center lg:text-left">
              <div className="h-8 bg-white/20 rounded w-64 mx-auto lg:mx-0 mb-4" />
              <div className="h-6 bg-white/20 rounded w-48 mx-auto lg:mx-0 mb-4" />
              <div className="h-5 bg-white/20 rounded w-32 mx-auto lg:mx-0" />
            </div>
          </div>
        </Container>
      </div>
      <Container className="py-12">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-xl p-8 h-64" />
            <div className="bg-white rounded-xl p-8 h-48" />
          </div>
          <div className="lg:col-span-1 space-y-6 mt-8 lg:mt-0">
            <div className="bg-white rounded-xl p-6 h-96" />
          </div>
        </div>
      </Container>
    </div>
  );
}

function ProviderNotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <Container>
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-12 h-12 text-slate-400" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Provider Not Found</h1>
          <p className="text-slate-600 mb-8 max-w-md mx-auto">
            We could not find the provider you are looking for. They may have been removed or the link may be incorrect.
          </p>
          <Button href="/providers" variant="primary">
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back to Directory
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default function ProviderProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const [provider, setProvider] = useState<Provider | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    async function fetchProvider() {
      try {
        // Fetch from API - we'll use the existing practitioner endpoint
        const response = await fetch(`/api/providers/${resolvedParams.slug}`);
        if (!response.ok) {
          if (response.status === 404) {
            setNotFound(true);
            return;
          }
          throw new Error('Failed to fetch provider');
        }
        const data = await response.json();
        if (data.success) {
          setProvider(data.data);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error('Error fetching provider:', error);
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProvider();
  }, [resolvedParams.slug]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: provider ? `${provider.firstName} ${provider.lastName} - Ketamine Association` : 'Provider Profile',
          url: window.location.href,
        });
      } catch {
        // User cancelled or share failed
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleLeadFormSubmit = async (formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    condition: string;
    message: string;
  }) => {
    if (!provider) return;

    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        practitionerId: provider.id,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone || null,
        message: formData.message,
        condition: formData.condition || null,
        source: 'DIRECTORY',
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Failed to submit inquiry');
    }
  };

  if (isLoading) {
    return <ProviderProfileSkeleton />;
  }

  if (notFound || !provider) {
    return <ProviderNotFound />;
  }

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
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-700 via-teal-600 to-teal-800 text-white py-12">
        <Container>
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
            {/* Profile Image */}
            <div className="relative flex-shrink-0">
              <Avatar
                src={provider.profileImage}
                name={`${provider.firstName} ${provider.lastName}`}
                size="xl"
                className="w-32 h-32 lg:w-40 lg:h-40 ring-4 ring-white/20 text-2xl"
              />
              {provider.isVerified && (
                <div
                  className="absolute -bottom-2 -right-2 bg-emerald-500 rounded-full p-2 shadow-lg"
                  title="Verified Provider"
                >
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
              )}
            </div>

            {/* Profile Info */}
            <div className="text-center lg:text-left flex-1">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-2">
                {isFeatured && (
                  <Badge variant="accent" size="md">
                    Featured Provider
                  </Badge>
                )}
                {provider.isVerified && (
                  <Badge variant="success" size="md">
                    Verified
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold mb-2">{fullName}</h1>

              {provider.practiceName && <p className="text-xl text-teal-100 mb-2">{provider.practiceName}</p>}

              {location && (
                <div className="flex items-center justify-center lg:justify-start gap-2 text-teal-100 mb-4">
                  <MapPin className="w-5 h-5" />
                  <span>{location}</span>
                </div>
              )}

              {/* Rating */}
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <StarRating rating={provider.rating} size="lg" />
                <span className="text-teal-100">
                  {provider.rating.toFixed(1)} ({provider.reviewCount} review
                  {provider.reviewCount !== 1 ? 's' : ''})
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col gap-3">
              {provider.phone && (
                <Button
                  href={`tel:${provider.phone}`}
                  variant="secondary"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </Button>
              )}
              {provider.website && (
                <Button
                  href={provider.website}
                  variant="secondary"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                >
                  <Globe className="w-5 h-5 mr-2" />
                  Visit Website
                </Button>
              )}
              <div className="flex gap-2">
                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className={cn(
                    'flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors',
                    isSaved
                      ? 'bg-red-500/20 text-red-200 hover:bg-red-500/30'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  )}
                >
                  <Heart className={cn('w-5 h-5', isSaved && 'fill-current')} />
                </button>
                <button
                  onClick={handleShare}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <Container>
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About Section */}
              {provider.bio && (
                <Card className="p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">About</h2>
                  <div className="prose prose-slate max-w-none">
                    <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{provider.bio}</p>
                  </div>
                </Card>
              )}

              {/* Treatments Offered */}
              {provider.treatments.length > 0 && (
                <Card className="p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Treatments Offered</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {provider.treatments.map((treatment) => (
                      <div key={treatment} className="flex items-center gap-3 p-3 bg-teal-50 rounded-lg">
                        <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-5 h-5 text-teal-600" />
                        </div>
                        <span className="font-medium text-slate-900">
                          {TREATMENT_LABELS[treatment] || treatment}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Conditions Treated */}
              {provider.conditions.length > 0 && (
                <Card className="p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Conditions Treated</h2>
                  <div className="flex flex-wrap gap-2">
                    {provider.conditions.map((condition) => (
                      <Badge key={condition} variant="primary" size="lg">
                        {CONDITION_LABELS[condition] || condition}
                      </Badge>
                    ))}
                  </div>
                </Card>
              )}

              {/* Insurance Accepted */}
              {provider.insurances.length > 0 && (
                <Card className="p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Insurance Accepted</h2>
                  <div className="flex flex-wrap gap-2">
                    {provider.insurances.map((insurance) => (
                      <Badge key={insurance} variant="outline" size="lg">
                        {insurance}
                      </Badge>
                    ))}
                  </div>
                </Card>
              )}

              {/* Certifications */}
              {provider.certifications.length > 0 && (
                <Card className="p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Certifications</h2>
                  <div className="space-y-4">
                    {provider.certifications.map((cert) => (
                      <div
                        key={cert.id}
                        className="flex items-start gap-4 p-4 bg-amber-50 rounded-lg border border-amber-100"
                      >
                        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Award className="w-6 h-6 text-amber-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900">
                            {CERTIFICATION_LABELS[cert.type] || cert.type}
                          </h4>
                          <p className="text-sm text-slate-600">
                            Issued: {formatDate(cert.issuedAt)}
                            {cert.expiresAt && ` | Expires: ${formatDate(cert.expiresAt)}`}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Reviews Section */}
              {provider.reviews.length > 0 && (
                <Card className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-slate-900">Patient Reviews</h2>
                    <div className="flex items-center gap-2">
                      <StarRating rating={provider.rating} size="md" />
                      <span className="text-slate-600">
                        {provider.rating.toFixed(1)} ({provider.reviewCount} reviews)
                      </span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {provider.reviews.map((review) => (
                      <ReviewCard key={review.id} review={review} />
                    ))}
                  </div>
                </Card>
              )}
            </div>

            {/* Right Column - Contact & Location */}
            <div className="lg:col-span-1 mt-8 lg:mt-0 space-y-6">
              {/* Contact Form */}
              <Card className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Contact This Provider</h3>
                <LeadForm onSubmit={handleLeadFormSubmit} />
              </Card>

              {/* Location Card */}
              {(provider.address || location) && (
                <Card className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Location</h3>
                  <div className="space-y-3">
                    {provider.address && <p className="text-slate-600">{provider.address}</p>}
                    {location && (
                      <p className="text-slate-600">
                        {location}
                        {provider.zipCode && ` ${provider.zipCode}`}
                      </p>
                    )}

                    {/* Map Placeholder */}
                    <div className="aspect-video bg-slate-100 rounded-lg flex items-center justify-center border border-slate-200 mt-4">
                      <div className="text-center text-slate-400">
                        <MapPin className="w-12 h-12 mx-auto mb-2" />
                        <p className="text-sm">Map coming soon</p>
                      </div>
                    </div>

                    {/* Get Directions Button */}
                    {provider.address && (
                      <Button
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          `${provider.address}, ${location} ${provider.zipCode || ''}`
                        )}`}
                        variant="secondary"
                        fullWidth
                        className="mt-4"
                      >
                        <Navigation className="w-5 h-5 mr-2" />
                        Get Directions
                      </Button>
                    )}
                  </div>
                </Card>
              )}

              {/* Professional Info */}
              <Card className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Professional Information</h3>
                <dl className="space-y-3">
                  {provider.specialty && (
                    <div>
                      <dt className="text-sm font-medium text-slate-500">Specialty</dt>
                      <dd className="text-slate-900">{provider.specialty}</dd>
                    </div>
                  )}
                  {provider.licenseNumber && (
                    <div>
                      <dt className="text-sm font-medium text-slate-500">License Number</dt>
                      <dd className="text-slate-900">
                        {provider.licenseNumber}
                        {provider.licenseState && ` (${provider.licenseState})`}
                      </dd>
                    </div>
                  )}
                  {provider.npiNumber && (
                    <div>
                      <dt className="text-sm font-medium text-slate-500">NPI Number</dt>
                      <dd className="text-slate-900">{provider.npiNumber}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-sm font-medium text-slate-500">Member Since</dt>
                    <dd className="text-slate-900">{formatDate(provider.memberSince || provider.createdAt)}</dd>
                  </div>
                </dl>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* Back to Directory */}
      <section className="py-8 border-t border-slate-200 bg-white">
        <Container>
          <div className="text-center">
            <Link
              href="/providers"
              className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium"
            >
              <ChevronLeft className="w-5 h-5" />
              Back to Provider Directory
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
