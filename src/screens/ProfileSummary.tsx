import React from 'react';
import { useGoogleFont } from '../utils/fonts';
import { useForm } from '../utils/FormContext';

const mockUser = {
  name: 'Rami El-Daoud',
  email: 'rami@boulders.dk',
  membership: 'Standard',
  phone: '25133733',
  homeGym: 'Boulders Aarhus City',
};

export default function ProfileSummary() {
  const fontFamily = useGoogleFont('Inter');
  const { updateFormData } = useForm();

  React.useEffect(() => {
    // Pre-fill context with mock user data
    updateFormData('personalInfo', {
      firstName: 'Rami',
      lastName: 'El-Daoud',
      email: mockUser.email,
      phone: mockUser.phone,
      rawPhone: mockUser.phone,
      countryCode: '+45',
    });
    updateFormData('membership', { plan: 'Standard' });
    updateFormData('location', { gymId: '1' });
  }, [updateFormData]);

  return (
    <div className="min-h-screen flex flex-col items-center text-white" style={{ fontFamily }}>
      <div className="w-full flex flex-col items-center mt-0">
        <div className="bg-gray-800 rounded-xl p-8 max-w-md w-full shadow-lg flex flex-col items-center relative">
          <h1 className="text-3xl font-bold mb-2 text-center">Welcome back, {mockUser.name.split(' ')[0]}!</h1>
          <div className="divide-y divide-gray-700 mb-8 w-full">
            <div className="flex justify-between items-center py-3">
              <span className="text-gray-400 font-medium">Name</span>
              <span className="text-white font-semibold">{mockUser.name}</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-gray-400 font-medium">E-mail</span>
              <span className="text-white font-semibold">{mockUser.email}</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-gray-400 font-medium">Membership</span>
              <span className="text-white font-semibold">{mockUser.membership}</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-gray-400 font-medium">Phone</span>
              <span className="text-white font-semibold">{mockUser.phone}</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-gray-400 font-medium">Home Gym</span>
              <span className="text-white font-semibold">{mockUser.homeGym}</span>
            </div>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <button
              onClick={() => window.location.href = '/index.html?screen=ConfirmationScreen'}
              className="w-full py-3 bg-[#ff00ff] text-white rounded-lg font-semibold hover:bg-[#ff00ff]/90 transition-colors"
            >
              Continue
            </button>
          </div>
          <div className="flex gap-3 mt-6 w-full">
            <button
              onClick={() => window.location.href = '/index.html?screen=PersonalInformation&email=' + encodeURIComponent(mockUser.email)}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => {
                window.location.href = '/index.html?screen=EmailEntry';
              }}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 