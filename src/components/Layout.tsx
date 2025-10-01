import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Calendar as CalendarIcon, Users } from 'lucide-react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-onyx ${
      isActive ? 'bg-peach-yellow text-onyx' : 'text-onyx/70'
    }`;
    
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr] bg-seashell">
      <div className="hidden border-r border-onyx/10 bg-seashell lg:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b border-onyx/10 px-6">
            <Link to="/" className="flex items-center gap-2 font-semibold text-onyx">
              <span>MediBooks</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <NavLink to="/" className={navLinkClass} end><CalendarIcon className="h-4 w-4" /> Dashboard</NavLink>
              <NavLink to="/clients" className={navLinkClass}><Users className="h-4 w-4" /> Clients</NavLink>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <main className="flex flex-1 flex-col gap-4">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
