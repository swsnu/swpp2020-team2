import React from 'react';
import { mount, shallow } from 'enzyme';


import { connectRouter, ConnectedRouter } from 'connected-react-router';
import ReportGroup from './ReportGroup';
import getMockStore from '../../test-utils/mocks';
import { history } from '../../store/store';
import { Provider } from 'react-redux';

import * as groupActions from '../../store/actions/group';

const stubGroup = { id: 1, title: 'test_group_title' };
const mockStore = getMockStore({});

describe('<ReportGroup />', () => {
  let reportGroupModal;
  let spyOnCloseModal;

  beforeEach(() => {
    spyOnCloseModal = jest.fn();
    reportGroupModal = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <ReportGroup
            group={stubGroup}
            onClickCloseModal={() => spyOnCloseModal()}
          />
        </ConnectedRouter>
      </Provider>
    );
  });

  afterEach(() => { jest.clearAllMocks(); });

  it('should render without error', () => {
    const component = mount(reportGroupModal);
    const wrapper = component.find('.ReportGroup');
    expect(wrapper.length).toBe(1);
  });

  it('should set state properly on content input', () => {
    const content = 'TEST_CONTENT';
    const component = mount(reportGroupModal);
    const wrapper = component.find('textarea');
    wrapper.simulate('change', { target: { value: content } });
    const newTodoInstance = component.find(ReportGroup.WrappedComponent).instance();
    expect(newTodoInstance.state.content).toEqual(content);
  });

  it('should close modal clicking close btn', () => {
    const component = mount(reportGroupModal);
    const wrapper = component.find('button').at(0);
    wrapper.simulate('click');
    expect(spyOnCloseModal).toHaveBeenCalledTimes(1);
  });

  it('should alert with no content click \'reportGroup\'', () => {
    const spyOnAlert = jest.spyOn(window, 'alert')
      .mockImplementation();
    const component = mount(reportGroupModal);

    const wrapper = component.find('button').at(1);
    wrapper.simulate('click');

    expect(spyOnAlert).toHaveBeenCalledTimes(1);
  });
  
  it(`should call 'reportGroup' successfully`, () => {
    const spyReportGroup = jest.spyOn(groupActions, 'reportGroup').mockImplementation((id, content) => (dispatch) => { });
    const component = mount(reportGroupModal);

    const wrapper = component.find('textarea');
    wrapper.simulate('change', { target: { value: "TEST_CONTENT" } });
    const wrapper2 = component.find('button').at(1);
    wrapper2.simulate('click');

    expect(spyReportGroup).toHaveBeenCalledTimes(1);
    expect(spyOnCloseModal).toHaveBeenCalledTimes(1);
  });
});
