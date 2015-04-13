(function() {
    'use strict';

    var _ = require('lodash'),
        gulp = require('gulp'),
        options = require('./options'),
        plugins = require('gulp-load-plugins')({
            lazy: false, pattern: ['gulp-*', 'browser-sync', 'main-bower-files', 'uglify-save-license', 'del']
        }),
        del = require('del'),
        vinylPaths = require('vinyl-paths');

    function reportChange(event) {
        var srcPattern = new RegExp('/.*(?=/' + options.paths.root + ')/');
        log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
    }

    function log(msg) {
        var blue = plugins.util.colors.blue;
        if (_.isObject(msg)) {
            _.forOwn(msg, function (value) {
                plugins.util.log(blue(value));
            });
        } else {
            plugins.util.log(blue(msg));
        }
    }

    module.exports = {
        log: log,
        clean: function () {
            return gulp.src([options.paths.dist, options.paths.local, options.paths.doc])
                .pipe(plugins.plumber())
                .pipe(vinylPaths(del));
        },
        watch: function (mode) {
            var root = options.paths.root;

            gulp.watch(root + '**/*.html',  ['build' + mode, plugins.browserSync.reload]).on('change', reportChange);
            gulp.watch(root + '**/*.js',    ['build' + mode, plugins.browserSync.reload]).on('change', reportChange);
            gulp.watch(root + '**/*.scss',  ['build' + mode, plugins.browserSync.reload]).on('change', reportChange);
        }
    };
})();
