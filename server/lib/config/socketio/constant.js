/* eslint-disable sort-keys */
const CUSTOM_EVENTS = {
    challengeEnd: 'challenge_end',
    challengeStart: 'challenge_start',
    getUser: 'get_users',
    leaveRoom: 'leave_room',
    login: 'login',
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
