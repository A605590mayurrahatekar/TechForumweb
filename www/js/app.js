define(['angular',
        'uiRouter',
        'config',
        'filters/filters',
        'services/services',
        'directives/directives',
        'controllers/controllers',
        'ionicAngular',
        'angularNotify',
        'angularBase64',
        'ngCordova'
    ],

    function (angular, uiRouter) {
        'use strict';

        var app = angular.module('app', [
            'ionic',
            'app.controllers',
            'app.filters',
            'app.services',
            'app.directives',
            'app.config',
            'ui.router',
            'cgNotify',
            'base64',
            'ngCordova'
        ]);

        return app;

    });
