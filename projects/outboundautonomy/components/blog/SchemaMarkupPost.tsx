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

      <p><strong>Our audit checks for schema as part of your Technical score. Enter your URL. If it&apos;s missing, we&apos;ll flag it immediately.</strong></p>
    </>
  )
}
