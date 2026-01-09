'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { LeadStatus, TreatmentType, ConditionType } from '@prisma/client';

// Types for dashboard data
export interface DashboardStats {
  profileViews: number;
  newLeadsThisMonth: number;
  rating: number;
  totalReviews: number;
  membershipTier: string;
  membershipStatus: string;
}

export interface LeadData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  message: string | null;
  status: LeadStatus;
  condition: ConditionType | null;
  source: string;
  createdAt: Date;
}

export interface PractitionerProfile {
  id: string;
  firstName: string;
  lastName: string;
  title: string | null;
  credentials: string | null;
  specialty: string | null;
  bio: string | null;
  profileImage: string | null;
  practiceName: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
  phone: string | null;
  website: string | null;
  licenseNumber: string | null;
  licenseState: string | null;
  npiNumber: string | null;
  treatments: TreatmentType[];
  conditions: ConditionType[];
  insurances: string[];
}

// Get dashboard stats for a practitioner
export async function getDashboardStats(practitionerId: string): Promise<DashboardStats> {
  const practitioner = await prisma.practitioner.findUnique({
    where: { id: practitionerId },
    select: {
      profileViews: true,
      rating: true,
      reviewCount: true,
      membershipTier: true,
      membershipStatus: true,
    },
  });

  if (!practitioner) {
    throw new Error('Practitioner not found');
  }

  // Get leads from this month
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const newLeadsThisMonth = await prisma.lead.count({
    where: {
      practitionerId,
      createdAt: {
        gte: startOfMonth,
      },
    },
  });

  return {
    profileViews: practitioner.profileViews,
    newLeadsThisMonth,
    rating: practitioner.rating,
    totalReviews: practitioner.reviewCount,
    membershipTier: practitioner.membershipTier,
    membershipStatus: practitioner.membershipStatus,
  };
}

// Get recent leads for dashboard
export async function getRecentLeads(practitionerId: string, limit = 5): Promise<LeadData[]> {
  const leads = await prisma.lead.findMany({
    where: { practitionerId },
    orderBy: { createdAt: 'desc' },
    take: limit,
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      message: true,
      status: true,
      condition: true,
      source: true,
      createdAt: true,
    },
  });

  return leads;
}

// Get all leads with filtering
export async function getLeads(
  practitionerId: string,
  status?: LeadStatus,
  page = 1,
  pageSize = 10
): Promise<{ leads: LeadData[]; total: number }> {
  const where = {
    practitionerId,
    ...(status && { status }),
  };

  const [leads, total] = await Promise.all([
    prisma.lead.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        message: true,
        status: true,
        condition: true,
        source: true,
        createdAt: true,
      },
    }),
    prisma.lead.count({ where }),
  ]);

  return { leads, total };
}

// Update lead status
export async function updateLeadStatus(
  leadId: string,
  status: LeadStatus
): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.lead.update({
      where: { id: leadId },
      data: { status },
    });

    revalidatePath('/dashboard/leads');
    return { success: true };
  } catch (error) {
    console.error('Error updating lead status:', error);
    return { success: false, error: 'Failed to update lead status' };
  }
}

// Get practitioner profile for editing
export async function getPractitionerProfile(practitionerId: string): Promise<PractitionerProfile | null> {
  const practitioner = await prisma.practitioner.findUnique({
    where: { id: practitionerId },
    include: {
      treatments: {
        select: { treatmentType: true },
      },
      conditions: {
        select: { condition: true },
      },
      insurances: {
        select: { insuranceName: true },
      },
    },
  });

  if (!practitioner) {
    return null;
  }

  return {
    id: practitioner.id,
    firstName: practitioner.firstName,
    lastName: practitioner.lastName,
    title: practitioner.title,
    credentials: practitioner.credentials,
    specialty: practitioner.specialty,
    bio: practitioner.bio,
    profileImage: practitioner.profileImage,
    practiceName: practitioner.practiceName,
    address: practitioner.address,
    city: practitioner.city,
    state: practitioner.state,
    zipCode: practitioner.zipCode,
    phone: practitioner.phone,
    website: practitioner.website,
    licenseNumber: practitioner.licenseNumber,
    licenseState: practitioner.licenseState,
    npiNumber: practitioner.npiNumber,
    treatments: practitioner.treatments.map((t) => t.treatmentType),
    conditions: practitioner.conditions.map((c) => c.condition),
    insurances: practitioner.insurances.map((i) => i.insuranceName),
  };
}

