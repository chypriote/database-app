var gulp = require('gulp');
var g = require('gulp-load-plugins')({
	pattern: ['gulp-*', 'gulp.*'],
	replaceString: /\bgulp[\-.]/
});
var runSequence = require('run-sequence'),
		clean = require('del'),
		browserSync = require('browser-sync'),
		browserify = require('browserify'),
		buffer = require('vinyl-buffer'),
		source = require('vinyl-source-stream'),
		ngAnnotate = require('gulp-ng-annotate');

gulp.task('jade', function () {
	gulp.src(['src/views/**/*.jade'])
		.pipe(g.plumber({
			errorHandler: function (error) {console.log(error.message);this.emit('end');}
		}))
		.pipe(g.jade({pretty:true}))
		.pipe(gulp.dest('public/partials/'))
		.pipe(browserSync.reload({stream:true}));
});

gulp.task('styles', function () {
	gulp.src(['src/less/main.less'])
		.pipe(g.plumber({
			errorHandler: function (error) {console.log(error.message);this.emit('end');}
		}))
		.pipe(g.recess())
		.pipe(g.recess.reporter())
		.pipe(g.less())
		.pipe(g.autoprefixer('last 2 versions'))
		.pipe(g.rename({suffix: '.min'}))
		.pipe(g.cssnano())
		.pipe(gulp.dest('public/css/'))
		.pipe(browserSync.reload({stream:true}));
});

gulp.task('lint', function () {
	gulp.src(['src/js/**/*.js'])
		.pipe(g.plumber({
			errorHandler: function (error) {console.log(error.message);this.emit('end');}
		}))
		.pipe(g.xo());
});
gulp.task('browserify', ['lint'], function () {
	return browserify({
		entries: 'src/js/app.js',
		debug: true
	})
	.bundle()
	.on('error', function (err) {
		console.log(err.toString());this.emit("end");
	})
	.pipe(source('app.js'))
	.pipe(g.plumber({
		errorHandler: function (error) {console.log(error.message);this.emit('end');}
	}))
	.pipe(buffer())
	.pipe(gulp.dest('public/js/'));
});
gulp.task('scripts', ['browserify'], function() {
	gulp.src('public/js/app.js')
		.pipe(g.plumber({
			errorHandler: function (error) {console.log(error.message);this.emit('end');}
		}))
		.pipe(g.rename({suffix: '.min'}))
		.pipe(ngAnnotate())
		.pipe(g.uglify())
		.pipe(gulp.dest('public/js/'))
		.pipe(browserSync.reload({stream:true}));
	clean('public/js/app.js');
});

gulp.task('copy', function () {
	gulp.src(['src/fonts/*'])
		.pipe(g.changed('public/fonts/*'))
		.pipe(gulp.dest('public/fonts'));
	gulp.src(['src/img/**/*'])
		.pipe(gulp.dest('public/img'));
	gulp.src(['src/.htaccess', 'src/index.php', 'src/robots.txt'])
		.pipe(g.changed('public/'))
		.pipe(gulp.dest('public/'));
	gulp.src(['src/css/**/*.css'])
		.pipe(g.changed('public/css'))
		.pipe(gulp.dest('public/css'))
		.pipe(browserSync.reload({stream:true}));
});


gulp.task('clean', function () {
	clean(['public/**/*', '!public']);
});

gulp.task('build', function () {
	runSequence(['styles', 'scripts', 'jade', 'copy']);
});

gulp.task('reload', function () {
	browserSync.reload();
});

gulp.task('serve', function () {
	browserSync({
		proxy: "site.dev",
		online: false,
		port: 8788
  });
});

gulp.task('watch', function () {
	gulp.watch('src/less/**/*.less', ['styles']);
	gulp.watch('src/layout/**/*.jade', ['jade']);
	gulp.watch('src/views/**/*.jade', ['jade']);
	gulp.watch('src/js/**/*.js', ['scripts']);
	gulp.watch(['src/fonts/**/*', 'src/img/**/*', 'src/css/**/*'], ['copy']);
});

gulp.task('default', ['build', 'serve', 'watch'], function () {
});
