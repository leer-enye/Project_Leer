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
    const allSockets = new Map(); // map socket.id => socket
    const allUsers = new Map(); // map user.id => user(id, name, picture, socketId)
    const availableUsers = new Map();
    const socketUsers = new Map(); // map socket.id => user

    const sendAvailableUserList = socket => {
        const userMapClone = new Map(availableUsers);
        const { id: socketId } = socket;
        const { id: userId } = socketUsers.get(socketId);
        userMapClone.delete(userId);
        const otherUsers = [...userMapClone.values()];
        io.emit(users, { users: otherUsers });
    };

    io.on(connection, socket => {
        socket.on(login, data => {
            const { _id: userId, name, picture } = data;
            const { id: socketId } = socket;
            const user = new User(userId, name, picture, socketId);
            allUsers.set(userId, user);
            socketUsers.set(socketId, user);
            allSockets.set(socketId, socket);
            availableUsers.set(userId, user);
            sendAvailableUserList(socket);
        });
        socket.on(getUser, () => {
            sendAvailableUserList(socket);
        });
        socket.on(message, data => {
            const { id: socketId } = socket;
            const { id: userId } = socketUsers.get(socketId);
            const room = rooms[userId];
            socket.broadcast.to(room).emit(message, data);
        });
        socket.on(leaveRoom, () => {
            const { id: socketId } = socket;
            const { id: userId, name, picture } = socketUsers.get(socketId);
            rooms.delete(userId);
            const user = new User(userId, name, picture, socketId);
            availableUsers.set(userId, user);
            sendAvailableUserList(socket);
            socket.emit(challengeEnd);
        });
        socket.on(selectUser, data => {
            console.log('calling Select User');
            const { id: socketId } = socket;
            const originatingUser = socketUsers.get(socketId);
            const { id: selectedUserId } = data;
            const selectedUser = allUsers.get(selectedUserId);
            const { socketId: selectedUserSocketId } = selectedUser || {};
            if (selectedUserSocketId) {
                const peer = allSockets.get(selectedUserSocketId);
                const roomId = `${originatingUser.id}#${selectedUser.id}`;

                // temporarily join both to rooms
                [peer, socket].forEach(item => item.join(roomId));

                // Remove from avaialbe queue
                [originatingUser, selectedUser].forEach(item =>
                    availableUsers.delete(item.id)
                );

                // register user temporarirly to rooms
                [originatingUser, selectedUser].forEach(item =>
                    rooms.set(item.id, roomId)
                );

                peer.emit(challengeRequest, {
                    room: roomId,
                    user: originatingUser,
                });
                socket.emit(challengeRequest, {
                    room: roomId,
                    user: selectedUser,
                });

                [socket, peer].forEach(item => sendAvailableUserList(item));
            }
        });
        socket.on(acceptChallenge, () => {
            // emit challengeStart
            const { id: socketId } = socket;
            const { id: userId } = socketUsers.get(socketId);
            const roomId = rooms.get(userId);
            socket.broadcast.to(roomId).emit(challengeStart);
        });
        socket.on(rejectChallenge, () => {
            const { id: socketId } = socket;
            const { id: userId, name, picture } = socketUsers.get(socketId);
            const user = new User(userId, name, picture, socketId);
            const roomId = rooms.get(userId);

            if (roomId) {
                socket.broadcast.to(roomId).emit(challengeEnd);
                const [partyA, partyB] = roomId.split('#');
                const peerId = partyA === userId ? partyB : partyA;
                const peer = allUsers.get(peerId);
                [userId, peerId].forEach(item => rooms.delete(item));
                availableUsers.set(peerId, peer);
                availableUsers.set(userId, user);
            }
        });
        socket.on(disconnet, () => {
            const { id: socketId } = socket;
            const { id: userId } = socketUsers.get(socketId) || {};
            if (userId) {
                const roomId = rooms.get(userId);

                if (roomId) {
                    rooms.delete(userId);
                    socket.emit(challengeEnd);
                }

                [allUsers, availableUsers].forEach(item => item.delete(userId));
            }
            [socketUsers, allSockets].forEach(item => item.delete(socketId));
        });
    });
};
