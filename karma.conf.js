// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/bower_components/angular-sanitize/angular-sanitize.js',
      'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'app/bower_components/angular-touch/angular-touch.js',
      'app/bower_components/angular-animate/angular-animate.js',
      'app/bower_components/angular-cache/dist/angular-cache.min.js',
      'app/bower_components/angular-ui-router/release/angular-ui-router.js',
      'app/bower_components/jquery/jquery.js',
      'app/bower_components/lodash/dist/lodash.js',
      'app/bower_components/fastclick/lib/fastclick.js',
      'app/bower_components/jasmine-jquery/lib/jasmine-jquery.js',
      'app/scripts/*.js',
      'app/scripts/**/*.js',
      'test/spec/**/*.js',
      //'test/spec/helpers.js',
      //'test/spec/services/calculator-service-edudg-13.js',
      //'test/spec/services/calculator-service-edudg-14.js',

      // fixtures
      {pattern: 'app/ihpa/*.json', watched: true, served: true, included: false}
    ],

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
