import React from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Users, Calendar, AlertTriangle, CheckCircle } from 'lucide-react';

const data = [
  { name: 'Jan', appointments: 65, cancellations: 5 },
  { name: 'Feb', appointments: 59, cancellations: 8 },
  { name: 'Mar', appointments: 80, cancellations: 12 },
  { name: 'Apr', appointments: 81, cancellations: 7 },
  { name: 'May', appointments: 56, cancellations: 4 },
  { name: 'Jun', appointments: 55, cancellations: 6 },
];

const AnalyticsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground mt-1">Key metrics and performance insights.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={Calendar} title="Total Appointments" value="1,287" change="+5.4%" />
        <StatCard icon={Users} title="New Clients" value="42" change="+12.1%" />
        <StatCard icon={AlertTriangle} title="Cancellation Rate" value="8.2%" change="-1.2%" isNegative />
        <StatCard icon={CheckCircle} title="Show-up Rate" value="91.8%" change="+0.8%" />
      </div>

      <div className="bg-background p-6 rounded-lg shadow-sm border border-border">
        <h2 className="text-xl font-semibold text-foreground/90 mb-4">Appointments Overview</h2>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="appointments" fill="#d0b361" name="Appointments" />
              <Bar dataKey="cancellations" fill="#ee6352" name="Cancellations" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, title, value, change, isNegative = false }) => (
  <div className="bg-background p-5 rounded-lg shadow-sm border border-border">
    <div className="flex items-center">
      <div className="p-3 rounded-full bg-primary/10 text-primary">
        <Icon className="h-6 w-6" />
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <p className="text-2xl font-semibold text-foreground">{value}</p>
      </div>
    </div>
    <p className={`text-sm mt-2 ${isNegative ? 'text-destructive' : 'text-green-500'}`}>
      {change} vs last month
    </p>
  </div>
);

export default AnalyticsPage;
