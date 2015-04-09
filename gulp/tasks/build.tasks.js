var gulp = require('gulp'),
    build = require('../util/build'),
    htmlBuilder = require('../util/builder.html'),
    scriptBuilder = require('../util/builder.script'),
    sassBuilder = require('../util/builder.sass');

gulp.task('default', ['run'])

gulp.task('run', ['watch']);
gulp.task('run:dist', ['watch:dist']);

gulp.task('js', ['app.js','vendor.js']);
gulp.task('js:dist', ['app.js:dist','vendor.js:dist']);

gulp.task('build',          function (cb) { return build.build(false, cb); });
gulp.task('build:dist',     function (cb) { return build.build(true, cb); });

gulp.task('app.js',         function () { return scriptBuilder.app(false); });
gulp.task('app.js:dist',    function () { return scriptBuilder.app(true); });

gulp.task('html',           function () { return htmlBuilder.html(false); });
gulp.task('html:dist',      function () { return htmlBuilder.html(true); });

gulp.task('sass',           function () { return sassBuilder.sass(false); });
gulp.task('sass:dist',      function () { return sassBuilder.sass(true); });

gulp.task('vendor.js',      function () { return scriptBuilder.vendor(false); });
gulp.task('vendor.js:dist', function () { return scriptBuilder.vendor(true); });
