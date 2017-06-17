var React = require( 'react' );
var io = require( 'socket.io-client' );
var Header = require( './parts/Header' );

var APP = React.createClass({

    componentWillMount(){
        this.socket = io( 'http://localhost:3000' );
        this.socket.on( 'connect', this.connect );
    },
    connect(){
        alert( 'Connected: ' + this.socket.id );
    },
    render() {
        return (
          <div className="wrapper">
            <Header title="My Polling" />
          </div>
        );
    }
});

module.exports = APP;
