var gulp = require('gulp'),
    options = require('../util/options'),
    plugins = require('gulp-load-plugins')({lazy: true});

// runs jshint on all .js files
gulp.task('lint', function() {
  return gulp.src(options.paths.app + '**/*.js')
    .pipe(plugins.plumber())
    .pipe(plugins.jshint('.jshintrc'))
    .pipe(plugins.jshint.reporter('jshint-stylish'));
});
