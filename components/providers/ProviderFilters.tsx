'use client';

import { useState } from 'react';
import { ChevronDown, Star, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/Button';

export interface FilterState {
  specialty: string;
  treatmentTypes: string[];
  conditions: string[];
  minRating: number;
  distance: number;
}

interface ProviderFiltersProps {
  onFilterChange?: (filters: FilterState) => void;
  onClear?: () => void;
  className?: string;
  specialties?: string[];
  treatmentTypes?: string[];
  conditions?: string[];
}

const defaultSpecialties = [
  'Psychiatry',
  'Anesthesiology',
  'Pain Management',
  'Emergency Medicine',
  'Internal Medicine',
  'Family Medicine',
];

const defaultTreatmentTypes = [
  'IV Infusion',
  'IM Injection',
  'Nasal Spray (Spravato)',
  'Oral/Sublingual',
  'At-Home Treatment',
];

const defaultConditions = [
  'Treatment-Resistant Depression',
  'Major Depressive Disorder',
  'Anxiety Disorders',
  'PTSD',
  'Chronic Pain',
  'Bipolar Depression',
  'OCD',
];

export function ProviderFilters({
  onFilterChange,
  onClear,
  className,
  specialties = defaultSpecialties,
  treatmentTypes = defaultTreatmentTypes,
  conditions = defaultConditions,
}: ProviderFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    specialty: '',
    treatmentTypes: [],
    conditions: [],
    minRating: 0,
    distance: 50,
  });

  const [isSpecialtyOpen, setIsSpecialtyOpen] = useState(false);

  const updateFilters = (updates: Partial<FilterState>) => {
    const newFilters = { ...filters, ...updates };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const toggleTreatmentType = (type: string) => {
    const updated = filters.treatmentTypes.includes(type)
      ? filters.treatmentTypes.filter((t) => t !== type)
      : [...filters.treatmentTypes, type];
    updateFilters({ treatmentTypes: updated });
  };

  const toggleCondition = (condition: string) => {
    const updated = filters.conditions.includes(condition)
      ? filters.conditions.filter((c) => c !== condition)
      : [...filters.conditions, condition];
    updateFilters({ conditions: updated });
  };

  const handleClear = () => {
    setFilters({
      specialty: '',
      treatmentTypes: [],
      conditions: [],
      minRating: 0,
      distance: 50,
    });
    onClear?.();
  };

  const hasActiveFilters =
    filters.specialty ||
    filters.treatmentTypes.length > 0 ||
    filters.conditions.length > 0 ||
    filters.minRating > 0 ||
    filters.distance !== 50;

  return (
    <div className={cn('bg-white rounded-2xl border border-slate-200 p-6', className)}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-900">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={handleClear}
            className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
            Clear all
          </button>
        )}
      </div>

      {/* Specialty Dropdown */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Specialty
        </label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsSpecialtyOpen(!isSpecialtyOpen)}
            className={cn(
              'w-full px-4 py-3 rounded-lg border text-left flex items-center justify-between',
              'transition-colors duration-200',
              'focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent',
              isSpecialtyOpen ? 'border-teal-500' : 'border-slate-300 hover:border-slate-400'
            )}
          >
            <span className={filters.specialty ? 'text-slate-900' : 'text-slate-400'}>
              {filters.specialty || 'Select specialty'}
            </span>
            <ChevronDown
              className={cn(
                'w-5 h-5 text-slate-400 transition-transform',
                isSpecialtyOpen && 'rotate-180'
              )}
            />
          </button>
          {isSpecialtyOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-60 overflow-auto">
              <button
                type="button"
                onClick={() => {
                  updateFilters({ specialty: '' });
                  setIsSpecialtyOpen(false);
                }}
                className="w-full px-4 py-2.5 text-left text-slate-400 hover:bg-slate-50"
              >
                All Specialties
              </button>
              {specialties.map((specialty) => (
                <button
                  key={specialty}
                  type="button"
                  onClick={() => {
                    updateFilters({ specialty });
                    setIsSpecialtyOpen(false);
                  }}
                  className={cn(
                    'w-full px-4 py-2.5 text-left hover:bg-slate-50',
                    filters.specialty === specialty
                      ? 'text-teal-600 bg-teal-50'
                      : 'text-slate-700'
                  )}
                >
                  {specialty}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Treatment Type Checkboxes */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-3">
          Treatment Type
        </label>
        <div className="space-y-2.5">
          {treatmentTypes.map((type) => (
            <label key={type} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.treatmentTypes.includes(type)}
                onChange={() => toggleTreatmentType(type)}
                className="w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500 cursor-pointer"
              />
              <span className="text-sm text-slate-600 group-hover:text-slate-900">
                {type}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Condition Checkboxes */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-3">
          Conditions Treated
        </label>
        <div className="space-y-2.5">
          {conditions.map((condition) => (
            <label key={condition} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.conditions.includes(condition)}
                onChange={() => toggleCondition(condition)}
                className="w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500 cursor-pointer"
              />
              <span className="text-sm text-slate-600 group-hover:text-slate-900">
                {condition}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-3">
          Minimum Rating
        </label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => updateFilters({ minRating: star === filters.minRating ? 0 : star })}
              className="p-1 transition-transform hover:scale-110"
            >
              <Star
                className={cn(
                  'w-6 h-6',
                  star <= filters.minRating
                    ? 'fill-amber-400 text-amber-400'
                    : 'fill-slate-200 text-slate-200 hover:fill-amber-200 hover:text-amber-200'
                )}
              />
            </button>
          ))}
          {filters.minRating > 0 && (
            <span className="ml-2 text-sm text-slate-500 self-center">
              {filters.minRating}+ stars
            </span>
          )}
        </div>
      </div>

      {/* Distance Slider */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-medium text-slate-700">Distance</label>
          <span className="text-sm text-slate-500">{filters.distance} miles</span>
        </div>
        <input
          type="range"
          min="5"
          max="100"
          step="5"
          value={filters.distance}
          onChange={(e) => updateFilters({ distance: parseInt(e.target.value) })}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
        />
        <div className="flex justify-between text-xs text-slate-400 mt-1">
          <span>5 mi</span>
          <span>100 mi</span>
        </div>
      </div>

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={handleClear}
        >
          Clear Filters
        </Button>
      )}
    </div>
  );
}
