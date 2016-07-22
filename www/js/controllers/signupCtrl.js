(function (angular) {
    'use strict';

    angular.module('starter.controllers').controller('SignupCtrl', ['$scope', '$log', 'SignupSrv','AlertSrv',
        function ($scope, $log, SignupSrv, AlertSrv) {

            $scope.signupData = {};

            $scope.doSignup = function(){
                $log.debug('Doing signup', $scope.signupData);
                $scope.signupData.signUp = true;
                SignupSrv.createUser($scope.signupData);
            };

            // AlertSrv.setAlert('123',{
            //     alertTimeCheck: '222222',
            //     enabled: false,
            //     startAlertTime: 44444
            // }).then(function(){
            //     AlertSrv.getAlerts().then(function(alerts){
            //         $log.debug('alerts:' + alerts.length);
            //     }).catch(function(err){
            //         $log.debug('error in getAlerts, ' + err);
            //     });
            // });




        }
    ]);
})(angular);
