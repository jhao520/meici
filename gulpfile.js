var gulp = require('gulp');

// sass编译css
var sass = require('gulp-sass');
gulp.task('compileSass',function(){
	// 设置路径
	gulp.src('./src/sass/*.scss')

	// 编译sass
	.pipe(sass({outputStyle:'compact'}))

	// 输出css文件到文件夹
	.pipe(gulp.dest('./src/css'));
});

/*gulp.task('jtSass',function(){
	gulp.watch('./src/sass/*.scss',['compileSass']);
});*/

// 浏览器同步插件
var beowserSync = require('browser-sync');
gulp.task('server',function(){
	beowserSync({
		// 设置服务器路径
		server:'./src',

		// 监听文件修改，自动刷新
		files:['./src/**/*.html','./src/css/*.css','./src/js/*.js','./src/**/*.php']
	});

	// 监听sass修改
	gulp.watch('./src/sass/*.scss',['compileSass']);
});