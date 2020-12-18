import React from 'react';
import axios from 'axios';
import { mount, shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';
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
const sampleDate2 = addDays(sampleDate, 1);
const sample = [
  {
    group: {
      name: 'his',
    },
    category: {
      id: 1,
    },
    likes: [],
    brings: [],
    date: '2020-12-20',
  },
  {
    group: {
      name: 'zero',
    },
    category: {
      id: 1,
    },
    likes: [],
    brings: [],
    date: '2020-12-21',
  },
];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const stubInitialState = {
  events: sample,
  userFullInfo: {},
  signinedUser: {},
  likeEvents: sample,
  bringEvents: sample,
};

axios.get = jest.fn((url) => new Promise((resolve, reject) => {
  const result = {
    status: 200, data: { data: { id: 1 } },
  };
  resolve(result);
}));

axios.post = jest.fn((url, body) => new Promise((resolve, reject) => {
  const result = {
    status: 200, data: sample,
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

Object.defineProperty(window, "localStorage", {
  value: {
    getItem: (key) => 'true',
    setItem: jest.fn(),
  },
  writable: true,
});

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
  /*
  it('should render Public Calendar', () => {
    let component;
    act(() => {
      component = mount(publicComponent);
      sleep(500);
    });
    console.log(component.debug());
    const wrapper = component.find('.Public');
    expect(wrapper.length).toBe(1);
  });
  */

  it('should handle click', () => {
    let component;
    act(() => {
      const div1 = document.createElement('div');
      div1.setAttribute('id', 'including');
      document.body.appendChild(div1);

      const div2 = document.createElement('div');
      div2.setAttribute('id', 'tagOption');
      document.body.appendChild(div2);

      component = mount(publicComponent, { attachTo: document.getElementById('including') });
      sleep(500);
      const wrapperArrow = component.find('.arrow');
      expect(wrapperArrow.length).toBe(2);

      const wrapperYearMonth = component.find('.year_month');
      expect(wrapperYearMonth.length).toBe(1);

      expect(wrapperYearMonth.at(0).text()).toEqual('2020. 12.');
      wrapperArrow.at(0).simulate('click');
      // expect(wrapperYearMonth.at(0).text()).toEqual('2020. 11.');
      wrapperArrow.at(1).simulate('click');
      // expect(wrapperYearMonth.at(0).text()).toEqual('2020. 12.');

      const viewOptionButton = component.find('.ViewOptionButton0');
      expect(viewOptionButton.length).toBe(1);
      viewOptionButton.at(0).simulate('click');

      const viewOptionButton2 = component.find('.ViewOptionButton0');
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
      sleep(500);
      /*
      const wrapperPublic = component.find('.Public');
      console.log(wrapperPublic.instance());
      const instance = wrapperPublic.instance();
      instance.setState({
        modalBool: true,
        modalEvents: sample,
        modalDay: new Date(),
      }, () => {
        const close = wrapperPublic.find('.closeButton');
        expect(close.length).toBe(1);
        close.simulate('click');
      });
      wrapperPublic.update();
      // const instance = component.instance();
      
      component.setState({
        modalBool: true,
        modalEvents: sample,
        modalDay: new Date(),
      });
      
      component.update();
      const close = wrapperPublic.find('.closeButton');
      expect(close.length).toBe(1);
      close.simulate('click');
      
      dayComponent.at(0).simulate('click');
      const createButton = component.find('.createEventButton');
      expect(createButton.length).toBe(1);
      createButton.simulate('click');
      */
    });
  });
});
