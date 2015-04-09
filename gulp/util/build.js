'use strict';

var gulp = require('gulp'),
    options = require('./options'),
    runSequence = require('run-sequence');

module.exports = {
    build: function (isDist, callback) {
        var mode = (isDist) ? ':dist' : '';
        return runSequence(
            'clean',
            [
                'app.js' + mode,
                //'vendor.js' + mode,
                'sass' + mode,
                'fonts' + mode,
                'templates' + mode
            ],
            'html' + mode,
            callback
        );
    },
}
