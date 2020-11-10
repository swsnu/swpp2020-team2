import React from 'react';

import './EventListModal.css';
import { connect } from 'react-redux';

import * as actionCreators from '../../store/actions/index';

import { GrTableAdd } from "react-icons/gr";

const EventListModal = (props) => {

    const NumEvents = props.dayEventList.length()

    const events= props.dayEventList.map(event=>{
        return(
            <Event
                event={event}
                bringEvent ={()=>onClickBringEvent(event.id)}
                likeEvent ={()=>onClickLikeEvent(event.id)}
                reportEvent ={()=>onClickReportEvent(event.id)}
            />
        )
    })

    onClickCreateEvent((date)=> {
        
    })

    onClickBringEvent((id) => {

    })
    onClickLikeEvent((id) => {

    })
    onClickReportEvent((id) => {

    })

    return (
        <div className="EventListModal" >
            <div className="top">
                <div className="left">
                    {props.date}
                </div>

                <div className="right">
                    <div className="NumEvents">
                    {NumEvents} events 
                    </div>
                    <div className="createEvent">
                        <button onClick={()=>onClickCreateEvent(props.date)}>
                            <GrTableAdd size="12"/>
                        </button>
                    </div>
                </div>
            </div>

            <div className="eventList">
                {events}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(EventListModal);