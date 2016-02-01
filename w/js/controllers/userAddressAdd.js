angular.module('starter.controllers')
    // 添加收货地址
    .controller('UserAddressAddCtrl', function($scope, $state, $stateParams, Address, $ionicLoading) {
        $scope.$on('$ionicView.beforeEnter', function(){
            $ionicLoading.show({noBackdrop:true});
        })
        $scope.$on('$ionicView.afterEnter', function(){
            $ionicLoading.hide();
        })
        $scope.submit = function(data) {

            if (data.name == '') {
                $ionicLoading.show({
                    template: "收货人不能为空",
                    duration: 1000,
                    noBackdrop: true
                });
                return false;
            }
            if (data.mobile == '') {
                $ionicLoading.show({
                    template: "手机号不能为空",
                    duration: 1000,
                    noBackdrop: true
                });
                return false;
            }
            if (checkPhone(data.mobile) == false) {
                return false;
            }
            var area = $('#demo_dummy').val();
            if (!area) {
                $ionicLoading.show({
                    template: "所在区域不能为空",
                    duration: 1000,
                    noBackdrop: true
                });
                return false;
            }
            if (data.address == '') {
                $ionicLoading.show({
                    template: "详细地址不能为空",
                    duration: 1000,
                    noBackdrop: true
                });
                return false;
            }
            $ionicLoading.show({
                noBackdrop: true
            });
            Address.add(data.name, data.mobile, area, data.address, function(res) {
                if (res.status == 200) {
                    var from = $stateParams.from;
                    $ionicLoading.hide();
                    if (from == 2) {
                        $state.go('app.userAddressSelect', {
                            from: from
                        });
                    } else if (from == 1) {
                        $state.go('app.userAddressSelectCart', {
                            from: from
                        });

                    } else {
                        $state.go('app.useraddresslist');

                    }
                }
            })
        }

        function checkPhone(phone) {
            if (!(/^1[3|4|5|7|8]\d{9}$/.test(phone))) {
                $ionicLoading.show({
                    template: "手机号格式错误",
                    duration: 1000,
                    noBackdrop: true
                });
                return false;
            }
        }
    })
