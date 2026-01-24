import { useState } from 'react';
import { Button } from '../ui/Button';
import axios from 'axios';
import { Check, X, Loader } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const DoctorAppointmentActions = ({ appointmentId, currentStatus, onUpdate }) => {
    const [loading, setLoading] = useState(false);
    const { addToast } = useToast();

    const handleAction = async (action) => {
        setLoading(true);
        try {
            await axios.put(`/api/doctor-actions/${action}/${appointmentId}`);
            addToast({
                title: 'Success',
                message: `Appointment ${action === 'approve' ? 'approved' : 'declined'} successfully`,
                type: 'success'
            });
            if (onUpdate) onUpdate();
        } catch (error) {
            addToast({
                title: 'Error',
                message: error.response?.data?.message || 'Action failed',
                type: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    if (currentStatus !== 'pending') {
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-bold capitalize ${currentStatus === 'confirmed' ? 'bg-green-100 text-green-700' :
                    currentStatus === 'cancelled' ? 'bg-red-100 text-red-700' :
                        'bg-slate-100 text-slate-700'
                }`}>
                {currentStatus}
            </span>
        );
    }

    return (
        <div className="flex gap-2">
            <Button
                size="sm"
                variant="outline"
                className="w-8 h-8 p-0 rounded-full text-green-600 hover:bg-green-50 border-green-200"
                onClick={() => handleAction('approve')}
                disabled={loading}
                title="Approve"
            >
                {loading ? <Loader size={14} className="animate-spin" /> : <Check size={16} />}
            </Button>
            <Button
                size="sm"
                variant="outline"
                className="w-8 h-8 p-0 rounded-full text-red-600 hover:bg-red-50 border-red-200"
                onClick={() => handleAction('decline')}
                disabled={loading}
                title="Decline"
            >
                {loading ? <Loader size={14} className="animate-spin" /> : <X size={16} />}
            </Button>
        </div>
    );
};
