/*global requirejs, document, cordova, window, navigator, console */

requirejs.config({
    paths: {
        angular:          '../lib/js/angular/angular.min',
        angularAnimate:   '../lib/js/angular/angular-animate.min',
        angularSanitize:  '../lib/js/angular/angular-sanitize.min',
        uiRouter:         '../lib/js/angular-ui/angular-ui-router.min',
        ionic:            '../lib/js/ionic.min',
        ionicAngular:     '../lib/js/ionic-angular.min',
        text:             '../lib/js/text',
        angularInputStars:      '../lib/angular-input-stars-directive/angular-input-stars',
        angularNotify: '../lib/angular-notify/angular-notify.min',
        angularBase64: '../lib/angular-base64/angular-base64.min',
        ngCordova: '../lib/ngCordova/ng-cordova.min'
    },
    shim: {
        angular : {exports : 'angular'},
        angularAnimate : {deps: ['angular']},
        angularSanitize : {deps: ['angular']},
        uiRouter : {deps: ['angular']},
        ionic :  {deps: ['angular'], exports : 'ionic'},
        ionicAngular: {deps: ['angular', 'ionic', 'uiRouter', 'angularAnimate', 'angularSanitize']},
        angularInputStars : {deps: ['angular'], exports : 'angularInputStars'},
        angularNotify: {deps: ['angular']},
        angularBase64:{deps: ['angular']},
        ngCordova:{deps:['angular']}
    },
    priority: [
        'angular',
        'ionic'
    ],
    deps: [
        'bootstrap'
    ]
});
