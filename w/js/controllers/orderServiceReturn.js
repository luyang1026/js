angular.module('starter.controllers')
//上传退货单
.controller('UserOrderServiceReturn' , function($scope , $state , $stateParams , UserOrder , $ionicHistory){
	UserOrder.getExpress(function(res){
		if(res.status == 200){
			$scope.express = res.data;
		}
	});
	$scope.expressData = {
			'experss_com' : 0,
			'express_sn' : ''
	};
	console.log($scope.expressData);
	$scope.submit = function(){
		$scope.expressData.orders_detail_id = $stateParams.orders_detail_id;
		UserOrder.SubmitExpress($scope.expressData , function(res){
			if(res.status == 200){
				alert('上传快递单成功');
				$ionicHistory.goBack();
			}else{
				alert(res.error);
			}
		});
	}
})