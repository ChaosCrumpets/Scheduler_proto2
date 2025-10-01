# Database Schema (PostgreSQL)

This document outlines the database schema for the Clinic Scheduling App. We use two primary tables: `clients` and `appointments`.

### Table: `clients`
Stores information about each client.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | `uuid` | `PRIMARY KEY`, `DEFAULT gen_random_uuid()` | Unique identifier for the client. |
| `name` | `text` | `NOT NULL` | Full name of the client. |
| `email` | `text` | `NOT NULL`, `UNIQUE` | Client's email address. |
| `phone` | `text` | | Client's phone number (optional). |
| `created_at` | `timestamptz` | `DEFAULT now()` | Timestamp of when the client was created. |

### Table: `appointments`
Stores information about each appointment.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | `uuid` | `PRIMARY KEY`, `DEFAULT gen_random_uuid()` | Unique identifier for the appointment. |
| `client_id` | `uuid` | `FOREIGN KEY` references `clients(id)` | Links to the client for this appointment. |
| `procedure` | `text` | | The type of procedure (e.g., 'Consultation'). |
| `start_time` | `timestamptz` | `NOT NULL` | The start date and time of the appointment. |
| `end_time` | `timestamptz` | `NOT NULL` | The end date and time of the appointment. |
| `notes` | `text` | | Any notes related to the appointment. |
| `status` | `text` | `DEFAULT 'Confirmed'` | Status: 'Confirmed', 'Completed', 'Cancelled', 'No-Show'. |
| `created_at` | `timestamptz` | `DEFAULT now()` | Timestamp of when the appointment was created. |

---

### SQL Migration File

The following SQL can be used to create these tables and enable Row Level Security.
