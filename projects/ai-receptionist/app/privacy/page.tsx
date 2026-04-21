export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white px-6 py-16">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold">Privacy Policy</h1>
        <p className="text-gray-300">This demo may collect business contact details, call metadata, voicemail recordings, transcriptions, and form submissions to operate the service.</p>
        <p className="text-gray-300">Do not submit patient information or other sensitive personal data. For real deployment, data retention, access controls, encryption, and vendor agreements must be reviewed before use with healthcare customers.</p>
        <p className="text-gray-300">We may store opt-out requests to prevent future SMS messages. Reply STOP, UNSUBSCRIBE, END, CANCEL, or QUIT to opt out.</p>
      </div>
    </main>
  )
}
