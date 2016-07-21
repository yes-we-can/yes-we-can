(function (angular) {
    'use strict';

    angular.module('starter').factory('UserSrv', [
        function () {
            var UserSrv = {};

            function _getUserPath(phoneNumber){
                return 'users/' + phoneNumber;
            }

            function _getUserRef(phoneNumber){
                var userPath = _getUserPath(phoneNumber);
                return firebase.database().ref(userPath);
            }

            UserSrv.getUserData = function(phoneNumber){
                return _getUserRef(phoneNumber).once('value').then(function(userData){
                    return userData.val();
                });

            };

            UserSrv.getUserPhoneNumber = function() {
                return localStorage.getItem('phoneNumber');
            };

            return UserSrv;
        }
    ]);
})(angular);
