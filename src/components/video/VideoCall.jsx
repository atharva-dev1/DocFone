import { useRef, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { useAuth } from '../../context/AuthContext';
import { Mic, MicOff, Video, VideoOff, PhoneOff } from 'lucide-react';

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

export const VideoCall = () => {
    const { appointmentId } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const [status, setStatus] = useState('Initializing...');

    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const socketRef = useRef(null);
    const peerRef = useRef(null);
    const localStreamRef = useRef(null);

    useEffect(() => {
        socketRef.current = io(SOCKET_URL);

        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
                localStreamRef.current = stream;
                if (localVideoRef.current) {
                    localVideoRef.current.srcObject = stream;
                }

                setStatus('Waiting for other party...');
                socketRef.current.emit('join-room', { roomId: appointmentId, userId: user._id });

                socketRef.current.on('user-connected', (userId) => {
                    setStatus('Connecting...');
                    console.log('User connected:', userId);
                    // Initiate call (Offer)
                    createOffer();
                });

                socketRef.current.on('offer', handleReceiveOffer);
                socketRef.current.on('answer', handleReceiveAnswer);
                socketRef.current.on('ice-candidate', handleNewICECandidate);
                socketRef.current.on('user-disconnected', () => {
                    setStatus('User disconnected');
                    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
                });
            })
            .catch(err => {
                console.error("Error accessing media devices:", err);
                setStatus('Error: Could not access camera/microphone');
            });

        return () => {
            if (localStreamRef.current) {
                localStreamRef.current.getTracks().forEach(track => track.stop());
            }
            if (socketRef.current) socketRef.current.disconnect();
            if (peerRef.current) peerRef.current.close();
        };
    }, [appointmentId, user]);

    const createPeerConnection = () => {
        const peer = new RTCPeerConnection({
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' }
            ]
        });

        peer.onicecandidate = (event) => {
            if (event.candidate) {
                socketRef.current.emit('ice-candidate', { roomId: appointmentId, candidate: event.candidate });
            }
        };

        peer.ontrack = (event) => {
            if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = event.streams[0];
            }
        };

        localStreamRef.current.getTracks().forEach(track => {
            peer.addTrack(track, localStreamRef.current);
        });

        return peer;
    };

    const createOffer = async () => {
        peerRef.current = createPeerConnection();
        const offer = await peerRef.current.createOffer();
        await peerRef.current.setLocalDescription(offer);
        socketRef.current.emit('offer', { roomId: appointmentId, offer });
    };

    const handleReceiveOffer = async (offer) => {
        peerRef.current = createPeerConnection();
        await peerRef.current.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await peerRef.current.createAnswer();
        await peerRef.current.setLocalDescription(answer);
        socketRef.current.emit('answer', { roomId: appointmentId, answer });
    };

    const handleReceiveAnswer = async (answer) => {
        await peerRef.current.setRemoteDescription(new RTCSessionDescription(answer));
    };

    const handleNewICECandidate = async (candidate) => {
        try {
            if (peerRef.current) {
                await peerRef.current.addIceCandidate(new RTCIceCandidate(candidate));
            }
        } catch (e) {
            console.error('Error adding received ice candidate', e);
        }
    };

    const toggleMute = () => {
        if (localStreamRef.current) {
            localStreamRef.current.getAudioTracks()[0].enabled = isMuted;
            setIsMuted(!isMuted);
        }
    };

    const toggleVideo = () => {
        if (localStreamRef.current) {
            localStreamRef.current.getVideoTracks()[0].enabled = isVideoOff;
            setIsVideoOff(!isVideoOff);
        }
    };

    const endCall = () => {
        socketRef.current.emit('disconnect-call', { roomId: appointmentId });
        navigate('/dashboard');
    };

    return (
        <div className="flex flex-col h-screen bg-slate-900 text-white">
            <div className="flex-1 relative flex items-center justify-center p-4">
                {/* Remote Video (Main) */}
                <video
                    ref={remoteVideoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-contain rounded-xl bg-black"
                />
                <div className="absolute top-4 left-4 bg-black/50 px-4 py-2 rounded-full text-sm font-medium">
                    {status}
                </div>

                {/* Local Video (PiP) */}
                <div className="absolute bottom-24 right-4 w-32 h-48 md:w-48 md:h-64 bg-slate-800 rounded-lg overflow-hidden border-2 border-slate-700 shadow-xl">
                    <video
                        ref={localVideoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* Controls */}
            <div className="h-20 bg-slate-800 flex items-center justify-center gap-6">
                <button onClick={toggleMute} className={`p-4 rounded-full ${isMuted ? 'bg-red-500' : 'bg-slate-600 hover:bg-slate-500'}`}>
                    {isMuted ? <MicOff /> : <Mic />}
                </button>
                <button onClick={endCall} className="p-4 rounded-full bg-red-600 hover:bg-red-700">
                    <PhoneOff />
                </button>
                <button onClick={toggleVideo} className={`p-4 rounded-full ${isVideoOff ? 'bg-red-500' : 'bg-slate-600 hover:bg-slate-500'}`}>
                    {isVideoOff ? <VideoOff /> : <Video />}
                </button>
            </div>
        </div>
    );
};
