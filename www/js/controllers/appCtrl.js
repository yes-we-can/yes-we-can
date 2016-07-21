(function (angular) {
    'use strict';

    angular.module('starter').controller('AppCtrl', [
        'UserSrv', '$state',
        function (UserSrv, $state) {
            var phoneNumber = localStorage.getItem('phoneNumber');

            if(phoneNumber === null){
                alert('set phone number in local storage');
                // localStorage.setItem('phoneNumber','0508350501')
            }

            UserSrv.getUserData(phoneNumber).then(function(userData){
                var isUserExists = !!userData;

                if(isUserExists){
                    $state.go('app.addContacts');
                }else{
                    $state.go('app.signup');
                }
            });
        }
    ]);
})(angular);
