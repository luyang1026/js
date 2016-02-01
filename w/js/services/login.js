angular.module('starter.services')
.factory('Login' , function($http, apiUrl){
	return {
		setLogin: function(mobile , password , callback){
			$http.post(apiUrl + '/user/login',{version:'wx' , mobile:mobile , password:password})
	        .success(function(res){
	        	callback(res)
	        })
		}
	}
})