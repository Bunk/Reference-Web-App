var gulp = require('gulp'),
    options = require('../util/options'),
    plugins = require('gulp-load-plugins')({lazy: true});

gulp.task('gen-doc', function(){
  return gulp.src(options.paths.doc)
    .pipe(plugins.plumber())
    .pipe(plugins.yuidoc.parser(null, 'api.json'))
    .pipe(gulp.dest(options.paths.doc));
});
