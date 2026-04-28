import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <div className="mx-auto max-w-lg space-y-6">
        <p className="text-sm uppercase tracking-[0.35em] text-muted">404</p>
        <h1 className="text-5xl font-black tracking-tight text-static md:text-7xl">
          Page not found
        </h1>
        <p className="text-lg text-muted">
          This page doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl bg-signal px-6 py-3 text-sm font-semibold text-void transition-colors hover:bg-signal/90"
          >
            Back to homepage
          </Link>
          <Link
            href="/#audit"
            className="inline-flex items-center justify-center rounded-xl border border-steel px-6 py-3 text-sm font-semibold text-static transition-colors hover:bg-depth"
          >
            Generate a free audit
          </Link>
        </div>
      </div>
    </div>
  )
}
