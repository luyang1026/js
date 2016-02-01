angular.module('starter.services')
    .factory('Center', function ($http, apiUrl, $rootScope) {
        return {
            getUserBaseInfo: function (callback) {
                $http.post(apiUrl + '/user/center/info', {version: 'wx', uid: $rootScope.uid})
                    .success(function (res) {
                        callback(res)
                    })
            }
        }
    })