angular.module('starter.services')
    .factory('Orders', function ($http, apiUrl, $rootScope) {
        return {
            getInfo: function (produce_ids, from, callback) {
                $http.post(apiUrl + '/orders/info', {
                        version: 'wx',
                        uid: $rootScope.uid,
                        produce_ids: produce_ids,
                        from: from
                    })
                    .success(function (res) {
                        callback(res)
                    })
            },
            create: function (orderData, callback) {
                $http.post(apiUrl + '/orders/create', {
                        version: 'wx',
                        uid: $rootScope.uid,
                        produce_ids: orderData.produce_ids,
                        num: orderData.num,
                        from: orderData.from,
                        order_address: orderData.order_address,
                        user_coupon_id: orderData.user_coupon_id
                    })
                    .success(function (res) {
                        callback(res)
                    })
            }
        }
    })