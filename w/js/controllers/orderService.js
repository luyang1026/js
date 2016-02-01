angular.module('starter.controllers')
/**
 * 我的售后
 */
.controller('OrderServiceCtrl' , function($scope , $state , $stateParams , OrderService){
  var page = 1;
  OrderService.getUserOrderService(page , function(res){
    if(res.status == 200){
      $scope.services = res.data;
      console.log($scope.services);
    }else if(res.status == 400){
      alert(res.error);
    }
  });
  $scope.hasMoreData = true;
  page++;
  $scope.loadMore = function(){
    OrderService.getUserOrderService(page, function(res){
          if(res.status == 200){
            if(res.data.length != 0){
              for (var i = 0; i < res.data.length; i++) {
                $scope.orderService.push(res.data[i]);
              }
            $scope.$broadcast('scroll.infiniteScrollComplete');  
              page++;
            }else{
              $scope.hasMoreData = false;
            }
          }
    }); 
  }

  $scope.detail = function(status,orders_detail_id,express_status){
    switch(status) {
      case '600':
        $state.go('app.userOrderServiceReturnCheck');
        break;
      case '601':
        if(express_status == 0){
          $state.go('app.userOrderServiceReturn',{orders_detail_id:orders_detail_id})
        }else{
          $state.go('app.userOrderServiceReturnCheck');
        }
        break;
      case '701':
          $state.go('app.userOrderServiceReturnCheck')
        break;
      case '702':
          $state.go('app.userOrderServiceRefund',{orders_detail_id:orders_detail_id,status:status})
        break;
      case '603':
          $state.go('app.userOrderServiceRefund',{orders_detail_id:orders_detail_id,status:status})
        break;
    }
  }
})
