(function() {
    'use strict';

    var runSequence = require('run-sequence');

    module.exports = {
        build: function (isDist, callback) {
            var mode = (isDist) ? ':dist' : '';
            return runSequence(
                'clean',
                [
                    'js' + mode,
                    'sass' + mode,
                    'fonts' + mode,
                    'templates' + mode
                ],
                'html' + mode,
                callback
            );
        },
    };
})();
