'use client';

import { useState } from 'react';
import {
  Search,
  ChevronDown,
  MoreVertical,
  Eye,
  CheckCircle,
  XCircle,
  Flag,
  Trash2,
  RefreshCw,
  Clock,
  Star,
  User,
  Building2,
  AlertTriangle,
  ThumbsUp,
  ThumbsDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface Review {
  id: string;
  patientName: string;
  practitionerName: string;
  practiceName: string;
  rating: number;
  title: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected' | 'flagged';
  isVerified: boolean;
  createdAt: string;
}

// Mock reviews data
const mockReviews: Review[] = [
  {
    id: '1',
    patientName: 'Emily J.',
    practitionerName: 'Dr. Michael Chen',
    practiceName: 'Mindful Healing Center',
    rating: 5,
    title: 'Life-changing treatment',
    content: 'After years of struggling with depression, ketamine therapy at this clinic has truly changed my life. Dr. Chen and his team were incredibly supportive throughout the entire process. The staff made me feel comfortable and safe during each session.',
    status: 'pending',
    isVerified: true,
    createdAt: '2024-01-18',
  },
  {
    id: '2',
    patientName: 'Robert D.',
    practitionerName: 'Dr. Lisa Park',
    practiceName: 'Wellness & Recovery Institute',
    rating: 4,
    title: 'Very professional and caring',
    content: 'Great experience overall. The facility is clean and modern. Dr. Park took the time to explain everything thoroughly. The only reason I did not give 5 stars is due to the wait time between appointments.',
    status: 'pending',
    isVerified: true,
    createdAt: '2024-01-17',
  },
  {
    id: '3',
    patientName: 'Anonymous',
    practitionerName: 'Dr. James Wilson',
    practiceName: 'New Horizons Mental Health',
    rating: 1,
    title: 'Terrible experience - AVOID',
    content: 'This place is a scam. They took my money and provided no real treatment. The doctor seemed more interested in profits than patient care. I would never recommend this to anyone.',
    status: 'flagged',
    isVerified: false,
    createdAt: '2024-01-16',
  },
  {
    id: '4',
    patientName: 'Sarah M.',
    practitionerName: 'Dr. Sarah Anderson',
    practiceName: 'Anderson Ketamine Clinic',
    rating: 5,
    title: 'Excellent care and results',
    content: 'I have been receiving treatment at this clinic for 6 months now and the results have been remarkable. Dr. Anderson is extremely knowledgeable and genuinely cares about her patients. Highly recommend!',
    status: 'approved',
    isVerified: true,
    createdAt: '2024-01-15',
  },
  {
    id: '5',
    patientName: 'Michael T.',
    practitionerName: 'Dr. Robert Martinez',
    practiceName: 'Healing Minds Therapy',
    rating: 3,
    title: 'Mixed feelings about the treatment',
    content: 'The treatment itself was fine, but I expected more dramatic results based on what I read online. The staff was friendly but the facility could use some updating. Not sure if I will continue.',
    status: 'pending',
    isVerified: true,
    createdAt: '2024-01-14',
  },
  {
    id: '6',
    patientName: 'Jennifer K.',
    practitionerName: 'Dr. Emily Davis',
    practiceName: 'Serenity Wellness Center',
    rating: 5,
    title: 'Finally found relief',
    content: 'After trying countless medications for my chronic pain, ketamine therapy has provided the relief I desperately needed. Dr. Davis is compassionate and thorough. Thank you for giving me my life back!',
    status: 'pending',
    isVerified: true,
    createdAt: '2024-01-13',
  },
  {
    id: '7',
    patientName: 'David L.',
    practitionerName: 'Dr. Thomas Brown',
    practiceName: 'Brown Mental Health Services',
    rating: 2,
    title: 'Not what I expected',
    content: 'The initial consultation was rushed and I felt like just another number. The treatment sessions were okay but the follow-up care was lacking. Would not recommend based on my experience.',
    status: 'rejected',
    isVerified: false,
    createdAt: '2024-01-12',
  },
];

const statusColors = {
  pending: 'bg-amber-500/10 text-amber-400',
  approved: 'bg-emerald-500/10 text-emerald-400',
  rejected: 'bg-red-500/10 text-red-400',
  flagged: 'bg-orange-500/10 text-orange-400',
};

const statusIcons = {
  pending: Clock,
  approved: CheckCircle,
  rejected: XCircle,
  flagged: AlertTriangle,
};

export default function ReviewsModerationPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected' | 'flagged'>('all');
  const [ratingFilter, setRatingFilter] = useState<'all' | '1' | '2' | '3' | '4' | '5'>('all');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [expandedReview, setExpandedReview] = useState<string | null>(null);

  // Filter reviews
  const filteredReviews = mockReviews.filter((review) => {
    const matchesSearch =
      review.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.practitionerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || review.status === statusFilter;
    const matchesRating = ratingFilter === 'all' || review.rating === parseInt(ratingFilter);
    return matchesSearch && matchesStatus && matchesRating;
  });

  // Count reviews by status
  const statusCounts = {
    pending: mockReviews.filter((r) => r.status === 'pending').length,
    flagged: mockReviews.filter((r) => r.status === 'flagged').length,
    approved: mockReviews.filter((r) => r.status === 'approved').length,
    rejected: mockReviews.filter((r) => r.status === 'rejected').length,
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              'w-4 h-4',
              star <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-600'
            )}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Reviews Moderation</h1>
          <p className="mt-1 text-slate-400">
            Review and moderate patient feedback
          </p>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <button
          onClick={() => setStatusFilter('pending')}
          className={cn(
            'bg-slate-900 rounded-xl border p-4 text-left transition-colors hover:border-amber-500/50',
            statusFilter === 'pending' ? 'border-amber-500/50' : 'border-slate-800'
          )}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10">
              <Clock className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{statusCounts.pending}</p>
              <p className="text-sm text-slate-400">Pending</p>
            </div>
          </div>
        </button>
        <button
          onClick={() => setStatusFilter('flagged')}
          className={cn(
            'bg-slate-900 rounded-xl border p-4 text-left transition-colors hover:border-orange-500/50',
            statusFilter === 'flagged' ? 'border-orange-500/50' : 'border-slate-800'
          )}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-orange-500/10">
              <Flag className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{statusCounts.flagged}</p>
              <p className="text-sm text-slate-400">Flagged</p>
            </div>
          </div>
        </button>
        <button
          onClick={() => setStatusFilter('approved')}
          className={cn(
            'bg-slate-900 rounded-xl border p-4 text-left transition-colors hover:border-emerald-500/50',
            statusFilter === 'approved' ? 'border-emerald-500/50' : 'border-slate-800'
          )}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{statusCounts.approved}</p>
              <p className="text-sm text-slate-400">Approved</p>
            </div>
          </div>
        </button>
        <button
          onClick={() => setStatusFilter('rejected')}
          className={cn(
            'bg-slate-900 rounded-xl border p-4 text-left transition-colors hover:border-red-500/50',
            statusFilter === 'rejected' ? 'border-red-500/50' : 'border-slate-800'
          )}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-500/10">
              <XCircle className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{statusCounts.rejected}</p>
              <p className="text-sm text-slate-400">Rejected</p>
            </div>
          </div>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              placeholder="Search reviews..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500"
            />
          </div>

          {/* Filter dropdowns */}
          <div className="flex flex-wrap gap-3">
            {/* Status filter */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
                className="appearance-none bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 pr-10 text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="flagged">Flagged</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
            </div>

            {/* Rating filter */}
            <div className="relative">
              <select
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value as typeof ratingFilter)}
                className="appearance-none bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 pr-10 text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
            </div>

            <button
              onClick={() => {
                setStatusFilter('all');
                setRatingFilter('all');
                setSearchQuery('');
              }}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-300 hover:bg-slate-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Reviews list */}
      <div className="space-y-4">
        {filteredReviews.map((review) => {
          const StatusIcon = statusIcons[review.status];
          const isExpanded = expandedReview === review.id;
          return (
            <div
              key={review.id}
              className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden"
            >
              {/* Review header */}
              <div className="p-4 sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    {/* Status and rating row */}
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span
                        className={cn(
                          'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium',
                          statusColors[review.status]
                        )}
                      >
                        <StatusIcon className="w-3.5 h-3.5" />
                        {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                      </span>
                      {renderStars(review.rating)}
                      {review.isVerified && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-teal-500/10 text-teal-400 rounded">
                          <CheckCircle className="w-3 h-3" />
                          Verified
                        </span>
                      )}
                    </div>

                    {/* Review title */}
                    <h3 className="text-lg font-semibold text-white mb-2">{review.title}</h3>

                    {/* Review meta */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mb-3">
                      <div className="flex items-center gap-1.5">
                        <User className="w-4 h-4" />
                        {review.patientName}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Building2 className="w-4 h-4" />
                        {review.practiceName}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {new Date(review.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </div>
                    </div>

                    {/* Review content */}
                    <p
                      className={cn(
                        'text-slate-300 text-sm leading-relaxed',
                        !isExpanded && 'line-clamp-2'
                      )}
                    >
                      {review.content}
                    </p>
                    {review.content.length > 150 && (
                      <button
                        onClick={() => setExpandedReview(isExpanded ? null : review.id)}
                        className="text-sm text-teal-400 hover:text-teal-300 mt-2"
                      >
                        {isExpanded ? 'Show less' : 'Read more'}
                      </button>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 sm:ml-4">
                    {review.status === 'pending' && (
                      <>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10"
                        >
                          <ThumbsUp className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        >
                          <ThumbsDown className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </>
                    )}
                    <div className="relative">
                      <button
                        onClick={() => setOpenDropdown(openDropdown === review.id ? null : review.id)}
                        className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      {openDropdown === review.id && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setOpenDropdown(null)}
                          />
                          <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-20 py-1">
                            <button className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-700 flex items-center gap-2">
                              <Eye className="w-4 h-4" />
                              View Full Details
                            </button>
                            {review.status !== 'flagged' && (
                              <button className="w-full px-4 py-2 text-left text-sm text-orange-400 hover:bg-slate-700 flex items-center gap-2">
                                <Flag className="w-4 h-4" />
                                Flag for Review
                              </button>
                            )}
                            <button className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-slate-700 flex items-center gap-2">
                              <Trash2 className="w-4 h-4" />
                              Delete Review
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Flagged review warning */}
              {review.status === 'flagged' && (
                <div className="px-4 sm:px-6 py-3 bg-orange-500/5 border-t border-orange-500/20">
                  <div className="flex items-center gap-2 text-sm text-orange-400">
                    <AlertTriangle className="w-4 h-4" />
                    <span>This review has been flagged for potential policy violations. Please review carefully.</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Empty state */}
      {filteredReviews.length === 0 && (
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8 text-slate-600" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">No reviews found</h3>
          <p className="text-slate-400 text-sm">
            Try adjusting your filters or search query.
          </p>
        </div>
      )}
    </div>
  );
}
