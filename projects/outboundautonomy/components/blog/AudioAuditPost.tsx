import Link from "next/link"
import { Mic, ArrowRight, BarChart3, CheckCircle2, Target, Zap, FileText } from 'lucide-react'

export default function AudioAuditPost() {
  return (
    <article className="max-w-3xl mx-auto">
      {/* HERO */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6B35]/10 border border-[#FF6B35]/20 text-[#FF6B35] text-sm mb-4">
          <Mic className="w-4 h-4" />
          New Feature
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
          Your Website Audit, Now in Audio: Listen to Your Lead Leaks
        </h1>
        <div className="flex items-center justify-center gap-4 text-sm text-white/40 mb-4">
          <span>April 29, 2026</span>
          <span>·</span>
          <span>5 min read</span>
          <span>·</span>
          <span className="flex items-center gap-1"><Mic className="w-3.5 h-3.5" /> Audio-featured</span>
        </div>
        <p className="text-lg text-white/60 max-w-2xl mx-auto">
          We built the audio audit so you can hear exactly where your site is losing calls and new customers — without reading a single page.
        </p>
      </div>

      {/* BODY */}
      <div className="prose prose-invert prose-sm max-w-none text-white/70 space-y-5 leading-relaxed">
        <p>
          You know the feeling. You hire a marketing agency, they send you a 30-page PDF, and you file it away because you don&apos;t have
          time to read the whole thing. The findings are buried in dense paragraphs and tables. By the time you get to the actionable
          part, you&apos;ve already moved on to the next fire.
        </p>

        <p>
          That&apos;s why we built the <strong>audio website audit</strong>. Instead of a static PDF, you get a narrated walkthrough
          of every finding — like having a conversion specialist sit next to you and point at your screen, but delivered through your
          headphones while you drive to your next job site.
        </p>

        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6 my-8">
          <div className="flex items-center gap-3 mb-3">
            <Mic className="w-5 h-5 text-[#FF6B35]" />
            <span className="text-white font-semibold">Try It Now</span>
          </div>
          <p className="text-white/60 text-sm mb-4">
            Enter your website URL and get an instant narrated audit — no account, no payment, no PDF download required.
          </p>
          <Link
            href="/audio-audit"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FF6B35] text-white text-sm font-medium hover:bg-[#E55A2B] transition-colors"
          >
            Run Your Audio Audit <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <h2 className="text-xl font-bold text-white mt-10 mb-4">Why Audio Beats a PDF</h2>

        <p>
          Let&apos;s be honest: when was the last time you read a 20-page marketing report cover to cover? For service business owners
          running crews, managing schedules, and putting out fires, the answer is almost never. PDFs get opened once, skimmed, and closed.
        </p>

        <p>An audio audit changes that:</p>

        <ul className="space-y-2 my-4">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#FF6B35] shrink-0 mt-0.5" />
            <span><strong>Listen in the truck</strong> — commute time becomes improvement time</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#FF6B35] shrink-0 mt-0.5" />
            <span><strong>Hear the severity</strong> — tone and emphasis tell you what matters most</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#FF6B35] shrink-0 mt-0.5" />
            <span><strong>Share with your team</strong> — send one link, everyone hears the same findings</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#FF6B35] shrink-0 mt-0.5" />
            <span><strong>Context, not bullet points</strong> — each issue is explained with &ldquo;why it matters&rdquo; and &ldquo;what to do&rdquo;</span>
          </li>
        </ul>

        <h2 className="text-xl font-bold text-white mt-10 mb-4">What the Audio Audit Covers</h2>

        <p>
          Every audio audit analyzes the same 50+ signals our full platform checks. The difference is delivery: instead of scrolling
          through a dashboard, you hear a structured walkthrough of every issue, grouped by impact.
        </p>

        <p>The four signal categories we cover in each narrated report:</p>

        <div className="grid sm:grid-cols-2 gap-4 my-6">
          {[
            { icon: Zap, title: 'Technical & Speed', desc: 'Load times, mobile performance, Core Web Vitals — narrated in plain English' },
            { icon: BarChart3, title: 'Conversion Design', desc: 'Above-fold layout, CTA clarity, form placement — heard, not scanned' },
            { icon: Target, title: 'Trust & Social Proof', desc: 'Reviews, badges, testimonials — where they belong and when they\'re missing' },
            { icon: FileText, title: 'Competitive Position', desc: 'How your site stacks up against competitors in your local market' },
          ].map((item) => (
            <div key={item.title} className="p-4 rounded-lg bg-white/[0.03] border border-white/[0.06]">
              <item.icon className="w-5 h-5 text-[#FF6B35] mb-2" />
              <h3 className="text-white font-semibold text-sm mb-1">{item.title}</h3>
              <p className="text-white/50 text-xs">{item.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-bold text-white mt-10 mb-4">Sample Findings You Might Hear</h2>

        <p>
          To give you a sense of the depth, here are real findings from a sample audit we ran on a typical HVAC company site:
        </p>

        <div className="space-y-3 my-6">
          <div className="p-4 rounded-lg bg-red-500/[0.04] border border-red-500/10">
            <span className="text-xs text-red-400 font-medium">Critical</span>
            <p className="text-white/70 text-sm mt-1">
              &ldquo;Your hero image takes 3.2 seconds to load. On a 4G connection, 47% of visitors will leave before it finishes. Consider compressing
              the image and moving it to a next-gen format like WebP.&rdquo;
            </p>
          </div>
          <div className="p-4 rounded-lg bg-red-500/[0.04] border border-red-500/10">
            <span className="text-xs text-red-400 font-medium">Critical</span>
            <p className="text-white/70 text-sm mt-1">
              &ldquo;Your phone number is not clickable on mobile. 68% of service business visitors who arrive on mobile are ready to call.
              Every tap-to-call gap is a lost lead.&rdquo;
            </p>
          </div>
          <div className="p-4 rounded-lg bg-yellow-500/[0.04] border border-yellow-500/10">
            <span className="text-xs text-yellow-400 font-medium">Medium</span>
            <p className="text-white/70 text-sm mt-1">
              &ldquo;Your primary CTA says &apos;Learn More&apos; which is passive. Changing it to &apos;Get a Free Quote&apos; typically increases
              click-through by 30–40% for service businesses.&rdquo;
            </p>
          </div>
        </div>

        <h2 className="text-xl font-bold text-white mt-10 mb-4">The Technical Side (Briefly)</h2>

        <p>
          For those curious about how it works: our audit engine crawls your website and analyzes 50+ signals across
          page speed, HTML structure, schema markup, mobile responsiveness, trust signal placement, and competitive benchmarking.
          We generate a structured JSON report, then pipe it through a text-to-speech engine that narrates each finding
          with appropriate emphasis and pacing.
        </p>

        <p>
          The result is a 5–8 minute audio file that covers everything a typical PDF audit would — but in a format
          you can actually consume. You also get the full transcript and a written summary if you prefer to skim.
        </p>

        <h2 className="text-xl font-bold text-white mt-10 mb-4">Who Should Use the Audio Audit</h2>

        <ul className="space-y-2 my-4">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#FF6B35] shrink-0 mt-0.5" />
            <span><strong>Service business owners</strong> who &ldquo;know the site needs work&rdquo; but haven&apos;t had time to diagnose it.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#FF6B35] shrink-0 mt-0.5" />
            <span><strong>Marketing managers</strong> at trades companies who need to justify a site overhaul to the owner.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#FF6B35] shrink-0 mt-0.5" />
            <span><strong>Agency partners</strong> who want to hand their clients something more consumable than a white-label PDF.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#FF6B35] shrink-0 mt-0.5" />
            <span><strong>Anyone</strong> who prefers listening to reading and still wants a thorough website analysis.</span>
          </li>
        </ul>

        <h2 className="text-xl font-bold text-white mt-10 mb-4">Get Started</h2>

        <p>
          The audio audit is free and requires no account. Enter your website URL on our <Link href="/audio-audit" className="text-[#FF6B35] hover:underline">audio audit page</Link>,
          and within 30 seconds you&apos;ll have a narrated walkthrough of every critical issue on your site.
        </p>

        <p>
          No PDFs. No sales calls. Just a clear, spoken diagnosis of why your website isn&apos;t generating the leads it should —
          and exactly what to do about it.
        </p>
      </div>

      {/* CTA */}
      <div className="mt-12 p-6 rounded-xl bg-gradient-to-br from-[#FF6B35]/10 to-transparent border border-[#FF6B35]/20 text-center">
        <Mic className="w-8 h-8 text-[#FF6B35] mx-auto mb-3" />
        <h3 className="text-lg font-bold text-white mb-2">Hear Your Site&apos;s Score</h3>
        <p className="text-white/50 text-sm mb-4">
          Run a free audio audit. Get your narrated report in under a minute.
        </p>
        <Link
          href="/audio-audit"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#FF6B35] text-white font-medium hover:bg-[#E55A2B] transition-colors"
        >
          Run Audio Audit <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* FOOTER NOTE */}
      <div className="mt-8 text-center">
        <p className="text-white/30 text-xs">
          Already audited your site? <Link href="/pricing" className="text-[#FF6B35] hover:underline">See our implementation pricing</Link> to fix what the audit found.
        </p>
      </div>
    </article>
  )
}
