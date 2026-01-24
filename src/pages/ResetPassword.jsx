import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Lock, ArrowLeft, CheckCircle } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { AuthLayout } from '../layouts/AuthLayout';
import { useToast } from '../context/ToastContext';
import { PasswordStrengthMeter } from '../components/auth/PasswordStrengthMeter';
import axios from 'axios';

export const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const { resetToken } = useParams();
    const navigate = useNavigate();
    const { addToast } = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return addToast({ title: 'Error', message: 'Passwords do not match', type: 'error' });
        }

        setLoading(true);

        try {
            await axios.put(`/api/auth/resetpassword/${resetToken}`, { password });
            setSuccess(true);
            addToast({ title: 'Success', message: 'Password reset successfully', type: 'success' });

            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (error) {
            addToast({
                title: 'Error',
                message: error.response?.data?.message || 'Failed to reset password',
                type: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Reset Password"
            subtitle="Create a new strong password for your account"
        >
            {!success ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label="New Password"
                        type="password"
                        icon={Lock}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <PasswordStrengthMeter password={password} />

                    <Input
                        label="Confirm New Password"
                        type="password"
                        icon={Lock}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        error={password !== confirmPassword && confirmPassword ? "Passwords do not match" : ""}
                    />

                    <Button
                        type="submit"
                        className="w-full"
                        size="lg"
                        disabled={loading || !password || password !== confirmPassword}
                    >
                        {loading ? 'Restoring...' : 'Reset Password'}
                    </Button>
                </form>
            ) : (
                <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Password Reset!</h3>
                    <p className="text-slate-600 mb-6">
                        Your password has been successfully updated. You will be redirected to the login page shortly.
                    </p>
                    <Link to="/login">
                        <Button className="w-full">Sign In Now</Button>
                    </Link>
                </div>
            )}
        </AuthLayout>
    );
};
