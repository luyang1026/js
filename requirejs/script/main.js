requirejs.config({
  baseUrl: 'script',
  paths: {
    app: 'app',
    lib: 'lib',
    jquery:'lib/jquery-1.10.2'//jquery是命名模块，引入时必须要用他的名字，
    //所以要写到path这里，相对匿名模块灵活性低
  }
});
define(['jquery','app/m1','app/m2'],function(a,b){//模块id后面不能加后缀，加了报错
	console.log(a);
	// console.log(b);
});