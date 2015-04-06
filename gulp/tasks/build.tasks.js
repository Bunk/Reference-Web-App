var gulp = require('gulp'),
    paths = require('../util/paths'),
    builders = require('../util/builders');
    runSequence = require('run-sequence');

gulp.task('html:local', function () {
    return builders.html(false);
});

gulp.task('sass:local', function () {
    return builders.sass(false);
});

gulp.task('app.js:local', function () {
    return builders.js.app(false);
});

gulp.task('vendor.js:local', function () {
    return builders.js.vendor(false);
});

gulp.task('build:local', function(callback) {
    return runSequence(
        'clean',
        'lint',
        ['app.js:local', 'vendor.js:local', 'sass:local'],
        'html:local',
        callback
    );
});

gulp.task('run', ['watch:local']);

gulp.task('default', ['run'])
