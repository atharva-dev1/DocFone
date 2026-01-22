import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { AuthLayout } from '../layouts/AuthLayout';
import { useToast } from '../context/ToastContext';

export const Login = () => {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const { addToast } = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            if (formData.email && formData.password) {
                // Simple mock validation
                addToast({ title: 'Welcome back!', message: 'Successfully signed in.', type: 'success' });
                navigate('/dashboard');
            } else {
                addToast({ title: 'Error', message: 'Please fill in all fields.', type: 'error' });
            }
        }, 1500);
    };

    return (
        <AuthLayout
            title="Access Your Health Hub"
            subtitle="Sign in to manage appointments and records."
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                    label="Email Address"
                    type="email"
                    icon={Mail}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                />

                <div className="relative">
                    <Input
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        icon={Lock}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                    />
                    <button
                        type="button"
                        className="absolute right-4 top-[18px] text-slate-400 hover:text-primary-600 focus:outline-none"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>

                <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 text-slate-600 cursor-pointer select-none">
                        <input type="checkbox" className="rounded text-primary-600 focus:ring-primary-500 w-4 h-4 border-slate-300" />
                        Remember me
                    </label>
                    <a href="#" className="font-medium text-primary-600 hover:text-primary-700 hover:underline">
                        Forgot password?
                    </a>
                </div>

                <Button
                    type="submit"
                    className="w-full relative overflow-hidden"
                    size="lg"
                    disabled={loading}
                >
                    {loading ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center gap-2"
                        >
                            <Loader2 className="animate-spin" size={20} /> Signing In...
                        </motion.div>
                    ) : (
                        <span className="flex items-center gap-2">Sign In <ArrowRight size={20} /></span>
                    )}
                </Button>

                {/* Social Login Placeholders */}
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
                    <div className="relative flex justify-center text-sm"><span className="bg-white px-2 text-slate-500">Or continue with</span></div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <Button variant="secondary" className="w-full">
                        Git
                    </Button>
                    <Button variant="secondary" className="w-full">
                        Google
                    </Button>
                </div>
            </form>

            <div className="mt-8 text-center text-sm text-slate-600">
                Don't have an account?{' '}
                <Link to="/register" className="font-bold text-primary-600 hover:text-primary-800 transition-colors">
                    Create free account
                </Link>
            </div>
        </AuthLayout>
    );
};
