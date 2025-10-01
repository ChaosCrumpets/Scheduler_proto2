/*
  # Initial Schema: Clients and Appointments

  This migration sets up the initial database schema for the clinic scheduling application.

  ## 1. New Tables

  - **`clients`**: Stores patient information.
    - `id` (uuid, pk): Unique identifier for the client.
    - `name` (text): The client's full name.
    - `email` (text): The client's email, used for communication.
    - `phone` (text): The client's phone number.
    - `created_at` (timestamptz): Timestamp of creation.

  - **`appointments`**: Stores appointment details.
    - `id` (uuid, pk): Unique identifier for the appointment.
    - `client_id` (uuid, fk): A reference to the `clients` table.
    - `procedure` (text): The type of procedure.
    - `start_time` (timestamptz): The start time of the appointment.
    - `end_time` (timestamptz): The end time of the appointment.
    - `notes` (text): Optional notes.
    - `status` (text): The current status of the appointment.
    - `created_at` (timestamptz): Timestamp of creation.

  ## 2. Security

  - **Row Level Security (RLS)** is enabled on both tables.
  - **Policies**: Basic policies are added to allow authenticated users to manage their own data. In a real multi-tenant app, you would add checks for organization or clinic ID.
    - `clients`: Authenticated users can perform all operations.
    - `appointments`: Authenticated users can perform all operations.
*/

-- Create clients table
CREATE TABLE IF NOT EXISTS public.clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  phone text,
  created_at timestamptz DEFAULT now()
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS public.appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  procedure text,
  start_time timestamptz NOT NULL,
  end_time timestamptz NOT NULL,
  notes text,
  status text DEFAULT 'Confirmed'::text,
  created_at timestamptz DEFAULT now()
);

-- Add comments for clarity
COMMENT ON TABLE public.clients IS 'Stores client information.';
COMMENT ON TABLE public.appointments IS 'Stores appointment details.';

-- Enable Row Level Security
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- In a real app, you'd scope this to a user's organization or clinic.
-- For this MVP, we'll allow any authenticated user to manage all data.
CREATE POLICY "Allow all access to authenticated users on clients"
  ON public.clients
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all access to authenticated users on appointments"
  ON public.appointments
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
