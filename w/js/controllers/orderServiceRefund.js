angular.module('starter.controllers')
//退款完成
.controller('UserOrderServiceRefund' , function($scope , $state , $stateParams , UserOrder){
	var status = $stateParams.status;
	var orders_detail_id = $stateParams.orders_detail_id;
	if(status == 702){
		UserOrder.getRefundDetail(orders_detail_id , function(res){
			if(res.status == 200){
				$scope.refundDetail = res.data;
			}else{
				alert(res.error);
			}
		});
	}else if(status == 603){
		UserOrder.getReturnDetail(orders_detail_id , function(res){
			if(res.status == 200){
				$scope.refundDetail = res.data;
			}else{
				alert(res.error);
			}
		});
	}
})