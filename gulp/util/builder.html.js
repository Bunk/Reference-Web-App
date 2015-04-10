(function() {
    'use strict';

    var gulp = require('gulp'),
        options = require('./options'),
        plugins = require('gulp-load-plugins')({
            lazy: false, pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
        }),
        opts = {
            html: { empty: true, spare: true, quotes: true },
            uglify: { preserveComments: plugins.uglifySaveLicense },
            templateCache: { module: options.module, root: 'tmpl-' }
        };

    var fontFilter = plugins.filter('**/*.{eot,svg,ttf,woff,woff2}');

    function rootPath(isDist) {
        return (isDist) ? options.paths.dist : options.paths.local;
    }

    module.exports = {
        html: function(isDist) {
            var dest = rootPath(isDist),
            index = options.paths.app + '*.html';

            var partialsInjectFile = gulp.src(dest + '/partials/templateCacheHtml.js', { read: false });
            var pipeline = gulp.src(index)
                .pipe(plugins.inject(
                    partialsInjectFile, {
                        starttag: '<!-- inject:partials -->',
                        ignorePath: dest + '/partials',
                        addRootSlash: false
                    }
                ))
                .pipe(plugins.useref())
                .pipe(plugins.revReplace());
            if(isDist) {
                pipeline = pipeline.pipe(plugins.minifyHtml(opts.html));
            }
            pipeline = pipeline.pipe(gulp.dest(dest))
                .pipe(plugins.size({ title: dest, showFiles: true }));
            return pipeline;
        },
        fonts: function(isDist) {
            var dest = rootPath(isDist);
            return gulp.src(plugins.mainBowerFiles())
                .pipe(fontFilter)
                .pipe(plugins.flatten())
                .pipe(gulp.dest(dest + 'fonts/'));
        },
        other: function (isDist) {
            var dest = rootPath(isDist);
            return gulp.src([
                options.root + '**/*',
                '!' + options.root + '**/*.{html,css,js,scss}'
            ])
            .pipe(gulp.dest(dest + '/'));
        },
        templates: function(isDist) {
            var dest = rootPath(isDist);
            return gulp.src(options.paths.app + '**/!(index)*.html')
                .pipe(plugins.minifyHtml(opts.html))
                .pipe(plugins.angularTemplatecache('templateCacheHtml.js', opts.templateCache))
                .pipe(gulp.dest(dest + 'partials/'));
        }
    };
})();
