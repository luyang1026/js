angular.module('starter.services')
.factory('Pay' , function($http , apiUrl , $rootScope){
	return {
		getOpenidByUid: function(callback){
			$http.post(apiUrl + '/user/center/getopenidbyuid' ,{version:'wx' , uid : $rootScope.uid})
	        .success(function(res){
	        	callback(res)
	        })
		},
		payment: function(openid , order_sn , callback){
			$http.post(apiUrl + '/pay/payment' ,{version:'wx' , uid : $rootScope.uid , openid : openid , order_sn : order_sn, pay_type:2})
	        .success(function(res){
	        	callback(res)
	        })
		},
		orderSplitable:function(parentoid,callback){
			$http.post(apiUrl + '/pay/getsuborders' ,{version:'wx',uid:$rootScope.uid,parentoid:parentoid})
			.success(function(res){
				callback(res)
			})
		}
	}
})