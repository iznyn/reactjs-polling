import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class JoinSpeaker extends Component {

    constructor(props) {
        super(props);
        this.start = this.start.bind(this);
    };

    start() {
        this.props.emit( 'start', {
            name: this.textInputName.value,
            title: this.textInputTitle.value
        });
    };

    render() {
        return (
            <form action="javascript:void(0);" onSubmit={this.start}>

                <label>Full Name</label>
                <input ref={(input) => { this.textInputName = input; }}
                       className="form-control"
                       placeholder="enter your full name"
                       required />

                <label>Presentation Title</label>
                <input ref={(input) => { this.textInputTitle = input; }}
                       className="form-control"
                       placeholder="enter a title of this presentation"
                       required />
                <button className="btn btn-primary">Join</button>

            </form>
        );
    };
};

export default JoinSpeaker
