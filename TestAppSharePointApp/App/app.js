(function () {
    'use strict';

    var app = angular.module(MainAppName, ['ngRoute', 'spCommon']);


    app.run(['$route', '$http', 'config', 'spCommon', function ($route, $http, config, spCommon) {
        //Executes before app loads
    }]);


    //Application configuration
    var config = {};
    config.GetQueryStringValue = (function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    });
    config.AppUrl = config.GetQueryStringValue('SPAppWebUrl');
    config.HostUrl = config.GetQueryStringValue('SPHostUrl');
    config.useHostURL = false;

    //Add more configuration items here..
    app.value('config', config);
})();