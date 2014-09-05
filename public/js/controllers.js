'use strict';

/* Controllers */

function IndexCtrl($scope, $http) {  
    $http.get('/').
        success(function(data, status, headers, config) {
            $scope.title = "JMV";
            $scope.alerts = [];
        });
}
function ConfigCtrl($scope, $http) {
    $scope.alerts = [];
}
function ConfigFormCtrl($scope, configService, $anchorScroll) {
    $scope.schema = {
        type: "object",
        properties: {}
    };
    $scope.form = [];
    $scope.model = {};
    var scopeForm = [];

    this.loadModel = function(forceReload) {

        configService.getCurrentConfig(forceReload).then(function () {
            var currentConfig = configService.currentConfig;
            console.log(currentConfig);
            var scopeModel = {};
            var schemaFields = {};

            var handleModule = function(obj) {

                angular.forEach(obj, function(value, key) { 

                    var titleNode = $.grep(value.metadata, function(item){ 
                        return item.$.name == "com.jmv.title"; 
                    });
                    var title = titleNode[0].$.value;
                    var helpNode = $.grep(value.metadata, function(item){ 
                        return item.$.name == "com.jmv.helptext"; 
                    });
                    var helptext = helpNode[0].$.value;
                    var idNode = $.grep(value.metadata, function(item){ 
                        return item.$.name == "com.jmv.identifier"; 
                    });
                    var id = idNode[0].$.value;

                    var fieldset = {
                        type: "fieldset",
                        id: title.replace(" check", ""),
                        title: title,
                        items: [
                            {
                                type: "help",
                                helpvalue: "<p>" + helptext.replace("<![CDATA[", "").replace("]]>", "") + "</p>"
                            }
                        ]
                    };

                    angular.forEach(value.property, function(pNode, key) { 

                        var propVal = pNode.$.value;

                        if(isNaN(propVal)) {
                            if(propVal == 'true') {
                                propVal = true;
                            }
                            if(propVal == 'false') {
                                propVal = false;
                            }
                        }else{
                            propVal = parseInt(propVal);
                        }

                            

                        scopeModel[id + pNode.$.name] = propVal;

                        if(
                            pNode.$.name == "format"
                            ||pNode.$.name == "message"
                            ||pNode.$.name == "groups"
                            ||pNode.$.name == "option"
                            ||pNode.$.name == "scope"
                            ||pNode.$.name == "ignorePattern"
                        ) {
                            schemaFields[id + pNode.$.name] = {
                                type: "string",
                                fieldType: "string", 
                            };
                        }

                        if(
                            pNode.$.name == "allowMissingJavadoc"
                            ||pNode.$.name == "allowMissingParamTags"
                            ||pNode.$.name == "allowMissingReturnTag"
                            ||pNode.$.name == "allowMissingThrowsTags"
                            ||pNode.$.name == "allowThrowsTagsForSubclasses"
                            ||pNode.$.name == "allowUndeclaredRTE"
                            ||pNode.$.name == "applyToPublic"
                            ||pNode.$.name == "applyToProtected"
                            ||pNode.$.name == "applyToPackage"
                            ||pNode.$.name == "applyToPrivate"
                        ) {
                            schemaFields[id + pNode.$.name] = {
                                type: "boolean",
                                fieldType: "checkbox", 
                            };
                        }

                        if(
                            pNode.$.name == "minimum" 
                            || pNode.$.name == "maximum" 
                            || pNode.$.name == "methodMaximum" 
                            || pNode.$.name == "classMaximum" 
                            || pNode.$.name == "fileMaximum" 
                            || pNode.$.name == "max") {
                            schemaFields[id + pNode.$.name] = {
                                type: "number", 
                                fieldType: "number",
                            };
                        }


                        if(pNode.$.name == "excludedClasses") {
                            schemaFields[id + pNode.$.name] = {
                                type: "string", 
                                fieldType: "textarea",
                                description: "User-configured class names to ignore"
                            };
                        }

                        if(pNode.$.name == "severity") {
                            schemaFields[id + pNode.$.name] = {
                                type: "string",
                                fieldType: "select",
                                enum: [
                                    "error",
                                    "warning",
                                    "info",
                                    "ignore",
                                ],
                                description: "Set to ignore to disable this check"  
                            };
                        }

                        if(pNode.$.name == "lineSeparator") {
                            schemaFields[id + pNode.$.name] = {
                                type: "string",
                                fieldType: "select",
                                enum: [
                                    "system",
                                    "crlf",
                                    "cr",
                                    "lf",
                                ],
                                description: "type of line separator"  
                            };
                        }

                        if(pNode.$.name == "tokens") {
                            schemaFields[id + pNode.$.name] = {
                                type: "string",
                                fieldType: "string",
                                description: "subset of tokens LAND, BAND, LOR, BOR, BXOR"  
                            };
                        }

                        if(pNode.$.name == "fileExtensions") {
                            schemaFields[id + pNode.$.name] = {
                                type: "string",
                                fieldType: "string",
                                description: "file type extension of the files to check as a sep comma list"  
                            };
                        }
                            
                        var prop = {
                            key: id + pNode.$.name,
                            type: schemaFields[id + pNode.$.name].fieldType,
                            title: pNode.$.name.charAt(0).toUpperCase() + pNode.$.name.slice(1),
                            onChange: function(modelValue,form) {
                                pNode.$.value = modelValue;
                            }
                        };
                        this.push(prop);

                    }, fieldset.items);
                
                    this.push(fieldset);
                }, scopeForm);
            };

            var nonTreeWalkerModules = $.grep(currentConfig.module.module, function(item){ 
                return item.$.name != "TreeWalker"; 
            });

            var treeWalkerModules = $.grep(currentConfig.module.module, function(item){ 
                return item.$.name == "TreeWalker"; 
            });

            console.log(treeWalkerModules);

            handleModule(treeWalkerModules[0].module);
            handleModule(nonTreeWalkerModules);
            

            scopeForm.push({
                type: "submit",
                title: "Save"
            });
            scopeForm.push({   
                type: 'button', 
                style: 'btn-warning', 
                title: 'Restore defaults', onClick: function(){
                    configService.restoreRefaults().then(function (result) {
                        $scope.$parent.alerts = [];
                        if(result) {
                            $scope.loadModel(true);
                            $scope.$parent.alerts.push({msg: 'Configuration restored', type: 'success'});
                        }else{
                            $scope.$parent.alerts.push({msg: 'Error restoring configuration defaults', type: 'danger'});
                        }
                        $anchorScroll();
                    });
                } 
            });

            $scope.form = scopeForm;

            $scope.schema.properties = schemaFields;
            $scope.model = scopeModel;     

        });
    };

    this.loadModel(false);

    $scope.onSubmit = function(form) {
        // First we broadcast an event so all fields validate themselves
        $scope.$broadcast('schemaFormValidate');

        // Then we check if the form is valid
        if (form.$valid) {
            configService.saveCurrentConfig().then(function (result) {

                $scope.$parent.alerts = [];
                if(result) {
                    $scope.$parent.alerts.push({msg: 'Configuration saved successfully', type: 'success'});
                }else{
                    $scope.$parent.alerts.push({msg: 'Error saving configuration', type: 'danger'});
                }
                $anchorScroll();
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
    $scope.$parent.alerts = [];
    $scope.onFileSelect = function($files) {
        $scope.$parent.alerts.push({msg: 'Analysis in progress, please wait'});
        if($files.length == 0) {
            $scope.$parent.alerts = []; 
            $scope.$parent.alerts.push({msg: 'Error in file upload', type: 'danger' });
            return false;
        }
        for (var i = 0; i < $files.length; i++) {
            var file = $files[i];
            $scope.upload = $upload.upload({
                url: '/upload', 
                method: 'POST',
                data: {myObj: $scope.myModelObj},
                file: file,
            }).success(function(data, status, headers, config) {
                if(data.path) {
                    lastResultService.setLastResult(data.path);
                    $location.path("/results/" + data.path);
                }else{
                    $scope.$parent.alerts = [];
                    $scope.$parent.alerts.push({msg: 'Error in analysis, please check config and source code.', type: 'danger' });
                }
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

            var rows = [];
            angular.forEach(data.checkstyleResults.checkstyle.file, function(value, key) {  
                var row = {
                    "c": [
                        {
                            "v": value.$.name.split('/')[value.$.name.split('/').length -1]
                        },
                        {
                            "v": $.grep(value.error, function(item){ return item.$.severity == "error"}).length
                        },
                        {
                            "v": $.grep(value.error, function(item){ return item.$.severity == "warning"}).length
                        },
                        {
                            "v": $.grep(value.error, function(item){ return item.$.severity == "info"}).length
                        }
                    ]
                };
                this.push(row);
            }, rows);

            var chart = {
                "type": "ColumnChart",
                "cssStyle": "height:400px; width:100%;",
                "data": {
                "cols": [
                  {
                    "id": "file",
                    "label": "File",
                    "type": "string",
                    "p": {}
                  },
                  {
                    "id": "error",
                    "label": "Error",
                    "type": "number",
                    "p": {}
                  },
                  {
                    "id": "warning",
                    "label": "Warning",
                    "type": "number",
                    "p": {}
                  },
                  {
                    "id": "info",
                    "label": "Info",
                    "type": "number",
                    "p": {}
                  }
                ],
                "rows": rows
                },
                "options": {
                    "title": "Results per file and type",
                    "isStacked": "true",
                    "fill": 20,
                    "displayExactValues": true,
                    "vAxis": {
                        "title": "Amount",
                        "gridlines": {
                            "count": 6
                        }
                    },
                    "hAxis": {
                        "title": "Files"
                    }
                },
                "formatters": {},
                "displayed": true
            };

            var pie = JSON.parse(JSON.stringify(chart));

            pie.type = "PieChart";
            pie.options.title = "Distribution results per file";

            var bars = JSON.parse(JSON.stringify(chart));

            bars.type = "BarChart";
            bars.rows = [];
            bars.cols = [];
            bars.options.title = "Results per file and check";
            bars.options.hAxis.title = "Error count";
            bars.options.vAxis.title = "Files";

            var barrows = [];
            var barcols = [
                {
                    "id": "file",
                    "label": "File",
                    "type": "string",
                    "p": {}
                }
            ];
            angular.forEach(data.checkstyleResults.checkstyle.file, function(value, key) { 
                angular.forEach(value.error , function(error, key) { 
                    var barcol = {
                        "id": error.$.source,
                        "label": error.$.source.split('.')[error.$.source.split('.').length -1],
                        "type": "number",
                        "p": {}
                    }
                    if(barcols.indexOf(barcol)){
                        barcols.push(barcol);
                    } 
                });
            });

            angular.forEach(data.checkstyleResults.checkstyle.file, function(value, key) {  
                var barrow = {
                    "c": [
                        {
                            "v": value.$.name.split('/')[value.$.name.split('/').length -1]
                        }
                    ]
                };
                angular.forEach(barcols , function(barcol, key) { 
                    if(key > 0) {
                        this.c.push(
                            {
                                "v": $.grep(value.error, function(item){ return item.$.source == barcol.id}).length
                            }
                        );
                    }
                    

                },barrow);


                this.push(barrow);
            }, barrows);

            console.log(barcols);
            console.log(barrows);

            bars.data.cols = barcols;
            bars.data.rows = barrows;
            bars.cssStyle =  "height:" +barcols.length * 30 + "px; width:100%;",
            console.log(bars);

            $scope.bars = bars;
            $scope.chart = chart;
            $scope.pie = pie;
    });
}

