import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { AppointmentEvent, Client, Procedure } from '../types';

// HOOK: Fetch appointments within a date range
export const useAppointments = (start: Date, end: Date) => {
  return useQuery({
    queryKey: ['appointments', start, end],
    queryFn: async (): Promise<AppointmentEvent[]> => {
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          clients (*),
          procedures (*)
        `)
        .gte('scheduled_at', start.toISOString())
        .lte('scheduled_at', end.toISOString())
        .not('status', 'eq', 'CANCELED');

      if (error) throw new Error(error.message);
      return data || [];
    },
  });
};

// HOOK: Fetch all procedures
export const useProcedures = () => {
  return useQuery({
    queryKey: ['procedures'],
    queryFn: async (): Promise<Procedure[]> => {
      const { data, error } = await supabase.from('procedures').select('*');
      if (error) throw new Error(error.message);
      return data || [];
    }
  });
};

// HOOK: Fetch all clients
export const useClients = () => {
    return useQuery({
        queryKey: ['clients'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('clients')
                .select('*')
                .order('name', { ascending: true });
            if (error) throw new Error(error.message);
            return data || [];
        }
    });
};

// HOOK: Search for clients
export const useSearchClients = (searchTerm: string) => {
  return useQuery({
    queryKey: ['clients', searchTerm],
    queryFn: async (): Promise<Client[]> => {
      if (!searchTerm) return [];
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .or(`name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%`)
        .limit(10);
      if (error) throw new Error(error.message);
      return data || [];
    },
    enabled: !!searchTerm,
  });
};

// HOOK: Create a new appointment
export const useCreateAppointment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newAppointment: { client_id: number, procedure_id: number, scheduled_at: Date, notes?: string }) => {
            const { data, error } = await supabase.from('appointments').insert(newAppointment).select();
            if (error) throw new Error(error.message);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['appointments'] });
        },
    });
};

// HOOK: Update an appointment
export const useUpdateAppointment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (updatedAppointment: { id: number, client_id: number, procedure_id: number, scheduled_at: Date, notes?: string }) => {
            const { id, ...updateData } = updatedAppointment;
            const { data, error } = await supabase.from('appointments').update(updateData).eq('id', id).select();
            if (error) throw new Error(error.message);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['appointments'] });
        },
    });
};

// HOOK: Cancel an appointment
export const useCancelAppointment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (appointmentId: number) => {
            const { data, error } = await supabase
                .from('appointments')
                .update({ status: 'CANCELED' })
                .eq('id', appointmentId);
            if (error) throw new Error(error.message);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['appointments'] });
        },
    });
};
