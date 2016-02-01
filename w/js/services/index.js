angular.module('starter.services',[])
.factory('Index', function($http, apiUrl){
  return {
    getAllBanner: function(callback) {
      $http.post(apiUrl + '/index/getAllBanner',{version:'wx'})
        .success(function(res){
          callback(res)
        })
    },
    getCountry: function(callback) {
      $http.post(apiUrl + '/index/getCountry',{version:'wx'})
        .success(function(res){
          callback(res)
        })
    },
    getAllOperate: function(callback) {
      $http.post(apiUrl + '/index/getAllOperate',{version:'wx'})
        .success(function(res){
          if(res.status == 200){
            for (var i = 0; i < res.data.length; i++) {
              var picture = new Array();
              picture = res.data[i].picture.split(',');
              res.data[i].picture = picture;
              var url = new Array();
              url = res.data[i].url.split(',');
              res.data[i].url = url;
              var pids = new Array();
              pids = res.data[i].pids.split('|');
              res.data[i].pids = pids;
            }            
          }
          callback(res)
        })
    },
    getProduceList: function(page,callback) {
      $http.post(apiUrl + '/index/getProduceList',{version:'wx',page:page})
        .success(function(res){
          callback(res)
        })
    }
  }
})