var gulp = require('gulp'),
    paths = require('../util/paths'),
    builders = require('../util/builders');
    runSequence = require('run-sequence');

gulp.task('html:dist', function () {
    return builders.html(true);
});

gulp.task('sass:dist', function () {
    return builders.sass(true);
});

gulp.task('app.js:dist', function () {
    return builders.js.app(true);
});

gulp.task('vendor.js:dist', function () {
    return builders.js.vendor(true);
});

gulp.task('build:dist', function(callback) {
    return runSequence(
        'clean',
        'lint',
        ['app.js:dist', 'vendor.js:dist', 'sass:dist'],
        'html:dist',
        callback
    );
});

gulp.task('run:dist', ['watch:dist']);
