import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { ShieldCheck, CreditCard, Loader, Check, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useToast } from '../context/ToastContext';

export const Checkout = () => {
    const { planId } = useParams();
    const navigate = useNavigate();
    const { addToast } = useToast();

    const [plan, setPlan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [step, setStep] = useState(1); // 1: Review, 2: Success

    useEffect(() => {
        const fetchPlan = async () => {
            try {
                // We'll fetch all plans and find the one (since we don't have getPlanById endpoint yet, optimization for later)
                const { data } = await axios.get('/api/subscription/plans');
                const selected = data.find(p => p._id === planId);
                if (selected) {
                    setPlan(selected);
                } else {
                    addToast({ title: 'Error', message: 'Plan not found', type: 'error' });
                    navigate('/premium');
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchPlan();
    }, [planId, navigate]);

    const handlePayment = async () => {
        setProcessing(true);
        try {
            // 1. Initiate
            const initRes = await axios.post('/api/subscription/initiate', {
                planId: plan._id,
                paymentMethod
            });
            const { transactionId } = initRes.data;

            // 2. Simulate Delay for Payment Gateway
            await new Promise(resolve => setTimeout(resolve, 2000));

            // 3. Verify (Mock Success)
            await axios.post('/api/subscription/verify', {
                transactionId,
                status: 'success'
            });

            setStep(2); // Show Success
            addToast({ title: 'Success', message: 'Welcome to DocFone+!', type: 'success' });
        } catch (error) {
            addToast({ title: 'Error', message: error.response?.data?.message || 'Payment failed', type: 'error' });
            setProcessing(false);
        }
    };

    if (loading) return <div className="p-10 text-center">Loading checkout...</div>;
    if (!plan) return null;

    if (step === 2) {
        return (
            <div className="max-w-xl mx-auto px-4 py-20 text-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100"
                >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-6">
                        <Check size={40} strokeWidth={4} />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Payment Successful!</h2>
                    <p className="text-slate-500 mb-8">You are now a member of <span className="font-semibold text-primary-600">DocFone+ {plan.name}</span>. All premium features have been unlocked.</p>

                    <Button onClick={() => navigate('/dashboard')} className="w-full">
                        Go to Dashboard <ArrowRight size={18} className="ml-2" />
                    </Button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-2xl font-bold text-slate-900 mb-8">Secure Checkout</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Payment Details */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                            <CreditCard size={20} /> Payment Method
                        </h3>

                        <div className="space-y-3">
                            {['card', 'upi', 'netbanking'].map((method) => (
                                <div
                                    key={method}
                                    onClick={() => setPaymentMethod(method)}
                                    className={`p-4 rounded-xl border cursor-pointer flex items-center gap-3 transition-colors ${paymentMethod === method
                                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                                            : 'border-slate-200 hover:border-slate-300'
                                        }`}
                                >
                                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === method ? 'border-primary-500 bg-primary-500' : 'border-slate-300'
                                        }`}>
                                        {paymentMethod === method && <div className="w-1.5 h-1.5 bg-white rounded-full bg-white" />}
                                    </div>
                                    <span className="capitalize font-medium text-sm">
                                        {method === 'card' ? 'Credit / Debit Card' : method.toUpperCase()}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl text-xs text-slate-500 flex items-start gap-2">
                        <ShieldCheck size={16} className="shrink-0 mt-0.5" />
                        <p>Your payment information is encrypted and secure. We work with trusted payment partners to ensure your security.</p>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="md:col-span-1">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-lg sticky top-24">
                        <h3 className="font-semibold text-slate-800 mb-6">Order Summary</h3>

                        <div className="space-y-4 mb-6 pb-6 border-b border-slate-100">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-medium text-slate-900">{plan.name}</h4>
                                    <p className="text-xs text-slate-500">{plan.durationInMonths} Month Plan</p>
                                </div>
                                <span className="font-bold">₹{plan.price}</span>
                            </div>
                            <div className="flex justify-between text-sm text-green-600">
                                <span>DocFone+ Discount</span>
                                <span>- ₹0</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center mb-6">
                            <span className="font-bold text-slate-800">Total</span>
                            <span className="text-2xl font-bold text-primary-600">₹{plan.price}</span>
                        </div>

                        <Button
                            className="w-full h-12 text-base shadow-lg shadow-primary-500/20"
                            onClick={handlePayment}
                            disabled={processing}
                        >
                            {processing ? <Loader className="animate-spin mr-2" /> : `Pay ₹${plan.price}`}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
