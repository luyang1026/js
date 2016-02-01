angular.module('starter.services')
.factory('Coupon',  function($http,apiUrl,$rootScope){
	return {
		getList: function(tab_num,page,callback){
			$http.post(apiUrl + '/user/coupon/lists',{version:'wx', uid : $rootScope.uid , tab : tab_num ,page : page})
			.success(function(res){
				callback(res)
			})
		},
		savePhone:function(mobile,activity_id,callback){
			$http.post(apiUrl + '/user/coupon/getcoupon',{version:'wx', uid: $rootScope.uid, mobile: mobile, activity_id: activity_id})
			.success(function(res){
				callback(res)
			})
		},
		getCoupon:function(activity_id,callback){
			$http.post(apiUrl + '/user/coupon/GetCouponByActivityId',{version:'wx', uid: $rootScope.uid, activity_id: activity_id})
			.success(function(res){
				callback(res)
			})
		},
		checkHasMobile:function(callback){
			$http.post(apiUrl + '/user/coupon/hasMobile',{version:'wx', uid: $rootScope.uid})
			.success(function(res){
				callback(res)
			})
		}

	}
})