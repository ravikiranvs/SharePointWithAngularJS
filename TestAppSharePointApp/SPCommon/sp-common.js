(function () {
    'use strict';

    angular.module('spCommon', ['ngResource'])
        .factory('spCommon', ['spNotification', 'spData', function (spNotification, spData) {
            return {
                notification: spNotification,
                data: spData
            };
        }])

        .factory('ResponceInterceptor', ['$q', function ($q) {
            return {
                response: function (response) {
                    var deferred = $q.defer();

                    if (response.headers()['content-type'] === "application/json;odata=verbose;charset=utf-8" && response.data) {
                        response.data = response.data.d ? response.data.d : response.data;
                    }

                    deferred.resolve(response);
                    return deferred.promise;
                }
            }
        }])

        .config(['$httpProvider', function ($httpProvider) {
            $httpProvider.interceptors.push('ResponceInterceptor');
        }]);

})();