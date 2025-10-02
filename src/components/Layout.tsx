import { Link, NavLink } from 'react-router-dom';
import { Stethoscope, Calendar, Users, BarChart, Settings, Paperclip, X } from 'lucide-react';
import React, { useState } from 'react';

const ProfileModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg flex flex-col">
                <div className="flex justify-between items-center p-4 border-b border-onyx/10">
                    <h2 className="text-xl font-bold text-onyx">Edit Profile</h2>
                    <button onClick={onClose} className="text-onyx/50 hover:text-onyx"><X size={24} /></button>
                </div>
                 <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-onyx/80">Name</label>
                        <input type="text" className="mt-1 block w-full p-2 border border-onyx/20 rounded-md bg-seashell-700" defaultValue="Dr. Sarah Williams" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-onyx/80">Email</label>
                        <input type="email" className="mt-1 block w-full p-2 border border-onyx/20 rounded-md bg-seashell-700" defaultValue="sarah.w@medibooks.com" />
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


const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [isPictureModalOpen, setPictureModalOpen] = useState(false);
  
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-onyx ${
      isActive ? 'bg-peach-yellow text-onyx font-semibold' : 'text-onyx/70'
    }`;
    
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr] bg-seashell">
      <div className="hidden border-r border-onyx/10 bg-seashell-600 lg:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b border-onyx/10 px-6">
            <Link to="/" className="flex items-center gap-2 font-bold text-onyx text-lg">
              <Stethoscope className="h-6 w-6 text-indian-red" />
              <span>MediBooks</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-4">
            <nav className="grid items-start px-4 text-base font-medium">
              <NavLink to="/" className={navLinkClass} end>
                <Calendar className="h-4 w-4" /> Dashboard
              </NavLink>
              <NavLink to="/appointments" className={navLinkClass}>
                <Calendar className="h-4 w-4" /> Appointments
              </NavLink>
              <NavLink to="/clients" className={navLinkClass}>
                <Users className="h-4 w-4" /> Clients
              </NavLink>
              <NavLink to="/analytics" className={navLinkClass}>
                <BarChart className="h-4 w-4" /> Analytics
              </NavLink>
              <NavLink to="/settings" className={navLinkClass}>
                <Settings className="h-4 w-4" /> Settings
              </NavLink>
            </nav>
          </div>
          <div className="mt-auto p-4 border-t border-onyx/10">
            <div className="flex items-center gap-3 w-full p-2 rounded-lg">
                <button onClick={() => setPictureModalOpen(true)}>
                    <img src="https://i.pravatar.cc/40?img=1" alt="User" className="h-10 w-10 rounded-full" />
                </button>
                <button onClick={() => setProfileModalOpen(true)} className="text-left">
                    <p className="font-semibold text-onyx">Dr. Sarah Williams</p>
                    <p className="text-xs text-onyx/70">Administrator</p>
                </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 md:p-6 lg:p-8 overflow-auto">
            {children}
        </main>
      </div>
      <ProfileModal isOpen={isProfileModalOpen} onClose={() => setProfileModalOpen(false)} />
      <ChangePictureModal isOpen={isPictureModalOpen} onClose={() => setPictureModalOpen(false)} />
    </div>
  );
};

export default Layout;
