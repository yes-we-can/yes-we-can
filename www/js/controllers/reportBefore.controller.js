(function (angular) {
    'use strict';

    angular.module('starter.controllers').controller('ReportBeforeCtrl', [
        '$cordovaCamera',
        function ($cordovaCamera) {
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
                    // var image = document.getElementById('myImage');
                    // image.src = "data:image/jpeg;base64," + imageData;
                    // var fileReader = new FileReader(imageData);
                    // fileReader.onload(function(a,b,c){
                    //     debugger;
                    // })
                    function b64toBlob(b64Data, contentType, sliceSize) {
                        contentType = contentType || '';
                        sliceSize = sliceSize || 512;

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

                        var blob = new Blob(byteArrays, {type: contentType});
                        return blob;
                    }
                    handleFileSelect(b64toBlob(imageData, 'image/png'));
                }, function(err) {
                    // error
                });
            };

            var imgDomElement = document.querySelector('img');
            var reader = new FileReader();

            // reader.onload = function (e) {
            //     $('.prw_img,#img_1').attr('src', e.target.result).width(112).height(112);
            //     $('#img_1').css('display','inline');
            // };
            // reader.readAsDataURL(input.files[0])

            var storageRef = firebase.storage().ref();
            function handleFileSelect(file) {
                debugger;
                // var file = evt.target.files[0];
                var metadata = {
                    'contentType': file.type
                };
                // Push to child path.
                // [START oncomplete]
                storageRef.child('images/' + file.name).put(file, metadata).then(function(snapshot) {
                    console.log('Uploaded', snapshot.totalBytes, 'bytes.');
                    console.log(snapshot.metadata);
                    var url = snapshot.metadata.downloadURLs[0];
                    console.log('File available at', url);
                    // [START_EXCLUDE]
                    document.getElementById('linkbox').innerHTML = '<a href="' +  url + '">Click For File</a>';
                    // [END_EXCLUDE]
                }).catch(function(error) {
                    // [START onfailure]
                    console.error('Upload failed:', error);
                    // [END onfailure]
                });
                // [END oncomplete]
            }

            // imgDomElement.addEventListener('load', handleFileSelect);
        }
    ]);
})(angular);
