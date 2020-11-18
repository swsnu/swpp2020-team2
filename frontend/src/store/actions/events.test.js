import axios from 'axios';

import store from '../store';
import * as actionCreators from './events';

describe('events',()=>{
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('getEvent should operate correctly',(done)=>{
    const spyOnGet = jest.spyOn(axios, 'get')
      .mockImplementation((url) => new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: {id:1, title:"test_title"},
        };
        resolve(result);
      }));
    
    store.dispatch(actionCreators.getEvent(1)).then(()=>{
      expect(spyOnGet).toHaveBeenCalledTimes(1);
      done();
    });
  });
});