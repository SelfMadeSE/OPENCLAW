import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import {
  createCustomer,
  getCustomerByStripeId,
  createSubscription,
  updateSubscription,
  createPayment
} from '@/lib/db'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')!

    let event
    try {
      const stripe = getStripe()
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      )
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as any
        
        // Create or get customer
        let customer = await getCustomerByStripeId(session.customer)
        if (!customer) {
          const customerId = await createCustomer({
            stripe_customer_id: session.customer,
            email: session.customer_details.email,
            name: session.customer_details.name,
            phone: session.customer_details.phone
          })
          if (customerId) {
            customer = await getCustomerByStripeId(session.customer)
          }
        }
        
        if (customer && session.mode === 'subscription') {
          // Create subscription record
          const subscription = await getStripe().subscriptions.retrieve(session.subscription)
          await createSubscription({
            stripe_subscription_id: subscription.id,
            customer_id: customer.id,
            plan_type: (subscription as any).metadata?.plan_type || 'automation_starter',
            status: subscription.status,
            current_period_start: new Date((subscription as any).current_period_start * 1000),
            current_period_end: new Date((subscription as any).current_period_end * 1000),
            cancel_at_period_end: (subscription as any).cancel_at_period_end
          })
        } else if (customer && session.mode === 'payment') {
          // Create payment record
          const paymentIntent = await getStripe().paymentIntents.retrieve(session.payment_intent)
          await createPayment({
            stripe_payment_intent_id: paymentIntent.id,
            stripe_charge_id: (paymentIntent as any).latest_charge,
            customer_id: customer.id,
            amount: paymentIntent.amount,
            currency: paymentIntent.currency,
            status: paymentIntent.status,
            description: paymentIntent.description || undefined
          })
        }
        break

      case 'customer.subscription.created':
        const createdSubscription = event.data.object as any
        const createdCustomer = await getCustomerByStripeId(createdSubscription.customer)
        
        if (createdCustomer) {
          await createSubscription({
            stripe_subscription_id: createdSubscription.id,
            customer_id: createdCustomer.id,
            plan_type: createdSubscription.metadata.plan_type || 'automation_starter',
            status: createdSubscription.status,
            current_period_start: new Date(createdSubscription.current_period_start * 1000),
            current_period_end: new Date(createdSubscription.current_period_end * 1000),
            cancel_at_period_end: createdSubscription.cancel_at_period_end
          })
        }
        break

      case 'customer.subscription.updated':
        const updatedSubscription = event.data.object as any
        
        await updateSubscription(updatedSubscription.id, {
          status: updatedSubscription.status,
          current_period_start: new Date(updatedSubscription.current_period_start * 1000),
          current_period_end: new Date(updatedSubscription.current_period_end * 1000),
          cancel_at_period_end: updatedSubscription.cancel_at_period_end
        })
        break

      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object as any
        
        await updateSubscription(deletedSubscription.id, {
          status: 'cancelled'
        })
        break

      case 'invoice.paid':
        const invoice = event.data.object as any
        const invoiceCustomer = await getCustomerByStripeId(invoice.customer)
        
        if (invoiceCustomer && invoice.subscription) {
          // Update subscription period
          const subscription = await getStripe().subscriptions.retrieve(invoice.subscription)
          await updateSubscription(subscription.id, {
            status: subscription.status,
            current_period_start: new Date((subscription as any).current_period_start * 1000),
            current_period_end: new Date((subscription as any).current_period_end * 1000)
          })
        }
        
        // Create payment record for the invoice
        if (invoiceCustomer && invoice.charge) {
          const charge = await getStripe().charges.retrieve(invoice.charge)
          await createPayment({
            stripe_charge_id: (charge as any).id,
            customer_id: invoiceCustomer.id,
            amount: (charge as any).amount,
            currency: (charge as any).currency,
            status: (charge as any).status,
            description: (charge as any).description || undefined
          })
        }
        break

      case 'invoice.payment_failed':
        const failedInvoice = event.data.object as any
        
        if (failedInvoice.subscription) {
          // Mark subscription as past_due
          const subscription = await getStripe().subscriptions.retrieve(failedInvoice.subscription)
          await updateSubscription(subscription.id, {
            status: 'past_due'
          })
        }
        break

      case 'payment_intent.succeeded':
        const succeededPaymentIntent = event.data.object as any
        const paymentCustomer = await getCustomerByStripeId(succeededPaymentIntent.customer)
        
        if (paymentCustomer) {
          await createPayment({
            stripe_payment_intent_id: succeededPaymentIntent.id,
            stripe_charge_id: succeededPaymentIntent.latest_charge,
            customer_id: paymentCustomer.id,
            amount: succeededPaymentIntent.amount,
            currency: succeededPaymentIntent.currency,
            status: 'succeeded',
            description: succeededPaymentIntent.description || undefined
          })
        }
        break

      case 'payment_intent.payment_failed':
        const failedPaymentIntent = event.data.object as any
        const failedPaymentCustomer = await getCustomerByStripeId(failedPaymentIntent.customer)
        
        if (failedPaymentCustomer) {
          await createPayment({
            stripe_payment_intent_id: failedPaymentIntent.id,
            stripe_charge_id: failedPaymentIntent.latest_charge,
            customer_id: failedPaymentCustomer.id,
            amount: failedPaymentIntent.amount,
            currency: failedPaymentIntent.currency,
            status: 'failed',
            description: failedPaymentIntent.description || undefined
          })
        }
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}
