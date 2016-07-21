(function (angular) {
    'use strict';

    angular.module('starter').factory('StorageSrv', ['$log',
        function ($log) {

            var StorageSrv = {};

            var init = function () {

                // Initialize Firebase
                var config = {
                    apiKey: "AIzaSyBOO2HGYCDXafOSMZT7NSTiUEffID96qak",
                    authDomain: "yes-we-can-83cdb.firebaseapp.com",
                    databaseURL: "https://yes-we-can-83cdb.firebaseio.com",
                    storageBucket: "yes-we-can-83cdb.appspot.com",
                };
                $log.debug('before firebase initialize');
                firebase.initializeApp(config);
                $log.debug('after firebase init');

            }

            init();

            return StorageSrv;


        }
    ]);
})(angular);
