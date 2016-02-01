
angular.module('starter.controllers')
// 订单列表
.controller('OrderListCtrl', function($scope , $state , $stateParams , UserOrder , $localstorage,$ionicLoading){
	// var tab = $stateParams.tab;
	var page = 1;
	$scope.tab = $stateParams.tab;
  $scope.$watch('tab',function(){
    $ionicLoading.show({
      noBackdrop:true
    })
    UserOrder.getOrdersList($scope.tab , 1 , function(res){
      console.log(JSON.stringify(res,null,4))
      if(res.status == 200){
        $ionicLoading.hide({})
        $scope.orders = res.data;
      }else if(res.status == 400){
         $ionicLoading.hide({})
        alert(res.error);
      }
    });
  })
  $scope.$on('$ionicView.beforeEnter', function(){
    UserOrder.getOrdersList($scope.tab , 1 , function(res){
  		if(res.status == 200){
        $ionicLoading.hide({})
  			$scope.orders = res.data;
        // console.log(JSON.stringify(res,null,4));
  		}else if(res.status == 400){
        $ionicLoading.hide({})
  			alert(res.error);
  		}
  	});
  })
	$scope.hasMoreData = true;
	page++;
	$scope.loadMore = function(){
		UserOrder.getOrdersList($scope.tab , page , function(res){
	        if(res.status == 200){
	          if(res.data.length != 0){
	            for (var i = 0; i < res.data.length; i++) {
	              $scope.orders.push(res.data[i]);
	            }
	      		$scope.$broadcast('scroll.infiniteScrollComplete');  
	            page++;
	          }else{
	            $scope.hasMoreData = false;
	          }
	        }
		}); 
	}
	$scope.pay = function(parentoid){
    $localstorage.set('parentoid', parentoid);
		window.location.href="/app/order/pay";
	}
	$scope.receive = function(oid){
    if(confirm('确认收货')){

  		UserOrder.Receive(oid , function(res){
  			if(res.status == 200){

          UserOrder.getOrdersList(tab , 1 , function(res){
            if(res.status == 200){
              $scope.orders = res.data;
            }
          });
  			}
  		});
    }
	}
})