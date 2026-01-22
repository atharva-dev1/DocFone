import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Filter, Star } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

const DoctorCard = ({ name, specialty, location, rating, distance, image, delay }) => (
    <Card className="flex flex-col h-full group cursor-pointer" delay={delay}>
        <div className="relative mb-4 overflow-hidden rounded-xl">
            <div className="aspect-[4/3] bg-slate-200 w-full" />
            {/* Placeholder for image */}
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold text-slate-700 flex items-center gap-1 shadow-sm">
                <Star size={12} className="text-yellow-400 fill-yellow-400" /> {rating}
            </div>
        </div>

        <div>
            <h3 className="text-lg font-bold text-slate-800 group-hover:text-primary-600 transition-colors">{name}</h3>
            <p className="text-primary-500 font-medium text-sm mb-2">{specialty}</p>

            <div className="flex items-center gap-4 text-slate-500 text-sm mb-4">
                <span className="flex items-center gap-1"><MapPin size={14} /> {location}</span>
                <span className="text-slate-300">•</span>
                <span>{distance}</span>
            </div>

            <Button className="w-full" variant="outline">Book Appointment</Button>
        </div>
    </Card>
);

export const FindDoctor = () => {
    const [search, setSearch] = useState('');

    // Mock Data
    const doctors = [
        { name: 'Dr. Priya Sharma', specialty: 'General Physician', location: 'Mumbai, MH', rating: 4.8, distance: '1.2 km' },
        { name: 'Dr. Rajesh Kumar', specialty: 'Cardiologist', location: 'Delhi, DL', rating: 4.9, distance: '2.5 km' },
        { name: 'Dr. Anjali Desai', specialty: 'Dermatologist', location: 'Ahmedabad, GJ', rating: 4.7, distance: '3.0 km' },
        { name: 'Dr. Vikram Singh', specialty: 'Pediatrician', location: 'Bangalore, KA', rating: 4.9, distance: '0.8 km' },
        { name: 'Dr. Sunita Patil', specialty: 'Neurologist', location: 'Pune, MH', rating: 4.6, distance: '5.2 km' },
        { name: 'Dr. Amit Verma', specialty: 'Orthopedist', location: 'Chennai, TN', rating: 4.8, distance: '4.1 km' },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-6 pb-12">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Find a Doctor</h1>
                <p className="text-slate-500">Search for the best specialists near you.</p>
            </div>

            {/* Search & Filters */}
            <div className="bg-white/50 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-lg mb-8 flex flex-col md:flex-row gap-4">
                <div className="flex-grow">
                    <Input
                        placeholder="Search doctors, specialties, or clinics..."
                        icon={Search}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="bg-white"
                    />
                </div>
                <div className="w-full md:w-48">
                    <Input
                        placeholder="Zip Code"
                        icon={MapPin}
                        className="bg-white"
                    />
                </div>
                <Button variant="secondary" icon={Filter}>Filters</Button>
                <Button>Search</Button>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {doctors.map((doc, idx) => (
                    <DoctorCard key={idx} {...doc} delay={idx * 0.1} />
                ))}
            </div>
        </div>
    );
};
