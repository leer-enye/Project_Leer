import { all } from 'redux-saga/effects';

import { sagas as authSagas } from './auth';
import { sagas as challengeSagas } from './challenge';
import { sagas as profileSagas } from './profile';

export default function* rootSaga() {
    yield all([
        authSagas(),
        challengeSagas(),
        profileSagas(),
    ]);
}

