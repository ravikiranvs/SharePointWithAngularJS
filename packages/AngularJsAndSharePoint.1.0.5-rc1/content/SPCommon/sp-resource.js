(function () {
    'use strict';

    var commonModule = angular.module('spCommon');

    commonModule.factory('spResource', ['$resource', 'config', function ($resource, config) {

        // Initialize the QueryString to conditionally target the Host Url
        function getTargetQueryString() {
            var targetQueryString;
            if (config.useHostURL)
                targetQueryString = "?@target=" + config.HostUrl;

            return targetQueryString;
        }

        return {
            // Gets list items and creates list items.
            Items: function (ODataQuery) {

                var queryString = getTargetQueryString();

                if (queryString && ODataQuery) {
                    queryString = queryString + "&" + ODataQuery;
                }
                else if (ODataQuery) {
                    queryString = "?" + ODataQuery;
                }

                queryString = queryString || "";

                return $resource(config.AppUrl + "/_api/web/lists/GetByTitle(':SPList')/items" + queryString,
                { SPList: '' },
                {
                    get: { method: 'GET', headers: { 'accept': 'application/json;odata=verbose' } },
                    create: {
                        method: 'POST',
                        isArray: false,
                        headers: {
                            'accept': 'application/json;odata=verbose',
                            'X-RequestDigest': $("#__REQUESTDIGEST").val(),
                            'content-type': 'application/json;odata=verbose'
                        }
                    }
                })
            },

            // Get, Update and Delete a single list item.
            Item: function () {

                var queryString = getTargetQueryString() || "";

                return $resource(config.AppUrl + "/_api/web/lists/GetByTitle(':SPList')/items(:SPListItem)" + queryString,
                { SPList: '', SPListItem: '' },
                {
                    get: { method: 'GET', headers: { 'accept': 'application/json;odata=verbose' } },
                    update: {
                        method: 'POST',
                        headers: {
                            'accept': 'application/json;odata=verbose',
                            'X-RequestDigest': $("#__REQUESTDIGEST").val(),
                            'IF-MATCH': '*',
                            'X-HTTP-Method': 'MERGE',
                            'content-type': 'application/json;odata=verbose'
                        }
                    },
                    delete: {
                        method: 'POST',
                        headers: {
                            'accept': 'application/json;odata=verbose',
                            'X-RequestDigest': $("#__REQUESTDIGEST").val(),
                            'IF-MATCH': '*',
                            'X-HTTP-Method': 'DELETE',
                            'content-type': 'application/json;odata=verbose'
                        }
                    }
                })
            }(),

            // Gets User object by Id.
            GetUserById: $resource(config.AppUrl + "/_api/web/getuserbyid(:Id)",
                { Id: '' },
                {
                    get: { method: 'GET', headers: { 'accept': 'application/json;odata=verbose' } }
                }),

            // Gets User object by User Name.
            GetUserByName: $resource(config.AppUrl + "/_api/web/siteusers(@v)?@v=':UserName'",
                { UserName: '' },
                {
                    get: { method: 'GET', headers: { 'accept': 'application/json;odata=verbose' } }
                }),

            // Get List object By List Name
            GetListByName: function () {
                var queryString = getTargetQueryString() || "";

                return $resource(config.AppUrl + "/_api/web/lists/GetByTitle(':SPList')" + queryString,
                { SPList: '' },
                {
                    get: { method: 'GET', headers: { 'accept': 'application/json;odata=verbose' } }
                });
            }()
        };

        //return spResource;
    }]);

})();