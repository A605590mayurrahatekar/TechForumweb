/*global define, console */

define(function () {
    'use strict';

    var MenuCtrl = function ($scope, $state, $rootScope, $location, AuthService,$ionicPlatform, $cordovaBarcodeScanner,$controller,$cordovaNetwork) {
        $scope.vm = {};
        $scope.vm.scanResults = {};
        angular.extend(this, $controller('BaseCtrl', {$scope: $scope}));
        $scope.displayMessageLong();
        $scope.userExists = true;
        try{
        $ionicPlatform.ready(function () {
            console.log($cordovaNetwork.getNetwork())
            if($cordovaNetwork.getNetwork()) {
                var type = $cordovaNetwork.getNetwork()
                var isOnline = $cordovaNetwork.isOnline()
                var isOffline = $cordovaNetwork.isOffline()
                if(isOffline) {
                    $scope.displayErrorMessage("No internet connection found");
                }

                $ionicPlatform.registerBackButtonAction(function (event) {
                  if($state.current.name=="home" || $state.current.name=="login"){
                    navigator.app.exitApp(); //<-- remove this line to disable the exit
                  }
                  else {
                    navigator.app.backHistory();
                  }
                }, 100);
            }
        });
    }catch(e){}

        $scope.menuItems = [{
            route: "/home",
            iconClass: "fa-home",
            displayText: "Home"
        }
            , {
                route: "/mysession",
                iconClass: " fa-flag",
                displayText: "My Sessions"
            }, {
                route: "/itinerary",
                iconClass: "fa-calendar",
                displayText: "Itinerary"
            }, {
                route: "/sessions",
                iconClass: "fa-bullhorn",
                displayText: "Sessions"
            }, {
                route: "/speakers",
                iconClass: "fa-microphone",
                displayText: "Speakers"
            }, {
                route: "/survey",
                iconClass: "fa-comments-o",
                displayText: "Survey"
            }
            // , {
            //     route: "/challenge",
            //     iconClass: "fa-trophy",
            //     displayText: "TF Challenge"
            // }
            //    {
            //    route: "/askQuestion",
            //    iconClass: "fa-question",
            //    displayText: "Ask A Question"
            //},
            //{
            //    route: "/infoBooth",
            //    iconClass: "icon-info",
            //    displayText: "Infobooth"
            //},
            //{
            //    route: "/login",
            //    iconClass: "fa fa-sign-out",
            //    displayText: "Logout"
            //}
            ];

        $scope.go = function (path) {
            $rootScope.navBar = true;
            $location.path(path);

        }

        $scope.markMyAttendance = function () {
            $ionicPlatform.ready(function () {
                var config = {
                    preferFrontCamera : false, // iOS and Android
                    showFlipCameraButton : false, // iOS and Android
                    showTorchButton : false, // iOS and Android
                    torchOn: false, // Android, launch with the torch switched on (if available)
                    prompt : "Place a barcode inside the scan area", // Android
                    resultDisplayDuration: 0, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
                    orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
                    disableAnimations : true, // iOS
                    disableSuccessBeep: false // iOS
                };
                $cordovaBarcodeScanner
                    .scan(config)
                    .then(function (result) {
                        // Success! Barcode data is here
                        $scope.vm.scanResults = "We got a barcode\n" +
                            "Result: " + result.text + "\n" +
                            "Format: " + result.format + "\n" +
                            "Cancelled: " + result.cancelled;
                        //alert(result.text);
                        $scope.showLoading();
                        AuthService.markMyAttendance(result.text).success(function (data) {
                            $scope.displayMessage("Attendance Marked Successfully");
                            $scope.hideLoading();
                        }).error(function(data, status) {
                            $scope.hideLoading();
                            $scope.displayMessage("Operation Failed. Please login and try again");
                        });
                        $scope.hideLoading();
                    }, function (error) {
                        // An error occurred
                        $scope.vm.scanResults = 'Error: ' + error;
                        $scope.hideLoading();
                    });
            });
        };

        if (!AuthService.isLoggedIn()) {
            //$scope.menuItems = [];
            $scope.userExists = false;
        }


    }

    MenuCtrl.$inject = ['$scope', '$state', '$rootScope', '$location', 'AuthService','$ionicPlatform', '$cordovaBarcodeScanner','$controller','$cordovaNetwork'];
    return MenuCtrl;

});
