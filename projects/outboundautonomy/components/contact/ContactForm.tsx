'use client'

import { useState } from 'react'
import { Button, Input, Textarea, Select, Container, Section } from '@/components/ui'

const serviceOptions = [
  { value: 'web_design', label: 'Website audit fixes + landing page improvements' },
  { value: 'automation', label: 'Lead capture + follow-up automation' },
  { value: 'marketing', label: 'Proposal review / strategy call' },
  { value: 'other', label: 'Not sure yet' }
]

const budgetOptions = [
  { value: 'not_sure', label: 'Not sure yet' },
  { value: 'under_500', label: 'Under $500' },
  { value: '500_2000', label: '$500-$2,000' },
  { value: '2000_10000', label: '$2,000-$10,000' },
  { value: '10000_plus', label: '$10,000+' }
]

interface ContactFormProps {
  initialIntent?: string
  initialAuditUrl?: string
}

function getAuditHostname(initialAuditUrl?: string) {
  if (!initialAuditUrl) return ''

  try {
    return new URL(/^https?:\/\//i.test(initialAuditUrl) ? initialAuditUrl : `https://${initialAuditUrl}`).hostname
  } catch {
    return ''
  }
}

function buildInitialMessage(initialIntent?: string, initialAuditUrl?: string) {
  if (initialIntent !== 'audit') return ''

  return [
    initialAuditUrl ? `Website URL: ${initialAuditUrl}` : '',
    'I would like the audit findings turned into a proposal and implementation plan.',
    'Please prioritize the highest-impact conversion, technical, and lead-capture fixes first.',
  ]
    .filter(Boolean)
    .join('\n')
}

export function ContactForm({ initialIntent, initialAuditUrl }: ContactFormProps) {
  const isAuditIntent = initialIntent === 'audit'
  const defaultFormData = {
    name: '',
    email: '',
    phone: '',
    company: getAuditHostname(initialAuditUrl),
    service_interest: isAuditIntent ? 'web_design' : '',
    budget_range: '',
    message: buildInitialMessage(initialIntent, initialAuditUrl)
  }

  const [formData, setFormData] = useState({
    ...defaultFormData
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData(defaultFormData)
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Section>
      <Container>
        <div className="max-w-2xl mx-auto">
          {isAuditIntent && (
            <div className="bg-signal/10 border border-signal/20 rounded-lg p-6 mb-6">
              <h3 className="text-signal font-semibold mb-2">Audit follow-up request</h3>
              <p className="text-muted">
                {initialAuditUrl
                  ? `We’ll use ${initialAuditUrl} as the starting point for your proposal review.`
                  : 'We’ll use your audit context as the starting point for your proposal review.'}
              </p>
            </div>
          )}

          {submitStatus === 'success' && (
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6 mb-6">
              <h3 className="text-green-400 font-semibold mb-2">Request sent successfully!</h3>
              <p className="text-muted">
                {isAuditIntent
                  ? 'We’ll use your audit context to shape the proposal and implementation conversation.'
                  : 'We’ll review your site or funnel and follow up with the best next step.'}
              </p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 mb-6">
              <h3 className="text-red-400 font-semibold mb-2">Something went wrong</h3>
              <p className="text-muted">Please try again or email owner@outboundautonomy.com.</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-static mb-2">Name *</label>
                <Input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full" />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-static mb-2">Email *</label>
                <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-static mb-2">Phone</label>
                <Input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full" />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-static mb-2">Company</label>
                <Input type="text" id="company" name="company" value={formData.company} onChange={handleChange} className="w-full" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="service_interest" className="block text-sm font-medium text-static mb-2">Service Interest *</label>
                <Select id="service_interest" name="service_interest" value={formData.service_interest} onChange={handleChange} required className="w-full">
                  <option value="">Select the best fit</option>
                  {serviceOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </Select>
              </div>

              <div>
                <label htmlFor="budget_range" className="block text-sm font-medium text-static mb-2">Budget Range</label>
                <Select id="budget_range" name="budget_range" value={formData.budget_range} onChange={handleChange} className="w-full">
                  <option value="">Select budget range</option>
                  {budgetOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </Select>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-static mb-2">Message *</label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full"
                placeholder={isAuditIntent
                  ? 'Tell us what the audit should prioritize, what page or funnel matters most, and any timing or budget context.'
                  : 'Share the website, page, funnel, or conversion problem you want reviewed.'}
              />
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'Sending...' : isAuditIntent ? 'Request Proposal Review' : 'Request Review'}
            </Button>
            <p className="text-xs text-muted">
              By submitting, you consent to Outbound Autonomy contacting you about this request.
              We use submitted details for audit follow-up, proposal scoping, and implementation planning only.
            </p>
          </form>
        </div>
      </Container>
    </Section>
  )
}
