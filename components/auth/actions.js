import { 
    UPDATE_USER_REQUEST,
    UPDATE_USER_FULFILLED,
    UPDATE_USER_REJECTED
} from './actionTypes';

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
