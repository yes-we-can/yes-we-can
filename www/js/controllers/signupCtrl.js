(function (angular) {
    'use strict';

    angular.module('starter.controllers').controller('SignupCtrl', ['$scope', '$log',
        function ($scope, $log) {

          $scope.signupData = {};

          $scope.doSignup = function(){
            $log.debug('Doing signup', $scope.signupData);
          };

        }
    ]);
})(angular);
