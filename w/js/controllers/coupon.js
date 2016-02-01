angular.module('starter.controllers')
.controller('CouponCtrl', ['$scope','Coupon','$ionicLoading', function($scope,Coupon,$ionicLoading){
    $scope.tab = 1;
    $scope.page = 1;
    $scope.hasMoreData = true;
    $scope.$watch('tab',function(){
      $ionicLoading.show({
        noBackdrop:true
      })
      Coupon.getList($scope.tab,$scope.page,function(res){
        if(res.status == 200){
          $ionicLoading.hide();
          $scope.coupons = res.data;
          console.log(JSON.stringify(res,null,4))
        }
      })
    });
    $scope.loadMore = function(){
      $scope.page ++;
      Coupon.getList($scope.tab,$scope.page,function(res){
            if(res.status == 200){
              if(res.data.length != 0){
                for (var i = 0; i < res.data.length; i++) {
                  $scope.coupons.push(res.data[i]);
                }
              $scope.$broadcast('scroll.infiniteScrollComplete');  
              }else{
                $scope.hasMoreData = false;
                $scope.page = 1;
              }
            }
      }); 
    }
}])