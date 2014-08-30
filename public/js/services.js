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