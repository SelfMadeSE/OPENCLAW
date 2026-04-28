'use client'

import { motion } from 'framer-motion'

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
}

export function HeroBrowserMockup() {
  return (
    <motion.div
      variants={scaleIn}
      className="relative w-full max-w-[480px] mx-auto"
    >
      {/* Browser chrome frame */}
      <div className="border border-steel/40 rounded-xl overflow-hidden shadow-card">
        {/* Address bar */}
        <div className="h-10 bg-depth/60 border-b border-steel/30 flex items-center px-3 gap-2">
          <div className="flex gap-1.5">
            <div className="h-2 w-2 rounded-full bg-red-400/30" />
            <div className="h-2 w-2 rounded-full bg-warm/30" />
            <div className="h-2 w-2 rounded-full bg-signal/30" />
          </div>
          <div className="bg-void/60 px-3 py-1 rounded-md text-xs text-muted font-mono flex-1 text-center truncate">
            https://outboundautonomy.com
          </div>
        </div>

        {/* Browser content - audit UI */}
        <div className="bg-depth/30 p-4 rounded-b-xl space-y-3">
          {/* Badge */}
          <div className="inline-flex items-center rounded-full border border-signal/20 bg-signal/10 px-2.5 py-0.5 text-[10px] font-medium text-signal">
            Free Website Audit
          </div>

          {/* URL input row */}
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-void/60 border border-steel/30 rounded-md px-3 py-1.5 text-xs text-muted font-mono">
              example-hvac-service.com
            </div>
            <div className="bg-signal text-void text-xs font-semibold px-3 py-1.5 rounded-md whitespace-nowrap">
              Audit →
            </div>
          </div>

          {/* Score cards row */}
          <div className="grid grid-cols-4 gap-2">
            {/* Overall */}
            <div className="flex flex-col items-center bg-void/30 rounded-lg p-2">
              <div className="text-base font-bold text-static">58</div>
              <div className="text-[9px] text-muted">Overall</div>
              <div className="mt-1 w-full bg-steel/30 rounded-full h-1.5 overflow-hidden">
                <div className="bg-red-400 rounded-full h-1.5" style={{ width: '58%' }} />
              </div>
              <span className="mt-0.5 text-[8px] font-semibold uppercase tracking-wider text-red-400">
                Grade F
              </span>
            </div>
            {/* Design */}
            <div className="flex flex-col items-center bg-void/30 rounded-lg p-2">
              <div className="text-sm font-bold text-warm">61</div>
              <div className="text-[9px] text-muted">Design</div>
              <div className="mt-1 w-full bg-steel/30 rounded-full h-1.5 overflow-hidden">
                <div className="bg-warm rounded-full h-1.5" style={{ width: '61%' }} />
              </div>
            </div>
            {/* Conversion */}
            <div className="flex flex-col items-center bg-void/30 rounded-lg p-2">
              <div className="text-sm font-bold text-red-400">38</div>
              <div className="text-[9px] text-muted">Conv.</div>
              <div className="mt-1 w-full bg-steel/30 rounded-full h-1.5 overflow-hidden">
                <div className="bg-red-400 rounded-full h-1.5" style={{ width: '38%' }} />
              </div>
            </div>
            {/* Technical */}
            <div className="flex flex-col items-center bg-void/30 rounded-lg p-2">
              <div className="text-sm font-bold text-signal">74</div>
              <div className="text-[9px] text-muted">Tech</div>
              <div className="mt-1 w-full bg-steel/30 rounded-full h-1.5 overflow-hidden">
                <div className="bg-signal rounded-full h-1.5" style={{ width: '74%' }} />
              </div>
            </div>
          </div>

          {/* Issues */}
          <div className="space-y-1.5">
            <div className="text-[10px] font-semibold text-static">Issues found (3):</div>
            <div className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-red-400 mt-1 shrink-0" />
              <span className="text-[10px] text-muted">No clear CTA above the fold</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-red-400 mt-1 shrink-0" />
              <span className="text-[10px] text-muted">No lead-capture form</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-warm mt-1 shrink-0" />
              <span className="text-[10px] text-muted">No service area listed</span>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center pt-1">
            <span className="text-[10px] font-medium text-signal">View full report →</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
