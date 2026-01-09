import {
  Star,
  MessageSquare,
  ThumbsUp,
  AlertCircle,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { cn, formatDate } from '@/lib/utils';

// Mock data
const mockReviewStats = {
  averageRating: 4.8,
  totalReviews: 47,
  ratingDistribution: {
    5: 35,
    4: 8,
    3: 3,
    2: 1,
    1: 0,
  },
  recentTrend: 4.9,
};

const mockReviews = [
  {
    id: '1',
    rating: 5,
    title: 'Life-changing treatment',
    content: 'After years of struggling with treatment-resistant depression, ketamine therapy with Dr. Johnson has been truly life-changing. Her compassionate approach and expertise made all the difference in my recovery journey.',
    isVerified: true,
    createdAt: new Date('2024-01-05'),
  },
  {
    id: '2',
    rating: 5,
    title: 'Excellent care and professionalism',
    content: 'Dr. Johnson and her team provided exceptional care throughout my treatment. The facility is comfortable and the staff is incredibly supportive. I highly recommend this practice.',
    isVerified: true,
    createdAt: new Date('2024-01-02'),
  },
  {
    id: '3',
    rating: 4,
    title: 'Very helpful for anxiety',
    content: 'The treatment has significantly helped with my anxiety. The only reason for 4 stars is the wait time for appointments, but the quality of care is top-notch.',
    isVerified: true,
    createdAt: new Date('2023-12-28'),
  },
  {
    id: '4',
    rating: 5,
    title: 'Professional and caring',
    content: 'Dr. Johnson takes the time to explain everything and ensures you feel comfortable throughout the process. The KAP sessions have been incredibly beneficial.',
    isVerified: false,
    createdAt: new Date('2023-12-20'),
  },
  {
    id: '5',
    rating: 3,
    title: 'Good results, but expensive',
    content: 'The treatment is effective and the care is professional, but the cost is quite high and insurance coverage is limited. Would appreciate more payment options.',
    isVerified: true,
    createdAt: new Date('2023-12-15'),
  },
];

function StarRating({ rating, size = 'md' }: { rating: number; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'h-3.5 w-3.5',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            sizeClasses[size],
            star <= rating ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'
          )}
        />
      ))}
    </div>
  );
}

function RatingBar({ rating, count, total }: { rating: number; count: number; total: number }) {
  const percentage = total > 0 ? (count / total) * 100 : 0;

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1 w-12">
        <span className="text-sm text-slate-600">{rating}</span>
        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
      </div>
      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-amber-400 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm text-slate-500 w-8">{count}</span>
    </div>
  );
}

export default function ReviewsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Reviews</h1>
        <p className="text-slate-500 mt-1">
          See what patients are saying about your practice
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Overall Rating */}
        <Card className="md:col-span-1">
          <CardContent className="text-center py-8">
            <div className="text-5xl font-bold text-slate-900 mb-2">
              {mockReviewStats.averageRating.toFixed(1)}
            </div>
            <StarRating rating={Math.round(mockReviewStats.averageRating)} size="lg" />
            <p className="text-slate-500 mt-2">
              Based on {mockReviewStats.totalReviews} reviews
            </p>
            <div className="flex items-center justify-center gap-1 mt-4 text-green-600">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-medium">
                {mockReviewStats.recentTrend.toFixed(1)} avg in last 30 days
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Rating Distribution */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Rating Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((rating) => (
                <RatingBar
                  key={rating}
                  rating={rating}
                  count={mockReviewStats.ratingDistribution[rating as keyof typeof mockReviewStats.ratingDistribution]}
                  total={mockReviewStats.totalReviews}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <Star className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {mockReviewStats.ratingDistribution[5]}
                </p>
                <p className="text-sm text-slate-500">5-star reviews</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-teal-100 rounded-lg">
                <ThumbsUp className="h-5 w-5 text-teal-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {Math.round(
                    ((mockReviewStats.ratingDistribution[5] + mockReviewStats.ratingDistribution[4]) /
                      mockReviewStats.totalReviews) *
                      100
                  )}%
                </p>
                <p className="text-sm text-slate-500">Positive reviews</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MessageSquare className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {mockReviews.filter((r) => r.isVerified).length}
                </p>
                <p className="text-sm text-slate-500">Verified reviews</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {mockReviews.filter(
                    (r) => r.createdAt > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                  ).length}
                </p>
                <p className="text-sm text-slate-500">This month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reviews List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reviews</CardTitle>
        </CardHeader>
        <CardContent className="divide-y divide-slate-100">
          {mockReviews.length === 0 ? (
            <div className="py-12 text-center">
              <MessageSquare className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">No reviews yet</p>
              <p className="text-sm text-slate-400 mt-1">
                Reviews will appear here when patients leave feedback
              </p>
            </div>
          ) : (
            mockReviews.map((review) => (
              <div key={review.id} className="py-6 first:pt-0 last:pb-0">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <StarRating rating={review.rating} size="sm" />
                      {review.isVerified && (
                        <Badge variant="success" size="sm">
                          Verified Patient
                        </Badge>
                      )}
                    </div>
                    {review.title && (
                      <h4 className="font-semibold text-slate-900">{review.title}</h4>
                    )}
                  </div>
                  <span className="text-sm text-slate-500 whitespace-nowrap">
                    {formatDate(review.createdAt)}
                  </span>
                </div>
                {review.content && (
                  <p className="text-slate-600 leading-relaxed">{review.content}</p>
                )}
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Tips Card */}
      <Card className="bg-teal-50 border-teal-200">
        <CardContent>
          <div className="flex gap-4">
            <div className="p-3 bg-teal-100 rounded-xl h-fit">
              <AlertCircle className="h-6 w-6 text-teal-600" />
            </div>
            <div>
              <h3 className="font-semibold text-teal-900 mb-2">
                Tips for Getting More Reviews
              </h3>
              <ul className="space-y-2 text-sm text-teal-800">
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold">1.</span>
                  Ask satisfied patients to share their experience after treatment
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold">2.</span>
                  Send a follow-up email with a direct link to your review page
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold">3.</span>
                  Display your reviews prominently on your website and social media
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold">4.</span>
                  Respond to reviews (coming soon) to show you value patient feedback
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
