import React, { useState, useMemo } from 'react';
import { PlusCircle, Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';
import moment from 'moment';
import { useAppointments } from '../hooks/api';

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
    const { data: appointments, isLoading } = useAppointments(moment().subtract(1, 'year').toDate(), moment().add(1, 'year').toDate());
    const [activeTab, setActiveTab] = useState('All');

    const filteredAppointments = useMemo(() => {
        if (!appointments) return [];
        if (activeTab === 'All') return appointments;
        if (activeTab === 'Upcoming') return appointments.filter(a => moment(a.scheduled_at).isAfter(moment()) && a.status === 'SCHEDULED');
        return appointments.filter(a => a.status === activeTab.toUpperCase());
    }, [appointments, activeTab]);

    const stats = useMemo(() => {
        if (!appointments) return { total: 0, upcoming: 0, completed: 0, canceled: 0 };
        return {
            total: appointments.length,
            upcoming: appointments.filter(a => moment(a.scheduled_at).isAfter(moment()) && a.status === 'SCHEDULED').length,
            completed: appointments.filter(a => a.status === 'COMPLETED').length,
            canceled: appointments.filter(a => a.status === 'CANCELED').length,
        };
    }, [appointments]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-onyx">Appointments</h1>
                    <p className="text-onyx/70">Manage all clinic appointments.</p>
                </div>
                 <button className="flex items-center gap-2 bg-indian-red text-white px-4 py-2 rounded-lg shadow-sm hover:bg-indian-red/90 transition-colors font-semibold">
                    <PlusCircle size={20} /> New Appointment
                </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Appointments" value={stats.total} icon={Calendar} />
                <StatCard title="Upcoming" value={stats.upcoming} icon={Clock} />
                <StatCard title="Completed" value={stats.completed} icon={CheckCircle} />
                <StatCard title="Cancelled" value={stats.canceled} icon={XCircle} />
            </div>

            <div className="bg-white p-4 rounded-lg shadow-lg">
                <div className="border-b border-onyx/10 mb-4">
                    <nav className="flex space-x-1">
                        {['All', 'Upcoming', 'SCHEDULED', 'COMPLETED'].map(tab => (
                            <button 
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-3 py-2 font-semibold text-sm rounded-t-md ${activeTab === tab ? 'text-onyx border-b-2 border-gold' : 'text-onyx/70 hover:text-onyx'}`}
                            >
                                {tab === 'SCHEDULED' ? 'Scheduled' : tab}
                            </button>
                        ))}
                    </nav>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                             <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-onyx/70 uppercase">Client</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-onyx/70 uppercase">Procedure</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-onyx/70 uppercase">Date & Time</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-onyx/70 uppercase">Status</th>
                            </tr>
                        </thead>
                         <tbody className="divide-y divide-onyx/10">
                            {isLoading ? (
                                <tr><td colSpan="4" className="text-center py-8 text-onyx/60">Loading...</td></tr>
                            ) : filteredAppointments.length > 0 ? (
                                filteredAppointments.map(appt => (
                                    <tr key={appt.id}>
                                        <td className="px-4 py-3 text-sm font-medium">{appt.clients.name}</td>
                                        <td className="px-4 py-3 text-sm text-onyx/80">{appt.procedures.name}</td>
                                        <td className="px-4 py-3 text-sm text-onyx/80">{moment(appt.scheduled_at).format('MMM D, YYYY, h:mm A')}</td>
                                        <td className="px-4 py-3 text-sm">
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                appt.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                                                appt.status === 'CANCELED' ? 'bg-red-100 text-red-800' :
                                                'bg-blue-100 text-blue-800'
                                            }`}>
                                                {appt.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="4" className="text-center py-8 text-onyx/60">No appointments found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AppointmentsPage;
