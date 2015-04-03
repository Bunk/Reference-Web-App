var gulp = require('gulp'),
    paths = require('../paths'),
    compilerOptions = require('../babel-options'),
    runSequence = require('run-sequence'),
    series = require('stream-series'),
    changed = require('gulp-changed'),
    plumber = require('gulp-plumber'),  // https://www.npmjs.com/package/gulp-plumber
    sass = require('gulp-sass'),
    inject = require('gulp-inject');

// copies changed html files to the local directory
gulp.task('local-html', function () {
    var scss = gulp.src([ paths.local + '/css/**/*.css' ], {read: false}),
      vendorJs = gulp.src([ paths.local + '/scripts/vendor/**/*.js', 'bower-components/**/*.js' ], {read: false}),
      appJs = gulp.src([ paths.local + '/scripts/app/**/*.js' ], {read: false});

    return gulp.src(paths.html)
      .pipe(inject(
        series(scss, vendorJs, appJs),
        {ignorePath: paths.local}
      ))
      .pipe(minifyHtml({ empty: true }))
      .pipe(gulp.dest(paths.local));
});

gulp.task('local-sass', function () {
    return gulp.src(paths.style)
        .pipe(plumber())
        .pipe(changed(paths.local, {extension: '.css'}))
        .pipe(sass())
        .pipe(gulp.dest(paths.local + '/css'));
});

gulp.task('local-app-js', function () {
    return gulp.src(paths.js.app)
        .pipe(plumber())
        .pipe(changed(paths.local))
        .pipe(gulp.dest(paths.local + '/scripts'));
});

gulp.task('local-vendor-js', function () {
    var streams = [];
    paths.js.vendor.forEach(function (glob) {
        var stream = gulp.src(glob);
        streams.push(stream);
    });
    return series(streams)
        .pipe(plumber())
        .pipe(changed(paths.local))
        .pipe(gulp.dest(paths.local + '/scripts'));
});

// this task calls the clean task (located
// in ./clean.js), then runs the js and css tasks in parallel
// then it hooks up the html with the compiled js and css.
// https://www.npmjs.com/package/gulp-run-sequence
gulp.task('local-build', function(callback) {
    return runSequence(
        'clean',
        ['local-app-js', 'local-vendor-js', 'local-sass'],
        'local-html',
        callback
    );
});
