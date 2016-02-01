// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ui.router', 'ngCookies'], function($httpProvider) {
        // 头部配置
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf8';
        $httpProvider.defaults.headers.post['Accept'] = 'application/json, text/javascript, */*; q=0.01';
        $httpProvider.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';
        /**  
         * 重写angular的param方法，使angular使用jquery一样的数据序列化方式  The workhorse; converts an object to x-www-form-urlencoded serialization.  
         * @param {Object} obj  
         * @return {String}  
         */
        var param = function(obj) {
            var query = '',
                name, value, fullSubName, subName, subValue, innerObj, i;

            for (name in obj) {
                value = obj[name];

                if (value instanceof Array) {
                    for (i = 0; i < value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value instanceof Object) {
                    for (subName in value) {
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value !== undefined && value !== null)
                    query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
            }

            return query.length ? query.substr(0, query.length - 1) : query;
        };

        // Override $http service's default transformRequest  
        $httpProvider.defaults.transformRequest = [function(data) {
            return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
        }];
    })
    .run(['$ionicPlatform', '$cookieStore', '$rootScope', '$location', '$state','$ionicHistory', function($ionicPlatform, $cookieStore, $rootScope, $location, $state,$ionicHistory) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleLightContent();
            }
        });
        $cookieStore.put('uid', '10058');
        $rootScope.uid = $cookieStore.get('uid');       
    }])

// .config(['$stateProvider,$urlRouterProvider,$locationProvider,$ionicConfigProvider',function($stateProvider,$urlRouterProvider,$locationProvider,$ionicConfigProvider) {

