(function (angular) {
    'use strict';

    angular.module('starter.controllers').controller('SignupCtrl', ['$scope', '$log', 'SignupSrv',
        function ($scope, $log, SignupSrv) {

          $scope.signupData = {};

          SignupSrv.getUser('45345345').then(function(user){
          });

          $scope.doSignup = function(){
            $log.debug('Doing signup', $scope.signupData);
            SignupSrv.createUser($scope.signupData);
          };

        }
    ]);
})(angular);
