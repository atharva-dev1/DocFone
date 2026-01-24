import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, User, Calendar, MessageSquare, Menu, X, Crown } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const isAuthPage = ['/login', '/register'].includes(location.pathname);

    const { user, logout } = useAuth();

    if (isAuthPage) return null;

    const links = [
        { name: 'Home', path: '/' },
        { name: 'Find Doctors', path: '/doctors' },
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Doctor View', path: '/doctor-dashboard' },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-6">
            <nav className="mx-auto max-w-7xl rounded-2xl bg-white/70 backdrop-blur-xl border border-white/20 shadow-lg px-6 py-3 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="bg-primary-500 rounded-lg p-2 text-white shadow-lg shadow-primary-500/30 group-hover:scale-110 transition-transform">
                        <Activity size={24} />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                        DocFone
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {links.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`text-sm font-medium transition-colors hover:text-primary-600 relative ${location.pathname === link.path ? 'text-primary-600' : 'text-slate-600'
                                }`}
                        >
                            {link.name}
                            {location.pathname === link.path && (
                                <motion.div
                                    layoutId="underline"
                                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-500 rounded-full"
                                />
                            )}
                        </Link>
                    ))}
                </div>



                <div className="hidden md:flex items-center gap-4">
                    {user ? (
                        <>
                            <Link to="/premium">
                                <Button variant="outline" size="sm" className="border-yellow-500 text-yellow-600 hover:bg-yellow-50">
                                    <Crown size={14} className="mr-1" /> Upgrade
                                </Button>
                            </Link>
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-sm">
                                    {user.firstName ? user.firstName[0] : 'U'}
                                </div>
                                <span className="text-sm font-medium text-slate-700">{user.firstName}</span>
                            </div>
                            <Button variant="ghost" size="sm" onClick={logout}>Sign Out</Button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                <Button variant="ghost" size="sm">Sign In</Button>
                            </Link>
                            <Link to="/register">
                                <Button variant="primary" size="sm">Get Started</Button>
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden p-2 text-slate-600"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </nav>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-24 left-4 right-4 bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 md:hidden flex flex-col gap-4"
                >
                    {links.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                            className="text-lg font-medium text-slate-700 py-2 border-b border-slate-100"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="flex flex-col gap-3 mt-2">
                        {user ? (
                            <Button variant="secondary" className="w-full" onClick={logout}>Sign Out</Button>
                        ) : (
                            <>
                                <Link to="/login" onClick={() => setIsOpen(false)}>
                                    <Button variant="secondary" className="w-full">Sign In</Button>
                                </Link>
                                <Link to="/register" onClick={() => setIsOpen(false)}>
                                    <Button variant="primary" className="w-full">Get Started</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </motion.div>
            )}
        </header>
    );
};
