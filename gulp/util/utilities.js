'use strict';

var gulp = require('gulp'),
    options = require('./options'),
    plugins = require('gulp-load-plugins')({lazy: true}),
    del = require('del'),
    vinylPaths = require('vinyl-paths'),
    runSequence = require('run-sequence');

module.exports = {
    clean: function () {
        return gulp.src([options.paths.dist, options.paths.local, options.paths.doc])
            .pipe(plugins.plumber())
            .pipe(vinylPaths(del));
    },
    watch: function (buildTask) {
        gulp.watch(options.paths.js.app,    [buildTask, browserSync.reload]).on('change', reportChange);
        gulp.watch(options.paths.js.vendor, [buildTask, browserSync.reload]).on('change', reportChange);
        gulp.watch(options.paths.html,      [buildTask, browserSync.reload]).on('change', reportChange);
        gulp.watch(options.paths.style,     [buildTask, browserSync.reload]).on('change', reportChange);
    }
}
