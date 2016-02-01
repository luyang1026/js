angular.module('starter.services')
.factory('Address' , function($http , apiUrl , $rootScope){
  return {
    lists: function( callback){
      $http.post(apiUrl + '/user/address/lists',{version:'wx' , uid : $rootScope.uid})
          .success(function(res){
            callback(res)
          })
    },
    GetAddressById: function(user_addrid , callback){
		$http.post(apiUrl + '/user/address/getaddressbyid',{version:'wx' , uid : $rootScope.uid , user_addrid : user_addrid})
        .success(function(res){
        	callback(res)
        })
	},
	  getDefaultAddress: function(callback){
	    $http.post(apiUrl + '/user/address/getdefault',{version:'wx' , uid : $rootScope.uid})
	        .success(function(res){
	          callback(res)
	        })
	  },
	  setDefaultAddress: function(user_addrid , is_default , callback){
		    $http.post(apiUrl + '/user/address/updatedefault',{version:'wx' , user_addrid : user_addrid , is_default : is_default , uid : $rootScope.uid})
		    .success(function(res){
		    	console.log(res)
		    	callback(res)
		    })
	  },
	  add: function(name,mobile,area,address,callback){
	    $http.post(apiUrl + '/user/address/add',{version:'wx' , uid : $rootScope.uid, name:name, mobile:mobile, address:address, area:area})
	        .success(function(res){
	          callback(res)
	        })
	  },
		edit: function(user_addrid, name,mobile,area,address,callback){
			$http.post(apiUrl + '/user/address/edit',{version:'wx' , uid : $rootScope.uid, user_addrid:user_addrid, name:name, mobile:mobile, address:address, area:area})
	        .success(function(res){
	        	callback(res)
	        })
	  },
	  DeleteAddressById: function(user_addrid,callback){
			$http.post(apiUrl + '/user/address/deleteaddress',{version:'wx' , uid : $rootScope.uid , user_addrid : user_addrid})
	      .success(function(res){
	      	callback(res)
	      })
	  }
	}
})