import Logo from '@/components/shared/Logo'

export default function Footer() {
  return (
    <footer className="bg-depth border-t border-steel py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <p className="text-muted text-sm">
              Free website audits for service businesses — find what’s leaking, then build what fixes it.
            </p>
          </div>

          <div>
            <h3 className="text-static font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="text-muted hover:text-signal transition-colors">Home</a></li>
              <li><a href="/services" className="text-muted hover:text-signal transition-colors">Services</a></li>
              <li><a href="/pricing" className="text-muted hover:text-signal transition-colors">Pricing</a></li>
              <li><a href="/sample-report" className="text-muted hover:text-signal transition-colors">Sample Report</a></li>
              <li><a href="/faq" className="text-muted hover:text-signal transition-colors">FAQ</a></li>
              <li><a href="/about" className="text-muted hover:text-signal transition-colors">About</a></li>
              <li><a href="/contact" className="text-muted hover:text-signal transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-static font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/privacy" className="text-muted hover:text-signal transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="text-muted hover:text-signal transition-colors">Terms of Service</a></li>
              <li><a href="/cookies" className="text-muted hover:text-signal transition-colors">Cookie Policy</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-static font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <a href="mailto:owner@outboundautonomy.com" className="hover:text-signal transition-colors">
                  owner@outboundautonomy.com
                </a>
              </li>
              <li>
                <span className="text-muted">
                  Response within 24 hours
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-steel/50 text-center text-sm text-muted space-y-2">
          <p>&copy; 2026 Ecosystem Global Solutions. All rights reserved.</p>
          <p>9601 64 Ave, Grande Prairie, AB</p>
          <p>
            Every project includes scoping, implementation, and support. We stand behind our work.
          </p>
          <p>
            To stop non-transactional messages, email
            {' '}
            <a href="mailto:owner@outboundautonomy.com?subject=Opt-out%20request" className="hover:text-signal transition-colors">owner@outboundautonomy.com</a>
            {' '}
            with "STOP".
          </p>
        </div>
      </div>
    </footer>
  )
}