import {
    SELECT_COURSE_ACTION_TYPES,
    SELECT_MODE_ACTION_TYPES,
    SELECT_OPPONENT_ACTION_TYPES,
    SET_ONLINE_USERS_ACTION_TYPES
} from './actionTypes';

const { SELECT_COURSE } = SELECT_COURSE_ACTION_TYPES;
const { SELECT_MODE } = SELECT_MODE_ACTION_TYPES;
const { SELECT_OPPONENT } = SELECT_OPPONENT_ACTION_TYPES;
const { SET_ONLINE_USERS } = SET_ONLINE_USERS_ACTION_TYPES;

const initialState = {
    courses: [],
    onlineUsers: [],
    selectedCourse: null,
    selectedMode: null,
    selectedOpponent: null,
};

export default (state = initialState, action) => {
    switch(action.type){
    
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

    default:
        return state;
    }
};
