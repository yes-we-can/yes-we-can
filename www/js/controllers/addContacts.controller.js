(function (angular) {
    'use strict';

    angular.module('starter').controller('AddContactsController', ['$scope', '$timeout', 'UserSrv',
        function ($scope, $timeout, UserSrv) {
            $scope.contactsArr = [];
            $scope.phoneNumberArr = [];
            // UserSrv.getUserData()
            $scope.addNewContact = function () {
                if (navigator.contacts) {
                    navigator.contacts.pickContact(function (contact) {
                        $scope.phoneNumber = contact && contact.phoneNumbers[0] && contact.phoneNumbers[0].value ? contact.phoneNumbers[0].value : undefined;
                        $scope.phoneNumber = $scope.phoneNumber.replace(/([() -])+/g, '');
                        $scope.phoneNumber = $scope.phoneNumber.replace('+972', '0');
                        $timeout(function () {
                            $scope.phoneNumberArr.push($scope.phoneNumber);
                        });
                        console.log('The following contact has been selected:' + JSON.stringify(contact));
                    }, function (err) {
                        console.log('Error: ' + err);
                    });
                }
                else {
                    $scope.phoneNumber = '(052) 662-0568';
                    $scope.phoneNumber = $scope.phoneNumber.replace(/([() -])+/g, '');
                    $scope.phoneNumber = $scope.phoneNumber.replace('+972', '0');
                    $scope.phoneNumberArr.push($scope.phoneNumber);
                    console.log('The following contact has been selected:' + JSON.stringify(contact));
                }
            }
        }
    ]);
})(angular);
