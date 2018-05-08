/*global define, console */

define(function () {
    'use strict';

    var BaseCtrl = function ($scope, $state,$rootScope,$location,$ionicLoading,AuthService,notify,SessionService,$timeout) {

        
        $scope.showLoading = function() {
            $ionicLoading.show({
                template: '<p>Processing...</p><ion-spinner></ion-spinner>'
            });
            $timeout(function(){
                //$scope.displayErrorMessage("Ooops. Something went wrong.");
                $scope.hideLoading();
            },10000);

        };

        $scope.hideLoading = function(){
            $ionicLoading.hide();
        };

        $scope.toggleNavBar = function () {
            if ($rootScope.navBar) {
                //$rootScope.navBar = false;
                //$window.scrollTo(0, 0);
            } else {

                $rootScope.navBar = true;
            }
        }

        $scope.register = function(session) {
            $scope.showLoading();
            var response = SessionService.registerUserToSession(session.id,AuthService.getUser())
            response.success(function (data, status, headers, config) {
                console.log(data);
                if(data.result === "success") {
                    var messageTemplate =  "<div class='alert alert-success'> <span class='vd_alert-icon'><i class='fa fa-check-circle vd_green'></i></span>Registered Successfully.</div>";
                    notify({
                        messageTemplate: messageTemplate,
                        position: "right",
                        duration: 3000
                    });

                } else if(data.result === "registration_full") {
                    var messageTemplate =  "<div class='alert alert-danger'> <span class='vd_alert-icon'><i class='fa fa-exclamation-triangle vd_yellow'></i></span>Registrations closed for this session. Please try another session.</div>";
                    notify({
                        messageTemplate: messageTemplate,
                        position: "right",
                        duration: 3000
                    });

                }else {
                    var messageTemplate =  "<div class='alert alert-danger'> <span class='vd_alert-icon'><i class='fa fa-exclamation-triangle vd_yellow'></i></span>Registration Failed. You have already registered for this slot.</div>";
                    notify({
                        messageTemplate: messageTemplate,
                        position: "right",
                        duration: 3000
                    });
                }
                $scope.hideLoading();
            });
            response.error(function(data, status, headers, config){
                $scope.hideLoading();
            })

            return response;
        };

        $scope.unRegister = function(session) {
            $scope.showLoading();
            var response = SessionService.unRegisterUserToSession(session.id,AuthService.getUser())
            response.success(function (data, status, headers, config) {
                if(data.result === "success") {
                    var messageTemplate =  "<div class='alert alert-success'> <span class='vd_alert-icon'><i class='fa fa-check-circle vd_green'></i></span>UnRegistered Successfully.</div>";
                    notify({
                        messageTemplate: messageTemplate,
                        position: "right",
                        duration: 3000
                    });
                }
                $scope.hideLoading();
            });
            response.error(function(data, status, headers, config){
                $scope.hideLoading();
            });

            return response;
        };

        $scope.displayMessage = function(message) {
            var messageTemplate =  "<div class='alert alert-success'> <span class='vd_alert-icon'><i class='fa fa-check-circle vd_green'></i></span>"+message+"</div>";
            notify({
                messageTemplate: messageTemplate,
                position: "right",
                duration: 3000
            });
        };

        $scope.displayMessageLong = function(message) {
            // var messageTemplate =  "<div class='alert alert-success'> <span class='vd_alert-icon'><i class='fa fa-check-circle vd_green'></i></span>We have switched Sessions in TR03. Please adjust your registrations accordingly</div>";
            // notify({
            //     messageTemplate: messageTemplate,
            //     position: "right",
            //     duration: 10000
            // });
        };

        $scope.displayErrorMessage = function(message) {
            var messageTemplate =  "<div class='alert alert-danger'> <span class='vd_alert-icon'><i class='fa fa-exclamation-triangle vd_yellow'></i></span>"+message+"</div>";
            notify({
                messageTemplate: messageTemplate,
                position: "right",
                duration: 3000
            });
        };

    }

    BaseCtrl.$inject = ['$scope', '$state' , '$rootScope','$location','$ionicLoading','AuthService','notify','SessionService','$timeout'];
    return BaseCtrl;

});
