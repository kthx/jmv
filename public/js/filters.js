'use strict';

/* Filters */

angular.module('myJmv.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  }]).
  filter('onlyfieldsets', function(){
    return function(items) {
        var filtered = [];
        angular.forEach(items, function(item) {
            if(item.type == 'fieldset'){
                this.push(item);
            }
        },filtered);
        return filtered;
    };

  }).
  filter('array', function() {
  return function(items) {
    var filtered = [];
    angular.forEach(items, function(item) {
      filtered.push(item);
    });
   return filtered;
  };
});;
