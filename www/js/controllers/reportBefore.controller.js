(function (angular) {
    'use strict';

    angular.module('starter.controllers').controller('ReportBeforeCtrl', [
        function () {
                this.date = new Date();
                this.alertTime = '9:00 - 6:00';
        }
    ]);
})(angular);
