/* eslint-disable sort-keys */
const CUSTOM_EVENTS = {
    acceptChallenge: 'accept_challenge',
    ackChallengeRequest: 'acknowledge_challenge_request',
    challengeEnd: 'challenge_end',
    challengeRequest: 'challenge_request',
    challengeStart: 'challenge_start',
    getNextQuestion: 'get_next_question',
    getUser: 'get_users',
    leaveRoom: 'leave_room',
    login: 'login',
    onRejectedChallenge : 'on_rejected_challenge',
    receiveQuestion: 'receive_question',
    rejectChallenge: 'reject_challenge',
    selectUser: 'selectUser',
    users: 'users',
};

const SERVER_SYSTEM_EVENTS = {
    connection: 'connection',
    message: 'message',
    disconnet: 'disconnect',
};

const CLIENT_SYSTEM_EVENTS = {
    open: 'open',
    connect: 'connect',
    connectTimeout: 'connect_timeout',
    connectError: 'connect_error',
    reconnectAttempt: 'reconnect_attempt',
    reconnect: 'reconnect',
    reconnectError: 'reconnect_error',
    reconnectFailed: 'reconnect_failed',
    close: 'close',
};

module.exports = {
    CUSTOM_EVENTS,
    SERVER_SYSTEM_EVENTS,
    CLIENT_SYSTEM_EVENTS,
};
