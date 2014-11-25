(function () {
    angular.module(MainAppName)
        .controller('HomePageCtrl', ['spCommon', '$location', '$scope', function (spCommon, $location, $scope) {

            //spCommon.notification.notifyError("Title", "Sample Notification");


            // REST Calls

            // Query List Items
            //spCommon.data.spListItem.Query('<List Name>')

            // Create List Item
            //spCommon.data.spListItem.Create('<List Name>')

            // Read List Item
            //spCommon.data.spListItem.Get('<List Name>', ItemId)

            // Update List Item
            //spCommon.data.spListItem.Update('<List Name>', Item)

            // Delete List Items
            //spCommon.data.spListItem.Delete('<List Name>', ItemId)

        }]);
})();