var loginApp  = angular.module('loginApp',
  ['services.users']);

loginController.$inject = [ '$scope', 'Users' ];
loginApp.controller('LoginController', loginController);