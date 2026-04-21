'use client'

import { useState } from 'react'
import { Button, Input, Textarea, Select, Container, Section } from '@/components/ui'

const serviceOptions = [
  { value: 'ai_receptionist', label: 'AI Receptionist' },
  { value: 'web_design', label: 'Web Design' },
  { value: 'app_development', label: 'App Development' },
  { value: 'automation', label: 'Automation' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'other', label: 'Other' }
]

const budgetOptions = [
  { value: 'under_500', label: 'Under $500' },
  { value: '500_2000', label: '$500-$2,000' },
  { value: '2000_10000', label: '$2,000-$10,000' },
  { value: '10000_plus', label: '$10,000+' },
  { value: 'not_sure', label: 'Not sure yet' }
]

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service_interest: '',
    budget_range: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service_interest: '',
          budget_range: '',
          message: ''
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Section>
      <Container>
        <div className="max-w-2xl mx-auto">
          {submitStatus === 'success' && (
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6 mb-6">
              <h3 className="text-green-400 font-semibold mb-2">Message sent successfully!</h3>
              <p className="text-muted">We'll get back to you within 4 hours during business hours.</p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 mb-6">
              <h3 className="text-red-400 font-semibold mb-2">Something went wrong</h3>
              <p className="text-muted">Please try again or call us directly at (570) 989-4873.</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-static mb-2">
                  Name *
                </label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-static mb-2">
                  Email *
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-static mb-2">
                  Phone
                </label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-static mb-2">
                  Company
                </label>
                <Input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="service_interest" className="block text-sm font-medium text-static mb-2">
                  Service Interest *
                </label>
                <Select
                  id="service_interest"
                  name="service_interest"
                  value={formData.service_interest}
                  onChange={handleChange}
                  required
                  className="w-full"
                >
                  <option value="">Select a service</option>
                  {serviceOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <label htmlFor="budget_range" className="block text-sm font-medium text-static mb-2">
                  Budget Range
                </label>
                <Select
                  id="budget_range"
                  name="budget_range"
                  value={formData.budget_range}
                  onChange={handleChange}
                  className="w-full"
                >
                  <option value="">Select budget range</option>
                  {budgetOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-static mb-2">
                Message *
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full"
                placeholder="Tell us what you need help with..."
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        </div>
      </Container>
    </Section>
  )
}