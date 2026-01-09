'use client';

import { useState } from 'react';
import { MapPin, Search } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '@/lib/utils';

interface ProviderSearchProps {
  onSearch?: (location: string) => void;
  placeholder?: string;
  className?: string;
  defaultValue?: string;
}

export function ProviderSearch({
  onSearch,
  placeholder = 'Enter city, state, or ZIP code',
  className,
  defaultValue = '',
}: ProviderSearchProps) {
  const [location, setLocation] = useState(defaultValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(location);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        'flex flex-col sm:flex-row gap-3',
        className
      )}
    >
      <div className="relative flex-1">
        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder={placeholder}
          className={cn(
            'w-full pl-12 pr-4 py-3 rounded-lg border transition-colors duration-200',
            'focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent',
            'placeholder:text-slate-400',
            'border-slate-300 bg-white hover:border-slate-400'
          )}
        />
      </div>
      <Button
        type="submit"
        variant="primary"
        size="md"
        icon={Search}
        className="sm:w-auto w-full"
      >
        Search
      </Button>
    </form>
  );
}
