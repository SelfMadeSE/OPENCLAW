import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Analytics } from '@vercel/analytics/next'
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
  title: 'Outbound Autonomy — Custom AI Systems for Service Businesses',
  description: 'Custom AI workflow deployments for service businesses. Websites, automation, and AI systems scoped to your environment. Book a free discovery call.',
  openGraph: {
    title: 'Outbound Autonomy — Custom AI Systems for Service Businesses',
    description: 'Custom AI workflow deployments for service businesses. Websites, automation, and AI systems scoped to your environment.',
    url: 'https://outboundautonomy.com',
    siteName: 'Outbound Autonomy',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Outbound Autonomy — Custom AI Systems for Service Businesses',
    description: 'Custom AI workflow deployments for service businesses. Websites, automation, and AI systems scoped to your environment.',
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
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}