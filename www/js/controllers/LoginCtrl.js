/*global define, console */

define(function () {
    'use strict';
    var LoginCtrl = function ($scope, $state,notify,AuthService,$ionicLoading,$base64,$rootScope) {
        var notifyDuration = 3000;

        AuthService.logout();
        $rootScope.$broadcast('logout', {});
        $scope.dasId = "";
        $scope.dasIdNotSearched = true;
        $scope.oldDASId = "";

        $scope.showLoading = function() {
            $ionicLoading.show({
                template: '<p>Loading...</p><ion-spinner></ion-spinner>'
            });
        }

        $scope.hideLoading = function(){
            $ionicLoading.hide();
        };

        $scope.login = function() {
            $scope.showLoading();
            var authString = $scope.dasId + ":" + $scope.password;
            authString = $base64.encode(authString);
            var user = {
                dasId : $scope.dasId.toUpperCase(),
                firstName: $scope.firstName,
                lastName: $scope.lastName,
                password: $base64.encode($scope.password),
                location: $scope.location,
                authString: authString
            }
           var response = AuthService.login(user);
            response.success(function (data, status, headers, config) {
                console.log(data);
                if(data.status === "403") {
                    var messageTemplate =  "<div class='alert alert-danger'> <span class='vd_alert-icon'><i class='fa fa-exclamation-circle vd_red'></i></span><strong>Oh snap!</strong> Invalid DAS Id or Password.</div>";
                    notify({
                        messageTemplate: messageTemplate,
                        position: "right",
                        duration: notifyDuration
                    });
                } else {
                    user.dasId = user.dasId.toUpperCase();
                    window.localStorage['user'] = JSON.stringify(user);
                    $rootScope.$broadcast('login', {});
                    $state.transitionTo("home");
                }
                $scope.hideLoading();
            });
            response.error(function(data, status, headers, config){
                console.log(data);
                $scope.hideLoading();
            })

        }

        $scope.searchUserDetails = function () {

            if($scope.oldDASId === $scope.dasId) {
                return
            } else {
                $scope.oldDASId = $scope.dasId;
            }
            //a506826
            var dasIdRegEx = new RegExp("^[a-zA-Z][0-9]{6}|^[iI][nN][0-9]{5}$");
            console.log($scope.dasId);
            console.log(dasIdRegEx.test($scope.dasId));
            if(dasIdRegEx.test($scope.dasId)) {
                $scope.showLoading();
                var response = AuthService.searchUserByDASId($scope.dasId);
                response.success(function (data, status, headers, config) {
                    console.log(data);
                    $scope.firstName = data.firstName;
                    $scope.lastName = data.lastName;
                    $scope.location = data.location;
                    $scope.hideLoading();
                });
                response.error(function(data, status, headers, config){
                    notify({
                        message: "DAS ID not found. ",
                        classes: "alert alert-danger",
                        position: "right",
                        duration: notifyDuration
                    });
                    var element = document.getElementById("contact-form-dasid");
                    if(element)
                        element.focus();
                    $scope.hideLoading();
                })
            } else {
                var element = document.getElementById("contact-form-dasid");
                var messageTemplate =  "<div class='alert alert-danger'> <span class='vd_alert-icon'><i class='fa fa-exclamation-circle vd_red'></i></span><strong>Oh snap!</strong> Incorrect format for DAS ID </div>";
                notify({
                    messageTemplate: messageTemplate,
                    position: "right",
                    duration: notifyDuration
                });
                if(element)
                    element.focus();
            }

        }

    }

    LoginCtrl.$inject = ['$scope', '$state','notify','AuthService','$ionicLoading','$base64','$rootScope'];
    return LoginCtrl;


});
