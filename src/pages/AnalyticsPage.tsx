import { ArrowUp, ArrowDown, DollarSign, BarChart, Users, XCircle, CheckCircle, Calendar as CalendarIcon } from 'lucide-react';

const AnalyticsStatCard = ({ title, value, change, changeType, icon: Icon }) => (
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
    // Mock data for demonstration
    return (
         <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-onyx">Analytics</h1>
                <p className="text-onyx/70">Business insights and performance metrics.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <AnalyticsStatCard title="Total Revenue" value="$12,450" change="+20.1%" changeType="increase" icon={DollarSign} />
                <AnalyticsStatCard title="New Clients" value="32" change="+12.5%" changeType="increase" icon={Users} />
                <AnalyticsStatCard title="Cancellation Rate" value="4.8%" change="-1.2%" changeType="decrease" icon={XCircle} />
                <AnalyticsStatCard title="Avg. Daily Appts" value="8" change="+5%" changeType="increase" icon={CalendarIcon} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="font-semibold text-onyx mb-4">This Month Overview</h2>
                    <div className="h-64 flex items-center justify-center text-onyx/50">
                        {/* Chart would go here */}
                        Chart Placeholder
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="font-semibold text-onyx mb-4">Popular Procedures</h2>
                     <div className="space-y-3">
                        {/* This would be dynamically generated */}
                        <div className="text-sm">
                            <div className="flex justify-between mb-1">
                                <p>Botox - 20 units</p>
                                <p className="font-semibold">35%</p>
                            </div>
                            <div className="w-full bg-seashell-700 rounded-full h-2">
                                <div className="bg-gold h-2 rounded-full" style={{width: '35%'}}></div>
                            </div>
                        </div>
                        <div className="text-sm">
                            <div className="flex justify-between mb-1">
                                <p>Juvederm Filler</p>
                                <p className="font-semibold">25%</p>
                            </div>
                            <div className="w-full bg-seashell-700 rounded-full h-2">
                                <div className="bg-gold h-2 rounded-full" style={{width: '25%'}}></div>
                            </div>
                        </div>
                        <div className="text-sm">
                            <div className="flex justify-between mb-1">
                                <p>Microneedling</p>
                                <p className="font-semibold">20%</p>
                            </div>
                            <div className="w-full bg-seashell-700 rounded-full h-2">
                                <div className="bg-gold h-2 rounded-full" style={{width: '20%'}}></div>
                            </div>
                        </div>
                     </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsPage;
