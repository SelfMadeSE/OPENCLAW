export default function SchemaMarkupPost() {
  return (
    <>
      <p className="text-sm text-muted italic">By Outbound Autonomy — Last updated April 2026</p>

      <p><strong>TL;DR:</strong> Schema markup is code you add to your site that tells Google exactly who you are, what you do, and where you serve. Most service businesses don&apos;t have it. The ones that do rank higher in local pack results.</p>

      <h2>What Schema Markup Does</h2>

      <p>Schema markup is structured data — specific code that search engines read to understand your business details. It&apos;s not visible to visitors, but Google uses it to determine whether your business matches a search query.</p>

      <p>For a service business, the most important schema types are:</p>
      <ul>
        <li><strong>LocalBusiness</strong> — Business name, address, phone, hours, service area</li>
        <li><strong>Service</strong> — Specific services you offer (HVAC repair, plumbing, electrical)</li>
        <li><strong>Review</strong> — Aggregate rating and review count</li>
        <li><strong>FAQ</strong> — Common questions and answers (appears as rich snippets)</li>
        <li><strong>OpeningHours</strong> — When you&apos;re available (critical for emergency service searches)</li>
      </ul>

      <h2>Why Most Service Businesses Don&apos;t Have It</h2>

      <p>Schema requires either a plugin, a developer, or manual JSON-LD code. Most service business websites are built on DIY platforms (Wix, Squarespace, GoDaddy) that don&apos;t include schema by default. Even WordPress sites often lack it unless a specific SEO plugin was installed.</p>

      <p>The result: a service business with a great reputation, fast website, and competitive pricing gets outranked by a lesser competitor who happened to install the right plugin.</p>

      <p>Schema is the technical difference between showing up in the local pack with a star rating and contact button vs. showing up as a plain link three results lower.</p>

      <h2>LocalBusiness Schema: Trade-Specific Examples</h2>

      <p>The <code>@type</code> field in LocalBusiness schema accepts subtypes that tell Google exactly what kind of business you are. Here are concrete examples for the most common service trades:</p>

      <h3>Plumber</h3>
      <pre className="bg-depth rounded-lg p-4 overflow-x-auto text-sm"><code>{`{
  "@context": "https://schema.org",
  "@type": "Plumber",
  "name": "Your Plumbing Co.",
  "telephone": "780-555-0100",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main Street",
    "addressLocality": "Grande Prairie",
    "addressRegion": "AB",
    "postalCode": "T8V 1A1",
    "addressCountry": "CA"
  },
  "openingHours": "Mo-Fr 07:00-18:00, Sa 08:00-16:00",
  "areaServed": ["Grande Prairie", "Clairmont", "Sexsmith", "Wembley"],
  "priceRange": "$$",
  "sameAs": ["https://facebook.com/yourplumbingco", "https://homestars.com/yourplumbingco"]
}`}</code></pre>

      <h3>HVAC Contractor</h3>
      <pre className="bg-depth rounded-lg p-4 overflow-x-auto text-sm"><code>{`{
  "@context": "https://schema.org",
  "@type": "HVACBusiness",
  "name": "Alpine HVAC Services",
  "telephone": "780-555-0101",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "456 Industrial Ave",
    "addressLocality": "Grande Prairie",
    "addressRegion": "AB",
    "postalCode": "T8V 3B4",
    "addressCountry": "CA"
  },
  "openingHours": "Mo-Su 06:00-22:00",
  "areaServed": {
    "@type": "City",
    "name": "Grande Prairie"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "HVAC Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Furnace Repair" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AC Installation" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Heat Pump Service" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Duct Cleaning" } }
    ]
  }
}`}</code></pre>

      <h3>Roofer</h3>
      <pre className="bg-depth rounded-lg p-4 overflow-x-auto text-sm"><code>{`{
  "@context": "https://schema.org",
  "@type": "RoofingContractor",
  "name": "Peace Country Roofing",
  "telephone": "780-555-0102",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "789 Construction Way",
    "addressLocality": "Grande Prairie",
    "addressRegion": "AB",
    "postalCode": "T8V 5C7",
    "addressCountry": "CA"
  },
  "openingHours": "Mo-Fr 07:00-17:00",
  "areaServed": "Grande Prairie and surrounding area",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Roofing Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Shingle Roof Installation" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Flat Roof Repair" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Gutter Installation" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Emergency Roof Tarping" } }
    ]
  }
}`}</code></pre>

      <h3>Emergency Electrician</h3>
      <pre className="bg-depth rounded-lg p-4 overflow-x-auto text-sm"><code>{`{
  "@context": "https://schema.org",
  "@type": "Electrician",
  "name": "Northlight Electric",
  "telephone": "780-555-0103",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "321 Power Street",
    "addressLocality": "Grande Prairie",
    "addressRegion": "AB",
    "postalCode": "T8V 2D5",
    "addressCountry": "CA"
  },
  "openingHours": "Mo-Su 00:00-23:59",
  "areaServed": ["Grande Prairie", "Clairmont", "Sexsmith", "Wembley", "Beaverlodge"],
  "priceRange": "$$-$$$",
  "emergencyService": "Yes"
}`}</code></pre>

      <h2>Review Schema: Turning Testimonials Into SERP Star Ratings</h2>

      <p>Review schema is one of the most underused competitive advantages in local SEO. When implemented correctly, your Google search result shows a star rating — &ldquo;4.6 ★★★★★ (87 reviews)&rdquo; — directly below your link. That visual trust signal dramatically increases click-through rates.</p>

      <h3>How to Implement Review Schema</h3>

      <p>You need two schema blocks to make this work:</p>

      <p><strong>1. AggregateRating</strong> — The overall rating displayed in search results:</p>

      <pre className="bg-depth rounded-lg p-4 overflow-x-auto text-sm"><code>{`{
  "@context": "https://schema.org",
  "@type": "HVACBusiness",
  "name": "Alpine HVAC Services",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "142",
    "bestRating": "5",
    "worstRating": "1"
  }
}`}</code></pre>

      <p><strong>2. Individual Reviews</strong> — Mark up specific testimonials on your site (add these to your testimonial or reviews page):</p>

      <pre className="bg-depth rounded-lg p-4 overflow-x-auto text-sm"><code>{`{
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": {
    "@type": "HVACBusiness",
    "name": "Alpine HVAC Services"
  },
  "author": {
    "@type": "Person",
    "name": "Sarah M."
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "5",
    "bestRating": "5"
  },
  "reviewBody": "Our furnace went out on the coldest night of the year. Alpine was at our door in under an hour. Fixed the issue and didn't overcharge. Highly recommend."
}`}</code></pre>

      <h3>Where to Source Your Review Data</h3>

      <ul>
        <li><strong>Google Business Profile reviews</strong> — You can aggregate and mark these up on your site. Google doesn&apos;t penalize marking up reviews that exist on your GBP (and appear on Google).</li>
        <li><strong>HomeStars ratings</strong> — Popular in Canada. If you have strong HomeStars reviews, mark them up on your site as well.</li>
        <li><strong>Site testimonials</strong> — Any testimonial you publish on your own site should be marked up with Review schema.</li>
        <li><strong>Third-party aggregates</strong> — If you have ratings across multiple platforms (GBP, Yelp, HomeStars, BBB), consolidate them into a single AggregateRating on your site. Use the total count of all verifiable reviews.</li>
      </ul>

      <h3>The Critical Rule: Don&apos;t Fake Reviews</h3>

      <p>Google&apos;s structured data guidelines require that the marked-up reviews actually exist and come from real customers. Inflating your review count or rating value can lead to a manual action penalty. Only mark up reviews you can verify — ideally linking to the source platform.</p>

      <h2>FAQ Schema for Service Pages</h2>

      <p>FAQ schema is especially powerful for service businesses because it helps you claim &ldquo;People Also Ask&rdquo; real estate in search results. A single FAQ snippet can expand to show 3–5 questions directly in the SERP, driving traffic without requiring a click-through first.</p>

      <h3>Example: FAQ Schema for an HVAC Company</h3>

      <pre className="bg-depth rounded-lg p-4 overflow-x-auto text-sm"><code>{`{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does a furnace repair cost in Grande Prairie?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Furnace repair costs in Grande Prairie typically range from $150 to $800 depending on the issue. Minor repairs like a broken thermostat or ignitor run $150-$350. Major repairs like a failed blower motor or heat exchanger can cost $500-$1,500. Most HVAC companies charge a diagnostic fee of $75-$150 that's applied to the repair if you proceed."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer emergency HVAC service?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, most HVAC contractors in Grande Prairie offer 24/7 emergency service for heating failures during winter months. Response times vary, but top-rated companies typically arrive within 1-2 hours for emergency calls."
      }
    },
    {
      "@type": "Question",
      "name": "How often should I service my furnace?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Furnaces should be serviced at least once per year, ideally in late summer or early fall before heating season begins. Annual maintenance extends furnace life by 3-5 years and can reduce heating bills by 10-15%."
      }
    }
  ]
}`}</code></pre>

      <h3>Best Practices for FAQ Schema</h3>

      <ul>
        <li><strong>Only mark up questions that appear visibly on your page.</strong> Google penalizes FAQ schema for questions that aren&apos;t displayed as visible content.</li>
        <li><strong>Keep answers concise (40–60 words is ideal).</strong> Short, direct answers perform better in rich snippets.</li>
        <li><strong>Use natural language</strong> — write the way your customers ask questions. &ldquo;How much does a furnace repair cost?&rdquo; not &ldquo;What is the estimated cost of furnace repair services?&rdquo;</li>
        <li><strong>Update questions seasonally.</strong> Winter: &ldquo;furnace repair.&rdquo; Summer: &ldquo;AC installation.&rdquo; Stale FAQ content signals an inactive site.</li>
      </ul>

      <h2>5 Common Schema Implementation Mistakes</h2>

      <p>Even well-intentioned schema implementations can hurt your SEO if they&apos;re set up wrong. Here are the most common errors we see in audits:</p>

      <h3>Mistake #1: Missing Required Fields</h3>
      <p>Google requires certain fields for each schema type to qualify for rich results. For LocalBusiness, you must include <code>name</code>, <code>address</code>, and <code>telephone</code>. Missing any of these means your schema is effectively invisible to Google&apos;s rich result parser.</p>

      <h3>Mistake #2: Schema on the Wrong Pages</h3>
      <p>Putting LocalBusiness schema on your blog posts or service area pages rather than your homepage and contact page dilutes the signal. Schema belongs where the information is presented — Homepage (+ LocalBusiness), Contact page (+ LocalBusiness + OpeningHours), Service pages (+ Service), Testimonials page (+ Review).</p>

      <h3>Mistake #3: Conflicting or Duplicate Schema</h3>
      <p>Having two different LocalBusiness schema blocks on the same page with slightly different information (e.g., one with &ldquo;Plumber&rdquo; and one with &ldquo;HVACBusiness&rdquo;) confuses Google&apos;s parser. Each page should have one authoritative schema block per entity.</p>

      <h3>Mistake #4: Using Microdata Instead of JSON-LD</h3>
      <p>Google recommends JSON-LD format for structured data. Microdata (inline HTML attributes) and RDFa still work but are harder to maintain and more prone to parsing errors. JSON-LD is cleaner, easier to debug, and is Google&apos;s preferred format.</p>

      <h3>Mistake #5: Forgetting to Update Schema When Business Info Changes</h3>
      <p>Changed your phone number? Moved offices? Extended your hours for summer? Update your schema immediately. Outdated schema is worse than no schema — it actively misleads Google and erodes trust signals.</p>

      <h2>How to Test Your Schema With Google&apos;s Rich Results Test</h2>

      <p>After implementing schema markup, you need to verify it&apos;s working. Google&apos;s <strong>Rich Results Test</strong> is the official tool:</p>

      <ol>
        <li>Go to <a href="https://search.google.com/test/rich-results" className="text-signal hover:underline" target="_blank" rel="noopener noreferrer">Google Rich Results Test</a></li>
        <li>Enter your URL or paste your code</li>
        <li>Review the output:
          <ul>
            <li><strong>Green checkmarks</strong> = Valid rich result items detected</li>
            <li><strong>Yellow warnings</strong> = Valid but suboptimal (e.g., missing recommended fields)</li>
            <li><strong>Red errors</strong> = Invalid — Google cannot use this data</li>
          </ul>
        </li>
      </ol>

      <p>The tool shows exactly which items were detected, which fields are missing, and whether your markup qualifies for rich snippets (star ratings, FAQ accordions, etc.).</p>

      <p>Run this test after every schema update and whenever you change your site structure. It&apos;s free, takes 10 seconds, and prevents months of wasted effort from broken markup.</p>

      <p>For a deeper look at your overall local SEO health, check out our <a href="/blog/local-seo-starter-kit" className="text-signal hover:underline">Local SEO Starter Kit for HVAC, Plumbing &amp; Electrical</a> — it covers the full picture beyond just schema.</p>

      <h2>The Schema Audit Test</h2>

      <p>When Outbound Autonomy scans your site, our Technical score checks for:</p>

      <h3>1. Is LocalBusiness schema present?</h3>
      <p>This is the baseline. Without it, Google has to infer your business details from unstructured page text. With it, Google knows your name, address, phone, and service area with certainty.</p>

      <h3>2. Does it include service area coordinates?</h3>
      <p>Schema that specifies your service area (up to a certain radius or list of cities) helps Google match you to &ldquo;near me&rdquo; searches even when you&apos;re not geographically closest.</p>

      <h3>3. Are reviews marked up?</h3>
      <p>Review schema enables star ratings in search results. A 4.5-star rating with 87 reviews visible in search results outperforms a plain link every time.</p>

      <h3>4. Are services listed individually?</h3>
      <p>Service schema tells Google you do specific things. &ldquo;Furnace repair,&rdquo; &ldquo;AC installation,&rdquo; &ldquo;Emergency plumbing&rdquo; each get their own search relevance signal.</p>

      <p>Most service businesses score low on all four. A site that scores 85+ on technical fundamentals can still lose the local pack because schema is missing.</p>

      <h2>Why Schema Matters for Local Map Rankings</h2>

      <p>Schema isn&apos;t just about rich snippets — it directly feeds into Google Maps ranking. Our <a href="/blog/grande-prairie-local-seo-google-maps" className="text-signal hover:underline">Grande Prairie local SEO guide</a> explains the full picture, but the short version is: Google Maps pulls structured data from your website and your Google Business Profile. If your schema is missing or inaccurate, your map listing loses confidence signals that competitors with proper schema maintain.</p>

      <h2>The Fix</h2>

      <p>Schema isn&apos;t hard to add. Most platforms support it through:</p>
      <ul>
        <li><strong>WordPress:</strong> Yoast SEO or Rank Math plugin — enables LocalBusiness schema in one click</li>
        <li><strong>Squarespace:</strong> Built-in Local Business settings in the SEO panel</li>
        <li><strong>Wix:</strong> Wix SEO tools include basic schema options</li>
        <li><strong>Custom sites:</strong> A developer can add JSON-LD to the <code>{`<head>`}</code> in about 15 minutes</li>
      </ul>

      <p>The hard part isn&apos;t implementation — it&apos;s knowing what to put where and whether it&apos;s set up correctly. That&apos;s what the audit checks.</p>

      <h2>What It&apos;s Worth</h2>

      <p>Schema markup alone won&apos;t put you at #1. But in a competitive local market — HVAC in an area with 30+ contractors, or plumbing in a metro — schema is often the difference between page 1 and page 2.</p>

      <p>It&apos;s a one-time setup that compounds every time someone searches for your service.</p>

      <p>Wondering what else a free audit checks besides schema? <a href="/blog/free-website-audit-what-it-checks" className="text-signal hover:underline">Here&apos;s the full list of signals</a> our scanner evaluates.</p>

      <p><strong>Our audit checks for schema as part of your Technical score. Enter your URL. If it&apos;s missing, we&apos;ll flag it immediately.</strong></p>

      <hr className="my-12 border-steel/20" />

      <h3 className="text-xl font-bold text-static">Related Articles</h3>
      <ul className="text-sm text-muted space-y-2">
        <li><a href="/blog/local-seo-starter-kit" className="text-signal hover:underline">Local SEO Starter Kit for HVAC, Plumbing &amp; Electrical</a> — The full local SEO checklist beyond just schema</li>
        <li><a href="/blog/grande-prairie-local-seo-google-maps" className="text-signal hover:underline">Why Your Grande Prairie Business Isn&apos;t Showing Up on Google Maps</a> — Map ranking signals explained</li>
        <li><a href="/blog/free-website-audit-what-it-checks" className="text-signal hover:underline">Free Website Audit: What It Checks</a> — Understand every signal your audit score covers</li>
        <li><a href="/blog/service-business-website-cost-2026" className="text-signal hover:underline">How Much Should a Service Business Website Cost in 2026?</a></li>
      </ul>
    </>
  )
}
