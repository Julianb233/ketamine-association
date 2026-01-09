import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { sendEmail, emailTemplates } from "@/lib/email";
import {
  consultationsQuerySchema,
  createConsultationSchema,
  updateConsultationSchema,
} from "@/lib/validations";
import type { Prisma, ConsultationStatus } from "@prisma/client";

// Type for consultation with relations
interface ConsultationWithRelations {
  id: string;
  status: string;
  requestedAt: Date;
  scheduledAt: Date | null;
  completedAt: Date | null;
  notes: string | null;
  patient: {
    id: string;
    firstName: string | null;
    lastName: string | null;
    user: {
      email: string;
    };
  };
  practitioner: {
    id: string;
    firstName: string;
    lastName: string;
    credentials: string | null;
    slug: string;
    profileImage: string | null;
  };
}

// GET: List consultations for patient or practitioner
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

    // Get user with related profiles
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        patient: true,
        practitioner: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const queryParams = Object.fromEntries(searchParams.entries());
    const validationResult = consultationsQuerySchema.safeParse(queryParams);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid query parameters", details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const { page, limit, status } = validationResult.data;

    // Build where clause based on user role
    const where: Prisma.ConsultationWhereInput = {};

    if (user.role === "PATIENT" && user.patient) {
      where.patientId = user.patient.id;
    } else if (user.role === "PRACTITIONER" && user.practitioner) {
      where.practitionerId = user.practitioner.id;
    } else if (user.role === "ADMIN" || user.role === "MODERATOR") {
      // Admins can see all consultations
    } else {
      return NextResponse.json(
        { error: "No patient or practitioner profile found" },
        { status: 404 }
      );
    }

    if (status) {
      where.status = status as ConsultationStatus;
    }

    const skip = (page - 1) * limit;

    // Fetch consultations
    const [consultations, total] = await Promise.all([
      prisma.consultation.findMany({
        where,
        select: {
          id: true,
          status: true,
          requestedAt: true,
          scheduledAt: true,
          completedAt: true,
          notes: true,
          patient: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              user: {
                select: { email: true },
              },
            },
          },
          practitioner: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              credentials: true,
              slug: true,
              profileImage: true,
            },
          },
        },
        orderBy: { requestedAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.consultation.count({ where }),
    ]);

    // Format response based on user role
    const formattedConsultations = (consultations as ConsultationWithRelations[]).map((consultation) => ({
      id: consultation.id,
      status: consultation.status,
      requestedAt: consultation.requestedAt,
      scheduledAt: consultation.scheduledAt,
      completedAt: consultation.completedAt,
      notes: consultation.notes,
      patient: {
        id: consultation.patient.id,
        name: `${consultation.patient.firstName || ""} ${consultation.patient.lastName || ""}`.trim() || "Anonymous",
        email: user.role === "PRACTITIONER" || user.role === "ADMIN" || user.role === "MODERATOR"
          ? consultation.patient.user.email
          : undefined,
      },
      practitioner: {
        id: consultation.practitioner.id,
        name: `${consultation.practitioner.firstName} ${consultation.practitioner.lastName}${consultation.practitioner.credentials ? `, ${consultation.practitioner.credentials}` : ""}`,
        slug: consultation.practitioner.slug,
        profileImage: consultation.practitioner.profileImage,
      },
    }));

    return NextResponse.json({
      consultations: formattedConsultations,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: skip + consultations.length < total,
      },
    });
  } catch (error) {
    console.error("Error fetching consultations:", error);
    return NextResponse.json(
      { error: "Failed to fetch consultations" },
      { status: 500 }
    );
  }
}

