import * as React from "react"
import { cn } from "../../lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'danger' | 'outline' | 'pro'
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold font-sans transition-colors duration-200 select-none",
          {
            "bg-primary-light text-primary": variant === "primary",
            "bg-background-secondary text-foreground-secondary": variant === "secondary",
            "bg-green-50 text-success border border-success/20 dark:bg-green-950/30": variant === "success",
            "bg-amber-50 text-warning border border-warning/20 dark:bg-amber-950/30": variant === "warning",
            "bg-blue-50 text-info border border-info/20 dark:bg-blue-950/30": variant === "info",
            "bg-red-50 text-danger border border-danger/20 dark:bg-red-950/30": variant === "danger",
            "border border-border text-foreground-secondary bg-transparent": variant === "outline",
            // Pro Chef gradient: linear-gradient(135deg, var(--color-primary), #ec4899)
            "bg-gradient-to-br from-primary to-[#ec4899] text-white shadow-sm": variant === "pro",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Badge.displayName = "Badge"
