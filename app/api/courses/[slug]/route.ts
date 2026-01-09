import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

interface RouteContext {
  params: Promise<{
    slug: string;
  }>;
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

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { slug } = await context.params;
    const { searchParams } = new URL(request.url);
    const includeContent = searchParams.get("content") === "true";

    const course = await prisma.course.findUnique({
      where: { slug, isPublished: true },
      include: {
        modules: {
          select: {
            id: true,
            title: true,
            description: true,
            content: includeContent,
            videoUrl: includeContent,
            duration: true,
            order: true,
          },
          orderBy: { order: "asc" },
        },
        enrollments: {
          select: { id: true },
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

    // Check if user is authenticated and enrolled
    const user = await getAuthenticatedUser();
    let enrollment = null;
    let isEnrolled = false;

    if (user) {
      const userEnrollment = await prisma.courseEnrollment.findFirst({
        where: {
          courseId: course.id,
          OR: [
            { userId: user.id },
            { email: user.email },
          ],
        },
      });

      if (userEnrollment) {
        isEnrolled = true;
        enrollment = {
          id: userEnrollment.id,
          progress: userEnrollment.progress,
          completedModules: [], // TODO: Store completed modules in a separate table or JSON field
          completedAt: userEnrollment.completedAt,
          certificateUrl: userEnrollment.certificateUrl,
        };
      }
    }

    // If requesting full content (for learn page), check enrollment
    if (includeContent && !isEnrolled && course.price > 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Enrollment required",
          message: "You must enroll in this course to access the content",
        },
        { status: 401 }
      );
    }

    const formattedCourse = {
      id: course.id,
      slug: course.slug,
      title: course.title,
      description: course.description,
      price: course.price,
      memberPrice: course.memberPrice,
      ceCredits: course.ceCredits,
      ceProvider: course.ceProvider,
      modules: course.modules,
      moduleCount: course.modules.length,
      totalDuration: course.modules.reduce((acc: number, m: { duration: number | null }) => acc + (m.duration || 0), 0),
      enrollmentCount: course.enrollments.length,
      isEnrolled,
    };

    return NextResponse.json({
      success: true,
      course: formattedCourse,
      enrollment,
    });
  } catch (error) {
    console.error("Error fetching course:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch course",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
