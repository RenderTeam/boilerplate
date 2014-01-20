var expect    = require('expect.js'),
    mongoose  = require('mongoose'),
    User      = require('../../mongoose_models/user');

var conectionString = 'mongodb://localhost:27017/mocha';

describe( 'User model', function() {
  before( function ( done ) {
    mongoose.connect( conectionString, function ( err ) {
      if ( err ) { throw err; }
      done();
    });
  } );

  afterEach( function ( done ){
    User.remove({}, function() {
      done();
    });
  });

  it('Can be saved', function ( done ) {
    var testUser = new User({
      username: 'dan',
      password: 'dan'
    });

    testUser.save(
      function ( err, user ){
        if (err) return done( err );
        done();
      }
    );
  });

  it('Encrypts password', function ( done ) {
    var testUser = new User({
      username: 'dan',
      password: 'dan'
    });

    testUser.save(
      function ( err, user ){
        if (err) return done( err );
        expect( user.password ).not.to.be( 'dan' );
        expect( testUser.comparePassword( 'dan', function ( err, isMatch) {
          return isMatch;
        }), true );
        done();
      }
    );
  });
});