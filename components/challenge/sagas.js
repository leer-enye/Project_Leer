import { all, put, takeLatest, select } from 'redux-saga/effects';
import axios from 'axios';

import {
    fetchCoursesFulfilled,
    fetchCoursesRejected,
    selectCourseAction,
    selectModeAction,
    selectOpponentAction,
    setOnlineUsersAction,
    setChallengeReqStatusAction
} from './actions';
import {
    FETCH_COURSES_ACTION_TYPES,
    SELECT_COURSE_ACTION_TYPES,
    SELECT_MODE_ACTION_TYPES,
    SELECT_OPPONENT_ACTION_TYPES,
    SET_ONLINE_USERS_ACTION_TYPES,
    SET_CHALLENGE_REQ_STATUS_ACTION_TYPES
} from './actionTypes';
import { selectors } from '../auth';
import { FETCH_COURSES_URL } from './constants';

const { FETCH_COURSES_REQUEST } = FETCH_COURSES_ACTION_TYPES;
const { SELECT_COURSE_REQUEST } = SELECT_COURSE_ACTION_TYPES;
const { SELECT_MODE_REQUEST } = SELECT_MODE_ACTION_TYPES;
const { SELECT_OPPONENT_REQUEST } = SELECT_OPPONENT_ACTION_TYPES;
const { SET_ONLINE_USERS_REQUEST } = SET_ONLINE_USERS_ACTION_TYPES;
const { SET_CHALLENGE_REQ_STATUS_REQUEST } = SET_CHALLENGE_REQ_STATUS_ACTION_TYPES;
const { getUser } = selectors;

function* fetchCourses(){
    try {
        const response = yield axios.get(FETCH_COURSES_URL);
        console.log(response);
        const { data } = response.data;
        const { subjects } = data;
        yield put(fetchCoursesFulfilled(subjects));
    }
    catch(e){
        //
        console.error(e)
        yield put(fetchCoursesRejected());
    }
}

function* selectCourse(action){
    try {
        yield put(selectCourseAction(action.payload));
    }
    catch(e){
    //
    }
};

function* selectMode(action) {
    try {
        yield put(selectModeAction(action.payload));
    }
    catch (e) {
        //
    }
};

function* selectOpponent(action) {
    try {
        yield put(selectOpponentAction(action.payload));
    }
    catch (e) {
        //
    }
};

function* setOnlineUsers(action) {
    try {
        const user = yield select(getUser);
        // filter current user from list of online users
        const onlineUsers = action.payload.filter(({ id }) => user._id !== id);
        yield put(setOnlineUsersAction(onlineUsers));
    }
    catch (e) {
        //
    }
};

function* setChallengeReqStatus(action) {
    console.log('it got to set challenge')
    try {
        yield put(setChallengeReqStatusAction(action.payload));
    }
    catch (e) {
        //
    }
};

// WATCHERS

function* watchFetchCourses(){
    try {
        yield takeLatest(FETCH_COURSES_REQUEST, fetchCourses);
    }
    catch(e){
        //
    }
};

function* watchSelectCourse(){
    try{
        
        yield takeLatest(SELECT_COURSE_REQUEST, selectCourse);
    }
    catch(e){
    //
    }
};

function* watchSelectMode() {
    try {
        yield takeLatest(SELECT_MODE_REQUEST, selectMode);
    }
    catch (e) {
        //
    }
};

function* watchSelectOpponent() {
    try {
        yield takeLatest(SELECT_OPPONENT_REQUEST, selectOpponent);
    }
    catch (e) {
        //
    }
};

function* watchSetOnlineUsers() {
    try {
        yield takeLatest(SET_ONLINE_USERS_REQUEST, setOnlineUsers);
    }
    catch (e) {
        //
    }
};

function* watchSetChallengeReqStatus() {
    try {
        yield takeLatest(SET_CHALLENGE_REQ_STATUS_REQUEST, setChallengeReqStatus);
    }
    catch (e) {
        //
    }
};

export default function* (){
    yield all([
        watchFetchCourses(),
        watchSelectCourse(),
        watchSelectMode(),
        watchSelectOpponent(),
        watchSetOnlineUsers(),
        watchSetChallengeReqStatus(),
    ]);
}

