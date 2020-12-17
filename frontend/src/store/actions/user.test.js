import axios from 'axios';

import store from '../store';
import * as actionCreators from './user';

describe('actions', () => {
  window.alert = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('signIn should operate correctly', (done) => {
    const stubUser = { id: 1, username: 'test_username', password: 'test_password' };
    const spyOnPost = jest.spyOn(axios, 'post')
      .mockImplementation((url) => new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubUser,
        };
        resolve(result);
      }));

    store.dispatch(actionCreators.signIn(stubUser)).then(() => {
      expect(store.getState().ur.signinedUser).toEqual(1);
      expect(spyOnPost).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('signIn should operate correctly when input is wrong', (done) => {
    const stubUser = { username: 'wrong_username', password: 'wrong_password' };
    const spyOnPost = jest.spyOn(axios, 'post')
      .mockImplementation((url) => new Promise((resolve, reject) => {
        const result = {
          status: 401,
          response: { status: 401 },
        };
        reject(result);
      }));
    const spyOnAlert = jest.spyOn(window, 'alert')
      .mockImplementation();

    store.dispatch(actionCreators.signIn(stubUser)).then(() => {
      expect(spyOnAlert).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('additional test for coverage', (done) => {
    const stubUser = { username: 'wrong_username', password: 'wrong_password' };
    const spyOnPost = jest.spyOn(axios, 'post')
      .mockImplementation((url) => new Promise((resolve, reject) => {
        const result = {
          status: 400,
          response: { status: 400 },
        };
        reject(result);
      }));
    const spyOnAlert = jest.spyOn(window, 'alert')
      .mockImplementation();

    store.dispatch(actionCreators.signIn(stubUser)).then(() => {
      expect(spyOnAlert).toHaveBeenCalledTimes(0);
      done();
    });
  });

  it('signOut should operate correctly', (done) => {
    const spyOnGet = jest.spyOn(axios, 'get')
      .mockImplementation((url) => new Promise((resolve, reject) => {
        const result = {
          status: 200,
        };
        resolve(result);
      }));

    store.dispatch(actionCreators.signOut()).then(() => {
      expect(store.getState().ur.signinedUser).toEqual(null);
      expect(spyOnGet).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('signUp should operate correctly', (done) => {
    const stubArgs = {
      username: 'test_username',
      password: 'test_password',
      university: 'test_university',
      department: 'test_department',
      email: 'test_email',
      first_name: 'test_firstName',
      last_name: 'test_lastName',
    };
    const spyOnPost = jest.spyOn(axios, 'post')
      .mockImplementation((url) => new Promise((resolve, reject) => {
        const result = {
          status: 200,
        };
        resolve(result);
      }));
    const spyOnAlert=jest.spyOn(window,'alert');

    store.dispatch(actionCreators.signUp(stubArgs)).then(() => {
      expect(spyOnPost).toHaveBeenCalledTimes(1);
      expect(spyOnAlert).toHaveBeenCalledWith('verification link is sent to your mail!');
      done();
    });
  });

  it('signUp should alert correctly', (done) => {
    const stubArgs = {
      username: 'test_username',
      password: 'test_password',
      university: 'test_university',
      department: 'test_department',
      email: 'test_email',
      first_name: 'test_firstName',
      last_name: 'test_lastName',
    };
    const spyOnPost = jest.spyOn(axios, 'post')
      .mockImplementation((url) => new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data:'Username Taken',
        };
        resolve(result);
      }));
    const spyOnAlert=jest.spyOn(window,'alert');

    store.dispatch(actionCreators.signUp(stubArgs)).then(() => {
      expect(spyOnAlert).toHaveBeenCalledWith('Username is already taken!');
      done();
    });
  });

  it('signUp should alert correctly', (done) => {
    const stubArgs = {
      username: 'test_username',
      password: 'test_password',
      university: 'test_university',
      department: 'test_department',
      email: 'test_email',
      first_name: 'test_firstName',
      last_name: 'test_lastName',
    };
    const spyOnPost = jest.spyOn(axios, 'post')
      .mockImplementation((url) => new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data:'Already Activated',
        };
        resolve(result);
      }));
    const spyOnAlert=jest.spyOn(window,'alert');

    store.dispatch(actionCreators.signUp(stubArgs)).then(() => {
      expect(spyOnAlert).toHaveBeenCalledWith('This account is already activated!');
      done();
    });
  });

  it('activate should operate correctly', (done) => {
    const spyOnGet = jest.spyOn(axios, 'get')
      .mockImplementation((url) => new Promise((resolve, reject) => {
        const result = {
          status: 200,
        };
        resolve(result);
      }));

    store.dispatch(actionCreators.activate({ uidb64: 1, token: 1 })).then(() => {
      expect(spyOnGet).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('getUser should operate correctly', (done) => {
    const stubUser = { id: 1, username: 'test_username', password: 'test_password' };
    const spyOnGet = jest.spyOn(axios, 'get')
      .mockImplementation((url) => new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubUser,
        };
        resolve(result);
      }));

    store.dispatch(actionCreators.getUser()).then(() => {
      expect(store.getState().ur.userInfo).toEqual(stubUser);
      expect(spyOnGet).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('getUserFull should operate correctly', (done) => {
    const stubUser = { id: 1, username: 'test_username', password: 'test_password' };
    const spyOnGet = jest.spyOn(axios, 'get')
      .mockImplementation((url) => new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubUser,
        };
        resolve(result);
      }));

    store.dispatch(actionCreators.getUserFull()).then(() => {
      expect(store.getState().ur.userFullInfo).toEqual(stubUser);
      expect(spyOnGet).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('likeGroup should operate correctly', () => {
    const spyOnPut = jest.spyOn(axios, 'put')
      .mockImplementation(()=>{});

    store.dispatch(actionCreators.likeGroup(1,'add'));
    expect(spyOnPut).toHaveBeenCalledTimes(1);
  });

  it('noticeGroup should operate correctly', () => {
    const spyOnPut = jest.spyOn(axios, 'put')
      .mockImplementation(()=>{});

    store.dispatch(actionCreators.noticeGroup(1,'add'));
    expect(spyOnPut).toHaveBeenCalledTimes(1);
  });

  it('joinGroup should operate correctly', (done) => {
    const spyOnPut = jest.spyOn(axios, 'put')
      .mockImplementation((url)=>new Promise((resolve,reject)=>{
        const result={
          status:204,
        }
        resolve(result);
      }));
    const spyOnAlert=jest.spyOn(window,'alert');

    store.dispatch(actionCreators.joinGroup(1,'add')).then(()=>{
      expect(spyOnPut).toHaveBeenCalledTimes(1);
      expect(spyOnAlert).toHaveBeenCalledWith('Join request is sent!');
      done();
    })
  });

  it('joinGroup should operate correctly 2', (done) => {
    const spyOnPut = jest.spyOn(axios, 'put')
      .mockImplementation((url)=>new Promise((resolve,reject)=>{
        const result={
          status:502,
        }
        resolve(result);
      }));
    const spyOnAlert=jest.spyOn(window,'alert');

    store.dispatch(actionCreators.joinGroup(1,'add')).then(()=>{
      expect(spyOnPut).toHaveBeenCalledTimes(1);
      expect(spyOnAlert).toHaveBeenCalledTimes(0);
      done();
    })
  });

  it('likeEvent should operate correctly', (done) => {
    const spyOnPut = jest.spyOn(axios, 'put')
      .mockImplementation((url) => new Promise((resolve, reject) => {
        const result = {
          status: 204,
        };
        resolve(result);
      }));

    store.getState().ur.likeEvents=[];
    store.dispatch(actionCreators.likeEvent(1,'add')).then(() => {
      expect(store.getState().ur.likeEvents).toEqual([1]);
      expect(spyOnPut).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('likeEvent should alert correctly', (done) => {
    const spyOnPut = jest.spyOn(axios, 'put')
      .mockImplementation((url) => new Promise((resolve, reject) => {
        const result = {
          status: 400,
        };
        resolve(result);
      }));
    const spyOnAlert=jest.spyOn(window,'alert');

    store.dispatch(actionCreators.likeEvent(1,'add')).then(() => {
      expect(spyOnAlert).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('bringEvent should operate correctly', (done) => {
    const spyOnPut = jest.spyOn(axios, 'put')
      .mockImplementation((url) => new Promise((resolve, reject) => {
        const result = {
          status: 204,
        };
        resolve(result);
      }));

    store.getState().ur.bringEvents=[];
    store.dispatch(actionCreators.bringEvent(1,'add')).then(() => {
      expect(store.getState().ur.bringEvents).toEqual([1]);
      expect(spyOnPut).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('bringEvent should alert correctly', (done) => {
    const spyOnPut = jest.spyOn(axios, 'put')
      .mockImplementation((url) => new Promise((resolve, reject) => {
        const result = {
          status: 400,
        };
        resolve(result);
      }));
    const spyOnAlert=jest.spyOn(window,'alert');

    store.dispatch(actionCreators.bringEvent(1,'add')).then(() => {
      expect(spyOnAlert).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('changePassword should operate correctly',(done)=>{
    const spyOnPut = jest.spyOn(axios, 'put')
      .mockImplementation((url) => new Promise((resolve, reject) => {
        const result = {
          status: 200,
        };
        resolve(result);
      }));
    const spyOnAlert=jest.spyOn(window,'alert');

    store.dispatch(actionCreators.changePassword('correct_password','new_password')).then(() => {
      expect(spyOnAlert).toHaveBeenCalledWith('setting has been applied!');
      done();
    });
  });

  it('changePassword should alert correctly',(done)=>{
    const spyOnPut = jest.spyOn(axios, 'put')
      .mockImplementation((url) => new Promise((resolve, reject) => {
        const result = {
          status: 403,
        };
        resolve(result);
      }));
    const spyOnAlert=jest.spyOn(window,'alert');

    store.dispatch(actionCreators.changePassword('wrong_password','new_password')).then(() => {
      expect(spyOnAlert).toHaveBeenCalledWith('current password is wrong!');
      done();
    });
  });

  it('changeLanguage should operate correctly',(done)=>{
    const spyOnPut = jest.spyOn(axios, 'put')
      .mockImplementation((url) => new Promise((resolve, reject) => {
        const result = {
          status: 200,
        };
        resolve(result);
      }));

    store.dispatch(actionCreators.changeLanguage(1)).then(() => {
      expect(spyOnPut).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('changeUserInfo should operate correctly',(done)=>{
    const spyOnPut = jest.spyOn(axios, 'put')
      .mockImplementation((url) => new Promise((resolve, reject) => {
        const result = {
          status: 200,
        };
        resolve(result);
      }));

    store.dispatch(actionCreators.changeUserInfo('firstName','lastName',1)).then(() => {
      expect(spyOnPut).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
