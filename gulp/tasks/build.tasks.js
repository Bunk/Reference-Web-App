var gulp = require('gulp'),
    paths = require('../paths'),
    compilerOptions = require('../babel-options'),
    runSequence = require('run-sequence'),
    series = require('stream-series'),
    plugins = require('gulp-load-plugins')({lazy: true});

// copies changed html files to the local directory
gulp.task('html:local', function () {
    var scss = gulp.src([ paths.local + '/css/**/*.css' ], {read: false}),
      vendorJs = gulp.src([ paths.local + '/scripts/**/*.js' ], {read: false}),
      appJs = gulp.src([ paths.local + '/scripts/app/**/*.js' ], {read: false});
    return gulp.src(paths.html)
      .pipe(plugins.inject(
        series(scss, vendorJs, appJs),
        {ignorePath: paths.local}
      ))
      .pipe(gulp.dest(paths.local));
});

gulp.task('sass:local', function () {
    return gulp.src(paths.style)
        .pipe(plugins.plumber())
        .pipe(plugins.sass())
        .pipe(gulp.dest(paths.local + '/css'));
});

gulp.task('app.js:local', function () {
    return gulp.src(paths.js.app)
        .pipe(plugins.plumber())
        .pipe(plugins.changed(paths.local))
        .pipe(gulp.dest(paths.local + '/scripts'));
});

gulp.task('vendor.js:local', function () {
    var streams = [];
    paths.js.vendor.forEach(function (glob) {
        var stream = gulp.src(glob);
        streams.push(stream);
    });
    return series(streams)
        .pipe(plugins.plumber())
        .pipe(plugins.changed(paths.local))
        .pipe(gulp.dest(paths.local + '/scripts'));
});

gulp.task('build:local', function(callback) {
    return runSequence(
        'clean',
        ['app.js:local', 'vendor.js:local', 'sass:local'],
        'html:local',
        callback
    );
});

gulp.task('run', function() {
    return runSequence(
        'watch:local'
    );
});
