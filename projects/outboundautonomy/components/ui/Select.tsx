import { forwardRef } from 'react'

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, ...props }, ref) => (
    <select
      className={`bg-void border border-steel/50 text-static rounded-md px-4 py-2 focus:outline-none focus:border-signal focus:ring-1 focus:ring-signal/30 transition-colors ${className}`}
      ref={ref}
      {...props}
    />
  )
)
Select.displayName = 'Select'

export { Select }