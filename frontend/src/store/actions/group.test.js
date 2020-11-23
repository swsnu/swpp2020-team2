import axios from 'axios';

import store from '../store';
import * as actionCreators from './group';

describe('group', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('createGroup should operate correctly', (done) => {
    const stubGroup = {
      id: 1, name: 'test_name', king: 1, description: 'test_description',
    };
    const spyOnPost = jest.spyOn(axios, 'post')
      .mockImplementation((url) => new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubGroup,
        };
        resolve(result);
      }));

    store.dispatch(actionCreators.createGroup(stubGroup)).then(() => {
      expect(store.getState().gr.currGroup).toEqual(stubGroup);
      expect(spyOnPost).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('getAllGroup should operate correctly', (done) => {
    const stubGroups = [{
      id: 1, name: 'test_name', king: 1, description: 'test_description',
    }];
    const spyOnGet = jest.spyOn(axios, 'get')
      .mockImplementation((url) => new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubGroups,
        };
        resolve(result);
      }));

    store.dispatch(actionCreators.getAllGroup()).then(() => {
      expect(store.getState().gr.searchGroups).toEqual(stubGroups);
      expect(spyOnGet).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('getGroup should operate correctly', (done) => {
    const stubGroup = {
      id: 1, name: 'test_name', king: 1, description: 'test_description',
    };
    const spyOnGet = jest.spyOn(axios, 'get')
      .mockImplementation((url) => new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubGroup,
        };
        resolve(result);
      }));

    store.dispatch(actionCreators.getGroup(1)).then(() => {
      expect(store.getState().gr.currGroup).toEqual(stubGroup);
      expect(spyOnGet).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
