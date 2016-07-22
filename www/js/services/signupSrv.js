(function (angular) {
    'use strict';

    angular.module('starter').factory('SignupSrv', ['$log', 'UserSrv', '$state',
        function ($log, UserSrv, $state) {

            var SignupSrv = {};

            $log.debug('SignupSrv');

            SignupSrv.createUser = function (data) {
                // check if user exists first
                var uid = data.phoneNumber;
                return UserSrv.getUserData(uid).then(function (user) {
                    if (user) {
                        if (angular.isUndefined(user.signUp) || (user.signUp === false)) {
                            user.signUp = true;
                            user.username = angular.isUndefined(data.username) ? '' : data.username;
                            var uidExists = data.phoneNumber;
                            var newUserData = {};
                            newUserData['/users/' + uidExists] = user;
                            firebase.database().ref().update(newUserData).then(function (err) {
                                if (err) {
                                    alert('failed to signup');
                                }
                                else {

                                    $state.go('app.addContacts');
                                }
                            })
                        } else {
                            $log.debug('user already exists');
                            $state.go('app.addContacts');
                        }
                    } else {
                        var newUserData = {};
                        var uidNew = data.phoneNumber;
                        newUserData['/users/' + uidNew] = data;
                        return firebase.database().ref().update(newUserData).then(function (err) {
                            if (err) {
                                alert('failed to signup');
                            }
                            else {

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
