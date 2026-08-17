import { useState } from 'react';
import { useLawyer } from '../context/LawyerContext';

export default function LawyerSettings() {
  const { profile, updateProfile } = useLawyer();

  const [name, setName] = useState(profile.name);
  const [barId, setBarId] = useState(profile.barId);
  const [bio, setBio] = useState(profile.bio);
  const [specializations, setSpecializations] = useState(profile.specializations);

  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const removeSpecialization = (spec) => {
    setSpecializations(prev => prev.filter(s => s !== spec));
  };

  const addSpecialization = () => {
    const input = prompt('Enter new specialization:');
    if (input && input.trim()) {
      if (!specializations.includes(input.trim())) {
        setSpecializations(prev => [...prev, input.trim()]);
      }
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({
      name,
      barId,
      bio,
      specializations,
    });
    triggerToast('Profile changes saved successfully');
  };

  return (
    <div className="p-stack-xl max-w-5xl mx-auto space-y-10 relative">
      <div className="flex justify-between items-end gap-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold mb-2">Account Settings</h2>
          <p className="font-body-md text-on-surface-variant">Manage your professional profile, security credentials, and preferences.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-primary text-primary rounded-lg font-label-md hover:bg-primary-fixed transition-colors active:scale-95 whitespace-nowrap bg-transparent">
          <span className="material-symbols-outlined text-sm">visibility</span>
          Public Profile Preview
        </button>
      </div>

      {/* Bento Grid Settings Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-stack-lg">
        {/* Section: Professional Profile (Spans 2 columns) */}
        <section className="lg:col-span-2 space-y-stack-lg">
          <form onSubmit={handleSaveProfile} className="bg-white border border-outline-variant rounded-xl p-stack-lg shadow-sm hover:border-primary transition-colors duration-300">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary">badge</span>
              <h3 className="font-headline-sm text-headline-sm font-semibold">Professional Profile</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-label-md text-on-surface font-medium block">Full Name</label>
                <input
                  className="w-full border border-outline-variant rounded-lg p-3 font-body-md focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-white"
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="font-label-md text-on-surface font-medium block">Bar ID / License Number</label>
                <input
                  className="w-full border border-outline-variant rounded-lg p-3 font-body-md focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-white"
                  type="text"
                  value={barId}
                  onChange={e => setBarId(e.target.value)}
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="font-label-md text-on-surface font-medium block">Area of Specialization</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {specializations.map(spec => (
                    <span key={spec} className="bg-primary-fixed text-on-primary-fixed px-3 py-1 rounded-full text-label-sm flex items-center gap-1">
                      {spec}
                      <span onClick={() => removeSpecialization(spec)} className="material-symbols-outlined text-xs cursor-pointer hover:text-error transition-colors">close</span>
                    </span>
                  ))}
                  <button
                    type="button"
                    onClick={addSpecialization}
                    className="border border-dashed border-outline text-on-surface-variant px-3 py-1 rounded-full text-label-sm hover:border-primary hover:text-primary transition-colors bg-transparent cursor-pointer"
                  >
                    + Add More
                  </button>
                </div>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="font-label-md text-on-surface font-medium block">Professional Bio</label>
                <textarea
                  className="w-full border border-outline-variant rounded-lg p-3 font-body-md focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none bg-white"
                  rows="4"
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <button type="submit" className="bg-primary text-white border-none px-6 py-2.5 rounded-lg font-label-md hover:opacity-90 transition-all">
                Save Profile Changes
              </button>
            </div>
          </form>

          {/* Section: Security */}
          <div className="bg-white border border-outline-variant rounded-xl p-stack-lg shadow-sm hover:border-secondary transition-colors duration-300">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-secondary">security</span>
              <h3 className="font-headline-sm text-headline-sm font-semibold">Security &amp; Privacy</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-surface rounded-lg border border-outline-variant">
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-on-surface-variant mt-1">vibration</span>
                  <div>
                    <p className="font-label-md text-on-surface font-medium">Multi-Factor Authentication (MFA)</p>
                    <p className="font-body-sm text-on-surface-variant">Recommended for high-security accounts.</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={profile.mfa}
                    onChange={e => {
                      updateProfile({ mfa: e.target.checked });
                      triggerToast(e.target.checked ? 'MFA enabled' : 'MFA disabled');
                    }}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-surface rounded-lg border border-outline-variant">
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-on-surface-variant mt-1">password</span>
                  <div>
                    <p className="font-label-md text-on-surface font-medium">Password</p>
                    <p className="font-body-sm text-on-surface-variant">Last changed 3 months ago.</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => triggerToast('Password update link sent to your email')}
                  className="text-primary font-label-md hover:underline font-medium border-none bg-transparent"
                >
                  Update
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-surface rounded-lg border border-outline-variant">
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-on-surface-variant mt-1">devices</span>
                  <div>
                    <p className="font-label-md text-on-surface font-medium">Active Sessions</p>
                    <p className="font-body-sm text-on-surface-variant">Log out from other devices.</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => triggerToast('Revoked all other active sessions')}
                  className="text-error font-label-md hover:underline font-medium border-none bg-transparent"
                >
                  Revoke All
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Sidebar column */}
        <aside className="space-y-stack-lg text-left">
          {/* Subscription Tier */}
          <div className="bg-inverse-surface text-inverse-on-surface rounded-xl p-stack-lg overflow-hidden relative group">
            <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform duration-700">
              <span className="material-symbols-outlined text-[120px]">workspace_premium</span>
            </div>
            <h3 className="font-label-sm uppercase tracking-widest text-primary-fixed-dim mb-4 text-xs font-semibold">Your Subscription</h3>
            <div className="mb-6">
              <h4 className="font-headline-sm text-headline-sm font-black mb-1 text-xl">Partner Tier</h4>
              <p className="text-body-sm opacity-80">Unlimited case storage &amp; AI document review.</p>
            </div>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-body-sm">
                <span className="material-symbols-outlined text-primary-fixed-dim text-sm">check_circle</span>
                Priority 24/7 Support
              </div>
              <div className="flex items-center gap-2 text-body-sm">
                <span className="material-symbols-outlined text-primary-fixed-dim text-sm">check_circle</span>
                Multi-user Collaboration
              </div>
            </div>
            <button
              type="button"
              onClick={() => triggerToast('Subscription portal loading...')}
              className="w-full bg-primary-fixed text-on-primary-fixed font-label-md py-3 rounded-lg hover:bg-white transition-colors font-semibold border-none"
            >
              Manage Subscription
            </button>
          </div>

          {/* Notification Preferences */}
          <div className="bg-white border border-outline-variant rounded-xl p-stack-lg shadow-sm hover:border-primary transition-colors duration-300">
            <h3 className="font-headline-sm text-headline-sm mb-6 flex items-center gap-2 font-semibold">
              <span className="material-symbols-outlined text-primary">notifications_active</span>
              Alerts
            </h3>
            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <span className="font-body-md text-on-surface">New Case Assignment</span>
                <input
                  checked={profile.newCaseAlert}
                  onChange={e => updateProfile({ newCaseAlert: e.target.checked })}
                  className="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4"
                  type="checkbox"
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="font-body-md text-on-surface">Document E-Signatures</span>
                <input
                  checked={profile.esignAlert}
                  onChange={e => updateProfile({ esignAlert: e.target.checked })}
                  className="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4"
                  type="checkbox"
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="font-body-md text-on-surface">Calendar Reminders</span>
                <input
                  checked={profile.calendarAlert}
                  onChange={e => updateProfile({ calendarAlert: e.target.checked })}
                  className="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4"
                  type="checkbox"
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="font-body-md text-on-surface">Daily Briefing Email</span>
                <input
                  checked={profile.dailyBrief}
                  onChange={e => updateProfile({ dailyBrief: e.target.checked })}
                  className="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4"
                  type="checkbox"
                />
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-outline-variant">
              <p className="font-label-sm text-on-surface-variant mb-4 text-xs font-semibold">Email Digest Frequency</p>
              <select
                value={profile.digestFrequency}
                onChange={e => updateProfile({ digestFrequency: e.target.value })}
                className="w-full bg-surface border border-outline-variant rounded-lg p-2.5 font-body-sm outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option>Immediate</option>
                <option>Once daily</option>
                <option>Weekly summary</option>
              </select>
            </div>
          </div>
        </aside>
      </div>

      {/* Footer Meta */}
      <footer className="mt-stack-xl flex flex-col md:flex-row justify-between items-center py-6 border-t border-outline-variant gap-4">
        <div className="flex gap-6">
          <a className="font-label-sm text-on-surface-variant hover:text-primary transition-colors text-xs font-medium" href="#">Privacy Policy</a>
          <a className="font-label-sm text-on-surface-variant hover:text-primary transition-colors text-xs font-medium" href="#">Terms of Service</a>
          <a className="font-label-sm text-on-surface-variant hover:text-primary transition-colors text-xs font-medium" href="#">Cookie Settings</a>
        </div>
        <p className="font-label-sm text-on-surface-variant opacity-60 text-xs font-medium">© 2026 eSewa Legal Solutions. All rights reserved.</p>
      </footer>

      {/* Success Toast Notification */}
      <div
        className={`fixed bottom-10 right-10 flex items-center gap-3 bg-inverse-surface text-inverse-on-surface px-6 py-4 rounded-xl shadow-2xl transition-all duration-500 pointer-events-none z-[100] ${
          showToast ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}
      >
        <span className="material-symbols-outlined text-[#D1FAE5]">check_circle</span>
        <span className="font-label-md font-semibold">{toastMessage}</span>
      </div>
    </div>
  );
}
