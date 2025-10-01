export interface Client {
  id: number;
  name: string;
  email: string;
  phone?: string;
  created_at: string;
}

export interface Procedure {
  id: number;
  name: string;
  duration: number; // in minutes
  color_code: string;
}

export interface Appointment {
  id: number;
  scheduled_at: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELED';
  notes?: string;
  client_id: number;
  procedure_id: number;
  clients: Client;
  procedures: Procedure;
}

export type AppointmentEvent = Appointment;
