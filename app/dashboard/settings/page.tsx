import { redirect } from 'next/navigation';
export const dynamic = 'force-dynamic';
import { prisma } from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';
import SettingsClient from './SettingsClient';

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/sign-in');
  }

  // Fetch practitioner
  const practitioner = await prisma.practitioner.findFirst({
    where: { userId: user.id },
    include: {
      leads: {
        where: {
          createdAt: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          },
        },
      },
    },
  });

  if (!practitioner) {
    redirect('/onboarding');
  }

  // Serialize membership data for client component
  const membershipData = {
    tier: practitioner.membershipTier,
    status: practitioner.membershipStatus,
    startedAt: practitioner.membershipStartedAt?.toISOString() || null,
    expiresAt: practitioner.membershipExpiresAt?.toISOString() || null,
    leadsUsedThisMonth: practitioner.leads.length,
    stripeCustomerId: practitioner.stripeCustomerId || null,
  };

  return (
    <SettingsClient
      membership={membershipData}
      userEmail={user.email || ''}
    />
  );
}
