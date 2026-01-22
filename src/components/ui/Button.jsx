import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Button = ({
    children,
    className,
    variant = 'primary',
    size = 'md',
    onClick,
    type = 'button',
    icon: Icon,
    disabled = false,
    ...props
}) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed active:scale-95';

    const variants = {
        primary: 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 hover:to-primary-700',
        secondary: 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm',
        ghost: 'text-primary-600 hover:bg-primary-50',
        outline: 'border-2 border-primary-500 text-primary-600 hover:bg-primary-50',
        glass: 'glass-button'
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm gap-1.5',
        md: 'px-5 py-2.5 text-base gap-2',
        lg: 'px-8 py-3.5 text-lg gap-2.5',
        icon: 'p-2'
    };

    return (
        <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={twMerge(baseStyles, variants[variant], sizes[size], className)}
            onClick={onClick}
            type={type}
            disabled={disabled}
            {...props}
        >
            {Icon && <Icon className="w-5 h-5" strokeWidth={2} />}
            {children}
        </motion.button>
    );
};
