import React, { useState, useMemo, useCallback } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { PlusCircle, ArrowUp, ArrowDown, DollarSign, BarChart, Send, Users, Calendar as CalendarIcon } from 'lucide-react';
import { useAppointments } from '../hooks/api';
import AppointmentModal from '../components/AppointmentModal';

const localizer = momentLocalizer(moment);

// A small component for the stat cards
const StatCard = ({ title, value, change, changeType, icon: Icon, iconBgColor }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm flex items-start justify-between">
        <div>
            <p className="text-sm text-onyx/70">{title}</p>
            <p className="text-2xl font-bold text-onyx mt-1">{value}</p>
            <div className={`text-xs mt-2 flex items-center ${changeType === 'increase' ? 'text-green-600' : 'text-red-500'}`}>
                {changeType === 'increase' ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                <span>{change} from last month</span>
            </div>
        </div>
        <div className={`p-2 rounded-lg ${iconBgColor}`}>
            <Icon className="h-5 w-5 text-onyx/80" />
        </div>
    </div>
);


const DashboardPage = () => {
  const [date, setDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Simplified data fetching for the entire month for the calendar
  const { data: appointments, isLoading, refetch } = useAppointments(moment(date).startOf('month').toDate(), moment(date).endOf('month').toDate());

  const events = useMemo(() => {
    return (appointments ?? []).map((appt) => ({
      id: appt.id,
      title: `${appt.clients.name}`,
      start: new Date(appt.scheduled_at),
      end: moment(appt.scheduled_at).add(appt.procedures.duration, 'minutes').toDate(),
      resource: appt,
    }));
  }, [appointments]);

  const todaysAppointments = useMemo(() => {
      return (appointments ?? []).filter(appt => moment(appt.scheduled_at).isSame(new Date(), 'day'));
  }, [appointments]);

  const handleNavigate = useCallback((newDate) => setDate(newDate), []);
  const handleSelectSlot = useCallback((slotInfo) => {
    setSelectedSlot({ start: slotInfo.start });
    setIsModalOpen(true);
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSlot(null);
    refetch();
  };

  return (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-3xl font-bold text-onyx">Dashboard</h1>
                <p className="text-onyx/70">Manage your clinic appointments and schedule.</p>
            </div>
            <div className="flex items-center gap-4">
                <p className="text-sm text-onyx/80 hidden md:block">{moment().format('dddd, MMMM D, YYYY')}</p>
                <button 
                    onClick={() => handleSelectSlot({ start: new Date() })}
                    className="flex items-center gap-2 bg-gold text-onyx px-4 py-2 rounded-lg shadow-sm hover:bg-gold/90 transition-colors font-semibold"
                >
                    <PlusCircle size={20} /> New Appointment
                </button>
            </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Today's Appointments" value={todaysAppointments.length} change="+15%" changeType="increase" icon={CalendarIcon} iconBgColor="bg-peach-yellow/50" />
            <StatCard title="This Week" value="8" change="-8%" changeType="decrease" icon={BarChart} iconBgColor="bg-peach-yellow/50" />
            <StatCard title="No-Show Rate" value="0.0%" change="-1.2%" changeType="decrease" icon={Users} iconBgColor="bg-peach-yellow/50" />
            <StatCard title="Revenue Today" value="$0" change="+22%" changeType="increase" icon={DollarSign} iconBgColor="bg-peach-yellow/50" />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow-lg h-[60vh]">
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: '100%' }}
                    date={date}
                    onNavigate={handleNavigate}
                    onSelectSlot={handleSelectSlot}
                    selectable
                    views={['month', 'week', 'day']}
                    view='month'
                />
            </div>
            <div className="space-y-6">
                <div className="bg-white p-4 rounded-lg shadow-lg">
                    <h3 className="font-semibold text-onyx mb-3">Today's Appointments</h3>
                    {todaysAppointments.length > 0 ? (
                        <ul className="space-y-2">
                            {todaysAppointments.map(appt => (
                                <li key={appt.id} className="text-sm p-2 rounded-md bg-seashell-600">
                                    <p className="font-medium">{appt.clients.name}</p>
                                    <p className="text-onyx/70">{appt.procedures.name} at {moment(appt.scheduled_at).format('h:mm A')}</p>
                                </li>
                            ))}
                        </ul>
                    ) : <p className="text-sm text-onyx/60">No appointments scheduled for today.</p>}
                </div>
                 <div className="bg-white p-4 rounded-lg shadow-lg">
                    <h3 className="font-semibold text-onyx mb-3">Quick Actions</h3>
                    <div className="space-y-2">
                        <button className="w-full text-left flex items-center gap-2 p-2 rounded-md hover:bg-seashell-600 transition-colors">
                            <Send size={16} className="text-onyx/70"/> Send Reminders
                        </button>
                         <button className="w-full text-left flex items-center gap-2 p-2 rounded-md hover:bg-seashell-600 transition-colors">
                            <BarChart size={16} className="text-onyx/70"/> View Reports
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <AppointmentModal isOpen={isModalOpen} onClose={closeModal} event={selectedSlot} />
    </div>
  );
};

export default DashboardPage;
