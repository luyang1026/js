angular.module('starter.controllers')
    /**
     * 用户个人中心
     */
    .controller('CenterCtrl', function($scope, Center) {
        $scope.$on('$ionicView.beforeEnter', function() {

            Center.getUserBaseInfo(function(res) {
                if (res.status == 200) {
                    $scope.baseInfo = res.data;
                } else if (res.status == 400) {
                    alert(res.error);
                }
            })
        })
    })
