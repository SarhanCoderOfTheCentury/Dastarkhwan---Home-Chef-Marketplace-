import * as React from "react"
import { cn } from "../../lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg' | 'icon'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center font-sans font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] select-none cursor-pointer",
          // Minimum touch target 44px x 44px
          "min-h-[44px] min-w-[44px]",
          // Variants
          {
            "bg-primary text-white hover:bg-primary-hover shadow-sm": variant === "primary",
            "bg-secondary text-white hover:bg-secondary-hover shadow-sm": variant === "secondary",
            "border border-border bg-transparent hover:bg-background-secondary text-foreground-primary": variant === "outline",
            "hover:bg-background-secondary text-foreground-secondary hover:text-foreground-primary": variant === "ghost",
            "bg-danger text-white hover:bg-red-700 shadow-sm": variant === "danger",
          },
          // Sizes
          {
            "text-xs px-3 py-1.5 rounded-md": size === "sm",
            "text-sm px-5 py-2.5 rounded-md": size === "md",
            "text-base px-6 py-3.5 rounded-lg": size === "lg",
            "p-2.5 rounded-full": size === "icon",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"
