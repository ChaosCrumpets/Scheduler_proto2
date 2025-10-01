import React from 'react';
import { PlusCircle, Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center">
            <div className="p-3 rounded-lg bg-seashell-600">
                 <Icon className="h-6 w-6 text-onyx/80" />
            </div>
            <div className="ml-4">
                <p className="text-sm font-medium text-onyx/70">{title}</p>
                <p className="text-2xl font-semibold text-onyx">{value}</p>
            </div>
        </div>
    </div>
);

const AppointmentsPage = () => {
    // Mock data would be replaced by API calls
    const appointments = [];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-onyx">Appointments</h1>
                    <p className="text-onyx/70">Manage all clinic appointments.</p>
                </div>
                 <button className="flex items-center gap-2 bg-gold text-onyx px-4 py-2 rounded-lg shadow-sm hover:bg-gold/90 transition-colors font-semibold">
                    <PlusCircle size={20} /> New Appointment
                </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Appointments" value="0" icon={Calendar} />
                <StatCard title="Upcoming" value="0" icon={Clock} />
                <StatCard title="Completed" value="0" icon={CheckCircle} />
                <StatCard title="Cancelled" value="0" icon={XCircle} />
            </div>

            <div className="bg-white p-4 rounded-lg shadow-lg">
                <div className="border-b border-onyx/10 mb-4">
                    <nav className="flex space-x-4">
                        <button className="px-3 py-2 font-semibold text-onyx border-b-2 border-gold">All Appointments</button>
                        <button className="px-3 py-2 text-onyx/70 hover:text-onyx">Upcoming</button>
                        <button className="px-3 py-2 text-onyx/70 hover:text-onyx">Scheduled</button>
                        <button className="px-3 py-2 text-onyx/70 hover:text-onyx">Completed</button>
                    </nav>
                </div>
                <div>
                    <h2 className="font-semibold text-onyx">All Appointments</h2>
                    <p className="text-sm text-onyx/70">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <div className="mt-8 text-center text-onyx/60">
                        No appointments found.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentsPage;
