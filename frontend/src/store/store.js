import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import userReducer from './reducers/userReducer';
import eventReducer from './reducers/eventReducer';
import groupReducer from './reducers/groupReducer';
import otherReducer from './reducers/otherReducer';

export const history = createBrowserHistory();
const rootReducer = combineReducers({
  ur: userReducer,
  evt: eventReducer,
  gr: groupReducer,
  or: otherReducer,
  router: connectRouter(history),
});
export const middlewares = [thunk, routerMiddleware(history)];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer,
  composeEnhancers(
    applyMiddleware(...middlewares),
  ));

export default store;
