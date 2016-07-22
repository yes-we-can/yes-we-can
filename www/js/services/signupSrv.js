(function (angular) {
    'use strict';

    angular.module('starter').factory('SignupSrv', ['$log', 'UserSrv', '$state',
        function ($log, UserSrv, $state) {

            var SignupSrv = {};

            $log.debug('SignupSrv');

            SignupSrv.createUser = function(data) {
                // check if user exists first
                var uid = data.phoneNumber;
                return UserSrv.getUserData(uid).then(function(user){
                    if (user){
                        // what to do if user already exists?
                        $log.debug('user already exists');
                        $state.go('app.addContacts');
                    } else {
                        var newUserData = {};
                        var uid = data.phoneNumber;
                        newUserData['/users/' + uid] = data;
                        return firebase.database().ref().update(newUserData).then(function(err){
                            if (err){
                                alert('failed to signup');
                            }
                            else{
                                localStorage.setItem('phoneNumber',data.phoneNumber)
                                $state.go('app.addContacts');
                            }
                        });
                    }
                });
            };

            return SignupSrv;
        }
    ]);
})(angular);
