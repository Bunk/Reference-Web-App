(function() {
    'use strict';

    var gutil = require('gulp-util'),
        srcRoot = 'src/',
        appRoot = srcRoot + 'app/',
        assetRoot = srcRoot + 'assets/',
        bowerRoot = 'bower_components/',
        bowerJson = './bower.json',
        mapsRoot = 'sourcemaps/';

    module.exports = {
        module: 'app',
        browserPorts: {
            local: 8080,
            dist: 8081
        },
        paths: {
            root: srcRoot,
            app: appRoot,
            assets: assetRoot,
            bower: bowerRoot,
            bowerJson: bowerJson,
            maps: mapsRoot,
            images: [
                assetRoot + '**/*.{gif,jgp,png}'
            ],
            fonts: [
                bowerRoot + '**/*.{eot,svg,ttf,woff,woff2}',
                srcRoot + '**/*.{eot,svg,ttf,woff,woff2}'
            ],
            style: [
                assetRoot + '**/*.{scss,sass,css}',
                appRoot + '**/*.{scss,sass,css}'
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
