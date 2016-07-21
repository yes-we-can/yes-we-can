// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
    'ionic',
    'ngCordova',
    'ui.bootstrap',
    'starter.controllers'
])

    .run(function ($ionicPlatform, StorageSrv) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
                url: '/app',
                templateUrl: 'templates/menu.html',
                controller: 'AppCtrl'
            })
            .state('app.signup', {
                url: '/signup',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/signup.html',
                        controller: 'SignupCtrl'
                    }
                }
            })
            .state('app.addContacts', {
                url: '/addContacts',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/addContacts.html',
                        controller: 'AddContactsController'
                    }
                }

            })
            .state('app.photo', {
                url: '/photo',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/photo.html',
                        controller: 'PhotoCtrl'
                    }
                }
            })
            .state('app.report', {
                url: '/report',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/report.html',
                        controller: 'ReportCtrl',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.report.before', {
                templateUrl: 'templates/reportBefore.html',
                controller: 'ReportBeforeCtrl as vm'
            })
            .state('app.report.after', {
                templateUrl: 'templates/reportAfter.html',
                controller: 'ReportAfterCtrl as vm'
            })
            .state('app.report.alarm', {
                templateUrl: 'templates/reportAlarm.html',
                controller: 'ReportAlarmCtrl as vm'
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app');
    });
