import { 
    FETCH_USER_ACTION_TYPES,
    REMOVE_SESSION,
    SAVE_SESSION_ACTION_TYPES,
    UPDATE_USER_ACTION_TYPES
} from './actionTypes';

const {
    FETCH_USER_REQUEST,
    FETCH_USER_REJECTED,
} = FETCH_USER_ACTION_TYPES;

const {
    UPDATE_USER_FULFILLED,
    UPDATE_USER_REJECTED,
    UPDATE_USER_REQUEST,
} = UPDATE_USER_ACTION_TYPES;

const {
    SAVE_SESSION,
    SAVE_SESSION_REQUEST,
} = SAVE_SESSION_ACTION_TYPES;

export const updateUserRequest = data => ({
    payload: data,
    type: UPDATE_USER_REQUEST,
});

export const updateUserFulfilled = user => ({
    payload: user,
    type: UPDATE_USER_FULFILLED,
});

export const updateUserRejected = err => ({
    payload: err,
    type: UPDATE_USER_REJECTED,
});

export const fetchUserRequest = () => ({
    type: FETCH_USER_REQUEST,
});

export const fetchUserRejected = () => ({
    payload: null,
    type: FETCH_USER_REJECTED,
});

export const saveSessionRequest = session => ({
    payload: session,
    type: SAVE_SESSION_REQUEST,
});

export const saveSessionAction = session => ({
    payload: session,
    type: SAVE_SESSION,
});

export const removeSession = () => ({
    type: REMOVE_SESSION,
});
