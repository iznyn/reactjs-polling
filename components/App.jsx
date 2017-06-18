import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import io from 'socket.io-client';
import Header from './parts/Header.jsx';
import Audience from './Audience.jsx';
import Speaker from './Speaker.jsx';
import Board from './Board.jsx';
import Error404 from './Error404.jsx';

class App extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
          status: 'disconnected',
          title: '',
          member: {},
          speaker: '',
          audience: [],
          questions: [],
          name: 'Arni'
        };

        this.connect = this.connect.bind(this);
        this.disconnect = this.disconnect.bind(this);
        this.updateState = this.updateState.bind(this);
        this.emit = this.emit.bind(this);
        this.joined = this.joined.bind(this);
        this.start = this.start.bind(this);
        this.updateAudience = this.updateAudience.bind(this);
    };

    componentWillMount(){
        this.socket = io( 'http://localhost:3000' );
        this.socket.on( 'connect', this.connect );
        this.socket.on( 'disconnect', this.disconnect );
        this.socket.on( 'welcome', this.updateState );
        this.socket.on( 'joined', this.joined );
        this.socket.on( 'audience', this.updateAudience );
        this.socket.on( 'start', this.start );
        this.socket.on( 'end', this.updateState );
    };

    emit( eventName, payload ) {
        this.socket.emit( eventName, payload );
    };

    joined(member)
    {
        sessionStorage.member = JSON.stringify( member );
        this.setState({ member: member });
    };

    updateAudience(newAudience) {
        this.setState({ audience: newAudience });
    };

    start(presentation)
    {
        if ( this.state.member.type === 'speaker' )
        {
            sessionStorage.title = presentation.title;
        }
        this.setState( presentation );
    };

    connect()
    {
        var member = (sessionStorage.member) ? JSON.parse( sessionStorage.member ) : null;
        if ( member && member.type === 'audience' ) {
            this.emit( 'join', member );
        }
        else if ( member && member.type === 'speaker' )
        {
            this.emit( 'start', {member: member.name, title: sessionStorage.title} );
        }
        this.setState({ status: 'connected' });
    };

    disconnect()
    {
        this.setState({
            status: 'disconnected',
            title: 'disconnected',
            speaker: ''
        });
    };

    updateState( serverState )
    {
        this.setState( serverState );
    };

    render() {
        return (
            <div className="wrapper">
                <Header {...this.state} />
                <main>
                    <Switch>
                        //Main
                        <Route exact path="/" render={() => (
                          <Audience emit={this.emit} {...this.state} />
                        )} />
                        //Speaker
                        <Route path="/speaker" render={() => (
                          <Speaker emit={this.emit} {...this.state} />
                        )} />
                        //Board
                        <Route path="/board" render={() => (
                          <Board {...this.state} />
                        )} />
                        //Not found
                        <Route render={() => (
                          <Error404 {...this.state} />
                        )} />
                    </Switch>
                </main>
            </div>
        );
    };
}

export default App
