import { Container, Section, Badge, Button } from '@/components/ui'

export function AIReceptionist() {
  return (
    <Section id="ai-receptionist" className="py-16">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-warm text-white">Flagship</Badge>
            </div>
            <h2 className="text-4xl font-bold text-static mb-6">AI Receptionist</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-static mb-3">What it does:</h3>
                <ul className="space-y-2 text-muted">
                  <li className="flex items-start gap-2">
                    <span className="text-signal mt-1">•</span>
                    Answers every call 24/7/365
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-signal mt-1">•</span>
                    Routes to the right person/department
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-signal mt-1">•</span>
                    Books appointments in your calendar
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-signal mt-1">•</span>
                    Logs every interaction to CRM
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-signal mt-1">•</span>
                    Handles multiple calls simultaneously
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-signal mt-1">•</span>
                    No scripts — learns your business naturally
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-static mb-3">How it's different:</h3>
                <ul className="space-y-2 text-muted">
                  <li className="flex items-start gap-2">
                    <span className="text-signal mt-1">•</span>
                    No robotic menus. Callers have natural conversation.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-signal mt-1">•</span>
                    94% first-contact accuracy
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-signal mt-1">•</span>
                    Sub-800ms latency
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-static mb-3">Pricing:</h3>
              <div className="space-y-2 text-muted">
                <p>Standard: $299/month</p>
                <p>Business: $499/month</p>
                <p>Enterprise: Custom pricing</p>
              </div>
              <Button href="/contact" className="mt-6">
                Start Free Trial →
              </Button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-signal/10 to-transparent p-8 rounded-lg">
            <div className="aspect-video bg-steel/50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-signal rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">📞</span>
                </div>
                <p className="text-static">AI Receptionist Demo</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}