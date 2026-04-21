import { forwardRef } from 'react'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => (
    <textarea
      className={`bg-void border ${
        error ? 'border-red-500' : 'border-steel/50'
      } text-static rounded-md px-4 py-2 focus:outline-none focus:border-signal focus:ring-1 focus:ring-signal/30 transition-colors resize-none ${className}`}
      ref={ref}
      {...props}
    />
  )
)
Textarea.displayName = 'Textarea'

export { Textarea }