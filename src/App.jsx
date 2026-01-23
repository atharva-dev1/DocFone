import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { AnimatePresence } from 'framer-motion';

// Pages
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { DoctorDashboard } from './pages/DoctorDashboard';
import { FindDoctor } from './pages/FindDoctor';
import { Booking } from './pages/Booking';
import { Prescription } from './pages/Prescription';
import { Chat } from './pages/Chat';

// Scroll to top wrapper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <div className="text-slate-900 bg-slate-50 min-h-screen font-sans selection:bg-primary-500/30">
            <Layout>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
                <Route path="/doctors" element={<FindDoctor />} />
                <Route path="/book-appointment" element={<Booking />} />
                <Route path="/prescription" element={<Prescription />} />
                <Route path="/chat" element={<Chat />} />
              </Routes>
            </Layout>
          </div>
        </Router>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
