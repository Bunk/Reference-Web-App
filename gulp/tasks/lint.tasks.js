var gulp = require('gulp'),
    paths = require('../util/paths'),
    plugins = require('gulp-load-plugins')({lazy: true});

// runs jshint on all .js files
gulp.task('lint', function() {
  return gulp.src(paths.js.app)
    .pipe(plugins.plumber())
    .pipe(plugins.jshint('.jshintrc'))
    .pipe(plugins.jshint.reporter('jshint-stylish'));
});
