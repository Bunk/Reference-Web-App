'use strict';

var gulp = require('gulp'),
    options = require('./options'),
    wiredep = require('wiredep').stream,
    plugins = require('gulp-load-plugins')({
        lazy: false,
        pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
    }),
    fontFilter = plugins.filter('**/*.{eot,svg,ttf,woff,woff2}'),
    htmlFilter = plugins.filter('*.html'),
    jsFilter = plugins.filter('**/*.js'),
    cssFilter = plugins.filter('**/*.css'),
    opts = {
        html: { empty: true, spare: true, quotes: true, conditionals: true },
        size: { title: options.paths.dist + '/', showFiles: true },
        uglify: { preserveComments: plugins.uglifySaveLicense },
        partials: { starttag: '<!-- inject:partials -->', ignorePath: options.paths.local + '/partials', addRootSlash: false },
        templateCache: { module: options.module, root: 'tmpl-' }
    }

function rootPath(isDist) {
    return (isDist) ? options.paths.dist : options.paths.local;
}

function onError(err) {
    console.log(err);
    this.emit('end');
}

module.exports = {
    html: function() {
        var partialsInjectFile = gulp.src(options.paths.local + '/partials/templateCacheHtml.js', { read: false });
        var assets;

        return gulp.src(options.paths.local + '/*.html')
            .pipe(plugins.inject(partialsInjectFile, opts.partials))
            .pipe(assets = plugins.useref.assets())
            .pipe(plugins.rev())
            .pipe(jsFilter)
            .pipe(plugins.ngAnnotate())
            .pipe(plugins.uglify(opts.uglify)).on('error', options.onerror('Uglify'))
            .pipe(jsFilter.restore())
            .pipe(cssFilter)
            .pipe(plugins.csso())
            .pipe(cssFilter.restore())
            .pipe(assets.restore())
            .pipe(plugins.useref())
            .pipe(plugins.revReplace())
            .pipe(htmlFilter)
            .pipe(plugins.minifyHtml(opts.html))
            .pipe(htmlFilter.restore())
            .pipe(gulp.dest(options.paths.dist + '/'))
            .pipe(plugins.size(opts.size));
    },
    fonts: function() {
        return gulp.src(plugins.mainBowerFiles())
            .pipe(fontFilter)
            .pipe(plugins.flatten())
            .pipe(gulp.dest(options.paths.dist + '/fonts/'));
    },
    other: function () {
        return gulp.src([
            options.root + '/**/*',
            '!' + options.root + '/**/*.{html,css,js,scss}'
        ])
        .pipe(gulp.dest(options.dist + '/'));
    },
    templates: function() {
        return gulp.src(options.paths.app + '/**/*.html')
            .pipe(plugins.minifyHtml(opts.html))
            .pipe(plugins.angularTemplatecache('templateCacheHtml.js', opts.templateCache))
            .pipe(gulp.dest(options.paths.local + '/partials/'));
    }
}
