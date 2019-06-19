import { all, put, takeLatest, select } from 'redux-saga/effects';
import axios from 'axios';

import { 
    fetchUserRequest,
    fetchUserRejected,
    updateUserFulfilled,
    updateUserRejected, 
    saveSessionAction,
    removeSession
} from './actions';
import { 
    FETCH_USER_ACTION_TYPES,
    SAVE_SESSION_ACTION_TYPES, 
    UPDATE_USER_ACTION_TYPES
} from './actionTypes';
import { FETCH_USER_URL, UPDATE_USER_URL } from './constants';
import { getSession, getUser } from './selectors';

const { FETCH_USER_REQUEST } = FETCH_USER_ACTION_TYPES;
const { SAVE_SESSION_REQUEST } = SAVE_SESSION_ACTION_TYPES;
const { UPDATE_USER_REQUEST } = UPDATE_USER_ACTION_TYPES;

//  SAGA FUNCTIONS

function* saveSession(action){
    try {
        yield put(saveSessionAction(action.payload));
        yield put(fetchUserRequest());
    }
    catch(e){
        // console.log(e);
    }
}

function* fetchUser (){
    try {
        
        const session = yield select(getSession);
        
        const response = yield axios.get(FETCH_USER_URL, { headers: session });
        const { data } = response.data;
        const { user } = data;
        yield put(updateUserFulfilled(user));
    }
    catch(e){
        // error is probably because cookie has expired
        // console.log(e);
        yield put(removeSession());
        yield put(fetchUserRejected());
    }
}

function* updateUser(action) {
    try {
        const session = yield select(getSession);
        const { _id } = yield select(getUser);

        const response = yield axios.put(
            `${UPDATE_USER_URL}/${_id}`,
            action.payload,
            { headers: session }
        );
        const { data } = response.data;
        const { user } = data;
        yield put(updateUserFulfilled(user));
    }
    catch (e) {
        // console.log(e);
        yield put(updateUserRejected(null));
    }
}

// SAGA WATCHERS

function* watchSaveSession() {
    try {
        yield takeLatest(SAVE_SESSION_REQUEST, saveSession);
    }
    catch (e) {
        // console.log(e);
    }
}

function* watchFetchUser(){
    try {
        yield takeLatest(FETCH_USER_REQUEST, fetchUser);
    }catch(e){
        // console.log(e);  
    }
}

function* watchUpdateUser() {
    try {
        yield takeLatest(UPDATE_USER_REQUEST, updateUser);
    } catch (e) {
        // console.log(e);
    }
}

export default function* (){
    yield all([
        watchSaveSession(),
        watchFetchUser(),
        watchUpdateUser(),
    ]);
};
