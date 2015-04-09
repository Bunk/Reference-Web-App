var gulp = require('gulp'),
    options = require('../util/options'),
    browserSync = require('browser-sync');

// outputs changes to files to the console
function reportChange(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running build tasks...');
}

// this task wil watch for changes
// to js, html, and css files and call the
// reportChange method. Also, by depending on the
// serve task, it will instantiate a browserSync session
gulp.task('watch', ['serve'], function() {
    gulp.watch(options.paths.js.app, ['build', browserSync.reload]).on('change', reportChange);
    gulp.watch(options.paths.js.vendor, ['build', browserSync.reload]).on('change', reportChange);
    gulp.watch(options.paths.html, ['build', browserSync.reload]).on('change', reportChange);
    gulp.watch(options.paths.style, ['build', browserSync.reload]).on('change', reportChange);
});

gulp.task('watch:dist', ['serve:dist'], function() {
    gulp.watch(options.paths.js.app, ['build:dist', browserSync.reload]).on('change', reportChange);
    gulp.watch(options.paths.js.vendor, ['build:dist', browserSync.reload]).on('change', reportChange);
    gulp.watch(options.paths.html, ['build:dist', browserSync.reload]).on('change', reportChange);
    gulp.watch(options.paths.style, ['sass:dist', browserSync.reload]).on('change', reportChange);
});
