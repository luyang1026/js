angular.module('starter.controllers')
    //清关审核
    .controller('clearanceVerify', function($scope, $location, Clearance, $localstorage, $ionicLoading) {
        $scope.validate = function(data) {
            //提交审核
            console.log(data.name)
            if (data.name == '') {
                $ionicLoading.show({
                    template: "姓名不能为空",
                    duration: 1000,
                    noBackdrop: true
                })
                return false;
            }
            if (data.phone == '') {
                $ionicLoading.show({
                    template: "电话不能为空",
                    duration: 1000,
                    noBackdrop: true
                })
                return false;
            }

            var from = $localstorage.get('clearanceFrom');
            var parentoid, oid;
            if (from == 1) {
                parentoid = $localstorage.get('parentoid');
                oid = ''
            }
            if (from == 2) {
                oid = $localstorage.get('oid');
                parentoid = '';
            }
            Clearance.submit(parentoid, oid, from, function(res) { //判断是
                    console.log(res);
                    if (res.status == 200) {
                        $location.path('app/clearance/success')
                    } else {
                        $ionicLoading.show({
                            template: res.error,
                            duration: 1500,
                            noBackdrop: true
                        })
                    }
                })
                // $location.path('app/clearance/success')
        }
    })
