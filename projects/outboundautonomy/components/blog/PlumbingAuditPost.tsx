export default function PlumbingAuditPost() {
  return (
    <>
      <p className="lead text-xl text-muted">
        Three plumbing companies, three different cities, three very different scores — and the same three problems.
      </p>

      <p className="text-sm text-muted italic">By Outbound Autonomy — Last updated April 2026</p>

      <p>
        <strong>TL;DR:</strong> We audited three real plumbing websites across different markets. Scores ranged from 44 to 67 out of 100. Every single one was missing a lead-capture form on the homepage. Two of the three had no phone number visible without scrolling. One&apos;s entire booking flow was broken on mobile. The patterns are consistent enough that we can predict the findings before scanning.
      </p>

      <p>
        We picked three plumbing service websites at random — one in a mid-sized Midwest city, one in a growing Texas suburb, and one in a competitive West Coast metro. Different markets, different site builders, different budgets. Same underlying issues.
      </p>

      <p>
        Here&apos;s what the audits revealed.
      </p>

      <h2>Site A: The Family-Owned Veteran (Score: 67/100)</h2>

      <p>
        <strong>The site:</strong> Built on WordPress, likely 4–5 years old. Photos of actual jobs, friendly team page, lots of content. An owner who clearly cares.
      </p>

      <div className="bg-card border rounded-lg p-4 sm:p-6 my-6">
        <p className="font-bold text-lg mb-2">Score Breakdown</p>
        <div className="space-y-2">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Design &amp; Trust Signals</span>
              <span className="font-mono text-amber-400">61/100</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-amber-400 h-2 rounded-full" style={{ width: "61%" }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Conversion Optimization</span>
              <span className="font-mono text-orange-500">52/100</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-orange-500 h-2 rounded-full" style={{ width: "52%" }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Technical Foundation</span>
              <span className="font-mono text-green-400">78/100</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-green-400 h-2 rounded-full" style={{ width: "78%" }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Competitive Position</span>
              <span className="font-mono text-red-400">49/100</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-red-400 h-2 rounded-full" style={{ width: "49%" }}></div>
            </div>
          </div>
        </div>
        <p className="text-sm text-muted mt-3">Best technical foundation of the three — but conversion and competitive positioning dragged the score down significantly.</p>
      </div>

      <p><strong>What they got right:</strong></p>
      <ul>
        <li>Fast load times. The technical foundation was solid — good hosting, minimal bloat, working schema markup for LocalBusiness.</li>
        <li>Real photos of real work. No stock imagery. Team faces, job photos, customer interactions. That builds trust that stock photos never will.</li>
        <li>Service area pages. They had dedicated pages for each suburb they served, with localized content beyond just swapping the city name.</li>
      </ul>

      <p><strong>What was leaking leads:</strong></p>
      <ul>
        <li><strong>No form above the fold.</strong> The entire homepage had exactly zero ways for a visitor to submit a lead request without picking up the phone. Phone is good. Phone-only is not.</li>
        <li><strong>CTA overload in the hero.</strong> Three buttons: "Get a Quote," "Learn More," and "View Services." When every option is promoted, none is. A single primary action with one secondary fallsafe converts better every time.</li>
        <li><strong>No competitive differentiation.</strong> Their About page read "we&apos;ve been serving [City] for 15 years." So have three other plumbers within a mile. Nothing in the copy answered "why us instead of any of them."</li>
        <li><strong>No mobile tap target spacing.</strong> Buttons below the fold on mobile were crammed close enough that a customer with average-sized thumbs would hit the wrong one.</li>
      </ul>

      <h2>Site B: The Modern Builder Template (Score: 52/100)</h2>

      <p>
        <strong>The site:</strong> Built with a drag-and-drop builder (likely Squarespace or Wix). Clean lines, good fonts, modern feel. Designed by someone who understands visual design — but not lead generation.
      </p>

      <div className="bg-card border rounded-lg p-4 sm:p-6 my-6">
        <p className="font-bold text-lg mb-2">Score Breakdown</p>
        <div className="space-y-2">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Design &amp; Trust Signals</span>
              <span className="font-mono text-green-400">72/100</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-green-400 h-2 rounded-full" style={{ width: "72%" }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Conversion Optimization</span>
              <span className="font-mono text-red-400">38/100</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-red-400 h-2 rounded-full" style={{ width: "38%" }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Technical Foundation</span>
              <span className="font-mono text-amber-400">45/100</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-amber-400 h-2 rounded-full" style={{ width: "45%" }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Competitive Position</span>
              <span className="font-mono text-orange-500">43/100</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-orange-500 h-2 rounded-full" style={{ width: "43%" }}></div>
            </div>
          </div>
        </div>
        <p className="text-sm text-muted mt-3">Good design, bad conversion. The site looked better than Site A but performed worse where it mattered.</p>
      </div>

      <p><strong>What they got right:</strong></p>
      <ul>
        <li>Strong visual hierarchy. Clear headings, good use of whitespace, logical reading flow. A designer clearly touched this site.</li>
        <li>Above-fold phone number in large type. On mobile, it was tappable and prominent. Column 1 of the lead gen checklist: check.</li>
        <li>Consistent brand feel. Colors, fonts, imagery all aligned. Nothing felt broken or mismatched.</li>
      </ul>

      <p><strong>What was leaking leads:</strong></p>
      <ul>
        <li><strong>No lead form anywhere on the site.</strong> We checked every page — services, about, contact, blog. Zero forms. The only way to start a conversation was a "Contact" page with an email address. For a plumbing emergency? Email.</li>
        <li><strong>Mobile performance was unacceptably slow.</strong> Largest Contentful Paint (LCP) clocked in at 4.8 seconds on a 4G connection. That&apos;s nearly 5 seconds before a visitor sees anything useful. Industry best practice is under 2.5. At 4.8 seconds, you&apos;ve already lost half your mobile traffic.</li>
        <li><strong>Service pages had no pricing context.</strong> Not asking for published pricing — but nothing that set expectations either. "Call for a quote" without any ballpark range means most price-sensitive visitors won&apos;t call.</li>
        <li><strong>No FAQ section.</strong> Every plumbing website gets the same questions (emergency response time, payment methods, service area). Answering those on the page captures search traffic and pre-qualifies leads. This site answered zero of them.</li>
      </ul>

      <h2>Site C: The High-Budget Disappointment (Score: 44/100)</h2>

      <p>
        <strong>The site:</strong> A custom-built site that probably cost $8,000–$12,000. Custom illustrations, animated sections, a booking calendar integration, professional photography. By every visible measure, the most expensive site in this audit.
      </p>

      <div className="bg-card border rounded-lg p-4 sm:p-6 my-6">
        <p className="font-bold text-lg mb-2">Score Breakdown</p>
        <div className="space-y-2">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Design &amp; Trust Signals</span>
              <span className="font-mono text-green-400">53/100</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-green-400 h-2 rounded-full" style={{ width: "53%" }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Conversion Optimization</span>
              <span className="font-mono text-red-400">35/100</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-red-400 h-2 rounded-full" style={{ width: "35%" }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Technical Foundation</span>
              <span className="font-mono text-orange-500">39/100</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-orange-500 h-2 rounded-full" style={{ width: "39%" }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Competitive Position</span>
              <span className="font-mono text-red-400">50/100</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-red-400 h-2 rounded-full" style={{ width: "50%" }}></div>
            </div>
          </div>
        </div>
        <p className="text-sm text-muted mt-3">The most expensive site scored the lowest. Money spent on visuals wasn&apos;t spent on the things that actually generate leads.</p>
      </div>

      <p><strong>What they got right:</strong></p>
      <ul>
        <li>The visual brand was strong. Custom iconography, consistent illustration style, professional headshots. It looked the part of an established company.</li>
        <li>They had a booking calendar — but it was buried three clicks deep and required loading a separate booking platform.</li>
        <li>Google Business Profile was well-maintained, with regular posts and photo updates.</li>
      </ul>

      <p><strong>What was leaking leads:</strong></p>
      <ul>
        <li><strong>The booking flow was broken on mobile.</strong> Their booking calendar integration didn&apos;t scale properly. On an iPhone 14, the date picker was cut off at the bottom and unclickable. A prospective customer trying to book at 10 PM on a Tuesday would have given up and called a competitor.</li>
        <li><strong>9 HTTP requests on the homepage just for animations.</strong> The custom animations that looked impressive on desktop were destroying load speed on mobile. Total page weight was over 4MB — three times the recommended maximum.</li>
        <li><strong>No social proof above the fold.</strong> No reviews, no testimonials, no Google rating — nothing visible until you scrolled past three full viewports. In a trust-based industry like plumbing, that&apos;s a critical miss.</li>
        <li><strong>No secondary contact option.</strong> The site pushed heavily toward the booking calendar (which was broken). There was no prominent phone number, no chat widget, no "text us" option. If the booking tool didn&apos;t work, the visitor had nowhere to go.</li>
      </ul>

      <h2>The Common Thread: Three Sites, Three Problems</h2>

      <p>
        Across all three plumbing websites — different markets, different budgets, different builders — exactly three issues appeared on every scorecard:
      </p>

      <ol>
        <li>
          <strong>No lead-capture form on the homepage.</strong> Zero out of three had a form above the fold. Each site assumed the visitor would take the initiative to navigate to a contact page. On mobile, every extra click costs 10–15% of your traffic.
        </li>
        <li>
          <strong>Phone number present, but not optimized.</strong> Sites A and B made the phone visible but didn&apos;t pair it with a secondary option (form, text, chat). Site C&apos;s phone was buried in the footer. Every site lost the visitor who doesn&apos;t want to call — and that&apos;s roughly 40% of mobile users.
        </li>
        <li>
          <strong>No competitive positioning.</strong> None of these sites answered the question "why choose us over the 8 other plumbers on Google?" Unique value proposition was implied at best, absent at worst. In a competitive local market, that&apos;s a silent lead killer.
        </li>
      </ol>

      <h2>What $0 Would Fix Right Now</h2>

      <p>
        Before spending a dollar on redesigns, here are three fixes any of these sites could make in an afternoon:
      </p>

      <ul>
        <li><strong>Add a one-field contact form below the hero.</strong> Service, name, phone — that&apos;s it. Three fields converts better than nine. Put it on every page.</li>
        <li><strong>Move the phone number to the sticky header.</strong> Every viewport, every scroll position. Tappable. Against the header background so it&apos;s always visible.</li>
        <li><strong>Write 10 sentences about why you specifically.</strong> Not "we&apos;re family-owned." Every plumber is family-owned. What actually makes you different? 24/7 response? Flat-rate pricing? A 5-year warranty on parts? Say it in the hero subheading.</li>
      </ul>

      <h2>The Real Metric: Score Doesn&apos;t Tell the Whole Story</h2>

      <p>
        Site A scored the highest at 67 — but its core problem (no form) was the same as Site C at 44. The scores differ on implementation quality, not on strategic gaps. What that means for you:
      </p>

      <p>
        A high score doesn&apos;t mean your funnel is airtight. It means your site is relatively better than the worst — but the same leaks may still exist. The only way to know is to test each dimension individually.
      </p>

      <p>
        The best-scoring site in this audit is still losing leads. The worst-scoring site has an expensive site that looks impressive but can&apos;t convert. Neither one is generating the calls their owner deserves.
      </p>

      <h2>How Your Site Stacks Up</h2>

      <p>
        These three sites are not unusual. We see the same patterns across HVAC, electrical, landscaping, and dental websites. The problems are consistent because the approach is consistent: build a site that looks good and hope leads follow.
      </p>

      <p>
        Hope isn&apos;t a strategy. An audit is.
      </p>

      <p>
        Enter your URL below and we&apos;ll run the same four-signal audit on your site — Design &amp; Trust, Conversion, Technical, Competitive Position. You&apos;ll see your score, your specific issues, and what to fix first.
      </p>

      <p className="text-sm text-muted italic">
        No email required. No sales pitch. Just your score and your fixes.
      </p>
    </>
  )
}
