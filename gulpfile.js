var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	minifyCSS = require('gulp-cssnano'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	karma = require('karma').Server;

gulp.task('sass', function() {
  return gulp.src('./scss/**/*.scss')
  	.pipe(sass().on('error', sass.logError))
	.pipe(sass())
	.pipe(rename('stylesheet.css'))
	.pipe(gulp.dest('./public/'))
	.pipe(browserSync.reload({
	  stream: true
	}))
});

gulp.task('site-js', function() {
	return gulp.src(['js/ng.js', 'js/site.js'])
		.pipe(concat('concat.js'))
		.pipe(gulp.dest('dist/js'))
		.pipe(rename('site.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'))
});

// gulp.task('site-css', function() {
// 	return gulp.src('css/**/*.css')
// 		.pipe(minifyCSS({discardComments: {
// 			removeAll: false
// 		}}))
// 		.pipe(rename({
// 			suffix: ".min"
// 		}))
// 		// .pipe(concat('stylesheet.min.css'))
// 		.pipe(gulp.dest('dist/css'))
// });

gulp.task('watch', ['browserSync', 'sass'],function(){
	gulp.watch('scss/**/*.scss', ['sass']);
	gulp.watch('public/**/*.html', browserSync.reload);
	gulp.watch('public/**/*.js', browserSync.reload);
	// Any other watchers will go here
});

gulp.task('browserSync', function() {
	browserSync({
		server: {
			baseDir: 'public'
		},
	})
});

gulp.task('test', function(done) {
  karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, function() {
        done();
    });
});
