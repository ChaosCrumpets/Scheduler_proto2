import React from 'react';

const SettingsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-onyx">Settings</h1>
        <p className="text-onyx/70">Manage your clinic and account settings.</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl">
        <h2 className="text-xl font-semibold text-onyx border-b border-onyx/10 pb-4">Clinic Profile</h2>
        <div className="mt-6 space-y-4">
            <div>
                <label className="block text-sm font-medium text-onyx/80">Clinic Name</label>
                <input type="text" className="mt-1 block w-full p-2 border border-onyx/20 rounded-md bg-seashell-700" defaultValue="CliniqSchedule" />
            </div>
            <div>
                <label className="block text-sm font-medium text-onyx/80">Contact Email</label>
                <input type="email" className="mt-1 block w-full p-2 border border-onyx/20 rounded-md bg-seashell-700" defaultValue="contact@cliniq.com" />
            </div>
             <div className="pt-4">
                <button className="bg-gold text-onyx px-4 py-2 rounded-lg shadow-sm hover:bg-gold/90 transition-colors font-semibold">
                    Save Changes
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
