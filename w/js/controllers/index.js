angular.module('starter.controllers', [])
/*首页*/
.controller('IndexCtrl', function($scope,Index,$state,$ionicLoading,$localstorage) {

  $ionicLoading.show({noBackdrop:true})
  currentPage = 1;
  Index.getAllBanner(function(res){
    if(res.status == 200){
      $scope.banners = res.data;
    }
  });
  Index.getCountry(function(res){
    if(res.status == 200){
      $scope.countrys = res.data;
    }
  });
  Index.getAllOperate(function(res){
    if(res.status == 200){
      $scope.operates = res.data;
    }
  });
  Index.getProduceList(currentPage,function(res){
    if(res.status == 200){
      $ionicLoading.hide();
      $scope.produces = res.data.produce;
    }
  });

  $scope.search = function(){
    $state.go('app.search');
  }

  $scope.hasMoreData = true;
  $scope.loadMore = function(){
      currentPage ++;
      Index.getProduceList(currentPage,function(res){
        if(res.status == 200){
          if(res.data.produce){
            for (var i = 0; i < res.data.produce.length; i++) {
              $scope.produces.push(res.data.produce[i]);
            }
          }else{
            $scope.hasMoreData = false;
          }
        }
      }); 
      $scope.$broadcast('scroll.infiniteScrollComplete');  
    }
})