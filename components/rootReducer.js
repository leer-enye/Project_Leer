import { combineReducers } from 'redux';

import { reducers as profileReducers } from './profile';
import { reducers as authReducers } from './auth';

export default combineReducers({
    auth: authReducers,
    profile: profileReducers,
});
