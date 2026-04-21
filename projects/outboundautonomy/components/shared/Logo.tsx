import Link from 'next/link'
import SignalMark from './SignalMark'

interface LogoProps {
  className?: string
}

export default function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center space-x-3 ${className}`}>
      <SignalMark size={32} />
      <span className="text-2xl font-bold text-static" style={{ fontFamily: 'Space Grotesk' }}>
        Outbound Autonomy
      </span>
    </Link>
  )
}