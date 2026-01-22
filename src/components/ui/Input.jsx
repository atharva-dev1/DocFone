import { forwardRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

export const Input = forwardRef(({
    label,
    error,
    icon: Icon,
    className,
    type = 'text',
    id,
    ...props
}, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    // Handle change to update 'hasValue' state for floating label logic
    const handleChange = (e) => {
        setHasValue(e.target.value.length > 0);
        if (props.onChange) props.onChange(e);
    };

    return (
        <div className="w-full">
            <div className="relative group">
                <input
                    ref={ref}
                    id={id || label}
                    type={type}
                    className={twMerge(
                        'peer w-full rounded-xl bg-white/50 border border-slate-200 px-4 pt-5 pb-2 text-slate-900',
                        'outline-none transition-all duration-300',
                        'focus:border-primary-500/50 focus:ring-4 focus:ring-primary-500/10 focus:bg-white/80',
                        'placeholder-transparent', // Hide default placeholder for floating label
                        Icon && 'pl-11',
                        error && 'border-red-500 focus:border-red-500 focus:ring-red-200',
                        className
                    )}
                    onFocus={(e) => { setIsFocused(true); props.onFocus?.(e); }}
                    onBlur={(e) => { setIsFocused(false); props.onBlur?.(e); }}
                    onChange={handleChange}
                    placeholder={label} // Required for peer-placeholder-shown trick
                    {...props}
                />

                {/* Floating Label */}
                <label
                    htmlFor={id || label}
                    className={twMerge(
                        'absolute left-4 top-1.5 text-xs font-semibold text-slate-500 transition-all duration-200 pointer-events-none',
                        Icon && 'left-11',
                        'peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3.5',
                        'peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-primary-600'
                    )}
                >
                    {label}
                </label>

                {Icon && (
                    <div className={twMerge(
                        "absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition-colors duration-300 pointer-events-none",
                        isFocused && "text-primary-500"
                    )}>
                        <Icon size={20} />
                    </div>
                )}
            </div>

            {/* Validation / Error Message with Animation */}
            <motion.div
                initial={false}
                animate={{ height: error ? 'auto' : 0, opacity: error ? 1 : 0 }}
                className="overflow-hidden"
            >
                <p className="mt-1.5 ml-1 text-sm text-red-500 flex items-center gap-1 font-medium">
                    {error}
                </p>
            </motion.div>
        </div>
    );
});

Input.displayName = 'Input';
