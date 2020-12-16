import React from 'react';
import otherReducer from './otherReducer';
import * as actionTypes from '../actions/actionTypes';

describe('otherReducer', () => {
  const stubInitialState = {
    universities: [],
    departments: [],
    categories: [],
    languages: [],
  };

  it('should handle get_universities', () => {
    const sampleUniv = [
      { id: 1, name: 'test_univ' },
    ];
    const action = { type: actionTypes.GET_UNIVERSITIES, data: sampleUniv };
    const ret = otherReducer(stubInitialState, action);
    expect(ret.universities).toEqual(sampleUniv);
  });

  it('should handle get_departments', () => {
    const sampleDept = [
      { id: 1, name: 'test_dept' },
    ];
    const action = { type: actionTypes.GET_DEPARTMENTS, data: sampleDept };
    const ret = otherReducer(stubInitialState, action);
    expect(ret.departments).toEqual(sampleDept);
  });

  it('should handle get_categories', () => {
    const sampleCate = [
      { id: 1, name: 'test_cate' },
    ];
    const action = { type: actionTypes.GET_CATEGORIES, data: sampleCate };
    const ret = otherReducer(stubInitialState, action);
    expect(ret.categories).toEqual(sampleCate);
  });

  it('should handle get_languages', () => {
    const sampleLang = [
      { id: 1, name: 'test_lang' },
    ];
    const action = { type: actionTypes.GET_LANGUAGES, data: sampleLang };
    const ret = otherReducer(stubInitialState, action);
    expect(ret.languages).toEqual(sampleLang);
  });
});
