var gulp = require('gulp'),
    paths = require('../paths'),
    plugins = require('gulp-load-plugins')({lazy: true});

// for full documentation of gulp-protractor,
// please check https://github.com/mllrsohn/gulp-protractor
gulp.task('webdriver_update', plugins.protractor.webdriver_update);

// transpiles files in
// /test/e2e/src/ from es6 to es5
// then copies them to test/e2e/dist/
gulp.task('build-e2e', function () {
  return gulp.src(paths.e2eSrc)
    .pipe(plugins.plumber())
    .pipe(plugins.babel())
    .pipe(gulp.dest(paths.e2eDist));
});

// runs build-e2e task
// then runs end to end tasks
// using Protractor: http://angular.github.io/protractor/
gulp.task('e2e', ['webdriver_update', 'build-e2e'], function(cb) {
  return gulp.src(paths.e2eDist + "/*.js")
    .pipe(plugins.protractor.protractor({
        configFile: "protractor.conf.js",
        args: ['--baseUrl', 'http://127.0.0.1:9000']
    }))
    .on('error', function(e) { throw e; });
});
