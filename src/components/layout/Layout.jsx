import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col pt-20">
            <Navbar />
            <main className="flex-grow relative z-0">
                {/* Background Gradients */}
                <div className="fixed top-0 left-0 right-0 -z-10 h-screen overflow-hidden pointer-events-none">
                    <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[60%] bg-primary-200/20 rounded-full blur-3xl animate-pulse-slow" />
                    <div className="absolute top-[30%] -right-[10%] w-[40%] h-[50%] bg-secondary-200/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
                    <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[50%] bg-blue-200/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
                </div>
                {children}
            </main>
            <Footer />
        </div>
    );
};
