import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'

class Join extends Component {

    constructor(props) {
        super(props);
        this.join = this.join.bind(this);
    };

    join() {
        var memberName = this.textInput.value;
        this.props.emit( 'join', {name:memberName} );
    };

    render() {
        return (
            <form action="javascript:void(0);" onSubmit={this.join}>

                <label>Full Name</label>
                <input ref={(input) => { this.textInput = input; }}
                       className="form-control"
                       placeholder="enter your full name"
                       required />
                <button className="btn btn-primary">Join</button>

                <Link to='/speaker'>Join as speaker</Link>

            </form>
        );
    };
};

export default Join
