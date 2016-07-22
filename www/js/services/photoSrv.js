(function (angular) {
    'use strict';

    angular.module('starter').factory('PhotoSrv', [
        function () {
            var PhotoSrv = {};

            this.uploadImage = function(file, path){
                var storageRef = firebase.storage().ref();
                var metadata = {
                    'contentType': file.type
                };
                storageRef.child('images/' + file.name).put(file, metadata)
            };

            return PhotoSrv;
        }
    ]);
})(angular);
