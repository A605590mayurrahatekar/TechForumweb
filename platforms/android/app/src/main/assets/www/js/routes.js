/*global define, require */

define(['app'], function (app) {
    'use strict';

    app.config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('comingsoon', {
                    url: "/comingsoon",
                    templateUrl: "templates/comingsoon.html",
                    controller: 'LoginCtrl'
                })
                .state('login', {
                    url: "/login",
                    templateUrl: "templates/login.html",
                    controller: 'LoginCtrl'
                })
                .state('home', {
                    url: "/home",
                    templateUrl: "templates/home.html",
                    controller: 'HomeCtrl'
                })
                .state('sessions', {
                    url: "/sessions",
                    templateUrl: "templates/sessions.html",
                    controller: 'SessionCtrl'
                })
                .state('sessionsid', {
                    url: "/sessions/id/:id",
                    templateUrl: "templates/sessions.html",
                    controller: 'SessionCtrl'
                })
                .state('speakers', {
                    url: "/speakers",
                    templateUrl: "templates/speakers.html",
                    controller: 'PresenterCtrl'
                })
                .state('itinerary', {
                    url: "/itinerary",
                    templateUrl: "templates/itinerary.html",
                    controller: 'ItineraryCtrl'
                })
                .state('survey', {
                    url: "/survey",
                    templateUrl: "templates/survey.html",
                    controller: 'SurveyCtrl'
                })
                .state('surveyid', {
                    url: "/survey/id/:id",
                    templateUrl: "templates/survey.html",
                    controller: 'SurveyCtrl'
                })
                .state('challenge', {
                    url: "/challenge",
                    templateUrl: "templates/challenge.html",
                    controller: 'ChallengeCtrl'
                })
                .state('challengeid', {
                    url: "/challenge/id/:id",
                    templateUrl: "templates/challenge.html",
                    controller: 'ChallengeCtrl'
                })
                .state('mysession', {
                    url: "/mysession",
                    templateUrl: "templates/mysession.html",
                    controller: 'HomeCtrl'
                })




            $urlRouterProvider.otherwise("/home");

        }]);


});
