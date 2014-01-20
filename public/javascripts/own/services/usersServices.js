var services = angular.module( 'services.users', [] );

services.factory( 'Users', users );

users.$inject = ['$http'];
function users ( http ) {
  var user = new Service();

  user.addPostPetition( 'saveUser', '/users/user/new', http, returnData, onError );

  user.addPostPetition( 'getOneUser', '/single/users/username/data', http, 
    returnData, onError );

  user.addPostPetition( 'login', '/login', http, returnData, onError )

  return user;
}

function returnData ( response ) {
  return response.data;
}

function onError ( data, status ) {
  console.log( status );
}