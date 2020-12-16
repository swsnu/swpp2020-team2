import React from 'react';
import userReducer from './userReducer';
import * as actionTypes from '../actions/actionTypes';

describe('userReducer',()=>{
  let stubInitialState;

  beforeEach(()=>{
    stubInitialState = {
      signinedUser: null,
      userInfo: null,
      userFullInfo: null,
      likeEvents: [],
      bringEvents: [],
    };
  })

  it('should handle sign_in',()=>{
    const sampleUser={
      id:1,
      username:'test_username',
      first_name:'test_firstname',
      last_name:'test_lastname',
      email:'test_email',
      university:1,
      department:1,
    };
    const action={type:actionTypes.SIGN_IN,user:sampleUser};
    const ret=userReducer(stubInitialState,action);
    expect(ret.signinedUser).toBe(1);
    expect(ret.userInfo).toEqual(sampleUser);
  });

  it('should handle sign_out',()=>{
    const stubInitialState2={
      signinedUser: 1,
      userInfo: {id:1,username:'test_username'},
      userFullInfo: {id:1,username:'test_username'},
      likeEvents: [],
      bringEvents: [],
    };
    const action={type:actionTypes.SIGN_OUT};
    const ret=userReducer(stubInitialState2,action);
    expect(ret.signinedUser).toBe(null);
    expect(ret.userInfo).toBe(null);
    expect(ret.userFullInfo).toBe(null);
  });

  it('should handle get_user',()=>{
    const sampleUser={
      id:1,
      username:'test_username',
      first_name:'test_firstname',
      last_name:'test_lastname',
      email:'test_email',
      university:1,
      department:1,
    };
    const action={type:actionTypes.GET_USER,user:sampleUser};
    const ret=userReducer(stubInitialState,action);
    expect(ret.signinedUser).toBe(1);
    expect(ret.userInfo).toEqual(sampleUser);
  });

  it('should handle get_user_full',()=>{
    const likeEvents=[1,2,3];
    const bringEvents=[4,5,6];
    const sampleUser={
      id:1,
      username:'test_username',
      first_name:'test_firstname',
      last_name:'test_lastname',
      email:'test_email',
      university:1,
      department:1,
      likes:likeEvents,
      brings:bringEvents,
    };
    const action={type:actionTypes.GET_USER_FULL,user:sampleUser};
    const ret=userReducer(stubInitialState,action);
    expect(ret.signinedUser).toBe(1);
    expect(ret.userFullInfo).toEqual(sampleUser);
    expect(ret.likeEvents).toEqual(likeEvents);
    expect(ret.bringEvents).toEqual(bringEvents);
  });

  it('should handle like_event',()=>{
    const likeEvents=[1,2,3];
    const newLikeEvents=[1,2,3,4];
    const newLikeEvents2=[1,2];
    const stubInitialState2={
      signinedUser: 1,
      userInfo: {id:1,username:'test_username'},
      userFullInfo: {id:1,username:'test_username'},
      likeEvents: likeEvents,
      bringEvents: [],
    };
    const sampleUser={
      id:1,
      username:'test_username',
      first_name:'test_firstname',
      last_name:'test_lastname',
      email:'test_email',
      university:1,
      department:1,
      likes:likeEvents,
      brings:[],
    };

    let action={type:actionTypes.LIKE_EVENT,user:sampleUser,oper:'add',event_id:4};
    let ret=userReducer(stubInitialState2,action);
    expect(ret.likeEvents).toEqual(newLikeEvents);

    action={type:actionTypes.LIKE_EVENT,user:sampleUser,oper:'remove',event_id:3};
    ret=userReducer(stubInitialState2,action);
    expect(ret.likeEvents).toEqual(newLikeEvents2);

    action={type:actionTypes.LIKE_EVENT,user:sampleUser,oper:'error',event_id:3};
    ret=userReducer(stubInitialState2,action);
    expect(ret.likeEvents).toEqual(likeEvents);
  });

  it('should handle bring_event',()=>{
    const bringEvents=[4,5,6];
    const newBringEvents=[4,5,6,7];
    const newBringEvents2=[4,5];
    const stubInitialState2={
      signinedUser: 1,
      userInfo: {id:1,username:'test_username'},
      userFullInfo: {id:1,username:'test_username'},
      likeEvents: [],
      bringEvents: bringEvents,
    };
    const sampleUser={
      id:1,
      username:'test_username',
      first_name:'test_firstname',
      last_name:'test_lastname',
      email:'test_email',
      university:1,
      department:1,
      likes:[],
      brings:bringEvents,
    };

    let action={type:actionTypes.BRING_EVENT,user:sampleUser,oper:'add',event_id:7};
    let ret=userReducer(stubInitialState2,action);
    expect(ret.bringEvents).toEqual(newBringEvents);
    
    action={type:actionTypes.BRING_EVENT,user:sampleUser,oper:'remove',event_id:6};
    ret=userReducer(stubInitialState2,action);
    expect(ret.bringEvents).toEqual(newBringEvents2);
    
    action={type:actionTypes.BRING_EVENT,user:sampleUser,oper:'error',event_id:6};
    ret=userReducer(stubInitialState2,action);
    expect(ret.bringEvents).toEqual(bringEvents);
  });
});