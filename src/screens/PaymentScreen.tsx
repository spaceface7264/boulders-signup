'use client';
import { useGoogleFont } from '../utils/fonts'
import React, { useState } from "react"
import { useForm } from '../utils/FormContext'

// Copy-paste gymLocations from LocationSelection for lookup
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

export default function PaymentScreen() {
  const fontFamily = useGoogleFont('Inter')
  const { formData } = useForm()
  
  // Membership logic
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
  let plan = { name: 'Standard Membership', price: 445, period: 'per month' }
  if (age !== null && age < 16) {
    plan = { name: 'Junior Membership (<16 years)', price: 249, period: 'per month' }
  } else if (formData.personalInfo.student) {
    plan = { name: 'Student Membership', price: 379, period: 'per month' }
  }

  // Member info
  const memberName = `${formData.personalInfo.firstName} ${formData.personalInfo.lastName}`.trim()
  const memberEmail = formData.personalInfo.email
  const memberPhone = formData.personalInfo.phone

  // Gym name lookup
  const gym = gymLocations.find(g => String(g.id) === String(formData.location.gymId))
  const gymName = gym ? gym.name : ''

  // Total
  const total = plan.price

  // Payment methods
  const paymentMethods = [
    { id: 'credit-card', name: 'Credit Card', icon: 'credit-card' },
    { id: 'mobile-pay', name: 'MobilePay', icon: 'mobile' },
    { id: 'apple-pay', name: 'Apple Pay', icon: 'apple' },
    { id: 'google-pay', name: 'Google Pay', icon: 'google' }
  ]

  const [selectedMethod, setSelectedMethod] = useState('credit-card')
  const [loading, setLoading] = useState(false)

  const handlePaymentComplete = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      // Simulate redirect to payment gateway
      window.location.href = '/index.html?screen=ConfirmationScreen'
    }, 1500)
  }

  return (
    <div className="min-h-screen" style={{ fontFamily }}>
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Order Summary */}
          <div>
            <div className="bg-gray-900 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
              
              <div className="mb-6">
                <h3 className="text-white font-medium mb-1">{plan.name}</h3>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Price:</span>
                  <span className="text-white">{plan.price} kr</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Billing:</span>
                  <span className="text-white">{plan.period}</span>
                </div>
              </div>
              
              <div className="border-t border-gray-800 pt-4 mb-6">
                <h3 className="text-white font-medium mb-3">Member Information</h3>
                <p className="text-white mb-1">{memberName}</p>
                <p className="text-gray-400 text-sm mb-1">{memberEmail}</p>
                <p className="text-gray-400 text-sm">{memberPhone}</p>
              </div>
              
              <div className="border-t border-gray-800 pt-4 mb-6">
                <h3 className="text-white font-medium mb-1">Home Gym</h3>
                <p className="text-gray-400 text-sm">{gymName}</p>
              </div>
              
              <div className="border-t border-gray-800 pt-4 mb-6">
                <h3 className="text-white font-medium mb-3">Coupon Code</h3>
                <div className="flex">
                  <input
                    type="text"
                    className="flex-grow px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-md text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    placeholder="ENTER COUPON CODE"
                  />
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-r-md font-medium cursor-pointer hover:bg-purple-700 transition-colors">
                    Apply
                  </button>
                </div>
              </div>
              
              <div className="border-t border-gray-800 pt-4 mb-6">
                <div className="flex justify-between mb-1">
                  <span className="text-white font-medium">Total</span>
                  <span className="text-white font-medium">{total} kr</span>
                </div>
                <p className="text-gray-400 text-xs">Recurring per month</p>
              </div>
              
              <a 
                href="/index.html?screen=PersonalInformation"
                className="flex items-center text-purple-500 hover:text-purple-400 text-sm cursor-pointer mb-4"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
                Edit membership details
              </a>
            </div>
          </div>
          
          {/* Payment Details */}
          <div>
            <div className="bg-gray-900 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">Payment Details</h2>
              
              {/* Payment Method Selection */}
              <div className="mb-6">
                <h3 className="text-white font-medium mb-3">Payment Method</h3>
                <div className="grid grid-cols-2 gap-3">
                  {paymentMethods.map((method) => (
                    <div 
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`p-3 rounded-md text-center cursor-pointer transition-colors border-2 ${
                        selectedMethod === method.id 
                          ? 'bg-purple-600 text-white border-purple-500' 
                          : 'bg-gray-800 text-white hover:bg-gray-700 border-transparent'
                      }`}
                    >
                      <div className="flex items-center justify-center">
                        {method.icon === 'credit-card' && (
                          <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                          </svg>
                        )}
                        {method.icon === 'mobile' && (
                          <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                          </svg>
                        )}
                        {method.icon === 'apple' && (
                          <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z"></path>
                          </svg>
                        )}
                        {method.icon === 'google' && (
                          <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"></path>
                            <path fill="#34A853" d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.09c1.97 3.92 6.02 6.62 10.71 6.62z"></path>
                            <path fill="#FBBC05" d="M5.525 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29v-3.09h-3.98c-.8 1.61-1.26 3.43-1.26 5.38s.46 3.77 1.26 5.38l3.98-3.09z"></path>
                            <path fill="#EA4335" d="M12.255 5.04c1.77 0 3.35.61 4.6 1.8l3.42-3.42c-2.08-1.94-4.78-3.13-8.02-3.13-4.69 0-8.74 2.7-10.71 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"></path>
                          </svg>
                        )}
                        <span className="text-sm">{method.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Remove payment form, only show placeholder for non-credit card methods */}
              {selectedMethod !== 'credit-card' && (
                <div className="mb-6 text-center text-gray-400 py-8">
                  <span className="text-lg">{paymentMethods.find(m => m.id === selectedMethod)?.name} coming soon…</span>
                </div>
              )}
              {/* Terms and Conditions */}
              <div className="mb-6 text-sm text-gray-400">
                <p>
                  By clicking "Pay Now", you agree to our 
                  <a href="#" className="text-purple-500 hover:text-purple-400"> Terms and Conditions </a>
                  and authorize Boulders to charge your payment method for the amount shown. Your membership will automatically renew per month until canceled.
                </p>
              </div>
              {/* Pay Now Button */}
              <button 
                onClick={handlePaymentComplete}
                className="w-full py-3 px-6 bg-[#ff00ff] text-white rounded-xl font-semibold shadow-lg hover:bg-[#ff00ff]/90 focus:outline-none focus:ring-2 focus:ring-[#ff00ff] focus:ring-offset-2 transition-colors text-lg disabled:opacity-50 disabled:cursor-not-allowed mb-4 flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                  </svg>
                )}
                {loading ? 'Processing…' : 'Pay Now'}
              </button>
              
              {/* Security Notice */}
              <div className="flex items-center justify-center text-gray-500 text-xs">
                <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
                Secure payment processing
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}