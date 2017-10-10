'use strict';

angular.module('myApp.questions', [])

.controller('questions', function($scope, $http) {
    $http.get('issuesYesNo.json').success(function (data){
        $scope.issues = data;
    });
    $scope.answer = {};
    $scope.addAnswer = function() {
        $http.post('http://localhost:3000/2',{'name': $scope.username,'answer': $scope.answer})
            .success(function(response) {
                $scope.usersData = response.users;
                $scope.username = "";
                $scope.answer = "";
            });

    };
    $scope.sizeObj = function (obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };
});