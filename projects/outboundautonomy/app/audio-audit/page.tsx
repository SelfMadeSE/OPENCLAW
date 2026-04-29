'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Mic, BarChart3, CheckCircle2, Users, Target, Clock, Zap, Star } from 'lucide-react'

export default function AudioAuditLanding() {
  const [url, setUrl] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (url.trim()) {
      window.location.href = `/audit?url=${encodeURIComponent(url.trim())}`
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/[0.06]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A2E] via-transparent to-transparent opacity-40" />
        <div className="relative max-w-5xl mx-auto px-4 pt-24 pb-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6B35]/10 border border-[#FF6B35]/20 text-[#FF6B35] text-sm mb-6">
            <Mic className="w-4 h-4" />
            Audio Visit Report
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            Listen to Your Website&apos;s
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#FF8C5A]"> Audio Audit</span>
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto mb-8">
            Enter any service business URL. We&apos;ll analyze your site across 50+ signals and read you the full
            report — like having a conversion expert on a call, but instant and free.
          </p>

          {/* URL Entry */}
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto flex gap-3">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Target className="w-4 h-4 text-white/30" />
              </div>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="yoursite.com"
                className="w-full h-12 pl-10 pr-4 rounded-lg bg-white/[0.06] border border-white/[0.1] text-white placeholder:text-white/30
                          focus:outline-none focus:border-[#FF6B35]/50 focus:ring-1 focus:ring-[#FF6B35]/30 transition-all"
                required
              />
            </div>
            <button
              type="submit"
              className="h-12 px-6 rounded-lg bg-[#FF6B35] text-white font-medium hover:bg-[#E55A2B] transition-colors flex items-center gap-2 shrink-0"
            >
              Audit Site <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="flex items-center justify-center gap-6 mt-6 text-sm text-white/40">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> Free</span>
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> 30 seconds</span>
            <span className="flex items-center gap-1.5"><Mic className="w-3.5 h-3.5" /> Audio + text report</span>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <h2 className="text-2xl font-bold text-white text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { step: '01', icon: Target, title: 'Enter Your URL', desc: 'Paste your website address — we crawl and analyze 50+ conversion signals in seconds.' },
            { step: '02', icon: BarChart3, title: 'We Score Every Page', desc: 'Technical, design, conversion, and competitive. You get a 0–100 score with specific findings.' },
            { step: '03', icon: Mic, title: 'Listen to Your Report', desc: 'A narrated audio walkthrough of every issue — like your own conversion specialist dictating findings.' },
          ].map((item) => (
            <div key={item.step} className="relative p-6 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-[#FF6B35]/20 transition-all">
              <div className="text-[#FF6B35] text-sm font-mono mb-3">{item.step}</div>
              <item.icon className="w-6 h-6 text-[#FF6B35] mb-3" />
              <h3 className="text-white font-semibold mb-2">{item.title}</h3>
              <p className="text-white/50 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHAT WE AUDIT */}
      <section className="border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-4 py-20">
          <h2 className="text-2xl font-bold text-white text-center mb-4">What the Audio Audit Covers</h2>
          <p className="text-white/50 text-center mb-12 max-w-xl mx-auto">
            We check what matters for service business lead generation — not vanity metrics.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: Zap, label: 'Page speed & technical health', score: '40 checks' },
              { icon: Star, label: 'Above-fold conversion design', score: '15 checks' },
              { icon: Users, label: 'Trust signals & social proof placement', score: '12 checks' },
              { icon: Target, label: 'CTA clarity & funnel gaps', score: '18 checks' },
              { icon: BarChart3, label: 'Mobile experience', score: '10 checks' },
              { icon: CheckCircle2, label: 'Competitive positioning gap', score: '8 checks' },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between p-4 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 text-[#FF6B35] shrink-0" />
                  <span className="text-white/80 text-sm">{item.label}</span>
                </div>
                <span className="text-white/30 text-xs font-mono">{item.score}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY AUDIO? */}
      <section className="bg-gradient-to-b from-transparent to-[#FF6B35]/[0.02] border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <Mic className="w-10 h-10 text-[#FF6B35] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">Why an Audio Audit?</h2>
          <p className="text-white/60 mb-8 leading-relaxed">
            You&apos;re busy running a service business — you don&apos;t have time to read a 20-page PDF.
            An audio report fits into your commute, your lunch break, or while you&apos;re pulling into the next job.
            Every finding is narrated with context: &quot;Your hero section loads slow and has no phone number above the fold — here&apos;s how much that costs you.&quot;
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Listen while driving', 'Share with your team', 'No account needed', 'Audio + transcript'].map((tag) => (
              <span key={tag} className="px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-white/50 text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SAMPLE FINDINGS TEASER */}
      <section className="border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-4 py-20">
          <h2 className="text-2xl font-bold text-white text-center mb-4">What You&apos;ll Hear</h2>
          <p className="text-white/50 text-center mb-12 max-w-xl mx-auto">
            Real findings from our sample audit of a typical service business site.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { finding: 'Hero image loads 3.2s — 47% of visitors leave before it finishes', severity: 'High' },
              { finding: 'No click-to-call on mobile — losing 68% of phone-ready traffic', severity: 'High' },
              { finding: 'CTA button says "Learn More" instead of "Get a Free Quote" — expected +40% click rate', severity: 'Medium' },
              { finding: 'No reviews or trust badges above the fold — 72% of users check before engaging', severity: 'High' },
            ].map((item) => (
              <div key={item.finding} className="p-4 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    item.severity === 'High'
                      ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                      : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                  }`}>
                    {item.severity}
                  </span>
                </div>
                <p className="text-white/70 text-sm">{item.finding}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/sample-report"
              className="inline-flex items-center gap-2 text-[#FF6B35] hover:text-[#E55A2B] transition-colors text-sm"
            >
              See the full sample report <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Get Your Audio Audit</h2>
          <p className="text-white/50 mb-8">
            Enter a URL. Get a narrated breakdown of every lead leak on your site. Free, no signup.
          </p>
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto flex gap-3">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Target className="w-4 h-4 text-white/30" />
              </div>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="yoursite.com"
                className="w-full h-12 pl-10 pr-4 rounded-lg bg-white/[0.06] border border-white/[0.1] text-white placeholder:text-white/30
                          focus:outline-none focus:border-[#FF6B35]/50 focus:ring-1 focus:ring-[#FF6B35]/30 transition-all"
                required
              />
            </div>
            <button
              type="submit"
              className="h-12 px-6 rounded-lg bg-[#FF6B35] text-white font-medium hover:bg-[#E55A2B] transition-colors flex items-center gap-2 shrink-0"
            >
              Audit Site <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.06] py-8">
        <div className="max-w-5xl mx-auto px-4 flex flex-wrap items-center justify-between gap-4 text-sm text-white/30">
          <span>&copy; {new Date().getFullYear()} Outbound Autonomy</span>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white/50">Privacy</Link>
            <Link href="/terms" className="hover:text-white/50">Terms</Link>
            <Link href="/cookies" className="hover:text-white/50">Cookies</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
