(function (angular) {
    'use strict';

    angular.module('starter').factory('LocalNotificationSrv', [ '$window', '$log','AlertSrv',
        function ($window, $log, AlertSrv) {

            var appName = 'Save My Child';

            var LocalNotificationSrv = {
                notificationEnabled: true
            };

            LocalNotificationSrv.enableNotifications = function enableNotifications(shouldEnable){
                LocalNotificationSrv.notificationEnabled = shouldEnable;
            };

            LocalNotificationSrv.initNotification = function(){

                if ($window.plugin && $window.plugin.notification && $window.plugin.notification.local){
                    $window.plugin.notification.local.clearAll();
                }

                LocalNotificationSrv.setNotification();
            };

            LocalNotificationSrv.setNotification = function setNotification(){

                $log.debug('setNotification');

                if (!LocalNotificationSrv.notificationEnabled){
                    return;
                }

                if ($window.plugin && $window.plugin.notification && $window.plugin.notification.local){
                    
                    var todayMidnight = new Date();
                    todayMidnight.setHours(24,0,0,0);
                    var nextTwoDaysFivePM = new Date(todayMidnight);
                    nextTwoDaysFivePM.setHours(todayMidnight.getHours() + 65);
                    var nextWeekFivePM = new Date(todayMidnight);
                    nextWeekFivePM.setHours(todayMidnight.getHours() + 161);

                    
                    //Debug purposes
                    // var today = new Date();
                    // var nextTwoDaysFivePM = new Date(today);
                    // nextTwoDaysFivePM.setMinutes(today.getMinutes() + 1);
                    // var nextWeekFivePM = new Date(today);
                    // nextWeekFivePM.setMinutes(today.getMinutes() + 2);

                    var displayMsg = 'This is a notification';

                    $window.plugin.notification.local.schedule({
                        id:     10,
                        title:  appName,  // The title of the message
                        text:   displayMsg  // The message that is displayed
                        // at:     nextTwoDaysFivePM    // This expects a date object
                    });
                    // $window.plugin.notification.local.schedule({
                    //     id:     11,
                    //     title:  appName,  // The title of the message
                    //     text:   displayMsg,  // The message that is displayed
                    //     at:     nextWeekFivePM    // This expects a date object
                    // });
                    // $window.plugin.notification.local.schedule({
                    //     id:     12,
                    //     title:  appName,  // The title of the message
                    //     text:   'every minutes',  // The message that is displayed
                    //     every:  'minutes'    // This expects a date object
                    // });

                    $log.debug('setNotification done');
                    
                }
            };

            if ($window.plugin && $window.plugin.notification && $window.plugin.notification.local){
                $window.plugin.notification.local.on("schedule", function(notification) {
                
                $window.plugin.notification.local.clearAll();
                $log.debug('cleared all alerts');

                AlertSrv.getAlerts().then(function(alerts){
                    $log.debug('alerts:' + alerts.length);
                    angular.forEach(alerts, function(alert){
                        $log.debug('alert.alertTimeCheck=' + alert.alertTimeCheck);
                        var todayMidnight = new Date();
                        todayMidnight.setHours(24,0,0,0);
                        var nextMinutes = new Date(todayMidnight);
                        nextMinutes.setMinutes(todayMidnight.getMinutes() + alert.alertTimeCheck);
                        $log.debug('nextMinutes=' + nextMinutes);
                        var newId = Math.floor(Math.random() * 200) + 1;

                        $window.plugin.notification.local.schedule({
                            id:     newId,
                            title:  appName,  // The title of the message
                            text:   'every alert',  // The message that is displayed
                            every:  'day'    // This expects a date object
                        });

                    });
                }).catch(function(err){
                    $log.debug('error in getAlerts, ' + err);
                });


            });
            }

            

            return LocalNotificationSrv;
        }
    ]);
})(angular);