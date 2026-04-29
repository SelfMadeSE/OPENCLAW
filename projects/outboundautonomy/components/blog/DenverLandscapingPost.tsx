export default function DenverLandscapingPost() {
  return (
    <>
      <p className="text-sm text-muted italic">By Outbound Autonomy — April 2026</p>

      <p><strong>TL;DR:</strong> We audited a Denver landscaping company that looked fine at first glance. The contact page was returning a 404 error. No phone number anywhere on the site. No homepage form. The site had been leaking leads for months — and the owner had no idea. Here&apos;s what we found and what a fix looks like.</p>

      <p>Last week, we ran a full four-signal audit on a Denver-area landscaping company&apos;s website. The owner had been paying for a website for over a year. He was pretty sure it was working. He had no way of knowing it was quietly killing his leads.</p>

      <p>Here&apos;s what we found — and why every service business owner should pay attention to the same signals.</p>

      <h2>The Basics</h2>

      <p>The company is a mid-sized Denver landscaping operation — lawn maintenance, hardscaping, irrigation, snow removal. Been in business for years. Solid Google reviews. The kind of company that gets steady work from word of mouth but knows the web should be bringing in more.</p>

      <p>Their website was built on a popular template platform. Looked fine at first glance. Decent colors. A hero image of a well-maintained lawn.</p>

      <p>Then we started digging.</p>

      <h2>Signal 1: Design Score — 68/100 (Passable)</h2>

      <p>The design wasn&apos;t terrible. The color scheme was on-brand. The logo was presentable. On desktop, the layout felt reasonable — not award-winning, but not offensive.</p>

      <p>But it was a generic template. There were no custom illustrations, no team photos, no project portfolio. The site could have been for a plumbing company or a roofing company — swap the hero image and it&apos;d look identical. That&apos;s a problem because visitors subconsciously pick up on generic design. It signals &ldquo;small operation&rdquo; or &ldquo;DIY website.&rdquo; It doesn&apos;t build trust.</p>

      <p>The mobile layout was cramped. The navigation menu collapsed into a hamburger, but the hamburger was positioned in a non-standard spot. Font sizes were inconsistent. On an iPhone 14, the hero text competed with a status bar overlay.</p>

      <p><strong>Why 68 matters:</strong> Design is the first impression. Visitors form an opinion in 0.05 seconds. A generic-looking site suggests the business is generic too — even when the actual work is high-quality.</p>

      <h2>Signal 2: Conversion Score — 45/100 (Concerning)</h2>

      <p>This is where it got interesting — and not in a good way.</p>

      <p>The homepage had no phone number. None. Not in the header, not in the footer, not even in tiny text at the bottom of the page. For a landscaping company — where 80%+ of leads come via phone call — the single most important conversion element was absent.</p>

      <p>There was no call-to-action button above the fold. The hero section had a headline and a stock photo. That&apos;s it. No &ldquo;Get a Free Quote.&rdquo; No &ldquo;Call Now.&rdquo; No &ldquo;Book a Consultation.&rdquo; Just a lawn photo with text over it.</p>

      <p>Scrolling down, there was no contact form on the homepage. No embedded scheduling tool. No pricing page. No indication of what service areas they cover.</p>

      <p><strong>Why 45 matters:</strong> Every page without a clear next step is a page that leaks leads. When a landscaping prospect lands on your site — especially on mobile during their commute or lunch break — they want to act immediately. If they can&apos;t find a phone number or a form in under 3 seconds, they go to the next company on Google. This site was hemorrhaging calls.</p>

      <h2>Signal 3: Technical Score — 70/100 (Okay)</h2>

      <p>The technical side was mixed. SSL was present. The site loaded on desktop in about 3 seconds. Meta titles and descriptions were populated, though generic.</p>

      <p>But the HTML payload was 750KB — enormous for what&apos;s essentially a brochure site. On a 4G mobile connection in the Denver metro area, that translated to a 6-second real-world load time. The Core Web Vitals were passing for desktop but failing for mobile — specifically Largest Contentful Paint was over 4 seconds.</p>

      <p>There was no LocalBusiness schema markup. Google had to guess the company&apos;s service area, business hours, and contact information from unstructured text. This hurts local search ranking, especially for queries like &ldquo;landscaping near me&rdquo; or &ldquo;Denver lawn care.&rdquo;</p>

      <p>The site also had no sitemap.xml submitted to Google Search Console. Google was crawling the site, but not efficiently.</p>

      <p><strong>Why 70 matters:</strong> A 70 feels acceptable until you realize competitors at 85+ are outranking you for every local keyword. The lack of schema markup alone means Google is less confident displaying this company in the local pack. And that 4-second LCP on mobile? Google uses it as a ranking signal.</p>

      <h2>Signal 4: Lead Capture Score — 22/100 (Emergency)</h2>

      <p>This was the gut punch.</p>

      <p>The contact page returned a 404 error. Not a typo — the entire /contact page was broken. For how long? Impossible to say. But for every day that page was down, every ad dollar spent driving traffic to the site, every organic visitor who wanted to send a message — all of it went into a black hole.</p>

      <p>There was no form anywhere else on the site. No newsletter signup. No quote request. No &ldquo;book a consultation.&rdquo; The only way to contact the business was to already know their phone number. Which, as we established, wasn&apos;t on the website either.</p>

      <p>Let that sink in: A service business website with no way for a new customer to get in touch. The entire site was effectively a digital brochure that couldn&apos;t be reached to book the service it was advertising.</p>

      <p><strong>Why 22 matters:</strong> Lead capture is the most neglected signal in website audits — and the most expensive when it breaks. If you&apos;re running Google Ads at $5–15 per click to a site with a broken contact page, you&apos;re literally burning money. Every click is a cost. Zero are converting. And you wouldn&apos;t know until you checked.</p>

      <h2>The Score Breakdown</h2>

      <div className="overflow-x-auto my-8">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-steel/30">
              <th className="text-left py-2 pr-4 text-signal">Signal</th>
              <th className="text-left py-2 pr-4 text-signal">Score</th>
              <th className="text-left py-2 text-signal">Verdict</th>
            </tr>
          </thead>
          <tbody className="text-sm text-muted">
            <tr className="border-b border-steel/20">
              <td className="py-2 pr-4">Design</td>
              <td className="py-2 pr-4 font-mono">68/100</td>
              <td className="py-2">Passable — template shows lack of investment</td>
            </tr>
            <tr className="border-b border-steel/20">
              <td className="py-2 pr-4">Conversion</td>
              <td className="py-2 pr-4 font-mono">45/100</td>
              <td className="py-2">Concerning — no phone, no CTA, no form</td>
            </tr>
            <tr className="border-b border-steel/20">
              <td className="py-2 pr-4">Technical</td>
              <td className="py-2 pr-4 font-mono">70/100</td>
              <td className="py-2">Okay — but losing the SEO battle</td>
            </tr>
            <tr className="border-b border-steel/20">
              <td className="py-2 pr-4">Lead Capture</td>
              <td className="py-2 pr-4 font-mono">22/100</td>
              <td className="py-2">Emergency — contact page is broken</td>
            </tr>
            <tr className="border-t-2 border-steel/40">
              <td className="py-2 pr-4 font-bold">Overall</td>
              <td className="py-2 pr-4 font-mono font-bold text-static">51/100</td>
              <td className="py-2 text-static">Multiple signals need work</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>The overall number hides the real story. A site with a 68 in design and 70 in technical can look perfectly fine to the owner. But a 45 in conversion and a 22 in lead capture mean the site is almost certainly not producing a single lead from organic traffic.</p>

      <h2>What a Fix Looks Like</h2>

      <p>Here&apos;s the prioritized fix list — no fluff, just signal-driven sequencing:</p>

      <ol>
        <li><strong>Fix the contact page immediately.</strong> This is non-negotiable. Every day it&apos;s down is lost revenue.</li>
        <li><strong>Add a phone number to every page header.</strong> Mobile tap-to-call. Should have been there day one.</li>
        <li><strong>Add a homepage lead capture form.</strong> Short form: name, phone, service needed. That&apos;s three fields. Anything more is friction.</li>
        <li><strong>Add a clear CTA button above the fold.</strong> &ldquo;Get Your Free Quote&rdquo; — linked to a working contact or scheduling page.</li>
        <li><strong>Compress images and reduce HTML payload.</strong> Target under 300KB total. This alone will shave 2-3 seconds off mobile load.</li>
        <li><strong>Add LocalBusiness schema markup.</strong> 15 minutes of structured data work can boost local ranking visibility.</li>
        <li><strong>Replace the generic template with a custom design.</strong> Show the actual work — landscaping is visual. Before/after photos, project galleries, team shots. This builds trust that no template can fake.</li>
      </ol>

      <h2>Why This Case Study Matters</h2>

      <p>We picked this company not because it&apos;s the worst website we&apos;ve seen — it&apos;s not. We picked it because it&apos;s the most <em>typical</em>.</p>

      <p>The owner probably thought his site was fine. It looked okay. It passed the sniff test. He had no reason to suspect that every visitor who wanted to hire him was hitting a dead end. He was losing 5, 10, 20 leads per month and had no idea.</p>

      <p>That&apos;s the gap a real website audit fills. Not a PageSpeed score. Not a meta title check. A conversion-focused audit that asks the only question that matters: <em>is this site turning visitors into customers?</em></p>

      <hr className="my-12 border-steel/20" />

      <h3 className="text-xl font-bold text-static">Related Articles</h3>
      <ul className="text-sm text-muted space-y-2">
        <li><a href="/blog/4-signals-website-audit" className="text-signal hover:underline">The 4 Signals That Matter in a Website Audit</a></li>
        <li><a href="/blog/free-website-audit-what-it-checks" className="text-signal hover:underline">What a Free Website Audit Actually Checks</a></li>
        <li><a href="/blog/how-to-read-website-audit-score" className="text-signal hover:underline">How to Read Your Website Audit Score</a></li>
        <li><a href="/blog/service-business-website-leads" className="text-signal hover:underline">Is Your Service Business Website Costing You Leads?</a></li>
      </ul>
    </>
  )
}
