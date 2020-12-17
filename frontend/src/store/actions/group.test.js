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

  it('getGroupFull should operate correctly', (done) => {
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

    store.dispatch(actionCreators.getGroupFull(1)).then(() => {
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

  it('getNothingGroup should operate correctly', (done) => {
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

    store.dispatch(actionCreators.getNothingGroup()).then(() => {
      expect(spyOnPost).toHaveBeenCalledTimes(1);
      expect(store.getState().gr.nothingGroups).toEqual(stubGroups);
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

  it('reportGroup should operate correctly', (done) => {
    const spyOnPost = jest.spyOn(axios, 'post')
      .mockImplementation((url) => new Promise((resolve, reject) => {
        const result = {
          status: 201,
        };
        resolve(result);
      }));
    const spyOnAlert = jest.spyOn(window,'alert');

    store.dispatch(actionCreators.reportGroup(1, 'test_report')).then(()=>{
      expect(spyOnPost).toHaveBeenCalledTimes(1);
      expect(spyOnAlert).toHaveBeenCalledWith('신고가 접수되었습니다.');
      done();
    });
  });

  it('reportGroup should operate correctly 2', (done) => {
    const spyOnPost = jest.spyOn(axios, 'post')
      .mockImplementation((url) => new Promise((resolve, reject) => {
        const result = {
          status: 502,
        };
        resolve(result);
      }));
    const spyOnAlert = jest.spyOn(window,'alert');

    store.dispatch(actionCreators.reportGroup(1, 'test_report')).then(()=>{
      expect(spyOnPost).toHaveBeenCalledTimes(1);
      expect(spyOnAlert).toHaveBeenCalledWith('예상치 못한 오류로 신고접수가 실패하였습니다. 잠시 뒤에 재시도해주세요');
      done();
    });
  });

  it('changeGroupInfo should operate correctly',()=>{
    const spyOnPut=jest.spyOn(axios,'put')
    .mockImplementation(()=>{});

    store.dispatch(actionCreators.changeGroupInfo(1,'test_name','test_desc'));
    expect(spyOnPut).toHaveBeenCalledTimes(1);
  });

  it('changeGroupPrivacy should operate correctly',()=>{
    const spyOnPut=jest.spyOn(axios,'put')
    .mockImplementation(()=>{});

    store.dispatch(actionCreators.changeGroupPrivacy(1, 1));
    expect(spyOnPut).toHaveBeenCalledTimes(1);
  });

  it('handleJoinRequest should operate correctly',()=>{
    const spyOnPut=jest.spyOn(axios,'put')
    .mockImplementation(()=>{});

    store.dispatch(actionCreators.handleJoinRequest(1,1,'add'));
    expect(spyOnPut).toHaveBeenCalledTimes(1);
  });

  it('manageMember should operate correctly',()=>{
    const spyOnPut=jest.spyOn(axios,'put')
    .mockImplementation(()=>{});

    store.dispatch(actionCreators.manageMember(1,1,'add'));
    expect(spyOnPut).toHaveBeenCalledTimes(1);
  });

  it('manageAdmin should operate correctly',()=>{
    const spyOnPut=jest.spyOn(axios,'put')
    .mockImplementation(()=>{});

    store.dispatch(actionCreators.manageAdmin(1,1,'add'));
    expect(spyOnPut).toHaveBeenCalledTimes(1);
  });
});
