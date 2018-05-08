/*global define, console */

define(['angular'], function (angular) {
    'use strict';

    var SurveyCtrl = function ($scope, $state, $http, $location, $anchorScroll, $stateParams,$timeout,$filter,SessionService,AuthService,notify,$ionicLoading) {
        $scope.sessions = [];
        $scope.starProp = 0;
        $scope.id = $stateParams.id;
        $scope.sessionSurvey = [];

        $scope.techForumDay = false;
        var date = new Date();
        var techForumDate = new Date(2018,6,1);
        techForumDate.setHours(10,25,0);
        if(date < techForumDate) {
            $scope.techForumDay
        } else {
            $scope.techForumDay = true;
        }

        $scope.showLoading = function() {
            $ionicLoading.show({
                template: '<p>Loading...</p><ion-spinner></ion-spinner>'
            });
        }

        $scope.hideLoading = function(){
            $ionicLoading.hide();
        };


        $scope.retrieveAllSessions = function () {
            $http.get("js/data/survey.json").success(function (data) {

                angular.forEach(data, function (session) {
                    //console.log(session);
                    if(session.feedback) {
                        var s = {};
                        s.sessionId = session.sessionId;
                        s.sessionName = session.sessionName;
                        s.questionDescription = session.description;
                        s.questionId = session.id;
                        s.questionOptions = [];
                        s.starProp = 3
                        angular.forEach(session.questionOptions, function (questionOptions) {
                                var q = {};
                                q.optionId = questionOptions.optionId;
                                s.questionOptions.push(q);

                        });

                        var givenSession = $filter('filter')($scope.sessionSurvey, {sessionId: session.sessionId}, true);
                        //console.log(givenSession);
                        if(givenSession.length == 0) {
                            var obj = {
                                sessionId : session.sessionId,
                                sessionName: session.sessionName,
                                details: []
                            }
                            obj.details.push(s);
                            $scope.sessionSurvey.push(obj);
                        } else {
                            //console.log(givenSession);
                            givenSession[0].details.push(s);
                        }
                        //$scope.sessions.push(s);


                    }
                    //console.log($scope.sessionSurvey);
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

        $scope.rateSession = function(question) {
            var rating = question.starProp;
            var optionId = question.questionOptions[rating-1].optionId;
            var user = AuthService.getUser()
            var response = SessionService.rateSession(question.questionId,optionId,user);
            $scope.showLoading();

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
    }


    SurveyCtrl.$inject = ['$scope', '$state', '$http', '$location', '$anchorScroll', '$stateParams','$timeout','$filter','SessionService','AuthService','notify','$ionicLoading'];
    return SurveyCtrl;


});
