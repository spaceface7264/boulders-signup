'use client';
import { useGoogleFont } from '../utils/fonts'
import React, { useState } from "react"
import Components from "../components"
import { useForm } from '../utils/FormContext'

export default function LocationSelection() {
  const fontFamily = useGoogleFont('Inter')
  const { updateFormData } = useForm()
  
  // Boulders gym location data
  const gymLocations = [
    {
      id: 1,
      name: 'Boulders Aarhus City',
      address: 'Ankersgade 12C, 8000 Aarhus C',
      openingHours: '08:00 - 23:00',
      mapLink: 'https://maps.google.com/?q=Ankersgade+12C,+8000+Aarhus+C'
    },
    {
      id: 2,
      name: 'Boulders Aarhus Nord',
      address: 'Graham Bells Vej 18A, 8200 Aarhus N',
      openingHours: '10:00 - 22:00',
      mapLink: 'https://maps.google.com/?q=Graham+Bells+Vej+18A,+8200+Aarhus+N'
    },
    {
      id: 3,
      name: 'Boulders Aarhus Syd',
      address: 'Søren Nymarks Vej 6A, 8270 Højbjerg',
      openingHours: '10:00 - 22:00',
      mapLink: 'https://maps.google.com/?q=Søren+Nymarks+Vej+6A,+8270+Højbjerg'
    },
    {
      id: 4,
      name: 'Boulders Sydhavn',
      address: 'Bådehavnsgade 38, 2450 København',
      openingHours: '08:00 - 23:00',
      mapLink: 'https://maps.google.com/?q=Bådehavnsgade+38,+2450+København'
    },
    {
      id: 5,
      name: 'Boulders Valby',
      address: 'Pakkerivej 27, 2500 Valby',
      openingHours: '09:00 - 22:00',
      mapLink: 'https://maps.google.com/?q=Pakkerivej+27,+2500+Valby'
    },
    {
      id: 6,
      name: 'Boulders Hvidovre',
      address: 'Strandmarksvej 20, 2650 Hvidovre',
      openingHours: '10:00 - 22:00',
      mapLink: 'https://maps.google.com/?q=Strandmarksvej+20,+2650+Hvidovre'
    },
    {
      id: 7,
      name: 'Boulders Amager',
      address: 'Amager Landevej 233, 2770 Kastrup',
      openingHours: '10:00 - 22:00',
      mapLink: 'https://maps.google.com/?q=Amager+Landevej+233,+2770+Kastrup'
    },
    {
      id: 8,
      name: 'Boulders Odense',
      address: 'Wichmandsgade 11, 5000 Odense C',
      openingHours: '10:00 - 22:00',
      mapLink: 'https://maps.google.com/?q=Wichmandsgade+11,+5000+Odense+C'
    },
    {
      id: 9,
      name: 'Boulders Vanløse',
      address: 'Vanløse Torv 1, Krone 2720 Vanløse',
      openingHours: '08:00 - 23:00',
      mapLink: 'https://maps.google.com/?q=Vanløse+Torv+1,+2720+Vanløse'
    }
  ]

  const [selectedGym, setSelectedGym] = useState<number | null>(null)
  const [error, setError] = useState<string>('')

  const handleContinue = () => {
    if (selectedGym) {
      updateFormData('location', { gymId: String(selectedGym) })
      window.location.href = '/index.html?screen=PaymentScreen'
    } else {
      setError('Please select a gym to continue.')
    }
  }

  return (
    <div className="min-h-screen" style={{ fontFamily }}>
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        {/* Progress Steps removed, now handled globally */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-2 text-center">Select Your Home Gym</h2>
          <p className="text-gray-400 text-center mb-8">This is the gym you plan on using most often, and the gym where you pick up your card. After you've picked up your card, you'll have access to all gyms with your access card.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gymLocations.map((location) => {
              const isSelected = selectedGym === location.id;
              return (
                <div 
                  key={location.id} 
                  className={`bg-gray-800 rounded-lg p-5 transition-colors cursor-pointer border-2 ${
                    isSelected ? 'border-[#ff00ff] bg-gray-900' : 'border-transparent hover:bg-gray-750'
                  }`}
                  onClick={() => {
                    setSelectedGym(location.id);
                    setError('');
                  }}
                >
                  <h3 className="text-xl font-semibold text-white mb-2">{location.name}</h3>
                  <p className="text-gray-400 text-sm mb-2">{location.address}</p>
                  <p className="text-gray-500 text-xs mb-4">{location.openingHours}</p>
                  <a 
                    href={location.mapLink} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-purple-500 hover:text-purple-400 text-sm cursor-pointer"
                    onClick={e => e.stopPropagation()}
                  >
                    <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    View on map
                  </a>
                </div>
              )
            })}
          </div>
        </div>
        {/* Error Message */}
        {error && (
          <div className="max-w-2xl mx-auto mt-6 mb-2 w-full">
            <div className="bg-red-700/80 text-white text-center rounded-lg py-2 px-4 text-base font-medium animate-fadeIn" role="alert" aria-live="assertive">
              {error}
            </div>
          </div>
        )}
        {/* Navigation Buttons */}
        <div className="flex w-full items-center gap-4 mt-8 max-w-2xl mx-auto">
          <a 
            href="/index.html?screen=MembershipSelection"
            className="min-w-[120px] px-6 py-3 bg-gray-800 text-white rounded-xl font-semibold cursor-pointer transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#ff00ff] focus:ring-offset-2 text-base text-center"
          >
            Back
          </a>
          <button
            type="button"
            onClick={handleContinue}
            className="flex-1 py-3 px-6 bg-[#ff00ff] text-white rounded-xl font-semibold shadow-lg hover:bg-[#ff00ff]/90 focus:outline-none focus:ring-2 focus:ring-[#ff00ff] focus:ring-offset-2 transition-colors text-base disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!selectedGym}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}