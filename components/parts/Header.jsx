import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

class Header extends Component {

    static propTypes: {
        title: PropTypes.string.isRequired
    };

    static defaultProps: {
        status: 'disconnected'
    };

    render() {
        return (
          <div className="top">
            <div className="row">
              <div className="col-xs-10">
                <header>
                  <h1>{this.props.title}</h1>
                  <p>{this.props.speaker}</p>
                </header>
              </div>
              <div className="col-xs-2">
                <span id="connection-status" className={this.props.status}></span>
              </div>
            </div>
          </div>
        );
    };
};

export default Header
