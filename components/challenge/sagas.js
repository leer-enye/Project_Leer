import { all, put, takeLatest, select } from 'redux-saga/effects';
import axios from 'axios';

import {
    selectCourseAction,
    selectModeAction,
    selectOpponentAction
} from './actions';
import {
    SELECT_COURSE_ACTION_TYPES,
    SELECT_MODE_ACTION_TYPES,
    SELECT_OPPONENT_ACTION_TYPES
} from './actionTypes';

const { SELECT_COURSE_REQUEST } = SELECT_COURSE_ACTION_TYPES;
const { SELECT_MODE_REQUEST } = SELECT_MODE_ACTION_TYPES;
const { SELECT_OPPONENT_REQUEST } = SELECT_OPPONENT_ACTION_TYPES;

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

export default function* (){
    yield all([
        watchSelectCourse(),
        watchSelectMode(),
        watchSelectOpponent(),
    ]);
}

