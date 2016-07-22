(function (angular) {
    'use strict';

    angular.module('starter').controller('AddContactsController', ['$scope', '$timeout', 'UserSrv', 'GroupSrv', '$ionicModal',
        function ($scope, $timeout, UserSrv, GroupSrv, $ionicModal) {
            $scope.contactsArr = [];
            $scope.phoneNumberArr = [];

            $scope.createGroup = function (groupName) {
                GroupSrv.createGroup({"groupName": groupName}).then(function (groupData) {
                    $scope.groupData = groupData;
                    $scope.modal.hide();
                    debugger;
                });
            };

            $ionicModal.fromTemplateUrl('templates/createNewGroupModal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
            });

            $scope.openModal = function () {
                $scope.modal.show();
            };

            $scope.closeModal = function () {
                $scope.modal.hide();
            };

            var myPhoneNumber = UserSrv.getUserPhoneNumber();
            UserSrv.getUserData(myPhoneNumber).then(function (userData) {

                if (angular.isDefined(userData.groups)) {

                } else {
                    $scope.modal.show();
                }
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
            })
        }
    ]);
})(angular);
