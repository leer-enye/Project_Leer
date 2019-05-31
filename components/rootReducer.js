import { combineReducers } from 'redux';

import { reducers as profileReducers } from './profile';

export default combineReducers({
    profile: profileReducers,
});
