import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Users, Activity, Trash2, CheckCircle, AlertCircle, Shield } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useToast } from '../context/ToastContext';

export const AdminDashboard = () => {
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const { addToast } = useToast();

    const [stats, setStats] = useState({
        totalPatients: 0,
        totalDoctors: 0,
        totalAppointments: 0,
        pendingApprovals: 0
    });
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        if (user && !['admin', 'super-admin'].includes(user.role)) {
            navigate('/dashboard');
            return;
        }

        fetchData();
    }, [isAuthenticated, user, navigate]);

    const fetchData = async () => {
        try {
            const statsRes = await axios.get('/api/admin/stats');
            setStats(statsRes.data);

            if (user.role === 'super-admin') {
                const usersRes = await axios.get('/api/admin/users');
                setUsers(usersRes.data);
            }
        } catch (error) {
            console.error(error);
            addToast({ title: 'Error', message: 'Failed to fetch admin data', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async (id) => {
        if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;

        try {
            await axios.delete(`/api/admin/users/${id}`);
            setUsers(users.filter(u => u._id !== id));
            addToast({ title: 'Success', message: 'User deleted successfully', type: 'success' });
            fetchData(); // Refresh stats
        } catch (error) {
            addToast({ title: 'Error', message: error.response?.data?.message || 'Failed to delete user', type: 'error' });
        }
    };

    const handleApproveDoctor = async (id) => {
        try {
            await axios.put(`/api/admin/approve-doctor/${id}`);
            const updatedUsers = users.map(u => {
                if (u._id === id) return { ...u, isDoctorApproved: true };
                return u;
            });
            setUsers(updatedUsers);
            addToast({ title: 'Success', message: 'Doctor approved', type: 'success' });
            fetchData(); // Refresh stats
        } catch (error) {
            addToast({ title: 'Error', message: error.response?.data?.message || 'Failed to approve doctor', type: 'error' });
        }
    };

    if (loading) {
        return <div className="flex h-screen items-center justify-center">Loading Admin Panel...</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
                    <p className="text-slate-500">System Overview & Management</p>
                </div>
                <div className="flex gap-2">
                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold border border-red-200 flex items-center gap-1">
                        <Shield size={14} /> {user.role.toUpperCase()}
                    </span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                <Card className="bg-white p-6 shadow-sm border border-slate-200">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                            <Users size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">Total Patients</p>
                            <h3 className="text-2xl font-bold text-slate-900">{stats.totalPatients}</h3>
                        </div>
                    </div>
                </Card>
                <Card className="bg-white p-6 shadow-sm border border-slate-200">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                            <Users size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">Total Doctors</p>
                            <h3 className="text-2xl font-bold text-slate-900">{stats.totalDoctors}</h3>
                        </div>
                    </div>
                </Card>
                <Card className="bg-white p-6 shadow-sm border border-slate-200">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
                            <Activity size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">Appointments</p>
                            <h3 className="text-2xl font-bold text-slate-900">{stats.totalAppointments}</h3>
                        </div>
                    </div>
                </Card>
                <Card className="bg-white p-6 shadow-sm border border-slate-200">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-yellow-100 text-yellow-600 rounded-lg">
                            <AlertCircle size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">Pending Approvals</p>
                            <h3 className="text-2xl font-bold text-slate-900">{stats.pendingApprovals}</h3>
                        </div>
                    </div>
                </Card>
            </div>

            {/* User Management Section (Super Admin Only) */}
            {user.role === 'super-admin' && (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                        <h2 className="text-lg font-bold text-slate-800">User Management</h2>
                        <span className="text-xs text-slate-500 bg-slate-200 px-2 py-1 rounded">Super Admin Access</span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 text-slate-600 text-sm">
                                    <th className="px-6 py-3 font-semibold">Name</th>
                                    <th className="px-6 py-3 font-semibold">Email</th>
                                    <th className="px-6 py-3 font-semibold">Role</th>
                                    <th className="px-6 py-3 font-semibold">Status</th>
                                    <th className="px-6 py-3 font-semibold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {users.map((u) => (
                                    <tr key={u._id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-900">
                                            {u.firstName} {u.lastName}
                                            {u._id === user._id && <span className="ml-2 text-xs text-blue-500 bg-blue-50 px-1 py-0.5 rounded border border-blue-100">(You)</span>}
                                        </td>
                                        <td className="px-6 py-4 text-slate-600 text-sm">{u.email}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${u.role === 'doctor' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                                    u.role === 'admin' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                                                        u.role === 'super-admin' ? 'bg-red-50 text-red-700 border-red-200' :
                                                            'bg-green-50 text-green-700 border-green-200'
                                                }`}>
                                                {u.role.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {u.role === 'doctor' ? (
                                                u.isDoctorApproved ? (
                                                    <span className="text-green-600 text-xs flex items-center gap-1"><CheckCircle size={12} /> Approved</span>
                                                ) : (
                                                    <span className="text-yellow-600 text-xs flex items-center gap-1"><AlertCircle size={12} /> Pending</span>
                                                )
                                            ) : (
                                                <span className="text-slate-400 text-xs">-</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right flex justify-end gap-2">
                                            {u.role === 'doctor' && !u.isDoctorApproved && (
                                                <Button size="sm" variant="outline" className="h-8 text-xs" onClick={() => handleApproveDoctor(u._id)}>
                                                    Approve
                                                </Button>
                                            )}

                                            {/* Cannot delete yourself or other super admins unless you handle hierarchy properly, for now keep simple */}
                                            {u._id !== user._id && u.role !== 'super-admin' && (
                                                <button
                                                    onClick={() => handleDeleteUser(u._id)}
                                                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete User"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {users.length === 0 && (
                            <div className="p-8 text-center text-slate-500">No users found.</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
