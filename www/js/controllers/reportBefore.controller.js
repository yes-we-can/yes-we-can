(function (angular) {
    'use strict';

    angular.module('starter.controllers').controller('ReportBeforeCtrl', [
        function () {
            this.date = new Date();
            this.alertTime = '9:00 - 6:00';

            this.takePhoto = function(){
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
                    correctOrientation:true
                };

                $cordovaCamera.getPicture(options).then(function(imageData) {
                    var image = document.getElementById('myImage');
                    image.src = "data:image/jpeg;base64," + imageData;
                }, function(err) {
                    // error
                });
            };
        }
    ]);
})(angular);
