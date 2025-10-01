import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import moment from 'https://deno.land/x/momentjs@2.29.1-deno/mod.ts';

// NOTE: You must set these as environment variables in your Supabase project
// Go to Project Settings > Edge Functions > Add new secret
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')!;
// You'll need a service that sends emails, like Resend.
// const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!;

serve(async (_req) => {
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    const tomorrowStart = moment().add(1, 'day').startOf('day').toISOString();
    const tomorrowEnd = moment().add(1, 'day').endOf('day').toISOString();

    const { data: appointments, error } = await supabase
      .from('appointments')
      .select(`
        scheduled_at,
        clients (name, email),
        procedures (name)
      `)
      .gte('scheduled_at', tomorrowStart)
      .lte('scheduled_at', tomorrowEnd)
      .eq('status', 'SCHEDULED');

    if (error) {
      throw error;
    }

    if (!appointments || appointments.length === 0) {
      return new Response(JSON.stringify({ message: "No appointments to remind." }), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      });
    }

    // In a real application, you would loop through appointments and send emails.
    // This is a placeholder for the email sending logic.
    console.log(`Found ${appointments.length} appointments for tomorrow.`);

    for (const appt of appointments) {
      // Type guard to ensure relations are not null
      if (!appt.clients || !appt.procedures) continue;

      const clientName = appt.clients.name;
      const clientEmail = appt.clients.email;
      const procedureName = appt.procedures.name;
      const time = moment(appt.scheduled_at).format('h:mm A');
      const date = moment(appt.scheduled_at).format('MMMM Do, YYYY');

      const emailSubject = `Appointment Reminder for ${date}`;
      const emailBody = `Hi ${clientName}, this is a reminder for your ${procedureName} appointment on ${date} at ${time}.`;

      console.log(`--- SIMULATING EMAIL ---`);
      console.log(`To: ${clientEmail}`);
      console.log(`Subject: ${emailSubject}`);
      console.log(`Body: ${emailBody}`);
      console.log(`------------------------`);

      // Example using Resend (you would need to import and configure it)
      // await fetch('https://api.resend.com/emails', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${RESEND_API_KEY}`
      //   },
      //   body: JSON.stringify({
      //     from: 'MediBooks <reminders@yourdomain.com>',
      //     to: [clientEmail],
      //     subject: emailSubject,
      //     html: `<p>${emailBody}</p>`,
      //   }),
      // });
    }

    return new Response(JSON.stringify({ message: `Successfully processed ${appointments.length} reminders.` }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (err) {
    return new Response(String(err?.message ?? err), { status: 500 });
  }
});
