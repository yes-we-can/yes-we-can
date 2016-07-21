(function (angular) {
    'use strict';

    angular.module('starter').run(function($ionicPlatform, $cordovaLocalNotification) {
        $ionicPlatform.ready(function () {
            $cordovaLocalNotification.schedule({
                id: 1,
                title: 'Title here',
                text: 'Text here',
                data: {
                    customProperty: 'custom value'
                }
            }).then(function (result) {
                // ...
            });
        });
    });
})(angular);
