(function (angular) {
    'use strict';

    angular.module('starter.controllers').controller('ReportCtrl', ['$scope', '$state',
        function ($scope, $state) {
            $state.go('.before');
        }
    ]);
})(angular);
