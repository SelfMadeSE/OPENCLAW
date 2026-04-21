interface SignalMarkProps {
  className?: string
  size?: number
}

export default function SignalMark({ className, size = 32 }: SignalMarkProps) {
  const barHeights = [size * 0.5, size * 0.75, size]
  const barWidth = size * 0.2
  const spacing = size * 0.1

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="block">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {barHeights.map((height, index) => {
          const x = index * (barWidth + spacing)
          const y = size - height
          const animationDelay = index * 0.2
          
          return (
            <rect
              key={index}
              x={x}
              y={y}
              width={barWidth}
              height={height}
              fill="#00E5FF"
              filter="url(#glow)"
              className="animate-pulse"
              style={{
                animationDelay: `${animationDelay}s`,
                animationDuration: '2s'
              }}
            />
          )
        })}
      </svg>
    </div>
  )
}