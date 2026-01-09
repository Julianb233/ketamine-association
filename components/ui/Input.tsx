"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "flex w-full rounded-lg border bg-white px-4 py-3 text-base text-slate-900 transition-all duration-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-slate-300 focus:border-teal-500 focus:ring-teal-500/20",
        error:
          "border-red-500 focus:border-red-500 focus:ring-red-500/20 text-red-900 placeholder:text-red-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
  helperText?: string;
  iconLeft?: LucideIcon;
  iconRight?: LucideIcon;
  onIconRightClick?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      type = "text",
      label,
      error,
      helperText,
      iconLeft: IconLeft,
      iconRight: IconRight,
      onIconRightClick,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const hasError = !!error;
    const currentVariant = hasError ? "error" : variant;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "mb-2 block text-sm font-medium",
              hasError ? "text-red-700" : "text-slate-700"
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          {IconLeft && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <IconLeft
                size={18}
                className={cn(hasError ? "text-red-400" : "text-slate-400")}
              />
            </div>
          )}
          <input
            type={type}
            id={inputId}
            className={cn(
              inputVariants({ variant: currentVariant }),
              IconLeft && "pl-11",
              IconRight && "pr-11",
              className
            )}
            ref={ref}
            aria-invalid={hasError}
            aria-describedby={
              hasError ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
            }
            {...props}
          />
          {IconRight && (
            <button
              type="button"
              onClick={onIconRightClick}
              disabled={!onIconRightClick}
              className={cn(
                "absolute inset-y-0 right-0 flex items-center pr-4",
                onIconRightClick
                  ? "cursor-pointer hover:opacity-70"
                  : "pointer-events-none"
              )}
              tabIndex={onIconRightClick ? 0 : -1}
            >
              <IconRight
                size={18}
                className={cn(hasError ? "text-red-400" : "text-slate-400")}
              />
            </button>
          )}
        </div>
        {error && (
          <p
            id={`${inputId}-error`}
            className="mt-2 text-sm text-red-600"
            role="alert"
          >
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${inputId}-helper`} className="mt-2 text-sm text-slate-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input, inputVariants };
