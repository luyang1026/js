angular.module('starter.controllers')
    // 用户收货地址编辑
    .controller('UserAddressEditCtrl', function($scope, $state, $stateParams, Address, $ionicLoading) {
        $scope.$on('$ionicView.beforeEnter', function(){
            $ionicLoading.show({noBackdrop:true});
        })

        var user_addrid = $stateParams.user_addrid;
        $scope.init = function() {
            Address.GetAddressById(user_addrid, function(res) {
                if (res.status == 200) {
                    $ionicLoading.hide();
                    var area = res.data.province + ' ' + res.data.city + ' ' + res.data.district;
                    $('#demo_dummy').val(area);
                    $scope.address = res.data;
                }
            });
        }

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
            })
            Address.edit(user_addrid, data.name, data.mobile, area, data.address, function(res) {
                if (res.status == 200) {
                    $ionicLoading.hide();
                    var from = $stateParams.from;
                    if (from == 2) {
                        $state.go('app.userAddressSelect', {
                            from: from
                        });
                    } else {

                        $state.go('app.useraddresslist');
                    }
                }
            })
        }
    })
