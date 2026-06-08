import * as React from "react"
import { cn } from "../../lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
  errorMessage?: string
  label?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", error, errorMessage, label, id, ...props }, ref) => {
    const inputId = id || React.useId();
    return (
      <div className="w-full flex flex-col gap-1.5 font-sans">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-medium text-foreground-secondary select-none"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          type={type}
          className={cn(
            "flex w-full rounded-md border bg-card px-4 py-3 text-sm text-foreground-primary transition-all duration-200 placeholder:text-foreground-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary disabled:cursor-not-allowed disabled:opacity-50 min-h-[44px]",
            error 
              ? "border-danger focus:ring-danger/20 focus:border-danger" 
              : "border-border hover:border-foreground-secondary/40",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && errorMessage && (
          <span className="text-xs text-danger font-medium mt-0.5">
            {errorMessage}
          </span>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"
