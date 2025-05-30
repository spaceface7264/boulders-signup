import React, { useState } from 'react';
import { useGoogleFont } from '../utils/fonts';
import { useForm } from '../utils/FormContext';

const mockUsers: { [email: string]: any } = {
  'rami@boulders.dk': {
    firstName: 'Rami',
    lastName: 'El-Daoud',
    email: 'rami@boulders.dk',
    phone: '25133733',
    address: 'Some Street 1',
    city: 'Aarhus',
    zip: '8000',
    dob: '1990-01-01',
    membership: 'Standard',
    membershipId: 'BO-2024-1234',
    homeGym: 'Boulders Aarhus City',
    cardNumber: '1234 5678 9012 3456',
    expDate: '12/25',
    cvv: '123',
    punchCards: [
      { id: 1, name: '10-Punch Card', type: 'Standard', total: 10, remaining: 4, status: 'Active' },
      { id: 2, name: '5-Punch Card', type: 'Standard', total: 5, remaining: 0, status: 'Used' },
      { id: 3, name: '10-Punch Card', type: 'Junior', total: 10, remaining: 7, status: 'Active' },
      { id: 4, name: '5-Punch Card', type: 'Junior', total: 5, remaining: 2, status: 'Active' }
    ]
  },
  'aarhus@boulders.dk': {
    firstName: 'Aarhus',
    lastName: 'User',
    email: 'aarhus@boulders.dk',
    phone: '12345678',
    address: 'Testvej 1',
    city: 'Aarhus',
    zip: '8000',
    dob: '1995-05-05',
    membership: null,
    homeGym: 'Boulders Aarhus City',
    cardNumber: '',
    expDate: '',
    cvv: '',
    punchCards: []
  }
};

// Get user from email param (default to rami@boulders.dk)
const params = new URLSearchParams(window.location.search);
const emailParam = params.get('email')?.toLowerCase() || 'rami@boulders.dk';
const mockUser = mockUsers[emailParam] || mockUsers['rami@boulders.dk'];

const tabs = [
  'Personal Information',
  'Access',
];

