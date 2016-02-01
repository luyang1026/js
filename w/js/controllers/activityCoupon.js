angular.module('starter.controllers')
    /**
     * 输入手机号领优惠券
     */
    .controller('ActivityCouponCtrl', function($scope, Coupon, $stateParams, $ionicLoading, $state, $ionicHistory) {
        $scope.$on('$ionicView.beforeEnter', function() {
            Coupon.checkHasMobile(function(res) {
                var activity_id = $stateParams.activityId;
                console.log(activity_id);
                if (res.status == 400) {
                    $ionicHistory.clearHistory();
                    $state.go('app.activityCouponDetail', {
                        activityId: activity_id
                    });
                } else {
                    $scope.submit = function(data) {

                            if (data.mobile == '') {
                                $ionicLoading.show({
                                    template: "请输入手机号",
                                    duration: 1000,
                                    noBackdrop: true
                                });
                                return false;
                            }
                            if (data.mobile == '') {
                                $ionicLoading.show({
                                    template: "您输入的手机号格式有误",
                                    duration: 1000,
                                    noBackdrop: true
                                });
                                return false;
                            }

                            Coupon.savePhone(data.mobile, activity_id, function(res) {

                                if (res.status == 200) {

                                    $state.go('app.activityCouponDetail', {
                                        activityId: activity_id
                                    });
                                }
                            })

                        }
                        // Coupon.getCouponFromPhone();
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
                }
            })
        })

    })
