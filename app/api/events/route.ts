import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { eventsQuerySchema, createEventSchema } from "@/lib/validations";

// Type for event where clause
interface EventWhereInput {
  isPublished: boolean;
  eventType?: string;
  format?: string;
  startDate?: {
    gte?: Date;
    lte?: Date;
  };
}

// Type for event with count
interface EventWithCount {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  eventType: string;
  format: string;
  startDate: Date;
  endDate: Date | null;
  timezone: string;
  location: string | null;
  virtualUrl: string | null;
  price: number;
  memberPrice: number | null;
  capacity: number | null;
  _count: {
    registrations: number;
  };
}

// GET: List published events with filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const queryParams = Object.fromEntries(searchParams.entries());

    // Validate query parameters
    const validationResult = eventsQuerySchema.safeParse(queryParams);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid query parameters", details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const { page, limit, type, format, startDate, endDate } = validationResult.data;

    // Build where clause - using Record<string, unknown> to avoid Prisma type conflicts
    const where: Record<string, unknown> = {
      isPublished: true,
    };

    if (type) {
      where.eventType = type;
    }

    if (format) {
      where.format = format;
    }

    if (startDate || endDate) {
      const dateFilter: Record<string, Date> = {};
      if (startDate) {
        dateFilter.gte = new Date(startDate);
      }
      if (endDate) {
        dateFilter.lte = new Date(endDate);
      }
      where.startDate = dateFilter;
    }

    const skip = (page - 1) * limit;

    // Fetch events with count
    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
        select: {
          id: true,
          slug: true,
          title: true,
          description: true,
          eventType: true,
          format: true,
          startDate: true,
          endDate: true,
          timezone: true,
          location: true,
          virtualUrl: true,
          price: true,
          memberPrice: true,
          capacity: true,
          _count: {
            select: { registrations: true },
          },
        },
        orderBy: { startDate: "asc" },
        skip,
        take: limit,
      }),
      prisma.event.count({ where }),
    ]);

    // Format response
    const formattedEvents = (events as EventWithCount[]).map((event) => ({
      id: event.id,
      slug: event.slug,
      title: event.title,
      description: event.description,
      eventType: event.eventType,
      format: event.format,
      startDate: event.startDate,
      endDate: event.endDate,
      timezone: event.timezone,
      location: event.location,
      virtualUrl: event.virtualUrl,
      price: event.price,
      memberPrice: event.memberPrice,
      capacity: event.capacity,
      registeredCount: event._count.registrations,
      spotsRemaining: event.capacity
        ? Math.max(0, event.capacity - event._count.registrations)
        : null,
    }));

    return NextResponse.json({
      events: formattedEvents,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: skip + events.length < total,
      },
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

// POST: Create event (admin only)
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

    // Verify admin role
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (!user || (user.role !== "ADMIN" && user.role !== "MODERATOR")) {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validationResult = createEventSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid data", details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const eventData = validationResult.data;

    // Check for duplicate slug
    const existingEvent = await prisma.event.findUnique({
      where: { slug: eventData.slug },
    });

    if (existingEvent) {
      return NextResponse.json(
        { error: "An event with this slug already exists" },
        { status: 400 }
      );
    }

    // Create the event
    const event = await prisma.event.create({
      data: {
        slug: eventData.slug,
        title: eventData.title,
        description: eventData.description,
        eventType: eventData.eventType,
        format: eventData.format,
        startDate: new Date(eventData.startDate),
        endDate: eventData.endDate ? new Date(eventData.endDate) : null,
        timezone: eventData.timezone,
        location: eventData.location,
        virtualUrl: eventData.virtualUrl,
        price: eventData.price,
        memberPrice: eventData.memberPrice,
        capacity: eventData.capacity,
        isPublished: eventData.isPublished,
      },
    });

    return NextResponse.json(
      {
        message: "Event created successfully",
        event: {
          id: event.id,
          slug: event.slug,
          title: event.title,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}
