angular.module('starter.services')
.factory('Search', function($http, apiUrl){
  return {
    lists: function(keyword,page , callback){
      $http.post(apiUrl + '/search/lists',{version:'wx' , keyword : keyword, page:page})
          .success(function(res){
            callback(res)
          })
    }
  }
})