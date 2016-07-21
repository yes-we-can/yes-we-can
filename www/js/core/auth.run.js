(function (angular) {
    'use strict';

    angular.module('starter')
      .run(['AuthSrv',function(AuthSrv){
        AuthSrv.init();
      }]);
})(angular);
