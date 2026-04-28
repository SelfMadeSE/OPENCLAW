import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Analytics } from '@vercel/analytics/next'
import { PageTransition } from '@/components/layout/PageTransition'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata = {
  title: 'Outbound Autonomy — Free Website Audit With Targeted Fixes',
  description: 'Enter your URL to get a website audit with design, conversion, technical, and lead-capture insights, plus targeted fixes and a proposal path.',
  openGraph: {
    title: 'Outbound Autonomy — Free Website Audit With Targeted Fixes',
    description: 'Enter your URL to get a website audit with design, conversion, technical, and lead-capture insights, plus targeted fixes and a proposal path.',
    url: 'https://outboundautonomy.com',
    siteName: 'Outbound Autonomy',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Outbound Autonomy — Free Website Audit With Targeted Fixes',
    description: 'Enter your URL to get a website audit with targeted fixes and a proposal path for implementation.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} dark`}>
      <body className="bg-void text-static min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}