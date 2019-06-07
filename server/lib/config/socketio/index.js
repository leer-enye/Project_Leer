const SOCKET_IO_EVENTS = require('./constant');
const User = require('./user');

const { CUSTOM_EVENTS, SERVER_SYSTEM_EVENTS } = SOCKET_IO_EVENTS;

const {
    acceptChallenge,
    challengeEnd,
    challengeRequest,
    challengeStart,
    getUser,
    leaveRoom,
    login,
    rejectChallenge,
    selectUser,
    users,
} = CUSTOM_EVENTS;

const { connection, message, disconnet } = SERVER_SYSTEM_EVENTS;

module.exports = io => {
    const rooms = {}; // map socket.id => room
    const allUsers = new Map(); // map socket.id => socket
    const userList = new Map(); // map user.id => user(id, name, picture, socketId)
    const socketUserList = new Map(); // map socket.id => user
    // match socket id to user id
    // keep socket
    // keep user
    // Update socked id same user

    io.on(connection, socket => {
        console.log(`User ${socket.id} connected`);
        socket.on(login, data => {
            const { _id: userId, name, picture } = data;
            const { id: socketId } = socket;
            const user = new User(userId, name, picture, socketId);
            userList.set(userId, user);
            socketUserList.set(socketId, user);
            allUsers.set(socketId, socket);
        });
        socket.on(getUser, () => {
            const userMapClone = Object.assign({}, userList);
            const { id: socketId } = socket;
            const { id: userId } = socketUserList.get(socketId);
            userMapClone.delete(userId);
            const otherUsers = [...userMapClone.values()];
            socket.emit(users, { users: otherUsers });
        });
        socket.on(message, data => {
            const room = rooms[socket.id];
            socket.broadcast.to(room).emit(message, data);
        });
        socket.on(leaveRoom, () => {
            const room = rooms[socket.id];
            socket.broadcast.to(room).emit(challengeEnd);
        });
        socket.on(selectUser, data => {
            const { id: socketId } = socket;
            const originatingUser = socketUserList.get(socketId);
            const { id: selectedUserId } = data;
            const selectedUser = userList.get(selectedUserId);
            const { socketId: selectedUserSocketId } = selectedUser;
            const peer = allUsers.get(selectedUserSocketId);
            const room = `${originatingUser.id}#${selectedUser.id}`;

            // join them both
            peer.join(room);
            socket.join(room);

            // register user temporarirly to rooms
            rooms[selectedUser.id] = room;
            rooms[originatingUser.id] = room;

            peer.emit(challengeRequest, { room, user: originatingUser });
            socket.emit(challengeStart, { room, user: selectedUser });
        });
        socket.on(acceptChallenge, () => {});
        socket.on(rejectChallenge, () => {});
        socket.on(disconnet, () => {
            const { id: socketId } = socket;
            const originatingUser = socketUserList.get(socketId);
            const { id: userId } = originatingUser;
            const room = rooms[userId];
            if (room) {
                socket.broadcast.to(room).emit(challengeEnd);
            }
            socketUserList.delete(socketId);
            allUsers.delete(socketId);
        });
    });
};
