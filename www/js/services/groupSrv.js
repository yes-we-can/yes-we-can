(function (angular) {
    'use strict';

    angular.module('starter').factory('GroupSrv', [
        function () {
            var GroupSrv = {};

            GroupSrv.createGroup = function(groupData){
                var newGroupData = {};
                // Get a key for a new Group.
                var newGroupKey = firebase.database().ref().child('groups').push().key;
                newGroupData['/groups/' + newGroupKey] = groupData;
                return firebase.database().ref().update(newGroupData);
            };

            GroupSrv.getGroup = function(groupId){
                return firebase.database().ref('groups/' + groupId).once('value', function(snapshot) {
                    return snapshot.val();
                });
            };

            GroupSrv.setGroup = function(groupId, groupData){
                var newGroupData = {};
                newGroupData['/groups/' + groupId] = groupData;
                return firebase.database().ref().update(newGroupData);
            };

            return GroupSrv;
        }
    ]);
})(angular);
