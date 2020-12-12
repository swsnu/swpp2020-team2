import axios from 'axios';

import store from '../store';
import * as actionCreators from './other';

describe('others', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('getUniversities should operate correctly', (done) => {
    const stubUnivs = [
      { id: 1, name: 'test_univ' },
    ];
    const spyOnGet = jest.spyOn(axios, 'get')
      .mockImplementation((url) => new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubUnivs,
        };
        resolve(result);
      }));

    store.dispatch(actionCreators.getUniversities()).then(() => {
      expect(spyOnGet).toHaveBeenCalledTimes(1);
      expect(store.getState().or.universities).toEqual(stubUnivs);
      done();
    });
  });

  it('getDepartments should operate correctly', (done) => {
    const stubDepts = [
      { id: 1, name: 'test_dept' },
    ];
    const spyOnGet = jest.spyOn(axios, 'get')
      .mockImplementation((url) => new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubDepts,
        };
        resolve(result);
      }));

    store.dispatch(actionCreators.getDepartments()).then(() => {
      expect(spyOnGet).toHaveBeenCalledTimes(1);
      expect(store.getState().or.departments).toEqual(stubDepts);
      done();
    });
  });

  it('getCategories should operate correctly', (done) => {
    const stubCates = [
      { id: 1, name: 'test_cate' },
    ];
    const spyOnGet = jest.spyOn(axios, 'get')
      .mockImplementation((url) => new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubCates,
        };
        resolve(result);
      }));

    store.dispatch(actionCreators.getCategories()).then(() => {
      expect(spyOnGet).toHaveBeenCalledTimes(1);
      expect(store.getState().or.categories).toEqual(stubCates);
      done();
    });
  });
});
