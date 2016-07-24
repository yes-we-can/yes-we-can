(function (angular) {
    'use strict';

    angular.module('starter.controllers').controller('ReportCtrl', [
        '$scope', '$state', 'AlertSrv',
        function ($scope, $state, AlertSrv) {
            var self = this;

            AlertSrv.getAlerts().then(function(alerts){
                var alert = alerts[0];
                 //test
                if (angular.isDefined(alert) && alert.imgUrl) {
                    $state.go('.after');
                }else{
                    $state.go('.before');
                }
            })
        }
    ]);
})(angular);
