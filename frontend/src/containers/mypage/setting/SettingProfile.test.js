import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import SettingProfile from './SettingProfile';
import getMockStore from '../../../test-utils/mocks';
import { history } from '../../../store/store';

import * as actionCreators from '../../../store/actions/index';

describe('SettingProfile', () => {
  function makeComponent(store) {
    return <Provider store={store}><SettingProfile history={history} /></Provider>;
  }

  const mockedState = {
    signinedUser: 1,
    userInfo: {
      first_name: 'test_first_name', last_name: 'test_last_name', username: 'test_username', university: { id: 1, name: 'test_university' }, department: { id: 1, name: 'test_department' },
    },
    departments: [{ id: 1, name: 'test_department' }],
  };

  it('should render without error', () => {
    const component = mount(makeComponent(getMockStore(mockedState)));
    expect(component.find('.SettingProfile').length).toBe(1);
  });
});
