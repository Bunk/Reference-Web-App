'use strict';

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    path = require('path'),
    srcRoot = 'src/',
    bowerRoot = 'bower_components/',
    bowerJson = './bower.json',
    appRoot = srcRoot + 'app/',
    mapsRoot = 'sourcemaps/';

module.exports = {
    module: 'Reference-Web-App',
    paths: {
        root: srcRoot,
        app: appRoot,
        bower: bowerRoot,
        bowerJson: bowerJson,
        maps: mapsRoot,
        index: srcRoot + 'index.html',
        images: [
            srcRoot + 'content/**/*.{gif,jgp,png}'
        ],
        fonts: [
            bowerRoot + 'fontawesome/fonts/*.*'
        ],
        style: [
            bowerRoot + 'angular/**/angular-csp.css',
            srcRoot + 'content/**/*.scss',
            appRoot + '**/*.scss'
        ],
        dist: 'dist',
        local: 'local',
        doc: 'doc',
        e2e: 'e2e',
        e2eSrc: 'test/e2e/src/*.js',
        e2eDist: 'test/e2e/dist'
    },
    onerror: function(title) {
        return function(err) {
            gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
            this.emit('end');
        };
    },
    wiredep: {
        directory: 'bower_components',
        exclude: [/foundation\.js/, /foundation\.css/]
    }
};
