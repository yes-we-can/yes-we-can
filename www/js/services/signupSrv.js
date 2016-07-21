(function (angular) {
  'use strict';

  angular.module('starter').factory('SignupSrv', ['$log', 'StorageSrv',
    function ($log, StorageSrv) {

      var SignupSrv = {};

      $log.debug('SignupSrv');


      SignupSrv.createUser = function(data) {
        return StorageSrv.init().then(function(){
          var user = {};
          var uid = data.phoneNumber;
          user['/users/' + uid] = data;
          return firebase.database().ref().update(user);
        });
      };

      SignupSrv.getUser = function(uid) {
        return StorageSrv.init().then(function(){
          var userRef = firebase.database().ref('users/' + uid);
          return userRef.once('value').then(function(snapshot){
            var user = snapshot.val();
            if (user) {
              return user;
            } else {
              return {};
            }
          });
        });
      };

      return SignupSrv;
    }
  ]);
})(angular);
