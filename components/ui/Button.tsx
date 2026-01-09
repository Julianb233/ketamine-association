"use client";

import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-lg shadow-teal-500/25 hover:from-teal-700 hover:to-teal-600 hover:shadow-xl hover:shadow-teal-500/30 active:shadow-md",
        secondary:
          "bg-white text-teal-700 border-2 border-teal-500 hover:bg-teal-50 hover:border-teal-600 active:bg-teal-100",
        outline:
          "border border-slate-300 bg-transparent text-slate-700 hover:bg-slate-50 hover:border-slate-400 active:bg-slate-100",
        ghost:
          "bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-900 active:bg-slate-200",
        danger:
          "bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-500/25 hover:from-red-700 hover:to-red-600 hover:shadow-xl hover:shadow-red-500/30 active:shadow-md",
        amber:
          "bg-gradient-to-r from-amber-500 to-amber-400 text-white shadow-lg shadow-amber-500/25 hover:from-amber-600 hover:to-amber-500 hover:shadow-xl hover:shadow-amber-500/30 active:shadow-md",
        emerald:
          "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg shadow-emerald-500/25 hover:from-emerald-700 hover:to-emerald-600 hover:shadow-xl hover:shadow-emerald-500/30 active:shadow-md",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-11 px-5 text-base",
        lg: "h-13 px-8 text-lg",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  href?: string;
  icon?: LucideIcon;
  iconRight?: LucideIcon;
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      isLoading = false,
      href,
      icon: Icon,
      iconRight: IconRight,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const iconSize = size === "sm" ? 16 : size === "lg" ? 22 : 18;

    const content = (
      <>
        {isLoading ? (
          <Loader2 className="animate-spin" size={iconSize} />
        ) : Icon ? (
          <Icon size={iconSize} />
        ) : null}
        {children}
        {IconRight && !isLoading && <IconRight size={iconSize} />}
      </>
    );

    if (href && !disabled && !isLoading) {
      return (
        <Link
          href={href}
          className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
