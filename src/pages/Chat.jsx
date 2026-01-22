import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MoreVertical, Image, Paperclip, Phone, Video } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

const messages = [
    { id: 1, text: "Hi Doctor, I've sent my reports.", time: '10:00 AM', sender: 'me' },
    { id: 2, text: "Hello Alex, I've received them. Looks good overall.", time: '10:02 AM', sender: 'doctor' },
    { id: 3, text: "However, your cholesterol is slightly high.", time: '10:03 AM', sender: 'doctor' },
    { id: 4, text: "Should I change my diet?", time: '10:05 AM', sender: 'me' },
];

export const Chat = () => {
    const [msgList, setMsgList] = useState(messages);
    const [text, setText] = useState('');

    const handleSend = (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        setMsgList([...msgList, {
            id: Date.now(),
            text,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            sender: 'me'
        }]);
        setText('');
    };

    return (
        <div className="max-w-5xl mx-auto h-[calc(100dvh-140px)] px-4 md:px-6 pb-4 flex gap-6">
            {/* Sidebar - Contacts */}
            <div className="w-80 hidden md:flex flex-col bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 p-4 h-full shadow-lg">
                <h2 className="text-xl font-bold text-slate-800 mb-6 px-2">Messages</h2>
                <div className="space-y-2 overflow-y-auto">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className={`p-3 rounded-xl flex items-center gap-3 cursor-pointer transition-colors ${i === 1 ? 'bg-primary-50 border border-primary-100' : 'hover:bg-slate-50'}`}>
                            <div className="w-12 h-12 rounded-full bg-slate-200 relative">
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800 text-sm">Dr. Priya Sharma</h4>
                                <p className="text-xs text-slate-500 truncate">Should I change my diet?</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 h-full shadow-lg flex flex-col overflow-hidden relative">
                {/* Header */}
                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white/50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-200" />
                        <div>
                            <h3 className="font-bold text-slate-800">Dr. Priya Sharma</h3>
                            <p className="text-xs text-green-600 font-medium">Online</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500">
                        <Button variant="ghost" size="icon"><Phone size={20} /></Button>
                        <Button variant="ghost" size="icon"><Video size={20} /></Button>
                        <Button variant="ghost" size="icon"><MoreVertical size={20} /></Button>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    <AnimatePresence initial={false}>
                        {msgList.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[70%] px-4 py-3 rounded-2xl ${msg.sender === 'me'
                                        ? 'bg-gradient-to-tr from-primary-500 to-primary-600 text-white rounded-br-sm shadow-md'
                                        : 'bg-white text-slate-700 rounded-bl-sm border border-slate-100 shadow-sm'
                                        }`}
                                >
                                    <p>{msg.text}</p>
                                    <p className={`text-[10px] mt-1 text-right ${msg.sender === 'me' ? 'text-primary-100' : 'text-slate-400'}`}>
                                        {msg.time}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Input */}
                <div className="p-4 bg-white border-t border-slate-100">
                    <form onSubmit={handleSend} className="flex gap-2">
                        <Button variant="ghost" size="icon" type="button" className="text-slate-400 hover:text-slate-600">
                            <Paperclip size={20} />
                        </Button>
                        <input
                            className="flex-1 bg-slate-50 rounded-xl px-4 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-100 transition-all font-medium"
                            placeholder="Type a message..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                        <Button type="submit" size="icon" className="rounded-xl w-12 bg-primary-600 hover:bg-primary-700">
                            <Send size={18} />
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};
