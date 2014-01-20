/**
 * Service constructor
 * @return {Service} return a Service object
 */
function Service () {
  /**
   * This adds a post peticion for AngularJS, uses the dependency http from
   * angular, adds a property to the Service object, that property is 
   * a function that return a promise from the http response.
   * @param { property (String) } Name of the new property.
   * @param { route (String) } String to the route for the http post.
   * @param { http ($http) } Http dependency from anjs.
   * @param { good (Function) } Success function that will be the response if 
   *    the http response is a success.
   * @param { wrong (Function) } Error function that will be the response if 
   *    the http response is an error.
   * @return {} Adds the property.
   */
  this.addPostPetition = function ( property, route, http, good, wrong ) {
    this[property] = function ( params ) {
      var promise = http.post( route, params ).
        success( good ).
        error( wrong );
      return promise;
    }
  }
}