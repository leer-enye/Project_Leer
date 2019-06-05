import { SAVE_SESSION, FETCH_USER_FULFILLED, FETCH_USER_REJECTED } from "./actionTypes";

const initialState = {
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

    case FETCH_USER_FULFILLED:
        return {
            ...state,
            user: action.payload,
        };

    case FETCH_USER_REJECTED:
        return {
            ...state,
            user: null,
        };

    default:
        return state;
    }
};
