(function (angular) {
    'use strict';

    angular.module('starter.controllers').controller('ReportAfterCtrl', ['$scope', 'AlertSrv', '$timeout', 'PhotoSrv',
        function ($scope, AlertSrv, $timeout, PhotoSrv) {
            var self = this;

            function _AddPadding(num) {
                var numStr = '' + num;
                if (numStr.length === 1) {
                    numStr = '0' + numStr;
                }
                return numStr;
            }

            AlertSrv.getAlerts().then(function (alerts) {
                var currDate = new Date();
                var currMin = currDate.getHours() * 60 + currDate.getMinutes();
                self.alert = alerts[0];

                var startTimeHours = parseInt(self.alert.startAlertTime / 60);
                var startMin = parseInt(self.alert.startAlertTime % 60);

                var endTimeHours = parseInt(self.alert.alertTimeCheck / 60);
                var endMin = parseInt(self.alert.alertTimeCheck % 60);

                self.maxTime = endMin - startMin;
                self.currentTime = currMin - startMin;

                var startTimeHoursStr = _AddPadding(startTimeHours);
                var startMinStr = _AddPadding(startMin);
                var endTimeHoursStr = _AddPadding(endTimeHours);
                var endMinSTr = _AddPadding(endMin);

                self.alertTime = '' + endTimeHoursStr + ':' + endMinSTr + ' - ' + startTimeHoursStr + ':' + startMinStr;

                PhotoSrv.getImage(self.alert.imgUrl).then(function(res){
                    self.imgUrl = res;
                    $timeout();
                },function(err){
                   
                });
                $timeout();
            });
        }
    ]);
})(angular);
