var mongoose  = require('mongoose');

/** Schemas from mongoose **/
var schemas = {
  users :require('./mongoose_models/user')
}

/** Conection to MongoDB and Mongo queries **/
var conectionString = 'mongodb://localhost:27017/boilerplate';
//Tests use mocha db 
// var conectionString = 'mongodb://localhost:27017/mocha';

mongoose.connect( conectionString, function ( err ) {
  if ( err ) { throw err; }
  console.log('Successfully connected to MongoDB');
});

  exports.getAll = function ( req, res ) {
    var condition = {},
        filter    = req.params.filter,
        schema    = req.params.schema;

    switch ( filter ) {
      case 'none':
        break;
      default:
        condition[filter] = req.body[filter];
        break;
    }
    var query = schemas[schema].find( condition );

    query.select('-_id').exec( function ( err, docs ) {
      if ( err ) { throw err; };
      res.send( docs );
    });
  }

  exports.getOne = function ( req, res ) {
    var condition = {},
        filter = req.params.filter,
        schema = req.params.schema;

    condition[filter] = req.body[filter];

    var query = schemas[schema].findOne( condition );

    query.select('-_id').exec( function ( err, doc ) {
      if ( err ) { throw err; };
      res.send( doc );
    } );
  }

  exports.save = function ( req, res ) {
    var schema    = req.params.schema,
        reference = req.params.reference;

    var newDocument = new schemas[schema]( req.body[reference] );

    newDocument.save( function ( err ) {
      if ( err ) { throw err; };
      res.send( { status: true } );
    } );
  }

  exports.update = function ( req, res ) {
    var schema    = req.params.schema,
        filter    = req.params.filter,
        doc       = req.params.document,
        condition = {},
        update    = {};

    condition[filter] = req.body[filter];
    update            = req.body[doc];

    schemas[schema].update( condition, update, function ( err, number, raw ) {
      if ( err ) { throw err; };
      res.send();
    } );
  }
//Session handlers
  exports.login = function( req, res ) {
    var user = req.body.user,
        candidatePassword = req.body.password;
    // fetch user and test password verification
    schemas.users.findOne( { username: user }, function ( err, user ) {
      if ( err ) { throw err; }

      // test a matching password
      if ( user === null ) {
        res.send( { flag: false } );
      } else {
        user.comparePassword( candidatePassword , function ( err, isMatch ) {
          if ( isMatch ) {
            req.session.user = user;
            res.send( { flag: true } );
          }else{
            res.send( { flag: false } );
          }
        });
      }
    });
  };

  exports.logout = function( req, res ) {
    req.session.destroy();
    res.redirect('/');
  };

  exports.privateContent = function ( req, res, next ) {
    if ( req.session.user ) {
      var username = req.session.user.username;
      User.findOne( { 'username': username }, function ( err, obj ) {
        if ( true ) {
          req.user = obj;
          next();
        } else {
          res.redirect('/');
        }
      });
    } else {
      res.redirect('/');
    }
  };

//Initialize function
  /*exports.initialize = function ( req, res ) {
    var user = new schemas.users({
      username: 'dan',
      password: 'dan'
    });

    user.save( function ( err ) {
      if ( err ) { throw err; };
      console.log('Usuario creado');
      res.send();
    });
  }*/