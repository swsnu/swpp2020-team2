import React from 'react';
import { mount } from 'enzyme';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter, connectRouter } from 'connected-react-router';
import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux';
import addDays from 'date-fns/addDays';
import addMonths from 'date-fns/addMonths';
import { history, middlewares } from '../../store/store';
import Public from './Public';

const sampleDate = new Date();
const sampleDate2 = addDays(sampleDate, 25);
const sampleDate3 = addMonths(sampleDate, 1);
const sample = [
  {
    category: {
      id: 1,
    },
    date: sampleDate,
  },
  {
    category: {
      id: 2,
    },
    date: sampleDate,
  },
  {
    category: {
      id: 1,
    },
    date: sampleDate2,
  },
  {
    category: {
      id: 2,
    },
    date: sampleDate2,
  },
  {
    category: {
      id: 3,
    },
    date: sampleDate2,
  },
  {
    category: {
      id: 4,
    },
    date: sampleDate2,
  },
  {
    category: {
      id: 5,
    },
    date: sampleDate2,
  },
  {
    category: {
      id: 6,
    },
    date: sampleDate2,
  },
  {
    category: {
      id: 7,
    },
    date: sampleDate2,
  },
  {
    category: {
      id: 0,
    },
    date: sampleDate2,
  },
  {
    category: {
      id: 0,
    },
    date: sampleDate3,
  },
  {
    category: {
      id: 6,
    },
    date: sampleDate3,
  },
];

const stubInitialState = {
  events: sample,
};

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
  const mockReducer = getMockReducer(initialState);
  const rootReducer = combineReducers({
    evt: mockReducer,
    router: connectRouter(history),
  });
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const mockStore = createStore(rootReducer,
    composeEnhancers(applyMiddleware(...middlewares)));
  return mockStore;
};

const mockStore = getMockStore(stubInitialState);

describe('<Articles />', () => {
  let publicComponent;
  beforeEach(() => {
    publicComponent = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact render={() => <Public />} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  });

  it('should render Public Calendar', () => {
    const component = mount(publicComponent);
    const wrapper = component.find('.Public');
    expect(wrapper.length).toBe(1);
  });
});
