import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import App from './App';
import { getMockStore } from './test-utils/mocks';
import { history } from './store/store';

describe('App',()=>{
  const mockedstate={};
  const mockedStore=getMockStore(mockedstate);
  function makeComponent(store){
    return <Provider store={store}><App history={history}/></Provider>
  }

  it('should render without error', () => {
    const component=mount(makeComponent(mockedStore));
    expect(component.find('.App').length).toBe(1);
  });

  it(`should route to 'Not Found' page by inappropriate url`,()=>{
    history.push('./ray017');
    const component=mount(makeComponent(mockedStore));
    expect(component.find('h1').text()).toBe('Not Found');
  });
})


