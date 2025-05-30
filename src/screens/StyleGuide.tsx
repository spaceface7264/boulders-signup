// This file is for developer reference. It reflects live components used in production.
import React from 'react';
import BouldersHeader from '../components/BouldersHeader';
import ProgressSteps from '../components/ProgressSteps';
// TODO: Extract Button, Input, Card, Tab, Modal components from screens if not already reusable

export default function StyleGuide() {
  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">UI Style Guide</h1>
        <p className="text-gray-400 mb-8">This page showcases all core UI components and patterns used in the app. Edit components in <code>src/components/</code> or extract from screens to keep this up to date.</p>

        {/* Typography */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 border-b border-gray-800 pb-2">Typography</h2>
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">Heading 1</h1>
            <h2 className="text-3xl font-bold">Heading 2</h2>
            <h3 className="text-2xl font-bold">Heading 3</h3>
            <p className="text-base">Body text example. <span className="text-[#ff00ff]">Accent color</span>.</p>
            <p className="text-gray-400">Secondary text</p>
            <p className="font-mono">Monospace for IDs or codes</p>
          </div>
        </section>

        {/* Buttons */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 border-b border-gray-800 pb-2">Buttons</h2>
          {/* TODO: Extract and import real Button component */}
          <div className="flex gap-4 flex-wrap">
            <button className="px-6 py-3 bg-[#ff00ff] text-white rounded-lg font-semibold shadow hover:bg-[#ff00ff]/90">Primary</button>
            <button className="px-6 py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600">Secondary</button>
            <button className="px-6 py-3 bg-gray-700 text-gray-400 rounded-lg font-semibold opacity-50 cursor-not-allowed" disabled>Disabled</button>
          </div>
        </section>

        {/* Inputs */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 border-b border-gray-800 pb-2">Inputs</h2>
          {/* TODO: Extract and import real Input component */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white" placeholder="Text input" />
            <select className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white">
              <option>Option 1</option>
              <option>Option 2</option>
            </select>
            <input type="checkbox" className="accent-[#ff00ff]" /> <span>Checkbox</span>
            <input type="radio" className="accent-[#ff00ff]" /> <span>Radio</span>
          </div>
        </section>

        {/* Tabs */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 border-b border-gray-800 pb-2">Tabs</h2>
          {/* TODO: Extract and import real Tabs component from ProfilePage */}
          <div className="flex gap-2 border-b border-gray-700">
            <button className="py-2 px-4 border-b-2 border-[#ff00ff] text-[#ff00ff] font-semibold">Active Tab</button>
            <button className="py-2 px-4 text-gray-400 font-semibold">Inactive Tab</button>
          </div>
        </section>

        {/* Membership Cards */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 border-b border-gray-800 pb-2">Membership Cards</h2>
          {/* TODO: Extract and import MembershipCard component from MembershipSelection */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="bg-white/10 rounded-3xl p-7 border-2 border-white/20 w-full max-w-xs">
              <div className="text-2xl font-extrabold text-white mb-1">Membership</div>
              <div className="text-xs text-gray-400 mb-2 uppercase font-medium">Monthly</div>
              <div className="text-5xl font-black text-white mb-4">445 kr</div>
              <ul className="text-base text-gray-200 mb-4 space-y-2.5">
                <li>Unlimited access</li>
                <li>Bloc Life Loyalty Program</li>
                <li>2 x Guest passes</li>
              </ul>
            </div>
            <div className="bg-white/10 rounded-3xl p-7 border-2 border-white/20 w-full max-w-xs">
              <div className="text-2xl font-extrabold text-white mb-1">Punch Card</div>
              <div className="text-xs text-gray-400 mb-2 uppercase font-medium">Single Payment</div>
              <div className="text-5xl font-black text-white mb-4">1200 kr</div>
              <ul className="text-base text-gray-200 mb-4 space-y-2.5">
                <li>10 punches</li>
                <li>Shareable</li>
                <li>Valid for 5 years</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Modals/Confirmations */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 border-b border-gray-800 pb-2">Modals / Confirmations</h2>
          {/* TODO: Extract and import Modal/Confirmation component from ConfirmationScreen */}
          <div className="bg-gray-900 rounded-xl p-8 max-w-md mx-auto">
            <div className="text-center mb-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-900/30 rounded-full mb-4">
                <svg className="h-8 w-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12l3 3 5-5" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Success!</h3>
              <p className="text-gray-400">Your action was successful.</p>
            </div>
            <button className="w-full py-3 bg-[#ff00ff] text-white rounded-lg font-semibold hover:bg-[#ff00ff]/90 transition-colors mt-2">Close</button>
          </div>
        </section>

        {/* Punch Card Display */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 border-b border-gray-800 pb-2">Punch Card Display</h2>
          {/* TODO: Extract and import PunchCardDisplay component from ProfilePage */}
          <div className="bg-gray-800 rounded-lg p-4 flex flex-col gap-2 shadow border border-gray-700 max-w-xs">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-white text-base">10-Punch Card</span>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-700 text-gray-100">Standard</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">Punches Left:</span>
              <span className="font-mono text-lg text-[#ff00ff]">4</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 