'use strict';

/* Filters */

var myJmvFilters = angular.module('myJmv.filters', []).
  value('version', '0.1');

myJmvFilters.filter('onlyfieldsets', function(){
    return function(items) {
        var filtered = [];
        angular.forEach(items, function(item) {
            if(item.type == 'fieldset'){
                this.push(item);
            }
        },filtered);
        return filtered;
    };
});