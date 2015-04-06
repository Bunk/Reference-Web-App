var gulp = require('gulp'),
    paths = require('../util/paths'),
    browserSync = require('browser-sync');

// outputs changes to files to the console
function reportChange(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running build tasks...');
}

// this task wil watch for changes
// to js, html, and css files and call the
// reportChange method. Also, by depending on the
// serve task, it will instantiate a browserSync session
gulp.task('watch:local', ['serve:local'], function() {
    gulp.watch(paths.js.app, ['build:local', browserSync.reload]).on('change', reportChange);
    gulp.watch(paths.js.vendor, ['build:local', browserSync.reload]).on('change', reportChange);
    gulp.watch(paths.html, ['build:local', browserSync.reload]).on('change', reportChange);
    gulp.watch(paths.style, ['build:local', browserSync.reload]).on('change', reportChange);
});

gulp.task('watch:dist', ['serve:dist'], function() {
    gulp.watch(paths.js.app, ['build:dist', browserSync.reload]).on('change', reportChange);
    gulp.watch(paths.js.vendor, ['build:dist', browserSync.reload]).on('change', reportChange);
    gulp.watch(paths.html, ['build:dist', browserSync.reload]).on('change', reportChange);
    gulp.watch(paths.style, ['sass:dist', browserSync.reload]).on('change', reportChange);
});
