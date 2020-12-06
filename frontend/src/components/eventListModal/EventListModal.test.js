import React from 'react';
import { shallow, mount } from 'enzyme';
import { createBrowserHistory } from 'history';
import EventListModal from './EventListModal';

// event component mocking
jest.mock('../eventBox/EventBox', () => jest.fn((props) => (
  <div className="spyEvent">
    <button className="title" onClick={() => { props.detailEvent(props.event?.id); }}>
      {props.event?.title}
    </button>
  </div>
)));

describe('<EventListModal />', () => {
  it('should render without errors', () => {
    const component = shallow(<EventListModal />);
    const wrapper = component.find('.EventListModal');
    expect(wrapper.length).toBe(1);
  });

  it('should close modal after button', () => {
    const component = shallow(<EventListModal onClickCloseModal={() => { }} />);
    const wrapper = component.find('.closeButton');
    wrapper.simulate('click');
    expect(wrapper.length).toBe(1);
  });

  it('should redirect to create page after click the button', () => {
    const component = shallow(<EventListModal onClickCreateEvent={(day) => { }} />);
    const wrapper = component.find('.createEventButton');
    wrapper.simulate('click');
    expect(wrapper.length).toBe(1);
  });

  it('should call \'onClickDetailEvent\'', () => { // 42,47,52 line cover
    const history = createBrowserHistory();
    const spyHistoryPush = jest.spyOn(history, 'push').mockImplementation((path) => { });
    const component = mount(<EventListModal
      history={history}
      day="2020. 05. 20. Sat"
      dayEventList={
        [
          {
            id: 1,
            title: 'TEST_TITLE',
            group: 'TEST_GROUP',
            place: 'TEST_PLACE',
            begin_time: '05:00',
            end_time: '20:00',
            category: {
              id: 0,
              name: '공연',
            },
            date: '2020.05.20',
          },
        ]
      }
    />);
    const wrapper = component.find('.spyEvent');
    expect(wrapper.length).toBe(1);

    const wrapper2 = component.find('.spyEvent .title').at(0);
    wrapper2.simulate('click');
    expect(spyHistoryPush).toHaveBeenCalledWith('/details/1');
  });
});
