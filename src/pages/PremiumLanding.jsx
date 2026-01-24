import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Shield, Zap, Crown, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlanCard = ({ plan, onSelect, isPopular }) => {
    return (
        <motion.div
            whileHover={{ y: -10 }}
            className={`relative p-8 rounded-3xl border flex flex-col h-full ${isPopular
                    ? 'bg-slate-900 text-white border-slate-800 shadow-xl shadow-primary-900/20'
                    : 'bg-white text-slate-800 border-slate-200 shadow-sm'
                }`}
        >
            {isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary-500 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                    Most Popular
                </div>
            )}

            <div className="mb-6">
                <h3 className={`text-lg font-semibold ${isPopular ? 'text-slate-300' : 'text-slate-500'}`}>{plan.name}</h3>
                <div className="flex items-baseline mt-2">
                    <span className="text-4xl font-bold">₹{plan.price}</span>
                    <span className={`ml-2 text-sm ${isPopular ? 'text-slate-400' : 'text-slate-500'}`}>/month</span>
                </div>
                <p className={`mt-4 text-sm ${isPopular ? 'text-slate-400' : 'text-slate-500'}`}>{plan.description}</p>
            </div>

            <div className="flex-1 space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                        <div className={`mt-0.5 rounded-full p-0.5 ${isPopular ? 'bg-primary-500/20 text-primary-400' : 'bg-green-100 text-green-600'}`}>
                            <Check size={12} strokeWidth={3} />
                        </div>
                        <span className="text-sm">{feature}</span>
                    </div>
                ))}
            </div>

            <Button
                variant={isPopular ? 'primary' : 'outline'}
                className={`w-full ${isPopular ? 'bg-gradient-to-r from-primary-600 to-purple-600 border-none hover:shadow-lg hover:shadow-primary-500/25' : ''}`}
                onClick={() => onSelect(plan)}
            >
                {plan.price === 0 ? 'Get Started' : 'Upgrade Now'}
            </Button>
        </motion.div>
    );
};

export const PremiumLanding = () => {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const { data } = await axios.get('/api/subscription/plans');
                // Filter out free plan for main display if desired, or keep all
                setPlans(data.filter(p => p.price > 0));
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch plans", error);
                setLoading(false);
            }
        };
        fetchPlans();
    }, []);

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Hero Section */}
            <div className="relative bg-slate-900 text-white overflow-hidden pb-20 pt-10">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
                    <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary-500 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500 rounded-full blur-[100px]" />
                </div>

                <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 text-center pt-16 md:pt-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 bg-slate-800/50 backdrop-blur-md rounded-full px-4 py-1.5 border border-slate-700 mb-6"
                    >
                        <Crown size={14} className="text-yellow-400" />
                        <span className="text-xs font-semibold tracking-wide uppercase text-slate-300">Introducing DocFone+</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent"
                    >
                        Unlimited Care.<br />One Smart Subscription.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10"
                    >
                        Get 24/7 access to top specialists, zero waiting time, and priority support for you and your family.
                    </motion.p>
                </div>
            </div>

            {/* Features Grid */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 -mt-16 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                    {[
                        { icon: Star, title: "Top Specialists", desc: "Access to the top 1% of doctors in 50+ specialities." },
                        { icon: Zap, title: "Instant Connect", desc: "Connect with a doctor in under 60 seconds, 24/7." },
                        { icon: Shield, title: "Family Coverage", desc: "One subscription covers up to 4 family members." }
                    ].map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100"
                        >
                            <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600 mb-4">
                                <feature.icon size={24} />
                            </div>
                            <h3 className="font-bold text-slate-900 mb-2">{feature.title}</h3>
                            <p className="text-slate-500 text-sm">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Pricing Section */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Simple, Transparent Pricing</h2>
                        <p className="text-slate-500">Choose the plan that's right for you.</p>
                    </div>

                    {loading ? (
                        <div className="text-center p-10">Loading plans...</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {plans.map((plan) => (
                                <PlanCard
                                    key={plan._id}
                                    plan={plan}
                                    isPopular={plan.isRecommended}
                                    onSelect={(p) => navigate(`/checkout/${p._id}`)}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* FAQ Section */}
                <div className="max-w-3xl mx-auto mb-20">
                    <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {[
                            { q: "Can I cancel anytime?", a: "Yes, you can cancel your subscription at any time. Your benefits will continue until the end of the current billing cycle." },
                            { q: "Does this cover medicines?", a: "No, DocFone+ covers consultation fees and priority access. Medicines and lab tests are charged separately, though you get exclusive discounts." },
                            { q: "How do I add family members?", a: "Once you subscribe to the Family Care plan, you can add up to 3 additional family members from your dashboard settings." }
                        ].map((faq, i) => (
                            <div key={i} className="bg-white p-6 rounded-xl border border-slate-200">
                                <h4 className="font-bold text-slate-900 mb-2">{faq.q}</h4>
                                <p className="text-slate-600 text-sm">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
