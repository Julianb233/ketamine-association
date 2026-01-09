'use client';

import { useState } from 'react';
import {
  Search,
  ChevronDown,
  MoreVertical,
  Eye,
  Edit,
  ShieldCheck,
  Star,
  Ban,
  Trash2,
  Download,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Clock,
  MapPin,
  Award,
  Building2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

// Types matching Prisma schema
type MembershipTier = 'FREE' | 'PROFESSIONAL' | 'PREMIUM' | 'ELITE' | 'ENTERPRISE';

interface Practitioner {
  id: string;
  name: string;
  email: string;
  practice: string;
  city: string;
  state: string;
  tier: MembershipTier;
  isVerified: boolean;
  isFeatured: boolean;
  rating: number;
  reviewCount: number;
  status: 'active' | 'pending' | 'suspended';
  joinedAt: string;
}

// Mock practitioners data
const mockPractitioners: Practitioner[] = [
  {
    id: '1',
    name: 'Dr. Michael Chen',
    email: 'michael.chen@clinic.com',
    practice: 'Mindful Healing Center',
    city: 'Los Angeles',
    state: 'CA',
    tier: 'PREMIUM',
    isVerified: true,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 47,
    status: 'active',
    joinedAt: '2023-11-20',
  },
  {
    id: '2',
    name: 'Dr. Lisa Park',
    email: 'lisa.park@wellness.com',
    practice: 'Wellness & Recovery Institute',
    city: 'San Francisco',
    state: 'CA',
    tier: 'PROFESSIONAL',
    isVerified: true,
    isFeatured: false,
    rating: 4.7,
    reviewCount: 32,
    status: 'active',
    joinedAt: '2023-09-15',
  },
  {
    id: '3',
    name: 'Dr. James Wilson',
    email: 'james.wilson@med.com',
    practice: 'New Horizons Mental Health',
    city: 'Austin',
    state: 'TX',
    tier: 'FREE',
    isVerified: false,
    isFeatured: false,
    rating: 0,
    reviewCount: 0,
    status: 'pending',
    joinedAt: '2024-01-10',
  },
  {
    id: '4',
    name: 'Dr. Sarah Anderson',
    email: 'sarah.a@ketamine.clinic',
    practice: 'Anderson Ketamine Clinic',
    city: 'Denver',
    state: 'CO',
    tier: 'ELITE',
    isVerified: true,
    isFeatured: true,
    rating: 4.8,
    reviewCount: 89,
    status: 'active',
    joinedAt: '2023-06-01',
  },
  {
    id: '5',
    name: 'Dr. Robert Martinez',
    email: 'r.martinez@healingminds.com',
    practice: 'Healing Minds Therapy',
    city: 'Miami',
    state: 'FL',
    tier: 'PROFESSIONAL',
    isVerified: true,
    isFeatured: false,
    rating: 4.5,
    reviewCount: 21,
    status: 'active',
    joinedAt: '2023-10-05',
  },
  {
    id: '6',
    name: 'Dr. Emily Davis',
    email: 'emily.davis@clinic.com',
    practice: 'Serenity Wellness Center',
    city: 'Seattle',
    state: 'WA',
    tier: 'PREMIUM',
    isVerified: false,
    isFeatured: false,
    rating: 4.6,
    reviewCount: 15,
    status: 'pending',
    joinedAt: '2024-01-05',
  },
  {
    id: '7',
    name: 'Dr. Thomas Brown',
    email: 't.brown@mentalhealth.com',
    practice: 'Brown Mental Health Services',
    city: 'Chicago',
    state: 'IL',
    tier: 'FREE',
    isVerified: false,
    isFeatured: false,
    rating: 4.2,
    reviewCount: 8,
    status: 'suspended',
    joinedAt: '2023-08-20',
  },
];

const tierColors: Record<MembershipTier, string> = {
  FREE: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
  PROFESSIONAL: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
  PREMIUM: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  ELITE: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  ENTERPRISE: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
};

const statusColors = {
  active: 'bg-emerald-500/10 text-emerald-400',
  pending: 'bg-amber-500/10 text-amber-400',
  suspended: 'bg-red-500/10 text-red-400',
};

const statusIcons = {
  active: CheckCircle2,
  pending: Clock,
  suspended: XCircle,
};

export default function PractitionersManagementPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState<MembershipTier | 'all'>('all');
  const [verificationFilter, setVerificationFilter] = useState<'all' | 'verified' | 'unverified'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'pending' | 'suspended'>('all');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Filter practitioners
  const filteredPractitioners = mockPractitioners.filter((practitioner) => {
    const matchesSearch =
      practitioner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      practitioner.practice.toLowerCase().includes(searchQuery.toLowerCase()) ||
      practitioner.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTier = tierFilter === 'all' || practitioner.tier === tierFilter;
    const matchesVerification =
      verificationFilter === 'all' ||
      (verificationFilter === 'verified' && practitioner.isVerified) ||
      (verificationFilter === 'unverified' && !practitioner.isVerified);
    const matchesStatus = statusFilter === 'all' || practitioner.status === statusFilter;
    return matchesSearch && matchesTier && matchesVerification && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Practitioners</h1>
          <p className="mt-1 text-slate-400">
            Manage practitioner profiles, verification, and memberships
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="border-slate-700 text-slate-300 hover:bg-slate-800">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-teal-500/10">
              <Building2 className="w-5 h-5 text-teal-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{mockPractitioners.length}</p>
              <p className="text-sm text-slate-400">Total Practitioners</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {mockPractitioners.filter((p) => p.isVerified).length}
              </p>
              <p className="text-sm text-slate-400">Verified</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10">
              <Clock className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {mockPractitioners.filter((p) => p.status === 'pending').length}
              </p>
              <p className="text-sm text-slate-400">Pending Review</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/10">
              <Star className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {mockPractitioners.filter((p) => p.isFeatured).length}
              </p>
              <p className="text-sm text-slate-400">Featured</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              placeholder="Search practitioners..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500"
            />
          </div>

          {/* Filter dropdowns */}
          <div className="flex flex-wrap gap-3">
            {/* Tier filter */}
            <div className="relative">
              <select
                value={tierFilter}
                onChange={(e) => setTierFilter(e.target.value as MembershipTier | 'all')}
                className="appearance-none bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 pr-10 text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
              >
                <option value="all">All Tiers</option>
                <option value="FREE">Free</option>
                <option value="PROFESSIONAL">Professional</option>
                <option value="PREMIUM">Premium</option>
                <option value="ELITE">Elite</option>
                <option value="ENTERPRISE">Enterprise</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
            </div>

            {/* Verification filter */}
            <div className="relative">
              <select
                value={verificationFilter}
                onChange={(e) => setVerificationFilter(e.target.value as 'all' | 'verified' | 'unverified')}
                className="appearance-none bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 pr-10 text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
              >
                <option value="all">All Verification</option>
                <option value="verified">Verified</option>
                <option value="unverified">Unverified</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
            </div>

            {/* Status filter */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'pending' | 'suspended')}
                className="appearance-none bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 pr-10 text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
            </div>

            <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-300 hover:bg-slate-700 transition-colors">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Practitioners table */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Practitioner
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Tier
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredPractitioners.map((practitioner) => {
                const StatusIcon = statusIcons[practitioner.status];
                return (
                  <tr
                    key={practitioner.id}
                    className="hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center relative">
                          <span className="text-sm font-medium text-slate-300">
                            {practitioner.name
                              .split(' ')
                              .slice(1)
                              .map((n) => n[0])
                              .join('')}
                          </span>
                          {practitioner.isVerified && (
                            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-slate-900">
                              <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium text-white">{practitioner.name}</p>
                            {practitioner.isFeatured && (
                              <span className="px-1.5 py-0.5 text-xs font-medium bg-amber-500/10 text-amber-400 rounded">
                                Featured
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500">{practitioner.practice}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-sm text-slate-400">
                        <MapPin className="w-4 h-4" />
                        {practitioner.city}, {practitioner.state}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          'px-2.5 py-1 rounded-lg text-xs font-medium border',
                          tierColors[practitioner.tier]
                        )}
                      >
                        {practitioner.tier}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium',
                          statusColors[practitioner.status]
                        )}
                      >
                        <StatusIcon className="w-3.5 h-3.5" />
                        {practitioner.status.charAt(0).toUpperCase() + practitioner.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {practitioner.rating > 0 ? (
                        <div className="flex items-center gap-1.5">
                          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                          <span className="text-sm font-medium text-white">{practitioner.rating}</span>
                          <span className="text-sm text-slate-500">({practitioner.reviewCount})</span>
                        </div>
                      ) : (
                        <span className="text-sm text-slate-500">No reviews</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="relative inline-block">
                        <button
                          onClick={() => setOpenDropdown(openDropdown === practitioner.id ? null : practitioner.id)}
                          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                        {openDropdown === practitioner.id && (
                          <>
                            <div
                              className="fixed inset-0 z-10"
                              onClick={() => setOpenDropdown(null)}
                            />
                            <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-20 py-1">
                              <button className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-700 flex items-center gap-2">
                                <Eye className="w-4 h-4" />
                                View Profile
                              </button>
                              <button className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-700 flex items-center gap-2">
                                <Edit className="w-4 h-4" />
                                Edit Profile
                              </button>
                              {!practitioner.isVerified && (
                                <button className="w-full px-4 py-2 text-left text-sm text-emerald-400 hover:bg-slate-700 flex items-center gap-2">
                                  <ShieldCheck className="w-4 h-4" />
                                  Verify
                                </button>
                              )}
                              {!practitioner.isFeatured && (
                                <button className="w-full px-4 py-2 text-left text-sm text-amber-400 hover:bg-slate-700 flex items-center gap-2">
                                  <Star className="w-4 h-4" />
                                  Feature
                                </button>
                              )}
                              <button className="w-full px-4 py-2 text-left text-sm text-amber-400 hover:bg-slate-700 flex items-center gap-2">
                                <Ban className="w-4 h-4" />
                                Suspend
                              </button>
                              <button className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-slate-700 flex items-center gap-2">
                                <Trash2 className="w-4 h-4" />
                                Delete
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800">
          <p className="text-sm text-slate-400">
            Showing <span className="font-medium text-white">{filteredPractitioners.length}</span> of{' '}
            <span className="font-medium text-white">{mockPractitioners.length}</span> practitioners
          </p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              Previous
            </button>
            <button className="px-3 py-1.5 text-sm bg-teal-500/10 text-teal-400 rounded-lg">
              1
            </button>
            <button className="px-3 py-1.5 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
