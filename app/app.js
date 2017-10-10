'use strict';

// Declare app level module which depends on views, and components
angular.module("myApp.home",[]);
angular.module("myApp.result",[]);
angular.module("myApp.question",[]);
angular.module("myApp.questions",[]);
angular.module("Navbar",[]);

angular.module('myApp', [
    'ngRoute',
    'myApp.home',
    'myApp.result',
    'myApp.question',
    'myApp.questions',
    'Navbar'
  ])


    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'home/home.html',
                controller: 'home'
            })

            .when('/question', {
                templateUrl: 'question/question.html',
                controller: 'question'
            })

            .when('/result', {
                templateUrl: 'result/result.html',
                controller: 'result'
            })

            .when('/test', {
                templateUrl: 'questions/questions.html',
                controller: 'questions'
            })

            .otherwise({ redirectTo: '/' });
    }]);
