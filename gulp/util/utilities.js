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
                assets = options.paths.assets;

            gulp.watch(app + '**/*.html',       ['build' + mode, plugins.browserSync.reload]).on('change', reportChange);
            gulp.watch(app + '**/*.js',         ['build' + mode, plugins.browserSync.reload]).on('change', reportChange);
            gulp.watch(assets + '**/*.scss',    ['build' + mode, plugins.browserSync.reload]).on('change', reportChange);
        }
    };
})();
