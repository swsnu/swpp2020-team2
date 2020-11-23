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
import Private from './Private';

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
  let PrivateComponent;
  beforeEach(() => {
    PrivateComponent = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact render={() => <Private history={history} />} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  });

  it('should render Private Calendar', () => {
    const component = mount(PrivateComponent);
    const wrapper = component.find('.Private');
    expect(wrapper.length).toBe(1);
  });

  it('should handle click', () => {
    const div1 = document.createElement('div');
    div1.setAttribute('id', 'including');
    document.body.appendChild(div1);

    const div2 = document.createElement('div');
    div2.setAttribute('id', 'tagOption');
    document.body.appendChild(div2);

    const component = mount(PrivateComponent, { attachTo: document.getElementById('including') });

    const viewOptionButton = component.find('.ViewOptionButton0');
    expect(viewOptionButton.length).toBe(1);
    viewOptionButton.at(0).simulate('click');

    const includingSubmit = component.find('.IncludingSubmit');
    expect(includingSubmit.length).toBe(1);
    includingSubmit.simulate('click');

    const tagSubmit = component.find('.TagSubmit');
    expect(tagSubmit.length).toBe(1);
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

    const categoryOptionButton = component.find('.CategoryOptionButton00');
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
    expect(dayComponent.length).toBe(30);
    dayComponent.at(0).simulate('click');

    const close = component.find('.closeButton');
    expect(close.length).toBe(1);
    close.simulate('click');

    const createEventButtonInCalendar = component.find('.createEventButtonInCalendar');
    expect(createEventButtonInCalendar.length).toBe(1);
    createEventButtonInCalendar.simulate('click');
  });
});
