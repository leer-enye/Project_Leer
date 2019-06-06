import { all, put, takeLatest, select } from 'redux-saga/effects';
import axios from 'axios';

import { 
    SAVE_SESSION, 
    REMOVE_SESSION,
    SAVE_SESSION_REQUEST, 
    FETCH_USER_REQUEST, 
    FETCH_USER_FULFILLED, 
    FETCH_USER_REJECTED,
    UPDATE_USER_REQUEST,
    UPDATE_USER_FULFILLED,
    UPDATE_USER_REJECTED
} from './actionTypes';
import { FETCH_USER_URL, UPDATE_USER_URL } from './constants';
import { getSession, getUser } from './selectors';

function* saveSession(action){
    try {
        yield put({ payload: action.payload, type: SAVE_SESSION  });
        yield put({ type: FETCH_USER_REQUEST });
    }
    catch(e){
        console.log(e);
    }
}

function* watchSaveSession(){
    try {
        yield takeLatest(SAVE_SESSION_REQUEST, saveSession);
    }
    catch(e){
        console.log(e);
    }
}

function* fetchUser (){
    try {
        
        const session = yield select(getSession);
        const response = yield axios.get(FETCH_USER_URL, { headers: session });
        const { data } = response.data;
        const { user } = data;
        yield put({ payload: user, type: FETCH_USER_FULFILLED });
    }
    catch(e){
        console.log('got to error');
        console.log(e);
        // error is probably because cookie has expired
        yield put({ type: REMOVE_SESSION });
        yield put({ payload: null, type: FETCH_USER_REJECTED });
    }
}

function* watchFetchUser(){
    try {
        yield takeLatest(FETCH_USER_REQUEST, fetchUser);
    }catch(e){
        console.log(e);  
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
        yield put({ payload: user, type: UPDATE_USER_FULFILLED });
    }
    catch (e) {
        console.log('got to error');
        console.log(e);
        yield put({ payload: null, type: UPDATE_USER_REJECTED });
    }
}

function* watchUpdateUser() {
    try {
        yield takeLatest(UPDATE_USER_REQUEST, updateUser);
    } catch (e) {
        console.log(e);
    }
}

export default function* (){
    yield all([
        watchSaveSession(),
        watchFetchUser(),
        watchUpdateUser(),
    ]);
};
