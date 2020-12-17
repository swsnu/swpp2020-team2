import React from 'react';
import groupReducer from './groupReducer';
import * as actionTypes from '../actions/actionTypes';

describe('groupReducer', () => {
  const stubInitialState = {
    searchGroups: [],
    currGroup: null,
    likeGroups: [],
    noticeGroups: [],
    myGroups: [],
  };

  it('should handle create_group', () => {
    const sampleGroup = {
      id: 1,
      name: 'test_group',
      king: 1,
      description: 'test_description',
      privacy: 1,
    };
    const action = { type: actionTypes.CREATE_GROUP, data: sampleGroup };
    const ret = groupReducer(stubInitialState, action);
    expect(ret.currGroup).toEqual(sampleGroup);
  });

  it('should handle get_all_group', () => {
    const sampleGroups = [{
      id: 1,
      name: 'test_group',
      king: 1,
      description: 'test_description',
      privacy: 1,
    }];
    const action = { type: actionTypes.GET_ALL_GROUP, data: sampleGroups };
    const ret = groupReducer(stubInitialState, action);
    expect(ret.searchGroups).toEqual(sampleGroups);
  });

  it('should handle get_group', () => {
    const sampleGroup = {
      id: 1,
      name: 'test_group',
      king: 1,
      description: 'test_description',
      privacy: 1,
    };
    const action = { type: actionTypes.GET_GROUP, data: sampleGroup };
    const ret = groupReducer(stubInitialState, action);
    expect(ret.currGroup).toEqual(sampleGroup);
  });

  it('should handle get_group_full', () => {
    const sampleGroup = {
      id: 1,
      name: 'test_group',
      king: 1,
      description: 'test_description',
      privacy: 1,
    };
    const action = { type: actionTypes.GET_GROUP_FULL, data: sampleGroup };
    const ret = groupReducer(stubInitialState, action);
    expect(ret.currGroup).toEqual(sampleGroup);
  });

  it('should handle get_like_group', () => {
    const sampleGroups = [{
      id: 1,
      name: 'test_group',
      king: 1,
      description: 'test_description',
      privacy: 1,
    }];
    const action = { type: actionTypes.GET_LIKE_GROUP, data: sampleGroups };
    const ret = groupReducer(stubInitialState, action);
    expect(ret.likeGroups).toEqual(sampleGroups);
  });

  it('should handle get_notice_group', () => {
    const sampleGroups = [{
      id: 1,
      name: 'test_group',
      king: 1,
      description: 'test_description',
      privacy: 1,
    }];
    const action = { type: actionTypes.GET_NOTICE_GROUP, data: sampleGroups };
    const ret = groupReducer(stubInitialState, action);
    expect(ret.noticeGroups).toEqual(sampleGroups);
  });

  it('should handle get_my_group', () => {
    const sampleGroups = [{
      id: 1,
      name: 'test_group',
      king: 1,
      description: 'test_description',
      privacy: 1,
    }];
    const action = { type: actionTypes.GET_MY_GROUP, data: sampleGroups };
    const ret = groupReducer(stubInitialState, action);
    expect(ret.myGroups).toEqual(sampleGroups);
  });

  it('should handle get_nothing_group', () => {
    const sampleGroups = [{
      id: 1,
      name: 'test_group',
      king: 1,
      description: 'test_description',
      privacy: 1,
    }];
    const action = { type: actionTypes.GET_NOTHING_GROUP, data: sampleGroups };
    const ret = groupReducer(stubInitialState, action);
    expect(ret.nothingGroups).toEqual(sampleGroups);
  });

  it('should handle search_group', () => {
    const sampleGroups = [{
      id: 1,
      name: 'test_group',
      king: 1,
      description: 'test_description',
      privacy: 1,
    }];
    const action = { type: actionTypes.SEARCH_GROUP, data: sampleGroups };
    const ret = groupReducer(stubInitialState, action);
    expect(ret.searchGroups).toEqual(sampleGroups);
  });
});
