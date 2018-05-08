/*global define, require */

define(function (require) {

    'use strict';

    var angular = require('angular'),
        services = require('services/services'),
        config = require('config'),
        controllers = angular.module('app.controllers', ['app.services', 'app.config']);

    controllers.controller('LoginCtrl', require('controllers/LoginCtrl'));
    controllers.controller('HeaderCtrl', require('controllers/HeaderCtrl'));
    controllers.controller('MenuCtrl', require('controllers/MenuCtrl'));
    controllers.controller('HomeCtrl', require('controllers/HomeCtrl'));
    controllers.controller('SessionCtrl', require('controllers/SessionCtrl'));
    controllers.controller('PresenterCtrl', require('controllers/PresenterCtrl'));
    controllers.controller('ItineraryCtrl', require('controllers/ItineraryCtrl'));
    controllers.controller('SurveyCtrl', require('controllers/SurveyCtrl'));
    controllers.controller('ChallengeCtrl', require('controllers/ChallengeCtrl'));
    controllers.controller('BaseCtrl', require('controllers/BaseCtrl'));


    controllers.run(['$rootScope', function ($rootScope) {
        $rootScope.sampleParam = "value";
        $rootScope.pageTitle = 'Welcome';
    }]);

    return controllers;

});
