'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface NavigationProps {
  isOpen: boolean
  onClose: () => void
  links: Array<{ name: string; href: string }>
}

export default function Navigation({ isOpen, onClose, links }: NavigationProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-void/80 backdrop-blur-sm z-50"
          />
          
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-80 bg-depth border-l border-steel z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-steel">
              <h2 className="text-xl font-semibold text-static">Menu</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="p-2"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <nav className="flex-1 p-4">
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={onClose}
                      className="block text-lg text-static hover:text-signal transition-colors py-2"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="p-4 border-t border-steel">
              <Button variant="primary" className="w-full" onClick={onClose}>
                Get Started
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}