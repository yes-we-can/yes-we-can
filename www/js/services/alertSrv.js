(function (angular) {
    'use strict';

    angular.module('starter').factory('AlertSrv', [ 'UserSrv', '$log','$q','GroupSrv',
        function ( UserSrv, $log, $q, GroupSrv) {
            var AlertSrv = {};

            AlertSrv.getAlerts = function(){
            	var alerts=[];
        		var uid = UserSrv.getUserPhoneNumber();
        		return UserSrv.getUserData(uid).then(function(userData){
        			if (userData){
        				var arrProm = [];
        				var groups = userData.groups;
        				angular.forEach(groups, function(group,groupKey){
        					arrProm.push(GroupSrv.getGroup(groupKey));
        				});
        				return $q.all(arrProm).then(function(groupsData){
        					angular.forEach(groupsData, function(groupData){
        						var gData = groupData.val();
        						if (gData.alerts){
        							angular.forEach(gData.alerts, function(alert){
        								alerts.push(alert);
        							});
        						}

        					});
        					return alerts;
        				})
        			}
        			else{
        				$log.debug('no user data for uid: ' + uid);
        				return alerts;
        			}
        		})
            };


            AlertSrv.setAlert = function(groupKey, alertData){
            	var newAlertData={};
                var newAlertKey = firebase.database().ref().child('groups').child(groupKey).child('alerts').push().key;
                newAlertData['/groups/' + groupKey + '/alerts/' + newAlertKey] = alertData;
                return firebase.database().ref().update(newAlertData);
            };

            return AlertSrv;
        }
    ]);
})(angular);
