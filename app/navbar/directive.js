'use strict';

(function(){
    angular.module('Navbar')

        .directive('navBar', function() {
            return {
                restrict: 'EA',
                templateUrl: 'navbar/navbar.html'
            }
        });
})();