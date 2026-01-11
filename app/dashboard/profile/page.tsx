import { redirect } from 'next/navigation';
export const dynamic = 'force-dynamic';
import { prisma } from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';
import ProfileClient from './ProfileClient';

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/sign-in');
  }

  // Fetch practitioner with related data
  const practitioner = await prisma.practitioner.findFirst({
    where: { userId: user.id },
    include: {
      treatments: true,
      conditions: true,
      insurances: true,
    },
  });

  if (!practitioner) {
    redirect('/onboarding');
  }

  // Serialize the practitioner data for client component
  const profileData = {
    id: practitioner.id,
    title: practitioner.title || '',
    firstName: practitioner.firstName,
    lastName: practitioner.lastName,
    credentials: practitioner.credentials || '',
    specialty: practitioner.specialty || '',
    bio: practitioner.bio || '',
    practiceName: practitioner.practiceName || '',
    address: practitioner.address || '',
    city: practitioner.city || '',
    state: practitioner.state || '',
    zipCode: practitioner.zipCode || '',
    phone: practitioner.phone || '',
    website: practitioner.website || '',
    licenseNumber: practitioner.licenseNumber || '',
    licenseState: practitioner.licenseState || '',
    npiNumber: practitioner.npiNumber || '',
    profileImage: practitioner.profileImage || '',
    treatments: practitioner.treatments.map(t => t.treatmentType),
    conditions: practitioner.conditions.map(c => c.condition),
    insurances: practitioner.insurances.map(i => i.insuranceName),
  };

  return <ProfileClient initialProfile={profileData} />;
}
