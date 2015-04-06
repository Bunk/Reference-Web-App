var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    paths = require('../util/paths'),
    changelog = require('conventional-changelog'),
    fs = require('fs'),
    bump = require('gulp-bump'),
    args = require('../args');

gulp.task('bump-version', function(){
    return gulp.src(['./package.json'])
        .pipe(bump({type:args.bump })) //major|minor|patch|prerelease
        .pipe(gulp.dest('./'));
});

gulp.task('changelog', function(callback) {
    var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
    return changelog({
        repository: pkg.repository.url,
        version: pkg.version,
        file: 'CHANGELOG.md'
    }, function(err, log) {
        fs.writeFileSync('CHANGELOG.md', log);
    });
});

// calls the listed sequence of tasks in order
gulp.task('prep-release', function(callback){
    return runSequence(
        'lint',
        'build:dist',
        'bump-version',
        'gen-doc',
        'changelog',
        callback
    );
});
