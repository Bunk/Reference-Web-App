var gulp = require('gulp'),
    paths = require('./paths'),
    series = require('stream-series'),
    plugins = require('gulp-load-plugins')({lazy: true});

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
    js: {
        vendor: function (isDist) {
            var dest = rootPath(isDist),
                streams = [];
            paths.js.vendor.forEach(function (glob) {
                var stream = gulp.src(glob);
                streams.push(stream);
            });
            var pipeline = series(streams)
                .pipe(plugins.plumber(onError))
                .pipe(plugins.changed(dest))
                .pipe(plugins.sourcemaps.init());
            if (isDist) {
                pipeline = pipeline
                    .pipe(plugins.uglify())
                    .pipe(plugins.concat('vendor.js', {newLine: ';'}))
                    .pipe(plugins.rev());
            }
            pipeline = pipeline
                .pipe(plugins.sourcemaps.write(paths.maps))
                .pipe(gulp.dest(dest + '/scripts'));
            return pipeline;
        },
        app: function (isDist) {
            var dest = rootPath(isDist);
            var pipeline = gulp.src(paths.js.app)
                .pipe(plugins.plumber(onError))
                .pipe(plugins.changed(dest))
                .pipe(plugins.sourcemaps.init());
            if (isDist) {
                pipeline = pipeline
                    .pipe(plugins.ngAnnotate())
                    .pipe(plugins.uglify())
                    .pipe(plugins.concat('app.js', {newLine: ';'}))
                    .pipe(plugins.rev())
            }
            pipeline = pipeline
                .pipe(plugins.sourcemaps.write(paths.maps))
                .pipe(gulp.dest(dest + '/scripts'));
        }
    },
    sass: function (isDist) {
        var dest = rootPath(isDist);
        var pipeline = gulp.src(paths.style)
            .pipe(plugins.plumber(onError))
            .pipe(plugins.changed(dest, {extension: '.css'}))
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.sass());
        if (isDist) {
            pipeline = pipeline
                .pipe(plugins.minifyCss())
                .pipe(plugins.rev());
        }
        pipeline = pipeline
            .pipe(plugins.sourcemaps.write(paths.maps))
            .pipe(gulp.dest(dest + '/css'));
        return pipeline;
    },
    html: function (isDist) {
        var srcOps = {read: false},
            dest = rootPath(isDist),
            injection;
        if (isDist) {
            injection = plugins.inject(series(
                gulp.src([
                    paths.dist + '/css/normalize-*.css',
                    paths.dist + '/css/foundation-*.css'
                ], srcOps),
                gulp.src([ paths.dist + '/css/main-*.css' ], srcOps),
                gulp.src([ paths.dist + '/scripts/vendor-*.js' ], srcOps),
                gulp.src([ paths.dist + '/scripts/app-*.js' ], srcOps)
            ), { ignorePath: dest })
        } else {
            injection = plugins.inject(series(
                gulp.src([ paths.local + '/css/**/*.css' ], srcOps),
                gulp.src([ paths.local + '/scripts/**/*.js' ], srcOps),
                gulp.src([ paths.local + '/scripts/app/**/*.js' ], srcOps)
            ), {ignorePath: dest})
        }
        var pipeline = gulp.src(paths.html)
            .pipe(plugins.plumber(onError))
            .pipe(injection);
        if (isDist) {
            pipeline = pipeline.pipe(plugins.minifyHtml({ empty: true }));
        }
        pipeline = pipeline.pipe(gulp.dest(dest));
        return pipeline;
    }
}
