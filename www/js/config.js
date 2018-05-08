/*global define */

define(['angular'], function (angular) {
	'use strict';

	return angular.module('app.config', [])
		.constant('VERSION', '0.1')
    .constant("API_SERVER","http://techforumportal-techforumexplore.7e14.starter-us-west-2.openshiftapps.com/rest/tech");

});
