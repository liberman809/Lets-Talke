const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const { createServer } = require('http');
const { ExpressPeerServer } = require("peer");



dotenv.config();
const mongoURL = process.env.MONGOOSE_URI;

const app = express();

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true,
    },
});

const peerServer = ExpressPeerServer(server, {
    debug: true
});

app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
    credentials: true,
};
app.use(cors(corsOptions));

const authRoute = require('./api/auth/auth.router');
const userRoute = require('./api/user/user.roure');
const chatRoute = require('./api/chat/chat.router');
const messageRoute = require('./api/message/message.router');


app.use("/peerjs", peerServer);
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/chat', chatRoute);
app.use('/api/message', messageRoute);

io.on('connection', (socket) => {
    
    socket.on('listen',function(id){
        socket.join(id)
    })

    socket.on("addUser",function(id){
        console.log('adduser',id)
        socket.to(id).emit('addUser',id);
    })

    socket.on("chat",function(room){
        socket.join(room);
        socket.broadcast.to(room).emit("aaa",room);
    })
    socket.on("newMsg",function(room){
        socket.broadcast.to(room).emit("newMsg",room);
    })

    // socket.on('disconnect', () => {
    //     console.log(`User disconnected: ${socket.id}`);
    // });
});

app.get("/api/ping", (req, res) => {
  res.send("pong");
});


mongoose.connect(mongoURL)
    .then(() => {
        server.listen(3030, () => {
            console.log('App listening on port 3030');
            return "aviv"
        });
    })
    .catch((err) => {
        console.log('Database connection error:', err);
    });

