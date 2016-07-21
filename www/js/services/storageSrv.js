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
                return authenticate();
                
            }

            var authenticate = function(){
            	return firebase.auth().signInWithEmailAndPassword('assaf@zinkerz.com', 'yes-we-can').then(function(res){
            		$log.debug('authenticated: ' + res);
            		return res;
            	}).catch(function(error) {
			        // Handle Errors here
			        var errorCode = error.code;
			        var errorMessage = error.message;
			        // [START_EXCLUDE]
			        $log.error('failed to authenticate');
			        return error.message;
            	});
            }

            init();

            return StorageSrv;


        }
    ]);
})(angular);
