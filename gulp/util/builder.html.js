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
            templateCache: {
                module: options.module,
                root: 'templates',
                templateHeader: '(function() {"use strict";angular.module("<%= module %>"<%= standalone %>).run(["$templateCache", function($templateCache) {',
                templateFooter: '}]);})();'
            }
        };

    function rootPath(isDist) {
        return (isDist) ? options.paths.dist : options.paths.local;
    }

    module.exports = {
        html: function(isDist) {
            var dest = rootPath(isDist),
            injects = gulp.src([dest + '**/*.js', dest + '**/*.css'], {read: false}),
            index = options.paths.app + '*.html';

            var pipeline = gulp.src(index)
                .pipe(plugins.inject(injects, {ignorePath: dest}));
            if(isDist) {
                pipeline = pipeline.pipe(plugins.minifyHtml(opts.html));
            }
            pipeline = pipeline.pipe(gulp.dest(dest))
                .pipe(plugins.size({ title: dest, showFiles: true }));
            return pipeline;
        },
        fonts: function(isDist) {
            var fontFilter = plugins.filter('**/*.{eot,svg,ttf,woff,woff2}'),
                dest = rootPath(isDist);
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
            var pipeline = gulp.src(options.paths.app + '**/!(index)*.html');
            if(isDist) {
                pipeline = pipeline.pipe(plugins.minifyHtml(opts.html));
            }
            pipeline = pipeline
                .pipe(plugins.angularTemplatecache('templateCacheHtml.js', opts.templateCache))
                .pipe(gulp.dest(dest + 'scripts/templates/'));
            return pipeline;
        }
    };
})();
