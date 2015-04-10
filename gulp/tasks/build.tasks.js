(function() {
    'use strict';

    var gulp = require('gulp'),
        build = require('../util/build'),
        utilities = require('../util/utilities'),
        htmlBuilder = require('../util/builder.html'),
        scriptBuilder = require('../util/builder.script'),
        sassBuilder = require('../util/builder.sass');

    // TASK RUNNERS
    gulp.task('default', ['run']);

    gulp.task('run', ['watch']);
    gulp.task('run:dist', ['watch:dist']);

    gulp.task('js', ['app.js','vendor.js']);
    gulp.task('js:dist', ['app.js:dist','vendor.js:dist']);

    gulp.task('watch', ['serve'],           function() { return utilities.watch('build'); });
    gulp.task('watch:dist', ['serve:dist'], function() { return utilities.watch('build:dist'); });

    // PROJECT BUILDERS
    gulp.task('build',          function(cb) { return build.build(false, cb); });
    gulp.task('build:dist',     function(cb) { return build.build(true, cb); });

    // SCRIPT BUILDERS
    gulp.task('app.js',         function() { return scriptBuilder.app(false); });
    gulp.task('app.js:dist',    function() { return scriptBuilder.app(true); });
    gulp.task('vendor.js',      function() { return scriptBuilder.vendor(false); });
    gulp.task('vendor.js:dist', function() { return scriptBuilder.vendor(true); });

    // STYLES BUILDERS
    gulp.task('sass',           function() { return sassBuilder.sass(false); });
    gulp.task('sass:dist',      function() { return sassBuilder.sass(true); });

    // VIEW BUILDERS
    gulp.task('fonts',          function() { return htmlBuilder.fonts(false); });
    gulp.task('fonts:dist',     function() { return htmlBuilder.fonts(true); });
    gulp.task('html',           function() { return htmlBuilder.html(false); });
    gulp.task('html:dist',      function() { return htmlBuilder.html(true); });
    gulp.task('templates',      function() { return htmlBuilder.templates(false); });
    gulp.task('templates:dist', function() { return htmlBuilder.templates(true); });

    // UTILITIES
    gulp.task('clean',          function() { return utilities.clean(); });
})();
