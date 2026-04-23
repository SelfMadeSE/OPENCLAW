'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'

interface AuditData {
  designScore: number
  conversionScore: number
  technicalScore: number
  overallScore: number
  grade: string
  competitors: Array<{
    name: string
    screenshot: string
    analysis: string
  }>
  recommendations: Array<{
    id: number
    title: string
    description: string
    pricing: string
  }>
}

interface AuditReportProps {
  data: AuditData
}

function AuditReport({ data }: AuditReportProps) {
  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'text-green-500'
      case 'B': return 'text-blue-500'
      case 'C': return 'text-yellow-500'
      case 'D': return 'text-orange-500'
      default: return 'text-red-500'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-500'
    if (score >= 80) return 'bg-blue-500'
    if (score >= 70) return 'bg-yellow-500'
    if (score >= 60) return 'bg-orange-500'
    return 'bg-red-500'
  }

  return (
    <div className="space-y-8">
      {/* Overall Score */}
      <div className="text-center">
        <div className={`text-6xl font-bold ${getGradeColor(data.grade)}`}>
          {data.grade}
        </div>
        <div className="text-2xl text-muted">
          Overall Score: {data.overallScore}/100
        </div>
        <div className="text-sm text-muted mt-2">
          Based on design, conversion, and technical analysis
        </div>
      </div>

      {/* Score Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center p-6 bg-depth rounded-lg border border-steel">
          <div className="text-lg font-semibold text-static">Design/UI</div>
          <div className="mt-2 relative">
            <div className="h-3 bg-steel/30 rounded-full overflow-hidden">
              <div 
                className={`h-full ${getScoreColor(data.designScore)}`}
                style={{ width: `${data.designScore}%` }}
              />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-static">
            {data.designScore}/100
          </div>
        </div>

        <div className="text-center p-6 bg-depth rounded-lg border border-steel">
          <div className="text-lg font-semibold text-static">Conversion</div>
          <div className="mt-2 relative">
            <div className="h-3 bg-steel/30 rounded-full overflow-hidden">
              <div 
                className={`h-full ${getScoreColor(data.conversionScore)}`}
                style={{ width: `${data.conversionScore}%` }}
              />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-static">
            {data.conversionScore}/100
          </div>
        </div>

        <div className="text-center p-6 bg-depth rounded-lg border border-steel">
          <div className="text-lg font-semibold text-static">Technical</div>
          <div className="mt-2 relative">
            <div className="h-3 bg-steel/30 rounded-full overflow-hidden">
              <div 
                className={`h-full ${getScoreColor(data.technicalScore)}`}
                style={{ width: `${data.technicalScore}%` }}
              />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-static">
            {data.technicalScore}/100
          </div>
        </div>
      </div>

      {/* Competitor Examples */}
      <Section>
        <h2 className="text-3xl font-bold text-static text-center mb-8">
          What Top-Performing Sites Do
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.competitors.map((competitor, index) => (
            <div key={index} className="bg-depth rounded-lg border border-steel p-6">
              <h3 className="text-xl font-semibold text-static mb-4">
                {competitor.name}
              </h3>
              <div className="bg-steel/30 rounded-lg h-48 mb-4 flex items-center justify-center">
                <span className="text-muted">Competitor Screenshot</span>
              </div>
              <p className="text-muted">
                {competitor.analysis}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Recommendations */}
      <Section>
        <h2 className="text-3xl font-bold text-static text-center mb-8">
          How We Can Help
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.recommendations.map((rec) => (
            <div key={rec.id} className="bg-depth rounded-lg border border-steel p-6">
              <h3 className="text-xl font-semibold text-static mb-2">
                {rec.title}
              </h3>
              <p className="text-muted mb-4">
                {rec.description}
              </p>
              <div className="text-lg font-bold text-signal">
                Starting at {rec.pricing}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <div className="text-center">
        <Button variant="primary" size="lg" href="/contact?intent=audit">
          Get Full Implementation Plan
        </Button>
        <p className="text-sm text-muted mt-2">
          Free discovery call included
        </p>
      </div>
    </div>
  )
}

export default function SiteAuditTool() {
  const [url, setUrl] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [report, setReport] = useState<AuditData | null>(null)
  const [error, setError] = useState('')

  const generateAudit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to generate audit')
      }

      const data = await response.json()
      setReport(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (report) {
    return (
      <Section>
        <Container>
          <AuditReport data={report} />
        </Container>
      </Section>
    )
  }

  return (
    <Section className="py-20">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-static mb-6">
            Free Website Audit
          </h1>
          <p className="text-xl text-muted mb-12">
            Get your free website score and see how top-performing service businesses convert visitors into customers.
          </p>

          <form onSubmit={generateAudit} className="space-y-6">
            <div>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter your website URL"
                className="w-full px-4 py-3 bg-void border border-steel rounded-lg text-static focus:border-signal focus:outline-none"
                required
              />
            </div>

            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email (optional - get full report)"
                className="w-full px-4 py-3 bg-void border border-steel rounded-lg text-static focus:border-signal focus:outline-none"
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm">
                {error}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Generating...' : 'Generate Free Audit'}
            </Button>

            <p className="text-sm text-muted">
              Takes 30 seconds. No credit card required.
            </p>
          </form>
        </div>
      </Container>
    </Section>
  )
}