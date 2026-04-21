'use client'

import { useState } from 'react'

export default function Home() {
  const [businessName, setBusinessName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/demo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          businessName,
          phoneNumber,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to setup receptionist')
      }

      setSuccess(true)
    } catch (err) {
      setError('Failed to setup your AI receptionist. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-teal-600/20"></div>
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              Never Lose a Patient to Voicemail
            </h1>
            <p className="text-2xl md:text-3xl font-light mb-8 text-gray-300">
              Your AI front desk, always answering when your team can't
            </p>
            
            {/* Dental-themed image placeholder */}
            <div className="mb-12 mx-auto w-64 h-64 bg-gradient-to-br from-blue-500/20 to-teal-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-blue-400/20">
              <div className="text-center">
                <div className="text-6xl mb-2">🦷</div>
                <p className="text-sm text-gray-400">Dental Office AI</p>
              </div>
            </div>

            {/* Demo Form */}
            {success ? (
              <div className="max-w-md mx-auto bg-green-900/30 border border-green-500/50 rounded-xl p-8 backdrop-blur-sm">
                <div className="text-4xl mb-4">✅</div>
                <h2 className="text-2xl font-bold mb-2">Success!</h2>
                <p className="text-green-300 mb-6">
                  Your AI receptionist is now answering calls at {businessName}!
                </p>
                <div className="bg-blue-900/40 border border-blue-400/30 rounded-lg p-4">
                  <p className="text-sm text-blue-200 mb-2">Try it now — call your receptionist:</p>
                  <p className="text-2xl font-mono font-bold text-white">
                    📞 (570) 989-4873
                  </p>
                  <p className="text-xs text-gray-400 mt-2">Call now to experience your AI receptionist</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Business name"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading || !businessName || !phoneNumber}
                  className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white font-bold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {isLoading ? 'Setting up your receptionist...' : 'See It Live'}
                </button>
                {error && (
                  <p className="text-red-400 text-sm text-center">{error}</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Enter</h3>
              <p className="text-gray-300">Provide your business details</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Call</h3>
              <p className="text-gray-300">AI answers incoming calls</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Request</h3>
              <p className="text-gray-300">Appointments are requested, then confirmed by your team</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="container mx-auto px-4 py-16 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 backdrop-blur-sm">
              <div className="text-2xl mb-3">🕒</div>
              <h3 className="text-lg font-semibold mb-2">24/7 Answering</h3>
              <p className="text-gray-300 text-sm">Never miss a call, day or night</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 backdrop-blur-sm">
              <div className="text-2xl mb-3">📅</div>
              <h3 className="text-lg font-semibold mb-2">Appointment Booking</h3>
              <p className="text-gray-300 text-sm">Schedule appointments automatically</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 backdrop-blur-sm">
              <div className="text-2xl mb-3">🎯</div>
              <h3 className="text-lg font-semibold mb-2">Lead Qualification</h3>
              <p className="text-gray-300 text-sm">Identify and prioritize potential patients</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 backdrop-blur-sm">
              <div className="text-2xl mb-3">💬</div>
              <h3 className="text-lg font-semibold mb-2">SMS Confirmations</h3>
              <p className="text-gray-300 text-sm">Automated text reminders</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 backdrop-blur-sm">
              <div className="text-2xl mb-3">🌙</div>
              <h3 className="text-lg font-semibold mb-2">After-Hours Voicemail</h3>
              <p className="text-gray-300 text-sm">Capture messages when you're away</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 backdrop-blur-sm">
              <div className="text-2xl mb-3">🤖</div>
              <h3 className="text-lg font-semibold mb-2">AI-Powered</h3>
              <p className="text-gray-300 text-sm">Natural conversation handling</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Pricing</h2>
          <div className="bg-gradient-to-r from-blue-600/20 to-teal-600/20 border border-blue-500/30 rounded-2xl p-8 backdrop-blur-sm">
            <div className="text-5xl font-bold mb-2">$299<span className="text-2xl text-gray-300">/mo</span></div>
            <p className="text-xl text-gray-300 mb-4">Everything you need to help automate your front desk</p>
            <button className="bg-gradient-to-r from-blue-600 to-teal-600 text-white font-bold py-3 px-8 rounded-lg hover:from-blue-700 hover:to-teal-700 transition-all duration-200">
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="container mx-auto px-4 py-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center text-gray-400 space-y-3">
          <p className="text-sm">Demo-only notice, calls, texts, and form submissions may be processed to operate this demo. Do not submit patient information.</p>
          <p className="text-sm"><a className="underline" href="/privacy">Privacy Policy</a> · &copy; 2026 AI Receptionist. Built for dental and medical practices.</p>
        </div>
      </div>
    </div>
  )
}