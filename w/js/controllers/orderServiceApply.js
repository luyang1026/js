angular.module('starter.controllers')
//申请售后
.controller('UserOrderServiceApply' , function($scope , $state , $stateParams , UserOrder , $ionicHistory , $ionicLoading,$localstorage,$location){
	$scope.status = $stateParams.status;
	$scope.orders_detail_id = $stateParams.orders_detail_id;
	$scope.refund_money = $stateParams.refund_money;
	$scope.serviceData = {
			'service' : '',
			'reason' : '',
			'remark' : '',
			'upload_json' : '',
	};
	var refundOidUrl = $localstorage.get('refundOid');//从上一个页面拿地址
	$scope.apply = function(){
    console.log($('#upload_json').val());
    $scope.serviceData.picture = $('#upload_json').val();
		$scope.serviceData.orders_detail_id = $scope.orders_detail_id;
		if($scope.serviceData.reason == ''){
			$ionicLoading.show({
		        template: "请选择退款原因",
		        duration: 1000,
		        noBackdrop: true
		      });
		      return false; 		
		}
		if($scope.serviceData.service == '退货'){
			
			UserOrder.Return($scope.serviceData , function(res){
				console.log(res);return false;
				if(res.status == 200){
					alert('申请成功,请耐心等待');
					$state.go('app.userOrderList');
				}else{
					alert(res.error);
				}
			});
		}else if($scope.serviceData.service == '退款'){
			UserOrder.Refund($scope.serviceData , function(res){
				if(res.status == 200){
					alert('申请成功,请耐心等待');
					// $ionicHistory.goBack();
					$location.path('/app/user/order/detail/'+refundOidUrl);
				}else{
					alert(res.error);
				}
			});
		}else{
			$ionicLoading.show({
		        template: "请选择售后类型",
		        duration: 1000,
		        noBackdrop: true
		      });
			return false;
		}
	}
})