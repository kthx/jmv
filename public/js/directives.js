'use strict';

/* Directives */

angular.module('myJmv.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])
  .directive('prettyprint', function($timeout) {
    return {
        restrict: 'C',
        scope: false,
        link: function postLink(scope, element, attrs) {

            $timeout(function () {
                element.html(prettyPrintOne(element.html(),'',true));
                var result = $.grep(scope.$parent.cResults.checkstyle.file, function(item){ 
                    return item.$.name.indexOf(scope.id) > 0; 
                });

                angular.forEach(result[0].error, function(value, key){
                    if(parseInt(value.$.line) > 0 ) {
                        this.find('li').eq(parseInt(value.$.line) - 1)
                            .addClass('checkstyle-severity-' + value.$.severity)
                            .append('<div class="checkstyle-info">'
                                + (value.$.column != undefined ?'<span class="checkstyle-column"><b>Column</b>: ' + value.$.column + '</span>':'')
                                + '<span class="checkstyle-message"> <b>Message</b>:' + value.$.message + '</span>'
                                + '<span class="checkstyle-source"> <b>Source</b>: ' + value.$.source + '</span>'
                                + '</div>');
                    }else{
                        var $generalErrors = $(element).prev();
                        if($generalErrors.find('.none')) {
                            $generalErrors.find('.none').remove();
                        }
                        $generalErrors.find('ul.GeneralErrors').append('<li class="checkstyle-severity-' + value.$.severity + '">'
                            + '<div class="checkstyle-info">'
                            + (value.$.column != undefined ?'<span class="checkstyle-column"><b>Column</b>: ' + value.$.column + '</span>':'')
                            + '<span class="checkstyle-message"> <b>Message</b>:' + value.$.message + '</span>'
                            + '<span class="checkstyle-source"> <b>Source</b>: ' + value.$.source + '</span>'
                            + '</div>'
                            + '</li>');
                        console.log()
                    }
                }, $(element));
                $(element).prev().find('.ErrorCount').html(result[0].error.length);

            });
        }
    };
}).directive('scrollTo', function ($location, $anchorScroll) {
    return function(scope, element, attrs) {

        element.bind('click', function(event) {
            event.stopPropagation();
            var off = scope.$on('$locationChangeStart', function(ev) {
                off();
                ev.preventDefault();
            });
            var location = attrs.scrollTo;
            $location.hash(location);
            $anchorScroll();
        });

    };
})
.directive('legend', function($timeout) {
    return {
        restrict: 'E',
        scope: false,
        link: function postLink(scope, element, attrs) {
            $timeout(function () {
                $(element).attr('id', $(element).html().replace(' ', ''));
            });
        }
    };
});