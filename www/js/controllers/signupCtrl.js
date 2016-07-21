(function (angular) {
    'use strict';

    angular.module('starter.controllers').controller('SignupCtrl', ['$scope',
        function ($scope) {

          $scope.signupData = {};

          $scope.doSignup = function(){
            console.log('Doing signup', $scope.signupData);
          };

        }
    ]);
})(angular);
