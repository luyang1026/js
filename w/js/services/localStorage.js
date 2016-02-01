angular.module('starter.services')
.factory('$localstorage', ['$window' ,'$rootScope', function($window, $rootScope) {
  return {
    set: function(key, value) {
      $window.localStorage[key + '_' + $rootScope.uid] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key + '_' + $rootScope.uid] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key + '_' + $rootScope.uid] = JSON.stringify(value);
    },
    getObject: function(key) {
      if($window.localStorage[key + '_' + $rootScope.uid] === undefined){
        var result = new Array();
        return result;
      }else{
        return JSON.parse($window.localStorage[key + '_' + $rootScope.uid]);
      }
    },
    del: function(key){
      return $window.localStorage.removeItem(key + '_' + $rootScope.uid);
    }
  }
}]);