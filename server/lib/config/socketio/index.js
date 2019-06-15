const fetch = require('isomorphic-unfetch');
const { URL } = require('url');
const SOCKET_IO_EVENTS = require('./constant');
const User = require('./user');
const Challenge = require('./challenge');

const { CUSTOM_EVENTS, SERVER_SYSTEM_EVENTS } = SOCKET_IO_EVENTS;

const {
    acceptChallenge,
    ackChallengeRequest,
    challengeEnd,
    challengeRequest,
    challengeStart,
    getUser,
    getNextQuestion,
    leaveRoom,
    login,
    rejectChallenge,
    selectUser,
    sendQuestion,
    users,
} = CUSTOM_EVENTS;

const { connection, message, disconnet } = SERVER_SYSTEM_EVENTS;

module.exports = io => {
    const rooms = new Map(); // map user.id => roomId
    const allSockets = new Map(); // map socket.id => socket
    const allUsers = new Map(); // map user.id => user(id, name, picture, socketId)
    const availableUsers = new Map();
    const socketUsers = new Map(); // map socket.id => user
    const roomChallenge = new Map(); // map roomId => challenge(roomId, subjectId, questions[])

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
            [allUsers, availableUsers].forEach(item => item.set(userId, user));
            socketUsers.set(socketId, user);
            allSockets.set(socketId, socket);
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
            const { subject: subjectId, user } = data;
            const { id: selectedUserId } = user;
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
                const challenge = new Challenge(roomId, subjectId);
                roomChallenge.set(roomId, challenge);

                peer.emit(challengeRequest, {
                    room: roomId,
                    subject: subjectId,
                    user: originatingUser,
                });
                socket.emit(ackChallengeRequest, {
                    room: roomId,
                    subject: subjectId,
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
            socket.broadcast.to(roomId).emit(challengeStart, { room: roomId });
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
                    roomChallenge.delete(roomId);
                    socket.emit(challengeEnd);
                }

                [allUsers, availableUsers].forEach(item => item.delete(userId));
            }
            [socketUsers, allSockets].forEach(item => item.delete(socketId));
        });
        socket.on(getNextQuestion, async data => {
            // TODOS
            // event answer with user data, question id and option id
            // Update Score

            const { roomId } = data;
            const challenge = roomChallenge.get(roomId);

            if (challenge.question > 0) {
                challenge.increaseQuestionIndex();
                const question = challenge.getCurrentQuestion();
                socket.emit(sendQuestion, { question });
            } else {
                const { host } = socket.handshake.headers; // .split(":").shift();
                const path = `${host}/api/questions/`;
                const url = new URL(path);
                const params = {
                    limit: 10,
                    subjectId: '5d03ade5f721544844347cce',
                };
                Object.keys(params).forEach(key =>
                    url.searchParams.append(key, params[key])
                );
                const apiURL = url.toString();
                console.log(apiURL);
                const res = await fetch(apiURL);
                const { data: json } = await res.json();
                const { questions } = json;
                challenge.questions = questions;
                const question = challenge.getCurrentQuestion();
                socket.emit(sendQuestion, { question });
            }
        });
    });
};
