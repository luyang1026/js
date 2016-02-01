angular.module('starter.controllers')
    // 用户收货地址列表
    .controller('UserAddressListCtrl', function($scope, $state, Address, $ionicLoading) {
    	$ionicLoading.show({noBackdrop:true})
        function lists() {
            Address.lists(function(res) {
            	$ionicLoading.hide();
                if (res.status == 200) {
                    $scope.addressList = res.data;
                } else if (res.status == 400) {
                    alert(res.error);
                }
            });
        }

        $scope.deleteaddress = function(user_addrid) {
            Address.DeleteAddressById(user_addrid, function(res) {
                lists();
            })
        }

        $scope.$on('$ionicView.beforeEnter', function() {
           lists();
        })

        $scope.edit = function(user_addrid) {
                $state.go('app.userAddressEdit', {
                    user_addrid: user_addrid
                });
            }
            // 设置默认地址
        $scope.updateAddress = function(user_addrid, is_default) {
            $ionicLoading.show({
                noBackdrop: true
            })
            Address.setDefaultAddress(user_addrid, is_default, function(res) {
                if (res.status == 200) {
                    lists();
                
                }
            });
        }
    })
