'use strict';

// Declare app level module which depends on filters, and services
angular.module('myJmv', ['myJmv.filters', 'myJmv.services', 'myJmv.directives','angularFileUpload', 'ui.bootstrap', 'schemaForm' , 'ngRoute']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/index',
        controller: IndexCtrl
      }).
      when('/config', {
        templateUrl: 'partials/config',
        controller: ConfigCtrl
      }).
      when('/upload', {
        templateUrl: '/upload',
        controller: UploadCtrl
      }).
      when('/results/:id', {
        templateUrl: 'partials/results',
        controller: ResultsCtrl
      }).
      otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  }]);