import { forwardRef } from 'react'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, type, ...props }, ref) => (
    <input
      type={type}
      className={`bg-void border ${
        error ? 'border-red-500' : 'border-steel/50'
      } text-static rounded-md px-4 py-2 focus:outline-none focus:border-signal focus:ring-1 focus:ring-signal/30 transition-colors ${className}`}
      ref={ref}
      {...props}
    />
  )
)
Input.displayName = 'Input'

export { Input }