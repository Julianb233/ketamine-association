import { prisma } from "@/lib/prisma";
export const dynamic = 'force-dynamic';
import ReviewsClient from "./ReviewsClient";

export default async function ReviewsModerationPage() {
  const reviews = await prisma.review.findMany({
    include: {
      practitioner: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          practiceName: true,
        },
      },
      patient: {
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
      },
      user: {
        select: {
          name: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  // Transform reviews to match the expected format
  const formattedReviews = reviews.map((review) => ({
    id: review.id,
    patientName: review.patient?.user?.name || review.user?.name || 'Anonymous',
    practitionerName: review.practitioner
      ? `${review.practitioner.firstName} ${review.practitioner.lastName}`
      : 'Unknown',
    practiceName: review.practitioner?.practiceName || 'Unknown Practice',
    rating: review.rating,
    title: review.title || '',
    content: review.content || '',
    status: (review.isPublished ? 'approved' : 'pending') as 'pending' | 'approved' | 'rejected' | 'flagged',
    isVerified: review.isVerified,
    createdAt: review.createdAt.toISOString().split('T')[0],
  }));

  return <ReviewsClient reviews={formattedReviews} />;
}
