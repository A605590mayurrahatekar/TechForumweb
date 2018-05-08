/*global define, console */

define(function () {
    'use strict';


    var HeaderCtrl = function ($scope, $state, $rootScope, notify, $ionicPlatform, $cordovaBarcodeScanner,AuthService,$window) {

        $scope.userExists = AuthService.isLoggedIn();

        const fileName = "co-ordinates.json";
        var posOptions = {timeout: 10000, enableHighAccuracy: true};

        $scope.topMenu = false;
        var mysrclat = 0;
        var mysrclong = 0;

        $rootScope.pageTitle = "ODC TechForum";

        $scope.user = {};
        //$scope.user.name = "Dhananjay Ghanwat";



        $scope.login = function () {
            $state.go('tab.pet-index');
        };

        $scope.logout = function() {
            AuthService.logout();
            $state.go("login");
        }

        $scope.toggleNavBar = function () {
            if ($rootScope.navBar) {
                $rootScope.navBar = false;
                $window.scrollTo(0, 0);
            } else {

                $rootScope.navBar = true;
            }
        }

        $scope.showSideNavBar = function () {
            $rootScope.navBar = false;
            console.log("Scrolling to top");
            $window.scrollTo(0, 0);
        }

        $scope.markMyAttendance = function () {
           $ionicPlatform.ready(function () {
                $cordovaBarcodeScanner
                    .scan()
                    .then(function (result) {
                        // Success! Barcode data is here
                        $scope.vm.scanResults = "We got a barcode\n" +
                            "Result: " + result.text + "\n" +
                            "Format: " + result.format + "\n" +
                            "Cancelled: " + result.cancelled;
                    }, function (error) {
                        // An error occurred
                        $scope.vm.scanResults = 'Error: ' + error;
                    });
            });
            var event = new CustomEvent("click", {"detail": "Example of an event"});


            console.log(navigator.geolocation);
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    mysrclat = position.coords.latitude;
                    mysrclong = position.coords.longitude;
                    console.log(mysrclat);
                    console.log(mysrclong);
                    alert(mysrclat)

                    $scope.topMenu = true;
                    document.dispatchEvent(event);
                    $cordovaFile.writeFile(cordova.file.dataDirectory, fileName, JSON.stringify(position), true).then(
                        function (success) {
                            alert("Success");
                        }, function (error) {
                            alert(error);
                            console.log(error);
                        });
                });
            } else {
                $scope.topMenu = true;
                document.dispatchEvent(event);
            }
        }

        $rootScope.$on('logout', function (event, data) {
            $scope.user = {};
            $scope.userExists = false;
        });

        $rootScope.$on('login', function (event, data) {
            var _user = JSON.parse(window.localStorage['user']);
            $scope.user.name = _user.firstName + " " + _user.lastName;
            $scope.userExists = true;
        });


    }

    HeaderCtrl.$inject = ['$scope', '$state', '$rootScope', 'notify', '$ionicPlatform', '$cordovaBarcodeScanner','AuthService','$window'];
    return HeaderCtrl;

});
