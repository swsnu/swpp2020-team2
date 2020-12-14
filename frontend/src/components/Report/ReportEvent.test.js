import React from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';

import { connectRouter, ConnectedRouter } from 'connected-react-router';
import ReportEvent from './ReportEvent';
import getMockStore from '../../test-utils/mocks';
import { history } from '../../store/store';

import * as actionCreators from '../../store/actions/index';

const stubEvent = { id: 1, title: 'test_event_title' };
const mockStore = getMockStore({});

describe('<ReportEvent />', () => {
  let reportEventModal;
  let spyOnCloseModal;

  beforeEach(() => {
    spyOnCloseModal = jest.fn();
    reportEventModal = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <ReportEvent
            event={stubEvent}
            onClickCloseModal={() => spyOnCloseModal()}
          />
        </ConnectedRouter>
      </Provider>
    );
  });

  afterEach(() => { jest.clearAllMocks(); });

  it('should render without error', () => {
    const component = mount(reportEventModal);
    const wrapper = component.find('.ReportEvent');
    expect(wrapper.length).toBe(1);
  });

  it('should set state properly on content input', () => {
    const content = 'TEST_CONTENT';
    const component = mount(reportEventModal);
    const wrapper = component.find('textarea');
    wrapper.simulate('change', { target: { value: content } });
    const newTodoInstance = component.find(ReportEvent.WrappedComponent).instance();
    expect(newTodoInstance.state.content).toEqual(content);
  });

  it('should close modal clicking close btn', () => {
    const component = mount(reportEventModal);
    const wrapper = component.find('button').at(0);
    wrapper.simulate('click');
    expect(spyOnCloseModal).toHaveBeenCalledTimes(1);
  });

  it('should alert with no content click \'reportEvent\'', () => {
    const spyOnAlert = jest.spyOn(window, 'alert')
      .mockImplementation();
    const component = mount(reportEventModal);

    const wrapper = component.find('button').at(1);
    wrapper.simulate('click');

    expect(spyOnAlert).toHaveBeenCalledTimes(1);
  });
  /*
  it(`should call 'reportEvent' successfully`, () => {
    const spyReportEvent = jest.spyOn(actionCreators, 'reportEvent').mockImplementation((id, content) => (dispatch) => { });
    const component = mount(reportEventModal);

    const wrapper = component.find('textarea');
    wrapper.simulate('change', { target: { value: "TEST_CONTENT" } });
    const wrapper2 = component.find('button').at(1);
    wrapper2.simulate('click');

    expect(spyReportEvent).toHaveBeenCalledTimes(1);
    expect(spyOnCloseModal).toHaveBeenCalledTimes(1);
  });
  */
});