export default function ProfilePage() {
  const fontFamily = useGoogleFont('Inter');
  const [activeTab, setActiveTab] = useState(0);
  const [profile, setProfile] = useState({ ...mockUser });
  const [editMode, setEditMode] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [subscription, setSubscription] = useState(mockUser.membership);
  const [payment, setPayment] = useState({
    cardNumber: mockUser.cardNumber,
    expDate: mockUser.expDate,
    cvv: mockUser.cvv,
  });
  const [msg, setMsg] = useState('');
  const [confirmChange, setConfirmChange] = useState(false);
  const [newMembership, setNewMembership] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    setMsg('Profile updated!');
    setEditMode(false);
    setTimeout(() => setMsg(''), 1500);
  };
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo: check current password is '123'
    if (currentPassword !== '123') {
      setPasswordError('Current password is incorrect');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setPasswordError('New passwords do not match');
      return;
    }
    setEditPassword(false);
    setNewPassword('');
    setCurrentPassword('');
    setConfirmNewPassword('');
    setPasswordError('');
    setMsg('Password changed!');
    setTimeout(() => setMsg(''), 1500);
  };
  const handleSubscriptionChange = (e: React.FormEvent) => {
    e.preventDefault();
    setMsg('Subscription updated!');
    setTimeout(() => setMsg(''), 1500);
  };
  const handlePaymentSave = (e: React.FormEvent) => {
    e.preventDefault();
    setMsg('Payment details updated!');
    setTimeout(() => setMsg(''), 1500);
  };

  const handleMembershipChange = (newType: string) => {
    setNewMembership(newType);
    setConfirmChange(true);
  };

  const confirmMembershipChange = () => {
    setSubscription(newMembership);
    setConfirmChange(false);
    setMsg('Membership changed!');
    setTimeout(() => setMsg(''), 1500);
  };

  const cancelMembershipChange = () => {
    setConfirmChange(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center text-white pb-12" style={{ fontFamily }}>
      <div className="w-full flex flex-col items-center mt-0">
        <div className="bg-gray-800 rounded-xl p-8 max-w-2xl w-full shadow-lg flex flex-col items-center relative">
          {/* Tabs */}
          <div className="flex w-full mb-8 border-b border-gray-700">
            {tabs.map((tab, idx) => (
              <button
                key={tab}
                className={`flex-1 py-3 text-lg font-semibold transition-colors border-b-2 ${activeTab === idx ? 'border-[#ff00ff] text-[#ff00ff]' : 'border-transparent text-gray-400 hover:text-white'}`}
                onClick={() => setActiveTab(idx)}
              >
                {tab}
              </button>
            ))}
          </div>
          {/* Tab Content */}
          {activeTab === 0 && (
            <form onSubmit={handleProfileSave} className="relative w-full flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                <div>
                  <label className="block text-sm font-medium mb-2">First Name</label>
                  <input type="text" className={`w-full px-4 py-2 rounded-lg border ${editMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-gray-700 border-gray-700 text-gray-400 cursor-not-allowed'}`} value={profile.firstName} onChange={e => setProfile((p: any) => ({ ...p, firstName: e.target.value }))} disabled={!editMode} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name</label>
                  <input type="text" className={`w-full px-4 py-2 rounded-lg border ${editMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-gray-700 border-gray-700 text-gray-400 cursor-not-allowed'}`} value={profile.lastName} onChange={e => setProfile((p: any) => ({ ...p, lastName: e.target.value }))} disabled={!editMode} />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">E-mail</label>
                  <input type="email" className="w-full px-4 py-2 rounded-lg border bg-gray-700 border-gray-700 text-gray-400 cursor-not-allowed" value={profile.email} readOnly disabled />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <input type="tel" className={`w-full px-4 py-2 rounded-lg border ${editMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-gray-700 border-gray-700 text-gray-400 cursor-not-allowed'}`} value={profile.phone} onChange={e => setProfile((p: any) => ({ ...p, phone: e.target.value }))} disabled={!editMode} />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Address</label>
                  <input type="text" className={`w-full px-4 py-2 rounded-lg border ${editMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-gray-700 border-gray-700 text-gray-400 cursor-not-allowed'}`} value={profile.address} onChange={e => setProfile((p: any) => ({ ...p, address: e.target.value }))} disabled={!editMode} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">City</label>
                  <input type="text" className={`w-full px-4 py-2 rounded-lg border ${editMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-gray-700 border-gray-700 text-gray-400 cursor-not-allowed'}`} value={profile.city} onChange={e => setProfile((p: any) => ({ ...p, city: e.target.value }))} disabled={!editMode} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">ZIP</label>
                  <input type="text" className={`w-full px-4 py-2 rounded-lg border ${editMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-gray-700 border-gray-700 text-gray-400 cursor-not-allowed'}`} value={profile.zip} onChange={e => setProfile((p: any) => ({ ...p, zip: e.target.value }))} disabled={!editMode} />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Date of Birth</label>
                  <input type="date" className={`w-full px-4 py-2 rounded-lg border ${editMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-gray-700 border-gray-700 text-gray-400 cursor-not-allowed'}`} value={profile.dob} onChange={e => setProfile((p: any) => ({ ...p, dob: e.target.value }))} disabled={!editMode} />
                </div>
              </div>
              {/* Password Change */}
              <div className="flex flex-col gap-2 mt-2">
                {editMode ? (
                  !editPassword ? (
                    <button type="button" className="text-[#ff00ff] underline w-fit" onClick={() => setEditPassword(true)}>
                      Change Password
                    </button>
                  ) : (
                    <div className="w-full bg-gray-900/80 border border-[#ff00ff]/30 rounded-xl p-6 mt-2">
                      <form onSubmit={handlePasswordChange} className="flex flex-col gap-4 items-stretch w-full">
                        <div>
                          <label className="block text-sm font-medium mb-1 text-white">Current password</label>
                          <input
                            type="password"
                            className="px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white w-full"
                            value={currentPassword}
                            onChange={e => { setCurrentPassword(e.target.value); setPasswordError(''); }}
                            placeholder="Current password"
                            required
                          />
                          {passwordError && <span className="text-red-500 text-sm mt-1 block">{passwordError}</span>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1 text-white">New password</label>
                          <input
                            type="password"
                            className="px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white w-full"
                            value={newPassword}
                            onChange={e => { setNewPassword(e.target.value); setPasswordError(''); }}
                            placeholder="New password"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1 text-white">Confirm new password</label>
                          <input
                            type="password"
                            className="px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white w-full"
                            value={confirmNewPassword}
                            onChange={e => { setConfirmNewPassword(e.target.value); setPasswordError(''); }}
                            placeholder="Confirm new password"
                            required
                          />
                          {confirmNewPassword && newPassword !== confirmNewPassword && (
                            <span className="text-red-500 text-sm mt-1 block">Passwords do not match</span>
                          )}
                        </div>
                        <div className="flex gap-2 justify-end mt-2">
                          <button
                            type="button"
                            className="px-4 py-2 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors"
                            onClick={() => { setEditPassword(false); setCurrentPassword(''); setNewPassword(''); setConfirmNewPassword(''); setPasswordError(''); }}
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 bg-[#ff00ff] text-white rounded-lg font-semibold hover:bg-[#ff00ff]/90 transition-colors"
                            disabled={!currentPassword || !newPassword || !confirmNewPassword || newPassword !== confirmNewPassword}
                          >
                            Save
                          </button>
                        </div>
                      </form>
                    </div>
                  )
                ) : null}
              </div>
              {/* Only show main Save button if not changing password */}
              {editMode && !editPassword && (
                <button type="submit" className="w-full py-3 bg-[#ff00ff] text-white rounded-lg font-semibold hover:bg-[#ff00ff]/90 transition-colors mt-2">Save</button>
              )}
            </form>
          )}
          {activeTab === 1 && (
            <form onSubmit={handleSubscriptionChange} className="w-full flex flex-col gap-6">
              {/* Membership Section */}
              <div className="bg-gray-900 rounded-xl p-6 shadow flex flex-col gap-4 mb-8 relative">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="h-6 w-6 text-[#ff00ff]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" stroke="currentColor" strokeWidth="2"/></svg>
                  <h3 className="text-lg font-bold text-white">Membership</h3>
                </div>
                {/* Active badge at top right */}
                {mockUser.membership && (
                  <div className="absolute top-6 right-6 flex items-center gap-1 text-green-400 font-semibold text-base bg-gray-800 px-3 py-1 rounded-full shadow border border-green-700">
                    <svg className="h-4 w-4 text-green-400" fill="currentColor" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10" /></svg>
                    Active
                  </div>
                )}
                {mockUser.membership ? (
                  <>
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                      <div>
                        <dt className="text-gray-400 text-sm">Membership Type</dt>
                        <dd className="text-white font-semibold text-base">{subscription} Membership</dd>
                      </div>
                      <div>
                        <dt className="text-gray-400 text-sm">Monthly Fee</dt>
                        <dd className="text-[#ff00ff] font-bold text-base">{subscription === 'Standard' ? '299 DKK' : subscription === 'Student' ? '199 DKK' : '149 DKK'}</dd>
                      </div>
                      <div>
                        <dt className="text-gray-400 text-sm">Membership ID</dt>
                        <dd className="text-white font-mono text-base">{mockUser.membershipId}</dd>
                      </div>
                      <div>
                        <dt className="text-gray-400 text-sm">Home Gym</dt>
                        <dd className="text-white text-base">{profile.homeGym}</dd>
                      </div>
                    </dl>
                    {/* Change Membership Action */}
                    <div className="mt-2">
                      {subscription === 'Student' && (
                        <button type="button" className="text-[#ff00ff] underline font-semibold" onClick={() => handleMembershipChange('Standard')}>
                          Are you no longer a student? <span className="underline">Change to Standard membership</span>
                        </button>
                      )}
                      {subscription === 'Standard' && (
                        <button type="button" className="text-[#ff00ff] underline font-semibold" onClick={() => handleMembershipChange('Student')}>
                          <span className="underline">Change to Student membership</span>
                        </button>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-start gap-3 py-4">
                    <span className="text-gray-400 text-base">You do not have an active membership.</span>
                    <button type="button" className="px-5 py-2 bg-[#ff00ff] text-white rounded-lg font-semibold hover:bg-[#ff00ff]/90 transition-colors text-base shadow focus:outline-none focus:ring-2 focus:ring-[#ff00ff] focus:ring-offset-2">Get Membership</button>
                  </div>
                )}
              </div>
              {/* Punch Cards Section */}
              <div className="bg-gray-900 rounded-xl p-6 shadow flex flex-col gap-4">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="h-6 w-6 text-[#ff00ff]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M3 11h18" stroke="currentColor" strokeWidth="2"/></svg>
                  <h3 className="text-lg font-bold text-white">Punch Cards</h3>
                </div>
                {mockUser.punchCards && mockUser.punchCards.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {['Standard', 'Junior'].map((type: string) => {
                      const card = mockUser.punchCards.find((c: any) => c.type === type);
                      return card ? (
                        <div key={card.id} className="bg-gray-800 rounded-lg p-4 flex flex-col gap-2 shadow border border-gray-700">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-white text-base">{card.name}</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${card.type === 'Junior' ? 'bg-blue-700 text-blue-100' : 'bg-gray-700 text-gray-100'}`}>{card.type}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-400 text-sm">Punches Left:</span>
                            <span className="font-mono text-lg text-[#ff00ff]">{card.remaining}</span>
                          </div>
                        </div>
                      ) : null;
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col items-start gap-3 py-4">
                    <span className="text-gray-400 text-base">No punch cards connected to your account.</span>
                    <button type="button" className="px-5 py-2 bg-[#ff00ff] text-white rounded-lg font-semibold hover:bg-[#ff00ff]/90 transition-colors text-base shadow focus:outline-none focus:ring-2 focus:ring-[#ff00ff] focus:ring-offset-2">Buy Punch Card</button>
                  </div>
                )}
              </div>
              {/* Confirmation Dialog */}
              {confirmChange && (
                <div className="mt-4 p-4 bg-gray-800 rounded-lg border border-[#ff00ff]/40 shadow">
                  <p className="text-white mb-2 font-semibold">Are you sure you want to change your membership to <span className="text-[#ff00ff]">{newMembership}</span>?</p>
                  {newMembership === 'Student' && (
                    <p className="text-gray-400 mb-4">To activate student membership, you will be asked to show a valid student ID before your next visit.</p>
                  )}
                  <div className="flex gap-2 mt-2">
                    <button type="button" className="px-4 py-2 bg-[#ff00ff] text-white rounded-lg font-semibold hover:bg-[#ff00ff]/90 transition-colors" onClick={confirmMembershipChange}>Confirm</button>
                    <button type="button" className="px-4 py-2 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors" onClick={cancelMembershipChange}>Cancel</button>
                  </div>
                </div>
              )}
              {/* Payment Details - Redesigned */}
              <div className="mt-8">
                <div className="bg-gray-900 rounded-xl p-6 shadow flex flex-col gap-4">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="h-6 w-6 text-[#ff00ff]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="10" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M2 11h20" stroke="currentColor" strokeWidth="2"/><path d="M6 15h.01" stroke="currentColor" strokeWidth="2"/></svg>
                    <h3 className="text-lg font-bold text-white">Payment Details</h3>
                  </div>
                  {editMode ? (
                    <>
                      <div>
                        <label className="block text-sm font-medium mb-1">Card Number</label>
                        <input type="text" inputMode="numeric" maxLength={19} placeholder="1234 5678 9012 3456" className="w-full px-4 py-2 rounded-lg border bg-gray-900 border-gray-700 text-white focus:outline-none focus:border-[#ff00ff] tracking-widest" value={payment.cardNumber} onChange={e => setPayment(p => ({ ...p, cardNumber: e.target.value.replace(/[^0-9 ]/g, '').replace(/(.{4})/g, '$1 ').trim() }))} />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Expiry Date</label>
                          <input type="text" inputMode="numeric" maxLength={5} placeholder="MM/YY" className="w-full px-4 py-2 rounded-lg border bg-gray-900 border-gray-700 text-white focus:outline-none focus:border-[#ff00ff] tracking-widest" value={payment.expDate} onChange={e => setPayment(p => ({ ...p, expDate: e.target.value.replace(/[^0-9/]/g, '').slice(0, 5) }))} />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">CVV</label>
                          <input type="text" inputMode="numeric" maxLength={4} placeholder="CVV" className="w-full px-4 py-2 rounded-lg border bg-gray-900 border-gray-700 text-white focus:outline-none focus:border-[#ff00ff] tracking-widest" value={payment.cvv} onChange={e => setPayment(p => ({ ...p, cvv: e.target.value.replace(/[^0-9]/g, '').slice(0, 4) }))} />
                        </div>
                      </div>
                      <button type="submit" className="w-full py-3 bg-[#ff00ff] text-white rounded-lg font-semibold hover:bg-[#ff00ff]/90 transition-colors mt-2">Save Payment Details</button>
                    </>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 text-sm">Card:</span>
                        <span className="font-mono tracking-widest text-white text-base">•••• •••• •••• {payment.cardNumber.slice(-4)}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-gray-400 text-sm">Exp:</span>
                        <span className="font-mono tracking-widest text-white text-base">{payment.expDate || '--/--'}</span>
                        <span className="text-gray-400 text-sm">CVV:</span>
                        <span className="font-mono tracking-widest text-white text-base">•••</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </form>
          )}
          {msg && <p className="text-green-400 text-center mt-4">{msg}</p>}
          {/* Bottom left Edit and right Log Out buttons (outside form, for all tabs) */}
          <div className="flex gap-3 mt-4 w-full justify-between">
            {!editMode && (
              <button
                type="button"
                onClick={() => setEditMode(true)}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors"
              >
                Edit
              </button>
            )}
            {!editMode && (
              <button
                type="button"
                onClick={() => { window.location.href = '/index.html?screen=EmailEntry'; }}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors"
              >
                Log Out
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 