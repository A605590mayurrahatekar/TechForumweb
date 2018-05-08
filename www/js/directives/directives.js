/*global define */

define(function (require) {

    'use strict';

    var angular = require('angular'),
        services = require('services/services'),
        directives = angular.module('app.directives', ['app.services']);
    
    directives.directive('appVersion', require('directives/VersionDirective') );
    directives.directive('inputStars', require('directives/InputStarsDirective') );
    directives.directive('ngPrint', require('directives/PrintDirective') );
    return directives;
});