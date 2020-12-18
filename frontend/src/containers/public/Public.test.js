import React from 'react';
import axios from 'axios';
import { mount, shallow } from 'enzyme';
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
  userFullInfo: {},
  signinedUser: {},
  likeEvents: sample,
  bringEvents: sample,
};

axios.get = jest.fn((url) => new Promise((resolve, reject) => {
  const result = {
    status: 200, data: { id: 1 },
  };
  resolve(result);
}));

axios.post = jest.fn((url, body) => new Promise((resolve, reject) => {
  const result = {
    status: 200, data: [{ id: 1 }],
  };
  resolve(result);
}));

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
    ur: mockReducer,
    router: connectRouter(history),
  });
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const mockStore = createStore(rootReducer,
    composeEnhancers(applyMiddleware(...middlewares)));
  return mockStore;
};

const mockStore = getMockStore(stubInitialState);

describe('<Public />', () => {
  let publicComponent;
  beforeEach(() => {
    const mockStore_ = mockStore;
    const history_ = history;
    publicComponent = (
      <Provider store={mockStore_}>
        <ConnectedRouter history={history_}>
          <Switch>
            <Route path="/" exact render={() => <Public history={history_} />} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  });

  it('should render Public Calendar', () => {
    const component = mount(publicComponent);
    // console.log(component.debug());
    const wrapper = component.find('.Public');
    expect(wrapper.length).toBe(1);
  });

  it('should handle click', () => {
    const component = mount(publicComponent);
    // console.log(component.debug());

    const wrapperArrow = component.find('.arrow');
    expect(wrapperArrow.length).toBe(2);

    const wrapperYearMonth = component.find('.year_month');
    expect(wrapperYearMonth.length).toBe(1);

    expect(wrapperYearMonth.at(0).text()).toEqual('2020. 12.');
    wrapperArrow.at(0).simulate('click');
    expect(wrapperYearMonth.at(0).text()).toEqual('2020. 11.');
    wrapperArrow.at(1).simulate('click');
    expect(wrapperYearMonth.at(0).text()).toEqual('2020. 12.');

    const viewOptionButton = component.find('.ViewOptionButton1');
    expect(viewOptionButton.length).toBe(1);
    viewOptionButton.at(0).simulate('click');

    const viewOptionButton2 = component.find('.ViewOptionButton1');
    expect(viewOptionButton2.length).toBe(1);
    viewOptionButton2.at(0).simulate('click');

    const includingSubmit = component.find('.IncludingSubmit');
    expect(includingSubmit.length).toBe(1);
    includingSubmit.simulate('click');

    const tagSubmit = component.find('.TagSubmit');
    expect(tagSubmit.length).toBe(1);
    tagSubmit.simulate('click');

    const tagInput = component.find('.TagText');
    expect(tagInput.length).toBe(1);
    tagInput.simulate('change', { target: { value: 'Hello two' } });
    tagSubmit.simulate('click');

    const groupOptionButton = component.find('.GroupOptionButton0');
    expect(groupOptionButton.length).toBe(3);
    groupOptionButton.at(0).simulate('click');
    groupOptionButton.at(0).simulate('click');
    groupOptionButton.at(1).simulate('click');
    groupOptionButton.at(2).simulate('click');

    const eventOptionButton = component.find('.EventOptionButton0');
    expect(eventOptionButton.length).toBe(1);
    eventOptionButton.simulate('click');
    eventOptionButton.simulate('click');

    const categoryOptionButton = component.find('.CategoryOptionButton01');
    expect(categoryOptionButton.length).toBe(1);
    categoryOptionButton.at(0).simulate('click');
    categoryOptionButton.at(0).simulate('click');

    const sortOptionSelect = component.find('.SortOptionSelect');
    expect(sortOptionSelect.length).toBe(1);
    sortOptionSelect.simulate('change', {
      target: {
        value: 'recent',
      },
    });

    const dayComponent = component.find('.abled');
    expect(dayComponent.length).toBe(31);
    dayComponent.at(0).simulate('click');

    const close = component.find('.closeButton');
    expect(close.length).toBe(1);
    close.simulate('click');

    dayComponent.at(0).simulate('click');
    const createButton = component.find('.createEventButton');
    expect(createButton.length).toBe(1);
    createButton.simulate('click');
  });
});
