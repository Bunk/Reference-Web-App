var gulp = require('gulp');
var karma = require('karma').server;

// Run test once and exit
gulp.task('test-once', function (done) {
    karma.start({
        configFile: '../karma.config.js',
        singleRun: true
    }, function(e) {
        done();
    });
});

//Watch for file changes and re-run tests on each change
gulp.task('test-serve', function (done) {
    karma.start({
        configFile: '../karma.config.js'
    }, function(e) {
        done();
    });
});