// Update practitioner profile
export async function updatePractitionerProfile(
  practitionerId: string,
  data: Partial<Omit<PractitionerProfile, 'id' | 'treatments' | 'conditions' | 'insurances'>> & {
    treatments?: TreatmentType[];
    conditions?: ConditionType[];
    insurances?: string[];
  }
): Promise<{ success: boolean; error?: string }> {
  try {
    const { treatments, conditions, insurances, ...profileData } = data;

    // Update profile data
    await prisma.practitioner.update({
      where: { id: practitionerId },
      data: profileData,
    });

    // Update treatments if provided
    if (treatments !== undefined) {
      await prisma.practitionerTreatment.deleteMany({
        where: { practitionerId },
      });
      if (treatments.length > 0) {
        await prisma.practitionerTreatment.createMany({
          data: treatments.map((treatmentType) => ({
            practitionerId,
            treatmentType,
          })),
        });
      }
    }

    // Update conditions if provided
    if (conditions !== undefined) {
      await prisma.practitionerCondition.deleteMany({
        where: { practitionerId },
      });
      if (conditions.length > 0) {
        await prisma.practitionerCondition.createMany({
          data: conditions.map((condition) => ({
            practitionerId,
            condition,
          })),
        });
      }
    }

    // Update insurances if provided
    if (insurances !== undefined) {
      await prisma.practitionerInsurance.deleteMany({
        where: { practitionerId },
      });
      if (insurances.length > 0) {
        await prisma.practitionerInsurance.createMany({
          data: insurances.map((insuranceName) => ({
            practitionerId,
            insuranceName,
          })),
        });
      }
    }

    revalidatePath('/dashboard/profile');
    return { success: true };
  } catch (error) {
    console.error('Error updating practitioner profile:', error);
    return { success: false, error: 'Failed to update profile' };
  }
}

// Export leads to CSV (for Premium+ members)
export async function exportLeadsToCSV(
  practitionerId: string
): Promise<{ success: boolean; data?: string; error?: string }> {
  try {
    // Verify membership tier allows export
    const practitioner = await prisma.practitioner.findUnique({
      where: { id: practitionerId },
      select: { membershipTier: true },
    });

    if (!practitioner) {
      return { success: false, error: 'Practitioner not found' };
    }

    const allowedTiers = ['PREMIUM', 'ELITE', 'ENTERPRISE'];
    if (!allowedTiers.includes(practitioner.membershipTier)) {
      return { success: false, error: 'Export is available for Premium members and above' };
    }

    const leads = await prisma.lead.findMany({
      where: { practitionerId },
      orderBy: { createdAt: 'desc' },
    });

    // Generate CSV
    const headers = ['Date', 'First Name', 'Last Name', 'Email', 'Phone', 'Condition', 'Status', 'Source', 'Message'];
    const rows = leads.map((lead) => [
      lead.createdAt.toISOString(),
      lead.firstName,
      lead.lastName,
      lead.email,
      lead.phone || '',
      lead.condition || '',
      lead.status,
      lead.source,
      `"${(lead.message || '').replace(/"/g, '""')}"`,
    ]);

    const csv = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');

    return { success: true, data: csv };
  } catch (error) {
    console.error('Error exporting leads:', error);
    return { success: false, error: 'Failed to export leads' };
  }
}

// Get reviews for the practitioner
export async function getReviews(
  practitionerId: string,
  page = 1,
  pageSize = 10
): Promise<{ reviews: Array<{
  id: string;
  rating: number;
  title: string | null;
  content: string | null;
  isVerified: boolean;
  createdAt: Date;
}>; total: number }> {
  const where = {
    practitionerId,
    isPublished: true,
  };

  const [reviews, total] = await Promise.all([
    prisma.review.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: {
        id: true,
        rating: true,
        title: true,
        content: true,
        isVerified: true,
        createdAt: true,
      },
    }),
    prisma.review.count({ where }),
  ]);

  return { reviews, total };
}
