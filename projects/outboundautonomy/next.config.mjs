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
      '/api/waitlist': ['./lib/vendor/sql-wasm.wasm', './node_modules/sql.js/dist/*.wasm', './db/schema.sql'],
      '/api/contact': ['./lib/vendor/sql-wasm.wasm', './node_modules/sql.js/dist/*.wasm', './db/schema.sql'],
      '/api/demo': ['./lib/vendor/sql-wasm.wasm', './node_modules/sql.js/dist/*.wasm', './db/schema.sql'],
      '/api/demo/hero': ['./lib/vendor/sql-wasm.wasm', './node_modules/sql.js/dist/*.wasm', './db/schema.sql'],
      '/api/webhook/stripe': ['./lib/vendor/sql-wasm.wasm', './node_modules/sql.js/dist/*.wasm', './db/schema.sql'],
      '/api/try/unlock': ['./lib/vendor/sql-wasm.wasm', './node_modules/sql.js/dist/*.wasm', './db/schema.sql'],
    },
  },
}

export default nextConfig
