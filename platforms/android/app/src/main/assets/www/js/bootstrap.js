/*global define, require, console, cordova, navigator */

define(['ionic', 'angular', 'app', 'routes','ionicAngular'], function (ionic, angular, app,routes,ionicAngular) {
    'use strict';
    
    var $html,
        onDeviceReady = function () {
            app.run(function($rootScope,AuthService,$state,$ionicPopup) {
                $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){

                    if (toState.name != "login" && !AuthService.isLoggedIn()){ //Assuming the AuthService holds authentication logic
                        // User isn’t authenticated
                        $state.transitionTo("login");
                        event.preventDefault();
                    }
                });
            });
            // document.addEventListener("backbutton", function(e){
            //    if($.mobile.activePage.is('#home')){
            //        e.preventDefault();
            //        navigator.app.exitApp();
            //    }
            //    else {
            //        navigator.app.backHistory()
            //    }
            // }, false);
            angular.bootstrap(document, [app.name]);
        };

    document.addEventListener("deviceready", onDeviceReady, false);



    if (typeof cordova === 'undefined') {

        $html = angular.element(document.getElementsByTagName('html')[0]);
        angular.element().ready(function () {
            try {
                console.log(ionic.Platform.platforms);
                app.run(function($rootScope,AuthService,$state) {

                    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){

                        if (toState.name != "login" && !AuthService.isLoggedIn()){ //Assuming the AuthService holds authentication logic
                            // User isn’t authenticated
                            $state.transitionTo("login");
                            event.preventDefault();
                        }
                    });
                });
                angular.bootstrap(document, [app.name]);
            } catch (e) {
                console.error(e.stack || e.message || e);
            }
        });
    }


    
});