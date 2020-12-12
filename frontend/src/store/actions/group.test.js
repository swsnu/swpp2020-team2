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
      expect(spyOnPost).toHaveBeenCalledTimes(1);
      expect(store.getState().gr.currGroup).toEqual(stubGroup);
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
      expect(spyOnGet).toHaveBeenCalledTimes(1);
      expect(store.getState().gr.searchGroups).toEqual(stubGroups);
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
      expect(spyOnGet).toHaveBeenCalledTimes(1);
      expect(store.getState().gr.currGroup).toEqual(stubGroup);
      done();
    });
  });

  it('getLikeGroup should operate correctly', (done) => {
    const stubGroups = [{
      id: 1, name: 'test_name', king: 1, description: 'test_description',
    }];
    const spyOnPost = jest.spyOn(axios, 'post')
      .mockImplementation((url) => new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubGroups,
        };
        resolve(result);
      }));

    store.dispatch(actionCreators.getLikeGroup()).then(() => {
      expect(spyOnPost).toHaveBeenCalledTimes(1);
      expect(store.getState().gr.likeGroups).toEqual(stubGroups);
      done();
    });
  });

  it('getNoticeGroup should operate correctly', (done) => {
    const stubGroups = [{
      id: 1, name: 'test_name', king: 1, description: 'test_description',
    }];
    const spyOnPost = jest.spyOn(axios, 'post')
      .mockImplementation((url) => new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubGroups,
        };
        resolve(result);
      }));

    store.dispatch(actionCreators.getNoticeGroup()).then(() => {
      expect(spyOnPost).toHaveBeenCalledTimes(1);
      expect(store.getState().gr.noticeGroups).toEqual(stubGroups);
      done();
    });
  });

  it('getMyGroup should operate correctly', (done) => {
    const stubGroups = [{
      id: 1, name: 'test_name', king: 1, description: 'test_description',
    }];
    const spyOnPost = jest.spyOn(axios, 'post')
      .mockImplementation((url) => new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubGroups,
        };
        resolve(result);
      }));

    store.dispatch(actionCreators.getMyGroup()).then(() => {
      expect(spyOnPost).toHaveBeenCalledTimes(1);
      expect(store.getState().gr.myGroups).toEqual(stubGroups);
      done();
    });
  });

  it('searchGroup should operate correctly', (done) => {
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

    store.dispatch(actionCreators.searchGroup('test_query')).then(() => {
      expect(spyOnGet).toHaveBeenCalledTimes(1);
      expect(store.getState().gr.searchGroups).toEqual(stubGroups);
      done();
    });
  });

  it('reportGroup should operate correctly', () => {
    const spyOnPost = jest.spyOn(axios, 'post')
      .mockImplementation(() => {});

    store.dispatch(actionCreators.reportGroup(1, 'test_report'));
    expect(spyOnPost).toHaveBeenCalledTimes(1);
  });
});
