(function (angular) {
    'use strict';

    angular.module('starter.controllers').controller('ReportBeforeCtrl', [
        '$cordovaCamera', 'PhotoSrv', '$interval', 'AlertSrv', 'UserSrv', '$q', '$state',
        function ($cordovaCamera, PhotoSrv, $interval, AlertSrv, UserSrv, $q, $state) {
            var self = this;

            function _b64toFile(b64Data, fileName) {
                var contentType = 'image/png';
                var sliceSize = sliceSize || 512;

                var byteCharacters = atob(b64Data);
                var byteArrays = [];

                for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                    var slice = byteCharacters.slice(offset, offset + sliceSize);

                    var byteNumbers = new Array(slice.length);
                    for (var i = 0; i < slice.length; i++) {
                        byteNumbers[i] = slice.charCodeAt(i);
                    }

                    var byteArray = new Uint8Array(byteNumbers);

                    byteArrays.push(byteArray);
                }

                var blob = new Blob(byteArrays, {
                    type: contentType
                });
                blob.lastModifiedDate = new Date();
                blob.name = fileName;
                return blob;
            }

            function _AddPadding(num) {
                var numStr = '' + num;
                if (numStr.length === 1) {
                    numStr = '0' + numStr;
                }
                return numStr;
            }

            this.takePhoto = function () {
                return $q.when(UserSrv.getUserPhoneNumber()).then(function (phoneNumber) {

                    var fileName = phoneNumber + '_' + Date.now() + '.png';
                    var path = 'images/' + fileName;
                    var options = {
                        quality: 50,
                        destinationType: Camera.DestinationType.DATA_URL,
                        sourceType: Camera.PictureSourceType.CAMERA,
                        allowEdit: true,
                        encodingType: Camera.EncodingType.JPEG,
                        targetWidth: 100,
                        targetHeight: 100,
                        popoverOptions: CameraPopoverOptions,
                        saveToPhotoAlbum: false,
                        correctOrientation: true
                    };

                    $cordovaCamera.getPicture(options).then(function (imageData) {
                        var file = _b64toFile(imageData, fileName);

                        return PhotoSrv.uploadImage(file, path);
                    }).then(function () {
                        self.alert.imgUrl = path;
                        self.updateAlert().then(function(){
                            $state.go('^.after');
                        });

                    });
                });
            };

            this.updateAlert = function(){
                return AlertSrv.updateAlert(self.alert.alertKey, self.alert);
            };

            $interval(function () {
                self.currentTime += 1000;
            }, 1000);

            AlertSrv.getAlerts().then(function (alerts) {
                var currDate = new Date();
                var currMin = currDate.getHours() * 60 + currDate.getMinutes();
                self.alert = alerts[0];

                var startTimeHours = parseInt(self.alert.startAlertTime / 60);
                var startMin = parseInt(self.alert.startAlertTime % 60);

                var endTimeHours = parseInt(self.alert.alertTimeCheck / 60);
                var endMin = parseInt(self.alert.alertTimeCheck % 60);

                self.maxTime = endMin - startMin;
                self.currentTime = currMin - startMin;

                var startTimeHoursStr = _AddPadding(startTimeHours);
                var startMinStr = _AddPadding(startMin);
                var endTimeHoursStr = _AddPadding(endTimeHours);
                var endMinSTr = _AddPadding(endMin);

                self.alertTime = '' + endTimeHoursStr + ':' + endMinSTr + ' - ' + startTimeHoursStr + ':' + startMinStr;
            });
        }
    ]);
})(angular);
