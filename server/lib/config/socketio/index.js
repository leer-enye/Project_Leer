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
    const rooms = new Map(); // map user.id => roomId
    const allUsers = new Map(); // map socket.id => socket
    const userList = new Map(); // map user.id => user(id, name, picture, socketId)
    const availableUsers = new Map();
    const socketUserList = new Map(); // map socket.id => user

    io.on(connection, socket => {
        socket.on(login, data => {
            const { _id: userId, name, picture } = data;
            const { id: socketId } = socket;
            const user = new User(userId, name, picture, socketId);
            userList.set(userId, user);
            availableUsers.set(userId, user);
            socketUserList.set(socketId, user);
            allUsers.set(socketId, socket);
        });
        socket.on(getUser, () => {
            const userMapClone = Object.assign({}, availableUsers);
            const { id: socketId } = socket;
            const { id: userId } = socketUserList.get(socketId);
            userMapClone.delete(userId);
            const otherUsers = [...userMapClone.values()];
            socket.emit(users, { users: otherUsers });
        });
        socket.on(message, data => {
            const { id: socketId } = socket;
            const { id: userId } = socketUserList.get(socketId);
            const room = rooms[userId];
            socket.broadcast.to(room).emit(message, data);
        });
        socket.on(leaveRoom, () => {
            const { id: socketId } = socket;
            const { id: userId, name, picture } = socketUserList.get(socketId);
            rooms.delete(userId);
            const user = new User(userId, name, picture, socketId);
            availableUsers.set(userId, user);
            socket.emit(challengeEnd);
        });
        socket.on(selectUser, data => {
            const { id: socketId } = socket;
            const originatingUser = socketUserList.get(socketId);
            const { id: selectedUserId } = data;
            const selectedUser = userList.get(selectedUserId);
            const { socketId: selectedUserSocketId } = selectedUser;
            const peer = allUsers.get(selectedUserSocketId);
            const roomId = `${originatingUser.id}#${selectedUser.id}`;

            // join them both
            peer.join(roomId);
            socket.join(roomId);

            availableUsers.delete(originatingUser.id);
            availableUsers.delete(selectedUser.id);

            // register user temporarirly to rooms
            rooms.set(selectedUser.id, roomId);
            rooms.set(originatingUser.id, roomId);

            peer.emit(challengeRequest, {
                room: roomId,
                user: originatingUser,
            });
            socket.emit(challengeRequest, { room: roomId, user: selectedUser });
        });
        socket.on(acceptChallenge, () => {
            // emit challengeStart
            const { id: socketId } = socket;
            const { id: userId } = socketUserList.get(socketId);
            const roomId = rooms.get(userId);
            socket.broadcast.to(roomId).emit(challengeStart);
        });
        socket.on(rejectChallenge, () => {
            const { id: socketId } = socket;
            const { id: userId, name, picture } = socketUserList.get(socketId);
            const user = new User(userId, name, picture, socketId);
            const roomId = rooms.get(userId);
            if (roomId) {
                socket.broadcast.to(roomId).emit(challengeEnd);
                const [partyA, partyB] = roomId.split('#');
                const peerId = partyA === userId ? partyB : partyA;
                rooms.delete(userId);
                rooms.delete(peerId);
                availableUsers.set(peerId, user);
                availableUsers.set(userId, user);
            }
        });
        socket.on(disconnet, () => {
            const { id: socketId } = socket;
            const { id: userId } = socketUserList.get(socketId);
            const roomId = rooms.get(userId);
            if (roomId) {
                rooms.delete(userId);
                socket.emit(challengeEnd);
            }
            userList.delete(userId);
            availableUsers.delete(userId);
            socketUserList.delete(socketId);
            allUsers.delete(socketId);
        });
    });
};
