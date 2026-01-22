import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { Link } from 'react-router-dom';

export const AuthLayout = ({ children, title, subtitle }) => {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-slate-50">
            {/* Dynamic Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-primary-200/20 rounded-full blur-3xl animate-pulse-slow" />
                <div className="absolute top-[40%] right-[10%] w-[40%] h-[40%] bg-secondary-200/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
                <div className="absolute -bottom-[20%] left-[20%] w-[50%] h-[50%] bg-cyan-200/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '4s' }} />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-lg z-10"
            >
                <div className="text-center mb-8">
                    <Link to="/" className="inline-block group">
                        <span className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
                            Medyxra
                        </span>
                    </Link>
                    <h2 className="text-xl font-semibold text-slate-800 mt-4">{title}</h2>
                    <p className="text-slate-500 mt-1">{subtitle}</p>
                </div>

                <Card className="border-t-4 border-t-primary-500 shadow-2xl backdrop-blur-2xl bg-white/60">
                    {children}
                </Card>
            </motion.div>
        </div>
    );
};
