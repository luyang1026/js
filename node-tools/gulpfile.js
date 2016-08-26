var fs = require('fs');
var out = process.stdout;

var gulp = require('gulp');
var util = require('gulp-util');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
gulp.task('lala',function(){
	console.log(333);
});

gulp.task('uglify',function(){
	return gulp.src('src/*.js')
	.pipe(uglify({
		'preserveComments':'all'
	}))
	.pipe(gulp.dest('dist'))
});

gulp.task('lint',function(){
	return gulp.src('src/*.js')
	.pipe(jshint())
	.pipe(jshint.reporter('reporter'))
})