import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux';
import { connectRouter } from 'connected-react-router';

import { history, middlewares } from '../store/store';

const getMockReducer = jest.fn(
  (initialState) => (state = initialState, action) => {
    switch (action.type) {
      default:
        break;
    }
    return state;
  },
);

const getMockStore = (initialState) => {
  const mockUserReducer = getMockReducer(initialState);
  const mockEventReducer = getMockReducer(initialState);
  const mockGroupReducer = getMockReducer(initialState);
  const mockOtherReducer = getMockReducer(initialState);
  const rootReducer = combineReducers({
    ur: mockUserReducer,
    evt: mockEventReducer,
    gr: mockGroupReducer,
    or: mockOtherReducer,
    router: connectRouter(history),
  });
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const mockStore = createStore(rootReducer,
    composeEnhancers(applyMiddleware(...middlewares)));
  return mockStore;
};

export default getMockStore;
