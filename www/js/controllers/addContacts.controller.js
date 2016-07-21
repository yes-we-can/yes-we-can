(function (angular) {
  'use strict';

  angular.module('starter').controller('AddContactsController', ['$scope',
    function ($scope) {
    $scope.contactsArr = [];
      $scope.addNewContact = function () {
        navigator.contacts.pickContact(function(contact){
          console.log('The following contact has been selected:' + JSON.stringify(contact));
        },function(err){
          console.log('Error: ' + err);
        });
      }
    }
  ]);
})(angular);
