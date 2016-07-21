(function (angular) {
    'use strict';

    angular.module('starter.controllers').controller('ReportCtrl', ['$scope', '$state', '$timeout',
        function ($scope, $state, $timeout) {
          $timeout(function() {
            $state.go('.before');
          }, 1000);
        }
    ]);
})(angular);
