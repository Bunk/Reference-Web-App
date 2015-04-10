(function() {
    'use strict';

    var gulp = require('gulp'),
        plugins = require('gulp-load-plugins')({
            lazy: false, pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
        }),
        options = require('./options'),
        mainBowerFiles = require('main-bower-files');

    function rootPath(isDist) {
        return (isDist) ? options.paths.dist : options.paths.local;
    }

    function onError(err) {
        console.log(err);
        this.emit('end');
    }

    module.exports = {
        sass: function (isDist) {
            var dest = rootPath(isDist),
                scssFilter = plugins.filter('**/*.{scss,css}');
            
            var pipeline = gulp.src(mainBowerFiles().concat(options.paths.style))
                .pipe(plugins.plumber(onError))
                .pipe(scssFilter)
                .pipe(plugins.sass());
            if (isDist) {
                pipeline = pipeline
                    .pipe(plugins.sourcemaps.init())
                    .pipe(plugins.csso())
                    .pipe(plugins.rev())
                    .pipe(plugins.sourcemaps.write(options.paths.maps));
            }
            pipeline = pipeline.pipe(gulp.dest(dest + '/css'));

            return pipeline;
        }
    };
})();
