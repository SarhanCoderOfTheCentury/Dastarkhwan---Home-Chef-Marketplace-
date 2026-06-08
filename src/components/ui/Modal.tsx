import * as React from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"
import { cn } from "../../lib/utils"

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className,
  size = 'md'
}) => {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  // Lock scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!mounted || !isOpen) return null

  const modalContainer = (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 font-sans">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-background-primary/60 backdrop-blur-sm transition-opacity duration-300 ease-out"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "relative bg-card border border-border rounded-lg shadow-lg max-h-[90vh] flex flex-col w-full z-10 overflow-hidden transform transition-all duration-300 ease-out animate-[modal-in_0.3s_cubic-bezier(0.16,1,0.3,1)_forwards]",
          {
            "max-w-md": size === "sm",
            "max-w-lg": size === "md",
            "max-w-2xl": size === "lg",
            "max-w-4xl": size === "xl",
          },
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/80">
          {title ? (
            <h3 className="font-display text-base font-semibold text-foreground-primary">
              {title}
            </h3>
          ) : (
            <div />
          )}
          <button
            onClick={onClose}
            className="text-foreground-secondary hover:text-foreground-primary rounded-full p-1.5 hover:bg-background-secondary transition-colors duration-200 cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </div>
  )

  return createPortal(modalContainer, document.body)
}
