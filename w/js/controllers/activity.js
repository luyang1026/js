angular.module('starter.controllers')
.controller('ActivityCtrl', function($scope, $state, ProduceDetail) {
	var produce_ids = $state.params['id'];
	ProduceDetail.baseInfo(produce_ids, function(res) {
		if (res.status == 200) {
			$scope.produceList = res.data;
		}
	});
})