import React, { useState, useMemo } from 'react';
import moment from 'moment';
import { useClients } from '../hooks/api';

const ClientsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: clients, isLoading, error } = useClients();

  const filteredClients = useMemo(() => {
    if (!clients) return [];
    if (!searchQuery) return clients;
    return clients.filter(c => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [clients, searchQuery]);

  return (
    <div className="p-4 md:p-6">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-onyx">Client Management</h1>
            <button className="bg-indian-red text-white px-4 py-2 rounded-lg shadow hover:bg-indian-red/90 transition">
                Add Client
            </button>
        </div>
        <div className="mb-4">
            <input type="text" placeholder="Search by name or email..." value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full max-w-md p-2 border border-input rounded-lg bg-white"
            />
        </div>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-onyx/10">
                    <thead className="bg-seashell-600">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-onyx/70 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-onyx/70 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-onyx/70 uppercase tracking-wider">Phone</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-onyx/70 uppercase tracking-wider">Member Since</th>
                             <th className="px-6 py-3 text-left text-xs font-medium text-onyx/70 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-onyx/10">
                        {isLoading && <tr><td colSpan={5} className="text-center py-4">Loading...</td></tr>}
                        {error && <tr><td colSpan={5} className="text-center py-4 text-indian-red">Error fetching clients.</td></tr>}
                        {filteredClients.map((client) => (
                            <tr key={client.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-onyx">{client.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-onyx/80">{client.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-onyx/80">{client.phone ?? 'N/A'}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-onyx/80">{moment(client.created_at).format('MMMM D, YYYY')}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <button className="bg-gold text-onyx px-3 py-1 rounded-md hover:bg-gold/90">View Details</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
};

export default ClientsPage;
