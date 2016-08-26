var wrench = require('wrench'),
	util = require('util');

// wrench.mkdirSyncRecursive('dir',0777);
// wrench.rmdirSyncRecursive('dir');
var r = wrench.readdirSyncRecursive('./Zepto');
r = r.filter(function(){
	return true;
});
console.log(r)