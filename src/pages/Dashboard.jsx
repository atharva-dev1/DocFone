import { motion } from 'framer-motion';
import { Calendar, FileText, MessageSquare, Plus, Clock, MapPin, Activity, Bell, ShieldCheck, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { SummaryCard } from '../components/dashboard/SummaryCard';
import { Timeline } from '../components/dashboard/Timeline';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';

    const timelineEvents = [
        {
            status: 'upcoming',
            title: 'Dr. Aarav Mehta',
            subtitle: 'Cardiologist Consultation',
            time: 'Today, 02:00 PM',
            action: <Button size="sm">Join Call</Button>
        },
        {
            status: 'upcoming',
            title: 'Blood Test Results',
            subtitle: 'Pathology Lab',
            time: 'Tomorrow, 10:00 AM',
            action: <Button variant="outline" size="sm">Details</Button>
        },
        {
            status: 'completed',
            title: 'Dr. Rohan Das',
            subtitle: 'Dermatologist Follow-up',
            time: '15 Jan, 2026',
            action: <Button variant="ghost" size="sm">View Summary</Button>
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-6 pb-12">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <h1 className="text-3xl font-bold text-slate-900">
                        {greeting}, <span className="text-primary-600">Alex</span> 👋
                    </h1>
                    <p className="text-slate-500 mt-1">Here's your health overview for today.</p>
                </motion.div>

                <div className="flex items-center gap-3">
                    <Button variant="secondary" size="icon" className="rounded-full bg-white relative">
                        <Bell size={20} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white" />
                    </Button>
                    <div className="flex items-center gap-3 bg-white pl-2 pr-4 py-1.5 rounded-full border border-slate-200 shadow-sm cursor-pointer hover:bg-slate-50 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-sm">
                            AL
                        </div>
                        <span className="font-semibold text-sm text-slate-700">Alex L.</span>
                        <ChevronRight size={16} className="text-slate-400" />
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <SummaryCard
                    title="Appointments"
                    value="2"
                    subtext="Upcoming this month"
                    icon={Calendar}
                    color="blue"
                    delay={0.1}
                />
                <SummaryCard
                    title="Prescriptions"
                    value="12"
                    subtext="4 active medications"
                    icon={FileText}
                    color="purple"
                    delay={0.2}
                />
                <SummaryCard
                    title="Vitals Status"
                    value="Normal"
                    subtext="Last check: 2 days ago"
                    icon={Activity}
                    color="green"
                    delay={0.3}
                />
                <SummaryCard
                    title="Doctors"
                    value="5"
                    subtext="Consulted widely"
                    icon={ShieldCheck}
                    color="orange"
                    delay={0.4}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content: Timeline & Actions */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Quick Actions */}
                    <section>
                        <h3 className="font-bold text-slate-800 mb-4 text-lg">Quick Actions</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {[
                                { label: 'Book Visit', icon: Plus, color: 'bg-primary-500', link: '/book-appointment' },
                                { label: 'Start Chat', icon: MessageSquare, color: 'bg-purple-500', link: '/chat' },
                                { label: 'Upload Rx', icon: FileText, color: 'bg-orange-500', link: '/prescription' },
                                { label: 'Find Care', icon: MapPin, color: 'bg-green-500', link: '/doctors' }
                            ].map((action, i) => (
                                <Link to={action.link} key={i}>
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center gap-3 hover:shadow-md transition-all cursor-pointer h-full"
                                    >
                                        <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center text-white shadow-lg shadow-black/5`}>
                                            <action.icon size={24} />
                                        </div>
                                        <span className="font-semibold text-slate-700 text-sm">{action.label}</span>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    </section>

                    {/* Timeline */}
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-slate-800 text-lg">Timeline</h3>
                            <Link to="#" className="text-primary-600 text-sm font-medium hover:underline">View Calendar</Link>
                        </div>
                        <Timeline events={timelineEvents} />
                    </section>
                </div>

                {/* Sidebar Widgets */}
                <div className="space-y-6">
                    {/* Ad / Promo Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-6 text-white relative overflow-hidden shadow-xl"
                    >
                        <div className="relative z-10">
                            <h3 className="text-xl font-bold mb-2">Premium Care</h3>
                            <p className="text-indigo-100 text-sm mb-4">Upgrade to DocFone+ for 24/7 unlimited chats with specialists.</p>
                            <Button size="sm" className="bg-white text-indigo-600 hover:bg-indigo-50 border-none">
                                Upgrade Now
                            </Button>
                        </div>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />
                    </motion.div>

                    {/* Recent Prescriptions Mini-List */}
                    <Card>
                        <h3 className="font-bold text-slate-800 mb-4">Recent Prescriptions</h3>
                        <div className="space-y-3">
                            {[1, 2].map((i) => (
                                <div key={i} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
                                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 shrink-0">
                                        <FileText size={20} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-slate-700 truncate">Amoxicillin 500mg</p>
                                        <p className="text-xs text-slate-500">Dr. Mehta • 2 days ago</p>
                                    </div>
                                </div>
                            ))}
                            <Button variant="ghost" size="sm" className="w-full mt-2 text-primary-600">See All</Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};
