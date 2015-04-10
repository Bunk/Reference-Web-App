(function() {
    'use strict';

    var gulp = require('gulp'),
        options = require('./options'),
        plugins = require('gulp-load-plugins')({
            lazy: false, pattern: ['gulp-*', 'browser-sync', 'main-bower-files', 'uglify-save-license', 'del']
        }),
        del = require('del'),
        vinylPaths = require('vinyl-paths');

    function reportChange(event) {
        console.log(event.path + ' was ' + event.type + '. Re-building...');
    }

    module.exports = {
        clean: function () {
            return gulp.src([options.paths.dist, options.paths.local, options.paths.doc])
                .pipe(plugins.plumber())
                .pipe(vinylPaths(del));
        },
        watch: function (mode) {
            var app = options.paths.app,
                content = options.paths.root + 'content/';

            gulp.watch(app + '**/*.html',       ['build' + mode]).on('change', reportChange);
            gulp.watch(app + '**/*.js',         ['build' + mode]).on('change', reportChange);
            gulp.watch(content + '**/*.scss',   ['build' + mode]).on('change', reportChange);
            // gulp.watch(options.paths.js.app,    [buildTask, plugins.browserSync.reload]).on('change', reportChange);
            // gulp.watch(options.paths.js.vendor, [buildTask, plugins.browserSync.reload]).on('change', reportChange);
            // gulp.watch(options.paths.html,      [buildTask, plugins.browserSync.reload]).on('change', reportChange);
            // gulp.watch(options.paths.style,     [buildTask, plugins.browserSync.reload]).on('change', reportChange);
        }
    };
})();
