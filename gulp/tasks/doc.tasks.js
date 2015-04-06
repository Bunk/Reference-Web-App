var gulp = require('gulp'),
    paths = require('../util/paths'),
    plugins = require('gulp-load-plugins')({lazy: true});

gulp.task('gen-doc', function(){
  return gulp.src(paths.js.app)
    .pipe(plugins.plumber())
    .pipe(plugins.yuidoc.parser(null, 'api.json'))
    .pipe(gulp.dest(paths.doc));
});
