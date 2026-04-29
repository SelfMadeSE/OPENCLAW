/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel edge routing (vercel.json) handles /demo → /sample-report.
  // No Next.js redirect needed — this avoids an edge-vs-app-layer dead route.

  // sql.js ships as UMD + WASM — exclude from webpack bundling so the WASM
  // file can be resolved at runtime inside the serverless function.
  experimental: {
    serverComponentsExternalPackages: ['sql.js'],
    // Force Next.js to trace sql.js WASM files into serverless function bundles.
    outputFileTracingIncludes: {
      '/api/waitlist': ['./node_modules/sql.js/dist/*.wasm'],
      '/api/contact': ['./node_modules/sql.js/dist/*.wasm'],
      '/api/demo': ['./node_modules/sql.js/dist/*.wasm'],
      '/api/demo/hero': ['./node_modules/sql.js/dist/*.wasm'],
      '/api/webhook/stripe': ['./node_modules/sql.js/dist/*.wasm'],
      '/api/try/unlock': ['./node_modules/sql.js/dist/*.wasm'],
    },
  },
}

export default nextConfig
