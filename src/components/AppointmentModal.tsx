import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { X } from 'lucide-react';
import { useCreateAppointment, useUpdateAppointment, useCancelAppointment, useSearchClients, useProcedures } from '../hooks/api';
import { AppointmentEvent } from '../types';

interface CalendarEventForModal {
    id?: number;
    start: Date;
    resource?: AppointmentEvent;
}

interface AppointmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    event: Partial<CalendarEventForModal> | null;
}

const appointmentSchema = z.object({
  client: z.object({ value: z.number(), label: z.string() }),
  procedure: z.object({ value: z.number(), label: z.string() }),
  scheduledAt: z.date(),
  notes: z.string().optional(),
});

type AppointmentFormData = z.infer<typeof appointmentSchema>;

const AppointmentModal = ({ isOpen, onClose, event }: AppointmentModalProps) => {
  const isEditing = !!event?.id;
  
  const { handleSubmit, control, reset, formState: { errors } } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
  });

  const createAppointment = useCreateAppointment();
  const updateAppointment = useUpdateAppointment();
  const cancelAppointment = useCancelAppointment();
  
  const [clientSearch, setClientSearch] = useState('');
  const { data: clientsData } = useSearchClients(clientSearch);
  const { data: proceduresData } = useProcedures();

  useEffect(() => {
    if (isOpen && event) {
      const defaultValues: Partial<AppointmentFormData> = {
        scheduledAt: event.start ? new Date(event.start) : new Date(),
      };
      if (isEditing && event.resource) {
        defaultValues.client = { value: event.resource.clients.id, label: event.resource.clients.name };
        defaultValues.procedure = { value: event.resource.procedures.id, label: event.resource.procedures.name };
        defaultValues.notes = event.resource.notes ?? '';
        setClientSearch(event.resource.clients.name);
      }
      reset(defaultValues);
    } else {
      reset({ scheduledAt: new Date(), notes: ''});
      setClientSearch('');
    }
  }, [event, isEditing, reset, isOpen]);
  
  const onSubmit = (data: AppointmentFormData) => {
    const payload = {
      procedure_id: data.procedure.value,
      scheduled_at: data.scheduledAt,
      notes: data.notes,
    };

    const mutationOptions = {
        onSuccess: () => {
            onClose();
        },
        onError: (error: Error) => {
            console.error("Failed to save appointment:", error.message);
            alert(`Error: ${error.message}`);
        }
    };

    if (isEditing && event?.id) {
      updateAppointment.mutate({ id: event.id, client_id: data.client.value, ...payload }, mutationOptions);
    } else {
      createAppointment.mutate({ client_id: data.client.value, ...payload }, mutationOptions);
    }
  };

  const handleCancel = () => {
    if (isEditing && event?.id && confirm('Are you sure you want to cancel this appointment?')) {
        cancelAppointment.mutate(event.id, { onSuccess: onClose });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-onyx/50 hover:text-onyx"><X size={24} /></button>
        <h2 className="text-2xl font-bold mb-4 text-onyx">{isEditing ? 'Edit' : 'New'} Appointment</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-onyx/80">Client</label>
              <Controller name="client" control={control} rules={{ required: true }}
                render={({ field }) => (
                  <Select {...field}
                    options={clientsData?.map(c => ({ value: c.id, label: `${c.name} (${c.email})` })) ?? []}
                    onInputChange={setClientSearch} isDisabled={isEditing} placeholder="Search for a client..."/>
                )}
              />
              {errors.client && <p className="text-indian-red text-xs mt-1">Client is required.</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-onyx/80">Procedure</label>
              <Controller name="procedure" control={control} rules={{ required: true }}
                render={({ field }) => (
                    <Select {...field} options={proceduresData?.map(p => ({ value: p.id, label: `${p.name} (${p.duration} min)` })) ?? []}/>
                )}
              />
              {errors.procedure && <p className="text-indian-red text-xs mt-1">Procedure is required.</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-onyx/80">Date & Time</label>
              <Controller name="scheduledAt" control={control} rules={{ required: true }}
                render={({ field }) => (
                  <DatePicker selected={field.value} onChange={field.onChange} showTimeSelect
                    dateFormat="MMMM d, yyyy h:mm aa"
                  />
                )}
              />
              {errors.scheduledAt && <p className="text-indian-red text-xs mt-1">Date & Time is required.</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-onyx/80">Notes</label>
              <textarea {...control.register('notes')} rows={3} className="w-full border border-input rounded-md shadow-sm p-2"/>
            </div>

            <div className="pt-4 flex justify-between items-center">
              <div>
                <button type="submit" className="bg-indian-red text-white px-4 py-2 rounded-md hover:bg-indian-red/90 disabled:bg-gray-400">
                  {isEditing ? 'Save Changes' : 'Create Appointment'}
                </button>
                <button type="button" onClick={onClose} className="ml-2 bg-onyx/10 text-onyx px-4 py-2 rounded-md hover:bg-onyx/20">
                  Close
                </button>
              </div>
              {isEditing && (
                <button type="button" onClick={handleCancel} className="bg-indian-red text-white px-4 py-2 rounded-md hover:bg-indian-red/90">
                    Cancel Appointment
                </button>
              )}
            </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentModal;
