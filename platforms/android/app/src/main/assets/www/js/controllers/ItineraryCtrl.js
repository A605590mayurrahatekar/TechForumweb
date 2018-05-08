/*global define, console */

define(['angular'], function (angular) {
    'use strict';

    var ItineraryCtrl = function ($scope, $state, $filter,  SessionService,$location,$ionicLoading,AuthService , $controller,notify) {

        angular.extend(this, $controller('BaseCtrl', {$scope: $scope}));
        $scope.tr01Sessions = [];
        $scope.tr02Sessions = [];
        $scope.tr03Sessions = [];
        $scope.tr04Sessions = [];
        $scope.allRoomsSession = [];
        $scope.filterValues = ["TR01", "TR02", "TR03", "TR04", "11:50 AM", "12:45 PM", "2:20 PM", "3:15 PM", "4:30 PM"];
        $scope.retrieveAllSessions = function () {
            $scope.showLoading();
            SessionService.all().success(function (data) {
                $scope.tr01Sessions = $scope.filterSessionsByRoom(data, $scope.filterValues[0]);
                $scope.tr02Sessions = $scope.filterSessionsByRoom(data, $scope.filterValues[1]);
                $scope.tr03Sessions = $scope.filterSessionsByRoom(data, $scope.filterValues[2]);
                $scope.tr04Sessions = $scope.filterSessionsByRoom(data, $scope.filterValues[3]);
                $scope.allRoomsSession.push($scope.tr01Sessions);
                $scope.allRoomsSession.push($scope.tr02Sessions);
                $scope.allRoomsSession.push($scope.tr03Sessions);
                $scope.allRoomsSession.push($scope.tr04Sessions);

                SessionService.getMySessions(AuthService.getUser()).success(function (data) {
                    $scope.updateMySessions($scope.tr01Sessions,data);
                    $scope.updateMySessions($scope.tr02Sessions,data);
                    $scope.updateMySessions($scope.tr03Sessions,data);
                    $scope.updateMySessions($scope.tr04Sessions,data);
                });

            });

            $scope.hideLoading();
        }

        $scope.updateMySessions = function(roomSessions,data) {
            angular.forEach(data.sessionDto, function (session) {
                var mySession = $filter('filter')(roomSessions, {id: session.id}, true);
                if (mySession.length == 1) {
                    mySession[0].registered = true;
                }
            });
        }




        $scope.filterSessionsByRoom = function (data, roomNumber) {
            var roomSessions = $filter('filter')(data, {roomNumber: roomNumber}, true);
            var arrSessions = [];
            angular.forEach(roomSessions, function (session) {
                var s = {};
                s.name = session.name;
                s.id = session.id;
                s.description = session.description;
                s.roomNumber = session.roomNumber;
                s.timeSlot = session.timeSlot;
                s.presenterName = session.presenterDtos[0].name;
                s.registered = false;
                arrSessions.push(s);
            });
            return arrSessions;

        }



        $scope.retrieveAllSessions();

        $scope.registerSession = function(session,roomNumber) {
            console.log(roomNumber);
            var response = $scope.register(session);
            response.success(function (data, status, headers, config) {
                if(data.result === "success") {
                    var roomSessions = [];
                    if(roomNumber == $scope.filterValues[0]) {
                        roomSessions = $scope.tr01Sessions;
                    } else if(roomNumber == $scope.filterValues[1]) {
                        roomSessions = $scope.tr02Sessions;
                    } else if(roomNumber == $scope.filterValues[2]) {
                        roomSessions = $scope.tr03Sessions;
                    } else if(roomNumber == $scope.filterValues[3]) {
                        roomSessions = $scope.tr04Sessions;
                    }
                    var mySession = $filter('filter')(roomSessions, {id: session.id}, true);
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

        $scope.unRegisterSession = function(session,roomNumber) {
            var response = $scope.unRegister(session);
            response.success(function (data, status, headers, config) {
                if(data.result === "success") {
                    var roomSessions = [];
                    if(roomNumber == $scope.filterValues[0]) {
                        roomSessions = $scope.tr01Sessions;
                    } else if(roomNumber == $scope.filterValues[1]) {
                        roomSessions = $scope.tr02Sessions;
                    } else if(roomNumber == $scope.filterValues[2]) {
                        roomSessions = $scope.$scope.tr03Sessions;
                    } else if(roomNumber == $scope.filterValues[3]) {
                        roomSessions = $scope.tr04Sessions;
                    }
                    var mySession = $filter('filter')(roomSessions, {id: session.id}, true);
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


        $scope.registerTeaserVote = function(sessionId) {
            var userDasId = AuthService.getUser();
            $scope.showLoading();
            var response = SessionService.registerTeaserVote(sessionId,userDasId)
            response.success(function (data, status, headers, config) {
                var messageTemplate =  "<div class='alert alert-success'> <span class='vd_alert-icon'><i class='fa fa-check-circle vd_green'></i></span>Thanks for your response.</div>";
                notify({
                    messageTemplate: messageTemplate,
                    position: "right",
                    duration: 4000
                });
                $scope.hideLoading();
            });
            response.error(function(data, status, headers, config){
                console.log(headers);
                $scope.hideLoading();
            })

        }

        $scope.goToSurvey = function(sessionId) {
            $location.path("/survey/id/"+sessionId);
        }

        $scope.goToChallenge = function(sessionId) {
            $location.path("/challenge/id/"+sessionId);
        }

    }

    ItineraryCtrl.$inject = ['$scope', '$state', '$filter', 'SessionService','$location','$ionicLoading','AuthService','$controller','notify'];
    return ItineraryCtrl;


});
