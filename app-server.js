var express = require( 'express' );
var path = require( 'path' );
var _ = require( 'underscore' );
var app = express();
var questions = require( './data/questions.jsx' );

var connections = [];

app.use( express.static(__dirname + '/public') );
app.use( express.static(__dirname + '/node_modules/bootstrap/dist/' ) );

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '', 'public', 'index.html'));
});

var server = app.listen( 3000 );
var io = require( 'socket.io' ).listen( server );
var title = 'Untitled Presentation';
var audience = [];
var speaker = {};

io.sockets.on('connection', function(socket)
{
    //disconnected
    socket.once( 'disconnect', function()
    {
        var member = _.findWhere( audience, { id:this.id });
        if ( member )
        {
            audience.splice( audience.indexOf(member), 1 );
            io.sockets.emit( 'audience', audience );
            console.log( 'Left: %s (%s audience members)', member.name, audience.length );
        }
        else if ( this.id == speaker.id )
        {
            console.log( "%s has Left, '%s' is over", speaker.name, title );
            speaker = {};
            title = "Untitled Presentation";
            io.sockets.emit( 'end', { title: title, speaker: '' });
        }

        connections.splice( connections.indexOf( socket ), 1 );
        socket.disconnect();
        console.log( 'Disconnected: %s sockets remaining', connections.length );
    });

    //Do join emit
    socket.on( 'join', function( payload )
    {
        var newMember = {
            id: this.id,
            name: payload.name,
            type: 'member'
        };
        this.emit( 'joined', newMember );
        audience.push( newMember );
        io.sockets.emit( 'audience', audience );
        console.log( 'Audience joined: %s', payload.name );
    });

    //Do start presentation emit
    socket.on( 'start', function( payload )
    {
        speaker.name = payload.name;
        speaker.id = this.id;
        speaker.type = 'speaker';
        title = payload.title;
        this.emit( 'joined', speaker );
        io.sockets.emit( 'start', {title: title, speaker: speaker.name} );
        console.log( "Presentation started: '%s' by %s", title, payload.name );
    });

    //Welcome emit
    socket.emit( 'welcome', {
      title: title,
      audience: audience,
      speaker: speaker.name,
      questions: questions
    });

    connections.push(socket);
    console.log( 'Connected: %s sockets connected', connections.length );
});

console.log( 'Server running at http://localhost:3000' );
