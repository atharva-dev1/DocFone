import { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';

export const Timeline = ({ events }) => {
    return (
        <div className="relative pl-4 space-y-6 before:absolute before:inset-0 before:ml-4 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-slate-200 before:via-slate-200 before:to-transparent">
            {events.map((event, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="relative pl-8"
                >
                    <div className={`absolute left-0 top-1.5 mt-0.5 w-8 h-8 rounded-full border-4 border-white shadow-sm flex items-center justify-center z-10 ${event.status === 'upcoming' ? 'bg-primary-500' :
                            event.status === 'completed' ? 'bg-green-500' : 'bg-slate-300'
                        }`}>
                        {/* Date bubble */}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                        <div>
                            <h4 className="font-bold text-slate-800">{event.title}</h4>
                            <p className="text-sm text-primary-600 font-medium">{event.subtitle}</p>
                            <p className="text-xs text-slate-500 mt-1">{event.time}</p>
                        </div>
                        {event.action && (
                            <div className="shrink-0">
                                {event.action}
                            </div>
                        )}
                    </div>
                </motion.div>
            ))}
        </div>
    );
};
