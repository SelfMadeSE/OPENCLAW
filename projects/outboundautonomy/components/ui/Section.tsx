export interface SectionProps
  extends React.HTMLAttributes<HTMLElement> {
  id?: string
}

export function Section({ className, id, children, ...props }: SectionProps) {
  return (
    <section 
      id={id}
      className={`py-16 md:py-24 ${className}`} 
      {...props}
    >
      {children}
    </section>
  )
}