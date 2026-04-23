import Stripe from 'stripe'

let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY is not set')
    }
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2026-03-25.dahlia',
    })
  }
  return _stripe
}

export const STRIPE_PRICES = {
  web_design: {
    basic: 'price_1TOMnvAtcuskq3MVVOPyaUsd',    // $250 one-time
    standard: 'price_1TOMnvAtcuskq3MVJ9S7aLyx',  // $1,500 one-time
    premium: 'price_1TOMnvAtcuskq3MVUrkN6n7a',   // $5,000 one-time
  },
} as const
