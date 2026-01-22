import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

const dates = [
    { day: 'Mon', date: '23' },
    { day: 'Tue', date: '24' },
    { day: 'Wed', date: '25' },
    { day: 'Thu', date: '26' },
    { day: 'Fri', date: '27' },
    { day: 'Sat', date: '28' },
];

const times = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
];

export const Booking = () => {
    const [selectedDate, setSelectedDate] = useState('23');
    const [selectedTime, setSelectedTime] = useState(null);
    const [step, setStep] = useState(1);

    return (
        <div className="max-w-4xl mx-auto px-4 md:px-6 pb-12">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Book Appointment</h1>
                <p className="text-slate-500">Dr. Priya Sharma • General Physician</p>
            </div>

            <Card className="max-w-2xl mx-auto">
                {step === 1 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-8"
                    >
                        {/* Date Selection */}
                        <div>
                            <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                <CalendarIcon size={20} className="text-primary-500" /> Select Date
                            </h3>
                            <div className="flex gap-3 overflow-x-auto pb-2">
                                {dates.map((d) => (
                                    <button
                                        key={d.date}
                                        onClick={() => setSelectedDate(d.date)}
                                        className={`flex flex-col items-center justify-center min-w-[70px] h-20 rounded-2xl border transition-all ${selectedDate === d.date
                                            ? 'bg-primary-500 text-white border-primary-500 shadow-lg shadow-primary-500/30 ring-2 ring-primary-200'
                                            : 'bg-white border-slate-200 text-slate-600 hover:border-primary-300 hover:bg-primary-50'
                                            }`}
                                    >
                                        <span className="text-xs font-medium opacity-80">{d.day}</span>
                                        <span className="text-xl font-bold">{d.date}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Time Selection */}
                        <div>
                            <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                <Clock size={20} className="text-primary-500" /> Select Time
                            </h3>
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                                {times.map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => setSelectedTime(t)}
                                        className={`py-2 px-3 rounded-xl text-sm font-medium transition-all ${selectedTime === t
                                            ? 'bg-primary-500 text-white shadow-md'
                                            : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                                            }`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <Button
                            className="w-full mt-4"
                            size="lg"
                            disabled={!selectedTime}
                            onClick={() => setStep(2)}
                        >
                            Confirm Booking
                        </Button>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-8"
                    >
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
                            <CheckCircle size={40} />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Booking Confirmed!</h2>
                        <p className="text-slate-500 mb-8 max-w-sm mx-auto">
                            Your appointment with Dr. Priya Sharma has been scheduled for Jan {selectedDate} at {selectedTime}.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <Button variant="secondary" onClick={() => setStep(1)}>Book Another</Button>
                            <Button>View Dashboard</Button>
                        </div>
                    </motion.div>
                )}
            </Card>
        </div>
    );
};
