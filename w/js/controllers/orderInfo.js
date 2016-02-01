angular.module('starter.controllers')
    // 确认订单
    .controller('OrderInfoCtrl', function($location, $scope, $state, $stateParams, Orders, Address, Cart, $localstorage, $ionicLoading, $timeout, $ionicHistory) {
        var produce_ids = $stateParams.produce_ids;
        var from = $stateParams.from;
        //把当前地址保存留给选择优惠券和地址返回时用
        var couponUrl = $stateParams.produce_ids+'/'+$stateParams.from;
        $localstorage.set('couponUrl',couponUrl);

        $scope.from = from;
        $scope.num = 1;
        //$scope.address = {};
        // 商品优惠
        $scope.couponPrice = $localstorage.getObject('couponSelected').price || '0';
        $localstorage.del('couponSelected')//删除优惠券
        Orders.getInfo(produce_ids, from, function(res) {
            if (res.status == 200) {
                console.log(JSON.stringify(res, null, 4))
                //处理返回的数据
                $scope.couponAvailable = res.data.isCoupon == '1' ? true : false;
                var orderInfo = res.data;
                var produces = orderInfo.produces;
                var pay_money = 0;
                var total_money = 0;
                for (key in produces) {
                    pay_money += produces[key].sell_price * produces[key].num;
                }
                $localstorage.set('pay_money',pay_money);//存总金额（不包括运费）
                total_money = pay_money + orderInfo.express_fee;
                orderInfo.pay_money = pay_money;
                orderInfo.total_money = total_money;
                $scope.orderInfo = orderInfo;
            } else if (res.status == 400) {
                // 跳转支付后点返回提示购物车为空，跳转到个人中心
                $ionicLoading.show({
                    template: res.error,
                    noBackdrop: true,
                    duration: 1000
                });
                $timeout(function() {
                    $ionicHistory.clearHistory();
                    $state.go('app.center');
                }, 1000)
            }
        });
        $scope.$on('$ionicView.beforeEnter', function() {
            var current_user_addrid = $localstorage.get('current_user_addrid');
            if (current_user_addrid) {
                Address.GetAddressById(current_user_addrid, function(res) {
                    if (res.status == 200) {
                        $scope.address = res.data;
                        // $localstorage.del('current_user_addrid');//删除地址id
                    }
                });
            } else {
                Address.getDefaultAddress(function(res) {
                    if (res.status == 200) {
                        $scope.address = res.data;
                    }
                });
            }
        });
        $scope.getCoupon = function(){
            if($scope.couponAvailable){
                var temp = '/app/cart/couponSelect';
                $location.path(temp);
            }
        }
        $scope.plus = function() {
            $scope.orderInfo.produces[0].num++;
            $scope.num = $scope.orderInfo.produces[0].num;
            $scope.orderInfo.pay_money = $scope.orderInfo.produces[0].num * $scope.orderInfo.produces[0].sell_price;
            $scope.orderInfo.total_money = $scope.orderInfo.pay_money + $scope.orderInfo.express_fee;
        }
        $scope.reduce = function() {
            if ($scope.orderInfo.produces[0].num > 1) {
                $scope.orderInfo.produces[0].num--;
                $scope.num = $scope.orderInfo.produces[0].num;
                $scope.orderInfo.pay_money = $scope.orderInfo.produces[0].num * $scope.orderInfo.produces[0].sell_price;
                $scope.orderInfo.total_money = $scope.orderInfo.pay_money + $scope.orderInfo.express_fee;
            }
        }
        $scope.createOrder = function() {
            var orderData = {};
            orderData.produce_ids = produce_ids;
            orderData.num = $scope.num;
            orderData.from = from;
            orderData.user_coupon_id = $localstorage.getObject('couponSelected').id || null;//传入选择的优惠券的id
            if ($scope.address) {
                orderData.order_address = $scope.address.name + '|' + $scope.address.mobile + '|' + $scope.address.province + $scope.address.city + $scope.address.district + $scope.address.address;
            } else {
                $ionicLoading.show({
                    template: "请填写收货人地址",
                    duration: 1000,
                    noBackdrop: true
                });
                return false;
            }
            Orders.create(orderData, function(res) {
                if (res.status == 200) {
                    $localstorage.del('couponSelected');

                    var parentoid = res.data.parentoid;
                    $localstorage.set('parentoid', parentoid);
                    if (orderData.from == 1) {
                        Cart.clear(orderData.produce_ids, function(res) {
                            // 清除购物车中保存的商品
                            console.log(res);
                            $localstorage.del('checkProduce');

                            // 跳到支付页面
                            window.location.href = "/app/order/pay";
                            // $state.go('app.userOrderPay');
                        });
                    } else {
                        // 跳到支付页面
                        window.location.href = "/app/order/pay";
                    }
                } else {
                    alert(res.error);
                }
            });
        }

        $scope.chooseAddress = function() {
            var from = $stateParams.from;
            if (from == 1) {
                $state.go('app.userAddressSelectCart', {
                    from: from
                });
            } else {
                $state.go('app.userAddressSelect', {
                    from: from
                });
            }

        }
    })
