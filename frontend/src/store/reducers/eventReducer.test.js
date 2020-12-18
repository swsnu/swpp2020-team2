import React from 'react';
import eventReducer from './eventReducer';
import * as actionTypes from '../actions/actionTypes';

describe('Event reducer', () => {
  const stubInitialState = {
    events: [],
    target: {},
    selectedImage: [],
    tagRecommend: [],
  };

  it('should handle getAllEvent', () => {
    const sampleEvents = [
      {category: {id: 1}},
    ];
    const action = { type: actionTypes.GET_ALL_EVENT, events: sampleEvents };
    const ret = eventReducer(stubInitialState, action);
    expect(ret.events).toEqual(sampleEvents);
  });

  it('should handle getEvent', () => {
    const sampleEvent = {category: {id: 1}};
    const action = { type: actionTypes.GET_EVENT, target: sampleEvent };
    const ret = eventReducer(stubInitialState, action);
    expect(ret.target).toEqual(sampleEvent);
  });

  it('should handle postImage',()=>{
    const sampleImage={id:1};
    const action = { type: actionTypes.POST_IMAGE, data: sampleImage };
    const ret = eventReducer(stubInitialState, action);
    expect(ret.selectedImage).toEqual(sampleImage);
  });

  it('should handle getTagRecommend',()=>{
    const sampleTags=[
      {id:1},
    ];
    const action = { type: actionTypes.GET_TAG_RECOMMEND, target: sampleTags };
    const ret = eventReducer(stubInitialState, action);
    expect(ret.tagRecommend).toEqual(sampleTags);
  });

  it('should handle createEvent',()=>{
    const stubInitialState2={
      events: [{id:1}],
      target: {},
      selectedImage: [{id:1}],
      tagRecommend: [],
    };
    const sampleEvent={id:2};
    const action = { type: actionTypes.CREATE_EVENT, target: sampleEvent };
    const ret = eventReducer(stubInitialState2, action);
    expect(ret.events).toEqual([{id:1},{id:2}]);
    expect(ret.selectedImage).toEqual([]);
  });

  it('should handle modifyEvent',()=>{
    const stubInitialState2={
      events: [{id:1,content:"old_content"}],
      target: {},
      selectedImage: [{id:1}],
      tagRecommend: [],
    };
    const sampleEvent={id:1,content:"new_content"};
    const action = { type: actionTypes.MODIFY_EVENT, target: sampleEvent };
    const ret = eventReducer(stubInitialState2, action);
    expect(ret.events).toEqual([{id:1,content:"new_content"}]);
    expect(ret.selectedImage).toEqual([]);
  });

  it('should handle deleteEvent',()=>{
    const stubInitialState2={
      events: [{id:1}],
      target: {},
      selectedImage: [],
      tagRecommend: [],
    };
    const action = { type: actionTypes.DELETE_EVENT, target:1 };
    const ret = eventReducer(stubInitialState2, action);
    expect(ret.events).toEqual([]);
  });
});
