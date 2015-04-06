var gulp = require('gulp');
var browserSync = require('browser-sync');

// this task utilizes the browsersync plugin
// to create a dev server instance
// at http://localhost:8080
gulp.task('serve:local', ['build:local'], function(done) {
    browserSync({
        open: true,
        port: 8080,
        server: {
            baseDir: './build',
            index: 'index.html',
            middleware: [
                function (req, res, next) {
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    next();
                }
            ]
        }
    }, done);
});

gulp.task('serve:dist', ['build:dist'], function(done) {
    browserSync({
        open: true,
        port: 8081,
        server: {
            baseDir: './dist',
            index: 'index.html',
            middleware: [
                function (req, res, next) {
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    next();
                }
            ]
        }
    }, done);
});