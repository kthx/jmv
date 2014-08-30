'use strict';

/* Controllers */

function IndexCtrl($scope, $http) {
    $http.get('/').
        success(function(data, status, headers, config) {
            $scope.title = "JVM";
            $scope.alerts = [];
        });
}
function ConfigCtrl($scope, $http, configService) {
    $scope.alerts = [];
}
function ConfigFormCtrl($scope, configService) {
  /*var schema = {
    type: "object",
    properties: {}
  };
  configService.getCurrentConfig().then(function () {
    var currentConfig = configService.currentConfig;

    console.log(currentConfig);

    angular.forEach(currentConfig.module.module, function(value, key) {
      console.log(value)

      this[value.$.name] = { 
        type: "fieldset",
        title: "Name",
        items: [
          { "severity": {"type": "string","title": "Name"}}
         ]
       };
     }, schema.properties);
  });


*/
  

  
    $scope.schema = {
        type: "object",
        properties: {
            severity: { 
                type: "string", 
                /*titleMap:[
                    { value: "error", name: "error" },
                    { value: "warning", name: "warning" },
                    { value: "info", name: "info" },
                    { value: "ignore", name: "ignore" },
                ],*/
                enum: [
                    "error",
                    "warning",
                    "info",
                    "ignore",
                ],
                description: "Set to ignore to disable this check" },
        }
    };

    $scope.form = [
        {
            type: "fieldset",
            title: "test",
            items: [ 
                {
                    key: "severity",
                    onChange: function(modelValue,form) {
                        configService.currentConfig.module.module[0].property[4].$.value = modelValue;
                    }
                }
            ]
        }, 
        {
            type: "submit",
            title: "Save"
        }
    ];


    configService.getCurrentConfig().then(function () {
        var currentConfig = configService.currentConfig;

        $scope.model = {
            severity : currentConfig.module.module[0].property[4].$.value
        };
    });

    $scope.onSubmit = function(form) {
        // First we broadcast an event so all fields validate themselves
        $scope.$broadcast('schemaFormValidate');

        // Then we check if the form is valid
        if (form.$valid) {
            console.log(configService.currentConfig.module.module[0].property[4].$.value);
            configService.saveCurrentConfig().then(function (result) {
                $scope.$parent.alerts = [];
                if(result) {
                    $scope.$parent.alerts.push({msg: 'Configuration saved successfully', type: 'success'});
                }else{
                    $scope.$parent.alerts.push({msg: 'Error saving configuration', type: 'danger'});
                }
            });
        }
  }
};



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

