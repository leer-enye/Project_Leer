import {
    SELECT_COURSE_ACTION_TYPES,
    SELECT_MODE_ACTION_TYPES,
    SELECT_OPPONENT_ACTION_TYPES
} from './actionTypes';

const {
    SELECT_COURSE,
    SELECT_COURSE_REQUEST,
} = SELECT_COURSE_ACTION_TYPES;

const {
    SELECT_MODE,
    SELECT_MODE_REQUEST,
} = SELECT_MODE_ACTION_TYPES;

const {
    SELECT_OPPONENT,
    SELECT_OPPONENT_REQUEST,
} = SELECT_OPPONENT_ACTION_TYPES;

export const selectCourseRequest = course => ({
    payload: course,
    type: SELECT_COURSE_REQUEST,
});

export const selectCourseAction = course => ({
    payload: course,
    type: SELECT_COURSE,
});

export const selectModeRequest = mode => ({
    payload: mode,
    type: SELECT_MODE_REQUEST,
});

export const selectModeAction = mode => ({
    payload: mode,
    type: SELECT_MODE,
});

export const selectOpponentRequest = opponent => ({
    payload: opponent,
    type: SELECT_OPPONENT_REQUEST,
});

export const selectOpponentAction = opponent => ({
    payload: opponent,
    type: SELECT_OPPONENT,
});
