import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { verifyPractitionerSchema } from "@/lib/validations";

// POST: Verify practitioner
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: practitionerId } = await params;

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

    // Parse and validate request body
    const body = await request.json();
    const validationResult = verifyPractitionerSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid data", details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const { verified, notes } = validationResult.data;

    // Find the practitioner
    const practitioner = await prisma.practitioner.findUnique({
      where: { id: practitionerId },
      include: {
        user: {
          select: { email: true },
        },
      },
    });

    if (!practitioner) {
      return NextResponse.json(
        { error: "Practitioner not found" },
        { status: 404 }
      );
    }

    // Update verification status
    const updatedPractitioner = await prisma.practitioner.update({
      where: { id: practitionerId },
      data: {
        isVerified: verified,
        verifiedAt: verified ? new Date() : null,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        isVerified: true,
        verifiedAt: true,
      },
    });

    // Log the verification action (could be expanded to a full audit log)
    console.log(
      `Practitioner ${practitionerId} verification ${verified ? "approved" : "revoked"} by admin ${userId}${notes ? `. Notes: ${notes}` : ""}`
    );

    return NextResponse.json({
      message: verified
        ? "Practitioner verified successfully"
        : "Practitioner verification revoked",
      practitioner: {
        id: updatedPractitioner.id,
        name: `${updatedPractitioner.firstName} ${updatedPractitioner.lastName}`,
        isVerified: updatedPractitioner.isVerified,
        verifiedAt: updatedPractitioner.verifiedAt,
      },
    });
  } catch (error) {
    console.error("Error verifying practitioner:", error);
    return NextResponse.json(
      { error: "Failed to update practitioner verification" },
      { status: 500 }
    );
  }
}
