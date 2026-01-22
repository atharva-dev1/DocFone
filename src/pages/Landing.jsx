import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Users, Activity } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Link } from 'react-router-dom';

const FeatureCard = ({ icon: Icon, title, desc, delay }) => (
    <Card className="h-full" delay={delay}>
        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 mb-4">
            <Icon size={24} />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
        <p className="text-slate-500 leading-relaxed">{desc}</p>
    </Card>
);

const StatCard = ({ number, label, delay }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay, duration: 0.5 }}
        viewport={{ once: true }}
        className="bg-white/40 backdrop-blur-md rounded-2xl p-6 text-center border border-white/30"
    >
        <h4 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-1">
            {number}
        </h4>
        <p className="text-slate-600 font-medium">{label}</p>
    </motion.div>
);

export const Landing = () => {
    return (
        <div className="w-full">
            {/* Hero Section */}
            <section className="relative pt-10 pb-20 md:pt-20 md:pb-32 px-4 md:px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8 z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="inline-block px-4 py-2 rounded-full bg-primary-100 text-primary-700 font-semibold text-sm mb-4 border border-primary-200">
                                🚀 The Future of Healthcare
                            </span>
                            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-tight">
                                Healthcare <br />
                                <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                                    Reimagined
                                </span>
                            </h1>
                            <p className="text-lg text-slate-600 max-w-lg leading-relaxed mt-6">
                                Experience the next generation of medical care. Book appointments,
                                chat with specialists, and manage your health with our AI-powered platform.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <Link to="/register">
                                <Button size="lg" className="shadow-xl shadow-primary-500/20">
                                    Get Started <ArrowRight size={20} />
                                </Button>
                            </Link>
                            <Link to="/doctors">
                                <Button variant="secondary" size="lg" icon={Users}>
                                    Find Doctors
                                </Button>
                            </Link>
                        </motion.div>

                        <div className="grid grid-cols-3 gap-4 pt-8">
                            <StatCard number="10k+" label="Patients" delay={0.4} />
                            <StatCard number="500+" label="Doctors" delay={0.5} />
                            <StatCard number="24/7" label="Support" delay={0.6} />
                        </div>
                    </div>

                    <div className="relative h-[600px] hidden md:block perspective-1000">
                        {/* 3D Floating Elements */}
                        <motion.div
                            animate={{ y: [-20, 20, -20] }}
                            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute top-10 right-10 z-20"
                        >
                            <Card className="w-64 bg-white/80 backdrop-blur-xl border-t-4 border-primary-500">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-200" />
                                    <div>
                                        <div className="h-3 w-24 bg-slate-200 rounded mb-1" />
                                        <div className="h-2 w-16 bg-slate-100 rounded" />
                                    </div>
                                </div>
                                <div className="mt-4 flex gap-2">
                                    <div className="h-8 w-20 bg-primary-100 rounded-lg" />
                                    <div className="h-8 w-8 bg-slate-100 rounded-lg" />
                                </div>
                            </Card>
                        </motion.div>

                        <motion.div
                            animate={{ y: [30, -30, 30] }}
                            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                            className="absolute top-40 left-10 z-10"
                        >
                            <Card className="w-56 bg-white/80 backdrop-blur-xl border-l-4 border-secondary-500">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="font-semibold text-slate-700">Heart Rate</div>
                                    <Activity className="text-red-500" />
                                </div>
                                <div className="text-3xl font-bold text-slate-800">118 <span className="text-sm font-normal text-slate-500">bpm</span></div>
                            </Card>
                        </motion.div>

                        <div className="absolute inset-0 bg-gradient-to-tr from-primary-400/20 to-secondary-400/20 rounded-full blur-3xl -z-10" />
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 px-4 md:px-6 bg-white/30 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Why Choose DocFone?</h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            We combine cutting-edge technology with compassionate care to provide
                            a seamless healthcare experience.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={ShieldCheck}
                            title="Verified Specialists"
                            desc="Every doctor on our platform is vetted and verified to ensure high-quality care standards."
                            delay={0.2}
                        />
                        <FeatureCard
                            icon={Activity}
                            title="Real-time Monitoring"
                            desc="Track your vitals and health progress with our integrated dashboard and smart alerts."
                            delay={0.4}
                        />
                        <FeatureCard
                            icon={Users}
                            title="Family Health"
                            desc="Manage health records for your entire family in one secure, accessible location."
                            delay={0.6}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};
