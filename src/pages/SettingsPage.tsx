import React, { useState } from 'react';
import { X, Paperclip } from 'lucide-react';
import { useProcedures } from '../hooks/api';

const ClinicProfileModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg flex flex-col">
                <div className="flex justify-between items-center p-4 border-b border-onyx/10">
                    <h2 className="text-xl font-bold text-onyx">Clinic Profile</h2>
                    <button onClick={onClose} className="text-onyx/50 hover:text-onyx"><X size={24} /></button>
                </div>
                 <div className="p-6 space-y-4">
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

const EditProceduresModal = ({ isOpen, onClose }) => {
    const { data: procedures, isLoading } = useProcedures();
    const [editingId, setEditingId] = useState<number | null>(null);
    const [isAdding, setIsAdding] = useState(false);

    // This would be more robust in a real app
    const handleSave = () => {
        setEditingId(null);
        setIsAdding(false);
        // Here you would call a mutation to save the changes
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl flex flex-col">
                 <div className="flex justify-between items-center p-4 border-b border-onyx/10">
                    <h2 className="text-xl font-bold text-onyx">Edit/Add Procedures</h2>
                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsAdding(true)} className="bg-indian-red text-white px-3 py-1 rounded-md text-sm">Add</button>
                        <button onClick={onClose} className="text-onyx/50 hover:text-onyx"><X size={24} /></button>
                    </div>
                </div>
                <div className="max-h-[60vh] overflow-y-auto p-6">
                    {isLoading ? <p>Loading procedures...</p> : (
                        <ul className="space-y-3">
                            {isAdding && (
                                <li className="p-3 bg-seashell-600 rounded-lg flex items-center gap-4">
                                    <input placeholder="Procedure Name" className="flex-1 p-1 border rounded-md" />
                                    <input placeholder="Price" type="number" className="w-24 p-1 border rounded-md" />
                                    <input placeholder="Duration (min)" type="number" className="w-24 p-1 border rounded-md" />
                                    <button onClick={handleSave} className="bg-gold px-3 py-1 text-xs rounded-md">Save</button>
                                </li>
                            )}
                            {procedures?.map(proc => (
                                <li key={proc.id} className="p-3 bg-seashell-600 rounded-lg flex items-center gap-4">
                                    {editingId === proc.id ? (
                                        <>
                                            <input defaultValue={proc.name} className="flex-1 p-1 border rounded-md" />
                                            <input defaultValue={proc.price || ''} placeholder="Price" type="number" className="w-24 p-1 border rounded-md" />
                                            <button onClick={handleSave} className="bg-gold px-3 py-1 text-xs rounded-md">Save</button>
                                        </>
                                    ) : (
                                        <>
                                            <span className="flex-1 font-medium">{proc.name}</span>
                                            <span className="w-24 text-sm text-onyx/70">${proc.price || 'N/A'}</span>
                                            <button onClick={() => setEditingId(proc.id)} className="bg-onyx/10 px-3 py-1 text-xs rounded-md">Edit</button>
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

const ChangePictureModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-sm flex flex-col">
                 <div className="flex justify-between items-center p-4 border-b border-onyx/10">
                    <h2 className="text-xl font-bold text-onyx">Change Profile Picture</h2>
                    <button onClick={onClose} className="text-onyx/50 hover:text-onyx"><X size={24} /></button>
                </div>
                <div className="p-6 flex flex-col items-center justify-center">
                    <button className="flex items-center gap-2 bg-gold text-onyx px-4 py-2 rounded-lg shadow-sm hover:bg-gold/90 transition-colors font-semibold">
                        <Paperclip size={16} />
                        Upload from Files
                    </button>
                </div>
            </div>
        </div>
    );
};

const SettingsPage = () => {
    const [isProfileModalOpen, setProfileModalOpen] = useState(false);
    const [isProceduresModalOpen, setProceduresModalOpen] = useState(false);
    const [isPictureModalOpen, setPictureModalOpen] = useState(false);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-onyx">Settings</h1>
        <p className="text-onyx/70">Manage your clinic and account settings.</p>
      </div>

      <div className="space-y-6">
        <div>
            <h2 className="text-xl font-semibold text-onyx border-b border-onyx/10 pb-2">Profile Settings</h2>
            <div className="mt-4 flex flex-col items-start gap-4">
                <button onClick={() => setProfileModalOpen(true)} className="bg-white text-onyx px-4 py-2 rounded-lg shadow-sm border border-onyx/10 hover:bg-seashell-600 transition-colors font-semibold">
                    Edit Clinic Profile
                </button>
                <button onClick={() => setPictureModalOpen(true)} className="bg-white text-onyx px-4 py-2 rounded-lg shadow-sm border border-onyx/10 hover:bg-seashell-600 transition-colors font-semibold">
                    Change Profile Picture
                </button>
            </div>
        </div>
        <div>
            <h2 className="text-xl font-semibold text-onyx border-b border-onyx/10 pb-2">Service Options</h2>
            <div className="mt-4">
                <button onClick={() => setProceduresModalOpen(true)} className="bg-white text-onyx px-4 py-2 rounded-lg shadow-sm border border-onyx/10 hover:bg-seashell-600 transition-colors font-semibold">
                    Edit/Add Procedure
                </button>
            </div>
        </div>
      </div>

      <ClinicProfileModal isOpen={isProfileModalOpen} onClose={() => setProfileModalOpen(false)} />
      <EditProceduresModal isOpen={isProceduresModalOpen} onClose={() => setProceduresModalOpen(false)} />
      <ChangePictureModal isOpen={isPictureModalOpen} onClose={() => setPictureModalOpen(false)} />
    </div>
  );
};

export default SettingsPage;
