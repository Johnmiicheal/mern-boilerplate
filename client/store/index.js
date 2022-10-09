import { configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import { createReduxHistoryContext } from 'redux-first-history';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import createRootReducer from './reducers';

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
  history: createBrowserHistory(),
});

const middlewares = [routerMiddleware, thunk];
const logger = createLogger({ collapsed: true, diff: true });

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

export const store = configureStore({
  reducer: createRootReducer(routerReducer),
  middleware: [routerMiddleware, thunk, logger],
  devTools: process.env.NODE_ENV !== 'production',
});

export const history = createReduxHistory(store);
