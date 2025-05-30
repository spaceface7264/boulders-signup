'use client';
import { useGoogleFont } from '../utils/fonts'
import React, { useState } from "react"
import { useForm } from '../utils/FormContext'

const gymLocations = [
  { id: 1, name: 'Boulders Aarhus City' },
  { id: 2, name: 'Boulders Aarhus Nord' },
  { id: 3, name: 'Boulders Aarhus Syd' },
  { id: 4, name: 'Boulders Sydhavn' },
  { id: 5, name: 'Boulders Valby' },
  { id: 6, name: 'Boulders Hvidovre' },
  { id: 7, name: 'Boulders Amager' },
  { id: 8, name: 'Boulders Odense' },
  { id: 9, name: 'Boulders Vanløse' },
]

export default function ConfirmationScreen() {
  const fontFamily = useGoogleFont('Inter')
  const { formData } = useForm()
  const [copied, setCopied] = useState(false)
  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareText = `I just signed up for Boulders Membership! Join me: ${shareUrl}`

  // Membership logic (same as PaymentScreen)
  const getAge = (dob: string) => {
    if (!dob) return null
    const today = new Date()
    const birthDate = new Date(dob)
    let age = today.getFullYear() - birthDate.getFullYear()
    const m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }
  const age = getAge(formData.personalInfo.dob)
  let plan = { name: 'Standard Membership', price: 445 }
  if (age !== null && age < 16) {
    plan = { name: 'Junior Membership (<16 years)', price: 249 }
  } else if (formData.personalInfo.student) {
    plan = { name: 'Student Membership', price: 379 }
  }

  // Get correct member name (self or recipient)
  const memberName = formData.recipient && formData.recipient.firstName
    ? `${formData.recipient.firstName} ${formData.recipient.lastName}`.trim()
    : `${formData.personalInfo.firstName} ${formData.personalInfo.lastName}`.trim();

  const gym = gymLocations.find(g => String(g.id) === String(formData.location.gymId))
  const gymName = gym ? gym.name : ''

  // Generate a membership ID (BO-YYYY-XXXX format)
  const membershipId = `BO-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
  // Generate a punch card ID (PC-YYYY-XXXX format)
  const punchCardId = `PC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`

  // Detect purchase type
  const isMembership = formData.access?.type === 'membership' || !formData.access?.type;
  const isPunchCard = formData.access?.type === 'punchcard';

  // Punch card details from context
  const punchCard = {
    type: formData.access?.cardType || 'Standard',
    punches: formData.access?.punches || 10,
    price: formData.access?.price || 1200,
    validity: '5 years',
  };

  return (
    <div className="min-h-screen" style={{ fontFamily }}>
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-900/30 rounded-full mb-6">
            <svg className="h-10 w-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12l3 3 5-5" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome to Boulders</h1>
          <p className="text-lg text-gray-400 mb-6">
            {isMembership ? 'Your membership has been successfully activated.' : 'Your punch card purchase is complete!'}
          </p>
        </div>
        <div className="bg-gray-900 rounded-xl p-8 mb-8">
          <h2 className="text-xl font-bold text-white mb-6 text-center">
            {isMembership ? 'Membership Details' : 'Punch Card Details'}
          </h2>
          <div className="divide-y divide-gray-800">
            {isMembership ? (
              <>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-400 font-medium">Member</span>
                  <span className="text-white font-semibold">{memberName}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-400 font-medium">Membership ID</span>
                  <span className="text-white font-mono font-semibold">{membershipId}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-400 font-medium">Plan</span>
                  <span className="text-white font-semibold">{plan.name}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-400 font-medium">Home Gym</span>
                  <span className="text-white font-semibold">{gymName}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-400 font-medium">Monthly fee</span>
                  <span className="text-white font-semibold">{plan.price} kr</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-400 font-medium">Name</span>
                  <span className="text-white font-semibold">{memberName}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-400 font-medium">Punch Card ID</span>
                  <span className="text-white font-mono font-semibold">{punchCardId}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-400 font-medium">Type</span>
                  <span className="text-white font-semibold">{punchCard.type} ({punchCard.punches} punches)</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-400 font-medium">Price</span>
                  <span className="text-white font-semibold">{punchCard.price} kr</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-400 font-medium">Validity</span>
                  <span className="text-white font-semibold">{punchCard.validity}</span>
                </div>
              </>
            )}
          </div>
        </div>
        {/* Next Steps */}
        <div className="bg-gray-900 rounded-xl p-8 mb-8">
          <h2 className="text-xl font-bold text-white mb-6 text-center">Next Steps</h2>
          {isMembership ? (
            <ul className="text-gray-300 text-base space-y-3">
              <li>Download the Boulders app for digital access and member benefits:</li>
              <li className="flex gap-4 justify-center mt-2">
                <a href="#" className="inline-block">
                  <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" className="h-10" />
                </a>
                <a href="#" className="inline-block">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-10" />
                </a>
              </li>
              <li>Pick up your access card at your home gym ({gymName}).</li>
              <li>You'll receive a confirmation email with your member ID and instructions.</li>
              <li>Start climbing and enjoy your new membership!</li>
            </ul>
          ) : (
            <ul className="text-gray-300 text-base space-y-3">
              <li>Your punch card is now active and ready to use.</li>
              <li>Show your digital punch card at the gym front desk.</li>
              <li>Check your remaining punches in the Boulders app.</li>
              <li>You'll receive a confirmation email with your punch card details.</li>
              <li>Enjoy your climbs!</li>
            </ul>
          )}
        </div>
        {/* Invite Friends */}
        <div className="bg-gray-900 rounded-xl p-8 mb-8">
          <h2 className="text-xl font-bold text-white mb-6 text-center">Invite your friends</h2>
          <div className="flex flex-col md:flex-row gap-4 justify-center mb-4">
            <button
              onClick={async () => {
                await navigator.clipboard.writeText(shareUrl)
                setCopied(true)
                setTimeout(() => setCopied(false), 1500)
              }}
              className="flex items-center gap-2 px-5 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold shadow transition-colors"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16h8M8 12h8m-7 8h6a2 2 0 002-2V6a2 2 0 00-2-2H9a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
            <a
              href={`mailto:?subject=Boulders ${isMembership ? 'Membership' : 'Punch Card'}&body=${encodeURIComponent(shareText)}`}
              className="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow transition-colors"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12H8m8 0a4 4 0 01-8 0m8 0a4 4 0 00-8 0m8 0V8a4 4 0 00-8 0v4m8 0v4a4 4 0 01-8 0v-4" /></svg>
              Email
            </a>
            <a
              href="https://wa.me/?text=I%20just%20joined%20Boulders!%20Join%20me%20at%20https://boulders.dk"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold shadow transition-colors"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A12.07 12.07 0 0012 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.22-1.63A12.07 12.07 0 0012 24c6.63 0 12-5.37 12-12 0-3.21-1.25-6.23-3.48-8.52zM12 22c-1.85 0-3.68-.5-5.25-1.45l-.38-.23-3.69.97.99-3.59-.25-.37A9.94 9.94 0 012 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.2-7.8c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.48-.84-2.03-.22-.53-.45-.46-.62-.47-.16-.01-.36-.01-.56-.01-.19 0-.5.07-.76.34-.26.27-1 1-1 2.44s1.02 2.83 1.16 3.03c.14.2 2.01 3.08 4.88 4.2.68.29 1.21.46 1.62.59.68.22 1.3.19 1.79.12.55-.08 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z"/></svg>
              WhatsApp
            </a>
          </div>
          <p className="text-center text-gray-400 text-base max-w-xl mx-auto mt-4">
            {isMembership
              ? "Invite your friends to join Boulders and climb together!"
              : "Share your punch card experience with friends!"}
          </p>
        </div>
        {/* Get Connected */}
        <div className="bg-gray-900 rounded-xl p-8 mb-8">
          <h2 className="text-xl font-bold text-white mb-6 text-center">Get Connected</h2>
          <div className="flex flex-col md:flex-row gap-4 justify-center mb-4">
            <a
              href="https://www.facebook.com/boulders.dk"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 bg-blue-800 hover:bg-blue-900 text-white rounded-lg font-semibold shadow transition-colors"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24H12.82v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
              Facebook
            </a>
            <a
              href="https://www.instagram.com/boulders.dk/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-semibold shadow transition-colors"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.241-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.775.131 4.602.425 3.635 1.392 2.668 2.359 2.374 3.532 2.315 4.809 2.256 6.089 2.243 6.498 2.243 12c0 5.502.013 5.911.072 7.191.059 1.277.353 2.45 1.32 3.417.967.967 2.14 1.261 3.417 1.32C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.277-.059 2.45-.353 3.417-1.32.967-.967 1.261-2.14 1.32-3.417.059-1.28.072-1.689.072-7.191 0-5.502-.013-5.911-.072-7.191-.059-1.277-.353-2.45-.353-3.417C19.398.425 18.225.131 16.948.072 15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 11-2.881 0 1.44 1.44 0 012.881 0z"/></svg>
              Instagram
            </a>
            <a
              href="https://www.tiktok.com/@boulders.dk"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 bg-black hover:bg-gray-800 text-white rounded-lg font-semibold shadow transition-colors"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.75 2v12.75a2.25 2.25 0 11-2.25-2.25c.414 0 .75.336.75.75s-.336.75-.75.75a.75.75 0 100 1.5 3.75 3.75 0 003.75-3.75V2h-1.5zm6.75 0v6.75a6.75 6.75 0 01-6.75 6.75 6.75 6.75 0 01-6.75-6.75V2h1.5v6.75a5.25 5.25 0 005.25 5.25 5.25 5.25 0 005.25-5.25V2h1.5z"/></svg>
              TikTok
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}