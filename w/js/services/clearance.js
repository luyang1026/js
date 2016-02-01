angular.module('starter.services')
.factory('Clearance', function($http,apiUrl,$rootScope){
	return {
		verify:function(parentoid,callback){
			$http.post(apiUrl + '/user/card/verify',{version:'wx',uid:$rootScope.uid,parentoid:parentoid})
			.success(function(res){
				callback(res)
			})
		},
		submit:function(parentoid,oid,from,callback){//1从支付2.从订单详情
			$http.post(apiUrl + '/user/card/submit',{version:'wx',uid:$rootScope.uid,parentoid:parentoid,oid:oid,from:from})
			.success(function(res){
				callback(res)
			})
		}
	}
})