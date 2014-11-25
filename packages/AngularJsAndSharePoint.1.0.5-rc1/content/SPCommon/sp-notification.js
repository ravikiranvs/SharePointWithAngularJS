(function () {
    'use strict';

    var commonModule = angular.module('spCommon');

    function showNotification(title, message, notificationType) {
        var iconUrl, notoficatioTitle;
        
        // Set Icon Url
        if (notificationType === 'info') {
            iconUrl = '../images/info.png';
        }
        else if (notificationType === 'error') {
            iconUrl = '../images/error.png';
        }
        else if (notificationType === 'success') {
            iconUrl = '../images/success.png';
        }
        else if (notificationType === 'warning') {
            iconUrl = '../images/warning.png';
        }

        // Show the SharePoint Notification
        var notificationData = new SPStatusNotificationData("", STSHtmlEncode(message), iconUrl, null);
        var notification = new SPNotification(SPNotifications.ContainerID.Status,
            STSHtmlEncode(title), false, null, null, notificationData);

        notification.Show(false);
    }

    commonModule.factory('spNotification', [function () {

        // Functions for showing the SharePoint Notifications
        return {
            notify: function (title, message) {
                showNotification(title, message, 'info');
            },
            notifyError: function (title, message) {
                showNotification(title, message, 'error');
            },
            notifySuccess: function (title, message) {
                showNotification(title, message, 'success');
            },
            notifyWarning: function (title, message) {
                showNotification(title, message, 'warning');
            }
        }
    }]);

})();