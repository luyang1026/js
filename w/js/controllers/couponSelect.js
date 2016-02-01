angular.module('starter.controllers')
//选择优惠券
.controller('CouponSelctCtrl', ['$scope','$localstorage','Coupon','$ionicHistory','$ionicLoading','$location', function($scope,$localstorage,Coupon,$ionicHistory,$ionicLoading,$location){
  $scope.page = 1;
  $scope.couponSelectedId = $localstorage.getObject('couponSelected').id;
  Coupon.getList(1,$scope.page,function(res){
      console.log(JSON.stringify(res,null,4));
      if(res.status == 200){
        $scope.coupons = res.data;
      }
    })
  $scope.loadMore = function(){
      $scope.page ++;
      Coupon.getList(1,$scope.page,function(res){
          if(res.status == 200){
            if(res.data.length != 0){
              for (var i = 0; i < res.data.length; i++) {
                $scope.coupons.push(res.data[i]);
              }
            $scope.$broadcast('scroll.infiniteScrollComplete');  
            }else{
              $scope.hasMoreData = false;
            }
          }
      }); 
  }
  var couponUrl = $localstorage.get('couponUrl');//上一个页面存的地址
  $localstorage.del('couponUrl');
  $scope.selectCoupon = function(price,id,limit){
    var pay_money = $localstorage.get('pay_money');
    var couponSelected ={};
    if(Number(pay_money)>Number(limit)){
      couponSelected.price = price;
      couponSelected.id = id;
      $localstorage.setObject('couponSelected',couponSelected);
      $location.path('/app/order/info/cart/'+couponUrl);
    }else{
      couponSelected.price = 0;
      couponSelected.id = null;
      $ionicLoading.show({
        template:'优惠券不可选',
        duration:1000,
        noBackdrop:true
      });
    }
  }
  $scope.delCoupon = function(){
    $localstorage.del('couponSelected');
    $location.path('/app/order/info/cart/'+couponUrl);

    // $ionicHistory.goBack();
  }
}])