var path = require('path');

var appRoot = 'src/';

module.exports = {
  root: appRoot,
  js: {
      vendor: [
          'bower_components/foundation/js/foundation/**/*.js'
      ],
      app: appRoot + '**/*.js'
  },
  maps: 'sourcemaps/',
  html: [ appRoot + '**/*.html' ],
  style: [
      appRoot + 'styles/**/*.scss',
      'bower_components/foundation/scss/**/*.scss'
  ],
  output: 'dist/',
  local: 'local/',
  doc:'doc/',
  e2eSrc: 'test/e2e/src/*.js',
  e2eDist: 'test/e2e/dist/'
};
