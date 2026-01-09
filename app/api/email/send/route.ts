import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sendEmail } from '@/lib/email';
import {
  welcomeEmail,
  eventRegistrationEmail,
  consultationRequestEmail,
  consultationConfirmationEmail,
  orderConfirmationEmail,
} from '@/lib/email-templates';

// Validation schemas for each email type
const welcomeSchema = z.object({
  type: z.literal('welcome'),
  data: z.object({
    name: z.string().min(1),
    email: z.string().email(),
    role: z.enum(['PATIENT', 'PRACTITIONER']),
    dashboardUrl: z.string().url().optional(),
  }),
});

const eventRegistrationSchema = z.object({
  type: z.literal('event-registration'),
  data: z.object({
    name: z.string().min(1),
    email: z.string().email(),
    eventTitle: z.string().min(1),
    eventDate: z.string().min(1),
    eventTime: z.string().optional(),
    eventLocation: z.string().optional(),
    virtualUrl: z.string().url().optional(),
    isVirtual: z.boolean(),
    registrationId: z.string().min(1),
    eventDescription: z.string().optional(),
    calendarUrl: z.string().url().optional(),
  }),
});

const consultationRequestSchema = z.object({
  type: z.literal('consultation-request'),
  data: z.object({
    practitionerName: z.string().min(1),
    practitionerEmail: z.string().email(),
    patientName: z.string().min(1),
    patientEmail: z.string().email(),
    patientPhone: z.string().optional(),
    notes: z.string().optional(),
    condition: z.string().optional(),
    dashboardUrl: z.string().url(),
  }),
});

const consultationConfirmationSchema = z.object({
  type: z.literal('consultation-confirmation'),
  data: z.object({
    patientName: z.string().min(1),
    patientEmail: z.string().email(),
    practitionerName: z.string().min(1),
    practitionerCredentials: z.string().optional(),
    practitionerCity: z.string().min(1),
    practitionerState: z.string().min(1),
    consultationId: z.string().min(1),
  }),
});

const orderConfirmationSchema = z.object({
  type: z.literal('order-confirmation'),
  data: z.object({
    customerName: z.string().min(1),
    email: z.string().email(),
    orderId: z.string().min(1),
    items: z.array(z.object({
      name: z.string(),
      quantity: z.number(),
      price: z.number(),
      image: z.string().optional(),
      isDigital: z.boolean().optional(),
    })),
    subtotal: z.number(),
    shipping: z.number(),
    tax: z.number(),
    total: z.number(),
    shippingAddress: z.object({
      firstName: z.string(),
      lastName: z.string(),
      address: z.string(),
      apartment: z.string().optional(),
      city: z.string(),
      state: z.string(),
      zipCode: z.string(),
    }).optional(),
    hasDigitalItems: z.boolean(),
    hasPhysicalItems: z.boolean(),
    estimatedDelivery: z.string().optional(),
    trackingUrl: z.string().url().optional(),
    downloadUrl: z.string().url().optional(),
  }),
});

// Union schema for all email types
const emailRequestSchema = z.discriminatedUnion('type', [
  welcomeSchema,
  eventRegistrationSchema,
  consultationRequestSchema,
  consultationConfirmationSchema,
  orderConfirmationSchema,
]);

// Simple API key validation for internal use
function validateApiKey(request: NextRequest): boolean {
  const apiKey = request.headers.get('x-api-key');
  const internalKey = process.env.INTERNAL_API_KEY;

  // If no internal key is set, only allow in development
  if (!internalKey) {
    return process.env.NODE_ENV === 'development';
  }

  return apiKey === internalKey;
}

export async function POST(request: NextRequest) {
  try {
    // Validate API key for external requests
    // Skip validation for internal server-side calls (no origin or localhost)
    const origin = request.headers.get('origin');
    const isInternalCall = !origin || origin.includes('localhost') || origin.includes('ketamineassociation.org');

    if (!isInternalCall && !validateApiKey(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validationResult = emailRequestSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const emailRequest = validationResult.data;
    let emailContent: { subject: string; html: string; text?: string };
    let recipientEmail: string;

    // Generate email content based on type
    switch (emailRequest.type) {
      case 'welcome': {
        const { data } = emailRequest;
        emailContent = welcomeEmail(data);
        recipientEmail = data.email;
        break;
      }

      case 'event-registration': {
        const { data } = emailRequest;
        emailContent = eventRegistrationEmail(data);
        recipientEmail = data.email;
        break;
      }

      case 'consultation-request': {
        const { data } = emailRequest;
        emailContent = consultationRequestEmail({
          practitionerName: data.practitionerName,
          patientName: data.patientName,
          patientEmail: data.patientEmail,
          patientPhone: data.patientPhone,
          notes: data.notes,
          condition: data.condition,
          dashboardUrl: data.dashboardUrl,
        });
        recipientEmail = data.practitionerEmail;
        break;
      }

      case 'consultation-confirmation': {
        const { data } = emailRequest;
        emailContent = consultationConfirmationEmail({
          patientName: data.patientName,
          practitionerName: data.practitionerName,
          practitionerCredentials: data.practitionerCredentials,
          practitionerCity: data.practitionerCity,
          practitionerState: data.practitionerState,
          consultationId: data.consultationId,
        });
        recipientEmail = data.patientEmail;
        break;
      }

      case 'order-confirmation': {
        const { data } = emailRequest;
        emailContent = orderConfirmationEmail(data);
        recipientEmail = data.email;
        break;
      }

      default:
        return NextResponse.json(
          { error: 'Unknown email type' },
          { status: 400 }
        );
    }

    // Send the email
    const result = await sendEmail({
      to: recipientEmail,
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text,
    });

    return NextResponse.json({
      success: true,
      messageId: result?.id,
      type: emailRequest.type,
      recipient: recipientEmail,
    });

  } catch (error) {
    console.error('Email send error:', error);

    if (error instanceof Error) {
      return NextResponse.json(
        { error: 'Failed to send email', message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}

// GET endpoint for health check
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'email',
    supportedTypes: [
      'welcome',
      'event-registration',
      'consultation-request',
      'consultation-confirmation',
      'order-confirmation',
    ],
  });
}
