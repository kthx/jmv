module.exports = function(config){
    config.set({
    basePath : '../',
    reporters: ['dots','progress'],
    colors: true,

    files : [
        'public/bower_components/angular/angular.js',
        'public/bower_components/angular-mocks/angular-mocks.js',
        'public/js/app.js',
        'public/js/services.js',
        "test/frontend/controller-test.js"
    ],
    autoWatch : false,
    frameworks: ['jasmine'],

    browsers : ['Chrome'],
    plugins : [
            'karma-jasmine',
            'karma-chrome-launcher'            
            ],
})}
