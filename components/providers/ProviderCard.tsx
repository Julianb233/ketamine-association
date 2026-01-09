'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import {
  Star,
  MapPin,
  Heart,
  Calendar,
  User,
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';

export type MembershipTier = 'elite' | 'premium' | 'professional' | 'basic';

export interface Provider {
  id: string;
  name: string;
  credentials: string;
  specialty: string;
  city: string;
  state: string;
  rating: number;
  reviewCount: number;
  membershipTier: MembershipTier;
  treatmentTypes: string[];
  nextAvailable?: string;
  imageUrl?: string;
  isSaved?: boolean;
}

interface ProviderCardProps {
  provider: Provider;
  onSave?: (id: string) => void;
  onViewProfile?: (id: string) => void;
  onRequestConsult?: (id: string) => void;
  className?: string;
}

const tierConfig: Record<MembershipTier, { label: string; variant: 'premium' | 'success' | 'warning' | 'default' }> = {
  elite: { label: 'Elite', variant: 'premium' },
  premium: { label: 'Premium', variant: 'success' },
  professional: { label: 'Professional', variant: 'warning' },
  basic: { label: 'Basic', variant: 'default' },
};

function StarRating({ rating, reviewCount }: { rating: number; reviewCount: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={cn(
              'w-4 h-4',
              index < fullStars
                ? 'fill-amber-400 text-amber-400'
                : index === fullStars && hasHalfStar
                ? 'fill-amber-400/50 text-amber-400'
                : 'fill-slate-200 text-slate-200'
            )}
          />
        ))}
      </div>
      <span className="text-sm text-slate-600">
        {rating.toFixed(1)} ({reviewCount} reviews)
      </span>
    </div>
  );
}

export function ProviderCard({
  provider,
  onSave,
  onViewProfile,
  onRequestConsult,
  className,
}: ProviderCardProps) {
  const tierInfo = tierConfig[provider.membershipTier];

  return (
    <Card
      variant="bordered"
      className={cn(
        'relative hover:shadow-xl hover:-translate-y-1',
        className
      )}
    >
      <div className="p-6">
        {/* Header with image, name, and save button */}
        <div className="flex items-start gap-4">
          {/* Profile image or placeholder */}
          <div className="relative flex-shrink-0">
            {provider.imageUrl ? (
              <Image
                src={provider.imageUrl}
                alt={provider.name}
                width={80}
                height={80}
                className="w-20 h-20 rounded-full object-cover border-2 border-slate-100"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center border-2 border-slate-100">
                <User className="w-10 h-10 text-teal-600" />
              </div>
            )}
          </div>

          {/* Name and details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-lg font-bold text-slate-900 truncate">
                  {provider.name}, {provider.credentials}
                </h3>
                <p className="text-sm text-slate-600">{provider.specialty}</p>
              </div>

              {/* Save button */}
              <button
                onClick={() => onSave?.(provider.id)}
                className={cn(
                  'p-2 rounded-full transition-colors',
                  provider.isSaved
                    ? 'text-red-500 hover:bg-red-50'
                    : 'text-slate-400 hover:text-red-500 hover:bg-slate-100'
                )}
                aria-label={provider.isSaved ? 'Remove from saved' : 'Save provider'}
              >
                <Heart
                  className={cn('w-5 h-5', provider.isSaved && 'fill-current')}
                />
              </button>
            </div>

            {/* Location */}
            <div className="flex items-center gap-1 mt-1 text-sm text-slate-500">
              <MapPin className="w-4 h-4" />
              <span>
                {provider.city}, {provider.state}
              </span>
            </div>

            {/* Rating */}
            <div className="mt-2">
              <StarRating rating={provider.rating} reviewCount={provider.reviewCount} />
            </div>
          </div>
        </div>

        {/* Membership tier badge */}
        <div className="mt-4 flex items-center gap-2 flex-wrap">
          <Badge variant={tierInfo.variant} size="sm">
            {tierInfo.label} Provider
          </Badge>

          {/* Next available indicator */}
          {provider.nextAvailable && (
            <div className="flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
              <Calendar className="w-3 h-3" />
              <span>Next: {provider.nextAvailable}</span>
            </div>
          )}
        </div>

        {/* Treatment types */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {provider.treatmentTypes.map((treatment) => (
            <span
              key={treatment}
              className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded"
            >
              {treatment}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="mt-6 flex gap-3">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => onViewProfile?.(provider.id)}
          >
            View Profile
          </Button>
          <Button
            variant="primary"
            size="sm"
            className="flex-1"
            onClick={() => onRequestConsult?.(provider.id)}
          >
            Request Consult
          </Button>
        </div>
      </div>
    </Card>
  );
}
