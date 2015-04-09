var gulp = require('gulp'),
    options = require('../util/options'),
    plugins = require('gulp-load-plugins')({lazy: true}),
    del = require('del'),
    vinylPaths = require('vinyl-paths');

// deletes all files in the output path
gulp.task('clean', function() {
    return gulp.src([options.paths.dist, options.paths.local, options.paths.doc])
        .pipe(plugins.plumber())
        .pipe(vinylPaths(del));
});
