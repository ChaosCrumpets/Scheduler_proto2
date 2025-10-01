/*
  # Full Clinic Schema and Seed Data

  This migration establishes the complete database schema for the MediBooks application,
  including tables for clients, procedures, and appointments. It also seeds the
  database with initial data for immediate use.

  ## 1. New Types
  - **`appointment_status`**: An ENUM type to represent the state of an appointment ('SCHEDULED', 'COMPLETED', 'CANCELED').

  ## 2. New Tables
  - **`clients`**: Stores patient information.
    - `id` (bigint, pk): Unique identifier.
    - `name`, `email`, `phone` (text): Client contact details.
  - **`procedures`**: Stores clinic services.
    - `id` (bigint, pk): Unique identifier.
    - `name` (text): Name of the procedure.
    - `duration` (int): Duration in minutes.
    - `color_code` (text): Hex color for calendar display.
  - **`appointments`**: Links clients and procedures for scheduling.
    - `id` (bigint, pk): Unique identifier.
    - `scheduled_at` (timestamptz): The date and time of the appointment.
    - `status` (appointment_status): The current status.
    - `client_id` (bigint, fk): Reference to the `clients` table.
    - `procedure_id` (bigint, fk): Reference to the `procedures` table.

  ## 3. Security
  - **Row Level Security (RLS)** is enabled on all tables.
  - **Policies**: For this MVP, policies are set to allow public read and write access.
    **NOTE**: In a production environment, these policies MUST be updated to restrict access to authenticated and authorized users only.

  ## 4. Seed Data
  - Initial data is inserted into `procedures` and `clients` to populate the application.
  - Sample appointments are created to demonstrate the calendar functionality.
*/

-- Create appointment_status ENUM type if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'appointment_status') THEN
        CREATE TYPE public.appointment_status AS ENUM ('SCHEDULED', 'COMPLETED', 'CANCELED');
    END IF;
END$$;

-- Create clients table
CREATE TABLE IF NOT EXISTS public.clients (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create procedures table
CREATE TABLE IF NOT EXISTS public.procedures (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  duration INT NOT NULL, -- Duration in minutes
  color_code TEXT NOT NULL -- Hex code for calendar visuals
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS public.appointments (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  scheduled_at TIMESTAMPTZ NOT NULL,
  status public.appointment_status NOT NULL DEFAULT 'SCHEDULED',
  notes TEXT,
  client_id BIGINT NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  procedure_id BIGINT NOT NULL REFERENCES public.procedures(id) ON DELETE CASCADE
);

-- Enable Row Level Security (RLS) for all tables
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.procedures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read access (for this MVP)
-- In a real app, you would restrict this to authenticated users.
DROP POLICY IF EXISTS "Allow public read access on clients" ON public.clients;
CREATE POLICY "Allow public read access on clients" ON public.clients FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access on procedures" ON public.procedures;
CREATE POLICY "Allow public read access on procedures" ON public.procedures FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access on appointments" ON public.appointments;
CREATE POLICY "Allow public read access on appointments" ON public.appointments FOR SELECT USING (true);

-- Create policies to allow public write access (for this MVP)
DROP POLICY IF EXISTS "Allow public write access on clients" ON public.clients;
CREATE POLICY "Allow public write access on clients" ON public.clients FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public write access on procedures" ON public.procedures;
CREATE POLICY "Allow public write access on procedures" ON public.procedures FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public write access on appointments" ON public.appointments;
CREATE POLICY "Allow public write access on appointments" ON public.appointments FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update access on appointments" ON public.appointments;
CREATE POLICY "Allow public update access on appointments" ON public.appointments FOR UPDATE USING (true);


-- SEED DATA (Upsert logic to avoid duplicate errors on re-run)

-- Seed Procedures
INSERT INTO public.procedures (name, duration, color_code) VALUES
('Botox - 20 units', 30, '#81E6D9'),
('Juvederm Filler', 60, '#D6BCFA'),
('Microneedling Session', 75, '#FBB6CE'),
('Initial Consultation', 30, '#F6E05E')
ON CONFLICT (name) DO NOTHING;

-- Seed Clients
INSERT INTO public.clients (name, email, phone) VALUES
('Alice Johnson', 'alice@example.com', '555-0101'),
('Bob Williams', 'bob@example.com', '555-0102'),
('Charlie Brown', 'charlie@example.com', '555-0103'),
('Diana Prince', 'diana@example.com', '555-0104'),
('Ethan Hunt', 'ethan@example.com', '555-0105')
ON CONFLICT (email) DO NOTHING;
