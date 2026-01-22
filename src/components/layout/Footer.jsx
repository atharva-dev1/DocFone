export const Footer = () => {
    return (
        <footer className="bg-white/50 backdrop-blur-lg border-t border-slate-200 mt-20">
            <div className="max-w-7xl mx-auto px-4 py-8 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                            Medyxra
                        </h3>
                        <p className="text-slate-500 text-sm">
                            Advanced healthcare management for the next generation.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-slate-800 mb-4">Platform</h4>
                        <ul className="space-y-2 text-sm text-slate-500">
                            <li><a href="#" className="hover:text-primary-600">Find Doctors</a></li>
                            <li><a href="#" className="hover:text-primary-600">Book Appointment</a></li>
                            <li><a href="#" className="hover:text-primary-600">Consultation</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-slate-800 mb-4">Company</h4>
                        <ul className="space-y-2 text-sm text-slate-500">
                            <li><a href="#" className="hover:text-primary-600">About Us</a></li>
                            <li><a href="#" className="hover:text-primary-600">Careers</a></li>
                            <li><a href="#" className="hover:text-primary-600">Privacy Policy</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-slate-800 mb-4">Support</h4>
                        <ul className="space-y-2 text-sm text-slate-500">
                            <li><a href="#" className="hover:text-primary-600">Help Center</a></li>
                            <li><a href="#" className="hover:text-primary-600">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-primary-600">Contact</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-slate-200 text-center text-slate-400 text-sm">
                    © {new Date().getFullYear()} Medyxra. All rights reserved.
                </div>
            </div>
        </footer>
    );
};
