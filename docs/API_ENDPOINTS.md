# API Endpoints & Payloads

We interact with the database via the `@supabase/supabase-js` client library. Below are the conceptual endpoints and their corresponding Supabase JS calls and JSON payloads.

### 1. Clients

**GET `/clients`** (Fetch clients, with optional search)
- **Description**: Retrieves a list of clients. Can be filtered by name.
- **Supabase JS**:
  ```javascript
  let query = supabase.from('clients').select('*');
  if (searchTerm) {
    query = query.ilike('name', `%${searchTerm}%`);
  }
  const { data, error } = await query;
  ```

**POST `/clients`** (Create a new client)
- **Description**: Adds a new client to the database.
- **Supabase JS**:
  ```javascript
  const { data, error } = await supabase
    .from('clients')
    .insert([clientData])
    .select();
  ```
- **Example Payload**:
  ```json
  {
    "name": "Sarah Connor",
    "email": "sarah.connor@email.com",
    "phone": "555-0102"
  }
  ```

### 2. Appointments

**GET `/appointments`** (Fetch appointments for a date range)
- **Description**: Retrieves appointments within a specific start and end date.
- **Supabase JS**:
  ```javascript
  const { data, error } = await supabase
    .from('appointments')
    .select('*, clients (id, name)')
    .gte('start_time', startDate.toISOString())
    .lte('end_time', endDate.toISOString());
  ```

**POST `/appointments`** (Create a new appointment)
- **Description**: Schedules a new appointment for a client.
- **Supabase JS**:
  ```javascript
  const { data, error } = await supabase
    .from('appointments')
    .insert([appointmentData])
    .select();
  ```
- **Example Payload**:
  ```json
  {
    "client_id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    "procedure": "Consultation",
    "start_time": "2025-06-15T10:00:00Z",
    "end_time": "2025-06-15T10:30:00Z",
    "notes": "Discuss recent test results."
  }
  ```

**PUT `/appointments/:id`** (Update an appointment)
- **Description**: Modifies an existing appointment (e.g., reschedule, change status).
- **Supabase JS**:
  ```javascript
  const { data, error } = await supabase
    .from('appointments')
    .update(updateData)
    .eq('id', appointmentId)
    .select();
  ```
- **Example Payload**:
  ```json
  {
    "status": "Cancelled",
    "notes": "Client cancelled due to conflict."
  }
  ```
