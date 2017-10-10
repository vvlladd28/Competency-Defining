'use strict';

angular.module('myApp.result', [])

    .controller('result', function($scope, $http) {
        var sumMatrix = [];
        var normMatrix = [];
        $http.get('http://localhost:3000/results').success(function (data){
            $scope.answers = data;
            $scope.competence = competenceYesNo(data);
            $scope.competenceFix = $scope.competence.map(function(each_element){
                return Number(each_element.toFixed(3));
            });
        });

        $scope.sizeObj = function (obj) {
            var size = 0, key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) size++;
            }
            return size;
        };
        function countQuestion (item){
            return item.length;
        }
        function objToArray(data) {
            var matrix = [];
            for(var i = 0; i < data.length; i++){
                var temp = [];
                for(var key in data[i].answer) {
                    temp.push(data[i].answer[key]);
                }
                matrix.push(temp);
            }
            return matrix;
        }
        function createTriangleMatric(matrix, expert, contQuest) {
            var triangleMatrix = [];
            for(var i = 0; i < contQuest; i++) {
                var triangle = [];
                for(var m = 0; m < expert; m++){
                    var temp = [];
                    for(var n = m + 1; n < expert; n++){
                        if(matrix[m][i] == matrix[n][i]){
                            temp[n]=1;
                        } else {
                            temp[n]=0;
                        }
                    }
                    triangle.push(temp);
                }
                triangleMatrix.push(triangle);
            }
            return triangleMatrix;
        }
        function sumTriangleMatric(triangleMatrix, expert, contQuest) {
            var sumMatrix = [];
            for(var m = 0; m < expert; m++) {
                var tempArr = [];
                for(var n = 0; n < expert; n++) {
                    if (n<m) {
                        var temp = 0;
                        for (var i = 0; i < contQuest; i++) {
                            temp += triangleMatrix[i][n][m];
                        }
                        tempArr.push(temp);
                    } else {
                        tempArr.push(0);
                    }
                }
                sumMatrix.push(tempArr);
            }
            var sum = 0;
            for(var m = 0; m < expert; m ++){
                for(var n = m + 1; n < expert; n++){
                    sum += sumMatrix[n][m];
                }
            }
            for(var m = 0; m < expert; m ++){
                for(var n = m + 1; n < expert; n++){
                    sumMatrix[n][m] = sumMatrix[n][m]/sum;
                }
            }
            return sumMatrix;
        }
        function competencExpert(matrix, expert){
            var competence = [];
            var sumCompetenc = 0;
            for(var i = 0; i < expert; i++) {
                var temp = 0;
                for (var m = 0; m < expert; m++) {
                    for (var n = m + 1; n < expert; n++) {
                        if (i == m || i == n)
                            temp += matrix[n][m];
                    }
                }
                competence.push(temp);
                sumCompetenc += temp;
            }
            for(var i = 0; i < competence.length; i++)
                competence[i] = (competence[i]/sumCompetenc);
            return competence;
        }
        function competenceYesNo(data){
            var matrix = objToArray(data);
            var expert = matrix.length;
            var contQuest = countQuestion(matrix[0]);
            var triangleMatrix = createTriangleMatric(matrix, expert, contQuest);
            var sumMatrix = sumTriangleMatric(triangleMatrix, expert, contQuest);
            var competent = competencExpert(sumMatrix, expert);
            return competent;
        }
    });