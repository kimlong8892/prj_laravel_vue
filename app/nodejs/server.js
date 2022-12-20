// const varible
const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, {cors: {origin: '*'}});

server.listen(3000);

function loadMemberRoom(room_id, io) {
    const clients = io.sockets.adapter.rooms.get(room_id);
    const numClients = clients ? clients.size : 0;
    let list_user = {};

    if (numClients > 0) {
        for (const clientId of clients) {
            const clientSocket = io.sockets.sockets.get(clientId);
            list_user[clientSocket.user_data.id] = clientSocket.user_data;
        }
    }

    return list_user;
}

io.on('connection', function (socket) {
    if (socket.client.conn.hasOwnProperty('server')) {
        io.emit('server-send-list-user-online', {count: socket.client.conn.server.clientsCount});
    }

    // socket.on('user-send-id', (data) => {
    //     if (data.hasOwnProperty('id') && data.id) {
    //         socket.id = data.id;
    //     }
    // });

    socket.on('user-send-chat-all', (data) => {
        socket.broadcast.emit('server-send-chat-all', data);
    });

    socket.on("disconnect", (socket) => {
        //socket.emit('server-send-list-user-online', {count: socket.client.conn.server.clientsCount});
    });

    socket.on('disconnecting', (reason) => {
        if (socket.client.conn.hasOwnProperty('server')) {
            io.emit('server-send-list-user-online', {count: socket.client.conn.server.clientsCount});
        }
    });
});


// use api route
const apiRoute = require('./routes/api');
app.use('/api', apiRoute);
app.get('/', function (req, res) {
    console.log(123);
    res.send({
        test: 123
    });
})