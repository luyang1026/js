angular.module('starter.services')
.factory('ProduceDetail' , function($http , apiUrl, $rootScope){
	return {
		getProduceDetail: function(produce_id , callback){
			$http.post(apiUrl + '/produce/detail',{version:'wx' , produce_id : produce_id})
	        .success(function(res){
	        	callback(res)
	        })
		},
    base: function(produce_id, callback){
      $http.post(apiUrl + '/produce/base',{version:'wx' ,produce_id:produce_id })
          .success(function(res){
            res.data.market_price = res.data.market_price / 100;
            res.data.sell_price = res.data.sell_price / 100;
            res.data.pledge = res.data.pledge.split(',');
            callback(res);
          })      
    },
    baseInfo: function(produce_ids, callback) {
      $http.post(apiUrl + '/activity/getProduceBaseInfo', {
        produce_ids: produce_ids
      }).success(function(res) {
        callback(res);
      })
    }
	}
})