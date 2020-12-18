import axios from 'axios';

import store from '../store';
import * as actionCreators from './events';

describe('events', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('getAllEvent should operate correctly',(done)=>{
    const stubEvents = [
      {
        id: 1,
        title:'title',
        place:'place',
        date:'2020-11-05',
        category: 1,
        tag: [1],
        group: 1,
        begin_time:'14:20:00',
        end_time:'16:40:00',
        last_editor:1,
        image:[],
        content:'content',
      }
    ];
    const spyOnGet = jest.spyOn(axios, 'get')
      .mockImplementation((url) => new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubEvents,
        };
        resolve(result);
      }));
    
    store.dispatch(actionCreators.getAllEvent()).then(()=>{
      expect(spyOnGet).toHaveBeenCalledTimes(1);
      expect(store.getState().evt.events).toEqual(stubEvents);
      done();
    });
  });

  it('getEvent should operate correctly',(done)=>{
    const stubEvent = {
      id: 1,
      title:'title',
      place:'place',
      date:'2020-11-05',
      category: 1,
      tag: [1],
      group: 1,
      begin_time:'14:20:00',
      end_time:'16:40:00',
      last_editor:1,
      image:[],
      content:'content',
    };
    const spyOnGet = jest.spyOn(axios, 'get')
      .mockImplementation((url) => new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubEvent,
        };
        resolve(result);
      }));
    
    store.dispatch(actionCreators.getEvent()).then(()=>{
      expect(spyOnGet).toHaveBeenCalledTimes(1);
      expect(store.getState().evt.target).toEqual(stubEvent);
      done();
    });
  });

  it('uploadImage should operate correctly',(done)=>{
    const stubImage = {
      id: 1,
      name:'image_name',
    };
    const spyOnPost = jest.spyOn(axios, 'post')
      .mockImplementation((url) => new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubImage,
        };
        resolve(result);
      }));
    
    store.dispatch(actionCreators.uploadImage(1)).then(()=>{
      expect(spyOnPost).toHaveBeenCalledTimes(1);
      expect(store.getState().evt.selectedImage).toEqual(stubImage);
      done();
    });
  });

  it('deleteEvent should operate correctly',(done)=>{
    const spyOnDelete = jest.spyOn(axios, 'delete')
      .mockImplementation((url) => new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: 1,
        };
        resolve(result);
      }));
    const spyOnAlert=jest.spyOn(window,'alert')
    .mockImplementation();
    
    store.dispatch(actionCreators.deleteEvent(1)).then(()=>{
      expect(spyOnDelete).toHaveBeenCalledTimes(1);
      expect(store.getState().evt.events).toEqual([]);
      expect(spyOnAlert).toHaveBeenCalledWith('이벤트를 성공적으로 삭제하였습니다.');
      done();
    });
  });

  it('deleteEvent should fail correctly',(done)=>{
    const spyOnDelete = jest.spyOn(axios, 'delete')
      .mockImplementation((url) => new Promise((resolve, reject) => {
        const result = {
          status: 502,
          data: 1,
        };
        resolve(result);
      }));
    const spyOnAlert=jest.spyOn(window,'alert')
    .mockImplementation();
    
    store.dispatch(actionCreators.deleteEvent(1)).then(()=>{
      expect(spyOnDelete).toHaveBeenCalledTimes(1);
      expect(spyOnAlert).toHaveBeenCalledWith('예상치 못한 오류로 이벤트 삭제가 실패하였습니다.');
      done();
    });
  });

  it('createEvent should fail correctly',(done)=>{
    const stubEvent = {
      id: 1,
      title:'title',
      place:'place',
      date:'2020-11-05',
      category: 1,
      tag: [1],
      group: 1,
      begin_time:'14:20:00',
      end_time:'16:40:00',
      last_editor:1,
      image:[],
      content:'content',
    };
    const spyOnPost = jest.spyOn(axios, 'post')
      .mockImplementation((url) => new Promise((resolve, reject) => {
        const result = {
          status: 502,
          data: stubEvent,
        };
        resolve(result);
      }));
    const spyOnAlert=jest.spyOn(window,'alert')
    .mockImplementation();
    
    store.dispatch(actionCreators.createEvent(stubEvent)).then(()=>{
      expect(spyOnPost).toHaveBeenCalledTimes(1);
      expect(store.getState().evt.events).toEqual([]);
      expect(spyOnAlert).toHaveBeenCalledWith('예상치 못한 오류로 이벤트 등록이 실패하였습니다.');
      done();
    });
  });

  it('createEvent should operate correctly',(done)=>{
    const stubEvent = {
      id: 1,
      title:'title',
      place:'place',
      date:'2020-11-05',
      category: 1,
      tag: [1],
      group: 1,
      begin_time:'14:20:00',
      end_time:'16:40:00',
      last_editor:1,
      image:[],
      content:'content',
    };
    const spyOnPost = jest.spyOn(axios, 'post')
      .mockImplementation((url) => new Promise((resolve, reject) => {
        const result = {
          status: 201,
          data: stubEvent,
        };
        resolve(result);
      }));
    const spyOnAlert=jest.spyOn(window,'alert')
    .mockImplementation();
    
    store.dispatch(actionCreators.createEvent(stubEvent)).then(()=>{
      expect(spyOnPost).toHaveBeenCalledTimes(1);
      expect(store.getState().evt.events).toEqual([stubEvent]);
      expect(spyOnAlert).toHaveBeenCalledWith('이벤트를 성공적으로 등록하였습니다.');
      done();
    });
  });

  it('modifyEvent should operate correctly',(done)=>{
    const stubEvent = {
      id: 1,
      title:'new_title',
      place:'new_place',
      date:'2020-11-05',
      category: 1,
      tag: [1],
      group: 1,
      begin_time:'14:20:00',
      end_time:'16:40:00',
      last_editor:1,
      image:[],
      content:'new_content',
    };
    const spyOnPut = jest.spyOn(axios, 'put')
      .mockImplementation((url) => new Promise((resolve, reject) => {
        const result = {
          status: 201,
          data: stubEvent,
        };
        resolve(result);
      }));
    const spyOnAlert=jest.spyOn(window,'alert')
    .mockImplementation();
    
    store.dispatch(actionCreators.modifyEvent(stubEvent)).then(()=>{
      expect(spyOnPut).toHaveBeenCalledTimes(1);
      expect(store.getState().evt.events).toEqual([stubEvent]);
      expect(spyOnAlert).toHaveBeenCalledWith('이벤트를 성공적으로 수정하였습니다.');
      done();
    });
  });

  it('modifyEvent should fail correctly',(done)=>{
    const originalEvent = {
      id: 1,
      title:'new_title',
      place:'new_place',
      date:'2020-11-05',
      category: 1,
      tag: [1],
      group: 1,
      begin_time:'14:20:00',
      end_time:'16:40:00',
      last_editor:1,
      image:[],
      content:'new_content',
    };
    const stubEvent = {
      id: 1,
      title:'new_new_title',
      place:'new_new_place',
      date:'2020-11-05',
      category: 1,
      tag: [1],
      group: 1,
      begin_time:'14:20:00',
      end_time:'16:40:00',
      last_editor:1,
      image:[],
      content:'new_new_content',
    };
    const spyOnPut = jest.spyOn(axios, 'put')
      .mockImplementation((url) => new Promise((resolve, reject) => {
        const result = {
          status: 502,
          data: stubEvent,
        };
        resolve(result);
      }));
    const spyOnAlert=jest.spyOn(window,'alert')
    .mockImplementation();
    
    store.dispatch(actionCreators.modifyEvent(stubEvent)).then(()=>{
      expect(spyOnPut).toHaveBeenCalledTimes(1);
      expect(store.getState().evt.events).toEqual([originalEvent]);
      expect(spyOnAlert).toHaveBeenCalledWith('예상치 못한 오류로 이벤트 등록이 실패하였습니다.');
      done();
    });
  });

  it('getTagRecommend should operate correctly',(done)=>{
    const stubTags = [
      {id:1},
    ]
    const spyOnPost = jest.spyOn(axios, 'post')
      .mockImplementation((url) => new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubTags,
        };
        resolve(result);
      }));
    
    store.dispatch(actionCreators.getTagRecommend('content')).then(()=>{
      expect(spyOnPost).toHaveBeenCalledTimes(1);
      expect(store.getState().evt.tagRecommend).toEqual(stubTags);
      done();
    });
  });

  it('reportEvent should operate correctly',(done)=>{
    const spyOnPost = jest.spyOn(axios, 'post')
      .mockImplementation((url) => new Promise((resolve, reject) => {
        const result = {
          status: 201,
        };
        resolve(result);
      }));
    const spyOnAlert=jest.spyOn(window,'alert')
    .mockImplementation();

    store.dispatch(actionCreators.reportEvent(1,'content')).then(()=>{
      expect(spyOnPost).toHaveBeenCalledTimes(1);
      expect(spyOnAlert).toHaveBeenCalledWith('신고가 접수되었습니다.');
      done();
    })
  });

  it('reportEvent should fail correctly',()=>{
    const spyOnPost = jest.spyOn(axios, 'post')
      .mockImplementation((url) => new Promise((resolve, reject) => {
        const result = {
          status: 502,
        };
        resolve(result);
      }));
    const spyOnAlert=jest.spyOn(window,'alert')
    .mockImplementation();

    store.dispatch(actionCreators.reportEvent(1,'content')).then(()=>{
      expect(spyOnPost).toHaveBeenCalledTimes(1);
      expect(spyOnAlert).toHaveBeenCalledWith('예상치 못한 오류로 신고접수가 실패하였습니다. 잠시 뒤에 재시도해주세요');
      done();
    })
  });
});
