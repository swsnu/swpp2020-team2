import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import MyPage from './MyPage';
import getMockStore from '../../../test-utils/mocks';
import { history } from '../../../store/store';

describe('MyPage', () => {
  function makeComponent(store) {
    return <Provider store={store}><MyPage history={history} /></Provider>;
  }

  const mockedState = {
    signinedUser: null,
  };

  it('should render without error', () => {
    global.localStorage.setItem('isLogin','true');
    const component = mount(makeComponent(getMockStore(mockedState)));
    expect(component.find('MyPage').length).toBe(1);
  });

  it('should redirect to main page when sign outed', () => {
    const spyOnReplace = jest.spyOn(history, 'replace')
      .mockImplementation();
      
    global.localStorage.removeItem('isLogin');
    const component = mount(makeComponent(getMockStore(mockedState)));
    expect(spyOnReplace).toHaveBeenCalledWith('/main');
  });

  it('should route to setting page', () => {
    const spyOnPush = jest.spyOn(history, 'push')
      .mockImplementation();

    const component = mount(makeComponent(getMockStore(mockedState)));
    const wrapper = component.find('.settingsBtn');

    wrapper.simulate('click');
    expect(spyOnPush).toHaveBeenCalledWith('/mypage/setting/profile');
  });
});
