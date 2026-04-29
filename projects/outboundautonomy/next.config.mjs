/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel edge routing (vercel.json) handles /demo → /sample-report.
  // No Next.js redirect needed — this avoids an edge-vs-app-layer dead route.
};

export default nextConfig;
