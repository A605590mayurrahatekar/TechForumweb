/*global define, require */

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
 
server.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", port " + server_port )
});

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
