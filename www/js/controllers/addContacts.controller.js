(function (angular) {
    'use strict';

    angular.module('starter').controller('AddContactsController', ['$scope',
        function ($scope) {
            $scope.contactsArr = [];
            $scope.addNewContact = function () {

                if (navigator.contacts) {
                    navigator.contacts.pickContact(function (contact) {

                        $scope.phoneNumber = contact && contact.phoneNumbers[0] && contact.phoneNumbers[0].value ? contact.phoneNumbers[0].value : undefined;
                        $scope.phoneNumber = $scope.phoneNumber.replace(/([() ])+/g, '');
                        $scope.phoneNumber = $scope.phoneNumber.replace('+972','0');
                        console.log('The following contact has been selected:' + JSON.stringify(contact));
                    }, function (err) {
                        console.log('Error: ' + err);
                    });
                }
                else {
                    $scope.phoneNumber = '(052) 6620568';
                }
                if ($scope.phoneNumber) {
                    $scope.phoneNumber = $scope.phoneNumber.replace(/([() ])+/g, '');
                    $scope.phoneNumber = $scope.phoneNumber.replace('+972','0');
                    $scope.phoneNumberArr = [];
                    $scope.phoneNumberArr.push($scope.phoneNumber);
                    debugger;
                    // display in ui
                }
            }


      // $scope.sendSms = function (number,message){
      //   // var options = {
      //   //     replaceLineBreaks: false, // true to replace \n by a new line, false by default
      //   //     android: {
      //   //         intent: 'INTENT'  // send SMS with the native android SMS messaging
      //   //         // intent: '' // send SMS without open any other app
      //   //     }
      //   // };

      //   // var success = function () { 
      //   //   alert('Message sent successfully');
      //   // };

      //   // var error = function (e) { 
      //   //   alert('Message Failed:' + e); 
      //   // };

      //   // sms.send(number, message, options, success, error);

      //   var messageInfo = {
      //       phoneNumber: number,
      //       textMessage: message
      //   };

      //   sms.sendMessage(messageInfo, function(message) {
      //       alert("success: " + message);
      //   }, function(error) {
      //       alert("code: " + error.code + ", message: " + error.message);
      //   });

      
    }
  ]);
})(angular);
