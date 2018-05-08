/*global define, console */

define(['angular'], function (angular) {
    'use strict';

    var SessionCtrl = function ($scope, $state, $location, $anchorScroll, $stateParams, $timeout,  $filter, SessionService,AuthService , $ionicLoading, notify, $rootScope , $controller) {
        $scope.sessions = [];
        $scope.id = $stateParams.id;
        angular.extend(this, $controller('BaseCtrl', {$scope: $scope}));




        $scope.retrieveAllSessions = function () {
            $scope.showLoading();
            SessionService.all().success(function (data) {
                angular.forEach(data, function (session) {
                    var s = {};
                    s.name = session.name;
                    s.id = session.id;
                    s.description = session.description;
                    s.roomNumber = session.roomNumber;
                    s.timeSlot = session.timeSlot;
                    s.presenterName = session.presenterDtos[0].name;
                    s.registered = false;
                    s.imageUrl = session.imageUrl;
                    $scope.sessions.push(s);

                });

                SessionService.getMySessions(AuthService.getUser()).success(function (data) {
                    angular.forEach(data.sessionDto, function (session) {
                        var mySession = $filter('filter')($scope.sessions, {id: session.id}, true);
                        if (mySession.length == 1) {
                            mySession[0].registered = true;
                        }

                    });
                    $scope.hideLoading();
                });
                $timeout($scope.navigateToAnchor, 200)
            });
        }

        $scope.retrieveAllSessions();

        $scope.navigateToAnchor = function () {

            if ($location.path().indexOf("id") != -1) {
                $location.hash("anchor" + ($scope.id))
            }
        }

        $scope.registerSession = function(session) {
            var response = $scope.register(session);
            response.success(function (data, status, headers, config) {
                if(data.result === "success") {
                    var mySession = $filter('filter')($scope.sessions, {id: session.id}, true);
                    if (mySession.length == 1) {
                        mySession[0].registered = true;
                    }
                }
                $scope.hideLoading();
            });
            response.error(function(data, status, headers, config){
                $scope.hideLoading();
            })
        };

        $scope.unRegisterSession = function(session) {
            var response = $scope.unRegister(session);
            response.success(function (data, status, headers, config) {
                if(data.result === "success") {
                    var mySession = $filter('filter')($scope.sessions, {id: session.id}, true);
                    if (mySession.length == 1) {
                        mySession[0].registered = false;
                    }
                }
                $scope.hideLoading();
            });
            response.error(function(data, status, headers, config){
                $scope.hideLoading();
            })
        };




    }


    SessionCtrl.$inject = ['$scope', '$state', '$location', '$anchorScroll', '$stateParams', '$timeout',  '$filter', 'SessionService','AuthService' , '$ionicLoading','notify' , '$rootScope' , '$controller'];
    return SessionCtrl;


});
