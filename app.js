/*
 * Module dependencies.
 */

var express     = require('express'),
    config      = require('./config')(),
    routes      = require('./routes'),
    mongoStore  = require('connect-mongo')( express ),
    http        = require('http'),
    path        = require('path');

var app = express();

/*
 * Mongo queries and management is on mongo-queries.js
 */

var queries = require('./mongo-queries');


// all environments
app.set( 'port', process.env.PORT || 3000 );
app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'jade' );
app.locals.pretty = true;
//app.locals.pretty = false; //production mode.
app.use( express.logger('dev') );
//app.use( express.bodyParser() ); bodyParser deprecated, now json && urlenconded
app.use( express.json() );
app.use( express.urlencoded() );
app.use( express.cookieParser() );
app.use( express.session( {
  store: new mongoStore( {
    url: 'mongodb://localhost:27017/boilerplate',
    maxAge: new Date( Date.now() + 60000 )
  }),
  secret: 'Y0l0SW4G-F4RR0SW4G-T0UGHL1FECH00S3M3-H4RDC0R3'
}));

app.use( express.methodOverride() );
app.use( app.router );
  app.use( require('less-middleware')
    ( { src: __dirname + '/public' } ) );
app.use( express.static( path.join( __dirname, 'public') ) );

// development only
if ( 'development' == app.get('env') ) {
  app.use( express.errorHandler() );
}

// GET
// Index
  app.get( '/', routes.index );

// POST
  //All
  app.post( '/all/:schema/:filter/data', queries.privateContent, queries.getAll );

  //Single
  app.post( '/single/:schema/:filter/data', queries.privateContent, queries.getOne );

  //New
  app.post( '/:schema/:reference/new', queries.privateContent, queries.save );

  //Update
  app.post( '/:schema/:document/:filter/update', queries.privateContent, 
    queries.update );

  //Session
  app.post( '/login', queries.login );
  app.post( '/logout', queries.logout);

//To create an user to begin the work
  // app.get( '/initialize', queries.initialize );

http.createServer( app ).listen( config.port, function () {
  console.log( 'Express server listening on port ' + config.port );
});