angular.module('starter.controllers')
    /**
     * 用户个人中心
     */
    .controller('ActivityCouponDetailCtrl', function($scope,Coupon,$stateParams,$localstorage,ProduceDetail) {
    	var activity_id = $stateParams.activityId;
    	Coupon.getCoupon(activity_id,function(res){
            $scope.coupons = res.data;
        });
        var produce_ids1 = ['1875','1879','1899','1877'].toString();
        var produce_ids2 =['1470','1858','1854','1352'].toString();
        var produce_ids3=['1760','1394','1456','546'].toString();
        var produce_ids4=['920','970','972','99'].toString();


        ProduceDetail.baseInfo(produce_ids1, function(res) {
            if (res.status == 200) {
                $scope.produceList1 = res.data;
                console.log(JSON.stringify(res,null,4))
            }
        });

        ProduceDetail.baseInfo(produce_ids2, function(res) {
            if (res.status == 200) {
                $scope.produceList2 = res.data;
            }
        });

        ProduceDetail.baseInfo(produce_ids3, function(res) {
            if (res.status == 200) {
                $scope.produceList3 = res.data;
            }
        });

        ProduceDetail.baseInfo(produce_ids4, function(res) {
            if (res.status == 200) {
                $scope.produceList4 = res.data;
            }
        });

    })
