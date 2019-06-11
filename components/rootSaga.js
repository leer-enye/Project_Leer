import { all } from 'redux-saga/effects';

import { sagas as profileSagas } from './profile';
import { sagas as authSagas } from './auth';

export default function* rootSaga() {
    yield all([
        authSagas(),
        profileSagas(),
    ]);
}

