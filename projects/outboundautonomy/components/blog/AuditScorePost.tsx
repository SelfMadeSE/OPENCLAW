export default function AuditScorePost() {
  return (
    <>
            <p className="text-sm text-muted italic">By Outbound Autonomy — April 2026</p>

      <p><strong>TL;DR:</strong> A single number like &quot;58/100&quot; doesn&apos;t tell you much. The real value is in the breakdown — which signal is dragging your score down and what to fix first. Here&apos;s how to read an audit score the same way we do.</p>

      <h2>The Score Is a Starting Point, Not the Whole Story</h2>

      <p>The first thing most people do when they get a website audit score is compare it to a number they have in their head for &quot;good&quot; and see how they measure up. A 93 sounds great. A 58 sounds alarming. An 86 sounds solid.</p>

      <p>But here&apos;s what those numbers actually mean in the context of a service business website:</p>

      <div className="overflow-x-auto my-8">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-steel/30">
              <th className="text-left py-2 pr-4 text-signal">Score Band</th>
              <th className="text-left py-2 pr-4">What It Means</th>
              <th className="text-left py-2">What to Do</th>
            </tr>
          </thead>
          <tbody className="text-sm text-muted">
            <tr className="border-b border-steel/20">
              <td className="py-2 pr-4 text-signal font-mono">80–100</td>
              <td className="py-2 pr-4">Your site is performing well across most signals.</td>
              <td className="py-2">Optimize the edges. Fix minor gaps. Re-audit quarterly.</td>
            </tr>
            <tr className="border-b border-steel/20">
              <td className="py-2 pr-4 text-signal font-mono">60–79</td>
              <td className="py-2 pr-4">Some strengths, some clear leaks. One or two signals are pulling your average down.</td>
              <td className="py-2">Fix the low-scoring signal first. You&apos;ll see the fastest ROI there.</td>
            </tr>
            <tr className="border-b border-steel/20">
              <td className="py-2 pr-4 text-signal font-mono">40–59</td>
              <td className="py-2 pr-4">Multiple signals need work. Your site may look okay but is quietly losing leads.</td>
              <td className="py-2">Start with the quickest fix. Build momentum before tackling the rebuild.</td>
            </tr>
            <tr className="border-b border-steel/20">
              <td className="py-2 pr-4 text-signal font-mono">Below 40</td>
              <td className="py-2 pr-4">Fundamental issues across design, conversion, and technical.</td>
              <td className="py-2">Consider a focused rebuild — but fix lead capture immediately if it&apos;s broken.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Reading the Breakdown: What Each Score Tells You</h2>

      <h3>Design Score (0–100)</h3>
      <p><strong>What a high score means (70+):</strong> Your site is clean, consistent, and mobile-responsive. A visitor forms a positive impression within 2 seconds.</p>
      <p><strong>What a low score means (below 60):</strong> Your site looks dated or DIY. Stock photography, clashing fonts, cramped mobile layout.</p>
      <p><strong>The catch:</strong> A 90 design score doesn&apos;t matter if your conversion score is 40. A beautiful site that doesn&apos;t convert is a pretty brochure.</p>
      <p><strong>Real example:</strong> A Grande Prairie HVAC company scored 86/100 on design — but their conversion score was 55. No homepage form, generic CTA, no click-to-call on mobile.</p>

      <h3>Conversion Score (0–100)</h3>
      <p>This is the most important signal for a service business — and the one most free tools don&apos;t measure at all.</p>
      <p><strong>What a high score means (70+):</strong> A visible CTA above the fold, a working form on the homepage, trust signals near the action button, and a click-to-call on mobile. The visitor never has to hunt for how to reach you.</p>
      <p><strong>What a low score means (below 50):</strong> No clear CTA, no homepage form, multiple competing actions confusing the visitor.</p>

      <h3>Technical Score (0–100)</h3>
      <p><strong>What a high score means (60+):</strong> Pages load in under 3 seconds on mobile. Core Web Vitals pass. LocalBusiness schema is present. No broken links or JavaScript errors.</p>
      <p><strong>What a low score means (below 40):</strong> Slow load times, missing schema markup, oversized images, HTTP instead of HTTPS. Google can&apos;t understand or trust your site.</p>
      <p><strong>Real example:</strong> A plumbing company had design: 78 and conversion: 65 — but technical: 34. Their hero image was a 3MB file. No LocalBusiness schema. Mobile load time: 6.2 seconds. Google ranked them on page 3 for their own service area.</p>

      <h3>Lead Capture Score (0–100)</h3>
      <p>This is the signal almost nobody checks — including paid agency audits.</p>
      <p><strong>What a high score means (60+):</strong> Short forms work on all browsers. Auto-responder fires within 60 seconds. After-hours capture is in place.</p>
      <p><strong>What a low score means (below 30):</strong> Forms error out on submission. No confirmation message. No auto-responder. In worst cases, the form has been silently broken for months.</p>

      <h2>Putting It All Together: Three Real Score Profiles</h2>

      <h3>Profile A: The Overconfident Site (86 / 55 / 72 / 60)</h3>
      <p>This site looks professional. Design is strong, technical is decent. But conversion and lead capture are both under 65. The owner thinks their site is fine because it looks good.</p>
      <p><strong>Fix priority:</strong> Conversion → Lead Capture → Technical → Design</p>

      <h3>Profile B: The Broken Funnel (78 / 65 / 34 / 50)</h3>
      <p>Strong signals mask a critical failure. The technical score of 34 means it loads slowly and can&apos;t be found. Google ranks competitors higher. Fewer people land on it.</p>
      <p><strong>Fix priority:</strong> Technical → Conversion → Lead Capture → Design</p>

      <h3>Profile C: The Emergency (70 / 45 / 60 / 12)</h3>
      <p>Design is passable, technical is okay, but lead capture is catastrophic. A broken form that&apos;s been returning error messages for months. Every ad click is money down the drain.</p>
      <p><strong>Fix priority:</strong> Lead Capture (today) → Conversion → Technical → Design</p>

      <h2>What to Do With Your Score</h2>
      <ol>
        <li><strong>Look at the breakdown, not the total.</strong> The overall number is useful for benchmarking. The individual scores tell you where to act.</li>
        <li><strong>Fix the weakest signal first — but with judgment.</strong> If lead capture is 12, fix that today. If conversion is 55 and design is 86, add a form and a CTA.</li>
        <li><strong>Don&apos;t fix everything at once.</strong> Prioritize by impact on lead generation.</li>
        <li><strong>Re-audit after every change.</strong> Scores shift when you fix things. A quarterly audit catches new issues before they become expensive problems.</li>
      </ol>

      <hr className="my-12 border-steel/20" />

<h3 className="text-xl font-bold text-static">Related Articles</h3>
<ul className="text-sm text-muted space-y-2">
  <li><a href="/blog/4-signals-website-audit" className="text-signal hover:underline">The 4 Signals That Matter in a Website Audit</a></li>
  <li><a href="/blog/free-website-audit-what-it-checks" className="text-signal hover:underline">What a Free Website Audit Actually Checks</a></li>
  <li><a href="/blog/website-leaking-leads-pillar" className="text-signal hover:underline">Why Your Service Business Website Is Leaking Leads</a></li>
  <li><a href="/blog/competitive-gap-website-audit" className="text-signal hover:underline">Competitor Website Analysis for Service Businesses</a></li>
</ul>
    </>
  )
    }