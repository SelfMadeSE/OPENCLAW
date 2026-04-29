'use client'

import { useState, useEffect } from 'react'
import { Menu } from 'lucide-react'
import Logo from '@/components/shared/Logo'
import { Button } from '@/components/ui/Button'
import Navigation from './Navigation'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Methodology', href: '/methodology' },
    { name: 'Services', href: '/services' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Sample Report', href: '/sample-report' },
    { name: 'Blog', href: '/blog' },
    { name: 'FAQ', href: '/faq' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <>
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-void/95 backdrop-blur-md border-b border-depth' 
          : 'bg-void border-b border-depth'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Logo />
            
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-static hover:text-signal transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="hidden md:block">
              <Button variant="primary" href="/contact">Get Started</Button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 text-static hover:text-signal"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <Navigation
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        links={navLinks}
      />
    </>
  )
}
