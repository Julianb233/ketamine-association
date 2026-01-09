import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail, emailTemplates } from "@/lib/email";
import { newsletterSubscribeSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate with zod
    const validationResult = newsletterSubscribeSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, error: "Invalid data", details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const { email, firstName, role } = validationResult.data;
    const normalizedEmail = email.toLowerCase().trim();

    // Check for existing subscriber
    const existingSubscriber = await prisma.newsletterSubscriber.findUnique({
      where: { email: normalizedEmail },
    });

    const isResubscribing = existingSubscriber && !existingSubscriber.isActive;

    // Upsert subscriber (update if exists, create if not)
    const subscriber = await prisma.newsletterSubscriber.upsert({
      where: { email: normalizedEmail },
      update: {
        firstName: firstName || undefined,
        role: role || "GENERAL",
        isActive: true,
        unsubscribedAt: null,
      },
      create: {
        email: normalizedEmail,
        firstName: firstName || null,
        role: role || "GENERAL",
        isActive: true,
      },
    });

    // Send welcome email only for new subscribers or resubscribers
    if (!existingSubscriber || isResubscribing) {
      try {
        const welcomeEmail = emailTemplates.newsletterWelcome({
          name: firstName || undefined,
          role: role || "GENERAL",
        });

        await sendEmail({
          to: normalizedEmail,
          subject: welcomeEmail.subject,
          html: welcomeEmail.html,
        });
      } catch (emailError) {
        console.error("Failed to send welcome email:", emailError);
        // Don't fail the subscription if email fails
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        id: subscriber.id,
        email: subscriber.email,
        message: existingSubscriber && existingSubscriber.isActive
          ? "You are already subscribed to the newsletter"
          : "Successfully subscribed to the newsletter",
      },
    });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to subscribe to newsletter",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
