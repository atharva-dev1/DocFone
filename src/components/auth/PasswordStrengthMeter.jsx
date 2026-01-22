import { motion } from 'framer-motion';

export const PasswordStrengthMeter = ({ password }) => {
    const getStrength = (pass) => {
        let strength = 0;
        if (pass.length > 5) strength += 1;
        if (pass.length > 7) strength += 1;
        if (/[A-Z]/.test(pass)) strength += 1;
        if (/[0-9]/.test(pass)) strength += 1;
        if (/[^A-Za-z0-9]/.test(pass)) strength += 1;
        return strength;
    };

    const strength = getStrength(password);

    const labels = ['Weak', 'Fair', 'Good', 'Strong', 'Excellent'];
    const colors = ['bg-slate-200', 'bg-red-400', 'bg-yellow-400', 'bg-blue-400', 'bg-green-500', 'bg-green-600'];

    return (
        <div className="mt-3 space-y-2">
            <div className="flex gap-1 h-1">
                {[1, 2, 3, 4].map((level) => (
                    <div key={level} className="flex-1 rounded-full bg-slate-100 overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: strength >= level ? '100%' : '0%' }}
                            className={`h-full ${colors[strength]}`}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                ))}
            </div>
            <p className={`text-xs text-right font-medium text-slate-500`}>
                {strength > 0 ? labels[strength - 1] : 'Enter password'}
            </p>
        </div>
    );
};
