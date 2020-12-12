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
    const component = mount(makeComponent(getMockStore(mockedState)));
    expect(component.find('MyPage').length).toBe(1);
  });
});
