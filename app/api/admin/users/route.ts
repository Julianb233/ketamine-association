import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { adminUsersQuerySchema, updateUserRoleSchema } from "@/lib/validations";

// Type for user where clause
interface UserWhereInput {
  role?: string;
  OR?: Array<{
    email?: { contains: string; mode: "insensitive" };
    name?: { contains: string; mode: "insensitive" };
  }>;
}

// Type for user with relations
interface UserWithRelations {
  id: string;
  email: string;
  name: string | null;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  practitioner: {
    id: string;
    firstName: string;
    lastName: string;
    membershipTier: string;
    membershipStatus: string;
    isVerified: boolean;
  } | null;
  patient: {
    id: string;
    firstName: string | null;
    lastName: string | null;
    isPremium: boolean;
  } | null;
}

// GET: List users with filters
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const supabase = await createClient();
    const { data: { user: authUser } } = await supabase.auth.getUser();
    const userId = authUser?.id;
    if (!userId) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Verify admin role
    const adminUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (!adminUser || (adminUser.role !== "ADMIN" && adminUser.role !== "MODERATOR")) {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const queryParams = Object.fromEntries(searchParams.entries());
    const validationResult = adminUsersQuerySchema.safeParse(queryParams);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid query parameters", details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const { page, limit, role, search } = validationResult.data;

    // Build where clause - using Record<string, unknown> to avoid Prisma type conflicts
    const where: Record<string, unknown> = {};

    if (role) {
      where.role = role;
    }

    if (search) {
      where.OR = [
        { email: { contains: search, mode: "insensitive" } },
        { name: { contains: search, mode: "insensitive" } },
      ];
    }

    const skip = (page - 1) * limit;

    // Fetch users with count
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
          updatedAt: true,
          practitioner: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              membershipTier: true,
              membershipStatus: true,
              isVerified: true,
            },
          },
          patient: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              isPremium: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.user.count({ where }),
    ]);

    // Format response
    const formattedUsers = (users as UserWithRelations[]).map((user) => ({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      practitioner: user.practitioner
        ? {
            id: user.practitioner.id,
            name: `${user.practitioner.firstName} ${user.practitioner.lastName}`,
            membershipTier: user.practitioner.membershipTier,
            membershipStatus: user.practitioner.membershipStatus,
            isVerified: user.practitioner.isVerified,
          }
        : null,
      patient: user.patient
        ? {
            id: user.patient.id,
            name: `${user.patient.firstName || ""} ${user.patient.lastName || ""}`.trim() || null,
            isPremium: user.patient.isPremium,
          }
        : null,
    }));

    return NextResponse.json({
      users: formattedUsers,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: skip + users.length < total,
      },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

// PATCH: Update user role
export async function PATCH(request: NextRequest) {
  try {
    // Check authentication
    const supabase = await createClient();
    const { data: { user: authUser } } = await supabase.auth.getUser();
    const userId = authUser?.id;
    if (!userId) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Verify admin role (only ADMIN can change roles, not MODERATOR)
    const adminUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (!adminUser || adminUser.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { targetUserId, ...updateData } = body;

    if (!targetUserId) {
      return NextResponse.json(
        { error: "Target user ID is required" },
        { status: 400 }
      );
    }

    const validationResult = updateUserRoleSchema.safeParse(updateData);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid data", details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const { role } = validationResult.data;

    // Prevent changing own role
    if (targetUserId === userId) {
      return NextResponse.json(
        { error: "You cannot change your own role" },
        { status: 400 }
      );
    }

    // Find the target user
    const targetUser = await prisma.user.findUnique({
      where: { id: targetUserId },
    });

    if (!targetUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Update the user role
    const updatedUser = await prisma.user.update({
      where: { id: targetUserId },
      data: { role },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    return NextResponse.json({
      message: "User role updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user role:", error);
    return NextResponse.json(
      { error: "Failed to update user role" },
      { status: 500 }
    );
  }
}
