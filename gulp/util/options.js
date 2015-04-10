(function() {
    'use strict';

    var gutil = require('gulp-util'),
        srcRoot = 'src/',
        appRoot = srcRoot + 'app/',
        bowerRoot = 'bower_components/',
        bowerJson = './bower.json',
        mapsRoot = 'sourcemaps/';

    module.exports = {
        module: 'Reference-Web-App',
        browserPorts: {
            local: 8080,
            dist: 8081
        },
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
                bowerRoot + 'angular/**/*.css',
                srcRoot + 'content/**/*.scss',
                appRoot + '**/*.scss'
            ],
            dist: '_dist/',
            local: '_local/',
            doc: 'doc/',
            e2e: 'e2e/',
            e2eSrc: 'test/e2e/src/*.js',
            e2eDist: 'test/e2e/dist/'
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
})();
