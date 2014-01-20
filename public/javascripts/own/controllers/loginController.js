function loginController( scope, users ){
  scope.login = function () {
    params = scope.user;

    users.login( params )
    .success( function ( data ) {
      console.log(data);
    }).error( function ( data ) {
      console.log('Error')
    });
  };
}
