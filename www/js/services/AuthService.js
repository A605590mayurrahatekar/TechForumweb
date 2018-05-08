/*global define, console */

define(['angular'], function (angular) {
    "use strict";

    var AuthService = function (API_SERVER, $http,$q) {
        return {
            login: function (user) {
                return $http.get(API_SERVER+"/user/"+user.dasId , {
                    headers: {"Authorization":"Basic "+user.authString}
                });

            },

            getUser: function () {
                var defaultUser = "";
                if (window.localStorage['user']) {
                    var _user = JSON.parse(window.localStorage['user']);
                    if (_user) {
                        if (_user.dasId) {
                            return _user.dasId;
                        } else {
                            return defaultUser;
                        }
                    }
                } else {
                    return defaultUser;
                }
            },

            isLoggedIn: function () {
                //return true;
                if (window.localStorage['user']) {
                    var _user = JSON.parse(window.localStorage['user']);
                    return _user ? true : false;
                } else {
                    return false;
                }
            },

            searchUserByDASId: function (dasId) {
                var response = $http.get(API_SERVER+"/user/search/"+dasId);
                return response;

            },

            markMyAttendance: function(room) {
                if (window.localStorage['user']) {
                    var _user = JSON.parse(window.localStorage['user']);
                    if (_user) {
                        if (_user.dasId) {
                            var dasId = _user.dasId;
                            var name = _user.firstName + " "+_user.lastName;
                            return $http.post(API_SERVER+"/attendance/"+dasId+"/"+room+"/"+name);
                        }
                    } else {
                        return  $q.reject();
                    }
                } else {
                    return $q.reject();
                }
            },

            logout: function () {
                window.localStorage.removeItem("user");
            }

        };

    };

    AuthService.$inject = ['API_SERVER', '$http','$q'];
    return AuthService;
})
;