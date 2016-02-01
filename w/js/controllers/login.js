angular.module('starter.controllers')
// 登录
.controller('LoginCtrl', function($scope , $state , Login){
	$scope.formData = {
		mobile: '',
		password: ''
	}
	$scope.login = function(){
		Login.setLogin($scope.formData.mobile , $scope.formData.password , function(res){
			if(res.status == 200){
				$scope.logindata = res.data;
			}else if(res.status == 400){
				alert(res.error);
			}
		});
	}
})