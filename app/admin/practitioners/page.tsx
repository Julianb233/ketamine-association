import { prisma } from "@/lib/prisma";
export const dynamic = 'force-dynamic';
import PractitionersClient from "./PractitionersClient";

export default async function PractitionersManagementPage() {
  const practitioners = await prisma.practitioner.findMany({
    include: {
      user: {
        select: {
          email: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  // Transform practitioners to match the expected format
  const formattedPractitioners = practitioners.map((practitioner) => ({
    id: practitioner.id,
    name: `${practitioner.title || ''} ${practitioner.firstName} ${practitioner.lastName}`.trim(),
    email: practitioner.user?.email || '',
    practice: practitioner.practiceName || '',
    city: practitioner.city || '',
    state: practitioner.state || '',
    tier: practitioner.membershipTier,
    isVerified: practitioner.isVerified,
    isFeatured: practitioner.membershipTier === 'ELITE' || practitioner.membershipTier === 'ENTERPRISE',
    rating: practitioner.rating,
    reviewCount: practitioner.reviewCount,
    status: practitioner.membershipStatus === 'ACTIVE' ? 'active' as const
      : practitioner.membershipStatus === 'INACTIVE' ? 'pending' as const
      : 'suspended' as const,
    joinedAt: practitioner.createdAt.toISOString().split('T')[0],
  }));

  return <PractitionersClient practitioners={formattedPractitioners} />;
}
