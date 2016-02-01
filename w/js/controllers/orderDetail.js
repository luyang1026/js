angular.module('starter.controllers')
    // 订单详情
    .controller('OrderDetailCtrl', function($scope, $state, $stateParams, UserOrder, $localstorage, $location) {
        $scope.oid = $stateParams.oid;
        $localstorage.set('refundOid',$stateParams.oid);//存地址下一个页面
        $scope.$on('$ionicView.beforeEnter', function() {
            UserOrder.getOrderDetail($scope.oid, function(res) {
                if (res.status == 200) {
                    console.log(JSON.stringify(res, null, 4));
                    $scope.details = res.data;
                    var temp_address = $scope.details.order_address.split('|');
                    $scope.details.name = temp_address[0];
                    $scope.details.mobile = temp_address[1];
                    $scope.details.address = temp_address[2];
                }
            });
        });
        $scope.pay = function() {
            $localstorage.set('parentoid', $scope.order_number);
            window.location.href = "/app/order/pay";
        }
        $scope.clearanceVerify = function() {
            $localstorage.set('oids', $scope.oids);
            $localstorage.set('clearanceFrom', 2);
            $location.path('/app/clearance')
        }
        $scope.receive = function() {
            if (confirm('确认收货')) {

                UserOrder.Receive($scope.oids, function(res) {
                    if (res.status == 200) {
                        $state.go('app.userOrderList', {
                            tab: 3
                        });
                    }
                });
            }
        }
    })
