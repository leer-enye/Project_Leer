import { all, put, takeLatest, select } from 'redux-saga/effects';
import axios from 'axios';

import {
    fetchCoursesFulfilled,
    fetchCoursesRejected,
    selectCourseAction,
    selectModeAction,
    selectOpponentAction,
    setOnlineUsersAction,
    setChallengeScoresAction,
    setChallengeReqStatusAction,
    setChallengeEndStatusAction,
    setChallengeRoomAction,
    setCurrentQuestionAction,
    setQuestionsAction,
    resetChallengeStoreAction,
    updateChallengeStoreAction
} from './actions';
import {
    FETCH_COURSES_ACTION_TYPES,
    SELECT_COURSE_ACTION_TYPES,
    SELECT_MODE_ACTION_TYPES,
    SELECT_OPPONENT_ACTION_TYPES,
    SET_ONLINE_USERS_ACTION_TYPES,
    SET_CHALLENGE_SCORES_ACTION_TYPES,
    SET_CHALLENGE_REQ_STATUS_ACTION_TYPES,
    SET_CHALLENGE_END_STATUS_ACTION_TYPES,
    SET_CHALLENGE_ROOM_ACTION_TYPES,
    SET_CURRENT_QUESTION_ACTION_TYPES,
    SET_QUESTIONS_ACTION_TYPES,
    RESET_CHALLENGE_STORE_ACTION_TYPES,
    UPDATE_CHALLENGE_STORE_ACTION_TYPES
} from './actionTypes';
import { selectors } from '../auth';
import { FETCH_COURSES_URL } from './constants';

const { FETCH_COURSES_REQUEST } = FETCH_COURSES_ACTION_TYPES;
const { SELECT_COURSE_REQUEST } = SELECT_COURSE_ACTION_TYPES;
const { SELECT_MODE_REQUEST } = SELECT_MODE_ACTION_TYPES;
const { SELECT_OPPONENT_REQUEST } = SELECT_OPPONENT_ACTION_TYPES;
const { SET_ONLINE_USERS_REQUEST } = SET_ONLINE_USERS_ACTION_TYPES;
const { SET_CHALLENGE_SCORES_REQUEST } = SET_CHALLENGE_SCORES_ACTION_TYPES;
const { SET_CHALLENGE_REQ_STATUS_REQUEST } = SET_CHALLENGE_REQ_STATUS_ACTION_TYPES;
const { SET_CHALLENGE_END_STATUS_REQUEST } = SET_CHALLENGE_END_STATUS_ACTION_TYPES;
const { SET_CHALLENGE_ROOM_REQUEST } = SET_CHALLENGE_ROOM_ACTION_TYPES;
const { SET_CURRENT_QUESTION_REQUEST } = SET_CURRENT_QUESTION_ACTION_TYPES;
const { SET_QUESTIONS_REQUEST } = SET_QUESTIONS_ACTION_TYPES;
const { RESET_CHALLENGE_STORE_REQUEST } = RESET_CHALLENGE_STORE_ACTION_TYPES;
const { UPDATE_CHALLENGE_STORE_REQUEST } = UPDATE_CHALLENGE_STORE_ACTION_TYPES;
const { getUser } = selectors;

function* fetchCourses(){
    try {
        const response = yield axios.get(`${FETCH_COURSES_URL}`);
        const { data } = response.data;
        const { subjects } = data;
        yield put(fetchCoursesFulfilled(subjects));
    }
    catch(e){
        //
        // console.error(e);
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
    try {
        yield put(setChallengeReqStatusAction(action.payload));
    }
    catch (e) {
        //
    }
};

function* setChallengeEndStatus(action) {
    try {
        yield put(setChallengeEndStatusAction(action.payload));
    }
    catch (e) {
        //
    }
};

function* setChallengeRoom(action) {
    try {
        yield put(setChallengeRoomAction(action.payload));
    }
    catch (e) {
        //
    }
};

function* setCurrentQuestion(action){
    try {
        yield put(setCurrentQuestionAction(action.payload));
    }
    catch(e){
        //
    }
}

function* setQuestions(action) {
    try {
        yield put(setQuestionsAction(action.payload));
    }
    catch (e) {
        //
    }
}

function* setChallengeScores(action) {
    try {
        yield put(setChallengeScoresAction(action.payload));
    }
    catch (e) {
        //
    }
}

function* updateChallengeStore(action) {
    try {
        yield put(updateChallengeStoreAction(action.payload));
    }
    catch (e) {
        //
    }
};

function* resetChallengeStore() {
    try {
        yield put(resetChallengeStoreAction());
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

function* watchSetChallengeEndStatus() {
    try {
        yield takeLatest(SET_CHALLENGE_END_STATUS_REQUEST, setChallengeEndStatus);
    }
    catch (e) {
        //
    }
};

function* watchSetChallengeRoom() {
    try {
        yield takeLatest(SET_CHALLENGE_ROOM_REQUEST, setChallengeRoom);
    }
    catch (e) {
        //
    }
};

function* watchSetCurrentQuestion(){
    try {
        yield takeLatest(SET_CURRENT_QUESTION_REQUEST, setCurrentQuestion);
    }
    catch(e){
        //
    }
}

function* watchSetQuestions() {
    try {
        yield takeLatest(SET_QUESTIONS_REQUEST, setQuestions);
    }
    catch (e) {
        //
    }
}

function* watchSetChallengeScores() {
    try {
        yield takeLatest(SET_CHALLENGE_SCORES_REQUEST, setChallengeScores);
    }
    catch (e) {
        //
    }
}

function* watchUpdateChallengeStore(){
    try {
        yield takeLatest(UPDATE_CHALLENGE_STORE_REQUEST, updateChallengeStore);
    }
    catch(e){
        //
    }
}

function* watchResetChallengeStore() {
    try {
        yield takeLatest(RESET_CHALLENGE_STORE_REQUEST, resetChallengeStore);
    }
    catch (e) {
        //
    }
}

export default function* (){
    yield all([
        watchFetchCourses(),
        watchSelectCourse(),
        watchSelectMode(),
        watchSelectOpponent(),
        watchSetOnlineUsers(),
        watchSetChallengeScores(),
        watchSetChallengeReqStatus(),
        watchSetChallengeEndStatus(),
        watchSetChallengeRoom(),
        watchSetCurrentQuestion(),
        watchSetQuestions(),
        watchResetChallengeStore(),
        watchUpdateChallengeStore(),
    ]);
}

