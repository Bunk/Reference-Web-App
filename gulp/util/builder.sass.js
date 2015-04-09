'use strict';

var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    plugins = require('gulp-load-plugins')({ lazy: false }),
    options = require('./options'),
    wiredep = require('wiredep').stream,
    mainBowerFiles = require('main-bower-files');

var scssFilter = plugins.filter('**/.{scss,css}');

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
        var pipeline = gulp.src(mainBowerFiles().concat(options.paths.style))
            .pipe(plugins.plumber(onError))
            .pipe(plugins.changed(dest, {extension: '.css'}))
            .pipe(scssFilter)
            .pipe(plugins.sass());
        if (isDist) {
            pipeline = pipeline
                .pipe(plugins.sourcemaps.init())
                .pipe(plugins.minifyCss())
                .pipe(plugins.rev())
                .pipe(plugins.sourcemaps.write(options.paths.maps));
        }
        return pipeline.pipe(gulp.dest(dest + '/css'));
    }
}
