(function (angular) {
    'use strict';

    angular.module('starter').factory('SignupSrv', ['$log', 'StorageSrv',
        function ($log) {

            var SignupSrv = {};

            $log.debug('SignupSrv');

            SignupSrv.createUser = function(data) {
                // check if user exists first
                SignupSrv.getUser(uid).then(function(user){
                    if (angular.equals(user, {})){
                        //var user = {};
                        var uid = data.phoneNumber;
                        user['/users/' + uid] = data;
                        return firebase.database().ref().update(user);
                    } else {
                        // what to do if user already exists?
                    }
                });
            };

            SignupSrv.getUser = function(uid) {
                var userRef = firebase.database().ref('users/' + uid);
                return userRef.once('value').then(function(snapshot){
                    var user = snapshot.val();
                    if (user) {
                        return user;
                    } else {
                        return {};
                    }
                });
            };

            return SignupSrv;
        }
    ]);
})(angular);
