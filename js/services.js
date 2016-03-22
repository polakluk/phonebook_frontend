var PHONENUM_REGEXP = /^\d{9}$/;

angular.module('phonebookApp.services', [])
// REST API interceptor for parsing incoming data over GET
.factory('restGetInterceptor', function(){
	return {
		response : function(resource){
			if (resource.data.error == false){
				if( resource.data.data.length > 0 ){
					for(idx = 0; idx < resource.data.data.length; idx++ ){
						resource.data.data[idx] = angular.fromJson(resource.data.data[idx]);
					}
				}
			}
			return resource;
		}
	};
})
// factory class or record model that communicates with server over REST API
.factory('Record', ['$resource', '$injector', function($resource, $injector) {
  return $resource('http://127.0.0.1:5000/phonebook', {}, {
  	'get' : { 
  				interceptor : $injector.get('restGetInterceptor'), 
  				method : 'GET'
  			},
  	'save' : { 
  				method : "PUT",
			  }
  		});
}]);