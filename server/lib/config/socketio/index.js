const fetch = require('isomorphic-unfetch');
const { URL } = require('url');
const SOCKET_IO_EVENTS = require('./constant');
const User = require('./user');
const Challenge = require('./challenge');

const { CUSTOM_EVENTS, LOADING_STATE, SERVER_SYSTEM_EVENTS } = SOCKET_IO_EVENTS;

const {
    acceptChallenge,
    ackChallengeRequest,
    challengeEnd,
    challengeRequest,
    challengeStart,
    getUser,
    getNextQuestion,
    getQuestions,
    leaveRoom,
    login,
    onRejectedChallenge,
    receiveQuestion,
    receiveQuestions,
    rejectChallenge,
    selectUser,
    submitScore,
    users,
} = CUSTOM_EVENTS;

const { connection, message, disconnet } = SERVER_SYSTEM_EVENTS;
const { loading, loaded, notLoaded } = LOADING_STATE;

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
        const onlineUsers = [...allUsers.values()];
        io.emit(users, {
            availableUsers: otherUsers,
            users: onlineUsers,
        });
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
            const userMapClone = new Map(availableUsers);
            const { id: socketId } = socket;
            const { id: userId } = socketUsers.get(socketId);
            userMapClone.delete(userId);
            const otherUsers = [...userMapClone.values()];
            const onlineUsers = [...allUsers.values()];
            socket.emit(users, {
                availableUsers: otherUsers,
                users: onlineUsers,
            });
        });
        socket.on(message, data => {
            const { id: socketId } = socket;
            const { id: userId } = socketUsers.get(socketId);
            const room = rooms[userId];
            io.in(room).emit(message, data);
        });
        socket.on(leaveRoom, data => {
            const { roomId } = data;
            socket.leave(roomId);
        });
        socket.on(selectUser, data => {
            const { id: socketId } = socket;
            const originatingUser = socketUsers.get(socketId);
            const { challengeStore, subject, user } = data;
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
                const tempUserScores = [
                    [originatingUser.id, 0],
                    [selectedUser.id, 0],
                ];
                const userScore = new Map(tempUserScores);
                const tempScoreReceivedStatus = [
                    [originatingUser.id, false],
                    [selectedUser.id, false],
                ];
                const scoreReceivedStatus = new Map(tempScoreReceivedStatus);
                const challenge = new Challenge(
                    roomId,
                    subject,
                    userScore,
                    scoreReceivedStatus
                );
                roomChallenge.set(roomId, challenge);

                peer.emit(challengeRequest, {
                    challengeStore,
                    room: roomId,
                    subject,
                    user: originatingUser,
                });
                socket.emit(ackChallengeRequest, {
                    room: roomId,
                    subject,
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
            // sending to all clients in 'game' room, including sender
            io.in(roomId).emit(challengeStart, { room: roomId });
        });
        socket.on(rejectChallenge, () => {
            const { id: socketId } = socket;
            const { id: userId, name, picture } = socketUsers.get(socketId);
            const user = new User(userId, name, picture, socketId);
            const roomId = rooms.get(userId);

            if (roomId) {
                io.in(roomId).emit(onRejectedChallenge);
                const [partyA, partyB] = roomId.split('#');
                const peerId = partyA === userId ? partyB : partyA;
                const peer = allUsers.get(peerId);
                [userId, peerId].forEach(item => rooms.delete(item));
                roomChallenge.delete(roomId);
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
                    socket.leave(roomId);
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
            const { subject } = challenge;
            const { _id: subjectId } = subject;

            if (challenge.questions.length > 0) {
                challenge.increaseQuestionIndex();
                const question = challenge.getCurrentQuestion();
                socket.emit(receiveQuestion, { question });
            } else {
                const { NODE_ENV } = process.env;
                const protocol = NODE_ENV === 'production' ? 'https' : 'http';
                const { host } = socket.handshake.headers; // .split(":").shift();
                const path = `${protocol}://${host}/api/questions/`;
                const url = new URL(path);
                const params = {
                    limit: 10,
                    subjectId,
                };
                Object.keys(params).forEach(key =>
                    url.searchParams.append(key, params[key])
                );
                const apiURL = url.toString();
                const res = await fetch(apiURL);
                const { data: json } = await res.json();
                const { questions } = json;
                challenge.questions = questions;
                const question = challenge.getCurrentQuestion();
                socket.emit(receiveQuestion, { question });
            }
        });
        socket.on(getQuestions, async data => {
            const { roomId } = data;
            const challenge = roomChallenge.get(roomId);
            const { subject, loadingState } = challenge;
            const { _id: subjectId } = subject;
            if (loadingState === notLoaded) {
                challenge.updateLoadingStatus(loading);
                const { NODE_ENV } = process.env;
                const protocol = NODE_ENV === 'production' ? 'https' : 'http';
                const { host } = socket.handshake.headers; // .split(":").shift();
                const path = `${protocol}://${host}/api/questions/`;
                const url = new URL(path);
                const params = {
                    limit: 10,
                    subjectId,
                };
                Object.keys(params).forEach(key =>
                    url.searchParams.append(key, params[key])
                );
                const apiURL = url.toString();
                const res = await fetch(apiURL);
                const { data: json } = await res.json();
                const { questions } = json;
                challenge.questions = questions;
                challenge.updateLoadingStatus(loaded);
                io.in(roomId).emit(receiveQuestions, { questions });
            } else if (loadingState === loaded) {
                const { questions } = challenge;
                socket.emit(receiveQuestions, { questions });
            }
        });

        socket.on(submitScore, data => {
            console.log(data);
            const { roomId, score, userId } = data;
            const { id: socketId } = socket;
            const challenge = roomChallenge.get(roomId);
            if (challenge) {
                challenge.submitScore(userId, score);
                const { scores, scoresReceivedStatus } = challenge;
                const [user1ReceivedScoreStatus, user2ReceivedScoreStatus] = [
                    ...scoresReceivedStatus.values(),
                ];
                if (
                    user1ReceivedScoreStatus === true &&
					user2ReceivedScoreStatus === true
                ) {
                    const output = {};
                    scores.forEach((value, key) => {
                        output[key] = value;
                    });

                    console.log('both score submitted');
                    console.log(output);
                    const { name, picture } = socketUsers.get(socketId);
                    const user = new User(userId, name, picture, socketId);
                    const [partyA, partyB] = roomId.split('#');
                    const peerId = partyA === userId ? partyB : partyA;
                    const peer = allUsers.get(peerId);
                    const { socketId: peerSocketId } = peer;
                    const peerSocket = allSockets.get(peerSocketId);
                    [socket, peerSocket].forEach(item => item.leave(roomId));
                    [userId, peerId].forEach(item => rooms.delete(item));
                    roomChallenge.delete(roomId);
                    availableUsers.set(peerId, peer);
                    availableUsers.set(userId, user);
                    // [socket, peerSocket].forEach(item =>
                    //    item.emit(challengeEnd, { scores: output }));
                    io.to(roomId).emit(challengeEnd, { scores: output });
                }
            }
        });
    });
};