// POST: Request consultation
export async function POST(request: NextRequest) {
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

    // Get user with patient profile
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { patient: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    if (user.role !== "PATIENT" || !user.patient) {
      return NextResponse.json(
        { error: "Only patients can request consultations" },
        { status: 403 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validationResult = createConsultationSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid data", details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const { practitionerId, notes } = validationResult.data;

    // Verify practitioner exists and is accepting consultations
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

    // Check for existing pending/scheduled consultation
    const existingConsultation = await prisma.consultation.findFirst({
      where: {
        patientId: user.patient.id,
        practitionerId,
        status: { in: ["REQUESTED", "SCHEDULED"] },
      },
    });

    if (existingConsultation) {
      return NextResponse.json(
        { error: "You already have a pending or scheduled consultation with this practitioner" },
        { status: 400 }
      );
    }

    // Create the consultation
    const consultation = await prisma.consultation.create({
      data: {
        patientId: user.patient.id,
        practitionerId,
        notes,
        status: "REQUESTED",
      },
    });

    // Send notification email to practitioner
    const patientName = `${user.patient.firstName || ""} ${user.patient.lastName || ""}`.trim() || "A patient";
    const practitionerName = `${practitioner.title || ""} ${practitioner.firstName} ${practitioner.lastName}`.trim();
    const dashboardUrl = `${process.env.NEXT_PUBLIC_APP_URL || "https://ketamineassociation.org"}/dashboard/practitioner/consultations`;

    try {
      const emailTemplate = emailTemplates.consultationRequest({
        practitionerName,
        patientName,
        notes,
        dashboardUrl,
      });

      await sendEmail({
        to: practitioner.user.email,
        subject: emailTemplate.subject,
        html: emailTemplate.html,
      });
    } catch (emailError) {
      console.error("Failed to send consultation notification email:", emailError);
    }

    return NextResponse.json(
      {
        message: "Consultation request submitted successfully",
        consultation: {
          id: consultation.id,
          status: consultation.status,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating consultation:", error);
    return NextResponse.json(
      { error: "Failed to create consultation request" },
      { status: 500 }
    );
  }
}

// PATCH: Update consultation status
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

    // Get user with related profiles
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        patient: true,
        practitioner: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { consultationId, ...updateData } = body;

    if (!consultationId) {
      return NextResponse.json(
        { error: "Consultation ID is required" },
        { status: 400 }
      );
    }

    const validationResult = updateConsultationSchema.safeParse(updateData);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid data", details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const { status, scheduledAt, notes } = validationResult.data;

    // Find the consultation
    const consultation = await prisma.consultation.findUnique({
      where: { id: consultationId },
    });

    if (!consultation) {
      return NextResponse.json(
        { error: "Consultation not found" },
        { status: 404 }
      );
    }

    // Check permissions
    const isPatient = user.patient && consultation.patientId === user.patient.id;
    const isPractitioner = user.practitioner && consultation.practitionerId === user.practitioner.id;
    const isAdmin = user.role === "ADMIN" || user.role === "MODERATOR";

    if (!isPatient && !isPractitioner && !isAdmin) {
      return NextResponse.json(
        { error: "You don't have permission to update this consultation" },
        { status: 403 }
      );
    }

    // Validate status transitions
    const allowedTransitions: Record<string, string[]> = {
      REQUESTED: ["SCHEDULED", "CANCELLED"],
      SCHEDULED: ["COMPLETED", "CANCELLED", "NO_SHOW"],
      COMPLETED: [],
      CANCELLED: [],
      NO_SHOW: [],
    };

    if (!allowedTransitions[consultation.status]?.includes(status)) {
      return NextResponse.json(
        { error: `Cannot transition from ${consultation.status} to ${status}` },
        { status: 400 }
      );
    }

    // Patients can only cancel
    if (isPatient && status !== "CANCELLED") {
      return NextResponse.json(
        { error: "Patients can only cancel consultations" },
        { status: 403 }
      );
    }

    // Update the consultation
    const updatedConsultation = await prisma.consultation.update({
      where: { id: consultationId },
      data: {
        status,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : undefined,
        completedAt: status === "COMPLETED" ? new Date() : undefined,
        notes: notes || undefined,
      },
    });

    return NextResponse.json({
      message: "Consultation updated successfully",
      consultation: {
        id: updatedConsultation.id,
        status: updatedConsultation.status,
        scheduledAt: updatedConsultation.scheduledAt,
      },
    });
  } catch (error) {
    console.error("Error updating consultation:", error);
    return NextResponse.json(
      { error: "Failed to update consultation" },
      { status: 500 }
    );
  }
}
