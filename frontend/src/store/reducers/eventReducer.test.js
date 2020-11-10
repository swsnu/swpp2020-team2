import React from 'react';
import eventReducer from './eventReducer';
import * as actionTypes from '../actions/actionTypes';

describe('Event reducer', () => {
  it('should handle getAllEvent', () => {
    const sampleEvents = [
      {
        category: {
          id: 1,
        },
      },
    ];
    const stubInitialState = {
      events: [],
    };
    const action = { type: actionTypes.GET_ALL_EVENT, events: sampleEvents };
    const ret = eventReducer(stubInitialState, action);
    expect(ret).toEqual({ events: sampleEvents });
  });
});
