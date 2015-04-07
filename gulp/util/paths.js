var path = require('path');

var appRoot = 'src/';

module.exports = {
    root: appRoot,
    js: {
        vendor: [
            appRoot + 'vendor/**/*.js',
            'bower_components/**/*.js'
        ],
        app: appRoot + 'app/**/*.js'
    },
    maps: 'sourcemaps/',
    html: [ appRoot + '**/*.html' ],
    style: [
        appRoot + 'content/**/*.scss',
        appRoot + 'content/**/*.css',
        appRoot + 'app/**/*.scss',
        appRoot + 'app/**/*.css',
        'bower_components/**/*.scss',
        'bower_components/**/*.css'
    ],
    dist: 'dist/',
    local: 'local/',
    doc: 'doc/',
    e2eSrc: 'test/e2e/src/*.js',
    e2eDist: 'test/e2e/dist/'
};
