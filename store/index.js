import { applyMiddleware, createStore  } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../components/rootReducer';
import rootSaga from "../components/rootSaga";

const bindMiddleware = middleware => {
    // if (process.env.NODE_ENV !== 'production'){
    //     return composeWithDevTools(applyMiddleware(...middleware));
    // }
    return composeWithDevTools(applyMiddleware(...middleware));
    // return applyMiddleware(...middleware);
};

function configureStore(initialState={}) {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        rootReducer,
        initialState,
        bindMiddleware([sagaMiddleware])
    );

    store.sagaTask = sagaMiddleware.run(rootSaga);

    return store;
};

export default configureStore;
