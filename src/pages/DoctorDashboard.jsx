import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, Clock, CheckCircle, XCircle, MoreVertical, MessageSquare } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { SummaryCard } from '../components/dashboard/SummaryCard';

const AppointmentRequest = ({ name, time, type, img, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex items-center justify-between gap-4"
    >
        <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-slate-200" />
            <div>
                <h4 className="font-bold text-slate-800">{name}</h4>
                <p className="text-sm text-slate-500">{type}</p>
                <div className="flex items-center gap-1 text-xs text-primary-600 font-medium mt-1">
                    <Clock size={12} /> {time}
                </div>
            </div>
        </div>
        <div className="flex gap-2">
            <button className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors">
                <CheckCircle size={24} />
            </button>
            <button className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors">
                <XCircle size={24} />
            </button>
        </div>
    </motion.div>
);

const ScheduleItem = ({ time, patient, type }) => (
    <div className="flex gap-4 relative pl-4 pb-8 last:pb-0 border-l border-slate-200 last:border-0 ml-2">
        <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-primary-500 ring-4 ring-white" />
        <span className="text-sm font-semibold text-slate-400 w-16 shrink-0 pt-0.5">{time}</span>
        <div className="flex-1 bg-primary-50 p-3 rounded-xl -mt-2 hover:bg-primary-100 transition-colors cursor-pointer group">
            <div className="flex justify-between items-start">
                <h4 className="font-bold text-slate-800 group-hover:text-primary-800">{patient}</h4>
                <span className="text-xs font-semibold bg-white/50 px-2 py-0.5 rounded text-primary-700">{type}</span>
            </div>
            <div className="flex gap-2 mt-2">
                <button className="text-xs flex items-center gap-1 text-primary-600 font-medium hover:underline">
                    <MessageSquare size={12} /> Chat
                </button>
                <button className="text-xs flex items-center gap-1 text-primary-600 font-medium hover:underline">
                    View Profile
                </button>
            </div>
        </div>
    </div>
);

import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export const DoctorDashboard = () => {
    const { user, loading } = useAuth();
    const [isAvailable, setIsAvailable] = useState(true);

    if (loading) return <div className="p-10 text-center">Loading...</div>;
    if (!user) return <Navigate to="/login" />;

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-6 pb-12">
            <div className="flex flex-col md:flex-row items-end justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Dr. {user.firstName} {user.lastName}</h1>
                    <p className="text-slate-500">Cardiologist • MBBS, MD</p>
                </div>
                <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200">
                    <span className={`w-2.5 h-2.5 rounded-full ${isAvailable ? 'bg-green-500 animate-pulse' : 'bg-slate-400'}`} />
                    <span className="text-sm font-medium text-slate-700">{isAvailable ? 'Available for Consult' : 'Away'}</span>
                    <button
                        onClick={() => setIsAvailable(!isAvailable)}
                        className={`w-10 h-5 rounded-full p-0.5 transition-colors ${isAvailable ? 'bg-green-500' : 'bg-slate-300'}`}
                    >
                        <motion.div
                            layout
                            className="w-4 h-4 bg-white rounded-full shadow-sm"
                            animate={{ x: isAvailable ? 20 : 0 }}
                        />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <SummaryCard title="Total Patients" value="1,240" subtext="+12% this month" icon={Users} color="blue" />
                <SummaryCard title="Appointments" value="8" subtext="Today's schedule" icon={Calendar} color="purple" delay={0.1} />
                <SummaryCard title="Pending" value="3" subtext="Requires approval" icon={Clock} color="orange" delay={0.2} />
                <SummaryCard title="Overall Rating" value="4.9" subtext="Top rated doctor" icon={CheckCircle} color="green" delay={0.3} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Schedule */}
                <div className="lg:col-span-2">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-slate-800">Today's Schedule</h3>
                        <Button variant="ghost" size="sm">View Calendar</Button>
                    </div>

                    <Card className="p-6">
                        <div className="mt-2">
                            <ScheduleItem time="09:00 AM" patient="Ravi Kumar" type="Check-up" />
                            <ScheduleItem time="10:30 AM" patient="Sneha Gupta" type="Consultation" />
                            <ScheduleItem time="02:00 PM" patient="Alex L." type="Follow-up" />
                            <ScheduleItem time="04:15 PM" patient="Rahul Verma" type="Report Review" />
                        </div>
                    </Card>
                </div>

                {/* Requests */}
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-slate-800">Requests</h3>
                        <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-xs font-bold">3 New</span>
                    </div>

                    <div className="space-y-4">
                        <AppointmentRequest name="Priya Patel" time="Tomorrow, 10 AM" type="General Consult" delay={0.1} />
                        <AppointmentRequest name="Amit Shah" time="25 Jan, 04 PM" type="Follow-up" delay={0.2} />
                        <AppointmentRequest name="Neha Sharma" time="26 Jan, 09 AM" type="Check-up" delay={0.3} />
                    </div>
                </div>
            </div>
        </div>
    );
};
