'use client'

import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function DiscoveryCallCard() {
  return (
    <div className="max-w-4xl mx-auto bg-depth border border-steel/30 rounded-lg p-8 md:p-10 shadow-card relative overflow-hidden">
      {/* Subtle top glow line */}
      <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-signal/40 to-transparent" />

      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
        {/* Left: icon cluster */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="flex flex-col items-center gap-2">
            <div className="h-12 w-12 rounded-lg bg-signal/10 border border-signal/20 flex items-center justify-center">
              <Calendar className="h-6 w-6 text-signal" aria-hidden="true" />
            </div>
            <div className="h-12 w-12 rounded-lg bg-signal/10 border border-signal/20 flex items-center justify-center">
              <Clock className="h-6 w-6 text-signal" aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* Right: text + CTA */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-static mb-3">
            Not sure what your site needs? Let&apos;s find out in 30 minutes.
          </h2>
          <p className="text-muted mb-6 max-w-lg mx-auto md:mx-0">
            Book a free call and we&apos;ll walk through your audit together. You&apos;ll leave knowing{' '}
            the 2-3 issues on your site that are costing you the most leads, what the fix looks
            like for each one, and exactly how much it would cost — flat quote, no hourly.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button variant="primary" href="/contact?intent=discovery" size="lg">
              Book your free audit review
              <ArrowRight className="ml-2 h-4 w-4 inline" aria-hidden="true" />
            </Button>
            <p className="text-xs text-muted max-w-[200px]">
              No pitch unless it makes sense. If your site is fine, we&apos;ll say so.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
