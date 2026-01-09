import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const level = searchParams.get("level");
    const limit = searchParams.get("limit");
    const featured = searchParams.get("featured");

    const courses = await prisma.course.findMany({
      where: {
        isPublished: true,
      },
      include: {
        modules: {
          select: {
            id: true,
            title: true,
            duration: true,
            order: true,
          },
          orderBy: { order: "asc" },
        },
        enrollments: {
          select: { id: true },
        },
      },
      orderBy: { createdAt: "desc" },
      take: limit ? parseInt(limit) : undefined,
    });

    const formattedCourses = courses.map((course) => ({
      id: course.id,
      slug: course.slug,
      title: course.title,
      description: course.description,
      price: course.price,
      memberPrice: course.memberPrice,
      ceCredits: course.ceCredits,
      ceProvider: course.ceProvider,
      moduleCount: course.modules.length,
      totalDuration: course.modules.reduce((acc, m) => acc + (m.duration || 0), 0),
      enrollmentCount: course.enrollments.length,
      createdAt: course.createdAt,
      updatedAt: course.updatedAt,
    }));

    return NextResponse.json({
      success: true,
      data: formattedCourses,
      meta: {
        total: formattedCourses.length,
      },
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch courses",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
