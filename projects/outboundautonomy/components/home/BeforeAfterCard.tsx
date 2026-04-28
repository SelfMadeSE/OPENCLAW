'use client'

import { TrendingUp } from 'lucide-react'

interface BeforeAfterCardProps {
  before: string[]
  after: string[]
  metric: string
  metricLabel: string
}

export function BeforeAfterCard({ before, after, metric, metricLabel }: BeforeAfterCardProps) {
  return (
    <div className="bg-depth border border-steel/30 rounded-lg overflow-hidden hover:border-signal/20 transition-all duration-300">
      {/* Label row */}
      <div className="flex border-b border-steel/30">
        <div className="flex-1 p-3 text-center text-xs font-semibold uppercase tracking-wider text-red-400/80 bg-red-400/5">
          Before
        </div>
        <div className="flex-1 p-3 text-center text-xs font-semibold uppercase tracking-wider text-signal/80 bg-signal/5">
          After
        </div>
      </div>

      {/* Visual split */}
      <div className="flex">
        {/* Before side */}
        <div className="flex-1 p-4 opacity-60 bg-void/30">
          <div className="h-24 rounded-md border border-dashed border-steel/30 flex items-center justify-center">
            <div className="text-xs text-muted text-center px-2 space-y-0.5">
              {before.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-px bg-gradient-to-b from-signal/20 via-signal/40 to-signal/20" />

        {/* After side */}
        <div className="flex-1 p-4 bg-signal/[0.02]">
          <div className="h-24 rounded-md border border-signal/20 bg-depth flex items-center justify-center">
            <div className="text-xs text-signal/80 text-center px-2 font-medium space-y-0.5">
              {after.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Result metric */}
      <div className="px-4 pb-4 flex items-center gap-2">
        <TrendingUp className="h-4 w-4 text-signal shrink-0" />
        <span className="text-sm font-semibold text-signal">{metric}</span>
        <span className="text-xs text-muted">{metricLabel}</span>
      </div>
    </div>
  )
}
