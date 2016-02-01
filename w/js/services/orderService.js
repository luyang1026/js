angular.module('starter.services')
.factory('OrderService' , function($http , apiUrl , $rootScope){
	return{
		getUserOrderService: function(page , callback){
			$http.post(apiUrl + '/user/orders/service' , {version:'wx' , uid : $rootScope.uid , page : page})
			.success(function(res){
				callback(res)
			})
		}
	}
})