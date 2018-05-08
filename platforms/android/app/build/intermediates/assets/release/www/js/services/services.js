/*global define */

define(function (require) {

    'use strict';

    var angular = require('angular'),
        config = require('config'),
        services = angular.module('app.services', ['app.config']);

    services.factory('SessionService', require('services/SessionService'));
    services.factory('AuthService', require('services/AuthService'));

    return services;

});