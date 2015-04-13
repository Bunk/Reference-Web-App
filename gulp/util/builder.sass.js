(function() {
    'use strict';

    var gulp = require('gulp'),
        options = require('./options'),
        plugins = require('gulp-load-plugins')({
            lazy: false, pattern: ['gulp-*', 'uglify-save-license', 'del']
        });

    function rootPath(isDist) {
        return (isDist) ? options.paths.dist : options.paths.local;
    }

    function onError(err) {
        console.log(err);
        this.emit('end');
    }

    module.exports = {
        sass: function (isDist) {
            var dest = rootPath(isDist);

            var pipeline = gulp.src(options.paths.root + '**/*.{scss,sass,css}')
                .pipe(plugins.plumber(onError))
                .pipe(plugins.sass());

            if (isDist) {
                pipeline = pipeline
                    .pipe(plugins.sourcemaps.init())
                    .pipe(plugins.csso())
                    .pipe(plugins.rev())
                    .pipe(plugins.sourcemaps.write(options.paths.maps));
            }

            pipeline = pipeline.pipe(gulp.dest(dest));

            return pipeline;
        }
    };
})();
