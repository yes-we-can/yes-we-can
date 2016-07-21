(function (angular) {
  'use strict';

  angular.module('starter').controller('AddContactsController', ['$scope',
    function ($scope) {
    $scope.contactsArr = [];
      $scope.addNewContact = function () {

        if (navigator.contacts){
          navigator.contacts.pickContact(function(contact){

            var phoneNumber = contact && contact.phoneNumbers[0] && contact.phoneNumbers[0].value ? contact.phoneNumbers[0].value : undefined;
            console.log('The following contact has been selected:' + JSON.stringify(contact));
          },function(err){
            console.log('Error: ' + err);
          });
        }
        else { 
          phoneNumber = '(052) 6620568';
        }
        if (phoneNumber){
            // 'remove () and space'
            // display in ui
          }
        
      }
    }
  ]);
})(angular);
