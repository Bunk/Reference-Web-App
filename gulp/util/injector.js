'use strict';

var gulp = require('gulp'),
    runSequence = require('run-sequence')
    plugins = require('gulp-load-plugins')({ lazy: false }),
    wiredep = require('wiredep').stream;
    mainBowerFiles = require('main-bower-files');

var jsFilter = plugins.filter('**/*.js'),
    cssFilter = plugins.filter('**/.{scss,css}'),
    htmlFilter = plugins.filter('**/.{html,htm}'),
    fontFilter = plugins.filter('**/.{eot,svg,ttf,woff}');

function rootPath(isDist) {
    return (isDist) ? paths.dist : paths.local;
}

function onError(err) {
    console.log(err);
    this.emit('end');
}

module.exports = {
    error: function (err) {
        onError(err);
    },
    build: function (isDist, callback) {
        var mode = (isDist) ? ':dist' : '';
        return runSequence(
            'clean',
            'lint',
            ['app.js:' + mode, 'vendor.js' + mode, 'sass' + mode],
            'html:' + mode,
            callback
        );
    },
    js: {
        vendor: function (isDist) {
            var dest = rootPath(isDist);
            var pipeline = gulp.src(mainBowerFiles())
                .pipe(plugins.plumber(onError))
                .pipe(plugins.changed(dest))
                .pipe(jsFilter);
            if (isDist) {
                pipeline = pipeline
                    .pipe(plugins.sourcemaps.init())
                    .pipe(plugins.uglify())
                    .pipe(plugins.rev())
                    .pipe(plugins.sourcemaps.write(paths.maps));
            }
            return pipeline.pipe(gulp.dest(dest + '/scripts'));
        },
        app: function (isDist) {
            var dest = rootPath(isDist);
            var pipeline = gulp.src(paths.app)
                .pipe(plugins.plumber(onError))
                .pipe(plugins.changed(dest))
                .pipe(jsFilter);
            if (isDist) {
                pipeline = pipeline
                    .pipe(plugins.sourcemaps.init())
                    .pipe(plugins.ngAnnotate())
                    .pipe(plugins.uglify())
                    .pipe(plugins.rev())
                    .pipe(plugins.sourcemaps.write(paths.maps));
            }
            return pipeline.pipe(gulp.dest(dest + '/scripts'));
        }
    },
    sass: function (isDist) {
        var dest = rootPath(isDist);
        var pipeline = gulp.src(mainBowerFiles().concat(paths.style))
            .pipe(plugins.plumber(onError))
            .pipe(plugins.changed(dest, {extension: '.css'}))
            .pipe(cssFilter)
            .pipe(plugins.sass());
        if (isDist) {
            pipeline = pipeline
                .pipe(plugins.sourcemaps.init())
                .pipe(plugins.minifyCss())
                .pipe(plugins.rev())
                .pipe(plugins.sourcemaps.write(paths.maps));
        }
        return pipeline.pipe(gulp.dest(dest + '/css'));
    },
    html: function (isDist) {
        console.log(plugins);

        var srcOps = {read: false},
            dest = rootPath(isDist),
            assets = plugins.useref.assets();
        var pipeline = gulp.src(paths.index)
            .pipe(plugins.plumber(onError))
            .pipe(plugins.changed(dest))
            .pipe(wiredep());
        if (isDist) {
            pipeline = pipeline.pipe(paths.index)
                .pipe(assets)
                // Transform scripts
                .pipe(jsFilter)
                .pipe(plugins.sourcemaps.init())
                .pipe(plugins.ngAnnotate())
                .pipe(plugins.uglify())
                .pipe(plugins.rev())
                .pipe(plugins.sourcemaps.write(paths.maps))
                .pipe(jsFilter.restore())
                // Transform css/scss
                .pipe(cssFilter)
                .pipe(plugins.sourcemaps.init())
                .pipe(plugins.sass())
                .pipe(plugins.minifyCss())
                .pipe(plugins.rev())
                .pipe(plugins.sourcemaps.write(paths.maps))
                .pipe(cssFilter.restore())
                // Rewrite dependencies
                .pipe(useref.restore())
                .pipe(useref())
                .pipe(plugins.minifyHtml({ empty: true }));
        }
        return pipeline.pipe(gulp.dest(dest));
    }
}
