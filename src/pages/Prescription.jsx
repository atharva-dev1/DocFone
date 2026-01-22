import { useState } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, FileText, Check, Trash2, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export const Prescription = () => {
    const [dragActive, setDragActive] = useState(false);
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            // Mock handle file
            addFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            addFile(e.target.files[0]);
        }
    };

    const addFile = (file) => {
        setUploading(true);
        // Simulate upload
        setTimeout(() => {
            setFiles([...files, { name: file.name, size: (file.size / 1024 / 1024).toFixed(2) + ' MB' }]);
            setUploading(false);
        }, 1500);
    };

    const removeFile = (idx) => {
        const newFiles = [...files];
        newFiles.splice(idx, 1);
        setFiles(newFiles);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 md:px-6 pb-12">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Upload Prescriptions</h1>
                <p className="text-slate-500">Upload your doctor's prescription for digital records and medicine ordering.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Upload Area */}
                <Card className="h-full">
                    <div
                        className={`h-64 border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-6 text-center transition-colors ${dragActive ? 'border-primary-500 bg-primary-50' : 'border-slate-300 hover:border-primary-400 bg-slate-50/50'
                            }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mb-4">
                            {uploading ? <Loader2 className="animate-spin" size={32} /> : <UploadCloud size={32} />}
                        </div>

                        <p className="font-semibold text-slate-700 mb-1">
                            {uploading ? 'Processing...' : 'Click or Drag & Drop'}
                        </p>
                        <p className="text-sm text-slate-500 mb-4">SVG, PNG, JPG or PDF</p>

                        <label className="cursor-pointer">
                            <Button size="sm" variant="secondary" onClick={() => document.getElementById('file-upload').click()}>
                                Select File
                            </Button>
                            <input id="file-upload" type="file" className="hidden" onChange={handleChange} />
                        </label>
                    </div>

                    {/* File List */}
                    {files.length > 0 && (
                        <div className="mt-6 space-y-3">
                            <h4 className="font-semibold text-slate-800 text-sm">Uploaded Files</h4>
                            {files.map((file, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                                            <FileText size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-700 truncate max-w-[150px]">{file.name}</p>
                                            <p className="text-xs text-slate-400">{file.size}</p>
                                        </div>
                                    </div>
                                    <button onClick={() => removeFile(idx)} className="text-slate-400 hover:text-red-500">
                                        <Trash2 size={18} />
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </Card>

                {/* Info/Preview Side */}
                <div className="space-y-6">
                    <Card className="bg-gradient-to-br from-primary-500 to-primary-600 text-white">
                        <h3 className="text-xl font-bold mb-2">How it works?</h3>
                        <ul className="space-y-4 opacity-90">
                            <li className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold mt-0.5">1</div>
                                <p className="text-sm">Upload a clear image of your valid prescription.</p>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold mt-0.5">2</div>
                                <p className="text-sm">Our AI scans and digitizes the medicines listed.</p>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold mt-0.5">3</div>
                                <p className="text-sm">Pharmacist verifies the order and prepares it.</p>
                            </li>
                        </ul>
                    </Card>

                    {files.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <Card>
                                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> AI Analysis Preview
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center text-sm p-2 bg-slate-50 rounded">
                                        <span className="font-medium text-slate-700">Amoxicillin 500mg</span>
                                        <span className="text-slate-500">2 strips</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm p-2 bg-slate-50 rounded">
                                        <span className="font-medium text-slate-700">Paracetamol 650mg</span>
                                        <span className="text-slate-500">1 strip</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm p-2 bg-slate-50 rounded">
                                        <span className="font-medium text-slate-700">Vitamin C</span>
                                        <span className="text-slate-500">1 bottle</span>
                                    </div>
                                </div>
                                <Button className="w-full mt-4">Order Medicines</Button>
                            </Card>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};
