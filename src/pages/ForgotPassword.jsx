import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { AuthLayout } from '../layouts/AuthLayout';
import { useToast } from '../context/ToastContext';
import axios from 'axios';

export const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const { addToast } = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.post('/api/auth/forgotpassword', { email });
            setSent(true);
            addToast({ title: 'Email Sent', message: 'Check your inbox for reset instructions', type: 'success' });
        } catch (error) {
            addToast({
                title: 'Error',
                message: error.response?.data?.message || 'Failed to send email',
                type: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Forgot Password?"
            subtitle="Enter your email to receive reset instructions"
        >
            {!sent ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label="Email Address"
                        type="email"
                        icon={Mail}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="you@example.com"
                    />

                    <Button
                        type="submit"
                        className="w-full"
                        size="lg"
                        disabled={loading}
                    >
                        {loading ? 'Sending...' : 'Send Reset Link'}
                    </Button>

                    <div className="text-center">
                        <Link to="/login" className="text-slate-500 hover:text-slate-800 flex items-center justify-center gap-2 text-sm font-medium">
                            <ArrowLeft size={16} /> Back to Sign In
                        </Link>
                    </div>
                </form>
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center space-y-6"
                >
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Mail size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">Check Your Email</h3>
                    <p className="text-slate-600">
                        We have sent a password reset link to <strong>{email}</strong>.
                        Please check your inbox (and spam folder) to proceed.
                    </p>
                    <div className="pt-4">
                        <Link to="/login">
                            <Button variant="outline" className="w-full">
                                Back to Sign In
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            )}
        </AuthLayout>
    );
};
