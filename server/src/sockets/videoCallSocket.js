module.exports = (io) => {
    io.on('connection', (socket) => {
        // Video Call Signaling Events

        socket.on('join-room', ({ roomId, userId }) => {
            socket.join(roomId);
            console.log(`User ${userId} joined video room ${roomId}`);
            socket.to(roomId).emit('user-connected', userId);
        });

        socket.on('offer', ({ roomId, offer }) => {
            socket.to(roomId).emit('offer', offer);
        });

        socket.on('answer', ({ roomId, answer }) => {
            socket.to(roomId).emit('answer', answer);
        });

        socket.on('ice-candidate', ({ roomId, candidate }) => {
            socket.to(roomId).emit('ice-candidate', candidate);
        });

        socket.on('disconnect-call', ({ roomId }) => {
            socket.to(roomId).emit('user-disconnected');
            socket.leave(roomId);
        });
    });
};
