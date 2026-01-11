import { redirect } from 'next/navigation';
export const dynamic = 'force-dynamic';
import {
  Star,
  MessageSquare,
  ThumbsUp,
  AlertCircle,
  Calendar
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { cn, formatDate } from '@/lib/utils';
import { prisma } from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';

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

export default async function ReviewsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/sign-in');
  }

  // Fetch practitioner with reviews
  const practitioner = await prisma.practitioner.findFirst({
    where: { userId: user.id },
    include: {
      reviews: {
        where: { isPublished: true },
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!practitioner) {
    redirect('/onboarding');
  }

  const reviews = practitioner.reviews;
  const totalReviews = reviews.length;

  // Calculate stats
  const averageRating = totalReviews > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
    : 0;

  // Calculate rating distribution
  const ratingDistribution = {
    5: reviews.filter(r => r.rating === 5).length,
    4: reviews.filter(r => r.rating === 4).length,
    3: reviews.filter(r => r.rating === 3).length,
    2: reviews.filter(r => r.rating === 2).length,
    1: reviews.filter(r => r.rating === 1).length,
  };

  // Count verified reviews
  const verifiedCount = reviews.filter(r => r.isVerified).length;

  // Count reviews this month
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const recentReviewsCount = reviews.filter(
    r => new Date(r.createdAt) > thirtyDaysAgo
  ).length;

  // Calculate recent trend (average rating in last 30 days)
  const recentReviews = reviews.filter(r => new Date(r.createdAt) > thirtyDaysAgo);
  const recentTrend = recentReviews.length > 0
    ? recentReviews.reduce((sum, r) => sum + r.rating, 0) / recentReviews.length
    : 0;

  // Positive reviews (4 or 5 stars)
  const positivePercentage = totalReviews > 0
    ? Math.round(((ratingDistribution[5] + ratingDistribution[4]) / totalReviews) * 100)
    : 0;

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
            {totalReviews > 0 ? (
              <>
                <div className="text-5xl font-bold text-slate-900 mb-2">
                  {averageRating.toFixed(1)}
                </div>
                <StarRating rating={Math.round(averageRating)} size="lg" />
                <p className="text-slate-500 mt-2">
                  Based on {totalReviews} review{totalReviews !== 1 ? 's' : ''}
                </p>
                {recentTrend > 0 && (
                  <div className="flex items-center justify-center gap-1 mt-4 text-green-600">
                    <span className="text-sm font-medium">
                      {recentTrend.toFixed(1)} avg in last 30 days
                    </span>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="text-5xl font-bold text-slate-300 mb-2">--</div>
                <StarRating rating={0} size="lg" />
                <p className="text-slate-500 mt-2">No reviews yet</p>
              </>
            )}
          </CardContent>
        </Card>

        {/* Rating Distribution */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Rating Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            {totalReviews > 0 ? (
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <RatingBar
                    key={rating}
                    rating={rating}
                    count={ratingDistribution[rating as keyof typeof ratingDistribution]}
                    total={totalReviews}
                  />
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-slate-500">
                <p>No rating data available yet</p>
                <p className="text-sm text-slate-400 mt-1">
                  Distribution will appear when you receive reviews
                </p>
              </div>
            )}
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
                  {ratingDistribution[5]}
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
                  {positivePercentage}%
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
                  {verifiedCount}
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
                  {recentReviewsCount}
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
          {reviews.length === 0 ? (
            <div className="py-12 text-center">
              <MessageSquare className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">No reviews yet</p>
              <p className="text-sm text-slate-400 mt-1">
                Reviews will appear here when patients leave feedback
              </p>
            </div>
          ) : (
            reviews.map((review) => (
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
