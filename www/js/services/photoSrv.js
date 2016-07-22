(function (angular) {
    'use strict';

    angular.module('starter').service('PhotoSrv', [
        function () {
            this.uploadImage = function(file, path){
                var storageRef = firebase.storage().ref();
                var metadata = {
                    'contentType': file.type
                };
                storageRef.child(path).put(file, metadata).then(function(){
                    alert('success');
                },function(err){
                    alert('failure');
                });
            };
        }
    ]);
})(angular);
