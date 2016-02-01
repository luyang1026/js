angular.module('starter.controllers')
    // 搜索结果页面
    .controller('SearchListCtrl', function ($scope, $state, $stateParams, Search, $localstorage) {
        $scope.keyword = $stateParams.keyword;
        $scope.records = $localstorage.getObject('records');
        currentPage = 1;
        Search.lists($scope.keyword, $scope.page, function (res) {
            if (res.status == 200) {
                $scope.produces = res.data;
                if ($scope.produces.length != 0) {
                    $scope.hasProduces = true;
                } else {
                    $scope.hasProduces = false;
                }
            }
        });

        $scope.search = function () {
            Search.lists($scope.keyword, 1, function (res) {
                if (res.status == 200) {
                    $scope.produces = res.data;
                    if ($scope.produces.length != 0) {
                        $scope.hasProduces = true;
                    } else {
                        $scope.hasProduces = false;
                    }
                }
                var records = $scope.records;
                if (records.indexOf($scope.keyword) === -1 && $scope.keyword !== '') {

                    if (records.length < 10) {
                        records.unshift($scope.keyword);
                    } else {
                        records.unshift($scope.keyword);
                        records.pop();
                    }
                }
                $localstorage.setObject('records', records);
            });
        }

        $scope.hasMoreData = true;
        currentPage++;
        $scope.loadMore = function () {
            Search.lists($scope.keyword, currentPage, function (res) {
                if (res.status == 200) {
                    if (res.data.length != 0) {
                        for (var i = 0; i < res.data.length; i++) {
                            $scope.produces.push(res.data[i]);
                        }
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                        currentPage++;
                    } else {
                        $scope.hasMoreData = false;
                    }
                }
            });
        }

    })

