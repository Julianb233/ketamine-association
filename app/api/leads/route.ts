import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { sendEmail, emailTemplates } from "@/lib/email";
import { createLeadSchema, leadsQuerySchema } from "@/lib/validations";

// Condition types from Prisma schema
const CONDITION_TYPES = [
  "TREATMENT_RESISTANT_DEPRESSION",
  "CHRONIC_PAIN",
  "PTSD",
  "ANXIETY",
  "OCD",
  "BIPOLAR_DEPRESSION",
  "FIBROMYALGIA",
  "CRPS",
  "SUICIDAL_IDEATION",
] as const;

type ConditionType = (typeof CONDITION_TYPES)[number];

// Membership tiers
type MembershipTier = "FREE" | "PROFESSIONAL" | "PREMIUM" | "ELITE" | "ENTERPRISE";

interface LeadSubmissionBody {
  practitionerId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message?: string;
  condition?: string;
}

// Lead limits by membership tier
const LEAD_LIMITS: Record<MembershipTier, number> = {
  FREE: 0,
  PROFESSIONAL: 5,
  PREMIUM: 20,
  ELITE: Infinity,
  ENTERPRISE: Infinity,
};

export async function POST(request: NextRequest) {
  try {
    const body: LeadSubmissionBody = await request.json();

    // Validate required fields
    if (!body.practitionerId) {
      return NextResponse.json(
        { success: false, error: "Practitioner ID is required" },
        { status: 400 }
      );
    }

    if (!body.firstName || !body.lastName) {
      return NextResponse.json(
        { success: false, error: "First name and last name are required" },
        { status: 400 }
      );
    }

    if (!body.email) {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Find the practitioner
    const practitioner = await prisma.practitioner.findUnique({
      where: { id: body.practitionerId },
      include: {
        user: {
          select: { email: true },
        },
      },
    });

    if (!practitioner) {
      return NextResponse.json(
        { success: false, error: "Practitioner not found" },
        { status: 404 }
      );
    }

    // Check if practitioner's membership allows leads
    const leadLimit = LEAD_LIMITS[practitioner.membershipTier];

    if (leadLimit === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "This provider is not currently accepting consultation requests through our platform",
        },
        { status: 403 }
      );
    }

    // Check current month's lead count
    if (leadLimit !== Infinity) {
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const currentMonthLeadCount = await prisma.lead.count({
        where: {
          practitionerId: body.practitionerId,
          createdAt: { gte: startOfMonth },
        },
      });

      if (currentMonthLeadCount >= leadLimit) {
        return NextResponse.json(
          {
            success: false,
            error: "This provider has reached their monthly consultation request limit",
          },
          { status: 403 }
        );
      }
    }

    // Validate condition if provided
    let conditionType: ConditionType | undefined;
    if (body.condition) {
      const conditionUpper = body.condition.toUpperCase().replace(/-/g, "_") as ConditionType;
      if (CONDITION_TYPES.includes(conditionUpper)) {
        conditionType = conditionUpper;
      }
    }

    // Create the lead record
    const lead = await prisma.lead.create({
      data: {
        practitionerId: body.practitionerId,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone || null,
        message: body.message || null,
        condition: conditionType,
        source: "DIRECTORY",
        status: "NEW",
      },
    });

    // Send notification email to practitioner
    const practitionerName = `${practitioner.title || ""} ${practitioner.firstName} ${practitioner.lastName}`.trim();
    const patientName = `${body.firstName} ${body.lastName}`;

    const dashboardUrl = `${process.env.NEXT_PUBLIC_APP_URL || "https://ketamineassociation.org"}/dashboard/practitioner/leads`;

    try {
      const practitionerEmailTemplate = emailTemplates.newLead({
        practitionerName,
        patientName,
        patientEmail: body.email,
        patientPhone: body.phone,
        message: body.message,
        condition: conditionType
          ? conditionType.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (char: string) => char.toUpperCase())
          : undefined,
        dashboardUrl,
      });

      await sendEmail({
        to: practitioner.user.email,
        subject: practitionerEmailTemplate.subject,
        html: practitionerEmailTemplate.html,
        replyTo: body.email,
      });
    } catch (emailError) {
      console.error("Failed to send practitioner notification email:", emailError);
      // Don't fail the request if email fails
    }

    // Send confirmation email to patient
    try {
      const patientEmailTemplate = emailTemplates.leadConfirmation({
        patientName,
        practitionerName,
        practitionerCity: practitioner.city || "their location",
        practitionerState: practitioner.state || "",
      });

      await sendEmail({
        to: body.email,
        subject: patientEmailTemplate.subject,
        html: patientEmailTemplate.html,
      });
    } catch (emailError) {
      console.error("Failed to send patient confirmation email:", emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json({
      success: true,
      data: {
        leadId: lead.id,
        message: "Your consultation request has been sent successfully",
      },
    });
  } catch (error) {
    console.error("Lead submission error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to submit consultation request",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const supabase = await createClient();
    const { data: { user: authUser } } = await supabase.auth.getUser();
    const userId = authUser?.id;
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    // Get practitioner for this user
    const practitioner = await prisma.practitioner.findFirst({
      where: {
        user: { id: userId },
      },
    });

    if (!practitioner) {
      return NextResponse.json(
        { success: false, error: "Practitioner profile not found" },
        { status: 404 }
      );
    }

    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const queryParams = Object.fromEntries(searchParams.entries());
    const validationResult = leadsQuerySchema.safeParse(queryParams);

    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, error: "Invalid query parameters", details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const { page, limit, status, source } = validationResult.data;

    // Build where clause
    const where: {
      practitionerId: string;
      status?: typeof status;
      source?: typeof source;
    } = {
      practitionerId: practitioner.id,
    };

    if (status) {
      where.status = status;
    }

    if (source) {
      where.source = source;
    }

    const skip = (page - 1) * limit;

    // Fetch leads with count
    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          message: true,
          source: true,
          status: true,
          condition: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.lead.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        leads,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
          hasMore: skip + leads.length < total,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching leads:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}
