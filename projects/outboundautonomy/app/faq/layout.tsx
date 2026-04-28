import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ — Outbound Autonomy',
  description:
    'Answers to common questions about the Outbound Autonomy website audit process, pricing, who it\u2019s for, and what happens after.',
  openGraph: {
    title: 'FAQ — Outbound Autonomy',
    description:
      'Answers to common questions about the Outbound Autonomy website audit process, pricing, who it\u2019s for, and what happens after.',
    type: 'website',
    url: 'https://outboundautonomy.com/faq',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ — Outbound Autonomy',
    description:
      'Answers to common questions about the Outbound Autonomy website audit process, pricing, and what happens after.',
  },
}

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
