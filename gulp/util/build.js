'use strict';

var gulp = require('gulp'),
    options = require('./options'),
    runSequence = require('run-sequence');

module.exports = {
    build: function (isDist, callback) {
        var mode = (isDist) ? ':dist' : '';
        return runSequence(
            'clean',
            'lint',
            ['app.js' + mode, 'vendor.js' + mode, 'sass' + mode],
            'html' + mode,
            callback
        );
    },
}
