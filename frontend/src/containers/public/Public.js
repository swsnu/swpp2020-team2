import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import TopBar from '../../components/TopBar/TopBar';
import './Public.css';
import Calendar from '../../components/Calendar/Calendar';
import { createEventIcon } from '../../images/index';
import EventListModal from '../../components/eventListModal/EventListModal';

function onClickDay(day, events) {
  // show modal window
}

function onClickEvent(evt) {
  // redirect to event detail
}

class Public extends Component {
  state={
    modalBool: false,
  }

  componentDidMount() {
    const { onGetAllEvent } = this.props;
    onGetAllEvent();
  }

  onClickCreateEvent() {
    this.props.history.push('/details/create');
  }

  makeModal() {

  }

  render() {
    const { events } = this.props;

    let modal = null;
    if (this.state.modalBool) {
      modal = (
        <div style={{
          backgroundColor: 'white', width: 1000, height: 800, border: '10 solid black', position: 'fixed', left: 460, top: 100,
        }}
        >
          <EventListModal />
        </div>
      );
    }

    return (
      <div className="Public">
        <div>
          <TopBar />
        </div>
        <div>
          <Calendar
            events={events}
            onClickDay={onClickDay}
          />
        </div>
        <button className="createEventButtonInCalendar" src={createEventIcon} label="createEvent" type="button" onClick={() => this.onClickCreateEvent()}>
          <img className="img" src={createEventIcon} alt="+" />
        </button>
        <button onClick={() => this.setState({ modalBool: !this.state.modalBool })} />
        {modal}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  events: state.evt.events,
});

const mapDispatchToProps = (dispatch) => ({
  onGetAllEvent: () => dispatch(actionCreators.getAllEvent()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Public);
