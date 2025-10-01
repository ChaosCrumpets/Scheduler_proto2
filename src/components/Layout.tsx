import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Stethoscope, Calendar, Users, BarChart, Settings } from 'lucide-react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-onyx ${
      isActive ? 'bg-peach-yellow text-onyx font-semibold' : 'text-onyx/70'
    }`;
    
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr] bg-seashell">
      <div className="hidden border-r border-onyx/10 bg-seashell lg:block">
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
            <div className="flex items-center gap-3">
                <img src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="User" className="h-10 w-10 rounded-full object-cover" />
                <div>
                    <p className="font-semibold text-onyx">Dr. Sarah Williams</p>
                    <p className="text-xs text-onyx/70">Administrator</p>
                </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 md:p-6 lg:p-8 overflow-auto">
            {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
