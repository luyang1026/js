angular.module('starter.services')
.factory('UserOrder' , function($http , apiUrl , $rootScope){
	return {
		getOrdersList: function(tab , page , callback){
			$http.post(apiUrl + '/user/orders/lists',{version:'wx' , uid : $rootScope.uid , tab : tab , page : page})
	        .success(function(res){
	        	callback(res)
	        })
		},
		getOrderDetail: function(oid , callback){
			$http.post(apiUrl + '/user/orders/detail',{version:'wx' , uid : $rootScope.uid , oid : oid})
	        .success(function(res){
	        	callback(res)
	        })
		},
		Receive: function(oid , callback){
			$http.post(apiUrl + '/user/orders/receive',{version:'wx' , uid : $rootScope.uid , oid : oid})
	        .success(function(res){
	        	callback(res)
	        })
		},
		Return: function(serviceData , callback){
			console.log(serviceData);
			$http.post(apiUrl + '/user/orders/return/apply',{version:'wx' , uid : $rootScope.uid , picture:serviceData.picture, reason : serviceData.reason , remark : serviceData.remark , orders_detail_id : serviceData.orders_detail_id})
	        .success(function(res){
	        	callback(res)
	        })
		},
		Refund: function(serviceData , callback){
			$http.post(apiUrl + '/user/orders/refund/apply',{version:'wx' , uid : $rootScope.uid , reason : serviceData.reason , remark : serviceData.remark , orders_detail_id : serviceData.orders_detail_id})
	        .success(function(res){
	        	callback(res)
	        })
		},
		getExpress: function(callback){
			$http.post(apiUrl + '/user/orders/return/express',{version:'wx' , uid : $rootScope.uid})
	        .success(function(res){
	        	callback(res)
	        })
		},
		SubmitExpress: function(expressData , callback){
			$http.post(apiUrl + '/user/orders/return/submit',{version:'wx' , uid : $rootScope.uid , orders_detail_id : expressData.orders_detail_id , express_com : expressData.express_com , express_sn : expressData.express_sn})
	        .success(function(res){
	        	callback(res)
	        })
		},
		getRefundDetail: function(orders_detail_id , callback){
			$http.post(apiUrl + '/user/orders/refund/detail',{version:'wx' , uid : $rootScope.uid , orders_detail_id : orders_detail_id})
	        .success(function(res){
	        	callback(res)
	        })
		},
		getReturnDetail: function(orders_detail_id , callback){
			$http.post(apiUrl + '/user/orders/return/detail',{version:'wx' , uid : $rootScope.uid , orders_detail_id : orders_detail_id})
	        .success(function(res){
	        	callback(res)
	        })
		}
	}
})