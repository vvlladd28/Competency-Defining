'use strict';

angular.module('myApp.question', [])

.controller('question', ['$scope', '$http', '$location', function($scope, $http, $location) {
    $http.get('http://localhost:3000/questions').success(function (data){
        $scope.issues = data;
    });
    $scope.answer = {};
    $scope.addAnswer = function() {
        $http.post("http://localhost:3000/results",{'name': $scope.username,'answer': $scope.answer})
            .success(function(response) {
                $scope.usersData = response.users;
                $scope.username = "";
                $scope.answer = "";
                $location.path('/');
            });

    };
    $scope.sizeObj = function (obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };
}]);