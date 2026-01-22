import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

export const Card = ({ children, className, hover = true, delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            whileHover={hover ? { y: -5, boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.1)' } : {}}
            className={twMerge(
                'glass-card rounded-2xl p-6 relative overflow-hidden',
                className
            )}
        >
            <div className="relative z-10">
                {children}
            </div>
            {/* Decorative gradient blob */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary-400/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-secondary-400/10 rounded-full blur-3xl pointer-events-none" />
        </motion.div>
    );
};
