import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  service_interest: z.enum(['ai_receptionist', 'web_design', 'app_development', 'automation', 'marketing', 'other'], {
    message: 'Please select a service'
  }),
  budget_range: z.enum(['under_500', '500_2000', '2000_10000', '10000_plus', 'not_sure']).optional(),
  message: z.string().min(1, 'Message is required')
})

export const waitlistSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  name: z.string().optional(),
  service_interest: z.string().optional(),
  referral_source: z.string().optional()
})

export type ContactFormData = z.infer<typeof contactFormSchema>
export type WaitlistFormData = z.infer<typeof waitlistSchema>