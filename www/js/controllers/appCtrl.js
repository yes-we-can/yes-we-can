(function (angular) {
    'use strict';

    angular.module('starter').controller('AppCtrl', [
        'UserSrv', '$state',
        function (UserSrv, $state) {
            var phoneNumber = localStorage.getItem('phoneNumber');

            if(phoneNumber === null){
                alert('set phone number in local storage');
                // localStorage.setItem('phoneNumber','0547329077')
            }

            UserSrv.getUserData(phoneNumber).then(function(userData){
                if(userData && userData.signUp){
                    $state.go('app.report');//todo
                }else{
                    $state.go('app.signup');
                }
            });
        }
    ]);
})(angular);
