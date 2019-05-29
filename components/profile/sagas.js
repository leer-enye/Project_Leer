import { all } from 'redux-saga/effects';

export function* helloSaga(){
    console.log(' Hello Sagas! ');
    yield ;
};

export default function* (){
    yield all([
        helloSaga(),
    ]);
};
