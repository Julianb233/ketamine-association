import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

interface RouteContext {
  params: Promise<{
    slug: string;
  }>;
}

interface ProgressBody {
  moduleId: string;
  completed?: boolean;
}

// Placeholder auth check - replace with actual auth implementation
async function getAuthenticatedUser(): Promise<{ id: string; email: string } | null> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;

  if (!sessionToken) {
    return null;
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        id: sessionToken,
      },
      select: { id: true, email: true },
    });
    return user;
  } catch {
    return null;
  }
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const { slug } = await context.params;
    const user = await getAuthenticatedUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "Authentication required",
        },
        { status: 401 }
      );
    }

    const body: ProgressBody = await request.json();

    if (!body.moduleId) {
      return NextResponse.json(
        {
          success: false,
          error: "Module ID is required",
        },
        { status: 400 }
      );
    }

    // Get the course with modules
    const course = await prisma.course.findUnique({
      where: { slug },
      include: {
        modules: {
          select: { id: true, order: true },
          orderBy: { order: "asc" },
        },
      },
    });

    if (!course) {
      return NextResponse.json(
        {
          success: false,
          error: "Course not found",
        },
        { status: 404 }
      );
    }

    // Verify module belongs to course
    const moduleExists = course.modules.some((m: { id: string }) => m.id === body.moduleId);
    if (!moduleExists) {
      return NextResponse.json(
        {
          success: false,
          error: "Module not found in this course",
        },
        { status: 404 }
      );
    }

    // Get user's enrollment
    const enrollment = await prisma.courseEnrollment.findFirst({
      where: {
        courseId: course.id,
        OR: [
          { userId: user.id },
          { email: user.email },
        ],
      },
    });

    if (!enrollment) {
      return NextResponse.json(
        {
          success: false,
          error: "Not enrolled in this course",
        },
        { status: 403 }
      );
    }

    // For now, we'll calculate progress based on the module order
    // In a production system, you'd want to store completed modules in a separate table
    // or use a JSON field to track which modules are completed

    // Find the index of the completed module
    const moduleIndex = course.modules.findIndex((m: { id: string }) => m.id === body.moduleId);
    const totalModules = course.modules.length;

    // Calculate progress - assuming modules are completed in order
    // This is a simplified implementation
    const newProgress = Math.min(
      100,
      Math.round(((moduleIndex + 1) / totalModules) * 100)
    );

    // Update enrollment progress
    const updatedEnrollment = await prisma.courseEnrollment.update({
      where: { id: enrollment.id },
      data: {
        progress: Math.max(enrollment.progress, newProgress),
        completedAt: newProgress >= 100 ? new Date() : null,
      },
    });

    // Generate completed modules list based on progress
    const completedModulesCount = Math.floor((updatedEnrollment.progress / 100) * totalModules);
    const completedModules = course.modules
      .slice(0, completedModulesCount)
      .map((m: { id: string }) => m.id);

    return NextResponse.json({
      success: true,
      enrollment: {
        id: updatedEnrollment.id,
        progress: updatedEnrollment.progress,
        completedModules,
        completedAt: updatedEnrollment.completedAt,
      },
    });
  } catch (error) {
    console.error("Progress update error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update progress",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { slug } = await context.params;
    const user = await getAuthenticatedUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "Authentication required",
        },
        { status: 401 }
      );
    }

    // Get the course
    const course = await prisma.course.findUnique({
      where: { slug },
      include: {
        modules: {
          select: { id: true, order: true },
          orderBy: { order: "asc" },
        },
      },
    });

    if (!course) {
      return NextResponse.json(
        {
          success: false,
          error: "Course not found",
        },
        { status: 404 }
      );
    }

    // Get user's enrollment
    const enrollment = await prisma.courseEnrollment.findFirst({
      where: {
        courseId: course.id,
        OR: [
          { userId: user.id },
          { email: user.email },
        ],
      },
    });

    if (!enrollment) {
      return NextResponse.json(
        {
          success: false,
          error: "Not enrolled in this course",
        },
        { status: 403 }
      );
    }

    // Generate completed modules list based on progress
    const totalModules = course.modules.length;
    const completedModulesCount = Math.floor((enrollment.progress / 100) * totalModules);
    const completedModules = course.modules
      .slice(0, completedModulesCount)
      .map((m: { id: string }) => m.id);

    return NextResponse.json({
      success: true,
      enrollment: {
        id: enrollment.id,
        progress: enrollment.progress,
        completedModules,
        completedAt: enrollment.completedAt,
        certificateUrl: enrollment.certificateUrl,
      },
    });
  } catch (error) {
    console.error("Progress fetch error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch progress",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
