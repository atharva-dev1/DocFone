import { motion } from 'framer-motion';
import { Card } from '../ui/Card';

export const SummaryCard = ({ icon: Icon, title, value, subtext, color = 'blue', delay = 0 }) => {
    const colors = {
        blue: 'bg-blue-50 text-blue-600',
        purple: 'bg-purple-50 text-purple-600',
        green: 'bg-green-50 text-green-600',
        orange: 'bg-orange-50 text-orange-600',
        pink: 'bg-pink-50 text-pink-600',
    };

    return (
        <Card className="h-full flex flex-col justify-between hover:shadow-lg transition-shadow" delay={delay}>
            <div className="flex justify-between items-start mb-4 bg-transparent shadow-none">
                <div className={`p-3 rounded-xl ${colors[color]}`}>
                    <Icon size={24} />
                </div>
                {/* Optional sparkline or indicator could go here */}
            </div>
            <div>
                <h4 className="text-3xl font-bold text-slate-800 mb-1">{value}</h4>
                <p className="font-medium text-slate-500 text-sm mb-1">{title}</p>
                {subtext && <p className="text-xs text-slate-400">{subtext}</p>}
            </div>
        </Card>
    );
};
