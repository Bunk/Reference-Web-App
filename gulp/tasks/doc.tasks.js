var gulp = require('gulp'),
    paths = require('../paths'),
    plugins = require('gulp-load-plugins')({lazy: true});

gulp.task('gen-doc', function(){
  return gulp.src(paths.source)
    .pipe(plugins.yuidoc.parser(null, 'api.json'))
    .pipe(gulp.dest(paths.doc));
});
