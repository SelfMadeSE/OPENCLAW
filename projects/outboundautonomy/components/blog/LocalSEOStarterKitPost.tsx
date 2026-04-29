export default function LocalSEOStarterKitPost() {
  return (
    <>
      <p className="text-sm text-muted italic">By Outbound Autonomy — Last updated April 2026</p>

      <p><strong>TL;DR:</strong> Most service businesses lose local leads not because their website is bad, but because Google can&apos;t confidently figure out who they are, where they serve, or what they do. This starter kit covers the five local SEO fundamentals that determine whether you show up in the local pack — or don&apos;t.</p>

      <h2>Why Local SEO Exists (And Why Your Website Probably Fails at It)</h2>

      <p>When a homeowner searches &quot;furnace repair near me&quot; or &quot;emergency plumber [city name],&quot; Google has about 0.3 seconds to decide which three businesses to show in the local pack — those map results with the pins that appear above organic listings.</p>

      <p>That decision isn&apos;t random. Google scores every local business against <strong>proximity, relevance, and prominence</strong> signals. No conspiracy. No penalty. Just math.</p>

      <p>The problem: most service business websites — especially those built on DIY platforms or by local web shops — were never designed to pass these signals. They were designed to &quot;look professional.&quot; Google doesn&apos;t care about looking professional. Google cares about whether your site answers three questions:</p>

      <ol>
        <li><strong>Who are you?</strong> (Business name + category)</li>
        <li><strong>Where are you?</strong> (Address + service area)</li>
        <li><strong>What do you do?</strong> (Services + scope)</li>
      </ol>

      <p>If your site is vague on any of these, Google buries you. Not because your work isn&apos;t great — but because Google can&apos;t confidently match you to the search.</p>

      <p>The fix doesn&apos;t require a new website. It requires closing five specific gaps.</p>

      <h2>Gap 1: Your Google Business Profile Is Incomplete or Inconsistent</h2>

      <p>Your Google Business Profile (GBP) is the single most important local ranking factor. It&apos;s also the most neglected.</p>

      <p>Here&apos;s what we find in virtually every audit of a trade business:</p>

      <h3>The Category Problem</h3>
      <p>GBP lets you choose up to 10 categories for your business. The first category is the most important — it tells Google what kind of business you are.</p>

      <p><strong>What trades businesses often pick:</strong></p>
      <ul>
        <li>&quot;General Contractor&quot; (HVAC company)</li>
        <li>&quot;Handyman&quot; (plumber)</li>
        <li>&quot;Business Services&quot; (electrician)</li>
      </ul>

      <p><strong>What Google expects:</strong></p>
      <ul>
        <li>&quot;HVAC Contractor&quot; + &quot;Air Conditioning Repair Service&quot; + &quot;Heating Contractor&quot; + &quot;Furnace Repair Service&quot; + &quot;Air Conditioning Contractor&quot;</li>
        <li>&quot;Plumber&quot; + &quot;Drainage Service&quot; + &quot;Water Heater Installation Service&quot; + &quot;Septic System Service&quot;</li>
        <li>&quot;Electrician&quot; + &quot;Electrical Installation Service&quot; + &quot;Electrical Repair Service&quot; + &quot;Lighting Contractor&quot;</li>
      </ul>

      <p><strong>The fix:</strong> Open your GBP dashboard. Delete any generic category. Add the most specific categories that describe exactly what you do. You get 10 slots — use them.</p>

      <h3>The NAP Problem</h3>
      <p>NAP = Name, Address, Phone number. Google cross-references this across your GBP, your website, and every directory that lists your business (YellowPages, Yelp, HomeStars, BBB, Angi, etc.).</p>

      <p>Every inconsistency — &quot;St&quot; vs &quot;Street,&quot; &quot;Unit 4&quot; vs &quot;#4,&quot; a slightly different phone format — is a deduction from Google&apos;s confidence score. Collectively, these deductions add up to one or two ranking positions. In competitive markets (a metro area with 50 HVAC companies), that&apos;s the difference between the local pack and page 2.</p>

      <p><strong>The fix:</strong> Run a manual NAP audit. Across your GBP, website footer, contact page, and the top 5 directories for your industry — every mention must match exactly. Use the same formatting (Ave vs Avenue, St vs Street) everywhere.</p>

      <h2>Gap 2: Your Website Has No Local Content</h2>

      <p>Google wants to see that your business is rooted in the community you serve. The strongest signal: <strong>city-specific pages or content.</strong></p>

      <h3>The Wrong Approach</h3>
      <p>One &quot;Service Areas&quot; page that lists 15 cities in a single paragraph. Google reads this as thin content, not as evidence of local relevance.</p>

      <h3>The Right Approach</h3>
      <p>A dedicated page (or at minimum a well-structured section) for each city or community you serve. Each page should include:</p>
      <ul>
        <li>The city name in the H1 and first paragraph</li>
        <li>Specific services you offer in that city (not generic copy)</li>
        <li>Local landmarks, neighborhoods, or regional context</li>
        <li>A local phone number if you have one</li>
        <li>Embedded Google Map showing your service coverage</li>
      </ul>

      <p><strong>Example:</strong> A plumber serving the Denver metro needs separate pages or sections for Denver, Aurora, Lakewood, Arvada, Westminster, and Thornton. Each with location-specific content, not just &quot;we serve [city].&quot;</p>

      <p><strong>Does this feel like overkill?</strong> In our audits, the businesses that rank highest always have this structure. The ones that don&apos;t show up on page 2 or 3. It&apos;s not subtle.</p>

      <h2>Gap 3: Your Website Is Missing Local Schema Markup</h2>

      <p>Schema markup is code that tells Google exactly who you are and what you do. Without it, Google has to infer your business details from unstructured page text — and most service business site text isn&apos;t structured enough for Google to parse accurately.</p>

      <p>For a trade business, the critical schema types are:</p>

      <h3>LocalBusiness Schema (Baseline)</h3>
      <p>This tells Google your business name, address, phone number, hours, and service area in a format Google reads with 100% accuracy.</p>

      <p>Required fields for trades businesses:</p>
      <ul>
        <li><code>{`@type`}</code>: LocalBusiness (or a subtype like HVACBusiness, PlumbingBusiness, ElectricianBusiness)</li>
        <li><code>name</code>: Exact legal business name</li>
        <li><code>address</code>: Full street address with postal code</li>
        <li><code>telephone</code>: Primary contact number</li>
        <li><code>openingHours</code>: Days and hours of operation</li>
        <li><code>areaServed</code>: Cities or radius you cover</li>
        <li><code>priceRange</code>: Indication of your pricing tier (or omit)</li>
      </ul>

      <h3>Service Schema (Differentiator)</h3>
      <p>This tells Google each specific service you offer. Instead of Google guessing whether &quot;furnace repair&quot; is one of your services, Service schema confirms it authoritatively.</p>

      <p>For an HVAC company: HVAC Contractor → &quot;Furnace Repair&quot; → &quot;AC Installation&quot; → &quot;Duct Cleaning&quot; → &quot;Heat Pump Service&quot;</p>

      <p>Each service gets its own search relevance signal. When someone searches &quot;furnace repair [city],&quot; Google can match you with higher confidence if your schema lists it explicitly.</p>

      <h3>Review Schema (Competitive Edge)</h3>
      <p>Review schema enables star ratings in search results. A 4.6-star rating with 94 reviews visible in the SERP is the strongest trust signal you can display before a user clicks.</p>

      <p><strong>Implementation note:</strong> Most DIY website builders don&apos;t include schema markup by default. WordPress sites need a plugin (Yoast SEO or Rank Math). Squarespace includes basic LocalBusiness schema in its Business SEO panel. Custom sites need manual JSON-LD — about 15 minutes of code work.</p>

      <p><strong>Our audit checks for schema automatically.</strong> If your site doesn&apos;t have it, you&apos;ll see &quot;Missing&quot; under Technical signals with a direct explanation of what to add.</p>

      <h2>Gap 4: You Haven&apos;t Built Local Citations</h2>

      <p>A citation is any mention of your business name, address, and phone number on a third-party website. Think directories, chamber of commerce listings, local news mentions, and industry association pages.</p>

      <p>Citations serve as <strong>trust votes</strong> from the web ecosystem. Each citation tells Google: &quot;This business is real, it exists at this address, and it&apos;s doing business in this community.&quot;</p>

      <h3>High-Impact Citations for Trades Businesses</h3>

      <div className="overflow-x-auto my-8">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-steel/30">
              <th className="text-left py-2 pr-4">Directory</th>
              <th className="text-left py-2">When to Prioritize</th>
            </tr>
          </thead>
          <tbody className="text-sm text-muted">
            <tr className="border-b border-steel/20"><td className="py-2 pr-4">Google Business Profile</td><td className="py-2">Non-negotiable. Start here.</td></tr>
            <tr className="border-b border-steel/20"><td className="py-2 pr-4">Yelp</td><td className="py-2">Required for visibility in searches.</td></tr>
            <tr className="border-b border-steel/20"><td className="py-2 pr-4">HomeStars (Canada)</td><td className="py-2">Critical for Canadian trades.</td></tr>
            <tr className="border-b border-steel/20"><td className="py-2 pr-4">BBB</td><td className="py-2">Trust signal + citation.</td></tr>
            <tr className="border-b border-steel/20"><td className="py-2 pr-4">Angi / HomeAdvisor</td><td className="py-2">Industry-specific.</td></tr>
            <tr className="border-b border-steel/20"><td className="py-2 pr-4">YellowPages</td><td className="py-2">Still indexed by Google.</td></tr>
            <tr className="border-b border-steel/20"><td className="py-2 pr-4">Local Chamber of Commerce</td><td className="py-2">Local relevance signal.</td></tr>
            <tr className="border-b border-steel/20"><td className="py-2 pr-4">Nextdoor</td><td className="py-2">Hyperlocal + reviews.</td></tr>
            <tr className="border-b border-steel/20"><td className="py-2 pr-4">Industry Associations (ACCA, PHCC, IEC)</td><td className="py-2">Niche authority.</td></tr>
          </tbody>
        </table>
      </div>

      <h3>Citation Consistency Rules</h3>
      <ul>
        <li>NAP must match across ALL citations</li>
        <li>Use the exact same business name (no &quot;LLC&quot; on one and &quot;Ltd&quot; on another)</li>
        <li>Same phone format (780-555-0100 everywhere, not 780.555.0100 on some)</li>
        <li>Same address formatting (St, not Street — but pick one and stick with it)</li>
      </ul>

      <p><strong>Pro tip:</strong> If you&apos;ve changed business names or locations in the last 5 years, old citations with outdated info are ranking liabilities. Find and update or remove them.</p>

      <h2>Gap 5: You&apos;re Not Generating Reviews Strategically</h2>

      <p>Reviews affect local ranking directly — Google weighs review quantity, recency, and diversity. A business with 50+ recent, varied reviews will consistently outrank a business with 10 old reviews.</p>

      <h3>The Strategy</h3>

      <div className="overflow-x-auto my-8">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-steel/30">
              <th className="text-left py-2 pr-4">Element</th>
              <th className="text-left py-2 pr-4">What Works</th>
              <th className="text-left py-2">What Doesn&apos;t</th>
            </tr>
          </thead>
          <tbody className="text-sm text-muted">
            <tr className="border-b border-steel/20"><td className="py-2 pr-4">Volume</td><td className="py-2 pr-4">3-5 new reviews per month</td><td className="py-2">Nothing for 6+ months</td></tr>
            <tr className="border-b border-steel/20"><td className="py-2 pr-4">Recency</td><td className="py-2 pr-4">Reviews within last 90 days</td><td className="py-2">Reviews from 2024+</td></tr>
            <tr className="border-b border-steel/20"><td className="py-2 pr-4">Diversity</td><td className="py-2 pr-4">Reviews across GBP, Yelp, HomeStars</td><td className="py-2">All reviews on one platform</td></tr>
            <tr className="border-b border-steel/20"><td className="py-2 pr-4">Response rate</td><td className="py-2 pr-4">Reply to 100% of reviews</td><td className="py-2">Never replying</td></tr>
            <tr className="border-b border-steel/20"><td className="py-2 pr-4">Keywords</td><td className="py-2 pr-4">&quot;Great furnace repair, fast response&quot;</td><td className="py-2">&quot;Great guy, did good work&quot;</td></tr>
          </tbody>
        </table>
      </div>

      <h3>Getting Reviews Without Begging</h3>
      <ol>
        <li><strong>Post-service follow-up text</strong> — Send a review link 1 hour after the job. Timing matters.</li>
        <li><strong>QR code on invoices</strong> — Customers see it while the service is fresh.</li>
        <li><strong>GBP review link tool</strong> — Use the place ID link generator to create a direct review URL.</li>
        <li><strong>Don&apos;t incentivize</strong> — Google explicitly bans incentivized reviews. Ask honestly or don&apos;t ask at all.</li>
      </ol>

      <h2>What a Winning Local SEO Setup Looks Like in Practice</h2>

      <p>Here&apos;s the full checklist. A service business with all of these checked will consistently show up in the local pack for their target terms:</p>

      <h3>🔲 Google Business Profile</h3>
      <ul>
        <li>Primary category matches your main service exactly</li>
        <li>All 10 category slots filled with relevant services</li>
        <li>Service area set to specific cities (not a huge radius)</li>
        <li>Photos updated in last 30 days</li>
        <li>Regular GBP posts (weekly minimum)</li>
        <li>Q&amp;A section monitored and answered</li>
      </ul>

      <h3>🔲 Website</h3>
      <ul>
        <li>City-specific service pages (not one generic &quot;service areas&quot; page)</li>
        <li>LocalBusiness schema installed and valid</li>
        <li>Service schema for each offering</li>
        <li>NAP in footer + contact page (matching GBP exactly)</li>
        <li>Mobile-friendly (Google uses mobile-first indexing)</li>
        <li>Fast load time under 3 seconds (Core Web Vitals compliant)</li>
        <li>SSL certificate active</li>
      </ul>

      <h3>🔲 Citations &amp; Directories</h3>
      <ul>
        <li>NAP consistent across all platforms (GBP, Yelp, HomeStars, BBB, etc.)</li>
        <li>Listed in local chamber of commerce (if applicable)</li>
        <li>Industry association listings current</li>
        <li>No outdated citations from old addresses or names</li>
      </ul>

      <h3>🔲 Reviews</h3>
      <ul>
        <li>50+ reviews on GBP</li>
        <li>Reviews on at least one secondary platform (Yelp, HomeStars)</li>
        <li>100% response rate to all reviews</li>
        <li>New reviews arriving weekly or bi-weekly</li>
      </ul>

      <h2>What Most Businesses Get Wrong</h2>

      <p><strong>&quot;I need to spend $2,000/month on SEO to rank locally.&quot;</strong></p>
      <p>False. Most local SEO fixes are one-time: set up your GBP correctly once, install schema once, build city pages once. After that, review generation and GBP posting are the only ongoing work.</p>

      <p><strong>&quot;Local SEO is about keywords.&quot;</strong></p>
      <p>Keywords matter, but local SEO is primarily about trust signals. Can Google verify you&apos;re a real business in this location offering these services? If yes, keywords fill in the rest.</p>

      <p><strong>&quot;My web designer handled SEO.&quot;</strong></p>
      <p>Most web designers install a basic SEO plugin and move on. They rarely set up LocalBusiness schema, optimize GBP categories, or build city-specific content. It&apos;s not malice — most designers don&apos;t specialize in local trade SEO.</p>

      <h2>The 90-Second Shortcut</h2>

      <p>You can spend a weekend working through this checklist. Or you can enter your URL below and in 90 seconds get a score that tells you exactly which of these signals your site passes and which it misses.</p>

      <p><strong>Our technical score specifically checks:</strong></p>
      <ul>
        <li>LocalBusiness schema presence</li>
        <li>Service schema presence</li>
        <li>NAP consistency across your site</li>
        <li>Google Business Profile category match</li>
        <li>Mobile responsiveness</li>
        <li>Page speed and Core Web Vitals</li>
        <li>SSL/HTTPS status</li>
      </ul>

      <p><strong>Enter your URL for a free audit →</strong> If your site is missing local SEO fundamentals, you&apos;ll see it flagged immediately — no account required, no sales call, no hidden upsells.</p>
    </>
  )
}
