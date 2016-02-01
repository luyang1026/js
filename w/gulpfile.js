//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'), //本地安装gulp所用到的地方
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    cssver = require('gulp-make-css-url-version'),
    ngmin = require('gulp-ngmin'),
    stripDebug = require('gulp-strip-debug'),
    order = require('gulp-order'),
    livereload = require('gulp-livereload');

gulp.task('concatCss', function () {
    gulp.src(['lib/ionic/css/ionic.min.css', 'css/*.css', 'lib/mobiscroll/mobiscroll.custom-2.16.1.min.css'])
        .pipe(concat('all.min.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css/'))
        .pipe(livereload())
})

gulp.task('concatControllers', function () {
    gulp.src('js/controllers/*.js')
        .pipe(order(['js/controllers/index.js', 'js/controllers/*.js'], {base: '.'}))
        .pipe(ngmin({dynamic: false}))
        //.pipe(stripDebug())
        .pipe(uglify({outSourceMap: false}))
        .pipe(concat('controllers.js'))
        .pipe(gulp.dest('js/'))
        .pipe(livereload());
})


gulp.task('concatServices', function () {
    gulp.src('js/services/*.js')
        .pipe(order(['js/services/index.js', 'js/services/*.js'], {base: '.'}))
        .pipe(ngmin({dynamic: false}))
        .pipe(uglify({outSourceMap: false}))
        .pipe(concat('services.js'))
        .pipe(gulp.dest('js/'))
        .pipe(livereload());
})

gulp.task('reloadCss', function () {
    gulp.src('css/*.css')
        .pipe(livereload());
})

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch('css/*.css', ['reloadCss']);
    gulp.watch('js/controllers/*.js', ['concatControllers']);
    gulp.watch('js/services/*.js', ['concatServices']);
});

gulp.task('minjs',function(){
    gulp.src(['lib/jquery-2.1.1.min.js','lib/mobiscroll/mobiscroll.custom-2.16.1.min.js','lib/ionic/js/ionic.bundle.min.js','lib/ionic/js/angular/angular-cookies.min.js','dist/app.min.js','js/controllers.js','js/services.js'])
    .pipe(order(['lib/jquery-2.1.1.min.js','lib/mobiscroll/mobiscroll.custom-2.16.1.min.js','lib/ionic/js/ionic.bundle.min.js','lib/ionic/js/angular/angular-cookies.min.js','dist/app.min.js','js/controllers.js','js/services.js'],{base:'.'}))    .pipe(concat('all.min.js'))
    .pipe(concat('miaomiao.js'))
    .pipe(gulp.dest('dist/'));
})

gulp.task('mincss',function(){
    gulp.src(['lib/ionic/css/ionic.min.css','css/style.css','css/base.css','lib/mobiscroll/mobiscroll.custom-2.16.1.min.css'])
    .pipe(order(['lib/ionic/css/ionic.min.css','css/style.css','css/base.css','lib/mobiscroll/mobiscroll.custom-2.16.1.min.css'],{base:'.'}))
    .pipe(minifyCss())
    .pipe(concat('miaomiao.css'))
    .pipe(gulp.dest('dist/'))
})


gulp.task('default', ['watch', 'concatControllers', 'concatServices']);
//定义默认任务

//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组)
//gulp.dest(path[, options]) 处理完后文件生成路径