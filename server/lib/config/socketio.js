module.exports = io => {
    const queue = []; // list of sockets waiting for peers
    const rooms = {}; // map socket.id => room
    const names = {}; // map socket.id => name
    const allUsers = {}; // map socket.id => socket

    const findPeerForLoneSocket = socket => {
        // To-do: Prevent two people pairing multiple times
        if (queue && queue.length > 0) {
            const peer = queue.pop();

            const room = `${socket.id}#${peer.id}`;
            // join them both
            peer.join(room);
            socket.join(room);
            // register rooms to their names
            rooms[peer.id] = room;
            rooms[socket.id] = room;
            // exchange names between the two of them and start the chat
            peer.emit('challenge-start', { name: names[socket.id], room });
            socket.emit('challenge-start', { name: names[peer.id], room });
        } else {
            // queue is empty, add our lone socket
            queue.push(socket);
        }
    };

    io.on('connection', socket => {
        console.log(`User ${socket.id} connected`);
        socket.on('login', data => {
            names[socket.id] = data.name;
            allUsers[socket.id] = socket;
            // now check if somebody is in queue
            findPeerForLoneSocket(socket);
        });
        socket.on('get-users', () => {
            socket.emit('users', { names });
        });
        socket.on('message', data => {
            const room = rooms[socket.id];
            socket.broadcast.to(room).emit('message', data);
        });
        socket.on('leave-room', () => {
            const room = rooms[socket.id];
            socket.broadcast.to(room).emit('challenge-end');
            let peerID = room.split('#');
            peerID = peerID[0] === socket.id ? peerID[1] : peerID[0];
            // add both current and peer to the queue
            findPeerForLoneSocket(allUsers[peerID]);
            findPeerForLoneSocket(socket);
        });
        socket.on('disconnect', () => {
            const room = rooms[socket.id];
            if (room) {
                socket.broadcast.to(room).emit('challenge-end');
                let peerID = room.split('#');
                peerID = peerID[0] === socket.id ? peerID[1] : peerID[0];
                // current socket left, add the other one to the queue
                findPeerForLoneSocket(allUsers[peerID]);
            }
        });
    });
};
