import React, { useState } from 'react';
import { X } from 'lucide-react';

const ClinicProfileModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg relative">
                 <button onClick={onClose} className="absolute top-3 right-3 text-onyx/50 hover:text-onyx"><X size={24} /></button>
                <h2 className="text-2xl font-bold mb-4 text-onyx">Clinic Profile</h2>
                 <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-onyx/80">Clinic Name</label>
                        <input type="text" className="mt-1 block w-full p-2 border border-onyx/20 rounded-md bg-seashell-700" defaultValue="MediBooks" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-onyx/80">Clinic Email</label>
                        <input type="email" className="mt-1 block w-full p-2 border border-onyx/20 rounded-md bg-seashell-700" defaultValue="contact@medibooks.demo" />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-onyx/80">Clinic Contact Number</label>
                        <input type="tel" className="mt-1 block w-full p-2 border border-onyx/20 rounded-md bg-seashell-700" />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-onyx/80">Clinic Location</label>
                        <input type="text" className="mt-1 block w-full p-2 border border-onyx/20 rounded-md bg-seashell-700" />
                    </div>
                     <div className="pt-4 flex justify-end">
                        <button className="bg-gold text-onyx px-4 py-2 rounded-lg shadow-sm hover:bg-gold/90 transition-colors font-semibold">
                            Save Changes
                        </button>
                    </div>
                 </div>
            </div>
        </div>
    );
};

const SettingsPage = () => {
    const [isProfileModalOpen, setProfileModalOpen] = useState(false);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-onyx">Settings</h1>
        <p className="text-onyx/70">Manage your clinic and account settings.</p>
      </div>

      <div className="space-y-6">
        <div>
            <h2 className="text-xl font-semibold text-onyx border-b border-onyx/10 pb-2">Profile Settings</h2>
            <div className="mt-4">
                <button onClick={() => setProfileModalOpen(true)} className="bg-white text-onyx px-4 py-2 rounded-lg shadow-sm border border-onyx/10 hover:bg-seashell-600 transition-colors font-semibold">
                    Edit Clinic Profile
                </button>
            </div>
        </div>
        <div>
            <h2 className="text-xl font-semibold text-onyx border-b border-onyx/10 pb-2">Service Options</h2>
            <div className="mt-4">
                <button className="bg-white text-onyx px-4 py-2 rounded-lg shadow-sm border border-onyx/10 hover:bg-seashell-600 transition-colors font-semibold">
                    Edit/Add Procedure
                </button>
            </div>
        </div>
      </div>

      <ClinicProfileModal isOpen={isProfileModalOpen} onClose={() => setProfileModalOpen(false)} />
    </div>
  );
};

export default SettingsPage;
