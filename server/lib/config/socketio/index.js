const SOCKET_IO_EVENTS = require('./constant');

const { CUSTOM_EVENTS, SERVER_SYSTEM_EVENTS } = SOCKET_IO_EVENTS;

const {
    challengeEnd,
    challengeStart,
    getUser,
    leaveRoom,
    login,
    users,
} = CUSTOM_EVENTS;

const { connection, message, disconnet } = SERVER_SYSTEM_EVENTS;

module.exports = io => {
    const queue = []; // list of sockets waiting for peers
    const rooms = {}; // map socket.id => room
    const names = {}; // map socket.id => name
    const allUsers = {}; // map socket.id => socket
    const userList = {}; // map user.id => socket.id, user.name & user.picture
    const socketUserList = {}; // map socket.id => user
    // const usersSockets = {};

    // match socket id to user id
    // keep socket
    // keep user

    // Update socked id same user

    const findPeerForLoneSocket = socket => {
        // TODO Prevent two people pairing multiple times
        if (queue && queue.length > 0) {
            const peer = queue.pop();
            const room = `${socket.id}#${peer.id}`;
            // join them both

            peer.join(room);
            socket.join(room);
            // register rooms to their names
            rooms[peer.id] = room;
            rooms[socket.id] = room;
            // exchange names between the two of them and start the challenge
            peer.emit(challengeStart, { name: names[socket.id], room });
            socket.emit(challengeStart, { name: names[peer.id], room });
        } else {
            // queue is empty, add our lone socket
            queue.push(socket);
        }
    };

    io.on(connection, socket => {
        console.log(`User ${socket.id} connected`);
        socket.on(login, data => {
            const { _id, name, picture } = data;
            const { id } = socket;

            const userExists = !(userList[_id] === undefined);
            if (userExists) {
                const oldSocketId = userList[_id].id;
                delete socketUserList[oldSocketId];
                delete allUsers[oldSocketId];
                delete names[oldSocketId];
            }
            userList[_id] = { id, name, picture };
            console.log(userList);
            names[id] = name;
            allUsers[id] = socket;
            socketUserList[id] = data;
            // now check if somebody is in queue
            // findPeerForLoneSocket(socket);
        });
        socket.on(getUser, data => {
            const userListClone = Object.assign({}, userList);
            delete userListClone[data._id];
            socket.emit(users, { userListClone });
        });
        socket.on(message, data => {
            const room = rooms[socket.id];
            socket.broadcast.to(room).emit(message, data);
        });
        socket.on(leaveRoom, () => {
            const room = rooms[socket.id];
            socket.broadcast.to(room).emit(challengeEnd);
            let peerID = room.split('#');
            peerID = peerID[0] === socket.id ? peerID[1] : peerID[0];
            // add both current and peer to the queue
            findPeerForLoneSocket(allUsers[peerID]);
            findPeerForLoneSocket(socket);
        });
        socket.on(disconnet, () => {
            console.log('disconnected called');
            const room = rooms[socket.id];
            if (room) {
                socket.broadcast.to(room).emit(challengeEnd);
                let peerID = room.split('#');
                peerID = peerID[0] === socket.id ? peerID[1] : peerID[0];
                // current socket left, add the other one to the queue
                findPeerForLoneSocket(allUsers[peerID]);
            }
        });
    });
};
