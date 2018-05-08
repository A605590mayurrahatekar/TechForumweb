/*global define, console */

define(['angular'], function (angular) {
    "use strict";

    var SessionService = function (API_SERVER, $http) {
        return {
            getMySessions: function (userId) {
                return $http.get(API_SERVER+"/session/user/"+userId)
                //return $http.get("js/data/mysessions.json");
            },

            all: function () {
                return $http.get("js/data/allsessions.json");
            }
            ,
            getPresenters: function () {
                //$http.get(API_SERVER+"/session/user/"+$scope.userId).success(function(data){
                return $http.get("js/data/allpresenters.json");
            },

            registerUserToSession: function(sessionId, userId) {
                console.log(userId);
                if (window.localStorage['user']) {
                    var _user = JSON.parse(window.localStorage['user']);
                    if(_user) {
                        var name = _user.firstName + " "+_user.lastName;
                        var location = _user.location;
                        return $http.post(API_SERVER+"/session/add/user/"+sessionId+"/"+userId+"/"+name+"/"+location+"/register")
                    }
                } else {
                    return $http.post(API_SERVER+"/session/add/user/"+sessionId+"/"+userId+"/aa/aa/register")
                }


            },
            unRegisterUserToSession: function(sessionId, userId) {
                return $http.post(API_SERVER+"/session/add/user/"+sessionId+"/"+userId+"/a/a/unregister")
            },

            rateSession: function(questionId,optionId,user) {
                return $http({
                    method: 'POST',
                    url: API_SERVER+"/question/add/userresponse/"+questionId+"/"+optionId,
                    headers: {"Authorization": user,}
                })
                //return $http.post(API_SERVER+"/question/add/userresponse/"+questionId+"/"+optionId, {
                //    headers: {
                //        "Authorization": "Baisc "+user,
                //        "X-Testing" : "testing"
                //    }
                //});
            },
            registerTeaserVote: function(sessionId,user) {
                return $http({
                    method: 'POST',
                    url: API_SERVER+"/session/recordTeaserVote/"+sessionId+"/"+user,
                    headers: {"Authorization": user,}
                })
                //return $http.post(API_SERVER+"/question/add/userresponse/"+questionId+"/"+optionId, {
                //    headers: {
                //        "Authorization": "Baisc "+user,
                //        "X-Testing" : "testing"
                //    }
                //});
            },


        };

    };

    SessionService.$inject = ['API_SERVER', '$http'];
    return SessionService;
});