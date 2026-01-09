"use client";

import * as React from "react";
import Image from "next/image";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const avatarVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-teal-100 to-teal-50",
  {
    variants: {
      size: {
        sm: "h-8 w-8 text-xs",
        md: "h-10 w-10 text-sm",
        lg: "h-12 w-12 text-base",
        xl: "h-16 w-16 text-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const statusVariants = cva(
  "absolute bottom-0 right-0 block rounded-full ring-2 ring-white",
  {
    variants: {
      status: {
        online: "bg-emerald-500",
        offline: "bg-slate-300",
        busy: "bg-amber-500",
        away: "bg-amber-400",
      },
      size: {
        sm: "h-2 w-2",
        md: "h-2.5 w-2.5",
        lg: "h-3 w-3",
        xl: "h-4 w-4",
      },
    },
    defaultVariants: {
      status: "offline",
      size: "md",
    },
  }
);

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  src?: string | null;
  alt?: string;
  name?: string;
  status?: "online" | "offline" | "busy" | "away";
  showStatus?: boolean;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      className,
      size,
      src,
      alt = "",
      name,
      status = "offline",
      showStatus = false,
      ...props
    },
    ref
  ) => {
    const [imageError, setImageError] = React.useState(false);
    const initials = name ? getInitials(name) : null;

    const imageSizes = {
      sm: 32,
      md: 40,
      lg: 48,
      xl: 64,
    };

    const imageSize = imageSizes[size || "md"];

    return (
      <div
        ref={ref}
        className={cn(avatarVariants({ size, className }))}
        {...props}
      >
        {src && !imageError ? (
          <Image
            src={src}
            alt={alt || name || "Avatar"}
            width={imageSize}
            height={imageSize}
            className="h-full w-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : initials ? (
          <span className="font-medium text-teal-700">{initials}</span>
        ) : (
          <svg
            className="h-1/2 w-1/2 text-teal-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        )}

        {showStatus && (
          <span
            className={cn(statusVariants({ status, size }))}
            aria-label={`Status: ${status}`}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";

// Avatar Group component
export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  max?: number;
  size?: VariantProps<typeof avatarVariants>["size"];
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({
  children,
  max = 4,
  size = "md",
  className,
  ...props
}) => {
  const childArray = React.Children.toArray(children);
  const visibleAvatars = childArray.slice(0, max);
  const remainingCount = childArray.length - max;

  const overlapClasses = {
    sm: "-space-x-2",
    md: "-space-x-3",
    lg: "-space-x-4",
    xl: "-space-x-5",
  };

  return (
    <div
      className={cn(
        "flex items-center",
        overlapClasses[size || "md"],
        className
      )}
      {...props}
    >
      {visibleAvatars.map((child, index) => (
        <div
          key={index}
          className="ring-2 ring-white rounded-full"
          style={{ zIndex: visibleAvatars.length - index }}
        >
          {React.isValidElement<AvatarProps>(child)
            ? React.cloneElement(child, { size })
            : child}
        </div>
      ))}
      {remainingCount > 0 && (
        <div
          className={cn(
            avatarVariants({ size }),
            "ring-2 ring-white bg-slate-200"
          )}
          style={{ zIndex: 0 }}
        >
          <span className="font-medium text-slate-600">+{remainingCount}</span>
        </div>
      )}
    </div>
  );
};

AvatarGroup.displayName = "AvatarGroup";

export { Avatar, AvatarGroup, avatarVariants };
