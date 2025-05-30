'use client';
import { useGoogleFont } from '../utils/fonts'
import React, { useState, useEffect } from "react"
import Components from "../components"
import { useForm } from '../utils/FormContext'
import ProgressSteps from '../components/ProgressSteps'

export default function PersonalInformation() {
  const fontFamily = useGoogleFont('Inter')
  const { formData, updateFormData, errors, validateStep, currentStep } = useForm()
  const [showPassword, setShowPassword] = useState(false)
  const [forSelf, setForSelf] = useState(true);
  const [existingEmail, setExistingEmail] = useState(false);
  // Helper to get the relevant DOB for age check
  const relevantDob = forSelf ? formData.personalInfo.dob : formData.recipient?.dob;
  const getAge = (dob: string) => {
    if (!dob) return 0;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
  const showGuardian = relevantDob && getAge(relevantDob) < 18;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const emailParam = params.get('email')
    if (emailParam && !formData.personalInfo.email) {
      updateFormData('personalInfo', { email: emailParam })
    }
  }, [])

  // Add email recognition effect
  useEffect(() => {
    const recognizedEmails = ['rami@boulders.dk', 'aarhus@boulders.dk']
    if (formData.personalInfo.email && recognizedEmails.includes(formData.personalInfo.email)) {
      setExistingEmail(true)
    } else {
      setExistingEmail(false)
    }
  }, [formData.personalInfo.email])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (existingEmail) {
      // Redirect to profile page for existing users
      window.location.href = '/index.html?screen=Profile'
      return
    }
    if (validateStep(currentStep)) {
      // Automatically determine membership plan based on age and student status
      const dob = formData.personalInfo.dob
      const isStudent = formData.personalInfo.student

      const age = getAge(dob)
      let autoPlan = 'Standard'

      if (typeof age === 'number' && age < 16) {
        autoPlan = 'Junior'
      } else if (isStudent) {
        autoPlan = 'Student'
      }

      updateFormData('membership', { plan: autoPlan })

      // Skip MembershipSelection and go to Access step
      window.location.href = '/index.html?screen=MembershipSelection'
    }
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phone = e.target.value
    updateFormData('personalInfo', {
      phone: (formData.personalInfo.countryCode || '+45') + phone,
      rawPhone: phone,
      countryCode: formData.personalInfo.countryCode || '+45'
    })
  }

  const handleCountryCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCode = e.target.value
    updateFormData('personalInfo', {
      countryCode: newCode,
      phone: newCode + (formData.personalInfo.rawPhone || '')
    })
  }

  return (
    <div className="min-h-screen text-gray-200 flex flex-col items-center" style={{ fontFamily }}>
      <div className="w-full flex flex-col items-center mt-0">
        <div className="bg-gray-800 rounded-xl p-8 max-w-2xl w-full shadow-lg flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-2 text-center">Personal Information</h1>
          <p className="text-gray-400 text-center mb-8">Please fill in your details to get started.</p>
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
            {/* Who is this for? */}
            <div className="flex gap-6 mb-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={forSelf}
                  onChange={() => setForSelf(true)}
                  className="accent-[#ff00ff]"
                />
                Myself
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={!forSelf}
                  onChange={() => setForSelf(false)}
                  className="accent-[#ff00ff]"
                />
                Someone else
              </label>
            </div>
            {/* Explanation for 'Someone else' */}
            {!forSelf && (
              <div className="mb-4 bg-[#2a002a]/60 border border-[#ff00ff] rounded-lg p-4 text-sm text-pink-200">
                <strong>When to use this:</strong> Select <span className="text-[#ff00ff] font-semibold">Someone else</span> if you are signing up on behalf of another person, such as your child. You will need to enter their details below. The membership will be created in their name, not yours.
              </div>
            )}
            {/* Recipient fields if not for self */}
            {!forSelf && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-900 rounded-lg p-4 mb-2">
                <div>
                  <label className="block text-sm font-medium mb-2">Recipient First Name</label>
                  <input
                    type="text"
                    value={formData.recipient?.firstName || ''}
                    onChange={e => updateFormData('recipient', { ...formData.recipient, firstName: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-[#ff00ff]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Recipient Last Name</label>
                  <input
                    type="text"
                    value={formData.recipient?.lastName || ''}
                    onChange={e => updateFormData('recipient', { ...formData.recipient, lastName: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-[#ff00ff]"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Recipient Email</label>
                  <input
                    type="email"
                    value={formData.recipient?.email || ''}
                    onChange={e => updateFormData('recipient', { ...formData.recipient, email: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-[#ff00ff]"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Recipient Date of Birth</label>
                  <input
                    type="date"
                    value={formData.recipient?.dob || ''}
                    onChange={e => updateFormData('recipient', { ...formData.recipient, dob: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-[#ff00ff]"
                  />
                </div>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium mb-2">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  value={formData.personalInfo.firstName}
                  onChange={(e) => updateFormData('personalInfo', { firstName: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg bg-gray-800 border ${errors.firstName ? 'border-red-500' : 'border-gray-700'} focus:outline-none focus:border-[#ff00ff]`}
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
                )}
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium mb-2">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  value={formData.personalInfo.lastName}
                  onChange={(e) => updateFormData('personalInfo', { lastName: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg bg-gray-800 border ${errors.lastName ? 'border-red-500' : 'border-gray-700'} focus:outline-none focus:border-[#ff00ff]`}
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.personalInfo.email}
                  onChange={(e) => updateFormData('personalInfo', { email: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg bg-gray-800 border ${errors.email ? 'border-red-500' : 'border-gray-700'} focus:outline-none focus:border-[#ff00ff]`}
                  readOnly={!!formData.personalInfo.email}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
                {existingEmail && (
                  <div className="mt-2 bg-[#2a002a]/60 border border-[#ff00ff] rounded-lg p-4 text-sm text-pink-200">
                    <p className="mb-2">This email is already registered with Boulders.</p>
                    <button
                      type="button"
                      onClick={() => window.location.href = '/index.html?screen=Profile'}
                      className="px-4 py-2 bg-[#ff00ff] text-white rounded-lg hover:bg-[#ff00ff]/90 transition-colors"
                    >
                      Continue to Profile
                    </button>
                  </div>
                )}
              </div>
              <div className="md:col-span-2">
                <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone Number</label>
                <div className="flex gap-2">
                  <select
                    id="countryCode"
                    value={formData.personalInfo.countryCode || '+45'}
                    onChange={handleCountryCodeChange}
                    className="px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-[#ff00ff] w-28"
                  >
                    <option value="+45">+45 (DK)</option>
                    <option value="+46">+46 (SE)</option>
                    <option value="+47">+47 (NO)</option>
                    <option value="+49">+49 (DE)</option>
                    <option value="+44">+44 (UK)</option>
                  </select>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.personalInfo.rawPhone || ''}
                    onChange={handlePhoneChange}
                    className={`flex-1 px-4 py-2 rounded-lg bg-gray-800 border ${errors.phone ? 'border-red-500' : 'border-gray-700'} focus:outline-none focus:border-[#ff00ff]`}
                    placeholder="Enter phone number"
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium mb-2">Street Address</label>
                <input
                  type="text"
                  id="address"
                  value={formData.personalInfo.address}
                  onChange={(e) => updateFormData('personalInfo', { address: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg bg-gray-800 border ${errors.address ? 'border-red-500' : 'border-gray-700'} focus:outline-none focus:border-[#ff00ff]`}
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-500">{errors.address}</p>
                )}
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium mb-2">City</label>
                <input
                  type="text"
                  id="city"
                  value={formData.personalInfo.city}
                  onChange={(e) => updateFormData('personalInfo', { city: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg bg-gray-800 border ${errors.city ? 'border-red-500' : 'border-gray-700'} focus:outline-none focus:border-[#ff00ff]`}
                />
                {errors.city && (
                  <p className="mt-1 text-sm text-red-500">{errors.city}</p>
                )}
              </div>
              <div>
                <label htmlFor="zipCode" className="block text-sm font-medium mb-2">ZIP / Postal Code</label>
                <input
                  type="text"
                  id="zipCode"
                  value={formData.personalInfo.zipCode}
                  onChange={(e) => updateFormData('personalInfo', { zipCode: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg bg-gray-800 border ${errors.zipCode ? 'border-red-500' : 'border-gray-700'} focus:outline-none focus:border-[#ff00ff]`}
                />
                {errors.zipCode && (
                  <p className="mt-1 text-sm text-red-500">{errors.zipCode}</p>
                )}
              </div>

              {forSelf && (
                <div className="md:col-span-2">
                  <label htmlFor="dob" className="block text-sm font-medium mb-2">Date of Birth</label>
                  <input
                    type="date"
                    id="dob"
                    value={formData.personalInfo.dob}
                    onChange={(e) => updateFormData('personalInfo', { dob: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg bg-gray-800 border ${errors.dob ? 'border-red-500' : 'border-gray-700'} focus:outline-none focus:border-[#ff00ff]`}
                  />
                  {errors.dob && (
                    <p className="mt-1 text-sm text-red-500">{errors.dob}</p>
                  )}
                </div>
              )}

              {/* Gender field */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Gender</label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={formData.personalInfo.gender === 'male'}
                      onChange={() => updateFormData('personalInfo', { gender: 'male' })}
                      className="accent-[#ff00ff]"
                      required
                    />
                    Male
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={formData.personalInfo.gender === 'female'}
                      onChange={() => updateFormData('personalInfo', { gender: 'female' })}
                      className="accent-[#ff00ff]"
                      required
                    />
                    Female
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="gender"
                      value="prefer_not_to_answer"
                      checked={formData.personalInfo.gender === 'prefer_not_to_answer'}
                      onChange={() => updateFormData('personalInfo', { gender: 'prefer_not_to_answer' })}
                      className="accent-[#ff00ff]"
                      required
                    />
                    Prefer not to answer
                  </label>
                </div>
                {errors.gender && (
                  <p className="mt-1 text-sm text-red-500">{errors.gender}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={formData.personalInfo.password || ''}
                    onChange={e => updateFormData('personalInfo', { password: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-[#ff00ff] pr-12"
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(v => !v)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    tabIndex={-1}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.personalInfo.emailNotifications || false}
                  onChange={e => updateFormData('personalInfo', { emailNotifications: e.target.checked })}
                  className="mr-2 accent-[#ff00ff]"
                />
                
                <span className="text-sm flex items-center gap-1">E-mail notifications
                  <span className="relative group">
                    <span className="ml-1 cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#ff00ff] inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" /></svg>
                    </span>
                    <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 bg-gray-800 text-xs text-gray-100 rounded px-2 py-1 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10">Receive important updates and offers via e-mail.</span>
                  </span>
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.personalInfo.pushNotifications || false}
                  onChange={e => updateFormData('personalInfo', { pushNotifications: e.target.checked })}
                  className="mr-2 accent-[#ff00ff]"
                />
                <span className="text-sm flex items-center gap-1">Push notifications
                  <span className="relative group">
                    <span className="ml-1 cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#ff00ff] inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" /></svg>
                    </span>
                    <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 bg-gray-800 text-xs text-gray-100 rounded px-2 py-1 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10">Get instant alerts and reminders on your device.</span>
                  </span>
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.personalInfo.acceptTnC || false}
                  onChange={e => updateFormData('personalInfo', { acceptTnC: e.target.checked })}
                  className="mr-2 accent-[#ff00ff]"
                  required
                />
                <span className="text-sm">I accept the
                  <a
                    href="/terms-and-conditions" target="_blank" rel="noopener noreferrer"
                    className="ml-1 underline text-[#ff00ff] hover:text-[#d600d6] transition-colors"
                  >
                    Terms & Conditions
                  </a>
                </span>
              </label>
            </div>

            {/* Guardian info if under 18 */}
            {showGuardian && (
              <div className="bg-gray-900 rounded-lg p-4 mt-2">
                <h3 className="text-lg font-semibold mb-2 text-[#ff00ff]">Guardian Information (required for under 18)</h3>
                <div className="mb-2">
                  <label className="block text-sm mb-1">Guardian's Full Name</label>
                  <input
                    type="text"
                    value={formData.guardian?.name || ''}
                    onChange={e => updateFormData('guardian', { ...formData.guardian, name: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm mb-1">Guardian's Email</label>
                  <input
                    type="email"
                    value={formData.guardian?.email || ''}
                    onChange={e => updateFormData('guardian', { ...formData.guardian, email: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm mb-1">Guardian's Phone</label>
                  <input
                    type="tel"
                    value={formData.guardian?.phone || ''}
                    onChange={e => updateFormData('guardian', { ...formData.guardian, phone: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Relationship</label>
                  <input
                    type="text"
                    value={formData.guardian?.relationship || ''}
                    onChange={e => updateFormData('guardian', { ...formData.guardian, relationship: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
                    placeholder="Parent, Guardian, etc."
                    required
                  />
                </div>
              </div>
            )}

            <div className="flex w-full items-center gap-4 mt-8">
              <a
                href="/index.html?screen=EmailEntry"
                className="min-w-[120px] px-6 py-3 bg-gray-800 text-white rounded-xl font-semibold cursor-pointer transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#ff00ff] focus:ring-offset-2 text-base text-center"
              >
                Back
              </a>
              <button
                type="submit"
                className="flex-1 py-3 px-6 bg-[#ff00ff] text-white rounded-xl font-semibold shadow-lg hover:bg-[#ff00ff]/90 focus:outline-none focus:ring-2 focus:ring-[#ff00ff] focus:ring-offset-2 transition-colors text-base disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={Object.keys(errors).length > 0}
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}