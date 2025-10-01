# Automated Reminder System (Pseudo-code)

Automated reminders would be handled by a backend process, ideally a serverless function. With Supabase, this is perfectly suited for an **Edge Function** triggered by a **cron job**.

### 1. Supabase Cron Job (`pg_cron`)

First, schedule a function to run periodically (e.g., every 15 minutes).

```sql
-- Enable pg_cron extension in Supabase dashboard
-- Schedule a job to run every 15 minutes
SELECT cron.schedule(
  'send-reminders',
  '*/15 * * * *',
  $$
  SELECT net.http_post(
    url:='https://<YOUR_PROJECT_REF>.supabase.co/functions/v1/send-reminders',
    headers:='{"Content-Type": "application/json", "Authorization": "Bearer <YOUR_SUPABASE_ANON_KEY>"}'::jsonb,
    body:='{}'::jsonb
  )
  $$
);
```

### 2. Supabase Edge Function (`/supabase/functions/send-reminders/index.ts`)

This TypeScript function contains the core logic.

```typescript
// Import Supabase client and SendGrid/Twilio SDKs
import { createClient } from '@supabase/supabase-js';
import sendgrid from '@sendgrid/mail';
// import twilio from 'twilio';

// Set API keys from environment variables
sendgrid.setApiKey(Deno.env.get('SENDGRID_API_KEY'));
// const twilioClient = twilio(Deno.env.get('TWILIO_ACCOUNT_SID'), Deno.env.get('TWILIO_AUTH_TOKEN'));

Deno.serve(async (req) => {
  // 1. Create a Supabase admin client to bypass RLS
  const supabaseAdmin = createClient(
    Deno.env.get('SUPABASE_URL'),
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  );

  // 2. Define the time window for upcoming appointments (e.g., 24 hours from now)
  const now = new Date();
  const reminderWindowStart = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const reminderWindowEnd = new Date(reminderWindowStart.getTime() + 15 * 60 * 1000); // 15 min window to avoid re-sending

  // 3. Fetch appointments within the window that are 'Confirmed'
  const { data: appointments, error } = await supabaseAdmin
    .from('appointments')
    .select(`
      *,
      clients (name, email, phone)
    `)
    .eq('status', 'Confirmed')
    .gte('start_time', reminderWindowStart.toISOString())
    .lt('start_time', reminderWindowEnd.toISOString());

  if (error) {
    console.error('Error fetching appointments:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  if (!appointments || appointments.length === 0) {
    return new Response(JSON.stringify({ message: 'No reminders to send.' }), { status: 200 });
  }

  // 4. Iterate and send reminders
  for (const appt of appointments) {
    const client = appt.clients;
    if (!client) continue;

    // A. Send Email via SendGrid
    const emailMsg = {
      to: client.email,
      from: 'scheduling@clinicflow.com',
      subject: `Appointment Reminder: ${appt.procedure}`,
      text: `Hi ${client.name}, this is a reminder for your appointment tomorrow at ${new Date(appt.start_time).toLocaleTimeString()}.`,
      // html: '<strong>...</strong>',
    };
    await sendgrid.send(emailMsg);

    // B. (Optional) Send SMS via Twilio
    if (client.phone) {
      // await twilioClient.messages.create({
      //   body: `Reminder: Your appointment is tomorrow at ${new Date(appt.start_time).toLocaleTimeString()}.`,
      //   from: '+15017122661', // Your Twilio number
      //   to: client.phone
      // });
    }
  }

  return new Response(JSON.stringify({ message: `Sent ${appointments.length} reminders.` }), { status: 200 });
});
```
This provides a complete, serverless, and scalable solution for automated reminders.
