(function (angular) {
    'use strict';

    angular.module('starter').controller('AddContactsController', ['$scope', '$timeout', 'UserSrv', 'GroupSrv', '$ionicModal', '$state', '$q', '$ionicPopup', 'SignupSrv',
        function ($scope, $timeout, UserSrv, GroupSrv, $ionicModal, $state, $q, $ionicPopup, SignupSrv) {
            $scope.contactsArr = [];
            $scope.phoneNumberArr = [];

            $scope.showAlert = function () {
                var alertPopup = $ionicPopup.alert({
                    title: 'הוספת משתמש נכשלה',
                    template: 'המשתמש כבר משויך לקבוצה'
                });
            };

            $scope.createGroup = function (groupName) {
                $scope.groupData = {"groupName": groupName};
                GroupSrv.createGroup($scope.groupData).then(function (groupKey) {
                    $scope.groupKey = groupKey;
                    $scope.modal.hide();
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
            if (!myPhoneNumber) {
                $state.go('app.signup');
                return;
            }
            UserSrv.getUserData(myPhoneNumber).then(function (userData) {

                if (angular.isDefined(userData.groups)) {
                    angular.forEach(userData.groups, function (group, groupKey) {
                        $scope.groupKey = groupKey;
                        //There should be only one group under the user
                    });
                    GroupSrv.getGroup($scope.groupKey).then(function (groupDataObj) {
                        var groupData = groupDataObj.val();
                        $scope.groupData = groupData;
                        $timeout(function () {
                            $scope.phoneNumberArr = groupData.members;
                        })
                    });
                } else {
                    $scope.modal.show();
                }
                $scope.addNewContact = function () {
                    console.log('addNewContact');
                    if (navigator.contacts) {
                        navigator.contacts.pickContact(function (contact) {
                            $scope.phoneNumber = contact && contact.phoneNumbers[0] && contact.phoneNumbers[0].value ? contact.phoneNumbers[0].value : undefined;
                            $scope.phoneNumber = $scope.phoneNumber.replace(/([() -])+/g, '');
                            $scope.phoneNumber = $scope.phoneNumber.replace('+972', '0');
                            UserSrv.getUserData($scope.phoneNumber).then(function (userData) {
                                if ($scope.phoneNumberArr.indexOf($scope.phoneNumber) === -1) {
                                    if (angular.isDefined(userData) && (userData != null)) {
                                        if (angular.isDefined(userData.groups)) {
                                            $scope.showAlert();
                                        }
                                        else {
                                            $timeout(function () {
                                                $scope.phoneNumberArr.push($scope.phoneNumber);
                                            });
                                            console.log('The following contact has been selected:' + JSON.stringify(contact));
                                        }
                                    } else {
                                        var signUpData = {
                                            username: '',
                                            phoneNumber: $scope.phoneNumber,
                                            signUp: false
                                        };
                                        SignupSrv.createUser(signUpData);
                                        $timeout(function () {
                                            $scope.phoneNumberArr.push($scope.phoneNumber);
                                        });
                                        console.log('The following contact has been selected:' + JSON.stringify(contact));

                                    }
                                }
                            })
                        }, function (err) {
                            console.log('Error: ' + err);
                        });
                    }
                    else {
                        $scope.phoneNumber = '(052) 662-0568';
                        $scope.phoneNumber = $scope.phoneNumber.replace(/([() -])+/g, '');
                        $scope.phoneNumber = $scope.phoneNumber.replace('+972', '0');
                        $timeout(function () {
                            $scope.phoneNumberArr.push($scope.phoneNumber);
                        });
                        console.log('The following contact has been selected:' + JSON.stringify($scope.phoneNumber));
                    }
                };
                $scope.updateGroup = function () {
                    if (angular.isUndefined($scope.groupData.members)) {
                        $scope.phoneNumberArr.push(myPhoneNumber);
                        $scope.groupData.members = $scope.phoneNumberArr;
                    }
                    var arrProm = [];
                    arrProm.push(GroupSrv.setGroup($scope.groupKey, $scope.groupData));
                    arrProm.push(UserSrv.setUserGroup(myPhoneNumber, $scope.groupKey));
                    angular.forEach($scope.phoneNumberArr, function (memberPhoneNumber) {
                        arrProm.push(UserSrv.setUserGroup(memberPhoneNumber, $scope.groupKey))
                    });
                    $q.all(arrProm).then(function () {
                        $state.go('app.report');
                    })
                }
            })
        }
    ]);
})(angular);
