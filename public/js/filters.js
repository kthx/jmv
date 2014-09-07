'use strict';

/* Filters */

var myJmvFilters = angular.module('myJmv.filters', [])
    .value('version', '0.1')
    .filter('onlyfieldsets', function(){
        return function(items) {
            var filtered = [];
            angular.forEach(items, function(item) {
                if(item.type == 'fieldset'){
                    this.push(item);
                }
            },filtered);
            return filtered;
        };
    })
    .filter('convertToGraph', function(){
        return function(items, type) {
            var rows = [];
            var cols = [];
            var template = {
                "type": "ColumnChart",
                "cssStyle": {
                    "height": "400px",
                    "width": "100%"
                },
                "data": {
                    "cols": cols,
                    "rows": rows
                },
                "options": {
                    "title": "Results per file and severity",
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
                "displayed": true,
                "view": {
                  columns: [0,1,2,3]  
                } 
            };

            if(type == "pie" || type == "vBars") {

                angular.forEach(items, function(value, key) {  
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
                            },
                            {
                                "v": value.error.length
                            }
                        ]
                    };
                    this.push(row);
                }, rows);

                cols = [
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
                  },
                  {
                    "id": "all",
                    "label": "All",
                    "type": "number",
                    "p": {}
                  }
                ];

            }
            if(type == "pie") {
                template.type = "PieChart";
                template.options.title = "Distribution results per file";

                template["view"] =  {
                    "columns": [
                      0,
                      4
                    ]
                };

            }
            if(type == "hBars") {
                template.type = "BarChart";
                template.rows = [];
                template.cols = [];
                template.options.title = "Results per file and check";
                template.options.hAxis.title = "Error count";
                template.options.vAxis.title = "Files";

                var cols = [
                    {
                        "id": "file",
                        "label": "File",
                        "type": "string",
                        "p": {}
                    }
                ];
                angular.forEach(items, function(value, key) { 
                    angular.forEach(value.error , function(error, key) { 
                        var col = {
                            "id": error.$.source,
                            "label": error.$.source.split('.')[error.$.source.split('.').length -1],
                            "type": "number",
                            "p": {}
                        }
                        if($.grep(this, function(n) { return col.id == n.id; }).length == 0){
                            this.push(col);
                        } 
                    }, cols);
                }, cols);

                angular.forEach(items, function(value, key) {  
                    var row = {
                        "c": [
                            {
                                "v": value.$.name.split('/')[value.$.name.split('/').length -1]
                            }
                        ]
                    };
                    angular.forEach(cols , function(col, key) { 
                        if(key > 0) {
                            this.c.push(
                                {
                                    "v": $.grep(value.error, function(item){ return item.$.source == col.id}).length
                                }
                            );
                        }
                    },row);
                    this.push(row);
                }, rows);

                
                template.cssStyle.height = (cols.length * 60) + "px",

                delete  template["view"];
            }
            template.data.cols = cols;
            template.data.rows = rows;      
            return template;
        };
    });