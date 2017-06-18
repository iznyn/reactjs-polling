import React, { Component } from 'react';

class Error404 extends Component {
    render() {
        return (
            <div className="page--not-found">
              <h1>Whoops...</h1>
              <p>We cannot find the page that you have requested.</p>
            </div>
        );
    }
};

export default Error404;
