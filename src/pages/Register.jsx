import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, Phone, ArrowRight, ArrowLeft, CheckCircle, Stethoscope, HeartPulse } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { AuthLayout } from '../layouts/AuthLayout';
import { PasswordStrengthMeter } from '../components/auth/PasswordStrengthMeter';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';

const StepIndicator = ({ currentStep, totalSteps }) => (
    <div className="flex justify-center gap-2 mb-8">
        {Array.from({ length: totalSteps }).map((_, idx) => (
            <div
                key={idx}
                className={`h-2 rounded-full transition-all duration-300 ${idx + 1 === currentStep ? 'w-8 bg-primary-500' :
                    idx + 1 < currentStep ? 'w-2 bg-primary-200' : 'w-2 bg-slate-200'
                    }`}
            />
        ))}
    </div>
);

export const Register = () => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', phone: '',
        password: '', confirmPassword: '', role: 'patient'
    });

    const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const { register } = useAuth();

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        if (loading) return; // Prevent double submission
        setLoading(true);

        // Prepare data for API
        // eslint-disable-next-line no-unused-vars
        const { confirmPassword, ...apiData } = formData;

        // Clean phone number (remove non-digits) to match validation pattern
        if (apiData.phone) {
            apiData.phone = apiData.phone.replace(/\D/g, '');
        }

        const success = await register(apiData);

        setLoading(false);
        if (success) {
            setStep(4); // Success step
        }
    };

    const variants = {
        enter: { x: 50, opacity: 0 },
        center: { x: 0, opacity: 1 },
        exit: { x: -50, opacity: 0 },
    };

    return (
        <AuthLayout
            title={step === 4 ? "Account Created!" : "Create Account"}
            subtitle={step === 4 ? "Redirecting you to dashboard..." : `Step ${step} of 3`}
        >
            {step < 4 && <StepIndicator currentStep={step} totalSteps={3} />}

            <div className="min-h-[300px] relative">
                <AnimatePresence mode='wait'>
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            variants={variants}
                            initial="enter" animate="center" exit="exit"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="space-y-4"
                        >
                            <div className="grid grid-cols-2 gap-4">
                                <Input id="firstName" label="First Name" icon={User} value={formData.firstName} onChange={handleChange} />
                                <Input id="lastName" label="Last Name" icon={User} value={formData.lastName} onChange={handleChange} />
                            </div>
                            <Input id="email" label="Email Address" type="email" icon={Mail} value={formData.email} onChange={handleChange} />
                            <Input id="phone" label="Phone Number" type="tel" icon={Phone} value={formData.phone} onChange={handleChange} />

                            <div className="flex justify-end pt-4">
                                <Button onClick={nextStep} className="w-full sm:w-auto">
                                    Next Step <ArrowRight size={18} />
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            variants={variants}
                            initial="enter" animate="center" exit="exit"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="space-y-4"
                        >
                            <Input
                                id="password"
                                label="Password"
                                type="password"
                                icon={Lock}
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <PasswordStrengthMeter password={formData.password} />

                            <Input
                                id="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                icon={Lock}
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                error={formData.password !== formData.confirmPassword && formData.confirmPassword ? "Passwords do not match" : ""}
                            />

                            <div className="flex justify-between pt-4">
                                <Button variant="ghost" onClick={prevStep}>Back</Button>
                                <Button onClick={nextStep} disabled={!formData.password || formData.password !== formData.confirmPassword}>
                                    Next Step <ArrowRight size={18} />
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            variants={variants}
                            initial="enter" animate="center" exit="exit"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="space-y-6"
                        >
                            <p className="text-center text-slate-600 font-medium pb-2">I am registering as a:</p>
                            <div className="grid grid-cols-2 gap-4">
                                <div
                                    onClick={() => setFormData({ ...formData, role: 'patient' })}
                                    className={`cursor-pointer p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${formData.role === 'patient'
                                        ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-lg shadow-primary-500/20'
                                        : 'border-slate-200 hover:border-primary-200 hover:bg-slate-50 text-slate-500'
                                        }`}
                                >
                                    <HeartPulse size={40} className={formData.role === 'patient' ? "text-primary-500" : "text-slate-400"} />
                                    <span className="font-bold">Patient</span>
                                </div>
                                <div
                                    onClick={() => setFormData({ ...formData, role: 'doctor' })}
                                    className={`cursor-pointer p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${formData.role === 'doctor'
                                        ? 'border-secondary-500 bg-secondary-50 text-secondary-700 shadow-lg shadow-secondary-500/20'
                                        : 'border-slate-200 hover:border-secondary-200 hover:bg-slate-50 text-slate-500'
                                        }`}
                                >
                                    <Stethoscope size={40} className={formData.role === 'doctor' ? "text-secondary-500" : "text-slate-400"} />
                                    <span className="font-bold">Doctor</span>
                                </div>
                            </div>

                            <div className="flex justify-between pt-6">
                                <Button variant="ghost" onClick={prevStep}>Back</Button>
                                <Button onClick={handleSubmit} disabled={loading} className="w-40" size="lg">
                                    {loading ? "Creating..." : "Complete"}
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {step === 4 && (
                        <motion.div
                            key="step4"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="flex flex-col items-center justify-center text-center py-8"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", delay: 0.2 }}
                                className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-500 mb-6"
                            >
                                <CheckCircle size={50} strokeWidth={3} />
                            </motion.div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">Welcome, {formData.firstName}!</h3>
                            <p className="text-slate-500 mb-8 max-w-xs">Your account has been successfully created. You can now access your dashboard.</p>
                            <Button size="lg" onClick={() => navigate('/dashboard')} className="w-full">
                                Go to Dashboard
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {step < 4 && (
                <div className="mt-8 text-center text-sm text-slate-600">
                    Already have an account?{' '}
                    <Link to="/login" className="font-bold text-primary-600 hover:text-primary-800 transition-colors">
                        Sign in here
                    </Link>
                </div>
            )}
        </AuthLayout>
    );
};
