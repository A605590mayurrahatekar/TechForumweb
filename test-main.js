var allTestFiles = []
var TEST_REGEXP = /(spec|test)\.js$/i

// Get a list of all the test files to include
Object.keys(window.__karma__.files).forEach(function (file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
    // then do not normalize the paths
    var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '')
    allTestFiles.push(normalizedTestModule)
  }
})

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base',
  paths: {
        angular:          './www/lib/js/angular/angular.min',
        angularAnimate:   './www/lib/js/angular/angular-animate.min',
        angularSanitize:  './www/lib/js/angular/angular-sanitize.min',
        uiRouter:         './www/lib/js/angular-ui/angular-ui-router.min',
        angularMocks: '/node_modules/angular-mocks/angular-mocks'
  },
  shim: {
        angular : {exports : 'angular'},
        angularAnimate : {deps: ['angular']},
        angularSanitize : {deps: ['angular']},
        uiRouter : {deps: ['angular']},
        angularMocks: {deps: ['angular']}
  },

  // dynamically load all test files
  deps: allTestFiles,

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start
})
