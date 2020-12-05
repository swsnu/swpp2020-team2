import React, { Component } from 'react';

import './ReportEvent.css';
import { connect } from 'react-redux';

import { BiBadgeCheck } from 'react-icons/bi';
import * as actionCreators from '../../store/actions/index';

class ReportEvent extends Component {
    state = {
      content: '',
    }

    onClickReport() {
      if (this.state.content) {
        this.props.onReportEvent(this.props.event.id, this.state.content);
        this.props.onClickCloseModal();
      } else alert('신고 내역을 입력하세요');
    }

    render() {
      return (
        <div className="ReportEvent">

          <div className="header">
            <label>행사 신고</label>
            <button className="closeBtn" onClick={() => this.props.onClickCloseModal()}>X</button>
          </div>

          <div className="description">
            <label>행사 이름  </label>
            {this.props.event.title}
            <div className="text">
              <BiBadgeCheck style={{ margin: '3px' }} />
              신고결과는 2일내로 반영됩니다.
            </div>
            <div className="text">
              <BiBadgeCheck style={{ margin: '3px' }} />
              신고결과는 개인 알림으로 확인할 수 있습니다.
            </div>
          </div>

          <div className="content">
            <label>신고내역</label>
            <textarea
              className="report-input"
              type="text"
              rows="6"
              value={this.state.content}
              onChange={(event) => this.setState({ content: event.target.value })}
              placeholder="내용을 입력하세요"
            />
          </div>

          <div className="reportBtn">
            <button onClick={() => this.onClickReport()}>신고하기</button>
          </div>

        </div>
      );
    }
}

const mapDispatchToProps = (dispatch) => ({
  onReportEvent: (id, content) => dispatch(actionCreators.reportEvent(id, content)),
});

export default connect(null, mapDispatchToProps)(ReportEvent);
