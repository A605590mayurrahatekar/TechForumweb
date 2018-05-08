/*global define, console */

define(['angular'], function (angular) {
    'use strict';

    var PresenterCtrl = function ($scope, $state, SessionService,$filter,AuthService,$controller) {
        angular.extend(this, $controller('BaseCtrl', {$scope: $scope}));

        $scope.presenters = [];

        $scope.retrieveAllPresenters = function () {
            $scope.showLoading();
            SessionService.getPresenters().success(function (data) {
                angular.forEach(data, function (presenter) {
                    var p = {};
                    p.name = presenter.name;
                    p.id = presenter.id;
                    p.description = presenter.description;
                    p.roomNumber = presenter.sessionDtos[0].roomNumber;
                    p.timeSlot = presenter.sessionDtos[0].timeSlot;
                    p.sessionName = presenter.sessionDtos[0].name;
                    p.sessionId = presenter.sessionDtos[0].id;
                    p.registered = false;
                    p.sessionDescription = presenter.sessionDtos[0].description;
                    p.imageUrl = presenter.imageUrl;
                    $scope.presenters.push(p);

                });

                SessionService.getMySessions(AuthService.getUser()).success(function (data) {
                    angular.forEach(data.sessionDto, function (session) {
                        var mySession = $filter('filter')($scope.presenters, {sessionId: session.id}, true);
                        if (mySession.length == 1) {
                            mySession[0].registered = true;
                        }

                    });
                    $scope.hideLoading();
                });

            });
        }

        $scope.retrieveAllPresenters();

        $scope.registerSession = function(session) {
            var response = $scope.register(session);
            response.success(function (data, status, headers, config) {
                if(data.result === "success") {
                    var mySession = $filter('filter')($scope.presenters, {sessionId: session.sessionId}, true);
                    if (mySession.length == 1) {
                        mySession[0].registered = true;
                    }
                }

            });

        }

        $scope.unRegisterSession = function(session) {
            var response = $scope.unRegister(session);
            response.success(function (data, status, headers, config) {
                if(data.result === "success") {
                    var mySession = $filter('filter')($scope.presenters, {sessionId: session.sessionId}, true);
                    if (mySession.length == 1) {
                        mySession[0].registered = false;
                    }
                }
            });
        }



    }

    PresenterCtrl.$inject = ['$scope', '$state', 'SessionService','$filter','AuthService','$controller'];
    return PresenterCtrl;


});
