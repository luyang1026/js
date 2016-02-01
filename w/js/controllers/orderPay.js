angular.module('starter.controllers')
    //订单支付
    .controller('OrderPayCtrl', function($scope, $state, Pay, $localstorage, $ionicLoading, $rootScope,$ionicHistory) {
        $scope.openid = '';
        //判断订单是否可拆分
        var parentoid = $localstorage.get('parentoid');
        // 删除parentoid缓存
        // $localstorage.del('parentoid');
        var sonoid = null;
        var splitFlag = false;
        var moneypaid = null;
        Pay.orderSplitable(parentoid, function(res) {

            if (res.status == 200) {
                $scope.orders = res.data;
                // console.log(JSON.stringify(res,null,4))
                if (res.data.is_split) { //是否有子订单
                    $scope.pick($scope.orders.sub_orders[0]);
                    splitFlag = true;
                } else {
                    sonoid = $scope.orders.sub_orders[0].order_sn;
                    moneypaid = ($scope.orders.sub_orders[0].pay_money - $scope.orders.sub_orders[0].reduce) / 100;
                    $localstorage.set('moneypaid', moneypaid);
                }
            } else {
                $state.go('app.center');
                $ionicHistory.clearHistory();
            }
        });

        $scope.pick = function(pickedObj) {


            var subOrders = $scope.orders.sub_orders;
            for (var i = 0; i < subOrders.length; i++) {
                subOrders[i].selected = false;
            }
            pickedObj.selected = true;
            sonoid = pickedObj.order_sn;
            moneypaid = (pickedObj.pay_money - pickedObj.reduce) / 100;
            $localstorage.set('moneypaid', moneypaid);

        }

        $scope.pay = function() {
            $localstorage.set('clearanceFrom', 1);
            $ionicLoading.show({});
            Pay.getOpenidByUid(function(res) {
                if (res.status == 200) {
                    $scope.openid = res.data.openid;
                    $localstorage.set('order_parentoid', parentoid);
                    Pay.payment($scope.openid, sonoid, function(res) { //拆分订单，parentoid传order_sn
                        if (res) {
                            jsApiParameters = res;
                            // alert(JSON.stringify(jsApiParameters));return false;
                            if (typeof WeixinJSBridge == "undefined") {
                                if (document.addEventListener) {
                                    document.addEventListener('WeixinJSBridgeReady', jsApiCall(jsApiParameters), false);
                                } else if (document.attachEvent) {
                                    document.attachEvent('WeixinJSBridgeReady', jsApiCall(jsApiParameters));
                                    document.attachEvent('onWeixinJSBridgeReady', jsApiCall(jsApiParameters));
                                }
                            } else {
                                jsApiCall(jsApiParameters);
                            }
                        } else {
                            alert('调起微信支付失败');
                        }
                    });
                }
            });
        }

        function jsApiCall(jsApiParameters) {

            $ionicLoading.hide({

            });
            WeixinJSBridge.invoke('getBrandWCPayRequest', jsApiParameters, function(res) {
                // alert(JSON.stringify(res));return false;
                switch (res.err_msg) {
                    case 'get_brand_wcpay_request:cancel':
                        location.href = "/";
                        break;
                    case 'get_brand_wcpay_request:fail':
                        location.href = "/";
                        break;
                    case 'get_brand_wcpay_request:ok':
                        location.href = "/app/paytest/WxpaySuccess"; //微信支付成功
                        break;
                }
            });
        }

    })
