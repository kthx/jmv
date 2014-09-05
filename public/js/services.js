'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var myJmvServices = angular.module('myJmv.services', []).
  value('version', '0.1');


myJmvServices.service('lastResultService', function() {
    var resultName = '';
    this.getLastResult = function() {
        return resultName;
    }

    this.setLastResult = function(name) {
        resultName = name;
    }

});

myJmvServices.service('configService', function($http, $q) {
    this.currentConfig = {};
    this.getCurrentConfig = function(forceReload) {
        var deferred = $q.defer();
        var self = this; 

        if(forceReload || Object.keys(self.currentConfig).length === 0) {
            $http.get('/config/api').
                success(function(data, status, headers, config) {
                    self.currentConfig = JSON.parse(data.data);
                    deferred.resolve(true);
                }).
                error(function (data, status, headers, config) {
                    deferred.resolve(false);
                });
        }else{
            deferred.resolve(true);
        }
        return deferred.promise;

    };

    this.restoreRefaults = function(){
        var deferred = $q.defer();
        var self = this;

        $http.get('/config/api/defaults').
            success(function(data, status, headers, config) {
                deferred.resolve(true);
            }).error(function (data, status, headers, config) {
                deferred.resolve(false);
        });
        return deferred.promise;
    };

    this.saveCurrentConfig = function(){
        var deferred = $q.defer();
        var self = this; 
        
        $http({
            url: '/config/api',
            method: "POST",
            data: JSON.stringify(self.currentConfig),
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
            deferred.resolve(true);
        }).error(function (data, status, headers, config) {
            deferred.resolve(false);
        });
        return deferred.promise;
    };
    this.setCurrentConfig = function(config) { 
        var self = this; 
        self.currentConfig = config;
    };

});