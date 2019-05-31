import { all } from 'redux-saga/effects';

import { sagas as profileSagas } from './profile';

export default function* rootSaga() {
    yield all([
        profileSagas(),
    ]);
}

