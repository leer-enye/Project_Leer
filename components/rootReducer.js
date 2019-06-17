import { combineReducers } from 'redux';

import { reducers as authReducers } from './auth';
import { reducers as challengeReducers } from './challenge';
import { reducers as profileReducers } from './profile';

export default combineReducers({
    auth: authReducers,
    challenge: challengeReducers,
    profile: profileReducers,
});
