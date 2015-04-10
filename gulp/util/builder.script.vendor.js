(function() {
    'use strict';

    var gulp = require('gulp'),
        plugins = require('gulp-load-plugins')({
            lazy: false, pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
        }),
        mainBowerFiles = require('main-bower-files'),
        options = require('./options');

    function rootPath(isDist) {
        return (isDist) ? options.paths.dist : options.paths.local;
    }

    function onError(err) {
        console.log(err);
        this.emit('end');
    }

    module.exports = {
        vendor: function (isDist) {
            var dest = rootPath(isDist),
                jsFilter = plugins.filter('**/*.js');
            var pipeline = gulp.src(mainBowerFiles())
                .pipe(plugins.plumber(onError))
                .pipe(plugins.changed(dest))
                .pipe(jsFilter);
            if (isDist) {
                pipeline = pipeline
                    .pipe(plugins.sourcemaps.init())
                    .pipe(plugins.uglify())
                    .pipe(plugins.concat('vendor.js'))
                    .pipe(plugins.rev())
                    .pipe(plugins.sourcemaps.write(options.paths.maps));
            }
            return pipeline.pipe(gulp.dest(dest + '/scripts'));
        }
    };
})();
