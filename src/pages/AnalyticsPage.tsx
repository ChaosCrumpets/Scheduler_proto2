import React from 'react';
import { ArrowUp, ArrowDown, DollarSign, BarChart, Users, XCircle, CheckCircle, Calendar } from 'lucide-react';

const StatCard = ({ title, value, change, changeType, icon: Icon, iconBgColor }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm">
        <p className="text-sm text-onyx/70 font-medium">{title}</p>
        <p className="text-3xl font-bold text-onyx mt-2">{value}</p>
        <div className={`text-xs mt-2 flex items-center ${changeType === 'increase' ? 'text-green-600' : 'text-red-500'}`}>
            {changeType === 'increase' ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
            <span>{change} from last period</span>
        </div>
    </div>
);

const AnalyticsPage = () => {
    return (
         <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-onyx">Analytics</h1>
                <p className="text-onyx/70">Business insights and performance metrics.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Today's Appointments" value="0" change="+15%" changeType="increase" icon={Calendar} />
                <StatCard title="No-Show Rate" value="0.0%" change="-1.2%" changeType="decrease" icon={XCircle} />
                <StatCard title="Revenue Today" value="$0" change="+22%" changeType="increase" icon={DollarSign} />
                 <StatCard title="This Week" value="0" change="-8%" changeType="decrease" icon={BarChart} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="font-semibold text-onyx mb-4">This Month Overview</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <p className="text-onyx/80">Total Appointments</p>
                            <p className="font-bold text-onyx">0</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-onyx/80">Completed</p>
                            <p className="font-bold text-green-600">0 (0%)</p>
                        </div>
                         <div className="flex justify-between items-center">
                            <p className="text-onyx/80">No Shows</p>
                            <p className="font-bold text-red-500">0 (0%)</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="font-semibold text-onyx mb-4">Popular Procedures</h2>
                     <div className="space-y-3">
                        <p className="text-center text-sm text-onyx/60 pt-8">No procedure data available.</p>
                     </div>
                </div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Avg. Daily Appointments" value="0" change="+5%" changeType="increase" icon={Calendar} />
                <StatCard title="Unique Clients" value="0" change="+10%" changeType="increase" icon={Users} />
                <StatCard title="Completion Rate" value="0%" change="+2%" changeType="increase" icon={CheckCircle} />
            </div>
        </div>
    );
};

export default AnalyticsPage;
