import React, { useState, useMemo } from 'react';
import moment from 'moment';
import { useClients, useAppointmentsByClient } from '../hooks/api';
import { PlusCircle, Search, X } from 'lucide-react';
import { Client } from '../types';
import NewClientModal from '../components/NewClientModal';

const PastAppointmentsModal = ({ isOpen, onClose, client }) => {
    const { data: appointments, isLoading } = useAppointmentsByClient(client?.id);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl relative">
                <button onClick={onClose} className="absolute top-3 right-3 text-onyx/50 hover:text-onyx"><X size={24} /></button>
                <h2 className="text-2xl font-bold mb-4 text-onyx">Appointment History for {client?.name}</h2>
                <div className="max-h-[60vh] overflow-y-auto">
                    <table className="min-w-full">
                        <thead className="sticky top-0 bg-seashell-600">
                             <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-onyx/70 uppercase">Date</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-onyx/70 uppercase">Procedure</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-onyx/70 uppercase">Status</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-onyx/70 uppercase">Payment</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-onyx/10">
                            {isLoading ? (
                                <tr><td colSpan="4" className="text-center py-8 text-onyx/60">Loading history...</td></tr>
                            ) : appointments && appointments.length > 0 ? (
                                appointments.map(appt => (
                                    <tr key={appt.id}>
                                        <td className="px-4 py-3 text-sm">{moment(appt.scheduled_at).format('MMM D, YYYY')}</td>
                                        <td className="px-4 py-3 text-sm">{appt.procedures.name}</td>
                                        <td className="px-4 py-3 text-sm">{appt.status === 'COMPLETED' ? 'Attended' : 'No Show'}</td>
                                        <td className="px-4 py-3 text-sm">{Math.random() > 0.5 ? 'Received' : 'Pending'}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="4" className="text-center py-8 text-onyx/60">No past appointments found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};


const ClientsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewClientModalOpen, setNewClientModalOpen] = useState(false);
  const [isHistoryModalOpen, setHistoryModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const { data: clients, isLoading, error, refetch } = useClients();

  const filteredClients = useMemo(() => {
    if (!clients) return [];
    if (!searchQuery) return clients;
    return clients.filter(c => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [clients, searchQuery]);

  const handleViewHistory = (client: Client) => {
      setSelectedClient(client);
      setHistoryModalOpen(true);
  };

  return (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <div>
                 <h1 className="text-3xl font-bold text-onyx">Clients</h1>
                <p className="text-onyx/70">Your client database.</p>
            </div>
            <button 
                onClick={() => setNewClientModalOpen(true)}
                className="flex items-center gap-2 bg-indian-red text-white px-4 py-2 rounded-lg shadow-sm hover:bg-indian-red/90 transition-colors font-semibold">
                <PlusCircle size={20} /> New Client
            </button>
        </div>
        
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-onyx/50" />
            <input 
                type="text" 
                placeholder="Search by name or email..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full max-w-md p-2 pl-10 border border-input rounded-lg bg-white"
            />
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-onyx/10">
                    <thead className="bg-seashell-600">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-onyx/70 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-onyx/70 uppercase tracking-wider">Contact</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-onyx/70 uppercase tracking-wider">Member Since</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-onyx/70 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-onyx/10">
                        {isLoading && <tr><td colSpan={4} className="text-center py-8 text-onyx/60">Loading clients...</td></tr>}
                        {error && <tr><td colSpan={4} className="text-center py-8 text-indian-red">Error fetching clients.</td></tr>}
                        {filteredClients && filteredClients.map((client) => (
                            <tr key={client.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 flex-shrink-0">
                                            <img className="h-10 w-10 rounded-full" src={`https://i.pravatar.cc/40?u=${client.email}`} alt="" />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-onyx">{client.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                     <div className="text-sm text-onyx/80">{client.email}</div>
                                     <div className="text-sm text-onyx/60">{client.phone ?? 'N/A'}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-onyx/80">{moment(client.created_at).format('MMMM D, YYYY')}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <button 
                                        onClick={() => handleViewHistory(client)}
                                        className="bg-gold text-onyx px-3 py-1 rounded-md hover:bg-gold/90 text-xs font-semibold"
                                    >
                                        Past Appointments
                                    </button>
                                </td>
                            </tr>
                        ))}
                         {!isLoading && filteredClients?.length === 0 && (
                            <tr><td colSpan={4} className="text-center py-8 text-onyx/60">No clients found.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
        <NewClientModal 
            isOpen={isNewClientModalOpen} 
            onClose={() => setNewClientModalOpen(false)}
            onClientCreated={() => {
                setNewClientModalOpen(false);
                refetch();
            }}
        />
        <PastAppointmentsModal 
            isOpen={isHistoryModalOpen}
            onClose={() => setHistoryModalOpen(false)}
            client={selectedClient}
        />
    </div>
  );
};

export default ClientsPage;