// }])
.config(function($stateProvider, $urlRouterProvider, $locationProvider, $ionicConfigProvider, $controllerProvider) {
        // $ionicConfigProvider.platform.ios.tabs.style('standard'); 
        // $ionicConfigProvider.platform.ios.tabs.position('bottom');
        $ionicConfigProvider.platform.android.tabs.style('standard');
        $ionicConfigProvider.platform.android.tabs.position('bottom');

        // $ionicConfigProvider.platform.ios.navBar.alignTitle('center'); 
        // $ionicConfigProvider.platform.android.navBar.alignTitle('center');

        // $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
        // $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');        

        // $ionicConfigProvider.platform.ios.views.transition('ios'); 
        // $ionicConfigProvider.platform.android.views.transition('android');

        //$ionicConfigProvider.templates.maxPrefetch(0);
        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

        // setup an abstract state for the tabs directive

        // Each tab has its own nav history stack:
            .state('app', {
            url: '/app',
            'abstract': true,
            templateUrl: 'templates/footer.html'
        })

        // 首页
        .state('app.index', {
            url: '/index',
            views: {
                'app-index': {
                    templateUrl: 'templates/index.html',
                    controller: 'IndexCtrl'
                }
            }
        })

        // 搜索页面
        .state('app.search', {
            url: '/search',
            views: {
                'app-search': {
                    templateUrl: 'templates/search.html',
                    controller: 'SearchCtrl'
                }
            }
        })

        // 搜索结果页面
        .state('app.searchList', {
            url: '/search/:keyword',
            views: {
                'app-search': {
                    templateUrl: 'templates/search-list.html',
                    controller: 'SearchListCtrl'
                }
            }
        })

        // 提交订单, from 立即购买
        .state('app.orderInfo', {
            url: '/order/info/:produce_ids/:from',
            views: {
                'app-index': {
                    templateUrl: 'templates/order/info.html',
                    controller: 'OrderInfoCtrl'
                }
            }
        })

        // 提交订单, from 购物车
        .state('app.orderInfoCart', {
                url: '/order/info/cart/:produce_ids/:from',
                views: {
                    'app-cart': {
                        templateUrl: 'templates/order/info.html',
                        controller: 'OrderInfoCtrl'
                    }
                }
            })
            //选择收货地址
            .state('app.userAddressSelect', {
                url: '/order/address/select/:from',
                views: {
                    'app-index': {
                        templateUrl: 'templates/order/address/select.html',
                        controller: 'OrderAddressSelectCtrl',
                    }
                }
            })

        //选择收货地址 from cart
        .state('app.userAddressSelectCart', {
            url: '/order/address/select/cart/:from',
            views: {
                'app-cart': {
                    templateUrl: 'templates/order/address/select.html',
                    controller: 'OrderAddressSelectCtrl',
                }
            }
        })

        // 购物车页面
        .state('app.cart', {
            url: '/cart',
            views: {
                'app-cart': {
                    templateUrl: 'templates/cart.html',
                    controller: 'CartCtrl'
                }
            }
        })

        // 商品详情页面
        .state('app.produceDetail', {
            url: '/produce/:produce_id',
            views: {
                'app-index': {
                    templateUrl: 'templates/produce-detail.html',
                    controller: 'ProduceDetailCtrl'
                }
            }
        })

        // 商品详情页面，from search
        .state('app.searchProduceDetail', {
            url: '/search/produce/:produce_id',
            views: {
                'app-search': {
                    templateUrl: 'templates/produce-detail.html',
                    controller: 'ProduceDetailCtrl'
                }
            }
        })

        // 个人中心
        .state('app.center', {
            url: '/center',
            views: {
                'app-center': {
                    templateUrl: 'templates/center.html',
                    controller: 'CenterCtrl'
                }
            }
        })

        // 订单列表
        .state('app.userOrderList', {
            url: '/user/order/lists/:tab',
            views: {
                'app-center': {
                    templateUrl: 'templates/user/order/lists.html',
                    controller: 'OrderListCtrl'
                }
            }
        })

        //售后列表
        .state('app.userOrderService', {
                url: '/user/order/service',
                views: {
                    'app-center': {
                        templateUrl: 'templates/user/order/service.html',
                        controller: 'OrderServiceCtrl'
                    }
                }
            })
            // 订单详情
            .state('app.userOrderDetail', {
                url: '/user/order/detail/:oid',
                views: {
                    'app-center': {
                        templateUrl: 'templates/user/order/detail.html',
                        controller: 'OrderDetailCtrl'
                    }
                }
            })
            // 订单支付，带上主订单ID
            .state('app.userOrderPay', {
                url: '/order/pay',
                views: {
                    'app-center': {
                        templateUrl: 'templates/user/order/pay.html',
                        controller: 'OrderPayCtrl'
                    }
                }
            })

        // 用户收货地址列表
        .state('app.useraddresslist', {
            url: '/user/address/lists',
            views: {
                'app-center': {
                    templateUrl: 'templates/user/address/lists.html',
                    controller: 'UserAddressListCtrl',
                }
            }
        })

        // 编辑收货地址
        .state('app.userAddressEdit', {
            cache: 'true',
            url: '/user/address/edit/:user_addrid',
            views: {
                'app-center': {
                    templateUrl: 'templates/user/address/edit.html',
                    controller: 'UserAddressEditCtrl',
                }
            }
        })

        // 编辑收货地址 from index
        .state('app.userAddressEditIndex', {
            cache: 'true',
            url: '/user/address/edit/:user_addrid/:from',
            views: {
                'app-index': {
                    templateUrl: 'templates/user/address/edit.html',
                    controller: 'UserAddressEditCtrl',
                }
            }
        })

        // 添加收货地址
        .state('app.userAddressAdd', {
            cache: 'true',
            url: '/user/address/add',
            views: {
                'app-center': {
                    templateUrl: 'templates/user/address/add.html',
                    controller: 'UserAddressAddCtrl',
                }
            }
        })

        // 添加收货地址 from index
        .state('app.userAddressAddIndex', {
            cache: 'true',
            url: '/user/address/add/:from',
            views: {
                'app-index': {
                    templateUrl: 'templates/user/address/add.html',
                    controller: 'UserAddressAddCtrl',
                }
            }
        })

        // 添加收货地址 from cart
        .state('app.userAddressAddCart', {
                url: '/user/address/add/cart/:from',
                views: {
                    'app-cart': {
                        templateUrl: 'templates/user/address/add.html',
                        controller: 'UserAddressAddCtrl',
                    }
                }
            })
        // 活动页面
        .state('app.activity', {
            url: '/activity/:id',
            views: {
                'app-index': {
                    templateUrl: 'templates/activity/activity1.html',
                    controller: 'ActivityCtrl',
                }
            }
        })

        // 申请售后
        .state('app.userOrderServiceApply', {
                url: '/user/order/service/apply/:orders_detail_id/:status/:refund_money',
                views: {
                    'app-center': {
                        templateUrl: 'templates/user/order/service/apply.html',
                        controller: 'UserOrderServiceApply',
                    }
                }
            })
            //提交退货单
            .state('app.userOrderServiceReturn', {
                url: '/user/order/service/return/:orders_detail_id',
                views: {
                    'app-center': {
                        templateUrl: 'templates/user/order/service/return.html',
                        controller: 'UserOrderServiceReturn',
                    }
                }
            })
            //退货审核
            .state('app.userOrderServiceReturnCheck', {
                url: '/user/order/service/return_check',
                views: {
                    'app-center': {
                        templateUrl: 'templates/user/order/service/return_check.html',
                        controller: 'UserOrderServiceReturnCheck',
                    }
                }
            })
            //退款完成
            .state('app.userOrderServiceRefund', {
                url: '/user/order/service/refund/:orders_detail_id/:status',
                views: {
                    'app-center': {
                        templateUrl: 'templates/user/order/service/refund.html',
                        controller: 'UserOrderServiceRefund',
                    }
                }
            })
            //优惠券
            .state('app.coupon', {
                url: '/user/coupon/lists',
                views: {
                    'app-center': {
                        templateUrl: 'templates/coupon/coupon_list.html',
                        controller: 'CouponCtrl'
                    }
                }
            })
            //选择优惠券
            .state('app.selectCoupon', {
                url: '/cart/couponSelect',
                views: {
                    'app-cart': {
                        templateUrl: 'templates/coupon/coupon_select.html',
                        controller: 'CouponSelctCtrl'
                    }
                }
            })
            //清关认证，支付成功后
            .state('app.CustomsClearanceGo', {
                url: '/paytest/WxpaySuccess',
                views: {
                    'app-index': {
                        templateUrl: 'templates/clearance/customs_go.html',
                        controller: 'ClearanceGo'
                    }
                }
            })
            .state('app.CustomsClearance', {
                url: '/clearance',
                views: {
                    'app-center': {
                        templateUrl: 'templates/clearance/customs_verify.html',
                        controller: 'clearanceVerify'
                    }
                }
            })
            .state('app.CustomsClearanceSuccess', {
                url: '/clearance/success',
                views: {
                    'app-center': {
                        templateUrl: 'templates/clearance/customs_success.html',
                        // controller:'clearanceVerify'
                    }
                }
            })
            // 领取优惠券页面
            .state('app.activityCoupon', {
                url: '/activity/coupon/:activityId',
                views: {
                    'app-index': {
                        templateUrl: 'templates/activity/coupon/coupon.html',
                        controller:'ActivityCouponCtrl'
                    }
                }
            })
            // 优惠券详情页面
            .state('app.activityCouponDetail', {
                url: '/activity/couponDetail/:activityId',
                views: {
                    'app-index': {
                        templateUrl: 'templates/activity/coupon/couponDetail.html',
                        controller:'ActivityCouponDetailCtrl'
                    }
                }
            })
            // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/index');
        $locationProvider.html5Mode(true);
    })
    .directive('hideTabs', function($rootScope, $ionicTabsDelegate, $state) {
        return {
            restrict: 'A',
            link: function(scope, element, attributes) {
                scope.$on('$ionicView.beforeEnter', function() {
                    if (attributes.hideTabs == 'true') {
                        $rootScope.hideTabs = true;
                    } else {
                        $rootScope.hideTabs = false;
                    }
                });
            }
        };
    })
    .directive('deactivate', function($ionicTabsDelegate,$state,$ionicHistory) {
        return {
            restrict: 'A',
            link: function(scope, element, attributes) {
                scope.$on('$ionicView.afterEnter', function() {

                    $ionicHistory.clearHistory();


                    if (attributes.deactivate == 'true') {
                        var tabs = document.querySelector('.tab-item-active');
                        if (tabs) {
                            tabs.className = 'tab-item';
                        }
                    } else {

                        var tabs = document.querySelectorAll('.tab-nav a');
                        if (tabs) {
                            tabs[$ionicTabsDelegate.selectedIndex()].className = 'tab-item tab-item-active';
                        }
                    }
                })
            }
        };
    })

