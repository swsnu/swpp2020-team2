import axios from 'axios';

import store from '../store';
import * as actionCreators from './actions';

describe('actions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('signIn should operate correctly', (done) => {
    const stubUser = { username: 'test_username', password: 'test_password' };
    const spyOnPost = jest.spyOn(axios, 'post')
      .mockImplementation((url) => new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubUser,
        };
        resolve(result);
      }));

    store.dispatch(actionCreators.signIn(stubUser)).then(() => {
      expect(store.getState().ur.signinedUser).toEqual(stubUser);
      expect(spyOnPost).toHaveBeenCalledTimes(1);
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

    store.dispatch(actionCreators.signUp(stubArgs)).then(() => {
      expect(spyOnPost).toHaveBeenCalledTimes(1);
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
});
