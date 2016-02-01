angular.module('starter.controllers')
    //清关认证，支付成功后跳转页面
    .controller('ClearanceGo', function($scope, Clearance, $localstorage, $location, Pay, $timeout, $rootScope) { //判断是否需要认证
        var parentoid = $localstorage.get('order_parentoid');
        $scope.moneypaid = $localstorage.get('moneypaid');
        $scope.clearanceFlag = false;
        $scope.navHide = true;
        Clearance.verify(parentoid, function(res) {
            if (res.status == 200 && res.data.status) { //需要认证
                console.log(res.data.status)
                Pay.orderSplitable(parentoid, function(res) {
                    // console.log(JSON.stringify(res,null,4));
                    if (res.status == 200 && res.data.sub_orders.length == 0) { //判断是否有子订单
                        $scope.clearanceFlag = true;
                    } else {
                        $timeout(function() {
                            $location.path('/app/order/pay');
                        }, 2000)
                    }
                });
            } else { //不需要认证
                $scope.navHide = false;
            }
        });
    })
