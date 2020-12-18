import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux';
import { createBrowserHistory } from 'history';
import { ConnectedRouter, connectRouter } from 'connected-react-router';
import EventListModal from './EventListModal';
import { history, middlewares } from '../../store/store';
import { createEvent } from '../../store/actions';

const stubInitialState = {
  events: [{ id: 1 }],
  likeEvents: [1],
  bringEvents: [1],
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
    ur: mockReducer,
    router: connectRouter(history),
  });
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const mockStore = createStore(rootReducer,
    composeEnhancers(applyMiddleware(...middlewares)));
  return mockStore;
};

const mockStore = getMockStore(stubInitialState);

// event component mocking
jest.mock('../eventBox/EventBox', () => jest.fn((props) => (
  <div className="spyEvent">
    <button className="title" onClick={() => { props.detailEvent(props.event?.id); }}>
      {props.event?.title}
    </button>
    <button className="bringEvent" onClick={props.bringEvent}>
      foo
    </button>
    <button className="likeEvent" onClick={props.likeEvent}>
      bar
    </button>
  </div>
)));

describe('<EventListModal />', () => {
  it('should render without errors', () => {
    const mockedState = {
      signinedUser: null,
    };

    const component = shallow(<Provider store={getMockStore(mockedState)}><EventListModal /></Provider>);
    const wrapper = component.find('.EventListModal');
    expect(wrapper.length).toBe(0);
  });

  it('should handle click buttons', () => {
    const spyCreateEvent = jest.fn();
    const spyCloseEvent = jest.fn();
    const events = [{ id: 1 }, { id: 2 }];
    const _component = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() =>
                (
                  <EventListModal
                    day={new Date()}
                    dayEventList={events}
                    onClickLikeEvent={jest.fn()}
                    onClickBringEvent={jest.fn()}
                    onGetUser={jest.fn()}
                    onClickCreateEvent={spyCreateEvent}
                    onClickCloseModal={spyCloseEvent}
                    history={[]}
                  />
                )}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(_component);
    const title = component.find('.title');
    expect(title.length).toBe(2);
    title.at(0).simulate('click');

    const bring = component.find('.bringEvent');
    expect(bring.length).toBe(2);
    bring.at(0).simulate('click');
    bring.at(1).simulate('click');

    const like = component.find('.likeEvent');
    expect(like.length).toBe(2);
    like.at(0).simulate('click');
    like.at(1).simulate('click');

    const create = component.find('.createEventButton');
    expect(create.length).toBe(1);
    create.simulate('click');
    expect(spyCreateEvent).toHaveBeenCalledTimes(1);

    const close = component.find('.closeButton');
    expect(close.length).toBe(1);
    close.simulate('click');
    expect(spyCloseEvent).toHaveBeenCalledTimes(1);

  });

  
/*

  it('should redirect to create page after click the button', () => {
    const component = shallow(<EventListModal onClickCreateEvent={(day) => { }} />);
    const wrapper = component.find('.createEventButton');
    wrapper.simulate('click');
    expect(wrapper.length).toBe(1);
  });

  it('should call \'onClickDetailEvent\'', () => { // 42,47,52 line cover
    const history = createBrowserHistory();
    const spyHistoryPush = jest.spyOn(history, 'push').mockImplementation((path) => { });
    const component = mount(<EventListModal
      history={history}
      day="2020. 05. 20. Sat"
      dayEventList={
        [
          {
            id: 1,
            title: 'TEST_TITLE',
            group: 'TEST_GROUP',
            place: 'TEST_PLACE',
            begin_time: '05:00',
            end_time: '20:00',
            category: {
              id: 0,
              name: '공연',
            },
            date: '2020.05.20',
          },
        ]
      }
    />);
    const wrapper = component.find('.spyEvent');
    expect(wrapper.length).toBe(1);

    const wrapper2 = component.find('.spyEvent .title').at(0);
    wrapper2.simulate('click');
    expect(spyHistoryPush).toHaveBeenCalledWith('/details/1');
  });
  */
});
