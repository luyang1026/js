angular.module('starter.controllers')
    // 购物车
    .controller('CartCtrl', function($scope, $state, Cart, $localstorage, Orders, $ionicLoading) {
        $ionicLoading.show({noBackdrop:true})
        $scope.getLists = function() {
            $ionicLoading.show({noBackdrop:true});
            Cart.lists(function(res) {
                if (res.status == 200) {
                    $ionicLoading.hide();
                    $scope.cartLists = res.data;
                    $scope.sum = res.sum;
                    var checkProduce = $localstorage.getObject('checkProduce');
                    for (var i = 0; i < $scope.cartLists.length; i++) {
                        if (checkProduce.indexOf($scope.cartLists[i].produce_id) === -1) {
                            $scope.cartLists[i].isActive = false;
                        } else {
                            $scope.cartLists[i].isActive = true;
                        }
                    }
                    if ($scope.cartLists.length != 0) {
                        $scope.hasCartLists = true;
                    } else {
                        $scope.hasCartLists = false;
                    }
                    checkAllCheck();
                    checkCanCast();
                }
            })
        }
        $scope.$on('$ionicView.beforeEnter', function() {
            $scope.getLists();
        })
        $scope.checkProduce = function(produce_id, index) {
            var checkProduce = $localstorage.getObject('checkProduce');
            if (checkProduce.indexOf(produce_id) === -1) {
                checkProduce.unshift(produce_id);
                $localstorage.setObject('checkProduce', checkProduce);
                $scope.cartLists[index].isActive = true;
            } else {
                checkProduce.splice(checkProduce.indexOf(produce_id), 1);
                $localstorage.setObject('checkProduce', checkProduce);
                $scope.cartLists[index].isActive = false;
            }

            checkAllCheck();
            checkCanCast();
            $scope.getLists();
        }

        function checkAllCheck() {
            var checkProduce = $localstorage.getObject('checkProduce');
            // 修复bug，checkProduce莫名多出一些值
            if(checkProduce.length > $scope.cartLists.length){
                $localstorage.setObject('checkProduce',[]);
                $scope.allCheckType = false;
                return false;
            }

            if (checkProduce.length == $scope.cartLists.length) {
                $scope.allCheckType = true;
                $localstorage.setObject('allCheckType', true);
            } else {
                $scope.allCheckType = false;
                $localstorage.setObject('allCheckType', false);
            }
        }

        function checkCanCast() {
            var checkProduce = $localstorage.getObject('checkProduce');
            if (checkProduce.length != 0) {
                $scope.canCast = true;
                $localstorage.set('canCast', true);
            } else {
                $scope.canCast = false;
                $localstorage.set('canCast', false);
            }
        }
        $scope.allCheck = function() {
            var checkProduce = $localstorage.getObject('checkProduce');
            var allCheckType = $localstorage.getObject('allCheckType');
            if (allCheckType == true) {
                for (var i = 0; i < $scope.cartLists.length; i++) {
                    $scope.cartLists[i].isActive = false;
                    if (checkProduce.indexOf($scope.cartLists[i].produce_id) !== -1) {
                        checkProduce.splice(checkProduce.indexOf($scope.cartLists[i].produce_id), 1);
                        $localstorage.setObject('checkProduce', checkProduce);
                    }
                }
            } else {
                for (var i = 0; i < $scope.cartLists.length; i++) {
                    $scope.cartLists[i].isActive = true;
                    if (checkProduce.indexOf($scope.cartLists[i].produce_id) === -1) {
                        checkProduce.unshift($scope.cartLists[i].produce_id);
                        $localstorage.setObject('checkProduce', checkProduce);
                    }
                }
            }


            checkAllCheck();
            checkCanCast();
            $scope.getLists();
        }
        $scope.delCart = function(produce_id) {
            Cart.clear(produce_id, function(res) {
                if (res.status == 200) {
                    var checkProduce = $localstorage.getObject('checkProduce');
                    checkProduce.splice(checkProduce.indexOf(produce_id), 1);
                    $localstorage.setObject('checkProduce', checkProduce);
                    $scope.getLists();
                }
            })
        }
        $scope.plus = function(produce_id) {
            $ionicLoading.show({noBackdrop:true})
            Cart.add(produce_id, function(res) {
                // console.log(JSON.stringify(res,null,4));
                if (res.status == 200) {
                    $scope.getLists();
                    $ionicLoading.hide();
                }else{
                    $ionicLoading.show({
                        template:res.error,
                        duration:1000,
                        noBackdrop:true
                    });
                }
            })
        }
        $scope.reduce = function(produce_id, num) {
            $ionicLoading.show({noBackdrop:true});
            if (num > 1) {
                Cart.reduce(produce_id, function(res) {
                    if (res.status == 200) {
                        $scope.getLists();
                        $ionicLoading.hide();
                    }
                })
            } else {

                $ionicLoading.show({
                    template: "小主，表再少了，车车要飘起来了~",
                    duration: 1000,
                    noBackdrop: true
                });

            }
        }
        $scope.cast = function() {
            var checkProduce = $localstorage.getObject('checkProduce');
            var produce_ids = checkProduce.toString();
            if (produce_ids) {
                $state.go('app.orderInfoCart', {
                    produce_ids: produce_ids,
                    from: 1
                });
            } else {

            }
        }
    })
