(function() {
    'use strict';

    var gulp = require('gulp'),
        plugins = require('gulp-load-plugins')({
            lazy: false, pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
        }),
        options = require('./options');

    function rootPath(isDist) {
        return (isDist) ? options.paths.dist : options.paths.local;
    }

    function onError(err) {
        console.log(err);
        this.emit('end');
    }

    module.exports = {
        // Moves app scripts to the dest folder
        app: function (isDist) {
            var dest = rootPath(isDist),
                scripts = [
                    options.paths.app + '**/*.js',
                    '!' + options.paths.app + '**/*.spec.js'
                ];

            var pipeline = gulp.src(scripts)
                .pipe(plugins.plumber(onError))
                .pipe(plugins.changed(dest))
                .pipe(plugins.jshint('.jshintrc'))
                .pipe(plugins.jshint.reporter('jshint-stylish'));

            if (isDist) {
                pipeline = pipeline
                    .pipe(plugins.sourcemaps.init())
                    .pipe(plugins.ngAnnotate())
                    .pipe(plugins.uglify())
                    .pipe(plugins.concat('app.js'))
                    .pipe(plugins.rev())
                    .pipe(plugins.sourcemaps.write(options.paths.maps));
            }

            return pipeline.pipe(gulp.dest(dest + '/app'));
        }
    };
})();
