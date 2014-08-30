'use strict';

/* Controllers */

function IndexCtrl($scope, $http) {
  $http.get('/').
    success(function(data, status, headers, config) {
      $scope.title = "JVM";
      $scope.alerts = [];
    });
}
function ConfigCtrl($scope, $http) {
  $http.get('/config/api').
    success(function(data, status, headers, config) {
      var config = JSON.parse(data.data);
      console.log(JSON.parse(data.data));

      $scope.config = config.module;
    });
}
function ConfigFormCtrl($scope) {
  $scope.schema = {
    type: "object",
    properties: {
      name: { type: "string", minLength: 2, title: "Name", description: "Name or alias" },
      title: {
        type: "string",
        enum: ['dr','jr','sir','mrs','mr','NaN','dj']
      }
    }
  };

  $scope.form = [
      "*",
      {
        type: "submit",
        title: "Save"
      }
    ];

  $scope.model = {};
}


function HeaderCtrl($scope, $location, lastResultService) {
    $scope.disableIfNoLatestResult = function () {
      return (lastResultService.getLastResult().length === 0)?'disabled':'';
    };
    $scope.resultPath = function () {
      return lastResultService.getLastResult();
    };
    $scope.isActive = function (viewLocation) { 
      return (viewLocation.length > 1 && $location.path().indexOf(viewLocation) == 0) || $location.path() === viewLocation;
    };
}

function UploadCtrl($scope, $upload, $location, lastResultService) {
  $scope.onFileSelect = function($files) {

    
    $scope.$parent.alerts.push({msg: 'Analysis in progress, please wait'});

    //$files: an array of files selected, each file has name, size, and type.
    for (var i = 0; i < $files.length; i++) {
      var file = $files[i];
      $scope.upload = $upload.upload({
        url: '/upload', 
        method: 'POST',
        data: {myObj: $scope.myModelObj},
        file: file,
      }).progress(function(evt) {
        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
      }).success(function(data, status, headers, config) {
        // file is uploaded successfully
        console.log(data);
        lastResultService.setLastResult(data.path);
        $location.path("/results/" + data.path);
      });

    }
  };
};

function ResultsCtrl($scope, $http, $routeParams, $window, lastResultService) {
  $http.get('/results/api/' + $routeParams.id).
    success(function(data) {
      lastResultService.setLastResult($routeParams.id);
      $scope.currentUrl = data.currentUrl;
      $scope.results = data;
      $scope.cResults = data.checkstyleResults;
    });
}

