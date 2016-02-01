angular.module('starter.services')
    .factory('Cart' , function($http , apiUrl , $rootScope, $localstorage){
        return {
            add: function(produce_id, callback){
                $http.post(apiUrl + '/cart/add',{version:'wx' , uid: $rootScope.uid, produce_id:produce_id, num:1})
                    .success(function(res){
                        callback(res)
                    })
            },
            getCartCount: function(callback){
                $http.post(apiUrl + '/cart/getCartCount',{version:'wx' , uid: $rootScope.uid})
                    .success(function(res){
                        callback(res)
                    })
            },
            clear: function(produce_id, callback){
                $http.post(apiUrl + '/cart/clear',{version:'wx' , uid: $rootScope.uid, produce_id:produce_id})
                    .success(function(res){
                        callback(res)
                    })
            },
            reduce: function(produce_id, callback){
                $http.post(apiUrl + '/cart/reduce',{version:'wx' , uid: $rootScope.uid, produce_id:produce_id, num:1})
                    .success(function(res){
                        callback(res)
                    });
            },
            lists: function(callback){
                $http.post(apiUrl + '/cart/lists',{version:'wx' , uid: $rootScope.uid})
                    .success(function(res){
                        if(res.status == 200){
                            var checkProduce = $localstorage.getObject('checkProduce');
                            console.log(checkProduce);
                            var sum = 0;
                            for (var i = 0; i < res.data.length; i++) {
                                if(checkProduce.indexOf(res.data[i].produce_id) !== -1){
                                    sum += res.data[i].price * res.data[i].num;
                                }
                                res.data[i].price = res.data[i].price / 100;
                            }
                            res.sum = sum/100;
                        }
                        callback(res)
                    })
            }
        }
    })