import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { sendEmail } from "@/lib/email";
import { eventRegistrationEmail } from "@/lib/email-templates";

// Validation schema for event registration
const eventRegistrationSchema = z.object({
  eventId: z.string().min(1, "Event ID is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  organization: z.string().optional(),
  isMember: z.boolean().default(false),
  amountPaid: z.number().min(0).default(0),
});

// POST: Register for an event
export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validationResult = eventRegistrationSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid data", details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const { eventId, firstName, lastName, email, amountPaid } = validationResult.data;

    // Find event by slug or ID
    const event = await prisma.event.findFirst({
      where: {
        OR: [
          { id: eventId },
          { slug: eventId },
        ],
        isPublished: true,
      },
      include: {
        _count: {
          select: { registrations: true },
        },
      },
    });

    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    // Check capacity
    if (event.capacity && event._count.registrations >= event.capacity) {
      return NextResponse.json(
        { error: "This event is at full capacity" },
        { status: 400 }
      );
    }

    // Check for existing registration
    const existingRegistration = await prisma.eventRegistration.findUnique({
      where: {
        eventId_email: {
          eventId: event.id,
          email: email.toLowerCase(),
        },
      },
    });

    if (existingRegistration) {
      return NextResponse.json(
        { error: "You are already registered for this event" },
        { status: 400 }
      );
    }

    // Check if user is authenticated and get practitioner ID if applicable
    const supabase = await createClient();
    const { data: { user: authUser } } = await supabase.auth.getUser();
    const userId = authUser?.id;
    let practitionerId: string | null = null;

    if (userId) {
      const practitioner = await prisma.practitioner.findFirst({
        where: { userId },
        select: { id: true },
      });
      if (practitioner) {
        practitionerId = practitioner.id;
      }
    }

    // Create registration
    const registration = await prisma.eventRegistration.create({
      data: {
        eventId: event.id,
        practitionerId,
        email: email.toLowerCase(),
        firstName,
        lastName,
        amountPaid,
        status: "REGISTERED",
      },
    });

    // Send confirmation email
    try {
      const isVirtual = event.isVirtual ?? false;
      const eventDate = event.startDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      const eventTime = event.startDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        timeZoneName: 'short',
      });

      const emailContent = eventRegistrationEmail({
        name: `${firstName} ${lastName}`,
        email: email.toLowerCase(),
        eventTitle: event.title,
        eventDate,
        eventTime,
        eventLocation: event.location ?? undefined,
        virtualUrl: event.virtualUrl ?? undefined,
        isVirtual,
        registrationId: registration.id,
        eventDescription: event.description ?? undefined,
      });

      await sendEmail({
        to: email.toLowerCase(),
        subject: emailContent.subject,
        html: emailContent.html,
        text: emailContent.text,
      });
    } catch (emailError) {
      // Log the error but don't fail the registration
      console.error("Failed to send event registration confirmation email:", emailError);
    }

    // TODO: Process payment if needed (Stripe integration)

    return NextResponse.json(
      {
        message: "Registration successful",
        registration: {
          id: registration.id,
          eventId: event.id,
          eventTitle: event.title,
          eventDate: event.startDate,
          status: registration.status,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering for event:", error);
    return NextResponse.json(
      { error: "Failed to complete registration" },
      { status: 500 }
    );
  }
}

// GET: Check registration status
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get("eventId");
    const email = searchParams.get("email");

    if (!eventId || !email) {
      return NextResponse.json(
        { error: "Event ID and email are required" },
        { status: 400 }
      );
    }

    // Find event
    const event = await prisma.event.findFirst({
      where: {
        OR: [
          { id: eventId },
          { slug: eventId },
        ],
      },
    });

    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    // Check registration
    const registration = await prisma.eventRegistration.findUnique({
      where: {
        eventId_email: {
          eventId: event.id,
          email: email.toLowerCase(),
        },
      },
      select: {
        id: true,
        status: true,
        createdAt: true,
        amountPaid: true,
      },
    });

    if (!registration) {
      return NextResponse.json({
        registered: false,
      });
    }

    return NextResponse.json({
      registered: true,
      registration: {
        id: registration.id,
        status: registration.status,
        registeredAt: registration.createdAt,
        amountPaid: registration.amountPaid,
      },
    });
  } catch (error) {
    console.error("Error checking registration:", error);
    return NextResponse.json(
      { error: "Failed to check registration status" },
      { status: 500 }
    );
  }
}
