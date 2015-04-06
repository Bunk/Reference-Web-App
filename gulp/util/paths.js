var path = require('path');

var appRoot = 'src/';

module.exports = {
    root: appRoot,
    js: {
        vendor: [
            'bower_components/foundation/js/foundation/foundation.js',
            'bower_components/foundation/js/foundation/foundation.*.js'
        ],
        app: appRoot + '**/*.js'
    },
    maps: 'sourcemaps/',
    html: [ appRoot + '**/*.html' ],
    style: [
        appRoot + 'styles/**/*.scss',
        'bower_components/foundation/scss/**/*.scss'
    ],
    dist: 'dist/',
    local: 'local/',
    doc: 'doc/',
    e2eSrc: 'test/e2e/src/*.js',
    e2eDist: 'test/e2e/dist/'
};
