import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import Activate from './Activate';
import getMockStore from '../../test-utils/mocks';
import { history } from '../../store/store';

describe('Activate', () => {
  function makeComponent(store, uidb64, token) {
    return (
      <Provider store={store}>
        <Activate history={history} match={{ params: { uidb64: { uidb64 }, token: { token } } }} />
      </Provider>
    );
  }

  const mockedState = {
    signinedUser: null,
  };

  it('should render without error', () => {
    const component = mount(makeComponent(getMockStore(mockedState), 1, 1));
    expect(component.find('Activate').length).toBe(1);
  });

  it('should go back to main page when link is clicked', () => {
    const spyOnPush = jest.spyOn(history, 'push')
      .mockImplementation();

    const component = mount(makeComponent(getMockStore(mockedState), 1, 1));
    const wrapper = component.find('span');
    wrapper.simulate('click');
    expect(spyOnPush).toHaveBeenCalledWith('/main');
  });
});
