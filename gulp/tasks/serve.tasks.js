(function() {
    'use strict';

    var gulp = require('gulp'),
        options = require('../util/options'),
        browserSync = require('browser-sync');

    gulp.task('serve', ['build'], function(done) {
        browserSync({
            open: true,
            port: options.browserPorts.local,
            server: {
                baseDir: options.paths.local,
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
            port: options.browserPorts.dist,
            server: {
                baseDir: options.paths.dist,
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
})();
