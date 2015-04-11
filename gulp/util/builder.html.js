(function() {
    'use strict';

    var gulp = require('gulp'),
        options = require('./options'),
        plugins = require('gulp-load-plugins')({
            lazy: false,
            pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del', 'event-stream']
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

    var fontFilter = plugins.filter('**/*.{eot,svg,ttf,woff,woff2}');

    function rootPath(isDist) {
        return (isDist) ? options.paths.dist : options.paths.local;
    }

    function destPath(isDist, path) {
        return rootPath(isDist) + path;
    }

    module.exports = {
        html: function(isDist) {
            var dest = rootPath(isDist),
                bowerFiles = gulp.src(plugins.mainBowerFiles(), { read: false }),
                appFiles = plugins.eventStream.merge(
                    // angular js -- will preserve correct ordering
                    // note: need to enable reading for ordering to work
                    gulp.src(dest + 'app/**/*.js')
                        .pipe(plugins.angularFilesort()),
                    // css
                    gulp.src(dest + '**/*.css', { read: false })
                );

            var pipeline = gulp.src(options.paths.root + 'index.html')
                .pipe(plugins.inject(bowerFiles, {name: 'bower'}))
                .pipe(plugins.inject(appFiles, {ignorePath: dest}))
                .pipe(plugins.if(isDist, plugins.minifyHtml(opts.html)))
                .pipe(gulp.dest(dest))
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
            var pipeline = gulp.src(options.paths.app + '**/!(index)*.html')
                .pipe(plugins.if(isDist, plugins.minifyHtml(opts.html)))
                .pipe(plugins.angularTemplatecache('templateCacheHtml.js', opts.templateCache))
                .pipe(gulp.dest(dest + '/app'));                
            return pipeline;
        }
    };
})();
