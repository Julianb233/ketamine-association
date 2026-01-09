"use client";

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Clock, BookOpen, Award, Users } from "lucide-react";

export interface CourseCardData {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  price: number;
  memberPrice: number | null;
  ceCredits: number | null;
  ceProvider: string | null;
  category?: "practitioner" | "patient";
  instructor?: string;
  level?: "Foundational" | "Intermediate" | "Advanced" | "Master";
  duration?: number; // total duration in minutes
  moduleCount?: number;
  enrollmentCount?: number;
  isEnrolled?: boolean;
  progress?: number;
  image?: string;
}

interface CourseCardProps {
  course: CourseCardData;
  variant?: "default" | "compact" | "featured";
  showEnrollButton?: boolean;
}

const levelColors: Record<string, "primary" | "secondary" | "accent" | "default"> = {
  Foundational: "primary",
  Intermediate: "secondary",
  Advanced: "accent",
  Master: "default",
};

function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) return `${hours} hr${hours > 1 ? "s" : ""}`;
  return `${hours} hr${hours > 1 ? "s" : ""} ${remainingMinutes} min`;
}

function formatPrice(cents: number): string {
  if (cents === 0) return "Free";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export function CourseCard({
  course,
  variant = "default",
  showEnrollButton = true,
}: CourseCardProps) {
  const levelBadge = course.level ? levelColors[course.level] || "default" : "default";
  const hasDiscount = course.memberPrice !== null && course.memberPrice < course.price;

  if (variant === "compact") {
    return (
      <Link href={`/academy/courses/${course.slug}`} className="block group">
        <Card hover padding="sm" className="flex items-center gap-4">
          <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {course.level && (
                <Badge variant={levelBadge} size="sm">
                  {course.level}
                </Badge>
              )}
              {course.ceCredits && (
                <Badge variant="accent" size="sm" icon={Award}>
                  {course.ceCredits} CE
                </Badge>
              )}
            </div>
            <h4 className="font-semibold text-slate-900 truncate group-hover:text-teal-600 transition-colors">
              {course.title}
            </h4>
            <p className="text-sm text-slate-500">
              {course.duration ? formatDuration(course.duration) : `${course.moduleCount || 0} modules`}
            </p>
          </div>
          <div className="text-right">
            <span className="font-bold text-teal-600">{formatPrice(course.price)}</span>
          </div>
        </Card>
      </Link>
    );
  }

  if (variant === "featured") {
    return (
      <Card hover padding="none" className="overflow-hidden">
        <div className="lg:flex">
          <div className="lg:w-2/5 aspect-video lg:aspect-auto bg-gradient-to-br from-teal-500 to-teal-700 p-8 flex flex-col justify-between">
            <div className="flex items-center gap-2">
              {course.level && (
                <Badge variant="default" size="sm" className="bg-white/20 text-white backdrop-blur-sm">
                  {course.level}
                </Badge>
              )}
              {course.category && (
                <Badge variant="default" size="sm" className="bg-white/20 text-white backdrop-blur-sm">
                  {course.category === "practitioner" ? "Practitioner" : "Patient"}
                </Badge>
              )}
            </div>
            <div className="mt-auto">
              <div className="flex items-center gap-6 text-white/80 text-sm">
                {course.duration && (
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>{formatDuration(course.duration)}</span>
                  </div>
                )}
                {course.moduleCount && (
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4" />
                    <span>{course.moduleCount} modules</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="lg:w-3/5 p-6 lg:p-8 flex flex-col">
            <Link href={`/academy/courses/${course.slug}`} className="group/title">
              <h3 className="text-xl lg:text-2xl font-bold text-slate-900 group-hover/title:text-teal-600 transition-colors">
                {course.title}
              </h3>
            </Link>
            {course.instructor && (
              <p className="mt-2 text-sm text-slate-500">{course.instructor}</p>
            )}
            {course.description && (
              <p className="mt-3 text-slate-600 line-clamp-3">{course.description}</p>
            )}
            <div className="mt-4 flex flex-wrap gap-3">
              {course.ceCredits && (
                <Badge variant="accent" size="md" icon={Award}>
                  {course.ceCredits} CE Credits
                </Badge>
              )}
              {course.enrollmentCount !== undefined && course.enrollmentCount > 0 && (
                <Badge variant="default" size="md" icon={Users}>
                  {course.enrollmentCount.toLocaleString()} enrolled
                </Badge>
              )}
            </div>
            <div className="mt-auto pt-6 flex items-center justify-between">
              <div>
                {hasDiscount ? (
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-teal-600">
                      {formatPrice(course.memberPrice!)}
                    </span>
                    <span className="text-sm text-slate-500 line-through">
                      {formatPrice(course.price)}
                    </span>
                    <Badge variant="success" size="sm">Member Price</Badge>
                  </div>
                ) : (
                  <span className="text-2xl font-bold text-teal-600">
                    {formatPrice(course.price)}
                  </span>
                )}
              </div>
              {showEnrollButton && (
                <Button
                  href={`/academy/courses/${course.slug}`}
                  variant="primary"
                  size="md"
                >
                  {course.isEnrolled ? "Continue Learning" : "View Course"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // Default variant
  return (
    <Card hover padding="none" className="overflow-hidden h-full flex flex-col">
      <div className="relative aspect-video bg-gradient-to-br from-teal-400 to-teal-600 p-6">
        <div className="flex items-center gap-2">
          {course.level && (
            <Badge variant="default" size="sm" className="bg-white/20 text-white backdrop-blur-sm">
              {course.level}
            </Badge>
          )}
          {course.category && (
            <Badge variant="default" size="sm" className="bg-white/20 text-white backdrop-blur-sm">
              {course.category === "practitioner" ? "Practitioner" : "Patient"}
            </Badge>
          )}
        </div>
        {course.isEnrolled && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30">
            <div
              className="h-full bg-white transition-all"
              style={{ width: `${course.progress || 0}%` }}
            />
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <Link href={`/academy/courses/${course.slug}`} className="group/title">
          <h3 className="text-lg font-bold text-slate-900 group-hover/title:text-teal-600 transition-colors line-clamp-2">
            {course.title}
          </h3>
        </Link>
        {course.instructor && (
          <p className="mt-1 text-sm text-slate-500">{course.instructor}</p>
        )}
        {course.description && (
          <p className="mt-2 text-slate-600 text-sm line-clamp-2 flex-1">
            {course.description}
          </p>
        )}
        <div className="mt-4 flex items-center gap-4 text-sm text-slate-500">
          {course.duration && (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{formatDuration(course.duration)}</span>
            </div>
          )}
          {course.moduleCount && (
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              <span>{course.moduleCount} modules</span>
            </div>
          )}
        </div>
        {course.ceCredits && (
          <div className="mt-3">
            <Badge variant="accent" size="sm" icon={Award}>
              {course.ceCredits} CE Credits
            </Badge>
          </div>
        )}
        <div className="mt-4 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between mb-3">
            {hasDiscount ? (
              <div>
                <span className="text-lg font-bold text-teal-600">
                  {formatPrice(course.memberPrice!)}
                </span>
                <span className="ml-2 text-sm text-slate-400 line-through">
                  {formatPrice(course.price)}
                </span>
              </div>
            ) : (
              <span className="text-lg font-bold text-teal-600">
                {formatPrice(course.price)}
              </span>
            )}
            {hasDiscount && (
              <Badge variant="success" size="sm">Member</Badge>
            )}
          </div>
          {showEnrollButton && (
            <Button
              href={`/academy/courses/${course.slug}`}
              variant="primary"
              size="sm"
              fullWidth
            >
              {course.isEnrolled ? "Continue Learning" : "Enroll Now"}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
