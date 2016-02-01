angular.module('starter.controllers')
// 订单详情
.controller('OrderAddressSelectCtrl', function($scope , $state , Address , $localstorage , $ionicHistory, $stateParams,$location){
  var from = $stateParams.from;
  $scope.$on('$ionicView.beforeEnter', function(){
    
  	Address.lists(function(res){
  		if(res.status == 200){
  			$scope.addressList = res.data;
  		}else if(res.status == 400){
  			alert(res.error);
  		}
  	});
  })
  var couponUrl = $localstorage.get('couponUrl');//上一个页面存的地址
	$scope.selectAddress = function(user_addrid){
		$localstorage.set('current_user_addrid' , user_addrid);
    $location.path('/app/order/info/cart/'+couponUrl);
		// $ionicHistory.goBack();
	}

  $scope.addAddress = function(){
    if(from == 1){
      $state.go('app.userAddressAddCart',{from: from});
    }else{
      $state.go('app.userAddressAddIndex',{from: from});
    }
  }

  $scope.editAddress = function(user_addrid){

    $state.go('app.userAddressEditIndex',{user_addrid: user_addrid, from: from})
  }
})