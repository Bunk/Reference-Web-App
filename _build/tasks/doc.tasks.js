var gulp = require('gulp');
var paths = require('../paths');
var yuidoc = require('gulp-yuidoc');

gulp.task('gen-doc', function(){
  return gulp.src(paths.source)
    .pipe(yuidoc.parser(null, 'api.json'))
    .pipe(gulp.dest(paths.doc));
});
