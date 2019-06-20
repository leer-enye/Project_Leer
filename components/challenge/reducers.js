import {
    FETCH_COURSES_ACTION_TYPES,
    SELECT_COURSE_ACTION_TYPES,
    SELECT_MODE_ACTION_TYPES,
    SELECT_OPPONENT_ACTION_TYPES,
    SET_ONLINE_USERS_ACTION_TYPES,
    SET_CHALLENGE_REQ_STATUS_ACTION_TYPES,
    SET_CHALLENGE_ROOM_ACTION_TYPES,
    SET_CURRENT_QUESTION_ACTION_TYPES,
    SET_QUESTIONS_ACTION_TYPES,
    UPDATE_CHALLENGE_STORE_ACTION_TYPES,
    SET_CHALLENGE_END_STATUS_ACTION_TYPES
} from './actionTypes';

const { FETCH_COURSES_FULFILLED, FETCH_COURSES_REJECTED } = FETCH_COURSES_ACTION_TYPES;
const { SELECT_COURSE } = SELECT_COURSE_ACTION_TYPES;
const { SELECT_MODE } = SELECT_MODE_ACTION_TYPES;
const { SELECT_OPPONENT } = SELECT_OPPONENT_ACTION_TYPES;
const { SET_ONLINE_USERS } = SET_ONLINE_USERS_ACTION_TYPES;
const { SET_CHALLENGE_REQ_STATUS } = SET_CHALLENGE_REQ_STATUS_ACTION_TYPES;
const { SET_CHALLENGE_END_STATUS } = SET_CHALLENGE_END_STATUS_ACTION_TYPES;
const { SET_CHALLENGE_ROOM } = SET_CHALLENGE_ROOM_ACTION_TYPES;
const { SET_CURRENT_QUESTION } = SET_CURRENT_QUESTION_ACTION_TYPES;
const { SET_QUESTIONS } = SET_QUESTIONS_ACTION_TYPES;
const { UPDATE_CHALLENGE_STORE } = UPDATE_CHALLENGE_STORE_ACTION_TYPES;

const initialState = {
    // challengeEndStatus
    // can either be 'pending' or 'completed'
    // it becomes completed when second user finishes his challenge
    challengeEndStatus: null,
    // challengeReqStatus
    // can either be 'pending', 'approved' or 'rejected'
    // it is populated when a Challenge Request is made
    challengeReqStatus: null,
    challengeRoom: null,
    courses: [],
    currentQuestion: 0,
    onlineUsers: [],
    questions: [],
    selectedCourse: null,
    selectedMode: null,
    selectedOpponent: null,
};

export default (state = initialState, action) => {
    switch(action.type){
    
    case FETCH_COURSES_REJECTED:
        return {
            ...state,
        };

    case FETCH_COURSES_FULFILLED:
        return {
            ...state,
            courses: action.payload,
        };

    case SELECT_COURSE:
        return {
            ...state,
            selectedCourse: action.payload,
        };
    
    case SELECT_MODE:
        return {
            ...state,
            selectedMode: action.payload,
        };
    
    case SELECT_OPPONENT:
        return {
            ...state,
            selectedOpponent: action.payload,
        };

    case SET_ONLINE_USERS:
        return {
            ...state,
            onlineUsers: action.payload,
        };

    case SET_CHALLENGE_REQ_STATUS:
        return {
            ...state,
            challengeReqStatus: action.payload,
        };

    case SET_CHALLENGE_END_STATUS:
        return {
            ...state,
            challengeEndStatus: action.payload,
        };

    case SET_CHALLENGE_ROOM:
        return {
            ...state,
            challengeRoom: action.payload,
        };

    case SET_CURRENT_QUESTION:
        return {
            ...state,
            currentQuestion: action.payload,
        };

    case SET_QUESTIONS:
        return {
            ...state,
            questions: action.payload,
        };
    
    // update details such as
    // selectedMode, selectedOpponent
    // selectedCourse, challengeRoom
    case UPDATE_CHALLENGE_STORE:
        return {
            ...state,
            ...action.payload,
        };

    default:
        return state;
    }
};
