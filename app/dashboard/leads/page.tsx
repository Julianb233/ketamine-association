import { redirect } from 'next/navigation';
export const dynamic = 'force-dynamic';
import { prisma } from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';
import LeadsClient from './LeadsClient';

export default async function LeadsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/sign-in');
  }

  // Fetch practitioner with leads
  const practitioner = await prisma.practitioner.findFirst({
    where: { userId: user.id },
    include: {
      leads: {
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!practitioner) {
    redirect('/onboarding');
  }

  // Determine if user can export based on membership tier
  const canExport = ['PREMIUM', 'ELITE', 'ENTERPRISE'].includes(practitioner.membershipTier);

  // Serialize leads for client component
  const serializedLeads = practitioner.leads.map(lead => ({
    ...lead,
    createdAt: lead.createdAt.toISOString(),
    updatedAt: lead.updatedAt.toISOString(),
  }));

  return (
    <LeadsClient
      initialLeads={serializedLeads}
      canExport={canExport}
      practitionerId={practitioner.id}
    />
  );
}
