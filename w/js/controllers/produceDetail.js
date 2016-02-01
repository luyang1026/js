angular.module('starter.controllers')
    // 商品详情
    .controller('ProduceDetailCtrl', function($scope, $state, $stateParams, ProduceDetail, Cart, $ionicLoading) {
        $scope.$on('$ionicView.beforeEnter', function() {
            $ionicLoading.show({
                noBackdrop: true
            });
            $scope.produce_id = $stateParams.produce_id;
            ProduceDetail.getProduceDetail($scope.produce_id, function(res) {
                if (res.status == 200) {
                    $scope.details = res.data;
                } else if (res.status == 400) {
                    alert(res.error);
                }
            })
            ProduceDetail.base($scope.produce_id, function(res) {
                if (res.status == 200) {
                    $scope.base = res.data;
                }
            })
            Cart.getCartCount(function(resource) {
                if (resource.status == 200) {
                    console.log(JSON.stringify(resource, null, 4));
                    $scope.num = resource.data.count;
                }
            })
            // 加入购物车
            $scope.addToCart = function() {
                $ionicLoading.show({noBackdrop:true})
                Cart.add($scope.produce_id, function(res) {
                    if (res.status == 200) {
                        Cart.getCartCount(function(resource) {
                            if (resource.status == 200) {
                                
                                $ionicLoading.show({
                                    template: '已加入购物车',
                                    duration: 1000,
                                    noBackdrop: true
                                });
                                $scope.num = resource.data.count;
                            }
                        })
                    } else {
                        $ionicLoading.show({
                            template: res.error,
                            duration: 1000,
                            noBackdrop: true
                        });
                    }
                })
            }
        })

        $scope.$on('$ionicView.afterEnter', function() {
            $ionicLoading.hide();
        })

    })
