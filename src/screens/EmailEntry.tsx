import React, { useState } from 'react';
import { useGoogleFont } from '../utils/fonts';
import { useForm } from '../utils/FormContext';

export default function EmailEntry() {
  const fontFamily = useGoogleFont('Inter');
  const { updateFormData } = useForm();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const recognizedUsers = ['rami@boulders.dk', 'aarhus@boulders.dk'];
  const isRecognized = recognizedUsers.includes(email.trim().toLowerCase());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (isRecognized) {
      if (password !== '123') {
        setError('Incorrect password');
        return;
      }
    }
    setError('');
    updateFormData('personalInfo', { email });
    if (isRecognized) {
      window.location.href = '/index.html?screen=ProfileSummary&email=' + encodeURIComponent(email);
    } else {
      window.location.href = '/index.html?screen=PersonalInformation&email=' + encodeURIComponent(email);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center text-white" style={{ fontFamily }}>
      <div className="w-full flex flex-col items-center mt-24 sm:mt-[12vh]">
        <div className="bg-gray-800 rounded-xl p-8 max-w-md w-full shadow-lg flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-2 text-center">Welcome to Boulders!</h1>
          <p className="text-gray-400 text-center mb-8">Start by entering your e-mail address.</p>
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
            <input
              type="email"
              className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-[#ff00ff]"
              placeholder="E-mail address"
              value={email}
              onChange={e => { setEmail(e.target.value); setError(''); setPassword(''); }}
              required
            />
            {isRecognized && (
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-[#ff00ff]"
                placeholder="Password"
                value={password}
                onChange={e => { setPassword(e.target.value); setError(''); }}
                required
              />
            )}
            {error && (
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-sm">
                  <p className="text-red-500">{error}</p>
                  {error === 'Incorrect password' && (
                    <button
                      type="button"
                      onClick={() => window.location.href = 'mailto:hej@boulders.dk?subject=Password Reset Request&body=Please help me reset my password for ' + encodeURIComponent(email)}
                      className="text-[#ff80ff] hover:underline"
                    >
                      Forgot your password?
                    </button>
                  )}
                </div>
              </div>
            )}
            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-[#ff00ff] text-white rounded-lg font-medium shadow-sm hover:bg-[#ff00ff]/90 focus:outline-none focus:ring-2 focus:ring-[#ff00ff] focus:ring-offset-2 transition-colors text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              disabled={isRecognized && password.length === 0}
            >
              Continue
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 