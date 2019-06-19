import {
    FETCH_COURSES_ACTION_TYPES,
    SELECT_COURSE_ACTION_TYPES,
    SELECT_MODE_ACTION_TYPES,
    SELECT_OPPONENT_ACTION_TYPES,
    SET_ONLINE_USERS_ACTION_TYPES,
    SET_CHALLENGE_REQ_STATUS_ACTION_TYPES,
    SET_CHALLENGE_END_STATUS_ACTION_TYPES,
    SET_CHALLENGE_ROOM_ACTION_TYPES,
    SET_CURRENT_QUESTION_ACTION_TYPES,
    SET_QUESTIONS_ACTION_TYPES,
    UPDATE_CHALLENGE_STORE_ACTION_TYPES
} from './actionTypes';

const {
    FETCH_COURSES_FULFILLED,
    FETCH_COURSES_REJECTED,
    FETCH_COURSES_REQUEST,
} = FETCH_COURSES_ACTION_TYPES;

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

const {
    SET_ONLINE_USERS,
    SET_ONLINE_USERS_REQUEST,
} = SET_ONLINE_USERS_ACTION_TYPES;

const {
    SET_CHALLENGE_REQ_STATUS,
    SET_CHALLENGE_REQ_STATUS_REQUEST,
} = SET_CHALLENGE_REQ_STATUS_ACTION_TYPES;

const {
    SET_CHALLENGE_END_STATUS,
    SET_CHALLENGE_END_STATUS_REQUEST,
} = SET_CHALLENGE_END_STATUS_ACTION_TYPES;

const {
    SET_CHALLENGE_ROOM,
    SET_CHALLENGE_ROOM_REQUEST,
} = SET_CHALLENGE_ROOM_ACTION_TYPES;

const {
    UPDATE_CHALLENGE_STORE,
    UPDATE_CHALLENGE_STORE_REQUEST,
} = UPDATE_CHALLENGE_STORE_ACTION_TYPES;

const {
    SET_CURRENT_QUESTION,
    SET_CURRENT_QUESTION_REQUEST,
} = SET_CURRENT_QUESTION_ACTION_TYPES;

const {
    SET_QUESTIONS,
    SET_QUESTIONS_REQUEST,
} = SET_QUESTIONS_ACTION_TYPES;

export const fetchCoursesRequest = () => ({
    type: FETCH_COURSES_REQUEST,
});

export const fetchCoursesFulfilled = courses => ({
    payload: courses,
    type: FETCH_COURSES_FULFILLED,
});

export const fetchCoursesRejected = () => ({
    type: FETCH_COURSES_REJECTED,
});

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

export const setOnlineUsersRequest = onlineUsers => ({
    payload: onlineUsers,
    type: SET_ONLINE_USERS_REQUEST,
});

export const setOnlineUsersAction = onlineUsers => ({
    payload: onlineUsers,
    type: SET_ONLINE_USERS,
});

// sets the status of any challenge request sent
// it can either be 'approved', 'rejected' or 'pending'
export const setChallengeReqStatusRequest = status => ({
    payload: status,
    type: SET_CHALLENGE_REQ_STATUS,
});

export const setChallengeReqStatusAction = status => ({
    payload: status,
    type: SET_CHALLENGE_REQ_STATUS_REQUEST,
});

// used to determine when both users have submitted solution
// it can either be 'completed', 'pending'
export const setChallengeEndStatusRequest = status => ({
    payload: status,
    type: SET_CHALLENGE_END_STATUS,
});

export const setChallengeEndStatusAction = status => ({
    payload: status,
    type: SET_CHALLENGE_END_STATUS_REQUEST,
});

export const setChallengeRoomRequest = room => ({
    payload: room,
    type: SET_CHALLENGE_ROOM,
});

export const setChallengeRoomAction = room => ({
    payload: room,
    type: SET_CHALLENGE_ROOM_REQUEST,
});

// update the store of the challengee with
// challenge details from challenger
export const updateChallengeStoreRequest = data => ({
    payload: data,
    type: UPDATE_CHALLENGE_STORE_REQUEST,
});

export const updateChallengeStoreAction = data => ({
    payload: data,
    type: UPDATE_CHALLENGE_STORE,
});

// for setting the current challenge question displayed in
// quiz component
export const setCurrentQuestionRequest = question => ({
    payload: question,
    type: SET_CURRENT_QUESTION,
});

export const setCurrentQuestionAction = question => ({
    payload: question,
    type: SET_CURRENT_QUESTION_REQUEST,
});

// for setting the challenge questions displayed in
// quiz component
export const setQuestionsRequest = questions => ({
    payload: questions,
    type: SET_QUESTIONS,
});

export const setQuestionsAction = questions => ({
    payload: questions,
    type: SET_QUESTIONS_REQUEST,
});
