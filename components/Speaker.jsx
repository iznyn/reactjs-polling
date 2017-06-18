import React, { Component } from 'react';
import Display from './parts/Display.jsx';
import JoinSpeaker from './parts/JoinSpeaker.jsx';
import Attendance from './parts/Attendance.jsx';
import Questions from './parts/Questions.jsx';

class Speaker extends Component {
    render() {
        return (
            <div className="page--main">
                <Display if={this.props.status === 'connected'}>

                    <Display if={this.props.member.name && this.props.member.type == 'speaker'}>
                        <Questions questions={this.props.questions} />
                        <Attendance audience={this.props.audience} />
                    </Display>

                    <Display if={!this.props.member.name}>
                        <h1>Start the presentation</h1>
                        <JoinSpeaker emit={this.props.emit} />
                    </Display>

                </Display>
            </div>
        );
    }
};

export default Speaker;
