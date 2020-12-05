import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import ReportEvent from './ReportEvent';
import getMockStore from '../../test-utils/mocks';
import { history } from '../../store/store';

describe('ReportEvent', () => {
  const stubEvent = { id: 1, title: 'test_event_title' };
  function makeComponent(store) {
    return (
      <Provider store={store}>
        <ReportEvent
          history={history}
          event={stubEvent}
          onClickCloseModal={() => {}}
        />
      </Provider>
    );
  }

  const mockedState = {

  };

  it('should render without error', () => {
    const component = mount(makeComponent(getMockStore(mockedState)));
    expect(component.find('ReportEvent').length).toBe(1);
  });
});
