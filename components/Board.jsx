import React, { Component } from 'react';

class Board extends Component {
    render() {
        return (
            <h1>Board: {this.props.name}</h1>
        );
    }
};

export default Board;
