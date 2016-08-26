var m1 = angular.module('my-app',['mymodule']);
		m1.factory('service',function(){
			return {
				name:'ly'
			}
		});
		m1.controller('aaBb',['$scope','service',function($scope,service){
			// $scope.a = 1;
			$scope.arr = [1,3,4];
			$scope.$watch('arr',function(){
				console.log(1)
			},true);
			$scope.do = function(){
				$scope.arr.push(5);
			};
			$scope.name = service.name

		}]);