.directive('mobiDateTimePicker', function() {
        return {
            restrict: 'A',
            link: function($scope, element, attrs) {
                $scope.$on('$stateChangeStart', function() {
                    $(element).mobiscroll('select');

                })

                return $(element).mobiscroll().treelist({
                    theme: 'ios',
                    lang: 'zh',
                    display: 'bottom',
                    fixedWidth: [160, 160, 160],
                    labels: ['省', '市', '区']
                });
            }
        };
    })
    .directive('mobiSelect', function() {
        return {
            restrict: 'A',
            link: function($scope, element, attrs) {
                return $(element).mobiscroll().select({
                    theme: 'ios',
                    lang: 'zh',
                    display: 'bottom'
                });
            }
        };
    })

// localstorage
.factory('$localstorage', ['$window', '$rootScope', function($window, $rootScope) {
        return {
            set: function(key, value) {
                $window.localStorage[key + '_' + $rootScope.uid] = value;
            },
            get: function(key, defaultValue) {
                return $window.localStorage[key + '_' + $rootScope.uid] || defaultValue;
            },
            setObject: function(key, value) {
                $window.localStorage[key + '_' + $rootScope.uid] = JSON.stringify(value);
            },
            getObject: function(key) {
                if ($window.localStorage[key + '_' + $rootScope.uid] === undefined) {
                    var result = new Array();
                    return result;
                } else {
                    return JSON.parse($window.localStorage[key + '_' + $rootScope.uid]);
                }
            },
            del: function(key) {
                return $window.localStorage.removeItem(key + '_' + $rootScope.uid);
            }
        }
    }])
    .constant('apiUrl', 'http://uwx.quanqiumiaomiao.com');
