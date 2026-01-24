import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from './ToastContext';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToast } = useToast();

    // Check if user is logged in
    useEffect(() => {
        const checkLoggedIn = async () => {
            const token = localStorage.getItem('token');

            if (token) {
                try {
                    // Set base URL for production
                    axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
                    // Set default headers for future requests
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                    const { data } = await axios.get('/api/auth/me');
                    setUser(data);
                } catch (error) {
                    console.error("Auth check failed:", error);
                    localStorage.removeItem('token');
                    delete axios.defaults.headers.common['Authorization'];
                    setUser(null);
                }
            }
            setLoading(false);
        };

        checkLoggedIn();
    }, []);

    // Login function
    const login = async (email, password) => {
        try {
            const { data } = await axios.post('/api/auth/login', { email, password });

            // Save token and user
            localStorage.setItem('token', data.token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
            setUser(data);

            addToast({ title: 'Welcome back!', message: `Signed in as ${data.firstName}`, type: 'success' });
            return data;
        } catch (error) {
            console.error("Login Error:", error.response?.data || error.message);
            const message = error.response?.data?.message || 'Login failed';
            addToast({ title: 'Error', message, type: 'error' });
            return null;
        }
    };

    // Register function
    const register = async (formData) => {
        try {
            const { data } = await axios.post('/api/auth/register', formData);

            // Save token and user
            localStorage.setItem('token', data.token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
            setUser(data);

            addToast({ title: 'Welcome!', message: 'Account created successfully', type: 'success' });
            return data;
        } catch (error) {
            console.error("Register Error:", error.response?.data || error.message);
            const message = error.response?.data?.message || 'Registration failed';
            addToast({ title: 'Error', message, type: 'error' });
            return null;
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
        addToast({ title: 'Signed out', message: 'See you next time!', type: 'info' });
    };

    const value = {
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
