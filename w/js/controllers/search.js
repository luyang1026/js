angular.module('starter.controllers')
/*首页*/
.controller('SearchCtrl', function($scope,Search,$localstorage,$state) {
  $scope.$on('$ionicView.beforeEnter',function(){
    checkHasRecords();
  })
  $scope.keyword = '';
  $scope.records = $localstorage.getObject('records');
  $scope.search = function(){
    var records = $scope.records;
    if(records.indexOf($scope.keyword) === -1 && $scope.keyword !== ''){

      if(records.length < 10){
        records.unshift($scope.keyword);
      }else{
        records.unshift($scope.keyword);
        records.pop();
      }
    }
    $localstorage.setObject('records',records);
    $scope.records = $localstorage.getObject('records');
    $state.go('app.searchList',{keyword:$scope.keyword});
  }

  $scope.clearRecords = function(){
    $localstorage.del('records');
    $scope.records = $localstorage.getObject('records');
    checkHasRecords();
  }

  // 检查是否有搜索记录
  function checkHasRecords(){
    var records = $localstorage.getObject('records');
    if(records.length !== 0){
      $scope.hasRecords = true;
    }else{
      $scope.hasRecords = false;
    }
    
  }
 
})