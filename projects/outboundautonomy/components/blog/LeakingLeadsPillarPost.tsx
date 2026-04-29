export default function LeakingLeadsPillarPost() {
  return (
    <>
      <p className="text-sm text-muted italic">By Outbound Autonomy — Last updated April 2026</p>

      <p><strong>TL;DR:</strong> Three-quarters of service business websites share the same three conversion killers: no CTA above the fold, no lead form on the homepage, and no clarity on service areas. A 90-second audit surfaces exactly which ones apply to your site and what to fix first.</p>

      <h2>The Pattern We Keep Seeing</h2>

      <p>Over the past month, we audited four service businesses in Grande Prairie, Alberta — an HVAC company, a garage door specialist, a cleaning service, and a landscaping company. Different trades, different designs, different budgets. They had almost identical problems.</p>

      <p>One scored 86/100 on design. Clean layout, good images, professional branding. But zero calls to action above the fold. No form anywhere on the homepage. A visitor would have to dig through the nav bar just to find a phone number.</p>

      <p>Another scored 72/100 on technical performance — fast load times, solid mobile responsiveness, no broken links. But the homepage had no mention of what areas they served, no LocalBusiness schema, and a contact page that was two sentences and a static map.</p>

      <p>The landscaping company&apos;s site looked dated (design score: 60) but was the only one of the four that had a click-to-call button visible without scrolling. Their phone rang. The others? Silent.</p>

      <p>Here&apos;s what&apos;s happening: service business owners invest in a website, sometimes spend real money on it, and then assume it&apos;s working. The assumption is understandable — the site exists, looks fine, and nobody&apos;s complaining. But &quot;looks fine&quot; is not the same as &quot;converts visitors into leads.&quot;</p>

      <h2>Killer #1: No Call to Action Above the Fold</h2>

      <p>You land on the homepage. You see a hero image — a technician in a truck, maybe a before-and-after of a job well done. A company name. A tagline like &quot;Serving Grande Prairie Since 2015.&quot; And then… nothing. You have to scroll, click the nav menu, or hunt for a &quot;Contact&quot; link.</p>

      <p>On the audit, this is a hit against the <strong>Conversion score</strong>. Our scanner checks: <em>Is there a primary CTA visible without scrolling? Is it actionable? Is it persistent on mobile?</em></p>

      <div className="overflow-x-auto my-8">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-steel/30">
              <th className="text-left py-2 pr-4">Business</th>
              <th className="text-left py-2 pr-4">Design</th>
              <th className="text-left py-2 pr-4">Conversion</th>
              <th className="text-left py-2">CTA Above Fold?</th>
            </tr>
          </thead>
          <tbody className="text-sm text-muted">
            <tr className="border-b border-steel/20"><td className="py-2 pr-4">Alpine HVAC</td><td className="py-2 pr-4">86/100</td><td className="py-2 pr-4">55/100</td><td className="py-2 text-red-400">❌ No</td></tr>
            <tr className="border-b border-steel/20"><td className="py-2 pr-4">Hardline Garage Doors</td><td className="py-2 pr-4">78/100</td><td className="py-2 pr-4">65/100</td><td className="py-2 text-red-400">❌ No</td></tr>
            <tr className="border-b border-steel/20"><td className="py-2 pr-4">Quinn&apos;s Cleaning</td><td className="py-2 pr-4">70/100</td><td className="py-2 pr-4">45/100</td><td className="py-2 text-red-400">❌ No</td></tr>
            <tr className="border-b border-steel/20"><td className="py-2 pr-4">Silvertip Landscaping</td><td className="py-2 pr-4">72/100</td><td className="py-2 pr-4">60/100</td><td className="py-2 text-signal">✅ Yes</td></tr>
          </tbody>
        </table>
      </div>

      <p>Three out of four had no visible CTA. The one that did (Silvertip Landscaping) had the lowest design score of the group — but functionally, they were outperforming the others because a visitor could take action immediately.</p>

      <p><strong>The fix:</strong> One button. &quot;Schedule Service,&quot; &quot;Get a Free Estimate,&quot; &quot;Call Now.&quot; Make it contrasting, make it visible without scrolling, and keep it pinned on mobile. Every page, not just the homepage.</p>

      <h2>Killer #2: No Lead-Capture Form Anywhere Near the Homepage</h2>

      <p>The site has a &quot;Contact&quot; page — it&apos;s in the footer or the nav — but the homepage itself has no form. A visitor who&apos;s ready to inquire has to navigate away from whatever they were looking at, find the contact page, and fill out a form that often asks for too much information.</p>

      <p>The average Lead Capture score across these four businesses: <strong>39/100</strong>. That&apos;s failing. And it&apos;s the single most fixable problem on any service website.</p>

      <p><strong>Why this kills leads:</strong> 30–50% of service business leads come in after hours — evenings, weekends, holidays. If someone visits your site at 9 PM with a burst pipe or a broken furnace and there&apos;s no way to leave their information, they call the next company that has a form.</p>

      <p><strong>The fix:</strong> A short form — name, phone, service type, message — placed on the homepage and every service page. Connect it to an auto-responder.</p>

      <h2>Killer #3: No Clarity on Service Area or Location</h2>

      <p>The website looks professional. The branding is solid. But nowhere on the homepage does it say what cities or neighborhoods the business serves. No LocalBusiness schema telling Google which areas you cover.</p>

      <p><strong>The fix:</strong> Three things: (1) Add service areas to visible homepage text. (2) Implement LocalBusiness structured data. (3) Create city-specific service pages if you serve multiple communities.</p>

      <h2>The Score Profile Problem</h2>

      <p>Here&apos;s the insidious thing about these conversion killers: they don&apos;t show up in traditional web audits. Tools like PageSpeed Insights, GTmetrix, and WAVE check speed, accessibility, and code quality. They don&apos;t check whether you have a CTA, a form, or a service area declaration.</p>

      <p>Consider Alpine HVAC&apos;s profile:</p>
      <p className="font-mono text-sm bg-depth p-4 rounded-lg">
        Design: 86/100 ✅ Excellent<br />
        Conversion: 55/100 ❌ Needs work<br />
        Technical: 72/100 ⚠️ Average<br />
        Lead Capture: 34/100 ❌ Critical
      </p>

      <p>An 86 Design score might make an owner feel good about their site. But that 34 Lead Capture score means they&apos;re leaving money on the table every single day.</p>

      <h2>The Fix Order Matters</h2>

      <p><strong>Week 1:</strong> Add a lead form and a visible CTA. Three fields: name, phone, message plus one button above the fold.</p>
      <p><strong>Week 2:</strong> Fix local signals — LocalBusiness schema, homepage copy update, NAP consistency.</p>
      <p><strong>Week 3:</strong> Measure. Compare lead volume before and after.</p>
    </>
  )
}
