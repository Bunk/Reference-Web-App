var gulp = require('gulp'),
    paths = require('../paths'),
    runSequence = require('run-sequence'),
    series = require('stream-series'),
    changed = require('gulp-changed'),
    plumber = require('gulp-plumber'),  // https://www.npmjs.com/package/gulp-plumber
    sass = require('gulp-sass'),
    minifyCss = require('gulp-minify-css'),
    minifyHtml = require('gulp-minify-html'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rev = require('gulp-rev'),
    sourcemaps = require('gulp-sourcemaps'),
    inject = require('gulp-inject');

// copies changed html files to the output directory
gulp.task('dist-html', function () {
    var vendorScss = gulp.src([ paths.output + '/css/normalize-*.css', paths.output + '/css/foundation-*.css' ], {read: false}),
      appScss = gulp.src([ paths.output + '/css/main-*.css' ], {read: false}),
      vendorJs = gulp.src([ paths.output + '/scripts/vendor-*.js' ], {read: false}),
      appJs = gulp.src([ paths.output + '/scripts/app-*.js' ], {read: false});

    return gulp.src(paths.html)
        .pipe(inject(
            series(vendorScss, appScss, vendorJs, appJs),
            { ignorePath: paths.output }
        ))
        .pipe(minifyHtml({ empty: true }))
        .pipe(gulp.dest(paths.output));
});

// compiles sass files to the output directory
gulp.task('dist-sass', function () {
    return gulp.src(paths.style)
        .pipe(plumber())
        .pipe(changed(paths.output, {extension: '.css'}))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(minifyCss())
        .pipe(rev())
        .pipe(sourcemaps.write(paths.maps))
        .pipe(gulp.dest(paths.output + '/css'));
});

// transpiles changed es6 files to SystemJS format
gulp.task('dist-app-js', function () {
    return gulp.src(paths.js.app)
        .pipe(plumber())
        .pipe(changed(paths.output))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat('app.js', {newLine: ';'}))
        .pipe(rev())
        .pipe(sourcemaps.write(paths.maps))
        .pipe(gulp.dest(paths.output + '/scripts'));
});

gulp.task('dist-vendor-js', function () {
    var streams = [];
    paths.js.vendor.forEach(function (glob) {
        var stream = gulp.src(glob);
        streams.push(stream);
    });
    return series(streams)
        .pipe(plumber())
        .pipe(changed(paths.output))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat('vendor.js', {newLine: ';'}))
        .pipe(rev())
        .pipe(sourcemaps.write(paths.maps))
        .pipe(gulp.dest(paths.output + '/scripts'));
});

// this task calls the clean task (located
// in ./clean.js), then runs the js and css tasks in parallel
// then it hooks up the html with the compiled js and css.
// https://www.npmjs.com/package/gulp-run-sequence
gulp.task('dist-build', function(callback) {
    return runSequence(
        'clean',
        ['dist-app-js', 'dist-vendor-js', 'dist-sass'],
        'dist-html',
        callback
    );
});
