/*global define, console */

define(['angular'], function (angular) {
    'use strict';

    var HomeCtrl = function ($scope, $state, SessionService, AuthService,$controller,$location,$window) {
        angular.extend(this, $controller('BaseCtrl', {$scope: $scope}));



        $window.scrollTo(0, 0);
        $scope.mySessions = [];
        $scope.retrieveMySessions = function () {
            
            $scope.showLoading();
            SessionService.getMySessions(AuthService.getUser()).success(function (data) {

                angular.forEach(data.sessionDto, function (session) {
                    var mysession = {};
                    mysession.id = session.id
                    mysession.name = session.name;
                    mysession.description = session.description;
                    mysession.roomNumber = session.roomNumber;
                    mysession.timeSlot = session.timeSlot;
                    mysession.presenterName = session.presenterDtos[0].name;
                    $scope.mySessions.push(mysession);
                });
                $scope.hideLoading();
            });
        };

        $scope.retrieveMySessions();

        $scope.goToSurvey = function(sessionId) {
            $location.path("/survey/id/"+sessionId);
        }

        $scope.goToChallenge = function(sessionId) {
            $location.path("/challenge/id/"+sessionId);
        }

    };



    HomeCtrl.$inject = ['$scope', '$state', 'SessionService', 'AuthService','$controller','$location','$window'];
    return HomeCtrl;

});
