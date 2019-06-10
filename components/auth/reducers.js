import { 
    FETCH_USER_ACTION_TYPES,
    SAVE_SESSION_ACTION_TYPES,
    UPDATE_USER_ACTION_TYPES,
    REMOVE_SESSION
} from "./actionTypes";

const {
    FETCH_USER_REJECTED,
} = FETCH_USER_ACTION_TYPES;

const {
    UPDATE_USER_FULFILLED,
    UPDATE_USER_REJECTED,
    UPDATE_USER_REQUEST,
} = UPDATE_USER_ACTION_TYPES;

const {
    SAVE_SESSION,
} = SAVE_SESSION_ACTION_TYPES;

const initialState = {
    errors: null,
    loading: false,
    session: null,
    user: null,
};

export default (state=initialState, action) => {
    switch(action.type){
    case SAVE_SESSION:
        return {
            ...state,
            session: action.payload,
        };
    
    case REMOVE_SESSION:
        return {
            ...state,
            session: null,
        };

    case UPDATE_USER_REQUEST:
        return {
            ...state,
            loading: true,
        };

    case UPDATE_USER_FULFILLED:
        return {
            ...state,
            errors: null,
            loading: false,
            user: action.payload,
        };

    case FETCH_USER_REJECTED:
        return {
            ...state,
            user: null,
        };

    case UPDATE_USER_REJECTED:
        return { ...state, errors: action.payload, loading: false };

    default:
        return state;
    }
};

