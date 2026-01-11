import { Container } from '@/components/ui/Container';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { MapPin, Star, CheckCircle } from 'lucide-react';

const featuredProviders = [
  {
    id: 1,
    name: 'Dr. Sarah Mitchell',
    credentials: 'MD, FASAM',
    practice: 'Mind Renewal Clinic',
    location: 'Austin, TX',
    specialties: ['Depression', 'PTSD', 'Anxiety'],
    rating: 4.9,
    reviews: 127,
    verified: true,
    image: '/images/provider-1.jpg',
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    credentials: 'MD, PhD',
    practice: 'Ketamine Wellness Center',
    location: 'San Francisco, CA',
    specialties: ['Chronic Pain', 'Depression', 'OCD'],
    rating: 4.8,
    reviews: 89,
    verified: true,
    image: '/images/provider-2.jpg',
  },
  {
    id: 3,
    name: 'Dr. Emily Rodriguez',
    credentials: 'DO, MPH',
    practice: 'New Horizons Psychiatry',
    location: 'Denver, CO',
    specialties: ['Treatment-Resistant Depression', 'Bipolar', 'Suicidal Ideation'],
    rating: 5.0,
    reviews: 64,
    verified: true,
    image: '/images/provider-3.jpg',
  },
];

export function FeaturedProviders() {
  return (
    <section className="py-20 bg-slate-50">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Featured Providers
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl">
              Connect with verified ketamine therapy specialists in your area.
            </p>
          </div>
          <Button variant="outline" href="/providers" className="mt-6 md:mt-0">
            View All Providers
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProviders.map((provider) => (
            <Card key={provider.id} variant="bordered" className="overflow-hidden">
              <div className="aspect-[4/3] bg-gradient-to-br from-teal-100 to-emerald-100 relative -mx-6 -mt-6">
                {/* Placeholder for provider image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-white/80 flex items-center justify-center">
                    <span className="text-4xl font-bold text-teal-600">
                      {provider.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </div>
                {provider.verified && (
                  <div className="absolute top-4 right-4">
                    <Badge variant="success" icon={CheckCircle}>
                      Verified
                    </Badge>
                  </div>
                )}
              </div>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {provider.name}
                    </h3>
                    <p className="text-sm text-slate-500">{provider.credentials}</p>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-semibold">{provider.rating}</span>
                    <span className="text-xs text-slate-400">({provider.reviews})</span>
                  </div>
                </div>

                <p className="text-slate-700 font-medium mb-1">{provider.practice}</p>
                <p className="flex items-center gap-1 text-sm text-slate-500 mb-4">
                  <MapPin className="w-4 h-4" />
                  {provider.location}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {provider.specialties.map((specialty) => (
                    <Badge key={specialty} variant="default" size="sm">
                      {specialty}
                    </Badge>
                  ))}
                </div>

                <Button variant="secondary" fullWidth size="sm" href={`/providers/${provider.id}`}>
                  View Profile
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
