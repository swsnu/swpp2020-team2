import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import EventCreate from './EventCreate';

import getMockStore from '../../../test-utils/mocks';
/*
import * as actionCreators from '../../../store/actions/Events';
import * as actionCreators_user from '../../../store/actions/users';
*/
import { createBrowserHistory } from 'history';

const stubInitialState = [
    
];

const mockStore = getMockStore(stubInitialState);

describe('<EventCreate />', () => {
    let eventCreate;

    const history=createBrowserHistory();

    beforeEach(() => {
        eventCreate = (
            <Provider store={mockStore}>
                <BrowserRouter>
                    <Switch>
                        <Route path='/' exact component={EventCreate} />
                        <Route path='/Public' exact render={() => <h1>Public</h1>} />
                        <Route path='/details/1' exact render={() => <h1>EventDetail</h1>} />
                    </Switch>
                </BrowserRouter>
            </Provider>
        );
        history.push('/');
    })
    
    it('should render EventCreate without errors', () => {
        const component = mount(eventCreate);
        const wrapper = component.find('.EventCreate');
        expect(wrapper.length).toBe(1);
    });

    it(`should set state properly on title input`, () => {
        const title = 'TEST_NEW_TITLE'
        const component = mount(eventCreate);
        const wrapper = component.find('.event-title-input');
        wrapper.simulate('change', { target: { value: title } });
        const EventCreateInstance = component.find(EventCreate.WrappedComponent).instance();
        expect(EventCreateInstance.state.title).toEqual(title);
    });

    it(`should set state properly on place input`, () => {
        const place = 'TEST_NEW_PLACE'
        const component = mount(eventCreate);
        const wrapper = component.find('.event-place-input');
        wrapper.simulate('change', { target: { value: place } });
        const EventCreateInstance = component.find(EventCreate.WrappedComponent).instance();
        expect(EventCreateInstance.state.place).toEqual(place);
    });

    it(`should set state properly on begin_time input`, () => {
        const begin_time = 'TEST_NEW_BEGIN_TIME'
        const component = mount(eventCreate);
        const wrapper = component.find('.event-begin_time-input');
        wrapper.simulate('change', { target: { value: begin_time } });
        const EventCreateInstance = component.find(EventCreate.WrappedComponent).instance();
        expect(EventCreateInstance.state.begin_time).toEqual(begin_time);
    });

    it(`should set state properly on end_time input`, () => {
        const end_time = 'TEST_NEW_END_TIME'
        const component = mount(eventCreate);
        const wrapper = component.find('.event-end_time-input');
        wrapper.simulate('change', { target: { value: end_time } });
        const EventCreateInstance = component.find(EventCreate.WrappedComponent).instance();
        expect(EventCreateInstance.state.end_time).toEqual(end_time);
    });

    it(`should set state properly on content input`, () => {
        const content = 'TEST_NEW_CONTENT'
        const component = mount(eventCreate);
        const wrapper = component.find('.event-content-input');
        wrapper.simulate('change', { target: { value: content } });
        const EventCreateInstance = component.find(EventCreate.WrappedComponent).instance();
        expect(EventCreateInstance.state.content).toEqual(content);
    });

    it(`can't click the confirm`, () => {
        const component = mount(eventCreate);
        const wrapper = component.find('.confirm-create-event-button');

        wrapper.simulate('click');
    });

    it(`should call 'postEvent' and go to DetailPage after posting`, () => {
        /*
        const spyPostEvent = jest.spyOn(actionCreators, 'postEvent').mockImplementation((Event) => { return dispatch => { }; });
        const history = createBrowserHistory();
        */
        const component = mount(eventCreate);
        const wrapper = component.find('.confirm-create-event-button');

        component.find('.event-title-input').simulate('change', { target: { value: 'TEST_NEW_TITLE' } });
        component.find('.event-date-input').simulate('change', { target: { value: 'TEST_NEW_DATE' } });
        component.find('.event-group-input').simulate('change', { target: { value: 'TEST_NEW_GROUP' } });
        component.find('.event-category-input').simulate('change', { target: { value: 'TEST_NEW_CATEGORY' } });

        wrapper.simulate('click');

        /*
        expect(spyPostEvent).toHaveBeenCalledTimes(1);
        expect(component.find('h1').text()).toBe('EventDetail');
        history.push('/');
        */
    });

    it('should back to Events', () => {
        const history = createBrowserHistory();

        const component = mount(eventCreate);
        const wrapper = component.find('.back');
        wrapper.simulate('click');
        /*
        expect(component.find('h1').text()).toBe('Public');
        history.push('/');
        */
    });
});