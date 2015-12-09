requirejs.config({
  baseUrl: 'script',
  paths: {
    app: 'app',
    lib: 'lib',
    jquery:'lib/jquery-1.10.2'
  }
});
define(['jquery','app/m1','app/m2'],function(a,b){//模块id后面不能加后缀，加了报错
	console.log(a);
	// console.log(b);
});