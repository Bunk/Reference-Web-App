var gulp = require('gulp'),
    paths = require('../util/paths'),
    plugins = require('gulp-load-plugins')({lazy: true}),
    del = require('del'),
    vinylPaths = require('vinyl-paths');

// deletes all files in the output path
gulp.task('clean', function() {
    return gulp.src([paths.dist, paths.local])
        .pipe(plugins.plumber())
        .pipe(vinylPaths(del));
});
