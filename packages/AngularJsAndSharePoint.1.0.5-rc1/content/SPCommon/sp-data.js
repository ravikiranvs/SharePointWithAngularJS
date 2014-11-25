(function () {
    'use strict';

    var commonModule = angular.module('spCommon');

    commonModule.factory('spData', ['spResource', '$q', function (spResource, $q) {
        var spData = {

            // CRUD and Query operations for list items.
            spListItem: {
                Create: function (ListName) {
                    var deferred = $q.defer();
                    spResource.GetListByName.get({ SPList: ListName }).$promise.then(function (data) {
                        var newItem = { '__metadata': { 'type': data.ListItemEntityTypeFullName } };
                        deferred.resolve(newItem);
                    },
                    function (data) {
                        deferred.reject(data);
                    });
                    //ListName = ListName.replace(" ", "_x0020_");
                    //return { '__metadata': { 'type': 'SP.Data.' + ListName + 'ListItem' } };
                    return deferred.promise;
                },
                Get: function (ListName, ID) {
                    return spResource.Item.get({ SPList: ListName, SPListItem: ID }).$promise;
                },
                Update: function (ListName, Item) {
                    if (Item.ID) {
                        return spResource.Item.update({ SPList: ListName, SPListItem: Item.ID }, Item).$promise;
                    }
                    else
                        return spResource.Items().create({ SPList: ListName }, Item).$promise;
                },
                Delete: function (ListName, ID) { return spResource.Item.delete({ SPList: ListName, SPListItem: ID }, '').$promise; },
                Query: function (ListName, ODataQuery) {
                    return spResource.Items(ODataQuery).get({ SPList: ListName }).$promise;
                }
            },

            // Gets User
            spUser: {
                Get: function (IdOrName) {
                    if (isNaN(IdOrName))
                        return spResource.GetUserByName.get({ UserName: IdOrName }).$promise;
                    else
                        return spResource.GetUserById.get({ Id: IdOrName }).$promise;
                }
            }
        };

        return spData;
    }]);

})();