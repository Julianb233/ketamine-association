import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { sendEmail, emailTemplates } from "@/lib/email";
import { eventRegistrationSchema } from "@/lib/validations";

// POST: Register for event
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: eventId } = await params;

    // Parse and validate request body
    const body = await request.json();
    const validationResult = eventRegistrationSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid data", details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const { email, firstName, lastName } = validationResult.data;
    const normalizedEmail = email.toLowerCase().trim();

    // Get the event
    const event = await prisma.event.findUnique({
      where: { id: eventId },
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

    if (!event.isPublished) {
      return NextResponse.json(
        { error: "This event is not currently accepting registrations" },
        { status: 400 }
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
          eventId,
          email: normalizedEmail,
        },
      },
    });

    if (existingRegistration) {
      return NextResponse.json(
        { error: "You are already registered for this event" },
        { status: 400 }
      );
    }

    // Check if user is authenticated and has a practitioner profile (for member pricing)
    const supabase = await createClient();
    const { data: { user: authUser } } = await supabase.auth.getUser();
    const userId = authUser?.id;
    let practitioner = null;
    let priceToCharge = event.price;

    if (userId) {
      practitioner = await prisma.practitioner.findFirst({
        where: { user: { id: userId } },
        select: {
          id: true,
          membershipTier: true,
          membershipStatus: true,
        },
      });

      // Apply member pricing if applicable
      if (
        practitioner &&
        practitioner.membershipStatus === "ACTIVE" &&
        event.memberPrice !== null &&
        practitioner.membershipTier !== "FREE"
      ) {
        priceToCharge = event.memberPrice;
      }
    }

    // If event is free, create registration directly
    if (priceToCharge === 0) {
      const registration = await prisma.eventRegistration.create({
        data: {
          eventId,
          practitionerId: practitioner?.id || null,
          email: normalizedEmail,
          firstName,
          lastName,
          amountPaid: 0,
          status: "REGISTERED",
        },
      });

      // Send confirmation email
      try {
        const confirmationEmail = emailTemplates.eventRegistrationConfirmation({
          name: firstName,
          eventTitle: event.title,
          eventDate: event.startDate.toLocaleString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
            timeZoneName: "short",
          }),
          eventLocation: event.location || undefined,
          virtualUrl: event.virtualUrl || undefined,
          isVirtual: event.format === "VIRTUAL" || event.format === "HYBRID",
        });

        await sendEmail({
          to: normalizedEmail,
          subject: confirmationEmail.subject,
          html: confirmationEmail.html,
        });
      } catch (emailError) {
        console.error("Failed to send registration confirmation:", emailError);
      }

      return NextResponse.json(
        {
          message: "Successfully registered for the event",
          registration: {
            id: registration.id,
            status: registration.status,
          },
        },
        { status: 201 }
      );
    }

    // Create Stripe checkout session for paid events
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: event.title,
              description: `Registration for ${event.title}`,
            },
            unit_amount: Math.round(priceToCharge * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      customer_email: normalizedEmail,
      metadata: {
        eventId,
        email: normalizedEmail,
        firstName,
        lastName,
        practitionerId: practitioner?.id || "",
        type: "event_registration",
      },
      success_url: `${appUrl}/events/${event.slug}?registered=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/events/${event.slug}?cancelled=true`,
    });

    return NextResponse.json({
      requiresPayment: true,
      checkoutUrl: session.url,
      sessionId: session.id,
      price: priceToCharge,
    });
  } catch (error) {
    console.error("Error registering for event:", error);
    return NextResponse.json(
      { error: "Failed to register for event" },
      { status: 500 }
    );
  }
}
