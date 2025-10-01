import React, { useState, useMemo, useCallback } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { PlusCircle } from 'lucide-react';
import { useAppointments } from '../hooks/api';
import AppointmentModal from '../components/AppointmentModal';
import { AppointmentEvent } from '../types';

const localizer = momentLocalizer(moment);

const DashboardPage = () => {
  const [dateRange, setDateRange] = useState({
    start: moment().startOf('month').toDate(),
    end: moment().endOf('month').toDate(),
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

  const { data: appointments, isLoading, refetch } = useAppointments(dateRange.start, dateRange.end);

  const events = useMemo(() => {
    return (appointments ?? []).map((appt) => ({
      id: appt.id,
      title: `${appt.clients.name} - ${appt.procedures.name}`,
      start: new Date(appt.scheduled_at),
      end: moment(appt.scheduled_at).add(appt.procedures.duration, 'minutes').toDate(),
      resource: appt,
    }));
  }, [appointments]);

  const handleNavigate = useCallback((newDate: Date) => {
    const newStart = moment(newDate).startOf('month').startOf('week').toDate();
    const newEnd = moment(newDate).endOf('month').endOf('week').toDate();
    setDateRange({ start: newStart, end: newEnd });
  }, []);

  const handleSelectSlot = useCallback(({ start }: { start: Date }) => {
    setSelectedEvent({ start });
    setIsModalOpen(true);
  }, []);

  const handleSelectEvent = useCallback((event: (typeof events)[0]) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  }, []);

  const eventStyleGetter = (event: (typeof events)[0]) => {
    // Example of using different colors. You can add logic here.
    const backgroundColor = event.id % 2 === 0 ? '#f6f0e0' : '#eadfbe'; // gold-900 or peach-yellow-700
    return { style: { backgroundColor, color: '#3a3c41', borderRadius: '5px', border: 'none', opacity: 0.8 } };
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    refetch(); // Refetch appointments when modal closes
  };

  return (
    <div className="p-4 md:p-6 h-screen flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-onyx">Dashboard</h1>
        <button onClick={() => handleSelectSlot({ start: new Date() })}
          className="flex items-center gap-2 bg-indian-red text-white px-4 py-2 rounded-lg shadow hover:bg-indian-red/90 transition">
          <PlusCircle size={20} /> New Appointment
        </button>
      </div>
      <div className="flex-grow h-[75vh] bg-white p-4 rounded-lg shadow-lg">
        {isLoading ? <p>Loading appointments...</p> : (
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '100%' }}
                defaultView="week"
                onNavigate={handleNavigate}
                onSelectSlot={handleSelectSlot}
                onSelectEvent={handleSelectEvent}
                eventPropGetter={eventStyleGetter}
                selectable={true}
            />
        )}
      </div>
      <AppointmentModal isOpen={isModalOpen} onClose={closeModal} event={selectedEvent} />
    </div>
  );
};

export default DashboardPage;
