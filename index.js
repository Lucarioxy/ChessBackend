const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

const { Server } = require('socket.io');

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.on('create-game', (roomName) => {
        socket.join(roomName);
    })

    socket.on('join-game', (roomName) => {
        const roomExists = Server.sockets.adapter.rooms.has(roomName)
        console.log(roomExists);
        if (roomExists) {
            socket.join(roomName)
            console.log(`User joined room ${roomName}`)
        } else {
            console.log(`Room ${roomName} does not exist`)
        }
    });
});
