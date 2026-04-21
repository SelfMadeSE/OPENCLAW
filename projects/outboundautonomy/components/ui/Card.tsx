import { forwardRef } from 'react'

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={`bg-depth border border-steel/30 rounded-lg p-6 transition-all duration-200 hover:border-signal/30 hover:shadow-[0_0_20px_rgba(0,229,255,0.1)] ${className}`}
      {...props}
    />
  )
)
Card.displayName = 'Card'

export { Card }