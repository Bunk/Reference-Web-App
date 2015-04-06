var gulp = require('gulp'),
    paths = require('../paths'),
    runSequence = require('run-sequence'),
    series = require('stream-series'),
    plugins = require('gulp-load-plugins')({lazy: true});

// copies changed html files to the output directory
gulp.task('html:dist', function () {
    var vendorScss = gulp.src([ paths.output + '/css/normalize-*.css', paths.output + '/css/foundation-*.css' ], {read: false}),
      appScss = gulp.src([ paths.output + '/css/main-*.css' ], {read: false}),
      vendorJs = gulp.src([ paths.output + '/scripts/vendor-*.js' ], {read: false}),
      appJs = gulp.src([ paths.output + '/scripts/app-*.js' ], {read: false});

    return gulp.src(paths.html)
        .pipe(plugins.inject(
            series(vendorScss, appScss, vendorJs, appJs),
            { ignorePath: paths.output }
        ))
        .pipe(plugins.minifyHtml({ empty: true }))
        .pipe(gulp.dest(paths.output));
});

// compiles sass files to the output directory
gulp.task('sass:dist', function () {
    return gulp.src(paths.style)
        .pipe(plugins.plumber())
        .pipe(plugins.changed(paths.output, {extension: '.css'}))
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass())
        .pipe(plugins.minifyCss())
        .pipe(plugins.rev())
        .pipe(plugins.sourcemaps.write(paths.maps))
        .pipe(gulp.dest(paths.output + '/css'));
});

// transpiles changed es6 files to SystemJS format
gulp.task('app.js:dist', function () {
    return gulp.src(paths.js.app)
        .pipe(plugins.plumber())
        .pipe(plugins.changed(paths.output))
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.uglify())
        .pipe(plugins.concat('app.js', {newLine: ';'}))
        .pipe(plugins.rev())
        .pipe(plugins.sourcemaps.write(paths.maps))
        .pipe(gulp.dest(paths.output + '/scripts'));
});

gulp.task('vendor.js:dist', function () {
    var streams = [];
    paths.js.vendor.forEach(function (glob) {
        var stream = gulp.src(glob);
        streams.push(stream);
    });
    return series(streams)
        .pipe(plugins.plumber())
        .pipe(plugins.changed(paths.output))
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.uglify())
        .pipe(plugins.concat('vendor.js', {newLine: ';'}))
        .pipe(plugins.rev())
        .pipe(plugins.sourcemaps.write(paths.maps))
        .pipe(gulp.dest(paths.output + '/scripts'));
});

// this task calls the clean task (located
// in ./clean.js), then runs the js and css tasks in parallel
// then it hooks up the html with the compiled js and css.
// https://www.npmjs.com/package/gulp-run-sequence
gulp.task('build:dist', function(callback) {
    return runSequence(
        'clean',
        ['app.js:dist', 'vendor.js:dist', 'sass:dist'],
        'html:dist',
        callback
    );
});

gulp.task('run:dist', function() {
    return runSequence(
        'watch:dist'
    );
});
