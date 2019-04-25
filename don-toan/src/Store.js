import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';

import createRootReducer from './redux';

const logger = createLogger({
    level: 'info',
    collapsed: true
});

export default function configureStore(preloadedState) {
    const store = createStore(
        createRootReducer(),
        preloadedState,
        applyMiddleware(
            thunk,
            logger
        )
    );

    return store;
}