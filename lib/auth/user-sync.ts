import { createClient, getUser } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';

export type UserType = 'practitioner' | 'patient';

// Define UserRole enum locally to avoid import issues before prisma generate
const UserRole = {
  PATIENT: 'PATIENT',
  PRACTITIONER: 'PRACTITIONER',
  ADMIN: 'ADMIN',
  MODERATOR: 'MODERATOR',
} as const;

type UserRoleType = (typeof UserRole)[keyof typeof UserRole];

interface SyncUserResult {
  success: boolean;
  user?: {
    id: string;
    email: string;
    role: UserRoleType;
  };
  error?: string;
}

/**
 * Syncs a Supabase user to our database and creates the appropriate
 * Practitioner or Patient record based on their selection.
 */
export async function syncUserToDatabase(
  userType: UserType
): Promise<SyncUserResult> {
  try {
    const supabaseUser = await getUser();

    if (!supabaseUser) {
      return { success: false, error: 'No authenticated user found' };
    }

    const email = supabaseUser.email;
    if (!email) {
      return { success: false, error: 'User has no email address' };
    }

    const role = userType === 'practitioner' ? UserRole.PRACTITIONER : UserRole.PATIENT;

    // Extract name from user metadata
    const fullName = supabaseUser.user_metadata?.full_name || '';
    const nameParts = fullName.split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    // Use a transaction to ensure data consistency
    const result = await prisma.$transaction(async (tx) => {
      // Check if user already exists
      let user = await tx.user.findUnique({
        where: { email },
        include: {
          practitioner: true,
          patient: true,
        },
      });

      if (user) {
        // User exists - check if they already have the role-specific record
        if (userType === 'practitioner' && !user.practitioner) {
          // Create practitioner record
          await tx.practitioner.create({
            data: {
              userId: user.id,
              slug: generateSlug(firstName, lastName, user.id),
              firstName,
              lastName,
            },
          });

          // Update user role
          user = await tx.user.update({
            where: { id: user.id },
            data: { role: UserRole.PRACTITIONER },
            include: {
              practitioner: true,
              patient: true,
            },
          });
        } else if (userType === 'patient' && !user.patient) {
          // Create patient record
          await tx.patient.create({
            data: {
              userId: user.id,
              firstName: firstName || null,
              lastName: lastName || null,
            },
          });

          // Update user role if needed (only if not already a practitioner)
          if (user.role !== UserRole.PRACTITIONER) {
            user = await tx.user.update({
              where: { id: user.id },
              data: { role: UserRole.PATIENT },
              include: {
                practitioner: true,
                patient: true,
              },
            });
          }
        }
      } else {
        // Create new user with role-specific record
        const name = fullName || undefined;

        user = await tx.user.create({
          data: {
            email,
            name,
            role,
            ...(userType === 'practitioner'
              ? {
                  practitioner: {
                    create: {
                      slug: generateSlug(firstName, lastName, supabaseUser.id),
                      firstName,
                      lastName,
                    },
                  },
                }
              : {
                  patient: {
                    create: {
                      firstName: firstName || null,
                      lastName: lastName || null,
                    },
                  },
                }),
          },
          include: {
            practitioner: true,
            patient: true,
          },
        });
      }

      return user;
    });

    return {
      success: true,
      user: {
        id: result.id,
        email: result.email,
        role: result.role,
      },
    };
  } catch (error) {
    console.error('Error syncing user to database:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Gets the database user for the current Supabase user
 */
export async function getCurrentDatabaseUser() {
  const supabaseUser = await getUser();

  if (!supabaseUser) {
    return null;
  }

  const email = supabaseUser.email;
  if (!email) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      practitioner: true,
      patient: true,
    },
  });

  return user;
}

/**
 * Generates a URL-friendly slug from name components
 */
function generateSlug(
  firstName: string | null,
  lastName: string | null,
  uniqueId: string
): string {
  const namePart = [firstName, lastName]
    .filter(Boolean)
    .join('-')
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .trim();

  const shortId = uniqueId.slice(-8);

  return namePart ? `${namePart}-${shortId}` : shortId;
}
