import React, { Component } from 'react';

class Questions extends Component {

    addQuestion(question, i) {
        return (
            <div className="col-xs-12 col-sm-6 col-md-3 question" key={i}>
                <span>{question.q}</span>
            </div>
        );
    };

    render() {
        return (
            <div id="questions" className="row">
                <h2>Questions</h2>
                {this.props.questions.map(this.addQuestion)}
            </div>
        );
    };
};

export default Questions
