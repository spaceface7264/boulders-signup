'use client';
import { useGoogleFont } from '../utils/fonts'
import React, { useState, useEffect, useRef } from "react"
import Components from "../components"
import { useForm } from '../utils/FormContext'

export default function AccessSelection() {
  const fontFamily = useGoogleFont('Inter')
  const { formData, updateFormData } = useForm()
  const [selected, setSelected] = useState((formData as any).access?.type || '')
  const [animating, setAnimating] = useState(false)
  const cardsRef = useRef<HTMLDivElement>(null)

  // Example prices (replace with real values if needed)
  const membershipPrice = 445
  const punchcardPrice = 599

  // Example punch card options
  const punchCardOptions = [
    { cardType: 'Standard', punches: 10, price: 1200 },
    { cardType: 'Junior', punches: 10, price: 800 },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Don't deselect if clicking the continue button
      if (target.closest('button[type="button"]')) return;
      
      if (cardsRef.current && !cardsRef.current.contains(target)) {
        setSelected('')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSelect = (type: 'membership' | 'punchcard', cardDetails?: any) => {
    setAnimating(true)
    setSelected(type)
    if (type === 'punchcard' && cardDetails) {
      updateFormData('access', { type, ...cardDetails })
    } else if (type === 'membership') {
      updateFormData('access', { type })
    }
    setTimeout(() => {
      setAnimating(false)
    }, 200)
  }

  const handleContinue = () => {
    if (selected) {
      updateFormData('access' as any, { type: selected } as any)
      window.location.href = '/index.html?screen=LocationSelection'
    }
  }

  return (
    <div className="min-h-screen text-gray-200" style={{ fontFamily }}>
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-6 text-center">How do you want to access Boulders?</h1>
          <p className="text-gray-400 text-center mb-8">Choose membership if you plan to climb more than once a week.
          </p>
          <div ref={cardsRef} className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch justify-center mt-4">
            {/* Membership Card (first) */}
            <button
              type="button"
              onClick={() => handleSelect('membership')}
              className={`transition-all duration-200 w-full max-w-xl rounded-3xl p-7 flex flex-col items-start border-2 shadow-lg bg-white/10 backdrop-blur-md border-white/20 hover:border-[#ff00ff]/40 focus:outline-none relative group
                ${selected === 'membership' ? 'border-[#ff00ff] shadow-[0_0_20px_2px_rgba(255,0,255,0.15)] bg-white/15' : ''}`}
              style={{ 
                opacity: animating && selected !== 'membership' ? 0.7 : 1, 
                transform: selected === 'membership' ? 'scale(1.05)' : selected === 'punchcard' ? 'scale(0.95)' : 'scale(1)',
                transition: 'all 0.2s ease-out'
              }}
            >
              {/* Hierarchy: Title, Label, Price, Separator, KPIs */}
              <div className="text-2xl font-extrabold text-white mb-1 tracking-tight">Membership</div>
              <div className="text-xs text-gray-400 mb-2 tracking-wider uppercase font-medium">Monthly</div>
              <div className="text-5xl font-black text-white mb-4 tracking-tight">445 kr</div>
              <div className="text-sm text-gray-400 mb-1 space-y-0.5">
                <span className="block">Student: <span className="text-white font-medium">379 kr</span></span>
                <span className="block">Junior: <span className="text-white font-medium">249 kr</span></span>
              </div>
              <p className="text-xs text-gray-400 italic mt-1"></p>
              <div className="w-full my-4 border-t border-gray-600/40"></div>
              <ul className="text-base text-gray-200 mb-4 list-none w-full space-y-2.5">
              <li className="flex items-center"><svg className="h-5 w-5 mr-2 text-[#ff00ff] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>Unlimited access</li>
              <li className="flex items-center"><svg className="h-5 w-5 mr-2 text-[#ff00ff] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>Bloc Life Loyalty Program</li>
              <li className="flex items-center"><svg className="h-5 w-5 mr-2 text-[#ff00ff] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>2 x Guest passes</li>
              <li className="flex items-center"><svg className="h-5 w-5 mr-2 text-[#ff00ff] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>Full-time access</li>
              <li className="flex items-center"><svg className="h-5 w-5 mr-2 text-[#ff00ff] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>Webshop and Café Discounts</li>
              </ul>
              <div className="text-xs text-gray-300 mt-6 italic">No signup or cancellation fees.</div>
              <div className="text-xs text-gray-300 mt-1 italic">Price is calculated automatically.</div>
            </button>
            {/* Punch Card (second) */}
            {punchCardOptions.map((option) => (
              <button
                key={option.cardType}
                type="button"
                onClick={() => handleSelect('punchcard', option)}
                className={`transition-all duration-200 w-full max-w-xl rounded-3xl p-7 flex flex-col items-start border-2 shadow-lg bg-white/10 backdrop-blur-md border-white/20 hover:border-[#ff00ff]/40 focus:outline-none relative group
                  ${selected === 'punchcard' && formData.access?.cardType === option.cardType ? 'border-[#ff00ff] shadow-[0_0_20px_2px_rgba(255,0,255,0.15)] bg-white/15' : ''}`}
                style={{ 
                  opacity: animating && selected !== 'punchcard' ? 0.7 : 1, 
                  transform: selected === 'punchcard' && formData.access?.cardType === option.cardType ? 'scale(1.05)' : selected === 'membership' ? 'scale(0.95)' : 'scale(1)',
                  transition: 'all 0.2s ease-out'
                }}
              >
                <div className="text-2xl font-extrabold text-white mb-1 tracking-tight">Punch Card</div>
                <div className="text-xs text-gray-400 mb-4 tracking-wider uppercase font-medium">Single Payment</div>
                <div className="text-5xl font-black text-white mb-4 tracking-tight">{option.price} kr</div>
                <div className="text-sm text-gray-400 mb-1 space-y-0.5">
                  <span className="block">{option.cardType === 'Junior' ? 'Junior' : 'Standard'}: <span className="text-white font-medium">{option.price} kr</span></span>
                </div>
                <p className="text-xs text-gray-400 italic mt-1">Save 100 kr on refill.</p>
                <div className="w-full my-4 border-t border-gray-600/40"></div>
                <ul className="text-base text-gray-200 mb-4 list-none w-full space-y-2.5">
                  <li className="flex items-center"><svg className="h-5 w-5 mr-2 text-[#ff00ff] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>Shareable</li>
                  <li className="flex items-center"><svg className="h-5 w-5 mr-2 text-[#ff00ff] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>Access to all gyms</li>
                  <li className="flex items-center"><svg className="h-5 w-5 mr-2 text-[#ff00ff] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>Peak and Off-Peak</li>
                  <li className="flex items-center"><svg className="h-5 w-5 mr-2 text-[#ff00ff] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>Valid for 5 years</li>
                </ul>
                <div className="text-xs text-gray-300 mt-6 italic">Can be converted to membership anytime.</div>
              </button>
            ))}
          </div>
          {/* Continue Button */}
          <div className="flex w-full items-center gap-4 max-w-xl mx-auto mt-10 mb-2">
            <a
              href="/index.html?screen=PersonalInformation"
              className="min-w-[120px] px-6 py-3 bg-gray-800 text-white rounded-xl font-semibold cursor-pointer transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#ff00ff] focus:ring-offset-2 text-base text-center"
            >
              Back
            </a>
            <button
              type="button"
              onClick={handleContinue}
              className="flex-1 py-3 px-6 bg-[#ff00ff] text-white rounded-xl font-semibold shadow-lg hover:bg-[#ff00ff]/90 focus:outline-none focus:ring-2 focus:ring-[#ff00ff] focus:ring-offset-2 transition-colors text-base disabled:opacity-50 disabled:cursor-not-allowed animate-fadeIn"
              disabled={!selected}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s;
        }
      `}</style>
    </div>
  )
}